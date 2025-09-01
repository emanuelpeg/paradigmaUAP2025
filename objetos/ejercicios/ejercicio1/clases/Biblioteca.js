"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.biblioteca = void 0;
var Libro_1 = require("./Libro");
var Socio_1 = require("./Socio");
var Autor_1 = require("./Autor");
var EventoBiblioteca_1 = require("./EventoBiblioteca");
var Biblioteca = /** @class */ (function () {
    function Biblioteca() {
        this.inventario = [];
        this.socios = [];
        this.DURACION = 14;
        this.autores = [];
        this.eventos = [];
    }
    //Para recomendar los libros a un socio
    Biblioteca.prototype.recomendarLibros = function (socioId) {
        var _this = this;
        var socio = this.buscarSocio(socioId);
        if (!socio) {
            throw new Error("Socio no encontrado");
        }
        var recomendaciones = [];
        var historial = socio.historialDeLectura;
        //Recorremos el historial para ver los libros leido por el socio
        historial.forEach(function (isbnLeido) {
            var libroLeido = _this.buscarLibro(isbnLeido);
            if (libroLeido) {
                var librosDelMismoAutor = _this.inventario.filter(function (libro) { return libro.autor.nombre === libroLeido.autor.nombre && !socio.haLeidoLibro(libro.isbn); } // que el socio no lo haya leido.
                );
                librosDelMismoAutor.forEach(function (libroRecomendado) {
                    if (!recomendaciones.includes(libroRecomendado)) {
                        recomendaciones.push(libroRecomendado);
                    }
                });
            }
        });
        return recomendaciones;
    };
    //Agregar Autor
    Biblioteca.prototype.agregarAutor = function (nombre, apellido, biografia, anioNacimiento) {
        var autorExistente = this.autores.find(function (p) { return p.nombre === nombre; });
        if (autorExistente) {
            throw new Error("El autor ya existe");
        }
        var autorCreado = new Autor_1.Autor(nombre, apellido, biografia, anioNacimiento);
        this.autores.push(autorCreado);
        return autorCreado;
    };
    Biblioteca.prototype.buscarAutor = function (nombre) {
        var _a;
        return (_a = this.autores.find(function (n) { return n.nombre === nombre; })) !== null && _a !== void 0 ? _a : null; //Si no encuentra el nombre dentro de la lista de autores retorna un valor nulo
    };
    // Funciones de libros
    Biblioteca.prototype.agregarLibro = function (titulo, autorNombre, isbn) {
        var autor = this.buscarAutor(autorNombre);
        if (!autor) {
            throw new Error("El autor ".concat(autorNombre, " no est\u00E1 registrado en la Biblioteca"));
        }
        var libroCreado = new Libro_1.Libro(titulo, autor, isbn);
        this.inventario.push(libroCreado);
        return libroCreado;
    };
    Biblioteca.prototype.buscarLibro = function (isbn) {
        // return this.inventario.find(libro => libro.isbn === isbn) ?? null;
        var libroEncontrado = this.inventario.find(function (libro) { return libro.isbn === isbn; });
        if (libroEncontrado) {
            return libroEncontrado;
        }
        return null;
    };
    // Funciones de socios
    Biblioteca.prototype.registrarSocio = function (id, nombre, apellido) {
        var socioCreado = new Socio_1.Socio(id, nombre, apellido);
        this.socios.push(socioCreado);
        return socioCreado;
    };
    Biblioteca.prototype.buscarSocio = function (id) {
        var _a;
        return (_a = this.socios.find(function (socio) { return socio.id === id; })) !== null && _a !== void 0 ? _a : null;
    };
    Biblioteca.prototype.retirarLibro = function (socioId, libroISBN) {
        var socio = this.buscarSocio(socioId);
        var libro = this.buscarLibro(libroISBN);
        if (!socio || !libro) {
            throw new Error("No se encontro el socio o el libro");
        }
        // fijarse si esta disponible
        var estaPrestado = false;
        for (var _i = 0, _a = this.socios; _i < _a.length; _i++) {
            var socio_1 = _a[_i];
            if (socio_1.tienePrestadoLibro(libro)) {
                estaPrestado = true;
                break; //si un socio tiene el libro prestado, lo reserva y sale del ciclo
            }
            if (estaPrestado) {
                //si el libro esta prestado, se le ofrece
                console.log("El libro ".concat(libro.titulo, " no est\u00E1 disponible."));
                libro.reservar(socioId);
            }
            else {
                //si el libro esta disponible se le presta al socio por 14 días
                socio_1.retirar(libro, this.DURACION);
                console.log("El socio ".concat(socio_1.nombreCompleto, " retir\u00F3 el libro ").concat(libro.titulo));
            }
        }
        //socio.retirar(libro, this.DURACION);
    };
    Biblioteca.prototype.devolverLibro = function (socioId, libroISBN) {
        var socio = this.buscarSocio(socioId);
        var libro = this.buscarLibro(libroISBN);
        if (!socio || !libro) {
            throw new Error("No se encontro el socio o el librp");
        }
        socio.devolver(libro); //El socio devuelve el libro
        console.log("El socio ".concat(socio.nombreCompleto, " ha devuelto el libro ").concat(libro.titulo));
        //se obtiene el objeto prestamo
        var prestamoDevuelto = socio.devolver(libro);
        //se verifica si el libro se devolvio con retraso
        var hoy = new Date();
        var diasDeRetraso = Math.ceil((hoy.getTime() - prestamoDevuelto.vencimiento.getTime())) / (1000 * 60 * 60 * 24);
        /*
         (1000 * 60 * 60 * 24) - Convierte milisegundos a días:
          1000 milisegundos = 1 segundo
          * 60 = 1 minuto
          * 60 = 1 hora
          * 24 = 1 día
          *
          * Math.ceil - para redondear hacia arriba los dias de retraso
        */
        if (diasDeRetraso > 0) {
            var multaCalculada = diasDeRetraso * 50; //Es el monto de la multa por día
            socio.agregarMulta(multaCalculada);
            console.log("\u00A1Atenci\u00F3n! El libro se devolvi\u00F3 con ".concat(diasDeRetraso, " d\u00EDas de retraso. Se ha aplicado una multa de $").concat(multaCalculada, "."));
        }
        //Validacion para ver si un libro tiene reserva de algun socio
        if (libro.tieneReservas()) {
            var siguienteSocioId = libro.obtenerSiguienteReserva();
            var siguienteSocio = this.buscarSocio(siguienteSocioId); //es distinto de null
            if (siguienteSocio) {
                console.log("\u00A1Notificaci\u00F3n! El libro ".concat(libro.titulo, " est\u00E1 disponible para el socio ").concat(siguienteSocio.nombreCompleto));
            }
        }
    };
    //Funciones para los eventos
    Biblioteca.prototype.crearEventos = function (nombre, fecha, descripcion) {
        var eventoCreado = new EventoBiblioteca_1.eventoBiblioteca(nombre, fecha, descripcion);
        this.eventos.push(eventoCreado);
        return eventoCreado;
    };
    Biblioteca.prototype.buscarEvento = function (nombre) {
        var _a;
        return (_a = this.eventos.find(function (e) { return e.nombre === nombre; })) !== null && _a !== void 0 ? _a : null; //Si encuentra el nombre lo retorna, sino retorna null
    };
    Biblioteca.prototype.registrarSocioEnEvento = function (socioId, eventoNombre) {
        var socio = this.buscarSocio(socioId);
        var evento = this.buscarEvento(eventoNombre);
        if (!socio || !evento) {
            throw new Error("Socio o evento no encontrado");
        }
        evento.registrarSocio(socioId);
        console.log("El socio ".concat(socio.nombreCompleto, " se ha registrado al evento ").concat(eventoNombre));
    };
    Biblioteca.prototype.notificarSocios = function () {
        var _this = this;
        console.log('--- NOTIFICACIONES ---');
        this.socios.forEach(function (socio) {
            //Notificacion de libro vencido
            var prestamosVencidos = socio.prestamosVencidos();
            if (prestamosVencidos.length > 0) {
                console.log("[AVISO] ".concat(socio.nombreCompleto, ": Tienes ").concat(prestamosVencidos.length, " libros vencidos, por favor, regresalos para evitar multas"));
            }
            //Notificacion para otros eventos
            _this.eventos.forEach(function (evento) {
                console.log("[EVENTO] ".concat(socio.nombreCompleto, ": \u00A1Recordatorio! Est\u00E1s registrado en el evento ").concat(evento.nombre, " que se realiz\u00E1 el ").concat(evento.fecha.toLocaleDateString(), "."));
            });
        });
        console.log("------------------------------------");
    };
    return Biblioteca;
}());
exports.biblioteca = new Biblioteca();
