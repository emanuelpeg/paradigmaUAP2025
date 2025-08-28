import { Libro } from "./Libro";
import { EventoBiblioteca } from "./EventoBiblioteca";

class Prestamo { // una clase auxiliar para manejar los préstamos
    constructor(public libro: Libro, public vencimiento: Date) {}
    // guarda el libro y la fecha hasta cuando puede tenerlo prestado.
}
type Duracion = number; // alias. Sirve para no tener que escribir en los parametros "number" y poder escribir Duracion 
                        // y ya se sabe que de tipo number el parametro que recibe

export class Socio {
    private prestamos: Prestamo[] = [];
    private _multas: number = 0;  // precio de la multa
    private notificaciones: string[] = [];
    private eventosRegistrados: EventoBiblioteca[] = []; // eventos del socio
    private historial: Libro[] = []; // libros que ha retirado alguna vez

    constructor(
        private _id: number,
        private _nombre: string,
        private _apellido: string
    ) {}

    get id() { return this._id }
    get nombre() { return this._nombre }
    get apellido() { return this._apellido }
    get nombreCompleto() { return `${this._nombre} ${this._apellido}` }
    get multas() { return this._multas }  //poder consultar multas

    retirar(libro: Libro, duracion : Duracion){ // recibe el libro a retirar y la cantiad de dias que dura el prestamo
        const vencimiento = new Date(); // Crea un objeto Date con la fecha y hora actual
        vencimiento.setDate(vencimiento.getDate() + duracion); // actualiza la fecha del dia resultante: dia actual + dias de duracion prestamo
        this.prestamos.push(new Prestamo(libro, vencimiento)); // crea un nuevo prestamo con los datos que debe recibir y ya lo agrega  al lisa de prestamos del socio
    }

    devolver(libro: Libro){
        const prestamo = this.prestamos.find(p => p.libro === libro); // busca en los prestamos del socio el libro a devolver 
        if(!prestamo) {
            console.log("No está prestado"); // este mensaje significa qu nunc pidió prestando el libro. Por eso no se encontró en la slita de prestamos                  
            return;
        }

        const indice = this.prestamos.indexOf(prestamo); // busca el indice donde se encuentra el libro dentro del array de prestamos
        this.prestamos.splice(indice, 1); // lo elimina de la lista
        this.historial.push(libro); // se agrega el libro al historial de libros leidos por el socio

        // cálculo de multa en caso de haber devuelto tarde.
        const hoy = new Date();
        if (hoy > prestamo.vencimiento) { // Si la fecha de hoy es posterior a la fecha de vencimiento, entonces hubo atraso.
            const diasRetraso = Math.ceil( 
                (hoy.getTime() - prestamo.vencimiento.getTime()) / (1000 * 60 * 60 * 24)
                // resta el dia actual con el dia de vencimiento en anosegundos. El resultaod de esta resta es el tiempo de atraso en milisegundos. 
                // Y lo dividimos por los milisegundos en dia. Para obtener la cantidad de dias de atarso. 
            );
            const multa = diasRetraso * 50; // calcula el precio de la multa. 
            this._multas += multa; // se la suma el precio de las multas del socio
            console.log(`${this.nombreCompleto} devolvió tarde y recibió una multa de $${multa}. Multa total: $${this._multas}`);
        }
        return prestamo;
    }

    getHistorial(): Libro[] { // get de historial, ya que al ser privado no lo podiamos pdeir como si nada en otra clase
        return this.historial; // devuelve el historial de libro del socio (cada vez que devolvía un libro, se lo gregaba a su lista de historial)
    }

    tienePrestadoLibro(libro: Libro): Prestamo | null { 
        return this.prestamos.find((p) => p.libro === libro) ?? null; // busca en la lista de prestamos si el libro está prestado
    }

    pagarMulta(monto: number) { // recibe el monto de la multa que debe pagar
        if (monto <= 0) return; // si al final no tenia multas, retorna
        this._multas -= monto; // sino, se le resta el precio de la multa
        if (this._multas < 0) this._multas = 0; // verifica que no haya pagado de mas, porque si es asi vuelve a cero para no dejar alor negativo
        console.log(`${this.nombreCompleto} pagó $${monto}. Multa pendiente: $${this._multas}`);
    }

    tieneMultasPendientes(): boolean {
        return this._multas > 0; // devuelve true si tiene multas (precio mayor a o)
    }


    // Mi pregunta: Cuando el socio pide ver las notifiaciones, ve TODAS as que ha tenido?
    // Respuesta: cuando el usuario llama a verNotifiaciones() ve TODAS las notificaciones acumuladas hasta ese momento.
    // Despues de verlas, la lista queda vacía. O sea, ve las notifiaciones que no había viso, pero dsp de verlas ya las borra.
    // Y hasta que no la llame de nuevo, se van a ir acumulando.

    verNotificaciones(): string[] {
        const pendientes = [...this.notificaciones]; // hace una copia del array de notificaciones
        this.notificaciones = []; // Limpia la lista de notificaciones del socio.
        return pendientes; // Devuelve la copia con todas las notificaciones que tenía el socio en ese momento.
    }

    registrarEvento(evento: EventoBiblioteca) { // recibe el evento de la biblioteca (crado en el index)
        this.eventosRegistrados.push(evento); // agregamos el eventoa  la lista de evento del socio
        this.notificar(`Te registraste al evento "${evento.titulo}" (${evento.fecha.toDateString()})`);
    }

    notificar(mensaje: string) { // recibe el mensaje del registro al evento
        this.notificaciones.push(mensaje); // lo agrega a la llista de notifiaciones del cliete
    }

    getEventos(): EventoBiblioteca[] { // devuelve todos los eventos a los que se resgistró. 
        return this.eventosRegistrados;
    }
}
