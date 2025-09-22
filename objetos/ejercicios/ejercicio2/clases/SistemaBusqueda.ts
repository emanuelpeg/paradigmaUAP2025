import { Libro } from "./Libro";

// Interfaz para sistemas buscables
export interface IBuscable {
  buscarPor(criterio: string): any[];
  filtrar(condicion: (item: any) => boolean): any[];
}

// Resultado de búsqueda genérico
export interface ResultadoBusqueda {
  titulo: string;
  descripcion: string;
  tipo: string;
  relevancia: number;
}

// Catálogo de biblioteca - busca en libros físicos
export class CatalogoBiblioteca implements IBuscable {
  private libros: Libro[] = [];

  public agregarLibro(libro: Libro): void {
    this.libros.push(libro);
  }

  public buscarPor(criterio: string): ResultadoBusqueda[] {
    const criterioLower = criterio.toLowerCase();
    return this.libros
      .filter(libro => 
        libro.titulo.toLowerCase().includes(criterioLower) ||
        libro.autor.toLowerCase().includes(criterioLower) ||
        libro.isbn.includes(criterio)
      )
      .map(libro => ({
        titulo: libro.titulo,
        descripcion: `Autor: ${libro.autor} | ISBN: ${libro.isbn}`,
        tipo: "Libro Físico",
        relevancia: this.calcularRelevancia(libro, criterio)
      }))
      .sort((a, b) => b.relevancia - a.relevancia);
  }

  public filtrar(condicion: (libro: Libro) => boolean): ResultadoBusqueda[] {
    return this.libros
      .filter(condicion)
      .map(libro => ({
        titulo: libro.titulo,
        descripcion: `Autor: ${libro.autor} | ISBN: ${libro.isbn}`,
        tipo: "Libro Físico",
        relevancia: 1
      }));
  }

  private calcularRelevancia(libro: Libro, criterio: string): number {
    let relevancia = 0;
    const criterioLower = criterio.toLowerCase();
    
    if (libro.titulo.toLowerCase().includes(criterioLower)) relevancia += 3;
    if (libro.autor.toLowerCase().includes(criterioLower)) relevancia += 2;
    if (libro.isbn.includes(criterio)) relevancia += 1;
    
    return relevancia;
  }

  public getLibros(): Libro[] {
    return [...this.libros];
  }
}

// Biblioteca digital - busca en recursos online
export class BibliotecaDigital implements IBuscable {
  private recursosDigitales: RecursoDigital[] = [];

  public agregarRecurso(recurso: RecursoDigital): void {
    this.recursosDigitales.push(recurso);
  }

  public buscarPor(criterio: string): ResultadoBusqueda[] {
    const criterioLower = criterio.toLowerCase();
    return this.recursosDigitales
      .filter(recurso => 
        recurso.titulo.toLowerCase().includes(criterioLower) ||
        recurso.palabrasClave.some(palabra => palabra.toLowerCase().includes(criterioLower))
      )
      .map(recurso => ({
        titulo: recurso.titulo,
        descripcion: `Formato: ${recurso.formato} | URL: ${recurso.url}`,
        tipo: "Recurso Digital",
        relevancia: this.calcularRelevancia(recurso, criterio)
      }))
      .sort((a, b) => b.relevancia - a.relevancia);
  }

  public filtrar(condicion: (recurso: RecursoDigital) => boolean): ResultadoBusqueda[] {
    return this.recursosDigitales
      .filter(condicion)
      .map(recurso => ({
        titulo: recurso.titulo,
        descripcion: `Formato: ${recurso.formato} | URL: ${recurso.url}`,
        tipo: "Recurso Digital",
        relevancia: 1
      }));
  }

  private calcularRelevancia(recurso: RecursoDigital, criterio: string): number {
    let relevancia = 0;
    const criterioLower = criterio.toLowerCase();
    
    if (recurso.titulo.toLowerCase().includes(criterioLower)) relevancia += 3;
    relevancia += recurso.palabrasClave.filter(palabra => 
      palabra.toLowerCase().includes(criterioLower)
    ).length;
    
    return relevancia;
  }
}

// Archivo histórico - busca en documentos antiguos
export class ArchivoHistorico implements IBuscable {
  private documentosHistoricos: DocumentoHistorico[] = [];

  public agregarDocumento(documento: DocumentoHistorico): void {
    this.documentosHistoricos.push(documento);
  }

  public buscarPor(criterio: string): ResultadoBusqueda[] {
    const criterioLower = criterio.toLowerCase();
    return this.documentosHistoricos
      .filter(doc => 
        doc.titulo.toLowerCase().includes(criterioLower) ||
        doc.periodo.toLowerCase().includes(criterioLower) ||
        doc.descripcion.toLowerCase().includes(criterioLower)
      )
      .map(doc => ({
        titulo: doc.titulo,
        descripcion: `Período: ${doc.periodo} | ${doc.descripcion}`,
        tipo: "Documento Histórico",
        relevancia: this.calcularRelevancia(doc, criterio)
      }))
      .sort((a, b) => b.relevancia - a.relevancia);
  }

  public filtrar(condicion: (doc: DocumentoHistorico) => boolean): ResultadoBusqueda[] {
    return this.documentosHistoricos
      .filter(condicion)
      .map(doc => ({
        titulo: doc.titulo,
        descripcion: `Período: ${doc.periodo} | ${doc.descripcion}`,
        tipo: "Documento Histórico",
        relevancia: 1
      }));
  }

  private calcularRelevancia(doc: DocumentoHistorico, criterio: string): number {
    let relevancia = 0;
    const criterioLower = criterio.toLowerCase();
    
    if (doc.titulo.toLowerCase().includes(criterioLower)) relevancia += 3;
    if (doc.periodo.toLowerCase().includes(criterioLower)) relevancia += 2;
    if (doc.descripcion.toLowerCase().includes(criterioLower)) relevancia += 1;
    
    return relevancia;
  }
}

// Base de conocimiento - busca en artículos académicos
export class BaseConocimiento implements IBuscable {
  private articulosAcademicos: ArticuloAcademico[] = [];

  public agregarArticulo(articulo: ArticuloAcademico): void {
    this.articulosAcademicos.push(articulo);
  }

  public buscarPor(criterio: string): ResultadoBusqueda[] {
    const criterioLower = criterio.toLowerCase();
    return this.articulosAcademicos
      .filter(articulo => 
        articulo.titulo.toLowerCase().includes(criterioLower) ||
        articulo.autores.some(autor => autor.toLowerCase().includes(criterioLower)) ||
        articulo.resumen.toLowerCase().includes(criterioLower) ||
        articulo.palabrasClave.some(palabra => palabra.toLowerCase().includes(criterioLower))
      )
      .map(articulo => ({
        titulo: articulo.titulo,
        descripcion: `Autores: ${articulo.autores.join(", ")} | Año: ${articulo.año}`,
        tipo: "Artículo Académico",
        relevancia: this.calcularRelevancia(articulo, criterio)
      }))
      .sort((a, b) => b.relevancia - a.relevancia);
  }

  public filtrar(condicion: (articulo: ArticuloAcademico) => boolean): ResultadoBusqueda[] {
    return this.articulosAcademicos
      .filter(condicion)
      .map(articulo => ({
        titulo: articulo.titulo,
        descripcion: `Autores: ${articulo.autores.join(", ")} | Año: ${articulo.año}`,
        tipo: "Artículo Académico",
        relevancia: 1
      }));
  }

  private calcularRelevancia(articulo: ArticuloAcademico, criterio: string): number {
    let relevancia = 0;
    const criterioLower = criterio.toLowerCase();
    
    if (articulo.titulo.toLowerCase().includes(criterioLower)) relevancia += 4;
    if (articulo.resumen.toLowerCase().includes(criterioLower)) relevancia += 2;
    relevancia += articulo.autores.filter(autor => 
      autor.toLowerCase().includes(criterioLower)
    ).length;
    relevancia += articulo.palabrasClave.filter(palabra => 
      palabra.toLowerCase().includes(criterioLower)
    ).length;
    
    return relevancia;
  }
}

// Buscador universal que puede buscar en cualquier sistema IBuscable
export class BuscadorUniversal {
  private sistemas: IBuscable[] = [];

  public agregarSistema(sistema: IBuscable): void {
    this.sistemas.push(sistema);
  }

  public buscarEnTodos(criterio: string): ResultadoBusqueda[] {
    const resultados: ResultadoBusqueda[] = [];
    
    for (const sistema of this.sistemas) {
      resultados.push(...sistema.buscarPor(criterio));
    }
    
    return resultados.sort((a, b) => b.relevancia - a.relevancia);
  }

  public filtrarEnTodos(condicion: (item: any) => boolean): ResultadoBusqueda[] {
    const resultados: ResultadoBusqueda[] = [];
    
    for (const sistema of this.sistemas) {
      resultados.push(...sistema.filtrar(condicion));
    }
    
    return resultados;
  }
}

// Clases de apoyo para los diferentes tipos de recursos
export class RecursoDigital {
  constructor(
    public titulo: string,
    public formato: string,
    public url: string,
    public palabrasClave: string[]
  ) {}
}

export class DocumentoHistorico {
  constructor(
    public titulo: string,
    public periodo: string,
    public descripcion: string
  ) {}
}

export class ArticuloAcademico {
  constructor(
    public titulo: string,
    public autores: string[],
    public año: number,
    public resumen: string,
    public palabrasClave: string[]
  ) {}
}
