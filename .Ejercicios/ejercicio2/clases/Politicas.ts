import { IPoliticaPrestamo} from "../interfaces/IPoliticaPrestamo";
import { Socio } from "./Socio";
import { Libro } from "./Libro";
import { Prestamo, PrestamoBase, PrestamoFactory, TipoPrestamo } from "./PrestamoBase";

export class PoliticaEstricta implements IPoliticaPrestamo {
    generarPrestamo(socio: Socio, libro: Libro, tipo?: TipoPrestamo): PrestamoBase | null {
        const prestamos = socio.getPrestamos;
        for (const p of prestamos){
            if (p.diasRetraso() > 0) throw new Error("No puede retirar libros, tiene prestamos vencidos");
        }
        if (tipo) return PrestamoFactory.crearPrestamo(tipo, libro, socio);
        return new Prestamo(libro, socio);
    }
}

export class PoliticaFlexible implements IPoliticaPrestamo {
    generarPrestamo(socio: Socio, libro: Libro, tipo?: TipoPrestamo): PrestamoBase | null {
        const prestamos = socio.getPrestamos;
        for (const p of prestamos){
            if (p.diasRetraso() > 0) {
                if (tipo) return PrestamoFactory.crearPrestamo(TipoPrestamo.CORTO, libro, socio);
                const prestamo = new Prestamo(libro, socio);
                prestamo.getFechaVencimiento().setDate(new Date().getDate() + 7);
                return prestamo;
            }
        }
        if (tipo) return PrestamoFactory.crearPrestamo(tipo, libro, socio);
        return new Prestamo(libro, socio);
    }

}

export class PoliticaEstudiante implements IPoliticaPrestamo {
    generarPrestamo(socio: Socio, libro: Libro, tipo?: TipoPrestamo): PrestamoBase | null {
        const prestamos = socio.getPrestamos;
        for (const p of prestamos){
            if (p.diasRetraso() > 0) throw new Error("No puede retirar libros, tiene prestamos vencidos");
        }
        if (tipo) return PrestamoFactory.crearPrestamo(TipoPrestamo.LARGO, libro, socio);
        const prestamo = new Prestamo(libro, socio);
        prestamo.getFechaVencimiento().setDate(new Date().getDate() + 30);
        return prestamo;
    }
}

export class PoliticaDocente implements IPoliticaPrestamo {
    generarPrestamo(socio: Socio, libro: Libro, tipo?: TipoPrestamo): PrestamoBase | null {
        const prestamos = socio.getPrestamos;
        for (const p of prestamos){
            if (p.diasRetraso() > 0) {
                if (tipo) return PrestamoFactory.crearPrestamo(TipoPrestamo.REGULAR, libro, socio);
                const prestamo = new Prestamo(libro, socio);
                prestamo.getFechaVencimiento().setDate(new Date().getDate() + 14);
                return prestamo;
            }
        }
        if (tipo) return PrestamoFactory.crearPrestamo(TipoPrestamo.LARGO, libro, socio);
        const prestamo = new Prestamo(libro, socio);
        prestamo.getFechaVencimiento().setDate(new Date().getDate() + 30);
        return prestamo;
    }
}