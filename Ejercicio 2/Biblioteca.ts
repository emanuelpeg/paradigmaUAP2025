import { Libro } from "./Libro";
import { Socio, TipoSocio } from "./Socio";
import { Autor } from "./Autor";
import { EventoBiblioteca } from "./EventoBiblioteca";
import {
  PrestamoBase,
  PrestamoRegular,
  PrestamoCorto,
  PrestamoReferencia,
  PrestamoDigital,
  TipoPrestamo
} from "./Prestamos";
import { PoliticaPrestamo, PoliticaEstricta } from "./Politicas";
import {
  CatalogoBiblioteca, BuscadorUniversal,
  BibliotecaDigital, ArchivoHistorico, BaseConocimiento
} from "./Buscadores";

const DURACION_PRESTAMO_DIAS = 14;
const MULTA_DIARIA = 50;

class Biblioteca {
  private inventario: Libro[] = [];
  private socios: Socio[] = [];
  private autores: Autor[] = [];
  private eventos: EventoBiblioteca[] = [];

  // Préstamos polimórficos
  private prestamos: Map<string, PrestamoBase> = new Map(); // id -> préstamo
  private idxSocioLibro: Map<string, string> = new Map();   // "socioId::isbn" -> id préstamo

  // Strategy 
  private _politica: PoliticaPrestamo = new PoliticaEstricta();
  public contexto: { enExamenes: boolean } = { enExamenes: false };

  // Buscador universal 
  private universal?: BuscadorUniversal;

  private notify(socioId: number, mensaje: string) {
    const s = this.buscarSocio(socioId);
    if (s) s.notificar(mensaje);
    console.log(mensaje);
  }
  
  
  agregarAutor(id: number, nombre: string, biografia = "", anioNacimiento?: number): Autor {
    const autor = new Autor(id, nombre, biografia, anioNacimiento);
    this.autores.push(autor);
    return autor;
  }
  buscarAutor(id: number): Autor | null {
    return this.autores.find(a => a.id === id) ?? null;
  }

  
  agregarLibro(titulo: string, autor: Autor, isbn: string): Libro {
    const libroCreado = new Libro(titulo, autor, isbn);
    this.inventario.push(libroCreado);
    // sincronizar con buscador si está inicializado
    if (this.universal) {
      const cat = new CatalogoBiblioteca(this.inventario);
      (this.universal as any).fuentes[0] = cat;
    }
    return libroCreado;
  }
  buscarLibro(isbn: string): Libro | null {
    return this.inventario.find(l => l.isbn === isbn) ?? null;
  }
  librosDeAutor(autorId: number): Libro[] {
    return this.inventario.filter(l => l.autor.id === autorId);
  }

  
  registrarSocio(
    id: number,
    nombre: string,
    apellido: string,
    tipo: TipoSocio = "regular" // NUEVO
  ): Socio {
    const socioCreado = new Socio(id, nombre, apellido, tipo);
    this.socios.push(socioCreado);
    return socioCreado;
  }
  buscarSocio(id: number): Socio | null {
    return this.socios.find(s => s.id === id) ?? null;
  }

 
  private libroDisponible(libro: Libro): boolean {
    return !this.socios.some(s => s.tienePrestadoLibro(libro));
  }

  
  set politica(p: PoliticaPrestamo) { this._politica = p; }
  get politica() { return this._politica; }

  usuarioTieneVencidos(socio: Socio, hoy = new Date()): boolean {
    const base = new Date(hoy); base.setHours(0,0,0,0);
    for (const p of socio.prestamosActivos()) {
      const due = new Date(p.vencimiento); due.setHours(0,0,0,0);
      if (due.getTime() < base.getTime()) return true;
    }
    return false;
  }

  
  private crearPrestamo(tipo: TipoPrestamo, socio: Socio, libro: Libro): PrestamoBase {
    switch (tipo) {
      case "corto":      return new PrestamoCorto(socio, libro, 7);
      case "referencia": return new PrestamoReferencia(socio, libro);
      case "digital":    return new PrestamoDigital(socio, libro);
      default:           return new PrestamoRegular(socio, libro, 14);
    }
  }

  
  prestarConTipo(socioId: number, libroISBN: string, tipo: TipoPrestamo = "regular"): void {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);
    if (!socio || !libro) throw new Error("No se encontró socio o libro");

    
    if (socio.tipo === "visitante") {
      throw new Error("El visitante no puede pedir prestado");
    }
    const activos = socio.prestamosActivos().length;
    if (activos >= socio.maxLibros()) {
      throw new Error("Supera el máximo de préstamos activos para este socio");
    }
    if (tipo === "referencia" && !socio.puedeAccederReferencia()) {
      throw new Error("Solo empleados pueden acceder a libros de referencia");
    }

    
    if (!socio.puedePrestar) {
      throw new Error("El socio tiene multas pendientes");
    }

    
    if (!this._politica.puedePrestar(this, socio, libro, tipo)) {
      throw new Error("Política actual no permite el préstamo");
    }

    if (this.libroDisponible(libro)) {
     
      const base =
        tipo === "corto" ? 7 :
        tipo === "regular" ? DURACION_PRESTAMO_DIAS :
        0; 

      
      const diasAprobados = this._politica.ajustarDuracion(base, this, socio, new Date());

     
      socio.retirar(libro, diasAprobados);

      
      const p = this.crearPrestamo(tipo, socio, libro);
      const id = `${socio.id}-${libro.isbn}-${Date.now()}`;
      this.prestamos.set(id, p);
      this.idxSocioLibro.set(`${socio.id}::${libro.isbn}`, id);

      this.notify(socio.id, `✔ Retiraste '${libro.titulo}' (${tipo}).`);
    } else {
      libro.agregarReserva(socioId);
      this.notify(socio.id, `⏳ Reserva registrada para '${libro.titulo}'. Estás en cola.`);
    }
  }

  
  retirarLibro(socioId: number, libroISBN: string): void {
    this.prestarConTipo(socioId, libroISBN, "regular");
  }

  
  devolverLibro(socioId: number, libroISBN: string, fechaDevolucion: Date = new Date()): void {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);
    if (!socio || !libro) throw new Error("No se encontró socio o libro");

 
    const key = `${socio.id}::${libro.isbn}`;
    const prId = this.idxSocioLibro.get(key);
    if (!prId) throw new Error("No se encontró el préstamo activo en Biblioteca");
    const prestamo = this.prestamos.get(prId)!;

    
    prestamo.devolver(fechaDevolucion);
    const multa = prestamo.calcularMulta(fechaDevolucion, MULTA_DIARIA);

   
    if (multa > 0 && socio.puedeRecibirMulta()) {
      socio.sumarMulta(multa);
      this.notify(socio.id, `⚠ Atraso. Multa: $${multa}. Pendiente: $${socio.multasPendientes}.`);
    }

   
    socio.devolver(libro);
    socio.registrarLectura(libro.isbn);
    this.notify(socio.id, `↩ Devolviste '${libro.titulo}'.`);

    
    const siguienteId = libro.quitarReserva();
    if (siguienteId !== null) {
      this.notify(siguienteId, `📢 Tu reserva de '${libro.titulo}' ya está disponible.`);
    }

    
    this.idxSocioLibro.delete(key);
    this.prestamos.delete(prId);
  }

  
  pagarMulta(socioId: number, monto: number) {
    const socio = this.buscarSocio(socioId);
    if (!socio) throw new Error("Socio no encontrado");
    socio.pagarMulta(monto);
    this.notify(socioId, `💳 Pago registrado. Multa pendiente: $${socio.multasPendientes}.`);
  }

  
  crearEvento(id: number, titulo: string, fecha: Date, descripcion = ""): EventoBiblioteca {
    const ev = new EventoBiblioteca(id, titulo, fecha, descripcion);
    this.eventos.push(ev);
    return ev;
  }
  inscribirEnEvento(eventoId: number, socioId: number) {
    const ev = this.eventos.find(e => e.id === eventoId);
    const socio = this.buscarSocio(socioId);
    if (!ev || !socio) throw new Error("Evento o socio no encontrado");
    ev.registrarParticipante(socioId);
    this.notify(socioId, `🎟️ Te registraste a '${ev.titulo}' (${ev.fecha.toISOString().slice(0,10)}).`);
  }

  
  enviarRecordatoriosVencimientos(hoy: Date = new Date()) {
    const MS = 1000 * 60 * 60 * 24;
    const base = new Date(hoy); base.setHours(0,0,0,0);

    for (const socio of this.socios) {
      for (const p of socio.prestamosActivos()) {
        const due = new Date(p.vencimiento); due.setHours(0,0,0,0);
        const dias = Math.floor((due.getTime() - base.getTime()) / MS);
        if (dias === 2) {
          this.notify(socio.id, `⏰ Recordatorio: '${p.libro.titulo}' vence en 2 días (${due.toISOString().slice(0,10)}).`);
        } else if (dias < 0) {
          this.notify(socio.id, `❗ Atrasado: '${p.libro.titulo}' venció el ${due.toISOString().slice(0,10)}.`);
        }
      }
    }
  }

  enviarRecordatoriosEventos(hoy: Date = new Date()) {
    const MS = 1000 * 60 * 60 * 24;
    const base = new Date(hoy); base.setHours(0,0,0,0);

    for (const ev of this.eventos) {
      const when = new Date(ev.fecha); when.setHours(0,0,0,0);
      const dias = Math.floor((when.getTime() - base.getTime()) / MS);
      if (dias === 2 || dias === 1) {
        for (const socioId of ev.participantes) {
          this.notify(socioId, `📆 Evento pronto: '${ev.titulo}' en ${dias} día(s).`);
        }
      }
    }
  }

  
  recomendarLibros(socioId: number, max = 5): Libro[] {
    const socio = this.buscarSocio(socioId);
    if (!socio) return [];

    const autorCount = new Map<number, number>();
    for (const isbn of socio.historial) {
      const l = this.buscarLibro(isbn);
      if (!l) continue;
      autorCount.set(l.autor.id, (autorCount.get(l.autor.id) ?? 0) + 1);
    }

    const keywords = new Map<string, number>();
    const tokenize = (s: string) =>
      s.toLowerCase().split(/[^a-záéíóúñü0-9]+/).filter(Boolean).filter(w => w.length > 2);

    for (const isbn of socio.historial) {
      const l = this.buscarLibro(isbn);
      if (!l) continue;
      for (const w of tokenize(l.titulo)) {
        keywords.set(w, (keywords.get(w) ?? 0) + 1);
      }
    }

    const leidos = new Set(socio.historial);
    const scored: { libro: Libro; score: number }[] = [];

    for (const l of this.inventario) {
      if (leidos.has(l.isbn)) continue;
      if (socio.tienePrestadoLibro(l)) continue;

      let score = 0;
      score += (autorCount.get(l.autor.id) ?? 0) * 10;
      for (const w of tokenize(l.titulo)) score += keywords.get(w) ?? 0;
      if (this.libroDisponible(l)) score += 1;

      if (score > 0) scored.push({ libro: l, score });
    }

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, max).map(s => s.libro);
  }

  
  inicializarBuscadores() {
    const cat = new CatalogoBiblioteca(this.inventario);
    const dig = new BibliotecaDigital([]);
    const arc = new ArchivoHistorico([]);
    const base = new BaseConocimiento([]);
    this.universal = new BuscadorUniversal([cat, dig, arc, base]);
  }
  buscarEnTodo(criterio: Record<string, unknown>) {
    if (!this.universal) this.inicializarBuscadores();
    return this.universal!.buscarPor(criterio);
  }
}

export const biblioteca = new Biblioteca();
export type { Biblioteca };
