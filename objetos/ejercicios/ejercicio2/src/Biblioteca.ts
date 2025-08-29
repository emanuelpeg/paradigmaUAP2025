import { Usuario } from './models/Usuario';
import { Prestamo, PrestamoRegular, PrestamoCorto, PrestamoReferencia, PrestamoDigital } from './models/Prestamo';
import { PoliticaPrestamo, PoliticaEstricta } from './models/PoliticaPrestamo';
import { 
    IBuscable, 
    CatalogoBiblioteca, 
    BibliotecaDigital, 
    ArchivoHistorico, 
    BaseConocimiento, 
    BuscadorUniversal 
} from './models/Busqueda';

class Biblioteca {
    private prestamos: Map<string, Prestamo[]> = new Map();
    private politica: PoliticaPrestamo = new PoliticaEstricta();
    private buscador: BuscadorUniversal = new BuscadorUniversal();

    constructor() {
        // Inicializar sistemas de búsqueda
        this.buscador.agregarSistema(new CatalogoBiblioteca());
        this.buscador.agregarSistema(new BibliotecaDigital());
        this.buscador.agregarSistema(new ArchivoHistorico());
        this.buscador.agregarSistema(new BaseConocimiento());
    }

    setPolitica(politica: PoliticaPrestamo) {
        this.politica = politica;
    }

    async prestarLibro(usuario: Usuario, libroId: string, tipoPrestamo: 'regular' | 'corto' | 'referencia' | 'digital'): Promise<boolean> {
        if (!usuario.puedeTomarPrestado()) {
            return false;
        }

        const prestamosUsuario = this.prestamos.get(usuario.id) || [];
        
        if (prestamosUsuario.length >= usuario.getMaxLibros()) {
            return false;
        }

        const librosVencidos = this.contarLibrosVencidos(prestamosUsuario);
        if (!this.politica.puedePrestar(usuario, librosVencidos)) {
            return false;
        }

        let nuevoPrestamo: Prestamo;
        const fecha = new Date();

        switch (tipoPrestamo) {
            case 'regular':
                nuevoPrestamo = new PrestamoRegular(fecha, libroId);
                break;
            case 'corto':
                nuevoPrestamo = new PrestamoCorto(fecha, libroId);
                break;
            case 'referencia':
                if (!usuario.puedeTenerLibroReferencia()) {
                    return false;
                }
                nuevoPrestamo = new PrestamoReferencia(fecha, libroId);
                break;
            case 'digital':
                nuevoPrestamo = new PrestamoDigital(fecha, libroId);
                break;
        }

        prestamosUsuario.push(nuevoPrestamo);
        this.prestamos.set(usuario.id, prestamosUsuario);
        return true;
    }

    private contarLibrosVencidos(prestamos: Prestamo[]): number {
        const ahora = new Date();
        return prestamos.filter(p => p.calcularVencimiento() < ahora).length;
    }

    async buscar(criterio: string): Promise<any[]> {
        return this.buscador.buscarEnTodos(criterio);
    }
}

export { Biblioteca };
