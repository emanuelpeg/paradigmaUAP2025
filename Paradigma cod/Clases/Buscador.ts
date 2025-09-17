export interface IBuscable {
  buscarPor(criterio: string): string[];
  filtrar(condicion: (item: string) => boolean): string[];
}

// --- Implementaciones ---
export class CatalogoBiblioteca implements IBuscable {
  private libros = ["El Quijote", "Cien Años de Soledad", "1984"];
  buscarPor(criterio: string): string[] {
    return this.libros.filter(l => l.toLowerCase().includes(criterio.toLowerCase()));
  }
  filtrar(condicion: (item: string) => boolean): string[] {
    return this.libros.filter(condicion);
  }
}

export class BibliotecaDigital implements IBuscable {
  private ebooks = ["Python Básico", "Aprendiendo TypeScript", "Inteligencia Artificial"];
  buscarPor(criterio: string): string[] {
    return this.ebooks.filter(e => e.toLowerCase().includes(criterio.toLowerCase()));
  }
  filtrar(condicion: (item: string) => boolean): string[] {
    return this.ebooks.filter(condicion);
  }
}

export class ArchivoHistorico implements IBuscable {
  private docs = ["Acta 1810", "Constitución 1853"];
  buscarPor(criterio: string): string[] {
    return this.docs.filter(d => d.toLowerCase().includes(criterio.toLowerCase()));
  }
  filtrar(condicion: (item: string) => boolean): string[] {
    return this.docs.filter(condicion);
  }
}

export class BaseConocimiento implements IBuscable {
  private articulos = ["Artículo sobre Machine Learning", "Paper de Bases de Datos"];
  buscarPor(criterio: string): string[] {
    return this.articulos.filter(a => a.toLowerCase().includes(criterio.toLowerCase()));
  }
  filtrar(condicion: (item: string) => boolean): string[] {
    return this.articulos.filter(condicion);
  }
}

// --- Buscador Universal ---
export class BuscadorUniversal {
  private sistemas: IBuscable[] = [];

  agregarSistema(s: IBuscable) {
    this.sistemas.push(s);
  }

  buscarEnTodos(criterio: string): string[] {
    return this.sistemas.flatMap(s => s.buscarPor(criterio));
  }
}
let buscador = new BuscadorUniversal();
buscador.agregarSistema(new CatalogoBiblioteca());
buscador.agregarSistema(new BibliotecaDigital());
buscador.agregarSistema(new ArchivoHistorico());

console.log(buscador.buscarEnTodos("python"));
