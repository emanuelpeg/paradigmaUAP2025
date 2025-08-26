import { Libro } from "./Libro";
import { Socio } from "./Socio";

export class Biblioteca {
    private inventario: Libro[] = [];
    private socios: Socio[] = [];

    agregarLibro(titulo: string, autor: string, isbn: string): Libro {
        const libro = new Libro(titulo, autor, isbn);
        this.inventario.push(libro);
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
    notificarDisponibilidad(libro: Libro) {
        var socio = libro.colaEspera[0];
        console.log(`Notificación: Hola ${socio.nombreCompleto}, el libro "${libro.titulo}" ya está disponible para ti.`);
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
                    const multa = this.calcularMulta(socio, hoy.getDate() - prestamo.fechaVencimiento.getDate());
                    socio.multa += multa;
                }
            });
        }
    }
    calcularMulta(socio: Socio, atraso: number): number {
        const multaPorDia = 50;
        return atraso * multaPorDia;
    }
}
export const biblioteca = new Biblioteca();