export abstract class Usuario {
    constructor(public id: number, public nombre:string) {}

    abstract maxLibros(): number;
    abstract puedePedirPrestado(): boolean;
    abstract periodoPrestamo(): number; // en dias 
    abstract tieneMultas(): boolean; // algunos tipos no tienen multas
}

// Tipos de usuario s
export class SocioRegular extends Usuario {
    maxLibros(): number { return 3; }
    puedePedirPrestado() { return true; }
    periodoPrestamo() { return 14; }
    tieneMultas() { return true; } 
}

export class SocioVIP extends Usuario {
    maxLibros() { return 5; }
    puedePedirPrestado() { return true; }
    periodoPrestamo() { return 30; }
    tieneMultas() { return false; }
}

export class Empleado extends Usuario {
    maxLibros() { return Infinity; }
    puedePedirPrestado() { return true; }
    periodoPrestamo() { return 60; }
    tieneMultas() { return false; }
}

export class Visitante extends Usuario {
    maxLibros() { return 0; }
    puedePedirPrestado() { return false; }
    periodoPrestamo() { return 0; }
    tieneMultas() { return false; }
}
    