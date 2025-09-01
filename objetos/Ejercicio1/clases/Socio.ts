import { Libro } from "./Libro";

export class Prestamo{
    
    constructor(public libro: Libro, public vencimiento: Date) {}
}

type Duracion = number;

export class Socio{

    private prestamos: Prestamo[] = []; // Array de prestamos
    private librosRetirados: Libro[] = []; // Array de libros retirados
    private vencimientoPrestamo: Date[] = []; // Array de fechas de vencimiento de prestamos
    private multaPendiente: number = 0;
    private librosPrestados: { libro: Libro; fechaDevolucion: Date }[] = [];
    private historialLectura: Libro[] = []; // Historial de libros leídos

    constructor(
        private _nombre: string, 
        private _id: number,
        private _apellido: string
        ){}

    get id()
    {
        return this._id; 
    }

    get multa(): number {
        return this.multaPendiente;
    }

    get nombre()
    { 
        return this._nombre; 
    }
    get apellido()
    { 
        return this._apellido; 
    }

    pagarMulta(): void{
        console.log('${this.nombre} pagó la multa de ${this.multaPendiente}')
        this.multaPendiente = 0;

    }

    retirarLibro(libro: Libro, diasPrestamo: number ): void {
        const fechaDevolucion = new Date();
        fechaDevolucion.setDate(fechaDevolucion.getDate() + diasPrestamo);
        libro.prestarLibro();
        this.librosPrestados.push({libro, fechaDevolucion});
    }

    devolverLibro(libro: Libro) {
        const index = this.librosPrestados.findIndex(l => l.libro === libro);
        if (index !== -1) {
            const registro = this.librosPrestados[index];
            const hoy = new Date();

            if (hoy > registro.fechaDevolucion) {
                const diasRetraso = Math.floor(
                    (hoy.getTime() - registro.fechaDevolucion.getTime()) /
                    (1000 * 60 * 60 * 24)
                );
                const multa = diasRetraso * 50;
                this.multaPendiente += multa;
                console.log(`${this.nombre} devolvió tarde el libro "${libro.titulo}". Multa: $${multa}`);
            }
            this.prestamos = this.prestamos.filter(p => p.libro !== libro);
            libro.devolver();
            this.librosPrestados.splice(index, 1);
            this.historialLectura.push(libro); //Agregamos el libro al historial
        }
    }

    tieneMulta(): boolean{
        return this.multaPendiente > 0;
    }

    tienePrestadoLibro(libro: Libro): boolean{
        return this.librosPrestados.some(l => l.libro === libro);
    }

    reducirMulta(monto: number): void {
        if (monto < 0) {
            throw new Error("El monto no puede ser negativo.");
        }
        if (monto > this.multaPendiente) {
            throw new Error("El monto excede la multa pendiente.");
        }
        this.multaPendiente -= monto;
    }

    getHistorialLectura(): Libro[]{
        return this.historialLectura
    }
    
    
}