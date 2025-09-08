import { Socio } from "./Socio";
import { Libro } from "./Libro";

export interface PoliticaPrestamo {
  puedePrestar(socio: Socio, libro: Libro): boolean;
  getDuracionPrestamo(socio: Socio, libro: Libro): number;
}

export class PoliticaEstricta implements PoliticaPrestamo {
  puedePrestar(socio: Socio, libro: Libro): boolean {
    //si hay libros vencidos no permite que se presten
    return !socio.tienesPrestamosVencidos();
  }

  getDuracionPrestamo(socio: Socio, libro: Libro): number {
    return socio.getDuracionPrestamo();
  }
}

export class PoliticaFlexible implements PoliticaPrestamo {
  puedePrestar(socio: Socio, libro: Libro): boolean {
    return true //si permite prestamos
  }

  getDuracionPrestamo(socio: Socio, libro: Libro): number {
    const duracionBase = socio.getDuracionPrestamo();
    //Se reduce si hay bencidos algun prestamo
    return socio.tienesPrestamosVencidos() ? duracionBase - 7 : duracionBase;
  }
}

//de estudoante
export class PoliticaEstudiante implements PoliticaPrestamo {
  puedePrestar(socio: Socio, libro: Libro): boolean {
    return true;
  }

  getDuracionPrestamo(socio: Socio, libro: Libro): number {
    //se de mas chance en examenes
    const esEpocaExamen = this.esEpocaExamenes();
    const duracionBase = socio.getDuracionPrestamo();
    // let duracionFinal = duracionBase;
    return esEpocaExamen ? duracionBase + 14 : duracionBase; //Hace que la duracion sea mayor en examenes
  }

  private esEpocaExamenes(): boolean {
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth();
    let esExamen = false;
    if (mesActual === 6 || mesActual === 11)//meses de julio y o dic 
    {
      esExamen = true;
    }
    return esExamen;
  }
}

export class PoliticaDocente implements PoliticaPrestamo {
  puedePrestar(socio: Socio, libro: Libro): boolean {
    return true;
  }
  getDuracionPrestamo(socio: Socio, libro: Libro): number {
    const duracionBase = socio.getDuracionPrestamo();
    return duracionBase + 30;
  }
}


