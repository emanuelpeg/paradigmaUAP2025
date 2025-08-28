import { Libro } from "./Libro";
import{Socio} from "./Socio";



class Autor {
    constructor(
        public nombre: string,
        public biografia: string = "",
        public añoNacimiento: number = 0
    ) {}
}

class EventoBiblioteca {
    constructor(
        public titulo: string,
        public fecha: Date,
        public tipo: string = "club_lectura" // "charla", "taller", etc.
    ) {}
    
    getInfo(): string {
        return `${this.tipo}: ${this.titulo} - ${this.fecha.toLocaleDateString()}`;
    }
}

class Prestamo
{
        private libro: Libro;
        private fechaPrestamo: Date;
        private socio: Socio;

        constructor(libro: Libro, socio: Socio)
        {
            this.libro = libro;
            this.socio = socio;
            this.fechaPrestamo = new Date();
        }
    }

class Reserva
{
    private libro: Libro;
    private socio: Socio;
    private fechaReserva: Date;


    constructor(libro: Libro, socio: Socio)
    {
        this.libro = libro;
        this.socio = socio;
        this.fechaReserva = new Date();
    }
}

 class Biblioteca{
    private inventario: Libro[] = [];
    private socios: Socio[] = [];
    private duracion = 14;
    private eventos: EventoBiblioteca[] = [];
    private notificaciones: string[] = [];

    agregarLibro(titulo: string, autor: Autor, isbn: string) {
        const autorObj = new Autor(autor.nombre, autor.biografia, autor.añoNacimiento);
        const libroCreado = new Libro(titulo, autorObj, isbn);
        this.inventario.push(libroCreado);
        return libroCreado;
    }

    buscarLibro(isbn:string): Libro | null{
        
        //return this.inventario.find(libro => libro.isbn === isbn) || null; //Es lo mismo que hacer lo de abajo pero mas corto
        
        const LibroEncontrado = this.inventario.find(libro => libro.isbn === isbn) || null;
        if(LibroEncontrado){
            return LibroEncontrado;
        }
        return null;
    }
   
    registrarSocio(nombre:string, apellido:string, id:number){

        const socioCreado = new Socio(nombre, id, apellido);
        this.socios.push(socioCreado);
        return socioCreado;
    }

    BuscarSocio(id:number): Socio | null{

        return this.socios.find(socio => socio.id === id) || null; //Es lo mismo que hacer lo de abajo pero mas corto

        /*const socioEncontrado = this.socios.find(socio => socio.id === id) || null;
        if(socioEncontrado){
            return socioEncontrado;
        }
        return null; */ //ES LO MISMO QUE LO DE ARRIBA
    }
    
    RetirarLibro(socioId:number, Libroisbn:string): void {
        
        const socio = this.BuscarSocio(socioId);
        const libro = this.buscarLibro(Libroisbn);
        
        if (!socio || !libro) {
            throw new Error("Socio o libro no encontrado.");
        }

        if(socio.tieneMulta()){
            throw new Error(`El socio ${socio.nombre} tiene una multa pendiente de $${socio.multa}. No puede retirar libros hasta pagarla.`);
        }
        
        if (!libro.estaDisponible()) {
            throw new Error(`El libro "${libro.titulo}" no está disponible para retiro.`);
        } else {
            socio.retirarLibro(libro, this.duracion);
        }
}

    devolverLibro(socioId: number, Libroisbn: string){

        const socio = this.BuscarSocio(socioId);
        const libro = this.buscarLibro(Libroisbn);
        
        if (!socio || !libro) {
            throw new Error("Socio o libro no encontrado.");
        }
        socio.devolverLibro(libro);
        
        const siguiente = libro.devolver();
        if (siguiente) {
            this.notificarReservaDisponible(siguiente, libro);
        } else {
            console.log(`El libro "${libro.titulo}" fue devuelto y está disponible.`);
        }

    }

    reservarLibro(socioId:number, libroIsbn:string): void
    {
        var socio = this.BuscarSocio(socioId);
        var libro = this.buscarLibro(libroIsbn);

        if(!socio || !libro)
        {
            throw new Error("Socio o libro no encontrado")

        }
       
        if(libro.estaDisponible())
        {
            throw new Error("El libro esta disponible")
        }
        libro.reservar(socio);
    }

    pagarMulta(socioId: number): void {
    const socio = this.BuscarSocio(socioId);
    if (!socio) {
        throw new Error("Socio no encontrado.");
    }
    
    if (socio.multa === 0) {
        console.log(`${socio.nombre} no tiene multas pendientes.`);
        return;
    }
    
    socio.pagarMulta(); // Llama al método que ya existe en Socio
    console.log(`Multa pagada exitosamente.`);
    }

    crearAutor(nombre: string, biografia: string = "", añoNacimiento: number = 0): Autor {
        return new Autor(nombre, biografia, añoNacimiento);
    }

    buscarLibrosPorAutor(nombreAutor: string): Libro[] {
        return this.inventario.filter(libro => libro.autor.nombre === nombreAutor);
    }

    agregarEvento(titulo: string, fecha: Date, tipo: string = "club_lectura"): void {
        const evento = new EventoBiblioteca(titulo, fecha, tipo);
        this.eventos.push(evento);
        this.enviarNotificacion(`Nuevo evento: ${titulo}`);
    }

    enviarNotificacion(mensaje: string): void {
        this.notificaciones.push(mensaje);
        console.log(`📢 NOTIFICACIÓN: ${mensaje}`);
    }

    obtenerNotificaciones(): string[] {
        return this.notificaciones;
    }

    // Notificar cuando un libro reservado está disponible
    notificarReservaDisponible(socio: Socio, libro: Libro): void {
        this.enviarNotificacion(
            `${socio.nombre}, el libro "${libro.titulo}" ya está disponible para retirar`
        );
    }

    // Notificar multas
    notificarMulta(socio: Socio, monto: number): void {
        this.enviarNotificacion(
            `${socio.nombre}, tienes una multa de $${monto} por retraso`
        );
    }
}

export const biblioteca = new Biblioteca();
export type { Biblioteca };