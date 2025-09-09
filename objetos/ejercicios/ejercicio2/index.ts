import { biblioteca } from "./clases/Biblioteca";
import { TipoSocio } from "./clases/Socio";
import { TipoPrestamo } from "./clases/Prestamo";
import { PoliticaFlexible, PoliticaEstricta, PoliticaEstudiante, PoliticaDocente } from "./clases/PoliticaPrestamo";
import { CatalogoBiblioteca, BibliotecaDigital, ArchivoHistorico, BaseConocimiento, BuscadorUniversal } from "./clases/IBuscable";

// ------------------socios y prestamos------------------------
console.log("-- socios y préstamos --");
biblioteca.agregarLibro("El quijote", "Cervantes", "1234");
const libro4 = biblioteca.agregarLibro("Hábitos Atómicos", "James Clear", "2345");
const libro1 = biblioteca.agregarLibro("1984", "George Orwell", "4567");
const libro2 = biblioteca.agregarLibro("Los juegos del hambre", "Suzanne Collins", "3456");
const libro3 = biblioteca.agregarLibro("Cien Años de Soledad", "Gabriel García Márquez", "5678");

biblioteca.registrarSocio(TipoSocio.REGULAR, 31882, "Lucciano", "Curotto");
biblioteca.registrarSocio(TipoSocio.VISITANTE, 20321, "Luca", "Giordana");
biblioteca.registrarSocio(TipoSocio.VIP, 32451, "Samuel", "Olmos");
const socioRegular = biblioteca.registrarSocio(TipoSocio.REGULAR, 38760, "Javier", "Porco");
const socioVIP = biblioteca.registrarSocio(TipoSocio.VIP, 30013, "Carlos", "Ruiz");
const empleado = biblioteca.registrarSocio(TipoSocio.EMPLEADO, 38780, "Esteban", "Quito");

// los socios que retiran los libros
socioRegular.retirar(libro1, TipoPrestamo.REGULAR);
socioRegular.retirar(libro2, TipoPrestamo.REGULAR);
socioVIP.retirar(libro3, TipoPrestamo.CORTO);
empleado.retirar(libro4, TipoPrestamo.REFERENCIA);

console.log(`Libros en préstamo socioRegular: ${socioRegular.librosEnPrestamo}`);
console.log(`Libros en préstamo socioVIP: ${socioVIP.librosEnPrestamo}`);

// Devolver libro y ver historial
socioRegular.devolver(libro1);
socioRegular.devolver(libro2);
socioVIP.devolver(libro3);
console.log(`Historial socioRegular: ${socioRegular.historialLectura.map(l => l.titulo)}`);
console.log(`Historial socioVIP: ${socioVIP.historialLectura.map(l => l.titulo)}`);

// ----------------Políticas de Préstamo (Strategy)------------------------
console.log("\n-- políticas de préstamo --");
biblioteca.setPolitica(new PoliticaEstricta());
biblioteca.prestarLibro(false); // Aprobado
biblioteca.prestarLibro(true);  // Rechazado

biblioteca.setPolitica(new PoliticaFlexible());
biblioteca.prestarLibro(true);  // Aprobado, duración reducida

biblioteca.setPolitica(new PoliticaEstudiante());
biblioteca.prestarLibro(false); // Aprobado, duración extendida

biblioteca.setPolitica(new PoliticaDocente());
biblioteca.prestarLibro(false); // Aprobado, larga duración

// ------------------------Buscador Universal------------------------
console.log("\n-- buscador universal --");
const catalogo = new CatalogoBiblioteca();
const digital = new BibliotecaDigital();
const archivo = new ArchivoHistorico();
const baseConocimiento = new BaseConocimiento();

const buscador = new BuscadorUniversal();
buscador.agregarSistema(catalogo);
buscador.agregarSistema(digital);
buscador.agregarSistema(archivo);
buscador.agregarSistema(baseConocimiento);

console.log("Buscar '1984':", buscador.buscarGlobal("1984"));
console.log("Buscar 'Quijote':", buscador.buscarGlobal("quijote"));
console.log("Filtrar libros del catálogo con 'harry' en el título:", catalogo.filtrarPor(l => l.toLowerCase().includes("harry")));
