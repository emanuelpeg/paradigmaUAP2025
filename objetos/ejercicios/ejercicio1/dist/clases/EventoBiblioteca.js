export class EventoBiblioteca {
    nombre;
    descripcion;
    fecha;
    sociosRegistros;
    constructor(nombre, descripcion, fecha, sociosRegistros = []) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.sociosRegistros = sociosRegistros;
    }
    registrarSocio(socioId) {
        if (!this.sociosRegistros.includes(socioId)) {
            this.sociosRegistros.push(socioId);
        }
    }
}
