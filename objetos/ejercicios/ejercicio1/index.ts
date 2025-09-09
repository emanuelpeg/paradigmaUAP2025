import { Autor } from "./clases/Autor";
import { Libro } from "./clases/Libro";
import { Socio } from "./clases/Socio";
import { Biblioteca } from "./clases/Biblioteca";
import { EventoBiblioteca } from "./clases/EventoBiblioteca";

const biblioteca = new Biblioteca();

// Crear autoresj
const autor1 = new Autor("Epicteto", "Filósofo griego de la escuela estoica", 55);
const autor2 = new Autor("Clive Staples Lewis", "Escritor británico", 1898);

// Crear libros
const libro1 = new Libro("Enchiridion of Epictetus (Enquiridion)", autor1, "ISBN001");
const libro2 = new Libro("El Sobrino del Mago", autor2, "ISBN002");
const libro3 = new Libro("La Silla de Plata", autor2, "ISBN003");

// Crear socios
const socio1 = new Socio(1, "Claire");
const socio2 = new Socio(2, "Katsuki");

biblioteca.agregarLibro(libro1);
biblioteca.agregarLibro(libro2);
biblioteca.agregarLibro(libro3);

biblioteca.agregarSocio(socio1);
biblioteca.agregarSocio(socio2);

// Préstamo
console.log(biblioteca.prestarLibro("ISBN002", 1, new Date("2025-08-01")));
console.log(biblioteca.prestarLibro("ISBN002", 2, new Date("2025-08-02"))); // reserva

// Devolución (con multa si se pasó del plazo)
console.log(biblioteca.devolverLibro("ISBN002", 1, new Date("2025-08-20")));

// Evento
const evento = new EventoBiblioteca("Club de Lectura", new Date("2025-09-01"), "Discusión sobre realismo mágico");
evento.inscribir(socio1);
biblioteca.crearEvento(evento);

// Recomendaciones
console.log(`Recomendación para "${socio1.nombre}"`, biblioteca.recomendarLibros(1).map(l => l.titulo));