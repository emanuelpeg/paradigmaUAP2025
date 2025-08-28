import { biblioteca } from "./clases/Biblioteca";
import { Autor } from "./clases/Autor";
import { EventoBiblioteca } from "./clases/EventoBiblioteca";

const autores = [
	new Autor("Miguel de Cervantes", "Autor del Quijote", 1547),
	new Autor("George Orwell", null, 1903),
	new Autor("James Clear"),
	new Autor("J.K. Rowling"),
	new Autor("Isaac Asimov"),
	new Autor("Gabriel García Márquez"),
	new Autor("J.R.R. Tolkien"),
	new Autor("Stephen King"),
	new Autor("Haruki Murakami"),
	new Autor("Jane Austen"),
];

for (let i = 0; i < 40; i++) {
	const a = autores[i % autores.length];
	biblioteca.agregarLibro(`Libro ${i + 1} - ${a.nombre}`, a, `ISBN-${i + 1}`);
}

const nombres: Array<[number, string, string]> = [
	[31882, "Lucciano", "Curotto"],
	[20321, "Luca", "Giordana"],
	[32451, "Samuel", "Olmos"],
	[40001, "Ana", "Pérez"],
	[40002, "María", "González"],
	[40003, "Carlos", "Ramírez"],
	[40004, "Lucía", "Martínez"],
	[40005, "Sofía", "López"],
	[40006, "Diego", "Sosa"],
	[40007, "Elena", "Torres"],
	[40008, "Mateo", "Ramos"],
	[40009, "Valentina", "Flores"],
	[40010, "Bruno", "Castro"],
	[40011, "Marta", "Vega"],
	[40012, "Pablo", "Iglesias"],
	[40013, "Clara", "Ruiz"],
	[40014, "Andrés", "Morales"],
	[40015, "Nora", "Herrera"],
	[40016, "Iván", "Giménez"],
	[40017, "Paula", "Rojas"],
	[40018, "Brenda", "Silva"],
	[40019, "Gonzalo", "Molina"],
	[40020, "Romina", "Delgado"],
	[40021, "Raúl", "Benítez"],
	[40022, "Flor", "Domínguez"],
	[40023, "Gabriel", "Suárez"],
	[40024, "Nadia", "Sánchez"],
	[40025, "Santiago", "Cabrera"],
	[40026, "Agustina", "Ortega"],
	[40027, "Facundo", "Díaz"],
];
for (const [id, nom, ape] of nombres) biblioteca.registrarSocio(id, nom, ape);

for (let i = 0; i < 10; i++) {
	const socioId = 10000 + i;
	const isbn = `ISBN-${2 * i + 1}`;
	try {
		biblioteca.retirarLibro(socioId, isbn);
	} catch (e) {}
}

for (let i = 10; i < 30; i++) {
	const socioId = 10000 + i;
	const isbn = `ISBN-${(i % 10) * 2 + 1}`;
	try {
		biblioteca.retirarLibro(socioId, isbn);
	} catch (e) {}
}

const prestamosForzados: Array<[number, string, number]> = [
	[31882, "ISBN-1", -8],
	[20321, "ISBN-3", -3],
	[32451, "ISBN-5", -1],
	[40001, "ISBN-7", 0],
	[40002, "ISBN-9", 2],
	[40003, "ISBN-11", -15],
	[40004, "ISBN-13", -7],
];
for (const [sId, isbn, offset] of prestamosForzados) {
	try {
		const venc = new Date();
		venc.setDate(venc.getDate() + offset);
		biblioteca.forzarPrestamo(sId, isbn, venc);
	} catch (e) {}
}

for (const [sId, isbn] of prestamosForzados) {
	try {
		biblioteca.devolverLibro(sId, isbn);
	} catch (e) {}
}

const librosCervantes = biblioteca.librosDeAutor("Miguel de Cervantes");
console.log(`Libros de Cervantes: ${librosCervantes.map((b) => b.titulo).join(", ")}`);

const todasNotificaciones = biblioteca.obtenerNotificaciones();
console.log(`\nTenés ${todasNotificaciones.length} notificaciones recientes:`);
todasNotificaciones.forEach((n) => console.log("- " + n));

const ejemploLibro = biblioteca.buscarLibro("ISBN-1");
console.log("buscarLibro ISBN-1 ->", ejemploLibro ? ejemploLibro.titulo : "no encontré nada");

const ejemploSocio = biblioteca.buscarSocio(31882);
console.log("buscarSocio 31882 ->", ejemploSocio ? ejemploSocio.nombreCompleto : "no apareció");

const libro15 = biblioteca.buscarLibro("ISBN-15");
if (libro15) {
	libro15.reservar(40005);
	libro15.reservar(40006);
	console.log("siguiente en la lista (ISBN-15) ->", libro15.proximoReservante());
	libro15.cancelarReserva(40005);
	console.log("siguiente después de cancelar ->", libro15.proximoReservante());
	const popped = libro15.popReservante();
	console.log("se notificará a ->", popped);
}

if (ejemploSocio) {
	console.log("historial del socio 31882 ->", ejemploSocio.historialLectura());
	const recs = biblioteca.recomendarPara(31882);
	console.log("te recomiendo (para 31882) ->", recs.map((r) => r.titulo));
}

const socioParaMulta = biblioteca.buscarSocio(40003);
if (socioParaMulta) {
	try {
		biblioteca.forzarPrestamo(socioParaMulta.id, "ISBN-21", new Date(Date.now() - 1000 * 60 * 60 * 24 * 5));
		biblioteca.devolverLibro(socioParaMulta.id, "ISBN-21");
		console.log("Tenés deuda de ->", socioParaMulta.deuda);
		socioParaMulta.pagar(100);
		console.log("Después de pagar 100, te queda ->", socioParaMulta.deuda);
	} catch (e) {
		console.log("Error forzar multa/test pagar:", (e as Error).message);
	}
}

const eventoTest = new EventoBiblioteca("Charla prueba", new Date(Date.now() + 1000 * 60 * 60 * 24), "Descripcion");
if (ejemploSocio) eventoTest.registrar(ejemploSocio);
const otroSocio = biblioteca.buscarSocio(40001);
if (otroSocio) eventoTest.registrar(otroSocio);
console.log("Quienes vienen al evento ->", eventoTest.listarAsistentes());
biblioteca.registrarEvento(eventoTest);
console.log("Eventos en la biblio ->", biblioteca.listarEventos());
biblioteca.registrarEvento(eventoTest);
console.log("Eventos en la biblio ->", biblioteca.listarEventos());
