import { Libro } from "./Libro";
import { PrestamoRegular, PrestamoCorto, PrestamoReferencia, PrestamoDigital } from "./Prestamo";
import { biblioteca } from "./Biblioteca";
import { TipoSocio } from "./Socio";
import { PoliticaFlexible, PoliticaEstudiante } from "./Politica";
import { BuscadorUniversal } from "./BuscadorUniversal";
import { CatalogoBiblioteca, BibliotecaDigital, ArchivoHistorico, BaseConocimiento } from "./SistemasBusqueda";


// ========================
// ACTIVIDAD 2: Tipos de Préstamo
// ========================
const libro1 = new Libro("El Quijote", "Cervantes", "123");
const libro2 = new Libro("1984", "Orwell", "456");

const hoy = new Date();
const prestamo1 = new PrestamoRegular(libro1, hoy);
const prestamo2 = new PrestamoCorto(libro2, hoy);
const prestamo3 = new PrestamoReferencia(libro1, hoy);
const prestamo4 = new PrestamoDigital(libro2, hoy);

// Crear fecha de devolución 15 días después
const devolucion15dias = new Date(hoy);
devolucion15dias.setDate(hoy.getDate() + 15);
console.log("Multa Regular (15 días después):", prestamo1.calcularMulta(devolucion15dias));

// Crear fecha de devolución 10 días después
const devolucion10dias = new Date(hoy);
devolucion10dias.setDate(hoy.getDate() + 10);
console.log("Multa Corto (10 días después):", prestamo2.calcularMulta(devolucion10dias));

// Los que no generan multa (Referencia y Digital)
const devolucionReferencia = new Date(hoy);
console.log("Referencia multa:", prestamo3.calcularMulta(devolucionReferencia));

const devolucionDigital = new Date(hoy);
console.log("Digital multa:", prestamo4.calcularMulta(devolucionDigital));


// ========================
// ACTIVIDAD 3: Políticas de Préstamo (Strategy)
// ========================
const socio1 = biblioteca.registrarSocio(TipoSocio.REGULAR, 1, "Ana", "Lopez");
// Agregar libros a la biblioteca (Actividad 1 base)
biblioteca.agregarLibro("El Quijote", "Cervantes", "111");
biblioteca.agregarLibro("1984", "Orwell", "222");


// Política estricta
try {
  biblioteca.retirarLibro(1, "111");
  console.log("Ana retiró un libro con política estricta.");
} catch (error) {
  console.error(error);
}

// Cambiar a política flexible
biblioteca.cambiarPolitica(new PoliticaFlexible());
try {
  biblioteca.retirarLibro(1, "222");
  console.log("Ana retiró un libro con política flexible.");
} catch (error) {
  console.error(error);
}

// Cambiar a política estudiante
biblioteca.cambiarPolitica(new PoliticaEstudiante());
try {
  biblioteca.retirarLibro(1, "111");
  console.log("Ana retiró un libro con política de estudiante.");
} catch (error) {
  console.error(error);
}


// ========================
// ACTIVIDAD 4: Buscador Universal (Interfaces y Polimorfismo)
// ========================
const buscador = new BuscadorUniversal();

buscador.agregarSistema(new CatalogoBiblioteca());
buscador.agregarSistema(new BibliotecaDigital());
buscador.agregarSistema(new ArchivoHistorico());
buscador.agregarSistema(new BaseConocimiento());

console.log("Buscar 'Code':", buscador.buscarEnTodos("Code"));
console.log("Buscar '1853':", buscador.buscarEnTodos("1853"));
console.log("Buscar 'AI':", buscador.buscarEnTodos("AI"));
