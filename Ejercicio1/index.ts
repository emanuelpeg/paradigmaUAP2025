import { biblioteca } from "./clases/Biblioteca";
import { Autor } from "./clases/Autor";

console.log("=== SISTEMA DE BIBLIOTECA ===\n");

// 1. Agregar libros
console.log("1. Agregando libros al inventario...");
const libro1 = biblioteca.agregarLibro("El quijote", new Autor("Juan", "Pedro", "Biografía de Juan Pedro", new Date(1990, 1, 1)), "1234");
const libro2 = biblioteca.agregarLibro("Hábitos Atómicos", new Autor("James", "Clear", "Biografía de James Clear", new Date(1980, 1, 1)), "2345");
const libro3 = biblioteca.agregarLibro("1984", new Autor("Orwell", "George", "Biografía de George Orwell", new Date(1903, 1, 1)), "1984");

// 2. Registrar socios
console.log("\n2. Registrando socios...");
const socio1 = biblioteca.registrarSocio(31882, "Lucciano", "Curotto");
const socio2 = biblioteca.registrarSocio(20321, "Luca", "Giordana");
const socio3 = biblioteca.registrarSocio(32451, "Samuel", "Olmos");

// 3. Mostrar estadísticas iniciales
console.log("\n3. Estadísticas iniciales:");
console.log(biblioteca.obtenerEstadisticas());

// 4. Retirar libro (socio1 retira libro1)
console.log("\n4. Retiro de libro...");
try {
  biblioteca.retirarLibro(socio1.id, libro1.isbn);
  console.log(`✓ ${socio1.nombreCompleto} retiró '${libro1.titulo}'`);
} catch (e) {
  console.error("✗", (e as Error).message);
}

// 5. Intentar retirar el mismo libro por otro socio (debe ir a cola de espera)
console.log("\n5. Intentando retirar libro ya prestado...");
try {
  biblioteca.retirarLibro(socio2.id, libro1.isbn);
} catch (e) {
  console.log("✓ Socio agregado a cola de espera:", (e as Error).message);
}

// 6. Devolver libro (simular vencimiento para multa)
console.log("\n6. Devolver libro con multa...");
(libro1 as any).PrestamoActual.vencimiento = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000); // 3 días vencido
biblioteca.devolverLibro(socio1.id, libro1.isbn);

// 7. Pagar multa y retirar libro desde la cola de espera
console.log("\n7. Pagar multas y retirar desde cola...");
socio1.pagarMulta(); // Pagar la multa antes de poder retirar otro libro
try {
  biblioteca.retirarLibro(socio2.id, libro1.isbn);
  console.log(`✓ ${socio2.nombreCompleto} retiró '${libro1.titulo}' desde la cola de espera`);
} catch (e) {
  console.error("✗", (e as Error).message);
}

// 8. Ver notificaciones de socios
console.log("\n8. Notificaciones:");
console.log(`📧 Notificaciones de ${socio1.nombreCompleto}:`, socio1.obtenerNotificaciones().map(n => n.mensaje));
console.log(`📧 Notificaciones de ${socio2.nombreCompleto}:`, socio2.obtenerNotificaciones().map(n => n.mensaje));

// 9. Recomendar libros para socio1
console.log("\n9. Recomendaciones:");
const recomendaciones = biblioteca.recomendarLibrosParaSocio(socio1.id);
console.log(`📚 Recomendaciones para ${socio1.nombreCompleto}:`, recomendaciones.map(l => l.titulo));

// 10. Estadísticas finales
console.log("\n10. Estadísticas finales:");
console.log(biblioteca.obtenerEstadisticas());

// 11. Estado de libros
console.log("\n11. Estado de libros:");
console.log(`📖 El Quijote: ${biblioteca.estadoLibro("1234")}`);
console.log(`📖 Hábitos Atómicos: ${biblioteca.estadoLibro("2345")}`);
console.log(`📖 1984: ${biblioteca.estadoLibro("1984")}`);

console.log("\n=== FIN DE LA DEMOSTRACIÓN ===");