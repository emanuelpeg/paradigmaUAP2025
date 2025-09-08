import { Biblioteca } from "./Biblioteca";
import { Libro } from "./Libro";
import { Socio } from "./Socio";

export interface PoliticaPrestamo {
    puedeRetirar(socio:Socio,inventario:Libro[]): boolean;
    puedeRenovar(socio:Socio): boolean;
    duracionPrestamo(socio:Socio,inventario:Libro[]): number; 

  }

  export class PoliticaEstricta implements PoliticaPrestamo{
    puedeRetirar(socio:Socio,inventario:Libro[]): boolean{
        const hoy=new Date();
        for(const libro of inventario){
            const book=socio.tienePrestadoLibro(libro);
            if (book&&book.vencimiento<hoy){
                return false;
            }
        }

        return true; 
    }
    puedeRenovar(socio: Socio): boolean {
        return true; 
    }
    duracionPrestamo(socio: Socio): number {
        return socio.getDuracionPrestamo(); 
    }
  }

  export class PoliticaFlexible implements PoliticaPrestamo{
    puedeRetirar(socio:Socio): boolean{
        return true; 
    }
    puedeRenovar(socio: Socio): boolean {
        return true; 
    }
    duracionPrestamo(socio: Socio,inventario:Libro[]): number {
        if (this.tieneLibrosVencidos(socio,inventario)){
            return socio.getDuracionPrestamo()/2;
        }
        return socio.getDuracionPrestamo(); 
    }
    tieneLibrosVencidos(socio:Socio,inventario:Libro[]): boolean{
        const hoy=new Date();
        for(const libro of inventario){
            const book=socio.tienePrestadoLibro(libro);
            if (book&&book.vencimiento<hoy){
                return true;
            }
        }
    return false;}
  }

  export class PoliticaEstudiante implements PoliticaPrestamo{
    puedeRetirar(socio:Socio): boolean{return true; 
    }
    puedeRenovar(socio: Socio): boolean {
        return true; 
    }
    duracionPrestamo(socio: Socio): number {
        return socio.getDuracionPrestamo()*2;
  }}

    export class PoliticaDocente{
        puedeRetirar(socio:Socio): boolean{return true; 
        }
        puedeRenovar(socio: Socio): boolean {
            return true; 
        }
        duracionPrestamo(socio: Socio): number {
            return socio.getDuracionPrestamo()*5;
    }
    }