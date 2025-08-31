import { biblioteca, PoliticaEstricta, PoliticaFlexible } from "./clases/Biblioteca";
import { TipoSocio, TipoPrestamo } from "./clases/Socio";

const autores = [
	"Cervantes",
	"James Clear",
	"Orwell",
	"Isaac Asimov",
	"Gabriel García Márquez",
	"J.R.R. Tolkien",
	"Stephen King",
	"Haruki Murakami",
	"Jane Austen",
	"George R.R. Martin",
];

for (let i = 0; i < 60; i++) {
	const a = autores[i % autores.length];
	biblioteca.agregarLibro(`Libro ${i + 1} - ${a}`, a, `ISBN-${i + 1}`);
}

const sociosDatos: Array<[TipoSocio, number, string, string]> = [
	[TipoSocio.REGULAR, 1001, "Ana", "Pérez"],
	[TipoSocio.REGULAR, 1002, "Luis", "Gómez"],
	[TipoSocio.REGULAR, 1003, "María", "Ramírez"],
	[TipoSocio.VIP, 2001, "Carla", "Fernández"],
	[TipoSocio.VIP, 2002, "Pablo", "Bernat"],
	[TipoSocio.EMPLEADO, 3001, "Sergio", "Luna"],
	[TipoSocio.EMPLEADO, 3002, "Marta", "Núñez"],
	[TipoSocio.VISITANTE, 4001, "Visita", "Uno"],
	[TipoSocio.VISITANTE, 4002, "Visita", "Dos"],
];

for (const [t, id, nom, ape] of sociosDatos) biblioteca.registrarSocio(t, id, nom, ape);

function prestar(socioId: number, isbn: string, tipo: TipoPrestamo, dias?: number) {
	const socio = biblioteca.buscarSocio(socioId);
	const libro = biblioteca.buscarLibro(isbn);
	if (!socio || !libro) return;
	try {
		(socio as any).retirar(libro, dias, tipo);
		console.log(`-> ${socio.nombreCompleto} retiró ${libro.titulo} (${tipo})`);
	} catch (e) {
		console.log(`! no se pudo prestar ${libro?.titulo} a ${socio.nombreCompleto}: ${(e as Error).message}`);
	}
}

prestar(1001, "ISBN-1", TipoPrestamo.REGULAR);
prestar(1001, "ISBN-2", TipoPrestamo.CORTO);
prestar(1002, "ISBN-3", TipoPrestamo.REGULAR, -5);
prestar(2001, "ISBN-4", TipoPrestamo.DIGITAL);
prestar(2002, "ISBN-5", TipoPrestamo.REFERENCIA);
prestar(3001, "ISBN-6", TipoPrestamo.REGULAR, -10);
prestar(3002, "ISBN-7", TipoPrestamo.REGULAR);

for (let i = 8; i <= 20; i++) {
	prestar(2001, `ISBN-${i}`, TipoPrestamo.REGULAR);
}

function devolverYMostrar(socioId: number, isbn: string) {
	try {
		const res = biblioteca.devolverLibro(socioId, isbn);
		if (res && typeof res === "object" && "multa" in res) {
			console.log(`<- ${biblioteca.buscarSocio(socioId)?.nombreCompleto} devolvió ${isbn} -> multa: $${(res as any).multa}`);
		}
	} catch (e) {
		console.log(`! error devolviendo ${isbn} por socio ${socioId}: ${(e as Error).message}`);
	}
}

devolverYMostrar(1002, "ISBN-3");
devolverYMostrar(3001, "ISBN-6");

console.log("\nProbando políticas:");
biblioteca.setPolitica(new PoliticaEstricta());
try {
	prestar(1002, "ISBN-8", TipoPrestamo.REGULAR);
} catch (e) {}

biblioteca.setPolitica(new PoliticaFlexible());
prestar(1002, "ISBN-9", TipoPrestamo.REGULAR);

const encontrados = biblioteca.buscador.buscar<any>((l: any) => l.autor === "Orwell");
const encontradosUnicosPorAutor = encontrados.filter((v, i, a) => a.findIndex(x => x.autor === v.autor) === i);
console.log("\nEncontrados por buscador universal ->", encontradosUnicosPorAutor.map((x: any) => x.titulo));

const todos = (biblioteca as any).catalogo.buscarPor((x: any) => true);
console.log(`\nInventario total: ${todos.length} libros`);
console.log(todos.slice(0, 20).map((b: any) => b.titulo).join(" | "));

console.log("\nSocios y cantidad de libros en préstamo:");
for (const sdata of [1001, 1002, 2001, 2002, 3001, 3002]) {
	const s = biblioteca.buscarSocio(sdata);
	console.log(`- ${s?.nombreCompleto} (${sdata}) -> ${s?.librosEnPrestamo ?? 0}`);
}



