import { biblioteca } from "./Biblioteca";
import { Mensaje } from "./Socio";


export class EventoBiblioteca {
  constructor(
    public Asunto: string,
    public fecha: Date,
    public descripcion: string
    
  ) {}
    mandarMensaje(socioId: number) {
      const socio = biblioteca.buscarSocio(socioId);
      if (!socio) {
        throw new Error("No se encontro");
      }
      const contenido= `[${this.fecha.toDateString()} - ${this.Asunto}] ${this.descripcion}}`;
      const mensaje = new Mensaje(contenido, new Date());
      socio.setMensajes = [...socio.getMensajes, mensaje]; // Agrega el mensaje al buzón del socio
    }

    mandarMensajes(sociosIds:number[]){
      for(const s of sociosIds){
        this.mandarMensaje(s);
      }
    }

    imprimirMesaje(socioId: number){
    const socio = biblioteca.buscarSocio(socioId);
    console.log("===================================");
    console.log(`📩 Asunto: ${this.Asunto}`);
    console.log(`Destinatario: ${socio?.apellido.toUpperCase()}, ${socio?.nombre}`)
    console.log(`📅 Fecha: ${this.fecha.toLocaleDateString()} ${this.fecha.toLocaleTimeString()}`);
    console.log("-----------------------------------");
    console.log(this.descripcion);
    console.log("===================================\n");
    }
}