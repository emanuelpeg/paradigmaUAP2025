// Import necessary modules for console interaction (if needed, but we'll use console directly)
// For dates, we'll use Date object

// Clase Autor
class Autor {
    constructor(
        public nombre: string,
        public biografia: string,
        public anoNacimiento: number
    ) {}
}

// Clase Libro
class Libro {
    public disponible: boolean = true;
    public esReferencia: boolean = false;
    public reservas: Usuario[] = []; // Cola de reservas (FIFO)
    public prestamoActual?: Prestamo; // Préstamo actual si está prestado

    constructor(
        public titulo: string,
        public autor: Autor,
        public isbn: string,
        esReferencia?: boolean
    ) {
        this.esReferencia = esReferencia || false;
    }

    // Reservar el libro
    reservar(socio: Usuario) {
        if (!this.disponible && !this.reservas.includes(socio)) {
            this.reservas.push(socio);
            console.log(`Usuario ${socio.nombre} ha reservado el libro "${this.titulo}".`);
        } else {
            console.log(`El libro "${this.titulo}" ya está disponible o ya tienes una reserva.`);
        }
    }

    // Procesar disponibilidad después de devolución
    procesarReservas() {
        if (this.reservas.length > 0) {
            const socio = this.reservas.shift()!; // Sacar el primero de la cola
            console.log(`Notificación: El libro "${this.titulo}" está disponible para ${socio.nombre}.`);
            // Aquí se podría prestar automáticamente, pero por simplicidad, solo notificamos
        }
    }
}

// Tarea 2: Clase base abstracta Prestamo
abstract class Prestamo {
    public fechaPrestamo: Date;
    public multaPendiente: number = 0;

    constructor(
        public libro: Libro,
        public socio: Usuario
    ) {
        this.fechaPrestamo = new Date();
    }

    abstract calcularVencimiento(): Date;
    abstract calcularMulta(fechaActual: Date): number;

    // Método para afectar disponibilidad (polimorfismo)
    afectarDisponibilidad(): void {
        if (this.libro.esReferencia) {
            // Para referencia, no afecta disponibilidad
            return;
        }
        this.libro.disponible = false;
        this.libro.prestamoActual = this;
    }
}

// Subclases de Prestamo
class PrestamoRegular extends Prestamo {
    calcularVencimiento(): Date {
        const fecha = new Date(this.fechaPrestamo);
        fecha.setDate(fecha.getDate() + 14);
        return fecha;
    }

    calcularMulta(fechaActual: Date = new Date()): number {
        if (this.socio instanceof SocioVIP) return 0; // Sin multas para VIP
        if (fechaActual > this.calcularVencimiento()) {
            const diasRetraso = Math.floor((fechaActual.getTime() - this.calcularVencimiento().getTime()) / (1000 * 60 * 60 * 24));
            return diasRetraso * 50; // $50 por día
        }
        return 0;
    }
}

class PrestamoCorto extends Prestamo {
    calcularVencimiento(): Date {
        const fecha = new Date(this.fechaPrestamo);
        fecha.setDate(fecha.getDate() + 7);
        return fecha;
    }

    calcularMulta(fechaActual: Date = new Date()): number {
        if (this.socio instanceof SocioVIP) return 0; // Sin multas para VIP
        if (fechaActual > this.calcularVencimiento()) {
            const diasRetraso = Math.floor((fechaActual.getTime() - this.calcularVencimiento().getTime()) / (1000 * 60 * 60 * 24));
            return diasRetraso * 100; // Multa doble: $100 por día
        }
        return 0;
    }
}

class PrestamoReferencia extends Prestamo {
    calcularVencimiento(): Date {
        return new Date(); // Consulta inmediata, sin vencimiento
    }

    calcularMulta(fechaActual: Date): number {
        return 0; // Sin multa
    }

    afectarDisponibilidad(): void {
        // No afecta disponibilidad para consulta en sitio
        console.log(`Consulta en biblioteca para "${this.libro.titulo}". No se afecta disponibilidad.`);
    }
}

class PrestamoDigital extends Prestamo {
    calcularVencimiento(): Date {
        // Sin límite de tiempo
        const fecha = new Date(this.fechaPrestamo);
        fecha.setFullYear(fecha.getFullYear() + 10); // 10 años como proxy
        return fecha;
    }

    calcularMulta(fechaActual: Date): number {
        return 0; // Sin multa
    }
}

// Para políticas que extienden período
class PrestamoExtendido extends Prestamo {
    constructor(libro: Libro, socio: Usuario, private dias: number = 21) {
        super(libro, socio);
    }

    calcularVencimiento(): Date {
        const fecha = new Date(this.fechaPrestamo);
        fecha.setDate(fecha.getDate() + this.dias);
        return fecha;
    }

    calcularMulta(fechaActual: Date = new Date()): number {
        if (this.socio instanceof SocioVIP) return 0;
        if (fechaActual > this.calcularVencimiento()) {
            const diasRetraso = Math.floor((fechaActual.getTime() - this.calcularVencimiento().getTime()) / (1000 * 60 * 60 * 24));
            return diasRetraso * 50;
        }
        return 0;
    }
}

class PrestamoLargo extends Prestamo {
    constructor(libro: Libro, socio: Usuario, private dias: number = 30) {
        super(libro, socio);
    }

    calcularVencimiento(): Date {
        const fecha = new Date(this.fechaPrestamo);
        fecha.setDate(fecha.getDate() + this.dias);
        return fecha;
    }

    calcularMulta(fechaActual: Date = new Date()): number {
        if (this.socio instanceof SocioVIP) return 0;
        if (fechaActual > this.calcularVencimiento()) {
            const diasRetraso = Math.floor((fechaActual.getTime() - this.calcularVencimiento().getTime()) / (1000 * 60 * 60 * 24));
            return diasRetraso * 50;
        }
        return 0;
    }
}

// Tarea 1: Clase base Usuario (anteriormente Socio)
class Usuario {
    public prestamosActuales: Prestamo[] = [];
    public historialLectura: Libro[] = []; // Historial completo de libros leídos
    public multasPendientes: number = 0;
    public eventosRegistrados: EventoBiblioteca[] = [];

    constructor(
        public nombre: string,
        public id: string
    ) {}

    getMaxLibros(): number {
        return 3;
    }

    getPeriodoDias(): number {
        return 14;
    }

    puedePrestar(): boolean {
        return true;
    }

    puedeAccederReferencia(): boolean {
        return false;
    }

    tieneVencidos(): boolean {
        return this.prestamosActuales.some(p => new Date() > p.calcularVencimiento());
    }

    // Pagar multas
    pagarMultas() {
        if (this.multasPendientes > 0) {
            console.log(`Usuario ${this.nombre} ha pagado $${this.multasPendientes} en multas.`);
            this.multasPendientes = 0;
        } else {
            console.log(`Usuario ${this.nombre} no tiene multas pendientes.`);
        }
    }

    // Registrar en evento
    registrarEvento(evento: EventoBiblioteca) {
        if (!this.eventosRegistrados.includes(evento)) {
            this.eventosRegistrados.push(evento);
            console.log(`Usuario ${this.nombre} se ha registrado en el evento "${evento.nombre}".`);
        }
    }

    // Recibir recomendaciones
    obtenerRecomendaciones(biblioteca: Biblioteca): Libro[] {
        const autoresLeidos = new Set(this.historialLectura.map(libro => libro.autor.nombre));
        const titulosLeidos = this.historialLectura.map(libro => libro.titulo.toLowerCase());

        const recomendaciones: Libro[] = [];

        biblioteca.libros.forEach(libro => {
            if (this.historialLectura.includes(libro) || this.prestamosActuales.some(p => p.libro === libro)) {
                return; // No recomendar lo ya leído o prestado
            }

            // Basado en autor
            if (autoresLeidos.has(libro.autor.nombre)) {
                recomendaciones.push(libro);
                return;
            }

            // Basado en similitud de título (simple: contiene alguna palabra)
            const palabrasTitulo = libro.titulo.toLowerCase().split(' ');
            if (titulosLeidos.some(titulo => palabrasTitulo.some(palabra => titulo.includes(palabra)))) {
                recomendaciones.push(libro);
            }
        });

        return recomendaciones;
    }
}

// Subclases de Usuario (Tarea 1)
class SocioRegular extends Usuario {
    getMaxLibros(): number {
        return 3;
    }

    getPeriodoDias(): number {
        return 14;
    }
}

class SocioVIP extends Usuario {
    getMaxLibros(): number {
        return 5;
    }

    getPeriodoDias(): number {
        return 21; // Período extendido
    }
}

class Empleado extends Usuario {
    getMaxLibros(): number {
        return Infinity; // Acceso ilimitado
    }

    puedeAccederReferencia(): boolean {
        return true; // Puede acceder a libros de referencia
    }

    getPeriodoDias(): number {
        return 14;
    }
}

class Visitante extends Usuario {
    puedePrestar(): boolean {
        return false; // Solo consulta catálogo
    }

    getMaxLibros(): number {
        return 0;
    }
}

// Clase EventoBiblioteca
class EventoBiblioteca {
    constructor(
        public nombre: string,
        public fecha: Date,
        public descripcion: string
    ) {}

    // Notificar a registrados (simulado)
    notificarRegistrados() {
        console.log(`Notificación para evento "${this.nombre}" en fecha ${this.fecha.toDateString()}.`);
        // En un sistema real, iteraría sobre registrados, pero como no los tenemos centralizados, se maneja por socio
    }
}

// Tarea 4: Interface IBuscable
interface IBuscable {
    buscarPor(criterio: string): any[];
    filtrar(condicion: (item: any) => boolean): any[];
}

// Clases que implementan IBuscable
class CatalogoBiblioteca implements IBuscable {
    constructor(public libros: Libro[]) {}

    buscarPor(criterio: string): Libro[] {
        return this.libros.filter(libro => 
            libro.titulo.toLowerCase().includes(criterio.toLowerCase()) ||
            libro.autor.nombre.toLowerCase().includes(criterio.toLowerCase())
        );
    }

    filtrar(condicion: (libro: Libro) => boolean): Libro[] {
        return this.libros.filter(condicion);
    }
}

class RecursoDigital {
    constructor(
        public titulo: string,
        public url: string
    ) {}
}

class BibliotecaDigital implements IBuscable {
    public recursos: RecursoDigital[] = [];

    buscarPor(criterio: string): RecursoDigital[] {
        return this.recursos.filter(recurso => 
            recurso.titulo.toLowerCase().includes(criterio.toLowerCase())
        );
    }

    filtrar(condicion: (recurso: RecursoDigital) => boolean): RecursoDigital[] {
        return this.recursos.filter(condicion);
    }
}

class DocumentoAntiguo {
    constructor(
        public titulo: string,
        public ano: number
    ) {}
}

class ArchivoHistorico implements IBuscable {
    public documentos: DocumentoAntiguo[] = [];

    buscarPor(criterio: string): DocumentoAntiguo[] {
        return this.documentos.filter(doc => 
            doc.titulo.toLowerCase().includes(criterio.toLowerCase())
        );
    }

    filtrar(condicion: (doc: DocumentoAntiguo) => boolean): DocumentoAntiguo[] {
        return this.documentos.filter(condicion);
    }
}

class ArticuloAcademico {
    constructor(
        public titulo: string,
        public autor: string
    ) {}
}

class BaseConocimiento implements IBuscable {
    public articulos: ArticuloAcademico[] = [];

    buscarPor(criterio: string): ArticuloAcademico[] {
        return this.articulos.filter(articulo => 
            articulo.titulo.toLowerCase().includes(criterio.toLowerCase()) ||
            articulo.autor.toLowerCase().includes(criterio.toLowerCase())
        );
    }

    filtrar(condicion: (articulo: ArticuloAcademico) => boolean): ArticuloAcademico[] {
        return this.articulos.filter(condicion);
    }
}

// BuscadorUniversal
class BuscadorUniversal {
    constructor(public buscables: IBuscable[]) {}

    buscarUniversal(criterio: string): any[] {
        let resultados: any[] = [];
        this.buscables.forEach(buscable => {
            const res = buscable.buscarPor(criterio);
            resultados = resultados.concat(res);
        });
        return resultados;
    }

    filtrarUniversal(condicion: (item: any) => boolean): any[] {
        let resultados: any[] = [];
        this.buscables.forEach(buscable => {
            const res = buscable.filtrar(condicion);
            resultados = resultados.concat(res);
        });
        return resultados;
    }
}

// Tarea 3: Patrón Strategy - Interface para Políticas de Préstamo
interface PoliticaPrestamo {
    puedePrestar(socio: Usuario, libro: Libro): { allow: boolean; tipo: string; reason?: string };
    // El tipo determina qué subclase de Prestamo crear
}

// Implementaciones de políticas
class PoliticaEstricta implements PoliticaPrestamo {
    puedePrestar(socio: Usuario, libro: Libro): { allow: boolean; tipo: string; reason?: string } {
        if (!socio.puedePrestar()) {
            return { allow: false, tipo: '', reason: 'El usuario no puede prestar libros.' };
        }
        if (socio.multasPendientes > 0) {
            return { allow: false, tipo: '', reason: 'Multas pendientes.' };
        }
        if (socio.tieneVencidos()) {
            return { allow: false, tipo: '', reason: 'Hay préstamos vencidos.' };
        }
        if (socio.prestamosActuales.length >= socio.getMaxLibros()) {
            return { allow: false, tipo: '', reason: 'Máximo de libros alcanzado.' };
        }
        if (libro.esReferencia && !socio.puedeAccederReferencia()) {
            return { allow: false, tipo: '', reason: 'No puede acceder a libros de referencia.' };
        }
        return { allow: true, tipo: 'regular' };
    }
}

class PoliticaFlexible implements PoliticaPrestamo {
    puedePrestar(socio: Usuario, libro: Libro): { allow: boolean; tipo: string; reason?: string } {
        if (!socio.puedePrestar()) {
            return { allow: false, tipo: '', reason: 'El usuario no puede prestar libros.' };
        }
        if (socio.multasPendientes > 0) {
            return { allow: false, tipo: '', reason: 'Multas pendientes.' };
        }
        if (socio.prestamosActuales.length >= socio.getMaxLibros()) {
            return { allow: false, tipo: '', reason: 'Máximo de libros alcanzado.' };
        }
        if (libro.esReferencia && !socio.puedeAccederReferencia()) {
            return { allow: false, tipo: '', reason: 'No puede acceder a libros de referencia.' };
        }
        // Permite si hay vencidos, pero con período reducido
        const tipo = socio.tieneVencidos() ? 'corto' : 'regular';
        return { allow: true, tipo };
    }
}

class PoliticaEstudiante implements PoliticaPrestamo {
    // Simular época de exámenes: meses 9-12 (sept-dic)
    private isEpocaExamenes(): boolean {
        const mesActual = new Date().getMonth() + 1; // 1-12
        return mesActual >= 9 && mesActual <= 12;
    }

    puedePrestar(socio: Usuario, libro: Libro): { allow: boolean; tipo: string; reason?: string } {
        if (!socio.puedePrestar()) {
            return { allow: false, tipo: '', reason: 'El usuario no puede prestar libros.' };
        }
        if (socio.multasPendientes > 0 || socio.tieneVencidos()) {
            return { allow: false, tipo: '', reason: 'Multas o vencidos no permitidos.' };
        }
        if (socio.prestamosActuales.length >= socio.getMaxLibros()) {
            return { allow: false, tipo: '', reason: 'Máximo de libros alcanzado.' };
        }
        if (libro.esReferencia && !socio.puedeAccederReferencia()) {
            return { allow: false, tipo: '', reason: 'No puede acceder a libros de referencia.' };
        }
        const tipo = this.isEpocaExamenes() ? 'extendido' : 'regular';
        return { allow: true, tipo };
    }
}

class PoliticaDocente implements PoliticaPrestamo {
    puedePrestar(socio: Usuario, libro: Libro): { allow: boolean; tipo: string; reason?: string } {
        if (!socio.puedePrestar()) {
            return { allow: false, tipo: '', reason: 'El usuario no puede prestar libros.' };
        }
        if (socio.multasPendientes > 0) {
            return { allow: false, tipo: '', reason: 'Multas pendientes.' };
        }
        if (socio.prestamosActuales.length >= socio.getMaxLibros()) {
            return { allow: false, tipo: '', reason: 'Máximo de libros alcanzado.' };
        }
        if (libro.esReferencia && !socio.puedeAccederReferencia()) {
            return { allow: false, tipo: '', reason: 'No puede acceder a libros de referencia.' };
        }
        // Para docentes (asumiendo Empleado es docente), préstamos largos
        const tipo = socio instanceof Empleado ? 'largo' : 'regular';
        return { allow: true, tipo };
    }
}

// Clase Biblioteca
class Biblioteca {
    public libros: Libro[] = [];
    public socios: Usuario[] = [];
    public autores: Autor[] = [];
    public eventos: EventoBiblioteca[] = [];
    public currentPolitica: PoliticaPrestamo = new PoliticaEstricta(); // Política por defecto

    public catalogo: CatalogoBiblioteca;
    public bibliotecaDigital: BibliotecaDigital;
    public archivoHistorico: ArchivoHistorico;
    public baseConocimiento: BaseConocimiento;
    public buscador: BuscadorUniversal;

    constructor() {
        this.catalogo = new CatalogoBiblioteca(this.libros);
        this.bibliotecaDigital = new BibliotecaDigital();
        this.archivoHistorico = new ArchivoHistorico();
        this.baseConocimiento = new BaseConocimiento();
        this.buscador = new BuscadorUniversal([this.catalogo, this.bibliotecaDigital, this.archivoHistorico, this.baseConocimiento]);
    }

    // Cambiar política dinámicamente (Tarea 3)
    cambiarPolitica(politica: PoliticaPrestamo) {
        this.currentPolitica = politica;
        console.log(`Política cambiada a ${politica.constructor.name}`);
    }

    // Agregar libro (actualizar catálogo)
    agregarLibro(libro: Libro) {
        this.libros.push(libro);
        if (!this.autores.includes(libro.autor)) {
            this.autores.push(libro.autor);
        }
        console.log(`Libro "${libro.titulo}" agregado a la biblioteca.`);
    }

    // Agregar socio
    agregarSocio(socio: Usuario) {
        this.socios.push(socio);
        console.log(`Usuario ${socio.nombre} agregado a la biblioteca.`);
    }

    // Prestar libro (con polimorfismo y strategy)
    prestarLibro(isbn: string, idSocio: string, tipoPrestamo?: string) {
        const libro = this.libros.find(l => l.isbn === isbn);
        const socio = this.socios.find(s => s.id === idSocio);

        if (!libro || !socio) {
            console.log('Libro o usuario no encontrado.');
            return;
        }

        // Usar política para verificar y obtener tipo
        const { allow, tipo, reason } = this.currentPolitica.puedePrestar(socio, libro);
        if (!allow) {
            console.log(`No se puede prestar: ${reason}`);
            return;
        }

        let tipoFinal = tipoPrestamo || tipo;

        // Crear préstamo polimórfico basado en tipo
        let prestamo: Prestamo;
        switch (tipoFinal) {
            case 'regular':
                prestamo = new PrestamoRegular(libro, socio);
                break;
            case 'corto':
                prestamo = new PrestamoCorto(libro, socio);
                break;
            case 'referencia':
                prestamo = new PrestamoReferencia(libro, socio);
                break;
            case 'digital':
                prestamo = new PrestamoDigital(libro, socio);
                break;
            case 'extendido':
                prestamo = new PrestamoExtendido(libro, socio);
                break;
            case 'largo':
                prestamo = new PrestamoLargo(libro, socio);
                break;
            default:
                console.log('Tipo de préstamo no válido.');
                return;
        }

        // Manejo uniforme (polimorfismo)
        socio.prestamosActuales.push(prestamo);
        prestamo.afectarDisponibilidad();
        console.log(`Libro "${libro.titulo}" prestado a ${socio.nombre} como ${tipoFinal}. Vence el ${prestamo.calcularVencimiento().toDateString()}.`);
    }

    // Devolver libro (usa polimorfismo en calcularMulta)
    devolverLibro(isbn: string, idSocio: string) {
        const libro = this.libros.find(l => l.isbn === isbn);
        const socio = this.socios.find(s => s.id === idSocio);

        if (!libro || !socio || !libro.prestamoActual || libro.prestamoActual.socio !== socio) {
            console.log('Préstamo no encontrado.');
            return;
        }

        const prestamo = libro.prestamoActual;
        const multa = prestamo.calcularMulta(new Date()); // Pasar fecha explícitamente si no se usa default
        if (multa > 0) {
            socio.multasPendientes += multa;
            console.log(`Notificación: Multa de $${multa} por retraso en "${libro.titulo}".`);
        }

        socio.prestamosActuales = socio.prestamosActuales.filter(p => p !== prestamo);
        socio.historialLectura.push(libro);
        // Restaurar disponibilidad si no es referencia/digital permanente
        if (!libro.esReferencia) {
            libro.disponible = true;
        }
        libro.prestamoActual = undefined;
        console.log(`Libro "${libro.titulo}" devuelto por ${socio.nombre}.`);

        libro.procesarReservas();
    }

    // Encontrar libros por autor
    encontrarLibrosPorAutor(nombreAutor: string): Libro[] {
        return this.libros.filter(libro => libro.autor.nombre === nombreAutor);
    }

    // Agregar evento
    agregarEvento(evento: EventoBiblioteca) {
        this.eventos.push(evento);
        console.log(`Evento "${evento.nombre}" agregado.`);
    }

    // Notificar vencimientos (simulado, llamar periódicamente)
    notificarVencimientos() {
        this.socios.forEach(socio => {
            socio.prestamosActuales.forEach(prestamo => {
                if (new Date() > prestamo.calcularVencimiento() && prestamo.multaPendiente === 0) {
                    const multa = prestamo.calcularMulta(new Date());
                    console.log(`Notificación a ${socio.nombre}: El libro "${prestamo.libro.titulo}" está vencido. Multa actual: $${multa}.`);
                    // Actualizar multa pendiente, pero se calcula en devolución
                }
            });
        });
    }

    // Notificar eventos próximos (simulado)
    notificarEventosProximos() {
        const hoy = new Date();
        this.eventos.forEach(evento => {
            const diasRestantes = Math.floor((evento.fecha.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
            if (diasRestantes <= 3 && diasRestantes > 0) {
                console.log(`Notificación: Evento "${evento.nombre}" se acerca en ${diasRestantes} días.`);
                // Notificar a registrados
                this.socios.forEach(socio => {
                    if (socio.eventosRegistrados.includes(evento)) {
                        console.log(`- Para ${socio.nombre}`);
                    }
                });
            }
        });
    }

    // Tarea 4: Métodos para búsqueda universal
    buscarUniversal(criterio: string): any[] {
        return this.buscador.buscarUniversal(criterio);
    }

    // Consultar estado
    consultarEstado() {
        console.log('Estado de la Biblioteca:');
        console.log('Libros:');
        this.libros.forEach(libro => {
            console.log(`- "${libro.titulo}" por ${libro.autor.nombre} (ISBN: ${libro.isbn}) - Disponible: ${libro.disponible} ${libro.esReferencia ? '(Referencia)' : ''}`);
        });
        console.log('Socios:');
        this.socios.forEach(socio => {
            console.log(`- ${socio.nombre} (${socio.constructor.name}) (ID: ${socio.id}) - Multas: $${socio.multasPendientes}`);
            console.log('  Préstamos actuales: ' + socio.prestamosActuales.map(p => p.libro.titulo).join(', '));
            console.log('  Historial: ' + socio.historialLectura.map(l => l.titulo).join(', '));
        });
    }
}

// Ejemplo de uso (demostración por consola)
function main() {
    const biblioteca = new Biblioteca();

    // Crear autores
    const autor1 = new Autor('Gabriel García Márquez', 'Escritor colombiano, nobel de literatura.', 1927);
    const autor2 = new Autor('J.K. Rowling', 'Escritora británica, creadora de Harry Potter.', 1965);

    // Agregar libros (uno de referencia)
    biblioteca.agregarLibro(new Libro('Cien Años de Soledad', autor1, 'ISBN1'));
    biblioteca.agregarLibro(new Libro('El Amor en los Tiempos del Cólera', autor1, 'ISBN2'));
    biblioteca.agregarLibro(new Libro('Harry Potter y la Piedra Filosofal', autor2, 'ISBN3', true)); // Referencia

    // Agregar usuarios de diferentes tipos (Tarea 1)
    biblioteca.agregarSocio(new SocioRegular('Juan Perez', 'S001'));
    biblioteca.agregarSocio(new SocioVIP('Maria Lopez', 'S002'));
    biblioteca.agregarSocio(new Empleado('Ana Garcia', 'E001'));
    biblioteca.agregarSocio(new Visitante('Pedro Visitor', 'V001'));

    // Cambiar a política flexible (Tarea 3)
    biblioteca.cambiarPolitica(new PoliticaFlexible());

    // Prestar libro regular a Juan (SocioRegular)
    biblioteca.prestarLibro('ISBN1', 'S001');

    // Simular retraso para demo (ajustar fechaPrestamo para que vencimiento sea pasado)
    const prestamoJuan = biblioteca.socios[0].prestamosActuales[0];
    prestamoJuan.fechaPrestamo = new Date(Date.now() - 25 * 24 * 60 * 60 * 1000); // 25 días atrás para vencido

    // Intentar devolver con multa
    biblioteca.devolverLibro('ISBN1', 'S001');

    // Intentar prestar de nuevo (con flexible, permite pero corto por vencido)
    biblioteca.prestarLibro('ISBN2', 'S001');

    // Para Maria VIP, prestar (sin multa incluso si vencido)
    biblioteca.prestarLibro('ISBN3', 'S002', 'referencia'); // Referencia, pero como VIP, asume puede (aunque policy chequea)

    // Para Empleado, cambiar a política docente
    biblioteca.cambiarPolitica(new PoliticaDocente());
    biblioteca.prestarLibro('ISBN1', 'E001'); // Largo para empleado

    // Para Visitante, no puede
    biblioteca.prestarLibro('ISBN2', 'V001'); // Debería fallar

    // Pagar multas
    biblioteca.socios[0].pagarMultas();

    // Tarea 4: Agregar datos a otros sistemas de búsqueda
    biblioteca.bibliotecaDigital.recursos.push(new RecursoDigital('Ebook de García Márquez', 'http://ebook1.com'));
    biblioteca.bibliotecaDigital.recursos.push(new RecursoDigital('Harry Potter Digital', 'http://ebook2.com'));

    biblioteca.archivoHistorico.documentos.push(new DocumentoAntiguo('Manuscrito Antiguo 1', 1800));
    biblioteca.archivoHistorico.documentos.push(new DocumentoAntiguo('Documento sobre García', 1920));

    biblioteca.baseConocimiento.articulos.push(new ArticuloAcademico('Análisis de Realismo Mágico', 'Crítico 1'));
    biblioteca.baseConocimiento.articulos.push(new ArticuloAcademico('Estudio de Rowling', 'Crítico 2'));

    // Búsqueda universal
    const resultados = biblioteca.buscarUniversal('García');
    console.log('Resultados de búsqueda universal para "García":');
    resultados.forEach((res, index) => {
        if (res instanceof Libro) {
            console.log(`Libro: ${res.titulo}`);
        } else if (res instanceof RecursoDigital) {
            console.log(`Digital: ${res.titulo}`);
        } else if (res instanceof DocumentoAntiguo) {
            console.log(`Archivo: ${res.titulo}`);
        } else if (res instanceof ArticuloAcademico) {
            console.log(`Artículo: ${res.titulo}`);
        }
    });

    // Ejemplo de filtrar (solo disponible en catálogo)
    const disponibles = biblioteca.catalogo.filtrar(libro => libro.disponible);
    console.log('Libros disponibles: ' + disponibles.map(l => l.titulo).join(', '));

    // Reservar un libro prestado
    const libroPrestado = biblioteca.libros[1]; // ISBN2 prestado
    libroPrestado.reservar(biblioteca.socios[1]); // Maria reserva

    // Devolver y procesar reserva
    biblioteca.devolverLibro('ISBN2', 'S001');

    // Encontrar libros por autor
    const librosAutor1 = biblioteca.encontrarLibrosPorAutor('Gabriel García Márquez');
    console.log('Libros de Gabriel García Márquez: ' + librosAutor1.map(l => l.titulo).join(', '));

    // Agregar evento
    const evento = new EventoBiblioteca('Club de Lectura: Realismo Mágico', new Date(new Date().setDate(new Date().getDate() + 2)), 'Discusión sobre obras de GGM.');
    biblioteca.agregarEvento(evento);

    // Registrar usuario en evento
    biblioteca.socios[0].registrarEvento(evento);

    // Notificar eventos próximos
    biblioteca.notificarEventosProximos();

    // Notificar vencimientos (simular uno vencido)
    const prestamoMaria = new PrestamoDigital(biblioteca.libros[2], biblioteca.socios[1]);
    biblioteca.socios[1].prestamosActuales.push(prestamoMaria);
    // No afecta disponible para digital
    prestamoMaria.libro.prestamoActual = prestamoMaria;
    biblioteca.notificarVencimientos(); // No multa para digital

    // Recomendaciones
    const recomendaciones = biblioteca.socios[0].obtenerRecomendaciones(biblioteca);
    console.log('Recomendaciones para Juan: ' + recomendaciones.map(l => l.titulo).join(', '));

    // Consultar estado
    biblioteca.consultarEstado();
}

main();