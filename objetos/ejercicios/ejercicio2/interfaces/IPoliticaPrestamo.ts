
import { Socio } from "../clases/Socio";
import { Libro } from "../clases/Libro";
import { Prestamo } from "../clases/Prestamo";

function esEpocaExamenes(): boolean {
  const hoy = new Date();
  const mes = hoy.getMonth() + 1;
  const dia = hoy.getDate();

  // Exámenes del 1 al 20 de junio
  if (mes === 6 && dia >= 1 && dia <= 20) return true;
  // Exámenes del 10 al 30 de noviembre
  if (mes === 11 && dia >= 10 && dia <= 30) return true;

  return false;
}

interface IPoliticaPrestamo
{
 puedePedirPrestamo(socio: Socio, libro: Libro): boolean;
  getDuracionPrestamo(socio: Socio, libro: Libro): number;
  puedeRenovarPrestamo(socio: Socio, libro: Libro, renovacionesActuales: number): boolean;
}


class PoliticaPrestamoRegular implements IPoliticaPrestamo {
  puedePedirPrestamo(socio: Socio, libro: Libro): boolean {
    
    return true;
  }

  getDuracionPrestamo(socio: Socio, libro: Libro): number {
    
    return socio.getDuracionPrestamo();
  }
  puedeRenovarPrestamo(socio: Socio, libro: Libro, renovacionesActuales: number): boolean {
    return false; // No permite renovaciones
  }
}




  class PoliticaEstricta implements IPoliticaPrestamo {
    puedePedirPrestamo(socio: Socio, libro: Libro): boolean {
      return !(socio as any).tieneLibrosVencidos ? true : !(socio as any).tieneLibrosVencidos();
    }
    getDuracionPrestamo(socio: Socio, libro: Libro): number {
      return socio.getDuracionPrestamo();
    }
    puedeRenovarPrestamo(socio: Socio, libro: Libro, renovacionesActuales: number): boolean {
    return false; // No permite renovaciones
  }
}
  

  
    class PoliticaFlexible implements IPoliticaPrestamo {
        puedePedirPrestamo(socio: Socio, libro: Libro): boolean {
        return true;
    }
        getDuracionPrestamo(socio: Socio, libro: Libro): number {
      // Si tiene libros vencidos, duración reducida (ejemplo: 7 días)
        if ((socio as any).tieneLibrosVencidos && (socio as any).tieneLibrosVencidos()) {
            return 7;
      }
      return socio.getDuracionPrestamo();
    }
    puedeRenovarPrestamo(socio: Socio, libro: Libro, renovacionesActuales: number): boolean {
    return false; // No permite renovaciones
  }
}

    class PoliticaEstudiante implements IPoliticaPrestamo {
        getDuracionPrestamo(socio: Socio, libro: Libro): number {
        if (esEpocaExamenes()) {
        return 28;
    }
        return socio.getDuracionPrestamo();
    }
        puedePedirPrestamo(socio: Socio, libro: Libro): boolean {
        return true;
    }
    puedeRenovarPrestamo(socio: Socio, libro: Libro, renovacionesActuales: number): boolean {
    return false; // No permite renovaciones
  }
}


class PoliticaDocente implements IPoliticaPrestamo {
  puedePedirPrestamo(socio: Socio, libro: Libro): boolean {
    return true;
  }
  getDuracionPrestamo(socio: Socio, libro: Libro): number {
    return 35;
  }
  puedeRenovarPrestamo(socio: Socio, libro: Libro, renovacionesActuales: number): boolean {
    
    return renovacionesActuales < 10; //El docente puede renovar 10 veces
}
}
    

export {IPoliticaPrestamo, PoliticaEstricta, PoliticaFlexible, PoliticaPrestamoRegular};
