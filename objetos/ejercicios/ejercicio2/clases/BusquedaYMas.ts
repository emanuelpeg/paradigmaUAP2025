import { Libro } from "./Libro";


export interface IBuscable {
  buscarPor(criterio: string): Libro[]; // devuelve lista de resultados
  filtrar(condicion: (libro: Libro) => boolean): Libro[];
}


export class CatalogoBiblioteca implements IBuscable {
  constructor(private inventario: Libro[]) {}

  buscarPor(criterio: string): Libro[] {
    return this.inventario.filter(
      libro =>
        libro.titulo.toLowerCase().includes(criterio.toLowerCase()) ||
        libro.autor.toLowerCase().includes(criterio.toLowerCase())
    );
  }

  filtrar(condicion: (libro: Libro) => boolean): Libro[] {
    return this.inventario.filter(condicion);
  }
}

export class BibliotecaDigital implements IBuscable {
  constructor(private recursosDigitales: Libro[]) {}

  buscarPor(criterio: string): Libro[] {
    return this.recursosDigitales.filter(
      recurso =>
        recurso.titulo.toLowerCase().includes(criterio.toLowerCase()) ||
        recurso.autor.toLowerCase().includes(criterio.toLowerCase())
    );
  }

  filtrar(condicion: (libro: Libro) => boolean): Libro[] {
    return this.recursosDigitales.filter(condicion);
  }
}

export class ArchivoHistorico implements IBuscable {
  constructor(private documentosHistoricos: Libro[]) {}

  buscarPor(criterio: string): Libro[] {
    return this.documentosHistoricos.filter(
      doc =>
        doc.titulo.toLowerCase().includes(criterio.toLowerCase()) ||
        doc.autor.toLowerCase().includes(criterio.toLowerCase())
    );
  }

  filtrar(condicion: (libro: Libro) => boolean): Libro[] {
    return this.documentosHistoricos.filter(condicion);
  }
}

export class BaseConocimiento implements IBuscable {
  constructor(private articulosAcademicos: Libro[]) {}

  buscarPor(criterio: string): Libro[] {
    return this.articulosAcademicos.filter(
      art =>
        art.titulo.toLowerCase().includes(criterio.toLowerCase()) ||
        art.autor.toLowerCase().includes(criterio.toLowerCase())
    );
  }

  filtrar(condicion: (libro: Libro) => boolean): Libro[] {
    return this.articulosAcademicos.filter(condicion);
  }
}


export class BuscadorUniversal {
  buscar(criterio: string, sistemas: IBuscable[]): Libro[] {
    let resultados: Libro[] = [];
    sistemas.forEach(sistema => {
      resultados.push(...sistema.buscarPor(criterio));
    });
    return resultados;
  }

  filtrar(condicion: (libro: Libro) => boolean, sistemas: IBuscable[]): Libro[] {
    let resultados: Libro[] = [];
    sistemas.forEach(sistema => {
      resultados.push(...sistema.filtrar(condicion));
    });
    return resultados;
  }
}