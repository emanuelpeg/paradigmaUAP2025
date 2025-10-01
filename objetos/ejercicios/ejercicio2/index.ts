import { biblioteca } from "./clases/Biblioteca";
import { TipoSocio } from "./clases/Socio";
import { TipoPrestamo } from "./clases/Socio";

//libros
biblioteca.agregarLibro("El quijote", "Cervantes", "1234");
biblioteca.agregarLibro("Hábitos Atómicos", "James Clear", "2345");
const libro1984 = biblioteca.agregarLibro("1984", "Orwell", "1984");

//socios
const socio1 = biblioteca.registrarSocio(TipoSocio.REGULAR, 31882, "Lucciano", "Curotto");
const socio2 = biblioteca.registrarSocio(TipoSocio.VIP, 20321, "Luca", "Giordana");
const socio3 = biblioteca.registrarSocio(TipoSocio.EMPLEADO, 32451, "Samuel", "Olmos");

console.log("Libros cargados:");
console.log(libro1984.titulo, libro1984.autor, libro1984.isbn);

//prestamos
console.log("\n--- Préstamos ---");

//prestamo regular de socio regular
biblioteca.retirarLibro(socio1.id, "1234", TipoPrestamo.REGULAR);
console.log(`${socio1.nombreCompleto} retiró "El Quijote" con préstamo REGULAR.`);

//prestamo corto de socio vip
biblioteca.retirarLibro(socio2.id, "2345", TipoPrestamo.CORTO);
console.log(`${socio2.nombreCompleto} retiró "Hábitos Atómicos" con préstamo CORTO.`);

//prestamo digital de empleado
biblioteca.retirarLibro(socio3.id, "1984", TipoPrestamo.DIGITAL);
console.log(`${socio3.nombreCompleto} retiró "1984" con préstamo DIGITAL.`);

//vencimientos y multas
console.log("\n--- Vencimientos y multas ---");

//simulacion de devolucion
const fechaDevolucion = new Date();
fechaDevolucion.setDate(fechaDevolucion.getDate() + 10);

for (const socio of [socio1, socio2, socio3]) {
  for (const prestamo of (socio as any).prestamos) {
    const vencimiento = prestamo.calcularVencimiento();
    const multa = prestamo.calcularMulta(fechaDevolucion);

    console.log(
      `➡️ ${socio.nombreCompleto} tiene "${prestamo.libro.titulo}" 
       - Vence: ${vencimiento ? vencimiento.toDateString() : "Sin vencimiento"} 
       - Multa si devuelve el ${fechaDevolucion.toDateString()}: $${multa}`
    );
  }
}
