import { biblioteca } from "./clases/Biblioteca";
import { TipoSocio } from "./clases/Socio";
import { PrestamoRegular, PrestamoCorto, PrestamoReferencia, PrestamoDigital, Prestamo } from "./clases/Prestamo";
import { IBuscable, CatalogoBiblioteca, BibliotecaDigital, ArchivoHistorico, BaseConocimiento } from "./clases/IBuscable";

// --- Registro de libros y socios ---
biblioteca.agregarLibro("El quijote", "Cervantes", "1234");
biblioteca.agregarLibro("Hábitos Atómicos", "James Clear", "2345");
const libro = biblioteca.agregarLibro("1984", "Orwell", "1986");

const socio = biblioteca.registrarSocio(TipoSocio.REGULAR, 31882, "Lucciano", "Curotto");
biblioteca.registrarSocio(TipoSocio.VIP, 20321, "Luca", "Giordana");
biblioteca.registrarSocio(TipoSocio.VISITANTE, 32451, "Samuel", "Olmos");

console.log("Libro agregado:", libro.titulo, libro.autor, libro.isbn);
console.log("Socio registrado:", socio);

// --- Ejemplo de uso polimórfico de préstamos ---
const prestamos: Prestamo[] = [
    new PrestamoRegular(new Date("2025-09-01")),
    new PrestamoCorto(new Date("2025-09-01")),
    new PrestamoReferencia(new Date("2025-09-01")),
    new PrestamoDigital(new Date("2025-09-01")),
];

const hoy = new Date();

prestamos.forEach((prestamo, i) => {
    const vencimiento = prestamo.calcularVencimiento();
    const diasAtraso = Math.max(0, Math.floor((hoy.getTime() - vencimiento.getTime()) / (1000 * 60 * 60 * 24)));
    const multa = prestamo.calcularMulta(diasAtraso);
    console.log(
        `Préstamo ${i + 1}: Vencimiento: ${vencimiento.toDateString()}, ` +
        `Días de atraso: ${diasAtraso}, Multa: $${multa}`
    );
});

// --- Ejemplo de uso de IBuscable ---
const catalogo = new CatalogoBiblioteca(["El Quijote", "1984", "Cien Años de Soledad"]);
const digital = new BibliotecaDigital(["Curso de TypeScript", "Guía de Node.js"]);
const archivo = new ArchivoHistorico(["Documento 1789", "Manuscrito 1492"]);
const base = new BaseConocimiento(["Artículo IA", "Investigación Blockchain"]);

const buscables: IBuscable[] = [catalogo, digital, archivo, base];

console.log("\n--- Búsqueda global ---");
buscables.forEach((item, i) => {
    const resultados = item.buscarPor("1984");
    console.log(`Resultados en buscable ${i + 1}:`, resultados);
});

console.log("\n--- Filtrado ejemplo ---");
buscables.forEach((item, i) => {
    const filtrados = item.filtrar((x) => x.length > 10);
    console.log(`Filtrados en buscable ${i + 1}:`, filtrados);
});
