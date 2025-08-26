import { Socio } from "./Socio";
export class EventoBiblioteca{
    constructor(
        private _eventoDescripcion:string,
        private _nombre:string,
    ){}

    get evento(){
        return this._eventoDescripcion;
    }

    get nombre(){
        return this._nombre;
    }
    EnviarNotificaciones(socio:Socio){
        socio.añadirNotificacion("{this._nombre} - {this._eventoDescripcion}");
    }
}