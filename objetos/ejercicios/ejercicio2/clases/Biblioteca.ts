import { Libro } from "./Libro";
import { Socio, SocioFactory, TipoSocio } from "./Socio";
import { TipoPrestamo } from "./Prestamo";
import { PoliticaDocente, PoliticaEstricta, PoliticaEstudiante, PoliticaFlexible, PoliticaPrestamo } from "./PoliticaPrestamo";
// importamos todas las clases por si se quiere cambiar de politica 

class Biblioteca {
  private inventario: Libro[] = [];
  private socios: Socio[] = [];
	private politica: PoliticaPrestamo;

	constructor(politica: PoliticaPrestamo){
		this.politica = politica;
	}
	// para cambiar la politica en tiempo de ejecucion
	setPolitica(politica: PoliticaPrestamo){
		this.politica = politica;
	}

	prestarLibro(tieneVencidos: boolean) {
    if (this.politica.puedePrestar(tieneVencidos)) {
      const dias = this.politica.calcularDuracionPrestamo(tieneVencidos);
      console.log(`Préstamo aprobado por ${dias} días.`);
    } else {
      console.log("Préstamo rechazado por libros vencidos.");
    }
  }
  // Funciones de libros
  agregarLibro(titulo: string, autor: string, isbn: string): Libro {
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
  registrarSocio(tipo: TipoSocio, id: number, nombre: string, apellido: string): Socio {
    const socioCreado = SocioFactory.crearSocio(tipo, id, nombre, apellido);
    this.socios.push(socioCreado);
    return socioCreado;
  }

  buscarSocio(id: number): Socio | null {
    return this.socios.find((socio) => socio.id === id) ?? null;
  }

  retirarLibro(socioId: number, libroISBN: string, tipoPrestamo: TipoPrestamo): void {
		const socio = this.buscarSocio(socioId);
		const libro = this.buscarLibro(libroISBN);

		if (!socio || !libro) throw new Error("No se encontro");

		if (this.socios.some(s => s.tienePrestadoLibro(libro))) {
			throw new Error("Libro no esta disponible");
		}
		socio.retirar(libro, tipoPrestamo);
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
export const biblioteca = new Biblioteca(new PoliticaFlexible());
export type { Biblioteca };