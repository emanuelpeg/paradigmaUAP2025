import { Libro, TipoLibro } from "./Libro";
import { PrestamoStrategy } from "./prestamos/PrestamoStrategy";
import { Prestamo, PrestamoFactory, PrestamoRegular, TipoPrestamo } from "./prestamos/Prestamo";
import { PoliticaPrestamoEstricta } from "./prestamos/Strategies";
import { Socio, SocioFactory, TipoSocio } from "./Socio";
import { IBuscable } from "./IBuscable";
import { BuscadorUniversal } from "./BuscadorUniversal";

class Biblioteca {
	private inventario: Libro[] = [];
	private socios: Socio[] = [];
	private _prestamoStrategy: PrestamoStrategy = new PoliticaPrestamoEstricta();
	private _buscador: IBuscable = new BuscadorUniversal(this.inventario);

	// Funciones de libros
	agregarLibro(titulo: string, autor: string, isbn: string, tipo: TipoLibro): Libro {
		const libroCreado = new Libro(titulo, autor, isbn, tipo);
		this.inventario.push(libroCreado);
		return libroCreado;
	}

	busqueda() {
		console.log(this._buscador.filtrar('el'));
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
	registrarSocio(tipo: TipoSocio, id: number, nombre: string, apellido: string): Socio {
		const socioCreado = SocioFactory.crearSocio(tipo, id, nombre, apellido);
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

		if (!this._prestamoStrategy.validarIncremento(socio)) {
			throw new Error("No puede tomar prestado un libro con libros vencidos en su inventario");
		}

		const ajusteDias = this._prestamoStrategy.conseguirIncremento(socio, false);
		socio.retirar(libro, ajusteDias);
	}

	devolverLibro(socioId: number, libroISBN: string) {
		const socio = this.buscarSocio(socioId);
		const libro = this.buscarLibro(libroISBN);

		if (!socio || !libro) {
			throw new Error("No se encontro");
		}

		socio.devolver(libro);
	}

	setPrestamoStrategy(strategy: PrestamoStrategy) {
		this._prestamoStrategy = strategy;
	}

	get libros() { return this.inventario };
}

export const biblioteca = new Biblioteca();
export type { Biblioteca };
