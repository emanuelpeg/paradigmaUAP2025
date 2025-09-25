public class Libro {
    private String _titulo;
    private String _autor;
    private String _isbn;

    public Libro(String _titulo, String _autor, String _isbn) {
        this._titulo = _titulo;
        this._autor = _autor;
        this._isbn = _isbn;
    }

    public String getTitulo() {
        return this._titulo;
    }

    public String getAutor() {
        return this._autor;
    }

    public String getIsbn() {
        return this._isbn;
    }
    @Override
    public String toString() {
        return "Libro: " + _titulo + " - " + _autor;
    }
}