import { Libro } from "./Libro";
import { Socio, SocioFactory, TipoSocio, Prestamo } from "./Socio";

export interface PoliticaPrestamo {
  permitirPrestamo(socio: Socio): boolean;
}

export class PoliticaEstricta implements PoliticaPrestamo {
  permitirPrestamo(socio: Socio): boolean {
    return socio.librosEnPrestamo === 0;
  }
}

export class PoliticaFlexible implements PoliticaPrestamo {
  permitirPrestamo(socio: Socio): boolean {
    return true;
  }
}

export interface IBuscable<T> {
  buscarPor(criterio: (t: T) => boolean): T[];
  filtrar(condicion: (t: T) => boolean): T[];
}

export class CatalogoBiblioteca implements IBuscable<Libro> {
  constructor(private libros: Libro[]) {}
  buscarPor(criterio: (l: Libro) => boolean): Libro[] {
    return this.libros.filter(criterio);
  }
  filtrar(condicion: (l: Libro) => boolean): Libro[] {
    return this.libros.filter(condicion);
  }
}

export class BuscadorUniversal {
  constructor(private buscadores: IBuscable<any>[]) {}
  buscar<T>(criterio: (t: T) => boolean): T[] {
    const resultados: T[] = [];
    const vistos = new Set<string>();
    for (const b of this.buscadores) {
      const encontrados: T[] = (b.buscarPor as any)(criterio) || [];
      for (const item of encontrados) {
        const key = item && (item as any).isbn ? (item as any).isbn : JSON.stringify(item);
        if (!vistos.has(key)) {
          vistos.add(key);
          resultados.push(item);
        }
      }
    }
    return resultados;
  }
}

class Biblioteca {
  private inventario: Libro[] = [];
  private socios: Socio[] = [];
  private politica: PoliticaPrestamo = new PoliticaFlexible();
  public catalogo = new CatalogoBiblioteca(this.inventario);
  public buscador: BuscadorUniversal = new BuscadorUniversal([this.catalogo]);

  agregarLibro(titulo: string, autor: string, isbn: string): Libro {
    const libroCreado = new Libro(titulo, autor, isbn);
    this.inventario.push(libroCreado);
    return libroCreado;
  }

  buscarLibro(isbn: string): Libro | null {
    const libroEncontrado = this.inventario.find((libro) => libro.isbn === isbn);
    return libroEncontrado ?? null;
  }

  registrarSocio(tipo: TipoSocio, id: number, nombre: string, apellido: string): Socio {
    const socioCreado = SocioFactory.crearSocio(tipo, id, nombre, apellido);
    this.socios.push(socioCreado);
    return socioCreado;
  }

  buscarSocio(id: number): Socio | null {
    return this.socios.find((socio) => socio.id === id) ?? null;
  }

  setPolitica(p: PoliticaPrestamo) {
    this.politica = p;
  }

  retirarLibro(socioId: number, libroISBN: string): void {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }

    if (!this.politica.permitirPrestamo(socio)) throw new Error("Política no permite préstamo");

    for (const s of this.socios) {
      if (s.tienePrestadoLibro(libro)) {
        throw new Error("Libro no esta disponible");
      }
    }

    socio.retirar(libro);
  }

  devolverLibro(socioId: number, libroISBN: string) {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }

    return socio.devolver(libro);
  }
}

export const biblioteca = new Biblioteca();
export type { Biblioteca };
