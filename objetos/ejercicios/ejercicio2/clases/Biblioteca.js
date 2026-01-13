"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArchivoHistorico = exports.BibliotecaDigital = exports.CatalogoBiblioteca = exports.Biblioteca = exports.PoliticaDocente = exports.PoliticaEstudiante = exports.PoliticaFlexible = exports.PoliticaEstricta = void 0;
const Libro_1 = require("./Libro");
const Socio_1 = require("./Socio");
// Polimorfismo: Tipos de Préstamo
class Prestamo {
    libro;
    socio;
    constructor(libro, socio) {
        this.libro = libro;
        this.socio = socio;
    }
}
class PrestamoRegular extends Prestamo {
    calcularVencimiento() {
        const vencimiento = new Date();
        vencimiento.setDate(vencimiento.getDate() + 14);
        return vencimiento;
    }
    calcularMulta(diasAtraso) {
        return diasAtraso * 50;
    }
}
class PrestamoCorto extends Prestamo {
    calcularVencimiento() {
        const vencimiento = new Date();
        vencimiento.setDate(vencimiento.getDate() + 7);
        return vencimiento;
    }
    calcularMulta(diasAtraso) {
        return diasAtraso * 100;
    }
}
class PrestamoReferencia extends Prestamo {
    calcularVencimiento() {
        return null; // Solo consulta en sala
    }
    calcularMulta() {
        return 0;
    }
}
class PrestamoDigital extends Prestamo {
    calcularVencimiento() {
        return null; // Sin límite
    }
    calcularMulta() {
        return 0;
    }
}
class PoliticaEstricta {
    puedePrestar(socio) {
        // Usar método público para obtener préstamos
        return socio.getPrestamos().every(p => {
            const venc = p instanceof PrestamoReferencia || p instanceof PrestamoDigital ? null : p.vencimiento;
            return !venc || venc >= new Date();
        });
    }
    periodoPrestamo(socio) {
        return socio.getDuracionPrestamo();
    }
}
exports.PoliticaEstricta = PoliticaEstricta;
class PoliticaFlexible {
    puedePrestar(socio) {
        return true;
    }
    periodoPrestamo(socio) {
        const vencidos = socio.getPrestamos().filter(p => {
            const venc = p instanceof PrestamoReferencia || p instanceof PrestamoDigital ? null : p.vencimiento;
            return venc && venc < new Date();
        });
        return vencidos.length > 0 ? 7 : socio.getDuracionPrestamo();
    }
}
exports.PoliticaFlexible = PoliticaFlexible;
class PoliticaEstudiante {
    puedePrestar(socio) {
        return true;
    }
    periodoPrestamo(socio) {
        return socio.getDuracionPrestamo() + 7;
    }
}
exports.PoliticaEstudiante = PoliticaEstudiante;
class PoliticaDocente {
    puedePrestar(socio) {
        return true;
    }
    periodoPrestamo(socio) {
        return 60;
    }
}
exports.PoliticaDocente = PoliticaDocente;
// Biblioteca: permitir cambiar política
class Biblioteca {
    eventos = [];
    notificaciones = [];
    inventario = [];
    socios = [];
    politicaPrestamo = new PoliticaEstricta();
    // Funciones de libros
    agregarLibro(titulo, autor, isbn) {
        const libroCreado = new Libro_1.Libro(titulo, autor, isbn);
        this.inventario.push(libroCreado);
        return libroCreado;
    }
    buscarLibrosPorAutor(nombreAutor) {
        return this.inventario.filter(libro => libro.autor.nombre === nombreAutor || libro.autor === nombreAutor);
    }
    reservarLibro(socioId, libroISBN) {
        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(libroISBN);
        if (!socio || !libro)
            throw new Error("Socio o libro no encontrado");
        libro.agregarReserva(socio);
        socio.agregarReserva(libro);
        this.notificaciones.push(`Reserva agregada para el socio ${socio.nombreCompleto} y libro ${libro.titulo}`);
    }
    buscarLibro(isbn) {
        // return this.inventario.find(libro => libro.isbn === isbn) ?? null;
        const libroEncontrado = this.inventario.find((libro) => libro.isbn === isbn);
        if (libroEncontrado) {
            return libroEncontrado;
        }
        return null;
    }
    // Funciones de socios
    registrarSocio(tipo, id, nombre, apellido) {
        const socioCreado = Socio_1.SocioFactory.crearSocio(tipo, id, nombre, apellido);
        this.socios.push(socioCreado);
        return socioCreado;
    }
    buscarSocio(id) {
        return this.socios.find((socio) => socio.id === id) ?? null;
    }
    retirarLibro(socioId, libroISBN) {
        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(libroISBN);
        if (!socio || !libro)
            throw new Error("No se encontro");
        if (socio.deuda > 0)
            throw new Error("El socio tiene multas pendientes y no puede retirar libros");
        for (const socioAux of this.socios) {
            if (socioAux.tienePrestadoLibro(libro))
                throw new Error("Libro no esta disponible");
        }
        socio.retirar(libro);
    }
    devolverLibro(socioId, libroISBN) {
        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(libroISBN);
        if (!socio || !libro)
            throw new Error("No se encontro");
        const prestamo = socio.tienePrestadoLibro(libro);
        if (prestamo) {
            const hoy = new Date();
            if (prestamo.vencimiento && hoy > prestamo.vencimiento) {
                const msPorDia = 1000 * 60 * 60 * 24;
                const diasAtraso = Math.ceil((hoy.getTime() - prestamo.vencimiento.getTime()) / msPorDia);
                const multa = diasAtraso * 50;
                socio.registrarMulta(multa);
                this.notificaciones.push(`Socio ${socio.nombreCompleto} tiene multa de $${multa} por retraso en '${libro.titulo}'`);
            }
        }
        socio.devolver(libro);
        if (libro.tieneReservas()) {
            const siguienteSocio = libro.obtenerProximaReserva();
            if (siguienteSocio) {
                siguienteSocio.retirar(libro);
                this.notificaciones.push(`El libro '${libro.titulo}' está disponible para ${siguienteSocio.nombreCompleto} por reserva.`);
            }
        }
    }
    agregarEvento(evento) {
        this.eventos.push(evento);
        this.notificaciones.push(`Nuevo evento: ${evento.titulo} el ${evento.fecha}`);
    }
    obtenerNotificaciones() {
        return [...this.notificaciones];
    }
    obtenerHistorialSocio(socioId) {
        const socio = this.buscarSocio(socioId);
        return socio ? socio.obtenerHistorialLectura() : [];
    }
    obtenerRecomendacionesSocio(socioId) {
        const socio = this.buscarSocio(socioId);
        return socio ? socio.recomendacionesSimples() : [];
    }
    setPoliticaPrestamo(politica) {
        this.politicaPrestamo = politica;
    }
    prestarLibro(socioId, libroISBN, tipoPrestamo) {
        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(libroISBN);
        if (!socio || !libro)
            throw new Error("Socio o libro no encontrado");
        if (!this.politicaPrestamo.puedePrestar(socio))
            throw new Error("No puede prestar por política actual");
        // Usar método público para registrar préstamo
        switch (tipoPrestamo) {
            case "regular":
                socio.retirar(libro, "regular");
                break;
            case "corto":
                socio.retirar(libro, "corto");
                break;
            case "referencia":
                socio.retirar(libro, "referencia");
                break;
            case "digital":
                socio.retirar(libro, "digital");
                break;
            default: throw new Error("Tipo de préstamo no válido");
        }
        this.notificaciones.push(`Préstamo registrado: ${libro.titulo} para ${socio.nombreCompleto} (${tipoPrestamo})`);
    }
}
exports.Biblioteca = Biblioteca;
class CatalogoBiblioteca {
    libros;
    constructor(libros = []) {
        this.libros = libros;
    }
    buscarPor(criterio) {
        return this.libros.filter(l => l.titulo.includes(criterio) || l.autor.nombre === criterio);
    }
    filtrar(condicion) {
        return this.libros.filter(condicion);
    }
}
exports.CatalogoBiblioteca = CatalogoBiblioteca;
class BibliotecaDigital {
    recursos;
    constructor(recursos = []) {
        this.recursos = recursos;
    }
    buscarPor(criterio) {
        return this.recursos.filter(r => r.titulo.includes(criterio));
    }
    filtrar(condicion) {
        return this.recursos.filter(condicion);
    }
}
exports.BibliotecaDigital = BibliotecaDigital;
class ArchivoHistorico {
    documentos;
    constructor(documentos = []) {
        this.documentos = documentos;
    }
    buscarPor(criterio) {
        return this.documentos.filter(d => d.titulo.includes(criterio));
    }
    filtrar(condicion) {
        return this.documentos.filter(condicion);
    }
}
exports.ArchivoHistorico = ArchivoHistorico;
//# sourceMappingURL=Biblioteca.js.map