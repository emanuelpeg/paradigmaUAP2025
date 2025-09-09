import { biblioteca } from "./Biblioteca";
import { Libro } from "./Libro";

export interface IBuscable{
    libros: Libro[];
    buscarPor(criterio:string):Libro[]
    Filtrar(condicion:string):Libro[]
}

export class CatalogoBiblioteca implements IBuscable{
    libros: Libro[]=[];
    buscarPor(criterio: string):Libro[] {
        this.libros=[];
        for (const libro of biblioteca.inventario){
            if(libro.categoria.find(p=>p==criterio)){
                this.libros.push(libro);
            }
        }
        return this.libros;
    }
    Filtrar(condicion: string):Libro[] {
        if (this.libros==null){
            this.buscarPor("fisico");
        }
        for (const libro of biblioteca.inventario){
            if (libro.autor==condicion||libro.isbn==condicion||libro.titulo==condicion||libro.categoria.find(p=>p==condicion)){
            this.libros.push(libro);}
        }
        return this.libros;
    }
}
export class BibliotecaDigital implements IBuscable{
    libros: Libro[]=[];
    buscarPor(criterio: string):Libro[] {
        this.libros=[];
        for (const libro of biblioteca.inventario){
            if(libro.categoria.find(p=>p==criterio)){
                this.libros.push(libro);
            }
        }
        return this.libros;
    }
    Filtrar(condicion: string):Libro[] {
        if (this.libros==null){
            this.buscarPor("online");
        }
        for (const libro of this.libros){
            if (libro.autor==condicion||libro.isbn==condicion||libro.titulo==condicion||libro.categoria.find(p=>p==condicion)){
            this.libros.push(libro);}
        }
        return this.libros;
    }
}
export class ArchivosHistoricos implements IBuscable{
    libros: Libro[]=[];
    buscarPor(criterio: string):Libro[] {
        this.libros=[];
        for (const libro of biblioteca.inventario){
            if(libro.categoria.find(p=>p==criterio)){
                this.libros.push(libro);
            }
        }
        return this.libros;
    }
    Filtrar(condicion: string):Libro[] {
        if (this.libros==null){
            this.buscarPor("antiguo");
        }
        for (const libro of biblioteca.inventario){
            if (libro.autor==condicion||libro.isbn==condicion||libro.titulo==condicion||libro.categoria.find(p=>p==condicion)){
            this.libros.push(libro);}
        }
        return this.libros;
    }
}
export class BaseConocimiento implements IBuscable{
    libros: Libro[]=[];
    buscarPor(criterio: string):Libro[] {
        this.libros=[];
        for (const libro of biblioteca.inventario){
            if(libro.categoria.find(p=>p==criterio)){
                this.libros.push(libro);
            }
        }
        return this.libros;
    }
    Filtrar(condicion: string):Libro[] {
        if (this.libros==null){
            this.buscarPor("academico");
        }
        for (const libro of biblioteca.inventario){
            if (libro.autor==condicion||libro.isbn==condicion||libro.titulo==condicion||libro.categoria.find(p=>p==condicion)){
            this.libros.push(libro);}
        }
        return this.libros;
    }
}