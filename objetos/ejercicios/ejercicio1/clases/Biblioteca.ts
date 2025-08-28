import { Libro } from "./Libro";
import { Socio } from "./Socio";
import { Autor } from "./Autor";

export class Biblioteca {
  private _inventario: Libro[] = [];
  private _socios: Socio[] = [];
  private _autores: Autor[] = [];
  private _duracion = 14;

  public get inventario(): Libro[] {
    return [...this._inventario];
  }
  public get socios(): Socio[] {
    return [...this._socios];
  }
  public get autores(): Autor[] {
    return [...this._autores];
  }
  public get duracion(): number {
    return this._duracion;
  }


  agregarLibro(titulo: string, autor: string, isbn: string): Libro {
    // Buscar o crear el autor
  let autorObj = this._autores.find(a => a.nombre === autor);
    if (!autorObj) {
      autorObj = new Autor(autor, '', 0);
      this._autores.push(autorObj);
    }
    const libroCreado = new Libro(titulo, autorObj, isbn);
    this._inventario.push(libroCreado);
    return libroCreado;
  }

  buscarLibro(isbn: string): Libro | null {
  const libroEncontrado = this._inventario.find(
      (libro) => libro.isbn === isbn
    );
    if (libroEncontrado) {
      return libroEncontrado;
    }
    return null;
  }

    librosPorAutor(nombreAutor: string): Libro[] {
  return this._inventario.filter(l => l.autor && l.autor.nombre === nombreAutor);
    }


  
  registrarSocio(id: number, nombre: string, apellido: string): Socio {
  const socioCreado = new Socio(id, nombre, apellido);
  this._socios.push(socioCreado);
    return socioCreado;
  }

  buscarSocio(id: number): Socio | null {
  return this._socios.find((socio) => socio.id === id) ?? null;
  }

  retirarLibro(socioId: number, libroISBN: string): void {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }
    // fijarse si esta disponible
    for (const s of this._socios) {
      if (s.tienePrestadoLibro(libro)) {
        throw new Error("Libro no esta disponible");
      }
    }

  socio.retirar(libro, this._duracion);
  }

  devolverLibro(socioId: number, libroISBN: string) {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }

    socio.devolver(libro);
  }
}

