/**
 * 
 */
/**
 * 
 */
public class Libro {
	private String titulo;
    private Autor autor;
    private String isbn;

    public Libro(String titulo, Autor autor, String isbn) {
        this.titulo = titulo;
        this.autor = autor;
        this.isbn = isbn;
    }

    public String getTitulo() { 
    	return titulo; 
    }
    public Autor getAutor() { 
    	return autor; 
    }
    public String getIsbn() {
    return isbn; 
    }
 }
