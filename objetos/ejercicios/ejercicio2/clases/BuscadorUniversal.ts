import { IBuscable } from "./IBuscable";
import { Libro } from "./Libro";

class BuscadorUniversal{
    constructor(private _busqueda:string,
                private _tipoBusqueda:IBuscable
    ){}

    get busqueda(){
        return this._busqueda;
    }
    get tipoBusqueda(){
        return this._tipoBusqueda
    }
    cambiartipoBusqueda(busqueda:string){
        this._busqueda=busqueda;
    }
    cambiarBusqueda(tipoBusqueda:IBuscable){
        this._tipoBusqueda=tipoBusqueda;
    }
    Buscar():Libro[]{
        return this._tipoBusqueda.buscarPor(this._busqueda);
    }
    Filtrar():Libro[]{
        return this._tipoBusqueda.Filtrar(this._busqueda);
    }

}