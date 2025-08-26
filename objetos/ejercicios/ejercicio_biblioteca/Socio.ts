import { Libro } from "./Libro";
import { EventoBiblioteca } from "./EventoBiblioteca";

class Prestamo {
    constructor(public libro: Libro, public vencimiento: Date) {} //Creo y hago el constructor en una sola linea
}
type Duracion = number; //Esto no cambia nada, solo le pone un alias al tipo number para que sea más claro que es una duración en días y no un número cualquiera

export class Socio {
    private prestamos: Prestamo[] = [];
    private _multas: number = 0;   //total de multas acumuladas
    private notificaciones: string[] = [];
    private eventosRegistrados: EventoBiblioteca[] = []; //eventos del socio
    private historial: Libro[] = []; //libros que ha retirado alguna vez

    constructor(
        private _id: number,
        private _nombre: string,
        private _apellido: string //No necesito inicializar las listas porque ya lo hice arriba, multas empieza en 0
    ) {}

    get id() { return this._id }
    get nombre() { return this._nombre }
    get apellido() { return this._apellido }
    get nombreCompleto() { return `${this._nombre} ${this._apellido}` }
    get multas() { return this._multas }  //poder consultar multas

    retirar(libro: Libro, duracion : Duracion){
        const vencimiento = new Date(); 
        vencimiento.setDate(vencimiento.getDate() + duracion); //la fecha de vencimiento del prestamo es hoy + duracion en dias
        this.prestamos.push(new Prestamo(libro, vencimiento));
    }

    devolver(libro: Libro){
        const prestamo = this.prestamos.find(p => p.libro === libro);
        if(!prestamo) {
            console.log("No está prestado");
            return;
        }

        const indice = this.prestamos.indexOf(prestamo); //busco el indice del prestamo en la lista de prestamos
        this.prestamos.splice(indice, 1); //lo elimino de la lista de prestamos, el 1 es porque quiero eliminar solo 1 elemento en esa posicion

        this.historial.push(libro); //Lo agrego al historial de libros leídos

        //cálculo de multa
        const hoy = new Date();
        if (hoy > prestamo.vencimiento) {
            const diasRetraso = Math.ceil( //Math.ceil redondea hacia arriba, porque si devolvió un día después, es 1 día de multa, no por ejemplo 0.5 días
                (hoy.getTime() - prestamo.vencimiento.getTime()) / (1000 * 60 * 60 * 24) //convierte la fecha hoy en milisegundos desde 1970 y lo mismo con la fecha de vencimiento, las resta para ver cuántos milisegundos de diferencia hay, y lo divide por la cantidad de milisegundos que tiene un dia de manera que se convierta en diferencia de dias.
            );
            const multa = diasRetraso * 50; //50 pesos por día de retraso
            this._multas += multa; //Acumula la multa al total de multas del socio
            console.log(`${this.nombreCompleto} devolvió tarde y recibió una multa de $${multa}. Multa total: $${this._multas}`);
        }

        return prestamo; //Devuelve el objeto Prestamo que se devolvió, por si se quiere usar para algo
    }

    getHistorial(): Libro[] {
        return this.historial;
    }

    tienePrestadoLibro(libro: Libro): Prestamo | null {
        return this.prestamos.find((p) => p.libro === libro) ?? null; //Devuelve el objeto prestamo. Esto tambien devuelve true o false.
    }

    pagarMulta(monto: number) {
        if (monto <= 0) return;
        this._multas -= monto;
        if (this._multas < 0) this._multas = 0;
        console.log(`${this.nombreCompleto} pagó $${monto}. Multa pendiente: $${this._multas}`);
    }

    tieneMultasPendientes(): boolean {
        return this._multas > 0;
    }

    notificar(mensaje: string) {
        this.notificaciones.push(mensaje);
    }

    verNotificaciones(): string[] {
        const pendientes = [...this.notificaciones]; //Los 3 puntos hacen una copia del array para no devolver la referencia al original. Si mostrara this.notificaciones directamente, al vaciarlo abajo no podria llegar a ver las notificaciones pendientes en el return
        this.notificaciones = []; //se vacía después de verlas
        return pendientes;
    }

    registrarEvento(evento: EventoBiblioteca) { //para registrar un socio a un evento con objeto.registrarEvento(evento)
        this.eventosRegistrados.push(evento);
        this.notificar(`Te registraste al evento "${evento.titulo}" (${evento.fecha.toDateString()})`);
    }

    getEventos(): EventoBiblioteca[] {
        return this.eventosRegistrados;
    }
}
