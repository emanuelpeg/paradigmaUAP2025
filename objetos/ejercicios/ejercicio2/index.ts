import { biblioteca } from "./clases/Biblioteca";
import { TipoSocio } from "./clases/Socio";
import { PoliticaFlexible, PoliticaEstudiante, PoliticaDocente } from "./clases/politica";
import { BuscadorUniversal } from "./clases/BuscadorUniversal";
import { CatalogoBiblioteca } from "./clases/CatalogoBiblioteca";
import { BibliotecaDigital } from "./clases/BibliotecaDigital";
import { RecursoDigital } from "./clases/BibliotecaDigital";
import { ArticuloAcademico } from "./clases/BaseConocimiento";
import { BaseConocimiento } from "./clases/BaseConocimiento";


const libro1 = biblioteca.agregarLibro("El quijote", "Cervantes", "1234");
const libro2 = biblioteca.agregarLibro("Hábitos Atómicos", "James Clear", "2345");
const libro3 = biblioteca.agregarLibro("1984", "Orwell", "1984");




const socio1 = biblioteca.registrarSocio(TipoSocio.REGULAR, 31882, "Lucciano", "Curotto");
const socio2 =biblioteca.registrarSocio(TipoSocio.EMPLEADO, 20321, "Luca", "Giordana");
const socio3 =biblioteca.registrarSocio(TipoSocio.VIP, 32451, "Samuel", "Olmos");

socio1.retirar(libro3, "corto");

const fechaDevolucion = new Date();
fechaDevolucion.setDate(fechaDevolucion.getDate() + 10);
const multa = socio1.devolver(libro3, fechaDevolucion);

console.log(`Multa generada por devolución tardía: $${multa}`);

// 2. Probar préstamo regular y devolución sin multa
socio1.retirar(libro1, "regular");
const multa2 = socio1.devolver(libro1, new Date());
console.log(`Multa generada por devolución a tiempo: $${multa2}`);

// 3. Probar préstamo de referencia (sin multa)
socio1.retirar(libro2, "referencia");
const multa3 = socio1.devolver(libro2, new Date());
console.log(`Multa por préstamo de referencia: $${multa3}`);

// 4. Mostrar libros en préstamo
//socio1.retirar(libro1, "regular");

console.log("Libros actualmente en préstamo:", socio1.librosEnPrestamos.map(l => l.titulo));

biblioteca.setPolitica(new PoliticaFlexible());
biblioteca.retirarLibro(socio1.id, libro1.isbn, "regular");

biblioteca.setPolitica(new PoliticaEstudiante());
biblioteca.retirarLibro(socio2.id, libro2.isbn, "regular");

biblioteca.setPolitica(new PoliticaDocente());
biblioteca.retirarLibro(socio3.id, libro3.isbn, "regular");
console.log(libro1.titulo, libro1.autor, libro1.isbn);

const catalogo = new CatalogoBiblioteca([libro1, libro2, libro3]);

const recursosDigitales: RecursoDigital[] = [
  { titulo: "TypeScript Avanzado", autor: "Ana López", formato: "PDF", url: "..." },
  { titulo: "Patrones de Diseño", autor: "Carlos Ruiz", formato: "ePub", url: "..." }
];
const bibliotecaDigital = new BibliotecaDigital(recursosDigitales);

const articulos: ArticuloAcademico[] = [
  { titulo: "IA en Educación", autores: ["María Gómez"], revista: "EdTech", año: 2023, palabrasClave: ["IA", "educación"] }
];
const baseConocimiento = new BaseConocimiento(articulos);

// Búsqueda universal
console.log("=== Búsqueda: 'quijote' ===");
console.log(BuscadorUniversal.buscarEn(catalogo, "quijote"));

console.log("=== Búsqueda: 'IA' ===");
console.log(BuscadorUniversal.buscarEn(baseConocimiento, "IA"));

console.log("=== Filtrar libros por autor 'Cervantes' ===");
console.log(BuscadorUniversal.filtrarEn(catalogo, libro => libro.autor === "Cervantes"));
