import java.util.ArrayList;
import java.util.Date;
import java.util.List;
public abstract class Socio {
    protected List<Prestamo> prestamos = new ArrayList<>();
    private int _id;
    private String _nombre;
    private String _apellido;

    public Socio(int _id, String _nombre, String _apellido) {
        this._id = _id;
        this._nombre = _nombre;
        this._apellido = _apellido;
    }

    public int getId() {
        return this._id;
    }

    public String getNombre() {
        return this._nombre;
    }

    public String getApellido() {
        return this._apellido;
    }

    public String getNombreCompleto() {
        return this.getNombre() + " " + this.getApellido();
    }

    public abstract int getDuracionPrestamo();
    public abstract int getMaximoLibros();
    
    public void retirar(Libro libro, Integer duracion) {
        if (!this.puedeRetirar(libro)) {
            throw new RuntimeException("No tiene permisos para retirar este libro");
        }
        int duracionFinal = duracion != null ? duracion : this.getDuracionPrestamo();
        Date vencimiento = new Date();
        vencimiento.setTime(vencimiento.getTime() + duracionFinal * 24L * 60L * 60L * 1000L);
        this.prestamos.add(crearPrestamo(libro));
    }
    
    protected abstract Prestamo crearPrestamo(Libro libro);

    public void retirar(Libro libro) {
        this.retirar(libro, null);
    }

    public Prestamo devolver(Libro libro) {
        Prestamo prestamo = this.tienePrestadoLibro(libro);
        if (prestamo == null) {
            throw new RuntimeException("No esta prestado");
        }
        int indice = this.prestamos.indexOf(prestamo);
        this.prestamos.remove(indice);
        return prestamo;
    }

    public Prestamo tienePrestadoLibro(Libro libro) {
        for (Prestamo p : this.prestamos) {
            if (p.getLibro() == libro) {
                return p;
            }
        }
        return null;
    }

    public int getLibrosEnPrestamo() {
        return this.prestamos.size();
    }

    public boolean puedeRetirar(Libro libro) {
        return this.prestamos.size() < this.getMaximoLibros();
    }
    
    // Para las politicas de prestamo
    public boolean tieneLibrosVencidos() {
        Date hoy = new Date();
        for (Prestamo prestamo : prestamos) {
            if (prestamo.getVencimiento() != null && prestamo.getVencimiento().before(hoy)) {
                return true;
            }
        }
        return false;
    }
}

class SocioRegular extends Socio {
    public SocioRegular(int id, String nombre, String apellido) {
        super(id, nombre, apellido);
    }

    public int getDuracionPrestamo() {
        return 14;
    }

    public int getMaximoLibros() {
        return 3;
    }
    
    @Override
    protected Prestamo crearPrestamo(Libro libro) {
        return new PrestamoRegular(libro);
    }

    @Override
    public Prestamo devolver(Libro libro) {
        // Manejar potenciales multas
        return super.devolver(libro);
    }
}

class SocioVIP extends Socio {
    public SocioVIP(int id, String nombre, String apellido) {
        super(id, nombre, apellido);
    }

    public int getDuracionPrestamo() {
        return 21;
    }

    public int getMaximoLibros() {
        return 5;
    }
    
    @Override
    public Prestamo crearPrestamo(Libro libro) {
        return new PrestamoRegular(libro); // VIP sin multas pero mismo tipo
    }
}

class Empleado extends Socio {
    public Empleado(int id, String nombre, String apellido) {
        super(id, nombre, apellido);
    }

    public int getDuracionPrestamo() {
        return 30;
    }

    public int getMaximoLibros() {
        return Integer.MAX_VALUE;
    }
    
    @Override
    public Prestamo crearPrestamo(Libro libro) {
        return new PrestamoRegular(libro);
    }
    
    @Override
    public boolean puedeRetirar(Libro libro) {
        return true; // Acceso ilimitado, puede acceder a libros de referencia
    }
}

class Visitante extends Socio {
    public Visitante(int id, String nombre, String apellido) {
        super(id, nombre, apellido);
    }

    @Override
    public boolean puedeRetirar(Libro libro) {
        return false; // Solo puede consultar catálogo
    }

    public int getDuracionPrestamo() {
        return 0;
    }

    public int getMaximoLibros() {
        return 0;
    }
    
    @Override
    public Prestamo crearPrestamo(Libro libro) {
        return new PrestamoReferencia(libro);
    }
}

enum TipoSocio {
    REGULAR,
    VIP,
    EMPLEADO,
    VISITANTE
}

class SocioFactory {
    public static Socio crearSocio(TipoSocio tipo, int id, String nombre, String apellido) {
        switch (tipo) {
            case REGULAR:
                return new SocioRegular(id, nombre, apellido);
            case VIP:
                return new SocioVIP(id, nombre, apellido);
            case EMPLEADO:
                return new Empleado(id, nombre, apellido);
            case VISITANTE:
                return new Visitante(id, nombre, apellido);
            default:
                throw new RuntimeException("Tipo de socio no valido");
        }
    }
}
