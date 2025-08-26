import { Libro } from "./Libro";
import { Socio } from "./Socio";

class Biblioteca {
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
        const libroEncontrado = this.inventario.find(libro => libro.getIsbn === isbn);
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
    retirarLibro(libro: Libro, socio: Socio):void {
        socio.retirar(libro, 14, socio);
    }
    notificarDisponibilidad(socio: Socio, libro: Libro) {
        console.log(`Notificación: Hola ${socio.nombreCompleto}, el libro "${libro.getTitulo}" ya está disponible para ti.`);
    }
    generarReserva(libroISBN: string, socioId: number): string {
        const libro = this.buscarLibro(libroISBN);
        const socio = this.buscarSocio(socioId);
        
        if (libro && socio) {
            if (libro.isDisponible) {
                this.retirarLibro(libro, socio);
            } else {
                libro.getCola.push(socio);
            }
        }
        return "Libro o socio no encontrado.";
    }

    verificaraAtraso(socioId: number)
    {
        const socio = this.buscarSocio(socioId);
        const fechaActual = new Date();
        fechaActual.setDate(fechaActual.getDate());
        if(socio)
        {
            socio.librosRetirados.forEach(prestamo => {
                if (fechaActual > prestamo.fechaVencimiento) {
                    console.log(`El socio ${socio?.nombreCompleto} tiene un libro atrasado: "${prestamo.libro.getTitulo}".`);
                    socio._multa += this.calcularMulta(socio, fechaActual.getDate() - prestamo.fechaVencimiento.getDate());
                }
            });
        }
    }

    calcularMulta(socio: Socio, diasAtraso: number): number {
        const multaPorDia = 50;
        return diasAtraso * multaPorDia;
    }



}

export const biblioteca = new Biblioteca();