import { Libro } from "./Libro";
import { Socio } from "./Socio";
import { EventoBiblioteca } from "./EventoBiblioteca";
import { Autor } from "./Autor";

export class Biblioteca {
    private inventario: Libro[] = [];
    private socios: Socio[] = [];
    private eventos: EventoBiblioteca[] = [];

    agregarLibro(titulo: string, autor: Autor, isbn: string): Libro {
        const libro = new Libro(titulo, autor, isbn);
        this.inventario.push(libro);
        autor.libros.push(libro);
        return libro;
    }
    agregarSocio(id: number, nombre: string, apellido: string): Socio {
        const socio = new Socio(id, nombre, apellido);
        this.socios.push(socio);
        return socio;
    }
    buscarLibro(isbn: string): Libro | null {
        
        const libroEncontrado = this.inventario.find(libro => libro.isbn === isbn);
        if (libroEncontrado) {
            return libroEncontrado;
        }
        return null;
    }
    buscarSocio(id: number): Socio | null {
        const socioEncontrado = this.socios.find(socio => socio.id === id);
        if (socioEncontrado) {
            return socioEncontrado;
        }
        return null;
    }
    retirarLibro(libro: Libro, socio: Socio): void {
        // const libro = this.buscarLibro(libroISBN);
        // const socio = this.buscarSocio(socioId);
        socio.retirar(libro, 14, socio); // Duración fija de 14 días para el ejemplo
        //return libro;
        
        //return null;
    }
    notificar(mensaje: string,socio: Socio): void {
        //logica para notificar al socio (email, sms, etc.)
        console.log(`Notificación: ${mensaje}`);
    }
    generarReserva(libroISBN: string, socioId: number): string {
        const libro = this.buscarLibro(libroISBN);
        const socio = this.buscarSocio(socioId);
        
        if (libro && socio) {
            if (libro.isDisponible) {
                this.retirarLibro(libro, socio);
            } else {
                libro.colaEspera.push(socio);
                return `El libro "${libro.titulo}" no está disponible. Has sido agregado a la cola de espera.`;
            }
        }
        return "Libro o socio no encontrado.";
    }
    verificarAtraso(socioId: number): void{
        const socio = this.buscarSocio(socioId);
        const hoy = new Date();
        hoy.setDate(hoy.getDate());

        if (socio){
            socio.librosRetirados.forEach(prestamo => {
                if (prestamo.fechaVencimiento < hoy) {
                    const multa = this.calcularMulta(hoy.getDate() - prestamo.fechaVencimiento.getDate());
                    socio.multa += multa;
                    this.notificar(`Tienes una multa de $${multa} por el libro "${prestamo.libro.titulo}".`, socio);
                }
            });
        }
    }
    calcularMulta(atraso: number): number {
        const multaPorDia = 50;
        return atraso * multaPorDia;
    }
    agregarEvento(descripcion: string, fecha: Date, ubicacion: string): EventoBiblioteca {
        const evento = new EventoBiblioteca(descripcion, fecha, ubicacion);
        this.eventos.push(evento);
        return evento;
    }
    agregarAutor(nombre: string, biografia: string, fechaNacimiento: Date): Autor {
        const autor = new Autor(nombre, biografia, fechaNacimiento);
        return autor;
    }
    
}
export const biblioteca = new Biblioteca();