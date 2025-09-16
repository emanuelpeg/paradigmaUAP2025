import { Libro } from "./Libro";
import { Socio } from "./Socio";
import { Autor } from "./Autor";
import { EventoBiblioteca } from "./EventoBiblioteca";

const DURACION_PRESTAMO_DIAS = 14;
const MULTA_DIARIA = 50;

class Biblioteca {
  private inventario: Libro[] = [];
  private socios: Socio[] = [];
  private autores: Autor[] = [];
  private eventos: EventoBiblioteca[] = [];

  private notify(socioId: number, mensaje: string) {
    const s = this.buscarSocio(socioId);
    if (s) s.notificar(mensaje);
    console.log(mensaje); // opcional: también en consola
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
    return libroCreado;
  }
  buscarLibro(isbn: string): Libro | null {
    return this.inventario.find(l => l.isbn === isbn) ?? null;
  }

  librosDeAutor(autorId: number): Libro[] {
    return this.inventario.filter(l => l.autor.id === autorId);
  }


  registrarSocio(id: number, nombre: string, apellido: string): Socio {
    const socioCreado = new Socio(id, nombre, apellido);
    this.socios.push(socioCreado);
    return socioCreado;
  }
  buscarSocio(id: number): Socio | null {
    return this.socios.find(s => s.id === id) ?? null;
  }


  private libroDisponible(libro: Libro): boolean {
    return !this.socios.some(s => s.tienePrestadoLibro(libro));
  }

 
  retirarLibro(socioId: number, libroISBN: string): void {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);
    if (!socio || !libro) throw new Error("No se encontró socio o libro");


    if (!socio.puedePrestar) {
      throw new Error("El socio tiene multas pendientes");
    }

    if (this.libroDisponible(libro)) {
      socio.retirar(libro, DURACION_PRESTAMO_DIAS);
      this.notify(socio.id, `✔ Retiraste '${libro.titulo}'.`);
    } else {
      libro.agregarReserva(socioId);
      this.notify(socio.id, `⏳ Reserva registrada para '${libro.titulo}'. Estás en cola.`);
    }
  }

  
  devolverLibro(socioId: number, libroISBN: string, fechaDevolucion: Date = new Date()): void {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);
    if (!socio || !libro) throw new Error("No se encontró socio o libro");

 
    const prestamo = socio.devolver(libro);
    this.notify(socio.id, `↩ Devolviste '${libro.titulo}'.`);

    
    socio.registrarLectura(libro.isbn);

    // Cálculo de multa 
    const MS = 1000 * 60 * 60 * 24;
    const due = new Date(prestamo.vencimiento);  due.setHours(0,0,0,0);
    const ret = new Date(fechaDevolucion);       ret.setHours(0,0,0,0);
    const diasAtraso = Math.max(0, Math.floor((ret.getTime() - due.getTime()) / MS));
    if (diasAtraso > 0) {
      const multa = diasAtraso * MULTA_DIARIA;
      socio.sumarMulta(multa);
      this.notify(socio.id, `⚠ Atraso de ${diasAtraso} día(s). Multa: $${multa}. Pendiente: $${socio.multasPendientes}.`);
    }

   
    const siguienteId = libro.quitarReserva();
    if (siguienteId !== null) {
      this.notify(siguienteId, `📢 Tu reserva de '${libro.titulo}' ya está disponible.`);
    }
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
      if (leidos.has(l.isbn)) continue;          // ya leído
      if (socio.tienePrestadoLibro(l)) continue; // 🔒 no recomendar lo que tiene prestado

      let score = 0;
      // autor más leído
      score += (autorCount.get(l.autor.id) ?? 0) * 10;
      // coincidencia por título
      for (const w of tokenize(l.titulo)) {
        score += keywords.get(w) ?? 0;
      }
      // preferencia por disponible
      if (this.libroDisponible(l)) score += 1;

      if (score > 0) scored.push({ libro: l, score });
    }

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, max).map(s => s.libro);
  }
}

export const biblioteca = new Biblioteca();
export type { Biblioteca };
