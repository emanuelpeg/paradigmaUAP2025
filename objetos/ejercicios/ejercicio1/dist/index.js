import { Biblioteca } from "./clases/Biblioteca.js";
import { TipoSocio } from "./clases/Socio.js";
const biblioteca = new Biblioteca();
biblioteca.agregarLibro("El quijote", { nombre: "Cervantes" }, "1234");
biblioteca.agregarLibro("Hábitos Atómicos", { nombre: "James Clear" }, "2345");
biblioteca.agregarLibro("1984", { nombre: "Orwell" }, "1984");
biblioteca.agregarLibro("Clean Code", { nombre: "Robert C. Martin" }, "5678");
biblioteca.agregarLibro("El Principito", { nombre: "Saint-Exupéry" }, "4321");
biblioteca.registrarSocio(TipoSocio.REGULAR, 31882, "Lucciano", "Curotto");
biblioteca.registrarSocio(TipoSocio.VIP, 20321, "Luca", "Giordana");
biblioteca.registrarSocio(TipoSocio.EMPLEADO, 32451, "Samuel", "Olmos");
biblioteca.registrarSocio(TipoSocio.VISITANTE, 40001, "Ana", "Pérez");
biblioteca.reservarLibro(31882, "5678");
biblioteca.reservarLibro(20321, "5678");
biblioteca.reservarLibro(40001, "4321");
biblioteca.retirarLibro(31882, "1234");
biblioteca.retirarLibro(20321, "2345");
biblioteca.retirarLibro(32451, "1984");
biblioteca.devolverLibro(31882, "1234");
biblioteca.devolverLibro(20321, "2345");
biblioteca.devolverLibro(32451, "1984");
biblioteca.agregarEvento({ titulo: "Charla de POO", fecha: "2025-09-10" });
biblioteca.agregarEvento({ titulo: "Taller de TypeScript", fecha: "2025-09-15" });
function mostrarLibros(libros) {
    return libros
        .map((l) => `- ${l._titulo} (${l._autor.nombre}) [ISBN: ${l._isbn}]`)
        .join("\n");
}
// Método público para obtener eventos
function mostrarEventos() {
    // Simulación: obtener eventos desde notificaciones (o agregar método en Biblioteca si lo prefieres)
    // Aquí se asume que los eventos se agregan como notificaciones con el texto "Nuevo evento: ..."
    return biblioteca
        .obtenerNotificaciones()
        .filter((n) => n.startsWith("Nuevo evento:"))
        .map((n) => `* ${n.replace("Nuevo evento: ", "")}`)
        .join("\n");
}
console.log("\n=== LIBROS DE CERVANTES ===\n" +
    mostrarLibros(biblioteca.buscarLibrosPorAutor("Cervantes")));
console.log("\n=== LIBROS DE ORWELL ===\n" +
    mostrarLibros(biblioteca.buscarLibrosPorAutor("Orwell")));
console.log("\n=== NOTIFICACIONES ===\n" +
    biblioteca.obtenerNotificaciones().map((n) => `* ${n}`).join("\n"));
console.log("\n=== HISTORIAL DE LUCCIANO ===\n" +
    mostrarLibros(biblioteca.obtenerHistorialSocio(31882)));
console.log("\n=== RECOMENDACIONES PARA LUCA ===\n" +
    biblioteca.obtenerRecomendacionesSocio(20321)
        .map((r) => `- ${r}`)
        .join("\n"));
console.log("\n=== EVENTOS ===\n" +
    mostrarEventos());
