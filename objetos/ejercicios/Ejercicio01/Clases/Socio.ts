
import { Libro } from "./Libro";

export class Socio {
    
    private id: Number;
    private nombre: string;
    private apellido: string;
    private multaPendiendte: number = 0;
    private autoresPrincipales: Autor[] = [];
    private historialLectura: Libro[] = [];

    constructor(    
        protected _id: number,
        protected _nombre: string,
        protected _apellido: string
    ) {}

    public getId(): number { return this._id; }
    public getNombre(): string { return this._nombre;}
    public getApellido(): string { return this._apellido; }
    public gitNombreCompleto(): string {
        return `${this._nombre} ${this._apellido}`;
    }
    public getMultaPendiente(): number { return this.multaPendiendte; }
    public setMultaPendiente(multa: number): void { this.multaPendiendte += multa; }
    public getAutoresPrincipales(): Autor[]{ return this.autoresPrincipales }
    public getHistorialLectura(): Libro[]{return this.historialLectura}

    
    public ActualizarHistoriaLibros(libro:Libro){
       if(!this.historialLectura.find(l => l.getIsbn() === libro.getIsbn())) {
        this.historialLectura.push(libro);
        
       } else{
        //eliminar libro y reubicarlo al final
        // nueva lista sin ese libro
        const tempList = this.historialLectura.filter(l => l.getIsbn() !== libro.getIsbn());
        
        tempList.push(libro); // LIBRO REUBICADO AL FINAL
        
        this.historialLectura = tempList;// convertimos a la nueva lista como la lista principal
       }

    }

    public ObtenerHistoriaPedidos(){
        console.log("Historial Libros Retirados:");
        
        // sabemos que ubicamos al ultimo autor buscado por el usuairo al final de la lista, entonces recorremos de forma inversa la misma
        
        for (let i = this.historialLectura.length - 1; i >= 0; i--) {
            const libro = this.historialLectura[i];
            console.log(
                `Titulo del Libro: ${libro.getTitulo} \n
                Autor: ${libro.getAutor().getNombre().toLocaleUpperCase()} ${libro.getAutor().getApellido().toLocaleUpperCase()}\n
                `
            );
        }
    }


    public ActualizarAutoresFavoritos(autor: Autor): void {
       if(!this.autoresPrincipales.find(a => a.getIdAutor() === autor.getIdAutor())) {
        this.autoresPrincipales.push(autor);
        
       } else{
        //eliminar autor y reubicarlo al final
        // nueva lista sin ese autor
        const tempList = this.autoresPrincipales.filter(a => a.getIdAutor() !== autor.getIdAutor());
        
        tempList.push(autor); // AUTOR REUBICADO AL FINAL
        
        this.autoresPrincipales = tempList;// convertimos a la nueva lista como la lista principal
       }
    }

    public ObtenerAutoresPrincipales(): void {
        console.log("Autores recomendados:");
        
        // sabemos que ubicamos al ultimo autor buscado por el usuairo al final de la lista, entonces recorremos de forma inversa la misma
        
        for (let i = this.autoresPrincipales.length - 1; i >= 0; i--) {
            const autor = this.autoresPrincipales[i];
            console.log(
                `Autor: ${autor.getApellido()} ${autor.getNombre()} 
                \nDescripción: ${autor.getDescripcion()} \n---`
            );
        }
    }


    
}


/*



*/