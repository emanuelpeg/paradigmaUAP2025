import { Socio } from "./Socio";
import { Notificacion } from "./Notificacion";

export class EventoBiblioteca {
    private static ultimoId: number = 0;
    private id: number;
    private nombre: string;
    private descripcion: string;
    private sociosInteresados: Socio[] = [];
    private expositor: string | null;

    constructor(nombre: string, descripcion: string, expositor: string | null = null) {
        EventoBiblioteca.ultimoId++;
        this.id = EventoBiblioteca.ultimoId;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.expositor = expositor;
    }

    public agregarSocio(socio: Socio): void {
        if (!this.sociosInteresados.includes(socio)) {
            this.sociosInteresados.push(socio);
        }
    }

    public notificarEvento(): void {
        for (const socio of this.sociosInteresados) {
            Notificacion.NotificacionEvento(socio, this.nombre, this.descripcion, this.expositor);
        }
    }

    public getId(): number {
        return this.id;
    }
    public getNombre(): string {
        return this.nombre;
    }
    public getDescripcion(): string {
        return this.descripcion;
    }
    public getSociosInteresados(): Socio[] {
        return this.sociosInteresados;
    }
    public getExpositor(): string | null {
        return this.expositor;
    }
}
