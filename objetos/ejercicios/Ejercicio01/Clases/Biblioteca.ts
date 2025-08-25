import { Libro } from './Libro';
import { Socio } from './Socio';
import { Reserva } from './Reserva';

export class Biblioteca
{
    private libros   : Libro[] = [];
    private socios      : Socio[] = [];
    private reservas    : Reserva[] = [];

    public agregarLibro(titulo: string, autor: string,  isbn: string): Libro
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

    public CrearReserva( socio : Socio, libro : Libro , fecha: Date ): void {
        const nuevaReserva = new Reserva(this.reservas.length + 1, libro, fecha, new Date(fecha.getTime() + 7 * 24 * 60 * 60 * 1000), socio.getId());
        this.reservas.push(nuevaReserva);
    }

    public listarReservas(): Reserva[] {
        return this.reservas;
    }

    public listarLibros(): Libro[] {
        return this.libros;
    }
    public listarSociosPorNombreYApellido(): void {
        this.socios.forEach(element => {
            console.log(`${element.getId()} ${element.getNombre()} ${element.getApellido()}`);
        });
        while (true) {
            let IdSocio: number = parseInt(prompt("Ingrese el ID del socio:") || "0", 10);
            if (isNaN(IdSocio)) {
                console.log("ID inválido. Intente nuevamente.");
                continue;
            } else if (IdSocio > 0 && IdSocio <= this.socios.length) {
                const socio = this.socios.find(socio => socio.getId() === IdSocio);
                if (socio) {
                    console.log(`Socio encontrado: ${socio.getNombre() + " " + socio.getApellido()} (ID: ${socio.getId()})`);
                    return;
                } else {
                    console.log("Socio no encontrado.");
                }
            }
            else {
                console.log("ID fuera de rango. Intente nuevamente.");
            }
        }
    }

    private listarLibrosPorLista(ListaLibros: Libro[]): void {
        ListaLibros.forEach(libro => {
                
                console.log(`Título: ${libro.getTitulo()}, Autor: ${libro.getAutor()}, ISBN: ${libro.getIsbn()}`);
            
        });
    } 

    public SeleccionarLibrosPorAutor(): void {
        while (true) {
            const autorLibro = prompt("Ingrese el nombre del autor:") || "";
            if (autorLibro.trim() === "") {
                console.log("Autor inválido. Intente nuevamente.");
                continue;
            }else if (this.libros.find(libro => libro.getAutor().toLowerCase() === autorLibro.toLowerCase())) {
                const librosPorAutor = this.libros.filter(libro => libro.getAutor().toLowerCase() === autorLibro.toLowerCase());
                console.log(`Libros encontrados del autor ${autorLibro}:`);
                this.listarLibrosPorLista(librosPorAutor);
                
            }
        }

    }
}

export const bibliotecaInstance = new Biblioteca();
export type { bibliotecaInstance as biblioteca };