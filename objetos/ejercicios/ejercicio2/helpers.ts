import { Libro, TipoLibro } from "./clases/Libro";

export const buscar = (criterio: Partial<Libro>, libros: Libro[], tipoLibro?: TipoLibro) => {
    return libros.filter(libro => {
        if (tipoLibro && libro.tipo !== tipoLibro) return false;

        return Object.entries(criterio).every(
            ([key, valor]) => libro[key as keyof Libro] === valor
        );
    });
}

export function filtrarLibros(condicion: string, librosInventario: Libro[], tipoLibro?: TipoLibro): Libro[] {
    const libros: Libro[] = [];
    for (const libro of librosInventario) {
        if (tipoLibro && libro.tipo !== tipoLibro) continue;

        const valoresLibro = Object.values(libro);
        for (const valor of valoresLibro) {
            if (typeof valor === 'string' && valor.toLowerCase().includes(condicion.toLowerCase())) {
                libros.push(libro);
                break;
            }
        }
    }
    return libros;
}