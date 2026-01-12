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
    console.log("📚 Biblioteca");
  }


    // gestión de entidades 

    agregarLibro(libro: Libro): void {
        this.libros.push(libro);
        console.log(`📖 Libro agregado: "${libro.titulo}" de ${libro.autor.nombre}`);
    }

    agregarUsuario(usuario: Usuario): void {
        this.usuarios.push(usuario);
        console.log(`🧑 Usuario agregado: ${usuario.nombre} (ID: ${usuario.id})`);
    }

    crearEvento(evento: EventoBiblioteca): void {
        this.eventos.push(evento);
        console.log(`🎉 Evento creado: "${evento.nombre}" en fecha ${evento.fecha}`);
    }

    // gestión de préstamos
    setPolitica(politica: PoliticaPrestamo): void {
        this.politica = politica;
        console.log(`⚖️ Política de préstamo actualizada: ${politica.constructor.name}`);
    }

    prestarLibro(prestamo: Prestamo): string {
        const usuario = prestamo.usuario;
        console.log(`📌 Intentando prestar "${prestamo.libro.titulo}" a ${usuario.nombre}...`);

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

        if (!prestamo) {
            console.log(`❌ Préstamo no encontrado para Libro ${isbn} y usuario ${usuarioId}.`);
            return "❌ Préstamo no encontrado.";
        }

        console.log(`📌 Devolviendo libro "${prestamo.libro.titulo}" de ${prestamo.usuario.nombre}...`);

        // calcular multa si corresponde 
        let multa = 0;
        if (prestamo.usuario.tieneMultas()) {
            multa = prestamo.calcularMulta(fechaDevolucion);
            console.log(`💰 Multa calculada: $${multa}`);
        }

        prestamo.libro.devolver();
        this.prestamos = this.prestamos.filter(p => p !== prestamo);

        let mensaje = `✔️ Libro "${prestamo.libro.titulo}" devuelto por ${prestamo.usuario.nombre}.`;
        if (multa > 0) mensaje += ` Multa aplicada: $${multa}.`;

        console.log(mensaje);
        return mensaje;
    }

    // consultas 
    buscarLibrosPorAutor(autor: Autor): Libro[] {
        const encontrados =  this.libros.filter(l => l.autor === autor);
        console.log(`🔍 Libros encontrados por ${autor.nombre}: ${encontrados.map(l => l.titulo).join(", ")}`);
        return encontrados;
    }

    recomendarLibros(usuarioId: number): Libro[] {
        const prestamosUsuario = this.prestamos.filter(p => p.usuario.id === usuarioId);
        if (!prestamosUsuario || prestamosUsuario.length === 0) {
            const usuario = this.usuarios.find(u => u.id === usuarioId);
            const nombre = usuario ? usuario.nombre : `ID ${usuarioId}`;
            console.log(`ℹ️ Usuario ${nombre} no tiene préstamos previos. No hay recomendaciones.`);
            return [];
        }
        const nombreUsuario = prestamosUsuario[0].usuario.nombre;
        const autoresLeidos = prestamosUsuario.map(p => p.libro.autor);
        const recomendados = this.libros.filter(
            l => autoresLeidos.includes(l.autor) && !prestamosUsuario.some(p => p.libro === l)
        );
        console.log(`💡 Recomendaciones para usuario ${nombreUsuario}: ${recomendados.map(l => l.titulo).join(", ")}`);
        return recomendados;
    }

    // busqueda global 
    buscarGlobal(criterio: string): any[] {
        const resultados = this.buscador.buscarGlobal(criterio);

        const resumen = resultados.map((item: any) => ({
            titulo: item.titulo,
            autor: item.autor?.nombre,
            isbn: item.isbn
        }));

        console.log(`🌐 Búsqueda global para "${criterio}": ${resumen.length} resultados encontrados.`);

        return resumen;
    }
}