export abstract class Usuario {
  constructor(
    public id: number,
    public nombre: string,
    public apellido: string
  ) {}

  abstract getMaxLibros(): number;
  abstract getPeriodoPrestamo(): number;
  abstract puedePedirPrestado(): boolean;
  abstract calcularMulta(diasAtraso: number): number;
}

export class SocioRegular extends Usuario {
  getMaxLibros() { return 3; }
  getPeriodoPrestamo() { return 14; }
  puedePedirPrestado() { return true; }
  calcularMulta(diasAtraso: number) { return diasAtraso * 50; }
}

export class SocioVIP extends Usuario {
  getMaxLibros() { return 5; }
  getPeriodoPrestamo() { return 28; }
  puedePedirPrestado() { return true; }
  calcularMulta(diasAtraso: number) { return 0; }
}

export class Empleado extends Usuario {
  getMaxLibros() { return Infinity; }
  getPeriodoPrestamo() { return 60; }
  puedePedirPrestado() { return true; }
  calcularMulta(diasAtraso: number) { return 0; }
}

export class Visitante extends Usuario {
  getMaxLibros() { return 0; }
  getPeriodoPrestamo() { return 0; }
  puedePedirPrestado() { return false; }
  calcularMulta(diasAtraso: number) { return 0; }
}