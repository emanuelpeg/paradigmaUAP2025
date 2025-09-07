import { Libro } from "../modelos/Libro";
import { Usuario } from "../modelos/Usuario";
import { Autor } from "../modelos/Autor";
import { EventoBiblioteca } from "../modelos/EventoBiblioteca";
import { Prestamo } from "../modelos/Prestamo";
import { PoliticaPrestamo, PoliticaEstricta } from "../servicios/Politicas";
import { BuscadorUniversal } from "../busqueda/BuscadorUniversal";
import { IBuscable } from "../busqueda/IBuscable"; 

export class Biblioteca {
    private libros: Libro[] = [];
    private usuarios: Usuario[] = [];
    private eventos: EventoBiblioteca[] = [];
    private prestamos: Prestamo[] = [];
    private politica: PoliticaPrestamo = new PoliticaEstricta();
    private buscador: BuscadorUniversal;

    constructor(sistemasBusqueda: IBuscable<any>[]) {
    this.buscador = new BuscadorUniversal(sistemasBusqueda);
  }


    // gestión de entidades 

    agregarLibro(libro: Libro): void {
        this.libros.push(libro);
    }

    agregarUsuario(usuario: Usuario): void {
        this.usuarios.push(usuario);
    }

    crearEvento(evento: EventoBiblioteca): void {
        this.eventos.push(evento);
    }

    // gestión de préstamos
    setPolitica(politica: PoliticaPrestamo): void {
        this.politica = politica;
    }

    prestarLibro(prestamo: Prestamo): string {
        const usuario = prestamo.usuario;

        // chequeo politica
        const prestamosUsuario = this.prestamos.filter(p => p.usuario.id === usuario.id);
        if (!this.politica.permitirPrestamo(usuario, prestamosUsuario)) {
        return `❌ No se puede prestar. Política actual bloquea préstamo para ${usuario.nombre}.`;
        }

        // chequeo de límite
        if (prestamosUsuario.length >= usuario.maxLibros()) {
        return `❌ ${usuario.nombre} alcanzó el límite de libros: (${usuario.maxLibros()}).`;
        }

        // asignar préstamo
        this.prestamos.push(prestamo);
        prestamo.libro.prestar();
        return `✔️ Libro "${prestamo.libro.titulo}" prestado a ${usuario.nombre}.`;
    }



    devolverLibro(isbn: string, usuarioId: number, fechaDevolucion: Date): string {
        const prestamo = this.prestamos.find(
            p => p.libro.isbn === isbn && p.usuario.id === usuarioId
        );

        if (!prestamo) return "❌ Préstamo no encontrado.";

        // calcular multa si corresponde 
        let multa = 0;
        if (prestamo.usuario.tieneMultas()) {
            multa = prestamo.calcularMulta(fechaDevolucion);
        }

        prestamo.libro.devolver();
        this.prestamos = this.prestamos.filter(p => p !== prestamo);

        let mensaje = `✔️ Libro "${prestamo.libro.titulo}" devuelto por ${prestamo.usuario.nombre}.`;
        if (multa > 0) mensaje += ` Multa aplicada: $${multa}.`;

        return mensaje;
    }

    // consultas 

    buscarLibrosPorAutor(autor: Autor): Libro[] {
        return this.libros.filter(l => l.autor === autor);
    }

    recomendarLibros(usuarioId: number): Libro[] {
        const prestamosUsuario = this.prestamos.filter(p => p.usuario.id === usuarioId);
        if (!prestamosUsuario || prestamosUsuario.length === 0) return [];

        const autoresLeidos = prestamosUsuario.map(p => p.libro.autor);
        return this.libros.filter(
            l => autoresLeidos.includes(l.autor) && !prestamosUsuario.some(p => p.libro === l)
        );
    }

    // busqueda global 
    buscarGlobal(criterio: string): any[] {
        return this.buscador.buscarGlobal(criterio);
    }
}