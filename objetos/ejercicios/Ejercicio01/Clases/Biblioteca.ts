import { Libro } from './Libro';
import { Socio } from './Socio';
import { Reserva } from './Reserva';

export class Biblioteca
{
    private libros   : Libro[] = [];
    private socios      : Socio[] = [];
    private autores     : Autor[] = [];

    public static enviarNotificacionASocio(socioId: number, mensaje: string): void {
        console.log(`Notificación para el socio ${socioId}: ${mensaje}`);
    }

    public agregarLibro(titulo: string, autor: Autor,  isbn: string): Libro
    {
        const nuevoLibro = new Libro(titulo, autor, isbn);
        this.libros.push(nuevoLibro);
        return nuevoLibro;
    }

    public buscarLibro(isbn: string): Libro | null{
        const libro = this.libros.find(libro => libro.getIsbn() === isbn);
        return libro ? libro : null;
    }

    public agregarSocio(id:number, nombre:string , apellido:string): Socio
    {
        const nuevoSocio = new Socio(id,nombre,apellido);
        this.socios.push(nuevoSocio);
        return nuevoSocio;
    }

    buscarSocio(id: number): Socio | null {
        const socio = this.socios.find(socio => socio.getId() === id);
        return socio ? socio : null;
    }

    agregarAutor(idAutor:number, nombre:string, apellido:string): Autor
    {
        const nuevoAutor = new Autor(idAutor, nombre, apellido);
        this.autores.push(nuevoAutor);
        return nuevoAutor;
    }

    listarAutores():Autor[]{
        return this.autores.filter(a => a.getNombre());  
    }

    public listarLibros(): Libro[] {
        return this.libros;
    }


    //crear una reserva 
    ReservarLibro(socioId: number, isbn: string, fechaDevolucion: Date): void  { 
        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(isbn);
        let fechaLibroDisponible = new Date();
        
        if (!socio || !libro){
            throw new Error('Socio o libro no encontrado');
        }
        
        if(socio.getMultaPendiente() > 0){
            Biblioteca.enviarNotificacionASocio(socioId, 'Tiene multas pendientes. No puede hacer reservas hasta que las pague. Debe abonar' + socio.getMultaPendiente().toString());
            throw new Error('El socio tiene multas pendientes y no puede hacer reservas hasta que las pague');
            
        }
        if(libro.Disponible() != null){
           fechaLibroDisponible = libro.Disponible()!;
        }

        // el préstamo empieza cuando el libro está disponible:
        const fechaEntrega = new Date(fechaLibroDisponible);
        fechaEntrega.setDate(fechaEntrega.getDate() + 14);

        const reserva:Reserva = new Reserva(libro, fechaLibroDisponible, fechaEntrega,socioId);
        Biblioteca.enviarNotificacionASocio(socioId, `Reserva realizada para el libro "${libro.getTitulo()}". Estará disponible a partir del ${fechaLibroDisponible.toDateString()}. Fecha de devolución: ${fechaEntrega.toDateString()}.`);
        
        this.buscarSocio(socioId)?.ActualizarAutoresFavoritos(libro.getAutor());// actualizamos la lista de autores favoritos del socio que hizo la reserva.
        this.buscarSocio(socioId)?.ActualizarHistoriaLibros(libro);// actualizamos el historial de libros buscados

        libro.setListaReservas(reserva);
        // notificar al socio la notificacion
    }

    devolucionLibro(isbn:string, socioId:number):void{
        const libro = this.buscarLibro(isbn);
        
        if(!libro || libro === null){
            throw new Error('Libro no encontrado');
        }
        const socio = this.buscarSocio(socioId);
        if(!socio || socio === null){
            throw new Error('Socio no encontrado');
        }

        // buscar la reserva activa del socio para el libro
        const reserva = libro.getListaReservas().find(reserva => reserva.SocioId === socioId && reserva.Libro.getIsbn() === isbn);
        
        if(!reserva){
            throw new Error('No hay una reserva activa para este socio y libro');
        }
        else {
            // actualizar la lista de reservas del libro y obtener la multa si existe
            const multa = libro.updateListaReserva(reserva);
       
            if( multa > 0 ){
                console.log(`El socio ${socio.gitNombreCompleto()} tiene una multa de ${multa} por la devolución tardía del libro ${libro.getTitulo()}.`);
                // actualizar la multa del socio
                socio.setMultaPendiente(multa); 
            }
        }

    }
    BuscarLibrosPorAutor(autor:Autor) : Libro[]{
        return this.listarLibros().filter(l=> l.getAutor() == autor); 
    }

    BusquedaRecomendada(socio: Socio): Libro[] {
    let librosARecomendar: Libro[] = [];
    
    // 1. Filtrar libros no leídos por el socio
    const librosNoLeidos = this.libros.filter(libro => 
        !socio.getHistorialLectura().some(libroLeido => 
            libroLeido.getIsbn() === libro.getIsbn()
        )
    );
    
    // 2. Obtener autores favoritos del socio (autores que ha leído)
    const autoresLeidos = socio.getHistorialLectura().map(libro => libro.getAutor());
    const autoresUnicos = [...new Set(autoresLeidos)]; // Eliminar duplicados
    
    // 3. Priorizar libros de autores que el socio ya ha leído
    const librosDeAutoresConocidos = librosNoLeidos.filter(libro =>
        autoresUnicos.includes(libro.getAutor())
    );
    
    // 4. Libros de autores nuevos (no leídos por el socio)
    const librosDeAutoresNuevos = librosNoLeidos.filter(libro =>
        !autoresUnicos.includes(libro.getAutor())
    );
    
    // 5. Combinar: primero libros de autores conocidos, luego autores nuevos
    librosARecomendar = [...librosDeAutoresConocidos, ...librosDeAutoresNuevos];
    
    // 6. Limitar a un número razonable de recomendaciones (ej: 10)
    return librosARecomendar.slice(0, 10);
}

}



export const bibliotecaInstance = new Biblioteca();
export { bibliotecaInstance as biblioteca };