import { biblioteca } from "./clases/Biblioteca";
import { PoliticaEstricta, PoliticaFlexible } from "./clases/Politica";
import { CatalogoBiblioteca, BibliotecaDigital, ArchivoHistorico, BaseConocimiento } from "./clases/SistemasBusqueda";
import { BuscadorUniversal } from "./clases/BuscadorUniversal";
import { PrestamoRegular } from "./clases/Prestamo";
import { Libro } from "./clases/Libro";

// Libros base
biblioteca.agregarLibro("El quijote", "Cervantes", "1234");
biblioteca.agregarLibro("Hábitos Atómicos", "James Clear", "2345");
const libro = biblioteca.agregarLibro("1984", "Orwell", "1984");
console.log(libro.titulo, libro.autor, libro.isbn);

// Tarea 1: Socios
const socio = biblioteca.registrarSocio(31882, "Malena", "Klein");
const vip = biblioteca.registrarSocio(20321, "Tobias", "Villarroel", "vip");

// Tarea 2: Polimorfismo con Tipos de Préstamo
const libroDemo = new Libro("Clean Code", "Robert C. Martin", "999");

// Regular: 14 días, multa estándar
const prestamoReg = new PrestamoRegular(libroDemo, new Date());
console.log("Regular vence:", prestamoReg.calcularVencimiento());

// Tarea 3: Política de préstamo 
biblioteca.cambiarPolitica(new PoliticaFlexible());
biblioteca.prestarLibro(socio.id, "1984");

// Devolver (multa 0 para VIP por política del tipo de socio)
biblioteca.prestarLibro(vip.id, "1234");
const multa = biblioteca.devolverLibro(vip.id, "1234");
console.log("Multa VIP:", multa);

// Tarea 4: Buscadores
const cat = new CatalogoBiblioteca(["El quijote", "1984", "Rayuela"]);
const dig = new BibliotecaDigital(["Paper IA", "Manual TS", "Curso DB"]);
const arh = new ArchivoHistorico(["Carta 1810", "Decreto 1853"]);
const base = new BaseConocimiento(["Art. Grafos", "Art. NoSQL"]);

const buscador = new BuscadorUniversal();
buscador.agregarSistema(cat);
buscador.agregarSistema(dig);
buscador.agregarSistema(arh);
buscador.agregarSistema(base);

console.log("Buscar 'ar':", buscador.buscarEnTodos("ar"));
