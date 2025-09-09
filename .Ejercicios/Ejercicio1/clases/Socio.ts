import { Libro } from "./Libro";
import { Multa } from "./Multa";
import { Notificacion } from "./Notificacion";
import { Prestamo } from "./Prestamo";

// Duración en días de un préstamo
type Duracion = number;

export abstract class Socio {
    private prestamos: Prestamo[] = [];
    private multas: Multa[] = [];
    private notificaciones: Notificacion[] = [];
    private historial: Libro[] = [];
    constructor(
        private _id: number,
        private _nombre: string,
        private _apellido: string,
    ){}

    get id(){ return this._id; }
    get nombre(){ return this._nombre; }
    get apellido(){ return this._apellido; }
    get nombreCompleto(){ return `${this._nombre} ${this._apellido}`; }
    get obtenerPrestamos(){ return this.prestamos; }
    get obtenerMultas(){ return this.multas; }
    get obtenerNotificaciones() {return this.notificaciones;}

    abstract getDuracionPrestamo(): Duracion;
    abstract getMaximoLibros(): number;

    retirarLibro(libro: Libro){
        const vencimiento = new Date();
        vencimiento.setDate(vencimiento.getDate() + duracion);
        this.prestamos.push(new Prestamo(libro, vencimiento));
    }

    devolverLibro(libro: Libro){
        const prestamo = this.prestamos.find(p => p.obtenerLibro === libro);
        if (!prestamo) {
            throw new Error(`El libro "${libro.titulo}" no está prestado a este socio.`);
        }
        const indice = this.prestamos.indexOf(prestamo);
        this.prestamos.splice(indice, 1); // Eliminar el elemento en el índice encontrado
        return prestamo;
    }

    tienePrestadoLibro(libro: Libro): Prestamo | null {
        return this.prestamos.find((p) => p.obtenerLibro === libro) ?? null;   
    }

    agregarMulta(multa: Multa){ 
        this.multas.push(multa);
    }
    quitarMulta(multa: Multa){ 
        const indice = this.multas.indexOf(multa);
        if (indice === -1) {
            throw new Error(`La multa no pertenece al socio con ID ${this._id}.`);
        }
        this.multas.splice(indice, 1); // Eliminar el elemento en el índice encontrado
    }

    agregarNotificacion(notificacion: Notificacion){
        this.notificaciones.push(notificacion);
    }
    verNotificaciones()
    {
        for (const n of this.notificaciones)
        {
            console.log(`${n.getMensaje} - ${n.getFecha}`);
        }
    }

    agregarAlHistorial(libro: Libro): void 
    {
        this.historial.push(libro);
    }

    obtenerHistorial(): Libro[]
    {
        return this.historial;
    }
}
export type { Prestamo };

export class SocioRegular extends Socio {
  getDuracionPrestamo(): Duracion {
    return 14;
  }

  getMaximoLibros(): number {
    return 3;
  }

  devolver(libro: Libro): Prestamo {
    // Manejar potenciales multas
    return super.devolverLibro(libro);
  }
}

export class SocioVIP extends Socio {
  getDuracionPrestamo(): Duracion {
    return 21;
  }

  getMaximoLibros(): number {
    return 5;
  }
}

export class Empleado extends Socio {
  getDuracionPrestamo(): Duracion {
    return 30;
  }

  getMaximoLibros(): number {
    return Infinity;
  }
}

export class Visitante extends Socio {
  puedeRetirar(libro: Libro): boolean {
    return false;
  }

  getDuracionPrestamo(): Duracion {
    return 0;
  }

  getMaximoLibros(): number {
    return 0;
  }
}

export enum TipoSocio {
  REGULAR = "regular",
  VIP = "vip",
  EMPLEADO = "empleado",
  VISITANTE = "visitante",
}

export class SocioFactory {
  static crearSocio(
    tipo: TipoSocio,
    id: number,
    nombre: string,
    apellido: string
  ): Socio {
    switch (tipo) {
      case TipoSocio.REGULAR:
        return new SocioRegular(id, nombre, apellido);
      case TipoSocio.VIP:
        return new SocioVIP(id, nombre, apellido);
      case TipoSocio.EMPLEADO:
        return new Empleado(id, nombre, apellido);
      case TipoSocio.VISITANTE:
        return new Visitante(id, nombre, apellido);
      default:
        throw new Error("Tipo de socio no valido");
    }
  }
}