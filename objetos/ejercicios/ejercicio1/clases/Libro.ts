import { Autor } from "./Autor"; //importamos la clase de Autor
import { Socio } from "./Socio"; //importamos la clase de socio y le pasamos el path

//para crear una clase ponemos el "export" xq significa que la vamos a poder usar en otros archivos con el "import"
//estructura para crear una clase en ts.
/*
export class NombreClase
{
    código
}
*/

export class Libro {
    //creamos una lista privada de reservas, privada para q los nombres no se pisen en otros archivps
    //sintaxis de una lista en ts.
    //private NombreLista : tipo [] = [];
    private reservas: Socio[] = [];

    //hacemos un constructor con los atributos q tiene el libro xq sino hay q inicializar y asignar valores a cada obj

    //sintaxis de un constructor en ts.
    /*constructor(
        private _atributo1 : tipo,
        private _atributo2 : tipo
    ){aca no va nadaa}
    */
    constructor(
        //los atributos dentro de cada constructor son privados
        //sintaxis: private _atributo : tipo,
        private _titulo: string,
        private _autor: Autor,
        private _isbn: string
    ) { }

    //esto es los getter , basicamente deja q veamos los atributos sin tocarlos, 
    //xq lo que genera es encapsulamiento, xejemplo si alguien intenta modificarlo no lo haria directamente x lo cual no romperia el codigo 

    //los getters lo hacemos con cada propiedad del constructor
    //sintaxis de un getter: 
    // get nombre() {return this._atributoN}
    get titulo() { return this._titulo; }
    get autor() { return this._autor; }
    get isbn() { return this._isbn; }

    // -------------------- RESERVAS --------------------

    //estas funciones son pequeñas xq despues las llamamos en otras funciones mas grandes

    //si ese socio no esta en esta lista, entonces lo agregamos al final (push) de la lista de reservas. 
    //tipo si tenemos un socio q aun no hizo una reserva significa q puede hacerla entonces lo agregamos al final 
    agregarReserva(socio: Socio) {
        if (!this.reservas.includes(socio)) this.reservas.push(socio);
    }
    //si  hay una reserva la devolves o si no hay no devuelvas nada
    obtenerProximaReserva(): Socio | null {
        return this.reservas.length > 0 ? this.reservas[0] : null;
    }
    //en este caso la s => seria un alias que usamos para decir que si es diferente al obj de socio
    //“Crea una nueva lista con todos los socios menos el que quiero eliminar, y reemplaza la lista vieja por esa nueva.”
    eliminarReserva(socio: Socio) {
        this.reservas = this.reservas.filter((s) => s !== socio);
    }
}
