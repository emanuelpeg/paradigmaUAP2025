// Simulación de envío y lectura de notificaciones


import { Notificacion } from './Clases/Notificacion';
import { Socio } from './Clases/Socio';
import { biblioteca } from './Clases/Biblioteca';

// Registrar autores en la biblioteca y obtener referencias
const autorCervantes = biblioteca.registrarAutor("Miguel de Cervantes", "Novelista, poeta y dramaturgo español.", 1547);
const autorClear = biblioteca.registrarAutor("James Clear", "Autor de desarrollo personal y hábitos.", 1986);
const autorOrwell = biblioteca.registrarAutor("George Orwell", "Novelista, ensayista y periodista británico.", 1903);
const autorMarquez = biblioteca.registrarAutor("Gabriel García Márquez", "Escritor colombiano, Nobel de Literatura.", 1927);
const autorCortazar = biblioteca.registrarAutor("Julio Cortázar", "Escritor, traductor e intelectual argentino.", 1914);
const autorBorges = biblioteca.registrarAutor("Jorge Luis Borges", "Escritor, poeta y ensayista argentino.", 1899);
const autorGuiraldes = biblioteca.registrarAutor("Ricardo Güiraldes", "Novelista y poeta argentino.", 1886);
const autorSabato = biblioteca.registrarAutor("Ernesto Sabato", "Escritor, ensayista y físico argentino.", 1911);
const autorBioy = biblioteca.registrarAutor("Adolfo Bioy Casares", "Escritor argentino de ficción y colaborador de Borges.", 1914);

biblioteca.registrarSocio("Facundo", "Gonzalez");
biblioteca.registrarSocio("Juan", "Perez");
biblioteca.registrarSocio("Ana", "Gomez");

// Agregar 7 libros más
biblioteca.agregarLibro("Cien años de soledad", autorMarquez, "4567");
biblioteca.agregarLibro("Rayuela", autorCortazar, "5678");
biblioteca.agregarLibro("Fervor de Buenos Aires", autorBorges, "6789");
biblioteca.agregarLibro("El Aleph", autorBorges, "7890");
biblioteca.agregarLibro("Don Segundo Sombra", autorGuiraldes, "8901");
biblioteca.agregarLibro("Sobre héroes y tumbas", autorSabato, "9012");
biblioteca.agregarLibro("La invención de Morel", autorBioy, "0123");
biblioteca.agregarLibro("El Quijote", autorCervantes, "1234");
biblioteca.agregarLibro("Habitos Atomicos", autorClear, "2345");
biblioteca.agregarLibro("1984", autorOrwell, "3456");
// Agregar 2 socios más
biblioteca.registrarSocio("Lucía", "Martínez"); // id 4
biblioteca.registrarSocio("Carlos", "Ramírez"); // id 5
/*
// Simulación de retiros, reservas y devoluciones
// 1. Facundo retira El Quijote
biblioteca.retirarLibro(1, "1234", 7);
console.log("Facundo retiró El Quijote");

// 2. Juan retira Habitos Atomicos
biblioteca.retirarLibro(2, "2345", 7);
console.log("Juan retiró Habitos Atomicos");

// 3. Ana intenta retirar El Quijote (ya prestado)
try {
	biblioteca.retirarLibro(3, "1234", 7);
	console.log("Ana retiró El Quijote");
} catch (error) {
	console.log("Ana no pudo retirar El Quijote: " + (error as Error).message);
}

// 4. Ana reserva El Quijote
try {
	biblioteca.reservarLibro(3, "1234");
	console.log("Ana reservó El Quijote");
} catch (error) {
	console.log("Ana no pudo reservar El Quijote: " + (error as Error).message);
}

// 5. Lucía reserva El Quijote
try {
	biblioteca.reservarLibro(4, "1234");
	console.log("Lucía reservó El Quijote");
} catch (error) {
	console.log("Lucía no pudo reservar El Quijote: " + (error as Error).message);
}

// 6. Facundo devuelve El Quijote (debería notificar a Ana)
biblioteca.devolverLibro(1, "1234");

// 7. Ana retira El Quijote (es la primera en la cola de reservas)
try {
	biblioteca.retirarLibro(3, "1234", 7);
	console.log("Ana retiró El Quijote después de la reserva");
} catch (error) {
	console.log("Ana no pudo retirar El Quijote después de la reserva: " + (error as Error).message);
}

// 8. Ana devuelve El Quijote (debería notificar a Lucía)
biblioteca.devolverLibro(3, "1234");

// 9. Lucía retira El Quijote
try {
	biblioteca.retirarLibro(4, "1234", 7);
	console.log("Lucía retiró El Quijote después de la reserva");
} catch (error) {
	console.log("Lucía no pudo retirar El Quijote después de la reserva: " + (error as Error).message);
}

biblioteca.devolverLibro(4, "1234");

*/

// Simulación de multa y pago
// 1. Facundo retira El Quijote (debe estar disponible)

/*
try {
	biblioteca.retirarLibro(1, "1234", 0); // Vencimiento hoy
	console.log("Facundo retiró El Quijote (vencimiento hoy)");

	// 2. Facundo devuelve el libro tarde (simulamos fecha de devolución manualmente)
	// Para forzar la multa, modificamos la fecha de vencimiento del préstamo antes de devolver
	const prestamo = (biblioteca as any).prestamos.find((p: any) => p.getSocioId && p.getSocioId() === 1 && p.esLibro("1234"));
	if (prestamo) {
		// Simulamos que el vencimiento fue ayer
		prestamo._vencimiento = new Date(Date.now() - 24*60*60*1000);
	}
	biblioteca.devolverLibro(1, "1234");

	// 3. Facundo intenta retirar otro libro (debe fallar por multa)
	try {
		biblioteca.retirarLibro(1, "2345", 7);
	} catch (error) {
		console.log("Facundo no puede retirar por multa: " + (error as Error).message);
	}

	// 4. Facundo paga su multa
	const multaFacundo = (biblioteca as any).multas.find((m: any) => m.getSocioId && m.getSocioId() === 1);
	if (multaFacundo) {
		biblioteca.pagarMulta(multaFacundo);
        console.log("Facundo PAGA LA MULTA.");
	}

	// 5. Facundo ahora puede retirar
	try {
		biblioteca.retirarLibro(1, "2345", 7);
		console.log("Facundo pudo retirar otro libro tras pagar la multa.");
	} catch (error) {
		console.log("Facundo sigue sin poder retirar: " + (error as Error).message);
	}
} catch (error) {
	console.log("Error en la simulación de multa: " + (error as Error).message);
}

*/

/*
// Ejemplo: Buscar todos los libros de Borges
const librosDeBorges = biblioteca.buscarLibrosPorAutor(autorBorges);
console.log('Libros de Borges:');
librosDeBorges.forEach(libro => {
	console.log(`- ${libro.titulo}`);
});

// Ejemplo: Buscar todos los libros de Gabriel García Márquez por id
const librosDeMarquez = biblioteca.buscarLibrosPorAutorId(autorMarquez.getId());
console.log('Libros de Gabriel García Márquez:');
librosDeMarquez.forEach(libro => {
	console.log(`- ${libro.titulo}`);
});

*/

/*
// Buscar un socio (por ejemplo, Facundo, id 1)
const socioFacundo = (biblioteca as any).socios.find((s: Socio) => s.id === 1);
if (socioFacundo) {
	// Enviar una notificación manual
	Notificacion.enviarNotificacion("¡Tienes un libro reservado disponible para retirar!", socioFacundo);
	// Leer notificaciones
	console.log("\nNotificaciones de Facundo:");
	socioFacundo.leerNotificaciones();
}


// --- Simulación personalizada solicitada ---
// 1. Usuario 1 (Facundo) retira libro 1 (El Quijote)
biblioteca.retirarLibro(1, "1234", 7);
console.log("Facundo retiró El Quijote");

// 2. Usuario 2 (Juan) y 3 (Ana) reservan El Quijote
try {
	biblioteca.reservarLibro(2, "1234");
	console.log("Juan reservó El Quijote");
} catch (error) {
	console.log("Juan no pudo reservar El Quijote: " + (error as Error).message);
}
try {
	biblioteca.reservarLibro(3, "1234");
	console.log("Ana reservó El Quijote");
} catch (error) {
	console.log("Ana no pudo reservar El Quijote: " + (error as Error).message);
}

// 3. Facundo devuelve El Quijote (debería notificar a Juan)
biblioteca.devolverLibro(1, "1234");
console.log("Facundo devolvió El Quijote");

// 4. Recomendar un libro a Facundo basado en su historial
biblioteca.RecomendarContenido();

// 5. Mostrar notificaciones de Facundo, Juan y Ana
const socioJuan = (biblioteca as any).socios.find((s: Socio) => s.id === 2);
const socioAna = (biblioteca as any).socios.find((s: Socio) => s.id === 3);

console.log("\nNotificaciones de Facundo:");
if (socioFacundo) socioFacundo.leerNotificaciones();
console.log("\nNotificaciones de Juan:");
if (socioJuan) socioJuan.leerNotificaciones();
console.log("\nNotificaciones de Ana:");
if (socioAna) socioAna.leerNotificaciones();
*/