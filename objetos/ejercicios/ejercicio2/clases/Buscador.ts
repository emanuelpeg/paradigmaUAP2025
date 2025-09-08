import { Libro } from "./Libro";

export interface IBuscable {
  buscarPor(criterio: string): Libro[];
  filtrar(condicion: (libro: Libro) => boolean): Libro[];
}

export class CatalogoBiblioteca implements IBuscable {
  private libros: Libro[];

  constructor(libros: Libro[]) {
    this.libros = libros;
  }

  buscarPor(criterio: string): Libro[] {
    return this.libros.filter(libro =>
      libro.titulo.toLowerCase().includes(criterio.toLowerCase()) ||
      libro.autor.toLowerCase().includes(criterio.toLowerCase()) ||
      libro.isbn.includes(criterio)
    );
  }

  filtrar(condicion: (libro: Libro) => boolean): Libro[] {
    return this.libros.filter(condicion);
  }
}

export class BibliotecaDigital implements IBuscable {
  private recursosDigitales: Libro[] = [];

  buscarPor(criterio: string): Libro[] {
    return this.recursosDigitales.filter(libro =>
      libro.titulo.toLowerCase().includes(criterio.toLowerCase())
    );
  }

  filtrar(condicion: (libro: Libro) => boolean): Libro[] {
    return this.recursosDigitales.filter(condicion);
  }
}

export class ArchivoHistorico implements IBuscable {
  private documentosAntiguos: Libro[] = []; // Simulación

  buscarPor(criterio: string): Libro[] {
    return this.documentosAntiguos.filter(libro =>
      libro.titulo.toLowerCase().includes(criterio.toLowerCase()) ||
      libro.autor.toLowerCase().includes(criterio.toLowerCase())
    );
  }

  filtrar(condicion: (libro: Libro) => boolean): Libro[] {
    return this.documentosAntiguos.filter(condicion);
  }
}

export class BaseConocimiento implements IBuscable {
  private articulosAcademicos: Libro[] = []; // Simulación

  buscarPor(criterio: string): Libro[] {
    return this.articulosAcademicos.filter(libro =>
      libro.titulo.toLowerCase().includes(criterio.toLowerCase()) ||
      libro.autor.toLowerCase().includes(criterio.toLowerCase())
    );
  }

  filtrar(condicion: (libro: Libro) => boolean): Libro[] {
    return this.articulosAcademicos.filter(condicion);
  }
}

export class BuscadorUniversal {
  private sistemas: IBuscable[] = [];

  agregarSistema(sistema: IBuscable): void {
    this.sistemas.push(sistema);
  }

  buscarEnTodos(criterio: string): Libro[] {
    const resultados: Libro[] = [];
    this.sistemas.forEach(sistema => {
      resultados.push(...sistema.buscarPor(criterio));
    });
    return resultados;
  }

  filtrarEnTodos(condicion: (libro: Libro) => boolean): Libro[] {
    const resultados: Libro[] = [];
    this.sistemas.forEach(sistema => {
      resultados.push(...sistema.filtrar(condicion));
    });
    return resultados;
  }
}

