// Politica.ts
import { Socio } from "./Socio";
import { Libro } from "./Libro";
import { Biblioteca } from "./Biblioteca";

export interface IPoliticaPrestamo {
  puedeRetirar(socio: Socio, libro: Libro, biblioteca: Biblioteca): boolean;
  calcularDuracion(socio: Socio, libro: Libro): number; // devuelve duración en días
}
// Politica.ts (continúa)

export class PoliticaEstricta implements IPoliticaPrestamo {
  puedeRetirar(socio: Socio, libro: Libro, biblioteca: Biblioteca): boolean {
    // No permite retirar si hay multas activas o libros vencidos
    const multasPendientes = biblioteca.getMultasPendientes(socio.id);
    return multasPendientes.length === 0 && socio.librosEnPrestamo === 0;
  }

  calcularDuracion(socio: Socio, libro: Libro): number {
    return socio.getDuracionPrestamo();
  }
}

export class PoliticaFlexible implements IPoliticaPrestamo {
  puedeRetirar(socio: Socio, libro: Libro, biblioteca: Biblioteca): boolean {
    // Permite retirar aunque tenga multas, siempre que no exceda máximo de libros
    return socio.puedeRetirar(libro);
  }

  calcularDuracion(socio: Socio, libro: Libro): number {
    // Reduce la duración a la mitad si tiene libros en préstamo
    return socio.librosEnPrestamo > 0
      ? Math.floor(socio.getDuracionPrestamo() / 2)
      : socio.getDuracionPrestamo();
  }
}

export class PoliticaEstudiante implements IPoliticaPrestamo {
  puedeRetirar(socio: Socio, libro: Libro, biblioteca: Biblioteca): boolean {
    return socio.puedeRetirar(libro);
  }

  calcularDuracion(socio: Socio, libro: Libro): number {
    // Extiende el préstamo en 7 días durante época de exámenes
    const duracionBase = socio.getDuracionPrestamo();
    const hoy = new Date();
    const mes = hoy.getMonth() + 1; // Enero = 1
    const enExamenes = mes === 6 || mes === 12; // ejemplo: junio y diciembre
    return enExamenes ? duracionBase + 7 : duracionBase;
  }
}

export class PoliticaDocente implements IPoliticaPrestamo {
  puedeRetirar(socio: Socio, libro: Libro, biblioteca: Biblioteca): boolean {
    // Siempre puede retirar, sin límite
    return true;
  }

  calcularDuracion(socio: Socio, libro: Libro): number {
    return socio.getDuracionPrestamo() * 2; // duración doble
  }
}


