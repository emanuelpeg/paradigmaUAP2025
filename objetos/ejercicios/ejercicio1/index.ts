import { Autor } from "./modelos/Autor";
import { Libro } from "./modelos/Libro";
import { Biblioteca } from "./servicios/Biblioteca";
import { EventoBiblioteca } from "./modelos/EventoBiblioteca";

import { SocioRegular, SocioVIP, Empleado, Visitante } from "./modelos/Usuario";
import { PrestamoRegular, PrestamoCorto, PrestamoDigital } from "./modelos/Prestamo";
import { PoliticaFlexible, PoliticaDocente } from "./servicios/Politicas";

import { CatalogoBiblioteca } from "./busqueda/CatalogoBiblioteca";
import { BibliotecaDigital } from "./busqueda/BibliotecaDigital";
import { ArchivoHistorico } from "./busqueda/ArchivoHistorico";
import { BaseConocimiento } from "./busqueda/BaseConocimiento";

// configuracion de biblioteca

const sistemasBusqueda = [
    new CatalogoBiblioteca([]),
    new BibliotecaDigital([]),
    new ArchivoHistorico([]),
    new BaseConocimiento([])
]
const biblioteca = new Biblioteca(sistemasBusqueda);

// Crear autoresj
const autor1 = new Autor("Epicteto", "Filósofo griego de la escuela estoica", 55);
const autor2 = new Autor("Clive Staples Lewis", "Escritor británico", 1898);

// Crear libros
const libro1 = new Libro("Enchiridion of Epictetus (Enquiridion)", autor1, "ISBN001");
const libro2 = new Libro("El Sobrino del Mago", autor2, "ISBN002");
const libro3 = new Libro("La Silla de Plata", autor2, "ISBN003");


// Crear usuarios
const socio1 = new SocioRegular(1, "Claire");
const socio2 = new SocioVIP(2, "Katsuki");
const empleado = new Empleado(3, "Phill");
const visitante = new Visitante(4, "Hiroshi");

biblioteca.agregarLibro(libro1);
biblioteca.agregarLibro(libro2);
biblioteca.agregarLibro(libro3);

biblioteca.agregarUsuario(socio1);
biblioteca.agregarUsuario(socio2);
biblioteca.agregarUsuario(empleado);
biblioteca.agregarUsuario(visitante);

// Préstamo
console.log("--- Préstamos ---");
const p1 = new PrestamoRegular(libro1, socio1, new Date("2025-08-01"));
console.log(biblioteca.prestarLibro(p1));

const p2 = new PrestamoCorto(libro2, socio2, new Date("2025-08-05"));
console.log(biblioteca.prestarLibro(p2)); 

const p3 = new PrestamoDigital(libro3, empleado, new Date("2025-08-10"));
console.log(biblioteca.prestarLibro(p3));

    // visitante no puede tomar libros prestados
console.log(biblioteca.prestarLibro(new PrestamoRegular(libro1, visitante, new Date("2025-08-12"))));

// Devolución (con multa si se pasó del plazo)
console.log("--- Devoluciones ---");
console.log(biblioteca.devolverLibro("ISBN002", 1, new Date("2025-08-25")));

// Cambiar politica de prestamo 
console.log("--- Cambiar Política de Préstamo ---");
biblioteca.setPolitica(new PoliticaFlexible());
console.log(biblioteca.prestarLibro(new PrestamoRegular(libro1, socio1, new Date("2025-08-27"))));

biblioteca.setPolitica(new PoliticaDocente());
console.log(biblioteca.prestarLibro(new PrestamoRegular(libro1, socio1, new Date("2025-08-27"))));

// Evento
console.log("--- Eventos ---");
const evento = new EventoBiblioteca("Club de Lectura", new Date("2025-09-01"), "Discusión sobre realismo mágico");
evento.inscribir(socio1);
biblioteca.crearEvento(evento);

// Recomendaciones
console.log("--- Recomendaciones ---");
console.log(`Recomendación para "${socio1.nombre}"`, biblioteca.recomendarLibros(1).map(l => l.titulo));

// Busqueda global 
console.log("--- Búsqueda Global ---");
console.log(biblioteca.buscarGlobal("Epicteto"));