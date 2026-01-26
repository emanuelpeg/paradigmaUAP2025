// index.ts
import { biblioteca } from "./Biblioteca";

//  AUTORES 
const cervantes = biblioteca.agregarAutor(1, "Miguel de Cervantes");
const clear     = biblioteca.agregarAutor(2, "James Clear");
const orwell    = biblioteca.agregarAutor(3, "George Orwell");

//  LIBROS
biblioteca.agregarLibro("El Quijote", cervantes, "1234");
biblioteca.agregarLibro("Hábitos Atómicos", clear, "2345");
const libro1984 = biblioteca.agregarLibro("1984", orwell, "1984");


console.log(libro1984.titulo, libro1984.autor.nombre, libro1984.isbn);


console.log(
  "Libros de Orwell:",
  biblioteca.librosDeAutor(orwell.id).map(l => l.titulo)
);

// SOCIOS 
biblioteca.registrarSocio(31882, "Lucciano", "Curotto");
biblioteca.registrarSocio(20321, "Luca", "Giordana");
biblioteca.registrarSocio(32451, "Samuel", "Olmos");

// RESERVAS 
const s1 = biblioteca.registrarSocio(40001, "Cindy", "Molina");
const s2 = biblioteca.registrarSocio(40002, "Sofia", "Molina");

biblioteca.retirarLibro(s2.id, "1234");   // s2 retira "El Quijote"
biblioteca.retirarLibro(s1.id, "1234");   // s1 reserva (cola)
biblioteca.devolverLibro(s2.id, "1234");  // avisa a s1

//  MULTAS 
const cindy = biblioteca.registrarSocio(50001, "Cindy", "Molina");
const fundDemo = biblioteca.agregarLibro("Fundación (demo multas)", orwell, "F-001");
biblioteca.retirarLibro(cindy.id, "F-001");


const tarde = new Date();
tarde.setDate(tarde.getDate() + 20);
biblioteca.devolverLibro(cindy.id, "F-001", tarde);


try {
  biblioteca.retirarLibro(cindy.id, "1984");
} catch (e) {
  console.log("🚫 Bloqueo por multa:", (e as Error).message);
}

// Pagar multa (pago alto para dejar en 0)
biblioteca.pagarMulta(cindy.id, 999999);


biblioteca.retirarLibro(cindy.id, "1984");

//  EVENTOS + NOTIFICACIONES
const socioNotif = biblioteca.registrarSocio(60001, "Oscar", "Irias");
const ev = biblioteca.crearEvento(
  1,
  "Club de Lectura – Asimov",
  new Date(Date.now() + 2 * 86400000),
  "Debate sobre Fundación"
);
biblioteca.inscribirEnEvento(ev.id, socioNotif.id);
biblioteca.enviarRecordatoriosEventos(new Date());


const verInbox = (id: number) => {
  const s = (biblioteca as any).buscarSocio(id);
  if (s) console.log(`\n📥 Inbox de ${s.nombreCompleto}:`, s.inbox);
};
verInbox(40001); 
verInbox(40002); 
verInbox(50001); 
verInbox(60001);

//  RECOMENDACIONES 

const recomendaciones = biblioteca.recomendarLibros(50001, 5);
console.log("💡 Recomendaciones para Cindy:", recomendaciones.map(l => l.titulo));
