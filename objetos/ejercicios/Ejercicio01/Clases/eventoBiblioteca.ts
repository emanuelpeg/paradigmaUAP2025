import { Biblioteca } from './Biblioteca';
import { Grupo } from './Grupo';
import { Socio } from './Socio';
class EventoBiblioteca{
    private nombre: string;
    private fecha: Date;
    private Descripcion: string;
    private reguistroGeneral: Grupo;

    constructor(_nombre: string, _fecha: Date, _Descripcion: string, _reguistroGeneral: Grupo){
        this.nombre = _nombre;
        this.fecha = _fecha;
        this.Descripcion = _Descripcion;
        this.reguistroGeneral = _reguistroGeneral;
    }

    getNombre(): string{
        return this.nombre;
    }
    getFecha(): Date{
        return this.fecha;
    }
    getDescripcion(): string{
        return this.Descripcion;
    }
    listaSociosAsistentes(): Socio[]{
        return this.reguistroGeneral.getListaSocio();
    }
    listaAutores(): Autor[]{
        return this.reguistroGeneral.getListaAutores();
    }
    notificarSociosEvento(mensaje: string): void{
        this.listaSociosAsistentes().forEach(s => Biblioteca.enviarNotificacionASocio(s.getId(), mensaje));
    }

    

}