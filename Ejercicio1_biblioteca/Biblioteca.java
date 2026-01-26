/**
 * 
 */
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.LinkedList;
/**
 * 
 */
public class Biblioteca {
	
	public static void main(String[] args) {
        Biblioteca biblioteca = new Biblioteca();
        // Registrar autores
        Autor autor1 = biblioteca.registrarAutor("Gabriel García Márquez", "Escritor colombiano", 1927);
        Autor autor2 = biblioteca.registrarAutor("Jorge Luis Borges", "Escritor argentino", 1899);
        // Agregar libros
        Libro libro1 = biblioteca.agregarLibro("Cien años de soledad", "Gabriel García Márquez", "ISBN001");
        Libro libro2 = biblioteca.agregarLibro("El Aleph", "Jorge Luis Borges", "ISBN002");
        Libro libro3 = biblioteca.agregarLibro("Ficciones", "Jorge Luis Borges", "ISBN003");
        Libro libro4 = biblioteca.agregarLibro("El jardín de senderos", "Jorge Luis Borges", "ISBN004");
        // Registrar socios
        Socio socio1 = biblioteca.registrarSocio(1, "Juan", "Pérez");
        Socio socio2 = biblioteca.registrarSocio(2, "María", "López");
        Socio socio3 = biblioteca.registrarSocio(3, "Carlos", "Gómez");
        //Sistema de préstamos y reservas
        biblioteca.prestarLibro(libro1, socio1);
        biblioteca.reservarLibro(socio2, libro1);
        biblioteca.devolverLibro(libro1, socio1);
        //Sistema de multas
        biblioteca.prestarLibro(libro2, socio3);
        socio3.simularRetraso(libro2, 3);
        int multa = biblioteca.calcularMulta(socio3);
        System.out.println("Multa de Carlos: " + multa);
        //Eventos
        EventoBiblioteca evento = biblioteca.crearEvento("Club de Lectura", "Discusión", new Date());
        evento.registrarSocio(socio1);
        evento.notificarSocios("Recordatorio del evento");
     //historial y recomendaciones
        biblioteca.devolverLibro(libro2, socio3);
        List<Libro> recomendaciones = biblioteca.recomendarLibros(socio3);
        System.out.println("Recomendaciones para " + socio3.getNombreCompleto() + ": " + recomendaciones.size() + " libros");
    }

    private List<Libro> inventario = new ArrayList<>();
    private List<Socio> socios = new ArrayList<>();
    private List<Autor> autores = new ArrayList<>();
    private List<EventoBiblioteca> eventos = new ArrayList<>();

    public Libro agregarLibro(String titulo, String nombreAutor, String isbn) {
        Autor autor = buscarAutor(nombreAutor);
        if (autor == null) return null;
        Libro libro = new Libro(titulo, autor, isbn);
        inventario.add(libro);
        return libro;
    }
    public List<Libro> buscarLibrosPorAutor(String nombreAutor) {
        List<Libro> lista = new ArrayList<>();
        for (Libro l : inventario) {
            if (l.getAutor().getNombre().equalsIgnoreCase(nombreAutor)) {
                lista.add(l);
            }
        }
        return lista;
    }
    public Socio registrarSocio(int id, String nombre, String apellido) {
        Socio socio = new Socio(id, nombre, apellido);
        socios.add(socio);
        return socio;
    }
    public Autor registrarAutor(String nombre, String bio, int año) {
        Autor a = new Autor(nombre, bio, año);
        autores.add(a);
        return a;
    }
    public Autor buscarAutor(String nombre) {
        for (Autor a : autores) {
            if (a.getNombre().equalsIgnoreCase(nombre)) return a;
        }
        return null;
    }
    public boolean prestarLibro(Libro libro, Socio socio) {
        if (calcularMulta(socio) > 0) {
            System.out.println("No puede retirar libros por multas pendientes");
            return false;
        }
        
        if (libroDisponible(libro)) {
            socio.retirarLibro(libro, 14);
            return true;
        }
        return false;
    }
    public void devolverLibro(Libro libro, Socio socio) {
        Prestamo prestamo = socio.devolverLibro(libro);
        if (prestamo != null) {
            // Buscar socio con reserva para este libro
            for (Socio s : socios) {
                if (s.tieneReserva(libro)) {
                    s.quitarReserva(libro);
                    System.out.println("Notificando a " + s.getNombreCompleto() + " que el libro está disponible");
                    break;
                }
            }
        }
    }
    public void reservarLibro(Socio socio, Libro libro) {
        if (!libroDisponible(libro)) {
            socio.agregarReserva(libro);
        }
    }
    public boolean libroDisponible(Libro libro) {
        for (Socio s : socios) {
            if (s.tienePrestado(libro)) return false;
        }
        return true;
    }
    public int calcularMulta(Socio socio) {
        int total = 0;
        for (int dias : socio.diasVencidos()) {
            total += dias * 50;
        }
        return total;
    }
    public EventoBiblioteca crearEvento(String nombre, String desc, Date fecha) {
        EventoBiblioteca e = new EventoBiblioteca(nombre, desc, fecha);
        eventos.add(e);
        return e;
    }
    public List<Libro> recomendarLibros(Socio socio) {
        List<Libro> recomendaciones = new ArrayList<>();
        List<Libro> historial = socio.getHistorialLectura();
        for (Libro libroLeido : historial) {
            // Recomendar otros libros del mismo autor
            for (Libro libro : inventario) {
                if (libro.getAutor().equals(libroLeido.getAutor()) && 
                    !historial.contains(libro) && 
                    !recomendaciones.contains(libro)) {
                    recomendaciones.add(libro);
                }
            }
            // Recomendar libros con títulos similares
            String[] palabras = libroLeido.getTitulo().toLowerCase().split(" ");
            for (Libro libro : inventario) {
                if (!historial.contains(libro) && !recomendaciones.contains(libro)) {
                    for (String palabra : palabras) {
                        if (libro.getTitulo().toLowerCase().contains(palabra) && palabra.length() > 3) {
                            recomendaciones.add(libro);
                            break;
                        }
                    }
                }
            }
        }
        return recomendaciones;
    }
}
