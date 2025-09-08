import { Socio } from "./socio";
import { Libro } from "./Libro";
import { Transaccion } from "./prestamo";

export interface IPoliticaTransaccion {
    esTransaccionPermitida(socio: Socio, libro: Libro): boolean;
}

export class PoliticaRigida implements IPoliticaTransaccion {
    esTransaccionPermitida(socio: Socio, libro: Libro): boolean {
        if (socio.tieneLibrosVencidos()) {
            return false;
        }
        return socio.puedeRetirar(libro);
    }
}

export class PoliticaRelajada implements IPoliticaTransaccion {
    esTransaccionPermitida(socio: Socio, libro: Libro): boolean {
        return socio.puedeRetirar(libro);
    }
}

export class PoliticaAcademica implements IPoliticaTransaccion {
    esTransaccionPermitida(socio: Socio, libro: Libro): boolean {
        return socio.puedeRetirar(libro);
    }
}

export class PoliticaInstitucional implements IPoliticaTransaccion {
    esTransaccionPermitida(socio: Socio, libro: Libro): boolean {
        return socio.puedeRetirar(libro);
    }
}