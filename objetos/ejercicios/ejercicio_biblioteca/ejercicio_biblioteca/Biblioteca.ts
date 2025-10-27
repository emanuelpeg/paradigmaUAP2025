import { Libro } from "./Libro";
import { Socio } from "./Socio";
import { Autor } from "./Autor";

class Biblioteca {
    private inventario: Libro[] = []; // Libros
    private socios: Socio[] = [];
    private DURACION: number = 14;

    agregarLibro(titulo: string, autor: Autor, isbn: string) { // recibimos los datos necesarios para crear un libro
        const libro = new Libro(titulo, autor, isbn); // lo creamos
        this.inventario.push(libro); // lo agregaos al inventario de la biblioteca
        return libro;
    }

    buscarLibrosPorAutor(autor: Autor): Libro[] { // recibe el objeto Autor y devuelve un array de libros
        return this.inventario.filter(libro => libro.autor.nombre === autor.nombre); // busca el autor por el nombre
    }

    buscarLibro(isbn: string): Libro | null { //Metodo para buscar un libro por su ISBN que puede devolver libro o null
        const libroEncontrado = this.inventario.find(libro => libro.isbn === isbn); //linq find busca un libro en el inventario que tenga el mismo ISBN que el pasado como parametro
        if (libroEncontrado) {
            return libroEncontrado; //Si se encuentra el libro, lo devolvemos
        } else {
            return null; //Si no se encuentra, devolvemos null
        }
    }

    registrarSocio(id: number, nombre: string, apellido: string) { // recibe los datos necesarios para crear un socio
        const socio = new Socio(id, nombre, apellido); // lo crea
        this.socios.push(socio); // lo agrega a la lista de socios
        return socio;
    }

    buscarSocio(id: number): Socio | null { // puede devolver un socio o null
        return this.socios.find(socio => socio.id === id) ?? null; // los ?? null es para que si no encuentra nada devuelva null en vez de undefined
    }

    retirarLibro(socioId: number, libroISBN: string): void { // para retirar un libro se lo busca por el id del socio y por el isbn del libro
        const socio = this.buscarSocio(socioId); // utiliza el metodo buscarSocio para buscarlo
        const libro = this.buscarLibro(libroISBN);

        if (!socio || !libro) {
            console.log("No se puede retirar el libro. Socio o libro no encontrado.");
            return;
        }

        // Bloquear si tiene multas
        if (socio.tieneMultasPendientes()) { // antes de que un socio retire un libro, verificamos si tiene multas pendientes
            console.log(`${socio.nombreCompleto} no puede retirar libros hasta pagar sus multas ($${socio.multas}).`);
            return;
        }

        for (const otroSocio of this.socios) { // antes de que un socio retire un libro hay que verificar si el libro ya está prestado a otro socio
            if (otroSocio.tienePrestadoLibro(libro)) { // si el libro ya está prestado, se reserva para el socio que quiere retirarlo
                console.log(`El libro "${libro.titulo}" ya está prestado. Se reserva para ${socio.nombreCompleto}.`);
                libro.agregarReserva(socio); // le reservamos el libro al socio que lo quería retirar
                return;
            }
        }

        // Si el socio no tenía multas, y ademas el libro no estaba prestado a otro socio, entonces sí lo puede retirar directamente
        socio.retirar(libro, this.DURACION); // la duracion del restamos es de 14 diaas
        console.log(`${socio.nombreCompleto} retiró "${libro.titulo}".`);
    }

    devolverLibro(socioId: number, libroISBM: string): void { // madna el id del socio que quiere devoler un libro, junyo con el isbn del libro a devolver
        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(libroISBM);

        if (!socio || !libro) {
            console.log("No se puede devolver el libro. Socio o libro no encontrado.");
            return;
        }
        socio.devolver(libro);
        console.log(`${socio.nombreCompleto} devolvió "${libro.titulo}".`);

        // si el libro que se acaba de devilver, tenía una reserva pendiente, entonces ahora lo retira el nuevo socio del libro
        if (libro.tieneReservas()) { 
            const proximoSocio = libro.atenderReserva(); // devuelve el socio que tenia la reserva de ese libro
            if (proximoSocio) { // si no se devlivó null en buscar al socio...
                proximoSocio.retirar(libro, this.DURACION); // procede a retirarlo (valida multas, si no está prestado, etc).                console.log(`El libro "${libro.titulo}" ahora fue entregado a ${proximoSocio.nombreCompleto} (tenía reserva).`);
            }
        }
    }

    recomendarLibros(socioId: number): Libro[] { // Devuelve una lista de los libros del inventario de la biblioteca, sin incluir los que ya leyó el socio (historal)
        const socio = this.buscarSocio(socioId);
        if (!socio) return []; // si no existe el socio al buscarlo entocnes devuelve lista vacia de libros recomendados

        const historial = socio.getHistorial(); // obtenemos el historial de libros que leyó el socio
        if (historial.length === 0) return []; // si el histroial devulto está vacío, no deuvle libros recomendados

        // Autores de los libros que ya leyó
        const autoresLeidos = historial.map(libro => libro.autor.nombre); // devuevle un array de los autores del historial

        // Filtrar libros del inventario por autor, excluyendo los ya leídos
        return this.inventario.filter(libro =>
            autoresLeidos.includes(libro.autor.nombre) &&
            !historial.includes(libro)
        ); 
    }
}

export const biblioteca = new Biblioteca(); //Exporto solo una instancia de la clase Biblioteca para poder usarla en otras partes del proyecto (singleton sencillo). La desventaja de la otra forma de hacer singleton es que esa unica instancia que se crea no se puede borrar nunca y consume recursos mientras se ejecuta el programa. 
export type { Biblioteca }; //Exporto el tipo de la clase Biblioteca para poder usarlo en otras partes del proyecto (por ejemplo para declarar variables de tipo Biblioteca)

