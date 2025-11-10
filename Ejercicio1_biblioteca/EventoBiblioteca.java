/**
 * 
 */
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 
 */
public class EventoBiblioteca {
	  private String nombre;
	    private String descripcion;
	    private Date fecha;
	    private List<Socio> registrados = new ArrayList<>();

	    public EventoBiblioteca(String nombre, String descripcion, Date fecha) {
	        this.nombre = nombre;
	        this.descripcion = descripcion;
	        this.fecha = fecha;
	    }

	    public void registrarSocio(Socio socio) {
	        if (!registrados.contains(socio)) {
	            registrados.add(socio);
	        }
	    }

	    public void notificarSocios(String mensaje) {
	        for (Socio socio : registrados) {
	            System.out.println("Notificación para " + socio.getNombreCompleto() + ": " + mensaje);
	        }
	    }
}