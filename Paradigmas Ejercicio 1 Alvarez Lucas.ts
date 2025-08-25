import * as readline from 'readline';

// Enums
enum EstadoLibro {
  DISPONIBLE = "DISPONIBLE",
  PRESTADO = "PRESTADO",
  RESERVADO = "RESERVADO"
}

// Interfaces
interface Notificacion {
  idDestinatario: string;
  mensaje: string;
  fecha: Date;
}

// Clases
class Autor {
  constructor(
    public id: string,
    public nombre: string,
    public biografia: string,
    public anioNacimiento: number
  ) {}
}

class Libro {
  private reservas: string[] = [];
  private fechaPrestamo: Date | null = null;
  private fechaVencimiento: Date | null = null;

  constructor(
    public id: string,
    public titulo: string,
    public autor: Autor,
    public isbn: string,
    public estado: EstadoLibro = EstadoLibro.DISPONIBLE
  ) {}

  agregarReserva(idSocio: string): void {
    this.reservas.push(idSocio);
  }

  obtenerReservas(): string[] {
    return [...this.reservas];
  }

  eliminarReserva(idSocio: string): void {
    this.reservas = this.reservas.filter(id => id !== idSocio);
  }

  establecerDetallesPrestamo(fechaPrestamo: Date, fechaVencimiento: Date): void {
    this.fechaPrestamo = fechaPrestamo;
    this.fechaVencimiento = fechaVencimiento;
    this.estado = EstadoLibro.PRESTADO;
  }

  limpiarDetallesPrestamo(): void {
    this.fechaPrestamo = null;
    this.fechaVencimiento = null;
    this.estado = EstadoLibro.DISPONIBLE;
  }

  calcularMulta(fechaActual: Date): number {
    if (!this.fechaVencimiento || !this.fechaPrestamo) return 0;
    if (fechaActual <= this.fechaVencimiento) return 0;
    
    const diasRetraso = Math.floor(
      (fechaActual.getTime() - this.fechaVencimiento.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diasRetraso * 50; // $50 por día de retraso
  }
}

class Socio {
  private librosPrestados: Map<string, Libro> = new Map();
  private historialLectura: Libro[] = [];
  private notificaciones: Notificacion[] = [];
  private eventosRegistrados: EventoBiblioteca[] = [];

  constructor(
    public id: string,
    public nombre: string,
    public email: string,
    private multa: number = 0
  ) {}

  prestarLibro(libro: Libro, fechaPrestamo: Date, fechaVencimiento: Date): void {
    this.librosPrestados.set(libro.id, libro);
    libro.establecerDetallesPrestamo(fechaPrestamo, fechaVencimiento);
  }

  devolverLibro(idLibro: string): Libro | null {
    const libro = this.librosPrestados.get(idLibro);
    if (libro) {
      this.librosPrestados.delete(idLibro);
      this.historialLectura.push(libro);
      libro.limpiarDetallesPrestamo();
      return libro;
    }
    return null;
  }

  agregarMulta(monto: number): void {
    this.multa += monto;
  }

  pagarMulta(monto: number): void {
    this.multa = Math.max(0, this.multa - monto);
  }

  obtenerMulta(): number {
    return this.multa;
  }

  agregarNotificacion(mensaje: string): void {
    this.notificaciones.push({
      idDestinatario: this.id,
      mensaje,
      fecha: new Date()
    });
  }

  obtenerNotificaciones(): Notificacion[] {
    return [...this.notificaciones];
  }

  registrarseEnEvento(evento: EventoBiblioteca): void {
    this.eventosRegistrados.push(evento);
  }

  obtenerHistorialLectura(): Libro[] {
    return [...this.historialLectura];
  }
}

class EventoBiblioteca {
  constructor(
    public id: string,
    public titulo: string,
    public fecha: Date,
    public descripcion: string,
    private sociosRegistrados: string[] = []
  ) {}

  registrarSocio(idSocio: string): void {
    this.sociosRegistrados.push(idSocio);
  }

  obtenerSociosRegistrados(): string[] {
    return [...this.sociosRegistrados];
  }
}

class Biblioteca {
  private libros: Map<string, Libro> = new Map();
  private socios: Map<string, Socio> = new Map();
  private autores: Map<string, Autor> = new Map();
  private eventos: Map<string, EventoBiblioteca> = new Map();

  agregarLibro(libro: Libro): void {
    this.libros.set(libro.id, libro);
    this.autores.set(libro.autor.id, libro.autor);
  }

  agregarSocio(socio: Socio): void {
    this.socios.set(socio.id, socio);
  }

  agregarEvento(evento: EventoBiblioteca): void {
    this.eventos.set(evento.id, evento);
    evento.obtenerSociosRegistrados().forEach(idSocio => {
      const socio = this.socios.get(idSocio);
      if (socio) {
        socio.agregarNotificacion(`Nuevo evento: ${evento.titulo} el ${evento.fecha.toLocaleDateString()}`);
      }
    });
  }

  prestarLibro(idLibro: string, idSocio: string, dias: number = 14): boolean {
    const libro = this.libros.get(idLibro);
    const socio = this.socios.get(idSocio);

    if (!libro || !socio) return false;
    if (libro.estado !== EstadoLibro.DISPONIBLE) return false;
    if (socio.obtenerMulta() > 0) {
      socio.agregarNotificacion("No se puede prestar: Hay multas pendientes");
      return false;
    }

    const fechaPrestamo = new Date();
    const fechaVencimiento = new Date(fechaPrestamo.getTime() + dias * 24 * 60 * 60 * 1000);
    
    socio.prestarLibro(libro, fechaPrestamo, fechaVencimiento);
    return true;
  }

  devolverLibro(idLibro: string, idSocio: string): boolean {
    const socio = this.socios.get(idSocio);
    if (!socio) return false;

    const libro = socio.devolverLibro(idLibro);
    if (!libro) return false;

    const multa = libro.calcularMulta(new Date());
    if (multa > 0) {
      socio.agregarMulta(multa);
      socio.agregarNotificacion(`Multa de $${multa} aplicada por devolución tardía de ${libro.titulo}`);
    }

    const reservas = libro.obtenerReservas();
    if (reservas.length > 0) {
      const idSiguienteSocio = reservas[0];
      const siguienteSocio = this.socios.get(idSiguienteSocio);
      if (siguienteSocio) {
        siguienteSocio.agregarNotificacion(`El libro ${libro.titulo} está ahora disponible para usted`);
        libro.eliminarReserva(idSiguienteSocio);
        libro.estado = EstadoLibro.RESERVADO;
      }
    }

    return true;
  }

  reservarLibro(idLibro: string, idSocio: string): boolean {
    const libro = this.libros.get(idLibro);
    const socio = this.socios.get(idSocio);

    if (!libro || !socio) return false;
    if (libro.estado === EstadoLibro.DISPONIBLE) {
      socio.agregarNotificacion(`El libro ${libro.titulo} ya está disponible`);
      return false;
    }

    libro.agregarReserva(idSocio);
    socio.agregarNotificacion(`Reserva realizada para ${libro.titulo}`);
    return true;
  }

  obtenerLibrosPorAutor(idAutor: string): Libro[] {
    return Array.from(this.libros.values()).filter(libro => libro.autor.id === idAutor);
  }

  obtenerRecomendacionesSocio(idSocio: string): Libro[] {
    const socio = this.socios.get(idSocio);
    if (!socio) return [];

    const historial = socio.obtenerHistorialLectura();
    const autores = new Set(historial.map(libro => libro.autor.id));
    const titulos = new Set(historial.map(libro => libro.titulo.toLowerCase()));

    const recomendaciones: Libro[] = [];
    for (const libro of this.libros.values()) {
      if (libro.estado !== EstadoLibro.DISPONIBLE) continue;
      if (historial.includes(libro)) continue;

      const palabrasTitulo = libro.titulo.toLowerCase().split(" ");
      const tieneTituloSimilar = palabrasTitulo.some(palabra => titulos.has(palabra));
      
      if (autores.has(libro.autor.id) || tieneTituloSimilar) {
        recomendaciones.push(libro);
      }
    }

    return recomendaciones;
  }

  verificarLibrosVencidos(): void {
    const fechaActual = new Date();
    this.socios.forEach(socio => {
      socio.obtenerNotificaciones().forEach(notificacion => {
        if (notificacion.mensaje.includes("está vencido")) return;
      });

      socio.obtenerHistorialLectura().forEach(libro => {
        const multa = libro.calcularMulta(fechaActual);
        if (multa > 0 && libro.estado === EstadoLibro.PRESTADO) {
          socio.agregarNotificacion(`El libro ${libro.titulo} está vencido. Multa actual: $${multa}`);
        }
      });
    });
  }

  // Métodos para carga por consola
  async cargarAutor(rl: readline.Interface): Promise<void> {
    const id = await this.preguntar(rl, "Ingrese ID del autor: ");
    const nombre = await this.preguntar(rl, "Ingrese nombre del autor: ");
    const biografia = await this.preguntar(rl, "Ingrese biografía del autor: ");
    const anioNacimiento = parseInt(await this.preguntar(rl, "Ingrese año de nacimiento del autor: "));
    
    if (isNaN(anioNacimiento)) {
      console.log("Año de nacimiento inválido. Autor no agregado.");
      return;
    }

    const autor = new Autor(id, nombre, biografia, anioNacimiento);
    this.autores.set(id, autor);
    console.log(`Autor ${nombre} agregado exitosamente.`);
  }

  async cargarLibro(rl: readline.Interface): Promise<void> {
    const id = await this.preguntar(rl, "Ingrese ID del libro: ");
    const titulo = await this.preguntar(rl, "Ingrese título del libro: ");
    const idAutor = await this.preguntar(rl, "Ingrese ID del autor: ");
    const isbn = await this.preguntar(rl, "Ingrese ISBN del libro: ");

    const autor = this.autores.get(idAutor);
    if (!autor) {
      console.log("Autor no encontrado. Libro no agregado.");
      return;
    }

    const libro = new Libro(id, titulo, autor, isbn);
    this.agregarLibro(libro);
    console.log(`Libro ${titulo} agregado exitosamente.`);
  }

  async cargarSocio(rl: readline.Interface): Promise<void> {
    const id = await this.preguntar(rl, "Ingrese ID del socio: ");
    const nombre = await this.preguntar(rl, "Ingrese nombre del socio: ");
    const email = await this.preguntar(rl, "Ingrese email del socio: ");

    const socio = new Socio(id, nombre, email);
    this.agregarSocio(socio);
    console.log(`Socio ${nombre} agregado exitosamente.`);
  }

  private preguntar(rl: readline.Interface, pregunta: string): Promise<string> {
    return new Promise(resolve => {
      rl.question(pregunta, respuesta => {
        resolve(respuesta);
      });
    });
  }
}

// Función principal para interactuar por consola
async function main() {
  const biblioteca = new Biblioteca();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  while (true) {
    console.log("\nSistema de Gestión de Biblioteca");
    console.log("1. Agregar autor");
    console.log("2. Agregar libro");
    console.log("3. Agregar socio");
    console.log("4. Salir");
    
    const opcion = await biblioteca.preguntar(rl, "Seleccione una opción: ");

    switch (opcion) {
      case "1":
        await biblioteca.cargarAutor(rl);
        break;
      case "2":
        await biblioteca.cargarLibro(rl);
        break;
      case "3":
        await biblioteca.cargarSocio(rl);
        break;
      case "4":
        console.log("Saliendo del sistema...");
        rl.close();
        return;
      default:
        console.log("Opción inválida. Intente nuevamente.");
    }
  }
}

// Ejecutar el programa
main().catch(error => console.error("Error:", error));