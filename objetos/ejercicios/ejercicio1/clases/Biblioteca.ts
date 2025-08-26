import { Autor } from "./Autor";
import { Libro } from "./Libro";
import { Socio } from "./Socio";
import { EventoBiblioteca } from "./EventoBiblioteca";

class Biblioteca {
  private inventario: Libro[] = [];
  private socios: Socio[] = [];
  private eventos: EventoBiblioteca[] = [];
  private DURACION = 14;

  // Funciones de libros
  agregarLibro(titulo: string, autor: Autor, isbn: string): Libro {
    const libroCreado = new Libro(titulo, autor, isbn);
    this.inventario.push(libroCreado);
    return libroCreado;
  }

  buscarLibro(isbn: string): Libro | null {
    // return this.inventario.find(libro => libro.isbn === isbn) ?? null;
    const libroEncontrado = this.inventario.find(
      (libro) => libro.isbn === isbn
    );
    if (libroEncontrado) {
      return libroEncontrado;
    }
    return null;
  }

  // Funciones de socios
  registrarSocio(id: number, nombre: string, apellido: string): Socio {
    const socioCreado = new Socio(id, nombre, apellido);
    this.socios.push(socioCreado);
    return socioCreado;
  }

  buscarSocio(id: number): Socio | null {
    return this.socios.find((socio) => socio.id === id) ?? null;
  }

  retirarLibro(socioId: number, libroISBN: string): void {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }
    // fijarse si esta disponible
    for (const socio of this.socios) {
      if (socio.tienePrestadoLibro(libro)) {
        throw new Error("Libro no esta disponible");
      }
    }
    if (socio.multaPorNoDevolverElLibro()>0){
      throw new Error("No puede retirar libros hasta pagar la multa");
    }

    socio.retirar(libro, this.DURACION);
  }
  reservarLibro(socioId: number, libroISBN: string) {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);
    if (!socio || !libro) {
      throw new Error("No se encontro");
    }
    libro.reservar(socio);
  }

  devolverLibro(socioId: number, libroISBN: string) {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }

    socio.devolver(libro);
    for(const _socia of libro.reservasSocios){
      console.log(`El libro "${libro.titulo}" de ${libro.autor} está disponible para ti.`); 
    }

  }

  buscarLibrosAutor(autor:Autor): Libro[] {
    return this.inventario.filter(libro => libro.autor === autor);
  }  
  
  recomendarLibroAutor(socio:Socio): Libro[] {
    const _recomendaciones:Libro[]=[];
    for (const _autor of socio.autoresHistorial()){
      const _p=this.inventario.filter((p) => p.autor.nombre === _autor.nombre) ?? null
      _recomendaciones.push(..._p);
    }
    return _recomendaciones;
  }
  recomendarLibrosTitulosSimilares(socio:Socio):Libro[]{
    const _recomendaciones:Libro[]=[];
    const palabras: string[]=[]
    for (const _titulo of socio.titulosInventario()){
      palabras.push(..._titulo.split(" ").filter(p=>p.length>4));
    }
    for (const palabra of palabras){
      const libros=this.inventario.filter(p=>p.titulo.includes(palabra));
      for(const libro of libros){
        if(_recomendaciones.find(p=>p.titulo==libro.titulo)){
          continue;
        }
        _recomendaciones.push(libro);
      }
    }
    return _recomendaciones;
  }

  notificarEventosProximos(socio:Socio){
    for (const evento of this.eventos){
      evento.EnviarNotificaciones(socio);
    }
  }

  AñadirEvento(eventoDescripcion:string, nombre:string):EventoBiblioteca{
    const eventoCreado=new EventoBiblioteca(eventoDescripcion,nombre);
    this.eventos.push(eventoCreado);
    return eventoCreado;
  }

}

export const biblioteca = new Biblioteca();
export type { Biblioteca };
