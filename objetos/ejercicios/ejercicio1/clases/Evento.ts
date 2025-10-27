import {Socio} from "./Socio";
 
export class Evento {
    private asistentes: Socio[] = [];
    constructor(public titulo: string, public fecha: Date, public descripcion: string | null = null) {}

    registrar(socio: Socio) {
        if (!this.asistentes.find((s) => s.id === socio.id)) {
            this.asistentes.push(socio);
        }
    }

    eliminar(socio: Socio) {
    this.asistentes = this.asistentes.filter((s) => s.id !== socio.id);
    }

    listarAsistentes() {
    return this.asistentes.map((s) => s.nombreCompleto);
     }

}