"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoliticaDocente = exports.PoliticaEstudiante = exports.PoliticaFlexible = exports.PoliticaEstricta = void 0;
class PoliticaEstricta {
    nombre = "Estricta";
    puedePrestar(socio) {
        const tieneVencidos = socio.prestamos.some(p => {
            const v = p.calcularVencimiento();
            return v && +v < Date.now();
        });
        if (socio.deudaPendiente > 0)
            return { permitido: false, motivo: "Deuda pendiente" };
        if (tieneVencidos)
            return { permitido: false, motivo: "Libros vencidos" };
        return { permitido: true };
    }
}
exports.PoliticaEstricta = PoliticaEstricta;
class PoliticaFlexible {
    nombre = "Flexible";
    puedePrestar(socio) {
        const tieneVencidos = socio.prestamos.some(p => {
            const v = p.calcularVencimiento();
            return v && +v < Date.now();
        });
        if (tieneVencidos || socio.deudaPendiente > 0)
            return { permitido: true, diasExtra: -7 };
        return { permitido: true };
    }
}
exports.PoliticaFlexible = PoliticaFlexible;
class PoliticaEstudiante {
    nombre = "Estudiante";
    puedePrestar() { return { permitido: true, diasExtra: +7 }; }
}
exports.PoliticaEstudiante = PoliticaEstudiante;
class PoliticaDocente {
    nombre = "Docente";
    puedePrestar() { return { permitido: true, diasExtra: +14 }; }
}
exports.PoliticaDocente = PoliticaDocente;
