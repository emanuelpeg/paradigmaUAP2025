import { SocioRegular, SocioVIP, Empleado, Visitante } from "./clases/Socio";
import { Libro } from "./clases/Libro";
import { PrestamoRegular, PrestamoCorto, PrestamoDigital } from "./clases/Prestamo";
import { PoliticaEstricta, PoliticaFlexible, PoliticaEstudiantil, PoliticaDocente } from "./clases/PoliticaPrestamo";
import { Biblioteca } from "./clases/Biblioteca";
import { CatalogoBiblioteca, BibliotecaDigital, ArchivoHistorico, BaseConocimiento, BuscadorUniversal } from "./clases/Buscador";


// --- Crear algunos socios ---
const socio1 = new SocioRegular("lucciano");
const socio2 = new SocioVIP("Samuel");
const socio3 = new Empleado("Lucca");
const socio4 = new Visitante("Jeremias");

// --- Crear libros ---
const libro1 = new Libro("Don Quijote", "Cervantes", "978-84-376-0494-7");
const libro2 = new Libro("Cien años de soledad", "García Márquez", "978-0307474728");

// --- Crear préstamos ---
const prestamo1 = new PrestamoRegular(libro1, socio1);
const prestamo2 = new PrestamoCorto(libro2, socio2);
const prestamo3 = new PrestamoDigital(libro1, socio3);

// Asociar préstamos a los socios
socio1.agregarPrestamo(prestamo1);
socio2.agregarPrestamo(prestamo2);
socio3.agregarPrestamo(prestamo3);

console.log("Préstamos de Lucciano:", socio1.prestamos);
console.log("Préstamos de Samuel:", socio2.prestamos);
console.log("Préstamos de Lucca:", socio3.prestamos);

// --- Biblioteca con políticas ---
const biblioteca = new Biblioteca();


console.log("¿Lucciano puede pedir más libros (Estricta)?", biblioteca.puedePrestar(socio1, socio1.prestamos));


biblioteca.setPolitica(new PoliticaFlexible());
console.log("¿Lucciano puede pedir más libros (Flexible)?", biblioteca.puedePrestar(socio1, socio1.prestamos));


biblioteca.setPolitica(new PoliticaEstudiantil());
console.log("¿Samuel puede pedir más libros (Estudiantil)?", biblioteca.puedePrestar(socio2, socio2.prestamos));


biblioteca.setPolitica(new PoliticaDocente());
console.log("¿Lucca puede pedir más libros (Docente)?", biblioteca.puedePrestar(socio3, socio3.prestamos));

// --- Buscadores ---
const catalogo = new CatalogoBiblioteca();
const digital = new BibliotecaDigital();
const historico = new ArchivoHistorico();
const baseConocimiento = new BaseConocimiento();

// Crear buscador universal
const buscador = new BuscadorUniversal(catalogo, digital, historico, baseConocimiento);

console.log("Buscar 'Don' en todos los sistemas:", buscador.buscarEnTodos("Don"));
console.log("Buscar 'Paper' en todos los sistemas:", buscador.buscarEnTodos("Paper"));

