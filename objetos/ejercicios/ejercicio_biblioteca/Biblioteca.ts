import { Libro } from "./Libro";
import { Socio } from "./Socio";
import { Autor } from "./Autor";

class Biblioteca {
    private inventario: Libro[] = [];
    private socios: Socio[] = [];
    private DURACION: number = 14;
    //No necesito constructor porque no tengo que inicializar nada más allá de las listas que ya inicialicé arriba

    agregarLibro(titulo: string, autor: Autor, isbn: string) {
        const libro = new Libro(titulo, autor, isbn);
        this.inventario.push(libro);
        return libro;
    }

    buscarLibrosPorAutor(autor: Autor): Libro[] {
        return this.inventario.filter(libro => libro.autor.nombre === autor.nombre); //La diferencia que tiene con find es que filter devuelve un array con todos los elementos que cumplen la condicion, mientras que find devuelve solo el primer elemento que la cumple (o undefined si no hay ninguno)
    }

    buscarLibro(isbn: string): Libro | null { //Metodo para buscar un libro por su ISBN que puede devolver libro o null
        const libroEncontrado = this.inventario.find(libro => libro.isbn === isbn); //linq find busca un libro en el inventario que tenga el mismo ISBN que el pasado como parametro
        if (libroEncontrado) {
            return libroEncontrado; //Si se encuentra el libro, lo devolvemos
        } else {
            return null; //Si no se encuentra, devolvemos null
        }
    }

    registrarSocio(id: number, nombre: string, apellido: string) {
        const socio = new Socio(id, nombre, apellido);
        this.socios.push(socio);
        return socio;
    }

    buscarSocio(id: number): Socio | null {
        return this.socios.find(socio => socio.id === id) ?? null;
    }

    retirarLibro(socioId: number, libroISBN: string): void {
        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(libroISBN);

        if (!socio || !libro) {
            console.log("No se puede retirar el libro. Socio o libro no encontrado.");
            return;
        }

        // Bloquear si tiene multas
        if (socio.tieneMultasPendientes()) {
            console.log(`${socio.nombreCompleto} no puede retirar libros hasta pagar sus multas ($${socio.multas}).`);
            return;
        }

        for (const otroSocio of this.socios) {
            if (otroSocio.tienePrestadoLibro(libro)) { //Recorremos todos los objetos Socio de la lista de socios de la biblioteca para ver si el libro que desea ya esta prestado
                console.log(`El libro "${libro.titulo}" ya está prestado. Se reserva para ${socio.nombreCompleto}.`);
                libro.agregarReserva(socio); //Agregamos el socio a la lista de reservas del libro, como una fila
                return;
            }
        }

        socio.retirar(libro, this.DURACION); //Si llegamos hasta aca es porque el libro no esta prestado, entonces se lo damos al socio con el metodo retirar de la clase Socio y una duracion de 14 dias
        console.log(`${socio.nombreCompleto} retiró "${libro.titulo}".`)
    }

    devolverLibro(socioId: number, libroISBM: string): void {
        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(libroISBM);

        if (!socio || !libro) {
            console.log("No se puede devolver el libro. Socio o libro no encontrado.");
            return;
        }
        socio.devolver(libro);
        console.log(`${socio.nombreCompleto} devolvió "${libro.titulo}".`);

        if (libro.tieneReservas()) {
            const proximoSocio = libro.atenderReserva(); //Estos metodos se manejan en la clase Libro, este devuelve el primer socio de la fila de reservas y lo elimina de la fila
            if (proximoSocio) { //Doble chequeo por si acaso
                proximoSocio.retirar(libro, this.DURACION);
                console.log(`El libro "${libro.titulo}" ahora fue entregado a ${proximoSocio.nombreCompleto} (tenía reserva).`);
            }
        }
    }

    recomendarLibros(socioId: number): Libro[] {
        const socio = this.buscarSocio(socioId);
        if (!socio) return [];

        const historial = socio.getHistorial();
        if (historial.length === 0) return [];

        //Autores de los libros que ya leyó
        const autoresLeidos = historial.map(libro => libro.autor.nombre); //.map crea un array con los nombres de los autores de los libros que ya leyó el socio

        //Filtrar libros del inventario por autor, excluyendo los ya leídos
        return this.inventario.filter(libro =>
            autoresLeidos.includes(libro.autor.nombre) &&
            !historial.includes(libro)
        );
    }
}

export const biblioteca = new Biblioteca(); //Exporto solo una instancia de la clase Biblioteca para poder usarla en otras partes del proyecto (singleton sencillo). La desventaja de la otra forma de hacer singleton es que esa unica instancia que se crea no se puede borrar nunca y consume recursos mientras se ejecuta el programa. 
export type { Biblioteca }; //Exporto el tipo de la clase Biblioteca para poder usarlo en otras partes del proyecto (por ejemplo para declarar variables de tipo Biblioteca)

//Tarea: Consultar el estado de libros (si esta disponible) y socios (si tiene multas)