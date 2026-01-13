"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Biblioteca_1 = require("./clases/Biblioteca");
const Socio_1 = require("./clases/Socio");
const biblioteca = new Biblioteca_1.Biblioteca();
biblioteca.agregarLibro("El quijote", { nombre: "Cervantes" }, "1234");
biblioteca.agregarLibro("1984", { nombre: "Orwell" }, "1984");
biblioteca.agregarLibro("Clean Code", { nombre: "Robert C. Martin" }, "5678");
biblioteca.agregarLibro("El Principito", { nombre: "Saint-Exupéry" }, "4321");
biblioteca.agregarLibro("POO en acción", { nombre: "Alan Turing" }, "9999");
const juan = biblioteca.registrarSocio(Socio_1.TipoSocio.REGULAR, 1, "Juan", "Pérez");
const ana = biblioteca.registrarSocio(Socio_1.TipoSocio.VIP, 2, "Ana", "García");
const sam = biblioteca.registrarSocio(Socio_1.TipoSocio.EMPLEADO, 3, "Samuel", "Olmos");
const lucas = biblioteca.registrarSocio(Socio_1.TipoSocio.VISITANTE, 4, "Lucas", "Martínez");
biblioteca.prestarLibro(1, "1234", "regular");
biblioteca.prestarLibro(2, "1984", "corto");
biblioteca.prestarLibro(3, "5678", "referencia");
biblioteca.prestarLibro(1, "4321", "digital");
biblioteca.setPoliticaPrestamo(new Biblioteca_1.PoliticaFlexible());
biblioteca.prestarLibro(2, "9999", "regular");
biblioteca.setPoliticaPrestamo(new Biblioteca_1.PoliticaEstudiante());
biblioteca.prestarLibro(1, "5678", "regular");
biblioteca.setPoliticaPrestamo(new Biblioteca_1.PoliticaDocente());
biblioteca.prestarLibro(3, "1234", "regular");
biblioteca.setPoliticaPrestamo(new Biblioteca_1.PoliticaEstricta());
biblioteca.reservarLibro(1, "1984");
biblioteca.reservarLibro(2, "1984");
const libroJuan = biblioteca.buscarLibro("1234");
if (libroJuan)
    juan.devolver(libroJuan);
const libroAna = biblioteca.buscarLibro("1984");
if (libroAna)
    ana.devolver(libroAna);
const catalogo = new Biblioteca_1.CatalogoBiblioteca([
    biblioteca.buscarLibro("1234"),
    biblioteca.buscarLibro("1984"),
    biblioteca.buscarLibro("5678"),
    biblioteca.buscarLibro("4321"),
    biblioteca.buscarLibro("9999")
].filter((l) => l !== null));
console.log("\n=== BUSCAR POR AUTOR 'Orwell' ===\n", catalogo.buscarPor("Orwell"));
console.log("\n=== FILTRAR POR TÍTULO QUE CONTIENE 'Code' ===\n", catalogo.filtrar(l => l.titulo.includes("Code")));
const digital = new Biblioteca_1.BibliotecaDigital([
    { titulo: "TypeScript avanzado" },
    { titulo: "Node.js para expertos" },
    { titulo: "Historia de la computación" }
]);
console.log("\n=== BUSCAR EN DIGITAL 'Node' ===\n", digital.buscarPor("Node"));
const historico = new Biblioteca_1.ArchivoHistorico([
    { titulo: "Acta fundacional" },
    { titulo: "Reglamento 1920" },
    { titulo: "Libro de visitas" }
]);
console.log("\n=== BUSCAR EN HISTÓRICO 'Acta' ===\n", historico.buscarPor("Acta"));
console.log("\n=== NOTIFICACIONES ===\n", biblioteca.obtenerNotificaciones());
console.log("\n=== MULTAS DE JUAN ===\n", juan.deuda);
console.log("\n=== MULTAS DE ANA ===\n", ana.deuda);
console.log("\n=== HISTORIAL DE JUAN ===\n", juan.obtenerHistorialLectura());
console.log("\n=== RECOMENDACIONES PARA ANA ===\n", ana.recomendacionesSimples());
// Ejemplo: SocioRegular intenta retirar más de 3 libros
try {
    biblioteca.prestarLibro(1, "5678", "regular");
    biblioteca.prestarLibro(1, "4321", "regular");
    biblioteca.prestarLibro(1, "9999", "regular"); // Excede el límite
}
catch (e) {
    console.log("[SocioRegular] Límite alcanzado:", e.message);
}
// Ejemplo: SocioVIP sin multas, período extendido
biblioteca.setPoliticaPrestamo(new Biblioteca_1.PoliticaEstudiante());
biblioteca.prestarLibro(2, "5678", "regular");
console.log("[SocioVIP] Libros en préstamo:", ana.librosEnPrestamo);
// Ejemplo: Empleado accede a libro de referencia
try {
    biblioteca.prestarLibro(3, "4321", "referencia");
    console.log("[Empleado] Préstamo de referencia exitoso");
}
catch (e) {
    console.log("[Empleado] Error:", e.message);
}
// Ejemplo: Visitante intenta retirar libro
try {
    biblioteca.prestarLibro(4, "1234", "regular");
}
catch (e) {
    console.log("[Visitante] No puede retirar:", e.message);
}
// Ejemplo: Políticas de préstamo
biblioteca.setPoliticaPrestamo(new Biblioteca_1.PoliticaEstricta());
try {
    biblioteca.prestarLibro(1, "1984", "regular"); // Si hay vencidos, no permite
}
catch (e) {
    console.log("[Política estricta] No permite préstamo:", e.message);
}
// Ejemplo: Búsqueda avanzada en catálogo
console.log("\n=== BUSCAR POR TÍTULO 'El' ===\n", catalogo.buscarPor("El"));
console.log("\n=== FILTRAR POR AUTOR 'Cervantes' ===\n", catalogo.filtrar(l => l.autor.nombre === "Cervantes"));
// Ejemplo: BibliotecaDigital y ArchivoHistorico
console.log("\n=== FILTRAR DIGITAL POR 'Historia' ===\n", digital.filtrar(r => r.titulo.includes("Historia")));
console.log("\n=== FILTRAR HISTÓRICO POR 'Reglamento' ===\n", historico.filtrar(d => d.titulo.includes("Reglamento")));
//# sourceMappingURL=index.js.map