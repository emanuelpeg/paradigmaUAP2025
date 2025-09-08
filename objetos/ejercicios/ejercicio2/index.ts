
/*import { biblioteca } from "./clases/Biblioteca";
import { TipoSocio } from "./clases/Socio";

// --- Crear libros ---
const libro1 = biblioteca.agregarLibro("El Quijote", "Cervantes", "1234");
const libro2 = biblioteca.agregarLibro("1984", "Orwell", "2345");
const libro3 = biblioteca.agregarLibro("Hábitos Atómicos", "James Clear", "3456");

// --- Registrar socios ---
const socio1 = biblioteca.registrarSocio(TipoSocio.REGULAR, 101, "Juan", "Pérez");
const socio2 = biblioteca.registrarSocio(TipoSocio.VIP, 102, "Ana", "Gómez");

// --- Retirar libros ---
console.log("=== Retirando libros ===");
biblioteca.retirarLibro(101, "1234");
biblioteca.retirarLibro(102, "2345");

// --- Devolver libro a tiempo ---
console.log("\n=== Devolviendo libro a tiempo ===");
biblioteca.devolverLibro(102, "2345"); // VIP devuelve a tiempo

// --- Simular devolución con retraso ---
console.log("\n=== Simulando devolución con retraso ===");
// Para simular retraso, cambiamos la fecha de vencimiento manualmente
const prestamoJuan = socio1.tienePrestadoLibro(libro1);
if (prestamoJuan) {
  // retrocedemos la fecha de vencimiento 5 días atrás
  prestamoJuan.Vencimiento.setDate(prestamoJuan.Vencimiento.getDate() - 5);
}

*/

/*
import { biblioteca } from "./clases/Biblioteca";
//import { RecursoDigital, DocumentoHistorico, Articulo } from "./clases/Biblioteca"; // si los creaste
import { BuscadorUniversal, CatalogoBiblioteca, BibliotecaDigital, ArchivoHistorico, BaseConocimiento } from "./clases/BusquedaYMas";

// --- Agregar libros físicos ---
biblioteca.agregarLibro("Cien años de soledad", "Gabriel García Márquez", "1111");
biblioteca.agregarLibro("El Quijote", "Miguel de Cervantes", "2222");
biblioteca.agregarLibro("Fundamentos de programación", "John Doe", "3333");

// --- Agregar recursos digitales ---
biblioteca.agregarRecursoDigital("Aprendiendo TypeScript", "Jane Smith", "4444", "http://ebook.com/typescript");
biblioteca.agregarRecursoDigital("JavaScript Avanzado", "John Doe", "5555", "http://ebook.com/jsavanzado");

// --- Agregar documentos históricos ---
biblioteca.agregarDocumentoHistorico("Acta de Independencia", "Diversos", "6666", new Date("1816-07-09"));
biblioteca.agregarDocumentoHistorico("Constitución Nacional", "Diversos", "7777", new Date("1853-05-01"));

// --- Agregar artículos académicos ---
biblioteca.agregarArticuloAcademico("Inteligencia Artificial", "Alan Turing", "8888", "Revista IA");
biblioteca.agregarArticuloAcademico("Aprendizaje Automático", "Geoffrey Hinton", "9999", "Revista ML");

// --- Crear buscadores apuntando a listas de biblioteca ---
const catalogo = new CatalogoBiblioteca(biblioteca["inventario"]);
const digital = new BibliotecaDigital(biblioteca["recursosDigitales"]);
const historico = new ArchivoHistorico(biblioteca["documentosHistoricos"]);
const base = new BaseConocimiento(biblioteca["articulosAcademicos"]);

const buscadorUniversal = new BuscadorUniversal();

// --- Prueba 1: buscar por título o autor ---
console.log("=== Resultados de búsqueda: 'John Doe' ===");
let resultados = buscadorUniversal.buscar("John Doe", [catalogo, digital, historico, base]);
resultados.forEach(libro => {
  console.log(`Título: ${libro.titulo}, Autor: ${libro.autor}`);
});

// --- Prueba 2: filtrar por condición ---
console.log("=== Resultados de filtrado: títulos que contienen 'Aprendiendo' ===");
resultados = buscadorUniversal.filtrar(l => l.titulo.includes("Aprendiendo"), [catalogo, digital, historico, base]);
resultados.forEach(libro => {
  console.log(`Título: ${libro.titulo}, Autor: ${libro.autor}`);
});

*/

// index.ts
import { biblioteca } from "./clases/Biblioteca";
import { TipoSocio } from "./clases/Socio";
import { Libro } from "./clases/Libro";
import { PoliticaEstricta, PoliticaFlexible, PoliticaEstudiante, PoliticaDocente } from "./clases/Politica";

console.log("=== INICIO DE PRUEBAS DE BIBLIOTECA ===");

// Crear socios
const socio1 = biblioteca.registrarSocio(TipoSocio.REGULAR, 1, "Juan", "Perez");
const socio2 = biblioteca.registrarSocio(TipoSocio.VIP, 2, "Ana", "Gomez");
const socio3 = biblioteca.registrarSocio(TipoSocio.EMPLEADO, 3, "Luis", "Martinez");

// Crear libros
const libro1 = biblioteca.agregarLibro("Programacion TS", "Autor A", "1111");
const libro2 = biblioteca.agregarLibro("POO Avanzada", "Autor B", "2222");
const libro3 = biblioteca.agregarLibro("Patrones de Diseño", "Autor C", "3333");

// --- PRUEBA 1: Politica Estricta ---
console.log("\n--- Politica Estricta ---");
biblioteca.cambiarPolitica(new PoliticaEstricta());

try {
  biblioteca.retirarLibro(socio1.id, libro1.isbn);
  console.log(` --${socio1.nombreCompleto} retiró "${libro1.titulo}"--`);
} catch (e: any) {
  console.log(e.message);
}

// --- PRUEBA 2: Politica Flexible ---
console.log("\n--- Politica Flexible ---");
biblioteca.cambiarPolitica(new PoliticaFlexible());

try {
  biblioteca.retirarLibro(socio2.id, libro2.isbn);
  console.log(` --${socio2.nombreCompleto} retiró "${libro2.titulo}--"`);
} catch (e: any) {
  console.log(e.message);
}

// --- PRUEBA 3: Politica Estudiante ---
console.log("\n--- Politica Estudiante ---");
biblioteca.cambiarPolitica(new PoliticaEstudiante());

try {
  biblioteca.retirarLibro(socio1.id, libro3.isbn);
  console.log(` --${socio1.nombreCompleto} retiró "${libro3.titulo}"--`);
} catch (e: any) {
  console.log(e.message);
}

// --- PRUEBA 4: Politica Docente ---
console.log("\n--- Politica Docente ---");
biblioteca.cambiarPolitica(new PoliticaDocente());

try {
  biblioteca.retirarLibro(socio3.id, libro1.isbn); // Ya prestado, debería lanzar error si está ocupado
  console.log(` --${socio3.nombreCompleto} retiró "${libro1.titulo}"--`);
} catch (e: any) {
  console.log(e.message);
}

// --- DEVOLUCIONES ---
console.log("\n--- Devoluciones ---");
biblioteca.devolverLibro(socio1.id, libro1.isbn);
console.log(` --${socio1.nombreCompleto} devolvió "${libro1.titulo}"--`);

// --- MULTAS ---
console.log("\n--- Multas Pendientes ---");
const multasSocio1 = biblioteca.getMultasPendientes(socio1.id);
if (multasSocio1.length === 0) console.log("No hay multas para Juan Perez");
else multasSocio1.forEach(m => console.log(m.mensajeMulta()));

console.log("\n=== FIN DE PRUEBAS ===");
