export interface IBuscable<T = any> {
  buscarPor(criterio: string): T[];
  filtrar(condicion: (item: T) => boolean): T[];
}

// Simples implementaciones de demo
export class CatalogoBiblioteca implements IBuscable<{ titulo: string; autor: string; isbn: string }> {
  constructor(private items: { titulo: string; autor: string; isbn: string }[]) {}
  buscarPor(criterio: string) {
    const c = criterio.toLowerCase();
    return this.items.filter(i => i.titulo.toLowerCase().includes(c) || i.autor.toLowerCase().includes(c) || i.isbn.includes(criterio));
  }
  filtrar(condicion: (item: { titulo: string; autor: string; isbn: string }) => boolean) {
    return this.items.filter(condicion);
  }
}

export class BibliotecaDigital implements IBuscable<{ titulo: string; url: string; tema: string }> {
  constructor(private recursos: { titulo: string; url: string; tema: string }[]) {}
  buscarPor(criterio: string) {
    const c = criterio.toLowerCase();
    return this.recursos.filter(r => r.titulo.toLowerCase().includes(c) || r.tema.toLowerCase().includes(c) || r.url.toLowerCase().includes(c));
  }
  filtrar(condicion: (r: { titulo: string; url: string; tema: string }) => boolean) {
    return this.recursos.filter(condicion);
  }
}

export class ArchivoHistorico implements IBuscable<{ titulo: string; anio: number; descripcion: string }> {
  constructor(private docs: { titulo: string; anio: number; descripcion: string }[]) {}
  buscarPor(criterio: string) {
    const c = criterio.toLowerCase();
    return this.docs.filter(d => d.titulo.toLowerCase().includes(c) || d.descripcion.toLowerCase().includes(c) || String(d.anio) === criterio);
  }
  filtrar(condicion: (d: { titulo: string; anio: number; descripcion: string }) => boolean) {
    return this.docs.filter(condicion);
  }
}

export class BaseConocimiento implements IBuscable<{ titulo: string; autores: string[]; doi: string }> {
  constructor(private articulos: { titulo: string; autores: string[]; doi: string }[]) {}
  buscarPor(criterio: string) {
    const c = criterio.toLowerCase();
    return this.articulos.filter(a => a.titulo.toLowerCase().includes(c) || a.doi.toLowerCase().includes(c) || a.autores.some(x => x.toLowerCase().includes(c)));
  }
  filtrar(condicion: (a: { titulo: string; autores: string[]; doi: string }) => boolean) {
    return this.articulos.filter(condicion);
  }
}

export class BuscadorUniversal {
  constructor(private fuentes: IBuscable[]) {}
  agregarFuente(f: IBuscable) {
    this.fuentes.push(f);
  }
  buscarPor(criterio: string) {
    return this.fuentes.flatMap(f => f.buscarPor(criterio));
  }
  filtrar<T>(condicion: (item: T) => boolean) {
    return this.fuentes.flatMap(f => f.filtrar(condicion as any));
  }
}
