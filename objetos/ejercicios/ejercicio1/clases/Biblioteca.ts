import { Libro } from "./Libro";
import { Socio } from "./Socio";
import { Autor } from "./Autor";
import { EventosBiblioteca } from "./EventosBiblioteca";



class Biblioteca {
  private inventario: Libro[] = [];
  private socios: Socio[] = [];
  private DURACION = 14;
  private reservas: { [isbn: string]: number[] } = {}; 
  private prestamosActivos: { [isbn: string]: number } = {}; 
  private multas: { [socioId: number]: number } = {};
  private eventos: EventosBiblioteca[] = [];



  agregarLibro(titulo: string, nombreAutor: string, isbn: string): Libro{

    const autor = this.buscarAutor(nombreAutor);
    if(!autor){
    throw new Error(`No se pudo agregar el libro "${titulo}": autor "${nombreAutor}" no encontrado`);
    }
    const libroCreado = new Libro(titulo, autor, isbn);
    this.inventario.push(libroCreado);

    
    return libroCreado;
  }

  buscarLibro(isbn: string): Libro | null {
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

  buscarAutor(nombre: String): Autor | null {
    const autores: Autor[] = [
      new Autor("Cervantes", "Biografia de Cervantes", 1547),
      new Autor("James Clear", "Biografia de James Clear", 1986),
      new Autor("Orwell", "Biografia de Orwell", 1903),
    ];

    const autorEncontrado = autores.find(
      (autor) => autor.nombre.toLowerCase() === nombre.toLowerCase()
    );
    
    if (!autorEncontrado) {
      console.log(`Autor "${nombre}" no encontrado`);
      return null;
    }
    return autorEncontrado;

  }

  retirarLibro(socioId: number, libroISBN: string): void {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);
    
    if (this.multas[socioId] && this.multas[socioId] > 0) {
  console.log(`El socio ${socioId} tiene una multa pendiente de ${this.multas[socioId]}. No puede retirar libros.`);
  return;
}
   

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }
  
      if (this.prestamosActivos[libroISBN]) {
        
        if(this.reservas[libroISBN]?.[0] === socioId) {
          this.reservas[libroISBN].shift();
        }
        else{
        throw new Error("Libro no esta disponible. Puedes reservarlo");
        
      }
      
      }
    

    socio.retirar(libro, this.DURACION);
    this.prestamosActivos[libroISBN] = socioId
    console.log(`Socio ${socioId} retiro el libro  ${libroISBN}`);
    
  }

  devolverLibro(socioId: number, libroISBN: string) {
    const socio = this.buscarSocio(socioId);
    const libro = this.buscarLibro(libroISBN);

    if (!socio || !libro) {
      throw new Error("No se encontro");
    }

    socio.devolver(libro);
    delete this.prestamosActivos[libroISBN];
    const cola = this.reservas[libroISBN];

    console.log(`Socio ${socioId} devolvio el libro  ${libroISBN}`);

    if (cola && cola.length > 0) {
      const siguienteSocioId = cola[0];
      console.log(`Notificando al socio ${siguienteSocioId}`); 
      this.reservas[libroISBN] = cola;
    }
  }

  reservarLibro(socioId: number, libroISBN: string) {
    if(!this.reservas[libroISBN]) {
      this.reservas[libroISBN] = [];
      }
    this.reservas[libroISBN].push(socioId);
    console.log(`Socio ${socioId} reservo el libro  ${libroISBN}`);

  

}

calculoMulta(socioId: number, libroISBN: string): boolean{
  const socio = this.buscarSocio(socioId);
  const libro = this.buscarLibro(libroISBN);


  if(!socio || !libro) {
    throw new Error("socio o libro no encontrado");
  }

    const diasRetraso = socio.diasRetrasoLibro(libro);

  if(diasRetraso > 0) {
    const multa = diasRetraso * 50; 
    this.multas[socioId] = (this.multas[socioId] || 0) + multa; // guardamos la multa
    console.log(`El socio ${socioId} tiene una multa de ${multa} por el libro ${libroISBN}`);
    return true;
  } 
 
  else {
    console.log(`El socio ${socioId} no tiene multas pendientes por el libro ${libroISBN}`);
    return false;
  }


}

  getLibrosPorAutor(autor: string): Libro[] {
    const autorVerificacion = this.buscarAutor(autor);
    if (!autorVerificacion) {
      console.log(`Autor "${autor}" no encontrado`);
      return [];
    }

    console.log("Buscando libros de", autor+"...");
    const librosEncontrados = this.inventario.filter(libro => libro.autor.nombre === autor);
    if(librosEncontrados.length === 0) {
     
       console.log("No se encontraron libros para este autor");

    } 
 

      else {
      console.log("¡Libros Encontrados!");
      console.log("Libros del autor", autor, ":");
      librosEncontrados.forEach(libro => {
        console.log(`- ${libro.titulo} (ISBN: ${libro.isbn})`);
      });
    } 

    return librosEncontrados;

    }

    agregarEvento(titulo: string, descripcion: string, fecha: Date, tipo: string, librosRelacionados: Libro[], sociosRegistrados: number[]) {
        const nuevoEvento = new EventosBiblioteca(titulo, descripcion, fecha, tipo, librosRelacionados, sociosRegistrados);
        this.eventos.push(nuevoEvento);
    }
  
    listarEventos(){
      if(this.eventos.length === 0) {
      console.log("No hay eventos programados.");  
      }
      this.eventos.forEach(evento => {
        console.log(`Título: ${evento.titulo}, Fecha: ${evento.fecha.toLocaleDateString()}, Tipo: ${evento.tipo}`);
        
    });
    }

    notificarSocios(){


      this.socios.forEach(socio => {
        const librosVencidos = this.inventario.filter(libro => 
            this.prestamosActivos[libro.isbn] === socio.id && socio.diasRetrasoLibro(libro) > 0
        );
        if(librosVencidos.length > 0) {
              librosVencidos.forEach(libro => {

          console.log(`Notificando a ${socio.nombreCompleto} sobre el libro vencido "${libro.titulo}"`);
              });
      }
           Object.entries(this.reservas).forEach(([isbn, cola]) => {
            if(cola[0] === socio.id){
              const libro = this.buscarLibro(isbn);
              if(libro && !this.prestamosActivos[isbn]){
                console.log(`Notificando a ${socio.nombreCompleto} que el libro "${libro.titulo}" está disponible para retiro.`);
              }
            } 
            
        });

            this.eventos.forEach(evento => {
              if(evento.sociosRegistrados.includes(socio.id)){
                console.log(`Notificando a ${socio.nombreCompleto} sobre el evento "${evento.titulo}" programado para el ${evento.fecha.toLocaleDateString()}.`);
              }
      });
    }

 
)}

   RastrearHistorialSocio(socioId?: number): void {
  if (socioId) {
       const socio = this.buscarSocio(socioId);
    if (!socio) {
      console.log(`Socio con ID ${socioId} no encontrado.`);
      return;
    }
    socio.mostrarHistorial();
  } else {
    console.log('\n=== HISTORIAL DE TODOS LOS SOCIOS ===');
    
    if (this.socios.length === 0) {
      console.log("No hay socios registrados.");
      return;
    }

    this.socios.forEach(socio => {
      socio.mostrarHistorial();
      console.log('\n' + '=============================='+ '\n');
    });
  }
}
}

export const biblioteca = new Biblioteca();
export type { Biblioteca };
