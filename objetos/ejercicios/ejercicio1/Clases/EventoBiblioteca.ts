export class EventoBiblioteca {
  constructor(
    public titulo: string,
    public fecha: Date,
    public descripcion: string = "",
    public sociosInscriptos: number[] = []
  ) {}
  static notificarPrestamo(nombreSocio: string, tituloLibro: string, vencimiento: Date) {
    console.log(`${nombreSocio} retiró "${tituloLibro}". Vence: ${vencimiento.toLocaleDateString()}`);
  }
  static notificarDevolucion(nombreSocio: string, tituloLibro: string, multa: number) {
    console.log(`↩${nombreSocio} devolvió "${tituloLibro}". Multa: $${multa}`);
  }
  static notificarReserva(nombreSocio: string, tituloLibro: string) {
    console.log(`${nombreSocio}, tu reserva de "${tituloLibro}" está disponible.`);
  }
  static notificarEventoProximo(evento: EventoBiblioteca) {
    console.log(`Recordatorio: ${evento.titulo} — ${evento.fecha.toLocaleString()}`);
  }
}