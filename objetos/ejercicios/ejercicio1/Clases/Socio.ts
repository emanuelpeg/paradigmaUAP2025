export type TipoSocio = "regular" | "vip" | "empleado" | "visitante";

export abstract class Socio {
  prestamosActivos: number = 0;
  constructor(
    public id: number,
    public nombre: string,
    public apellido: string,
    public tipo: TipoSocio
  ) {}

  /** límite de préstamos en simultáneo */
  abstract limite(): number | "ilimitado";
  /** días de préstamo por defecto */
  abstract diasPrestamo(): number;
  /** si paga multa */
  abstract pagaMulta(): boolean;
  /** ¿puede referencia? */
  abstract puedeReferencia(): boolean;
  /** ¿puede pedir libros? */
  abstract puedePedir(): boolean;
}

export class SocioRegular extends Socio {
  constructor(id: number, nombre: string, apellido: string) {
    super(id, nombre, apellido, "regular");
  }
  limite(): number | "ilimitado" { return 3; }
  diasPrestamo(): number { return 14; }
  pagaMulta(): boolean { return true; }
  puedeReferencia(): boolean { return false; }
  puedePedir(): boolean { return true; }
}

export class SocioVIP extends Socio {
  constructor(id: number, nombre: string, apellido: string) {
    super(id, nombre, apellido, "vip");
  }
  limite(): number | "ilimitado" { return 5; }
  diasPrestamo(): number { return 21; } // extendido
  pagaMulta(): boolean { return false; } // sin multas
  puedeReferencia(): boolean { return false; }
  puedePedir(): boolean { return true; }
}

export class Empleado extends Socio {
  constructor(id: number, nombre: string, apellido: string) {
    super(id, nombre, apellido, "empleado");
  }
  limite(): number | "ilimitado" { return "ilimitado"; }
  diasPrestamo(): number { return 28; }
  pagaMulta(): boolean { return false; }
  puedeReferencia(): boolean { return true; } // acceso a referencia
  puedePedir(): boolean { return true; }
}

export class Visitante extends Socio {
  constructor(id: number, nombre: string, apellido: string) {
    super(id, nombre, apellido, "visitante");
  }
  limite(): number | "ilimitado" { return 0; }
  diasPrestamo(): number { return 0; }
  pagaMulta(): boolean { return false; }
  puedeReferencia(): boolean { return false; }
  puedePedir(): boolean { return false; } // solo catálogo
}
