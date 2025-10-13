    import { Libro } from "./libro";
    import { Socio } from "./socio";
    export class Biblioteca{
        private inventario: Libro[] = [];
        private socios: Socio[] = [];


        // funciones de libro
        agregarLibro(titulo: string, autor:string, isbn: string){
            const libroCreado = new Libro(titulo,autor,isbn);
            this.inventario.push(libroCreado);
            return libroCreado;
        }

        // f
        buscarLibro(isbn:string): Libro | null{
            //return this.inventario.find(libro => libro.isbn === isbn) ?? null;
            const libroEncontrado= this.inventario.find(libro => libro.isbn === isbn);
            if (libroEncontrado){
                return libroEncontrado;
            }
            return null;

        }

        // funciones de socios
        registrarSocio(id:number,nombre:string,apellido:string){
            const socioCreado = new Socio(id,nombre,apellido);
            this.socios.push(socioCreado);
            return socioCreado;
        }

        buscarSocio(id:number): Socio | null{
            return this.socios.find((socio)=> socio.id === id) ?? null;
        }

        retirarLibro(socioId: number, libroISBN:string): void{
            //Todo: fijarse si esta disponible

            const socio = this.buscarSocio(socioId);
            const libro = this.buscarLibro(libroISBN);
            if(!socio || !libro){
                throw new Error ("No se encontro");
            }
            for (const socio of this.socios){
            if (socio.tienePrestadoLibro(libro)){
                    throw new Error ("Libro no esta disponible");
                }
            }
        }
        devolverLibro(socioId: number, libroISBN:string){
        const socio = this.buscarSocio(socioId);
        const libro = this.buscarLibro(libroISBN);
        
        if(!socio || !libro){
                throw new Error ("No se encontro");
            }
            socio.devolver(libro);
        }
        reservaLibro(){
            
        }
    }


    export const biblioteca = new Biblioteca();