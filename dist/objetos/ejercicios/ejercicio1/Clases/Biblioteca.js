"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.biblioteca = exports.Biblioteca = void 0;
const Libro_1 = require("./Libro");
const Autor_1 = require("./Autor");
const EventoBiblioteca_1 = require("./EventoBiblioteca");
const Socio_1 = require("./Socio");
const Prestamo_1 = require("./Prestamo");
const Politicas_1 = require("./Politicas");
const Busquedas_1 = require("./Busquedas");
class Biblioteca {
    inventario = [];
    socios = new Map();
    autores = [];
    reservas = new Map(); // ISBN -> cola
    politica = new Politicas_1.PoliticaEstricta();
    buscador = new Busquedas_1.BuscadorUniversal([]);
    setPolitica(p) { this.politica = p; }
    getPolitica() { return this.politica; }
    // Libros / Autores
    agregarLibro(titulo, autorNombre, isbn, esReferencia = false) {
        const autor = this.ensureAutor(autorNombre);
        const libro = new Libro_1.Libro(titulo, autor, isbn, esReferencia);
        this.inventario.push(libro);
        // refrescar fuentes del buscador
        this.buscador = new Busquedas_1.BuscadorUniversal([
            new Busquedas_1.CatalogoBiblioteca(this.inventario),
            new Busquedas_1.BibliotecaDigital(this.inventario),
            new Busquedas_1.ArchivoHistorico(this.inventario),
            new Busquedas_1.BaseConocimiento(this.inventario)
        ]);
        return libro;
    }
    ensureAutor(nombre) {
        const ex = this.autores.find(a => a.nombre.toLowerCase() === nombre.toLowerCase());
        if (ex)
            return ex;
        const nuevo = new Autor_1.Autor(nombre);
        this.autores.push(nuevo);
        return nuevo;
    }
    buscarLibro(isbn) { return this.inventario.find(l => l.isbn === isbn); }
    buscarLibrosPorAutorNombre(nombre) {
        return this.inventario.filter(l => l.autor.nombre.toLowerCase() === nombre.toLowerCase());
    }
    // Socios
    registrarSocio(tipo, id, nombre, apellido) {
        if (this.socios.has(id))
            return this.socios.get(id);
        let socio;
        switch (tipo) {
            case "vip":
                socio = new Socio_1.SocioVIP(id, nombre, apellido);
                break;
            case "empleado":
                socio = new Socio_1.Empleado(id, nombre, apellido);
                break;
            case "visitante":
                socio = new Socio_1.Visitante(id, nombre, apellido);
                break;
            default: socio = new Socio_1.SocioRegular(id, nombre, apellido);
        }
        this.socios.set(id, socio);
        return socio;
    }
    buscarSocio(id) { return this.socios.get(id); }
    // Buscador universal
    buscarEnSistemas(criterio) {
        return this.buscador.buscar(criterio);
    }
    // ---- Préstamos polimórficos ----
    prestarLibro(socioId, isbn, tipo = "regular", fecha = new Date()) {
        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(isbn);
        if (!socio || !libro)
            throw new Error("Socio o libro no encontrado.");
        if (socio instanceof Socio_1.Visitante)
            throw new Error("El visitante no puede pedir prestado.");
        if (!socio.puedeTomarOtro())
            throw new Error("Cupo de préstamos alcanzado.");
        if (libro.esReferencia && !(socio instanceof Socio_1.Empleado))
            tipo = "referencia";
        const veredicto = this.politica.puedePrestar(socio);
        if (!veredicto.permitido)
            throw new Error(`Préstamo denegado por política: ${veredicto.motivo}`);
        const prestado = Array.from(this.socios.values())
            .some(s => s.prestamos.some(p => p.libro.isbn === isbn));
        if (prestado && tipo !== "referencia") {
            this.reservarLibro(socio, isbn);
            return { reservado: true };
        }
        const p = (0, Prestamo_1.crearPrestamo)(tipo, libro, fecha);
        // ajuste según política (si aplica) para préstamos con vencimiento
        const v = p.calcularVencimiento();
        if (v && veredicto.diasExtra) {
            v.setDate(v.getDate() + veredicto.diasExtra);
            const base = (tipo === "corto") ? 7 : 14;
            const nuevoInicio = new Date(v);
            nuevoInicio.setDate(nuevoInicio.getDate() - base);
            p.fechaInicio = nuevoInicio;
        }
        socio.agregarPrestamo(p);
        EventoBiblioteca_1.EventoBiblioteca.notificarPrestamo(socio.nombreCompleto, libro.titulo, v ?? new Date());
        return { reservado: false, vencimiento: v ?? null, tipo };
    }
    devolverLibro(socioId, isbn, fecha = new Date()) {
        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(isbn);
        if (!socio || !libro)
            throw new Error("Socio o libro no encontrado.");
        const multa = socio.registrarDevolucion(isbn, fecha);
        EventoBiblioteca_1.EventoBiblioteca.notificarDevolucion(socio.nombreCompleto, libro.titulo, multa);
        const cola = this.reservas.get(isbn) ?? [];
        if (cola.length > 0) {
            const sig = cola.shift();
            this.reservas.set(isbn, cola);
            this.prestarLibro(sig.id, isbn, libro.esReferencia ? "referencia" : "regular", fecha);
            EventoBiblioteca_1.EventoBiblioteca.notificarReserva(sig.nombreCompleto, libro.titulo);
        }
    }
    reservarLibro(socio, isbn) {
        const cola = this.reservas.get(isbn) ?? [];
        if (!cola.some(s => s.id === socio.id)) {
            cola.push(socio);
            this.reservas.set(isbn, cola);
        }
    }
    recomendarLibros(socioId) {
        const socio = this.buscarSocio(socioId);
        if (!socio)
            return [];
        const autoresLeidos = new Set(socio.historialLectura.map(l => l.autor.nombre.toLowerCase()));
        const yaLeidos = new Set(socio.historialLectura.map(l => l.isbn));
        const prestados = new Set(Array.from(this.socios.values()).flatMap(s => s.prestamos.map(p => p.libro.isbn)));
        const cand = this.inventario.filter(l => autoresLeidos.has(l.autor.nombre.toLowerCase()) && !yaLeidos.has(l.isbn) && !prestados.has(l.isbn));
        return cand.length ? cand : this.inventario.filter(l => !yaLeidos.has(l.isbn) && !prestados.has(l.isbn));
    }
}
exports.Biblioteca = Biblioteca;
exports.biblioteca = new Biblioteca();
exports.default = exports.biblioteca;
