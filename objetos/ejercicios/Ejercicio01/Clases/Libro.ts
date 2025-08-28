import { Biblioteca } from './Biblioteca';
import { Reserva } from './Reserva'; 
export class Libro {
    
    private titulo: string;
    private autor: Autor;
    private isbn: string;
    private listaReservas: Reserva[]
    private enPrestamo: boolean = false;
    private Multa: number = 50;

    constructor(
        protected _titulo: string,
        protected _autor: Autor,
        protected _isbn: string
    ) {}

    public getTitulo(): string { return this._titulo;}
    public getAutor(): Autor { return this._autor; }
    public getIsbn(): string { return this._isbn; }
    public getListaReservas(): Reserva[] { return this.listaReservas; } 
    
    public setListaReservas(reserva: Reserva): void {
         this.listaReservas.push(reserva); 
    }

    public Disponible(): Date | null {
        const listaReservasOrdenada = [...this.listaReservas].sort((a, b) => 
        a.FechaDevolucion.getTime() - b.FechaDevolucion.getTime());
        
        if (listaReservasOrdenada.length === 0) {
            return new Date; // significa que esta disponible hoy
        }else{
            return listaReservasOrdenada[listaReservasOrdenada.length -1].FechaDevolucion;// devolvemos la ultima fecha de devolucion
        }
    }

    public vencimientoReserva(): void{
        let listaReservas = this.listaReservas.filter(r => r.FechaDevolucion == new Date())// reservas a devolver
        const mensajeDevolucion: string = "La fecha de devolucion del libro a expirado. Por favor devuelva el libro. Recuerde que por cada dia de retraso, deberá abonar un monto";
        listaReservas.forEach(r => Biblioteca.enviarNotificacionASocio(r.SocioId, mensajeDevolucion));

        
    }

    public retiroReservas(): void{
        
        let listaReservas = this.listaReservas.filter(r => r.FechaReserva == new Date())//reservas a retirar
        const mensajeRetiro: string = "El libro que usted desea retirar estará disponible a partir de x horario, puede venir a retirarlo. Muchas Gracias";
        listaReservas.forEach(r => Biblioteca.enviarNotificacionASocio(r.SocioId, mensajeRetiro));

    }

    private estimarMulta( fechaDevolcucion: Date, fechaDevuelto: Date): number {
        const diasRetraso = Math.ceil((fechaDevuelto.getTime() - fechaDevolcucion.getTime()) / (1000 * 3600 * 24));
        if(diasRetraso <=  0){
            return 0;
        }
        else {
            return diasRetraso * this.Multa;
        }
    }



    public updateListaReserva(reserva: Reserva): number{
        const index = this.listaReservas.findIndex(r => r === reserva);
        
        if (index != -1) {

            const multa = this.estimarMulta(reserva.FechaDevolucion, new Date())

            // busqueda del libro en la lista de reservas
            const reservado = this.listaReservas[index];
            // actualizar la fecha de devolucion real
            reservado.updateDevolucionReal(new Date());
            // actualizar la lista de reservas
            this.listaReservas[index] = reservado;

            return multa;
        }
        else {
            console.log("Reserva no encontrada en la lista de reservas del libro");
            return 0; // Return 0 or another default value if the reservation is not found
        }
        
    }

    

}