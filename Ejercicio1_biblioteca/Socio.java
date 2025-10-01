/**
 * 
 */
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
/**
 * 
 */
class Prestamo {
	private Libro libro;
    private Date vencimiento;

    public Prestamo(Libro libro, Date vencimiento) {
        this.libro = libro;
        this.vencimiento = vencimiento;
    }

    public Libro getLibro() {
    	return libro; 
    }
    public Date getVencimiento() { 
    	return vencimiento; 
    }
}


public class Socio {
	private int id;
    private String nombre;
    private String apellido;
    private List<Prestamo> prestamos = new ArrayList<>();
    private List<Libro> reservas = new ArrayList<>();
    private List<Libro> historialLectura = new ArrayList<>();
    public Socio(int id, String nombre, String apellido) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
    }

    public int getId() { 
    	return id;
    }
    public String getNombre() {
    	return nombre; 
    }
    public String getNombreCompleto() {
    	return nombre + " " + apellido; 
    }
    public List<Libro> getHistorialLectura() {
        return historialLectura;
    }
    public void retirarLibro(Libro libro, int dias) {
        Date vencimiento = new Date();
        vencimiento.setTime(vencimiento.getTime() + dias * 24L * 60 * 60 * 1000);
        prestamos.add(new Prestamo(libro, vencimiento));
    }

    public Prestamo devolverLibro(Libro libro) {
        for (int i = 0; i < prestamos.size(); i++) {
            Prestamo p = prestamos.get(i);
            if (p.getLibro().equals(libro)) {
                prestamos.remove(i);
                agregarAlHistorial(libro);
                return p;
            }
        }
        return null;
    }

    public boolean tienePrestado(Libro libro) {
        for (Prestamo p : prestamos) {
            if (p.getLibro().equals(libro)) return true;
        }
        return false;
    }

    public List<Integer> diasVencidos() {
        List<Integer> dias = new ArrayList<>();
        Date hoy = new Date();
        for (Prestamo p : prestamos) {
            long diferencia = hoy.getTime() - p.getVencimiento().getTime();
            if (diferencia > 0) {
                int diasVencidos = (int) (diferencia / (24 * 60 * 60 * 1000));
                dias.add(diasVencidos);
            }
        }
        return dias;
    }

    public void agregarReserva(Libro libro) {
        if (!reservas.contains(libro)) {
            reservas.add(libro);
        }
    }

    public boolean tieneReserva(Libro libro) {
        return reservas.contains(libro);
    }

    public void quitarReserva(Libro libro) {
        reservas.remove(libro);
    }

    public void simularRetraso(Libro libro, int diasRetraso) {
        for (Prestamo p : prestamos) {
            if (p.getLibro().equals(libro)) {
                Date nuevaFecha = new Date();
                nuevaFecha.setTime(nuevaFecha.getTime() - diasRetraso * 24L * 60 * 60 * 1000);
                p.getVencimiento().setTime(nuevaFecha.getTime());
                break;
            }
        }
    }
    public void agregarAlHistorial(Libro libro) {
        if (!historialLectura.contains(libro)) {
            historialLectura.add(libro);
        }
    }
    
}