import { Libro } from "./Libro";
import { Socio } from "./Socio";


export class EventosBiblioteca{

    constructor(
        private _titulo: string,
        private _descripcion: string,
        private _fecha: Date,
        private _tipo: string,
        private _librosRelacionados: Libro[] = [],
        private _sociosRegistrados: number[] = []
    ){}

    get titulo(){
        return this._titulo
    }

    get descripcion(){
        return this._descripcion
    }

    get fecha(){
        return this._fecha
    }

    get tipo(){
        return this._tipo
    }

    get librosRelacionados(){
        return this._librosRelacionados
    }

    get sociosRegistrados(){
        return this._sociosRegistrados
    }

    registrarSocio(socio: Socio){
        this._sociosRegistrados.push(socio.id);
    }

   
}