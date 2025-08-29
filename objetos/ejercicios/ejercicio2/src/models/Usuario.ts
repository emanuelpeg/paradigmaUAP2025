abstract class Usuario {
    constructor(
        protected nombre: string,
        protected id: string,
        protected email: string
    ) {}

    abstract puedePrestarLibros(): boolean;
    abstract getMaxLibros(): number;
    abstract puedeAccederReferencia(): boolean;

    getId(): string {
        return this.id;
    }
}

class SocioRegular extends Usuario {
    puedePrestarLibros(): boolean {
        return true;
    }

    getMaxLibros(): number {
        return 3;
    }

    puedeAccederReferencia(): boolean {
        return false;
    }
}

class SocioVIP extends Usuario {
    puedePrestarLibros(): boolean {
        return true;
    }

    getMaxLibros(): number {
        return 5;
    }

    puedeAccederReferencia(): boolean {
        return false;
    }
}

class Empleado extends Usuario {
    puedePrestarLibros(): boolean {
        return true;
    }

    getMaxLibros(): number {
        return Number.MAX_SAFE_INTEGER;
    }

    puedeAccederReferencia(): boolean {
        return true;
    }
}

class Visitante extends Usuario {
    puedePrestarLibros(): boolean {
        return false;
    }

    getMaxLibros(): number {
        return 0;
    }

    puedeAccederReferencia(): boolean {
        return false;
    }
}

export { Usuario, SocioRegular, SocioVIP, Empleado, Visitante };
