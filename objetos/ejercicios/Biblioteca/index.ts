import { biblioteca } from "./Biblioteca";
import { EventoBiblioteca } from "./EventoBiblioteca";

// --- Crear libros ---
const libro1 = biblioteca.agregarLibro("1984", "Orwell", "1111");
const libro2 = biblioteca.agregarLibro("El Quijote", "Cervantes", "2222");
const libro3 = biblioteca.agregarLibro("Ficciones", "Jorge Luis Borges", "3333");
const libro4 = biblioteca.agregarLibro("Animal Farm", "Orwell", "4444");

// --- Crear socios ---
const socio1 = biblioteca.registrarSocio(1, "Agos", "Lopez");
const socio2 = biblioteca.registrarSocio(2, "Juan", "Perez");
const socio3 = biblioteca.registrarSocio(3, "Ana", "Gomez");

// --- Probar reservas ---
console.log("\n--- PROBANDO RESERVAS ---");
biblioteca.retirarLibro(socio1.id, libro1.isbn); // socio1 retira
biblioteca.retirarLibro(socio2.id, libro1.isbn); // socio2 queda en reserva
biblioteca.retirarLibro(socio3.id, libro1.isbn); // socio3 queda en reserva

// --- Generar multa ---
console.log("\n--- PROBANDO MULTA ---");
const socioInterno = biblioteca.buscarSocio(socio1.id);
if (socioInterno) {
  // Simular retraso de 5 días
  (socioInterno as any).prestamos[0].vencimiento.setDate(new Date().getDate() - 5);
}
biblioteca.devolverLibro(socio1.id, libro1.isbn);
console.log("Deuda actual de socio1:", biblioteca.consultarDeuda(socio1.id));

// --- Bloqueo por deuda ---
console.log("\n--- PROBANDO BLOQUEO POR DEUDA ---");
try {
  biblioteca.retirarLibro(socio1.id, libro2.isbn);
} catch (e) {
  console.error("Error al retirar libro por deuda:", (e as Error).message);
}

// --- Pagar multa ---
console.log("\n--- PAGANDO MULTA ---");
socio1.pagarMulta();
biblioteca.retirarLibro(socio1.id, libro2.isbn);

// --- Historial y recomendaciones ---
console.log("\n--- PROBANDO HISTORIAL Y RECOMENDACIONES ---");
biblioteca.devolverLibro(socio1.id, libro2.isbn);
const recomendaciones = biblioteca.recomendarLibros(socio1.id);
console.log("Recomendaciones para socio1:");
recomendaciones.forEach((libro) =>
  console.log(`- ${libro.titulo} de ${libro.autor.nombre}`)
);

// --- Eventos y notificaciones ---
console.log("\n--- PROBANDO EVENTOS ---");
const evento1 = new EventoBiblioteca(
  "Club de Lectura Orwell",
  "Analizamos obras de George Orwell",
  new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000) // 2 días
);
evento1.inscribirSocio(socio1);
evento1.inscribirSocio(socio2);
evento1.notificarEvento(); // notifica

// --- Mostrar notificaciones acumuladas ---
console.log("\n--- NOTIFICACIONES SOCIOS ---");
[socio1, socio2, socio3].forEach((socio) => {
  socio.mostrarNotificaciones();
});

// --- Buscar libros por autor ---
console.log("\n--- BUSCAR LIBROS POR AUTOR ---");
const librosOrwell = biblioteca.buscarLibrosPorAutor("Orwell");
console.log("Libros de Orwell:");
librosOrwell.forEach((libro) => console.log(`- ${libro.titulo}`));