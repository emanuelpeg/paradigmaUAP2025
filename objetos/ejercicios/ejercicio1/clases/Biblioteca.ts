import { Libro, Autor } from "./Libro";
import { Socio} from "./Socio";
import { EventoBiblioteca } from "./EventoBiblioteca";



class Biblioteca {
  private reservas: Map <Libro, Socio[]> = new Map();
  private inventario: Libro[] = [];
  private autores: Autor[] = [];
  private socios: Socio[] = [];
  private DURACION = 14;

  agregarAutor(nombre:string, apellido: string, fechaNacimiento: Date, biblio: string): void {
    const autor = new Autor(nombre, apellido, fechaNacimiento, biblio);
    this.autores.push(autor);
  }
  // Funciones de libros
  agregarLibro(titulo: string, autor: string, isbn: string): Libro {
    let autorObj = this.buscarAutor(autor);
    if (!autorObj) {
      const [nombre, apellido] = autor.split(" ");
      autorObj = new Autor(nombre, apellido, new Date(), "");
      this.autores.push(autorObj);
      }   
    const libroCreado = new Libro(titulo, autorObj, isbn);
    this.inventario.push(libroCreado);
    return libroCreado;
  }
  buscarAutor(nombreApellido: string): Autor | null {
    const [nombre, apellido] = nombreApellido.split(" ");
    const autorEncontrado = this.autores.find(
      (autor) => autor.nombre === nombre && autor.apellido === apellido
    );
    if (autorEncontrado) {
      return autorEncontrado;
    }
    return null;
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

    if (!socio || !libro ) {
      console.log("No se encontro");
      return;
    }
    if (socio.calcularMulta() > 0){
      console.log("No puede retirar libros hasta pagar su multa");
      return;
    }
    // fijarse si esta disponible
    for (const s of this.socios) {
      if (s.tienePrestadoLibro(libro)) {
        if (!this.reservas.has(libro)) {
          this.reservas.set(libro, [socio]);
        } else {
          this.reservas.get(libro)!.push(socio);}
        console.log("Libro no esta disponible. Se ha agregado a reservas");
        return;
      }
    }
    socio.retirar(libro, this.DURACION);
    socio.setHistorial = libro;
  }

  devolverLibro(socioId: number, libroISBN: string) {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }

    socio.devolver(libro);
    if (this.reservas.has(libro)) {
      const socios = this.reservas.get(libro)!;
      const proximoSocio = socios.shift()!;
      proximoSocio.retirar(libro, this.DURACION); 
      const evento = new EventoBiblioteca("Reserva Disponible", new Date, `El libro ${libro.titulo} ya esta disponible y fue asignado al socio ${proximoSocio.nombre} ${proximoSocio.apellido}.`)
      evento.mandarMensaje(proximoSocio.id);
      evento.imprimirMesaje(proximoSocio.id)
      if (socios.length === 0) {
        this.reservas.delete(libro);
      }
    }
  }
  librosPorAutor(nombreAutor:string): Libro[]{
    const libros: Libro[]=[];
    const autor =biblioteca.buscarAutor(nombreAutor);
    for (const l of this.inventario){
      if (l.autor == autor){
        libros.push(l);
      }
    }
    return libros;

  }
  listarAutores():void {
    for (const autor of this.autores) {
      console.log(`Nombre: ${autor.nombre} ${autor.apellido}, Fecha de Nacimiento: ${autor.fechaNacimiento.toDateString()}, Biografía: ${autor.biografia}`);
    }
  }
recomendarLibros(socioId: number): Libro[] {
  const socio = this.buscarSocio(socioId);
  if (!socio) {
    throw new Error("No se encontro");
  }
  const librosPrestados = socio['prestamos'].map(prestamo => prestamo.libro);
  let librosRecomendados : [Libro,number][]=[];
  const Autores: Autor[] = []
  const PalabrasClaves: string[] = []
  for (const l of librosPrestados){
    let palClaves = l.titulo.split(" ");
    palClaves = palClaves.filter(p => p.length > 3);
    if(!Autores.includes(l.autor)){
      Autores.push(l.autor)
    }
    PalabrasClaves.push(...palClaves);
  }
  for (const l of this.inventario){
    var point = 0;
    if(socio.tienePrestadoLibro(l)){
      continue;
    }
    if(Autores.includes(l.autor)){
      point++;
    }
    for(const p of PalabrasClaves){
      if(l.titulo.includes(p)){
        point++;
      }
    }
    if (point>0)librosRecomendados.push([l,point])
  }
  librosRecomendados.sort((a, b) => b[1] - a[1])
  librosRecomendados = librosRecomendados.slice(0,6);
  const librosR = librosRecomendados.map(librosRecomendados => librosRecomendados[0]);
  console.log(librosR)
  return librosR;
}
}


export const biblioteca = new Biblioteca();
export type { Biblioteca };
