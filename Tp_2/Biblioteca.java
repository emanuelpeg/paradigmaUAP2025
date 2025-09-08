import java.util.ArrayList;
import java.util.List;
public class Biblioteca {
public static void main(String[] args) {
    System.out.println("=== PROBANDO SISTEMA DE BIBLIOTECA ===\n");
    
    // ============== TAREA 1: TIPOS DE SOCIOS ==============
    System.out.println("--- TAREA 1: TIPOS DE SOCIOS ---");
    
    Socio socioRegular = SocioFactory.crearSocio(TipoSocio.REGULAR, 1, "Juan", "Perez");
    Socio socioVIP = SocioFactory.crearSocio(TipoSocio.VIP, 2, "Maria", "Gonzalez");
    Socio empleado = SocioFactory.crearSocio(TipoSocio.EMPLEADO, 3, "Carlos", "Rodriguez");
    Socio visitante = SocioFactory.crearSocio(TipoSocio.VISITANTE, 4, "Ana", "Martinez");
    
    System.out.println("Socio Regular - Maximo libros: " + socioRegular.getMaximoLibros() + 
                      ", Duracion: " + socioRegular.getDuracionPrestamo() + " dias");
    System.out.println("Socio VIP - Maximo libros: " + socioVIP.getMaximoLibros() + 
                      ", Duracion: " + socioVIP.getDuracionPrestamo() + " dias");
    System.out.println("Empleado - Maximo libros: " + empleado.getMaximoLibros() + 
                      ", Duracion: " + empleado.getDuracionPrestamo() + " dias");
    System.out.println("Visitante puede retirar: " + visitante.puedeRetirar(null));
    
    // ============== TAREA 2: TIPOS DE PRESTAMO ==============
    System.out.println("\n--- TAREA 2: TIPOS DE PRESTAMO ---");
    
    Libro libro1 = new Libro("El Quijote", "Cervantes", "123456");
    Libro libro2 = new Libro("Cien años de soledad", "Garcia Marquez", "789012");
    Libro libro3 = new Libro("Manual Java", "Oracle", "456789");
    Libro libro4 = new Libro("Revista Digital", "Tech Magazine", "999888");
    
    Prestamo prestamoRegular = new PrestamoRegular(libro1);
    Prestamo prestamoCorto = new PrestamoCorto(libro2);
    Prestamo prestamoReferencia = new PrestamoReferencia(libro3);
    Prestamo prestamoDigital = new PrestamoDigital(libro4);
    
    System.out.println("Prestamo Regular - Vencimiento: " + prestamoRegular.getVencimiento());
    System.out.println("Prestamo Corto - Vencimiento: " + prestamoCorto.getVencimiento());
    System.out.println("Prestamo Referencia - Vencimiento: " + prestamoReferencia.getVencimiento());
    System.out.println("Prestamo Digital - Vencimiento: " + prestamoDigital.getVencimiento());
    
    System.out.println("Multa Prestamo Regular: $" + prestamoRegular.calcularMulta());
    System.out.println("Multa Prestamo Corto: $" + prestamoCorto.calcularMulta());
    System.out.println("Multa Prestamo Digital: $" + prestamoDigital.calcularMulta());
    
    // ============== TAREA 3: PATRON STRATEGY ==============
    System.out.println("\n--- TAREA 3: POLITICAS DE PRESTAMO ---");
    
    Biblioteca biblioteca = new Biblioteca();
    
    // Probar política estricta
    biblioteca.setPoliticaPrestamo(new PoliticaEstricta());
    System.out.println("Politica Estricta - Puede retirar: " + 
                      biblioteca.procesarPrestamo(socioRegular, libro1));
    
    // Probar política flexible
    biblioteca.setPoliticaPrestamo(new PoliticaFlexible());
    System.out.println("Politica Flexible - Puede retirar: " + 
                      biblioteca.procesarPrestamo(socioRegular, libro1));
    
    // Probar política estudiante
    PoliticaEstudiante politicaEst = new PoliticaEstudiante(false);
    biblioteca.setPoliticaPrestamo(politicaEst);
    System.out.println("Politica Estudiante (no examenes) - Puede retirar: " + 
                      biblioteca.procesarPrestamo(socioRegular, libro1));
    
    politicaEst.setEpocaExamenes(true);
    System.out.println("Politica Estudiante (examenes) - Epoca examenes: " + 
                      politicaEst.isEpocaExamenes());
    
    // Probar política docente
    biblioteca.setPoliticaPrestamo(new PoliticaDocente());
    System.out.println("Politica Docente - Puede retirar: " + 
                      biblioteca.procesarPrestamo(empleado, libro2));
    
    // ============== TAREA 4: SISTEMAS DE BUSQUEDA ==============
    System.out.println("\n--- TAREA 4: SISTEMAS DE BUSQUEDA ---");
    
    // Agregar contenido a los sistemas de búsqueda
    biblioteca.getCatalogoBiblioteca().agregarLibro(libro1);
    biblioteca.getCatalogoBiblioteca().agregarLibro(libro2);
    biblioteca.getCatalogoBiblioteca().agregarLibro(libro3);
    
    biblioteca.getBibliotecaDigital().agregarRecurso("Curso Python Online");
    biblioteca.getBibliotecaDigital().agregarRecurso("Tutorial Java");
    
    biblioteca.getArchivoHistorico().agregarDocumento("Acta Fundacional 1810");
    biblioteca.getArchivoHistorico().agregarDocumento("Decreto Historico 1816");
    
    biblioteca.getBaseConocimiento().agregarArticulo("Investigacion sobre IA");
    biblioteca.getBaseConocimiento().agregarArticulo("Paper sobre Machine Learning");
    
    // Probar BuscadorUniversal
    System.out.println("Buscando 'Java' en todos los sistemas:");
    List<Object> resultados = biblioteca.buscarEnTodos("Java");
    System.out.println("Resultados encontrados: " + resultados.size());
    for (Object resultado : resultados) {
        System.out.println("- " + resultado);
    }
    
    System.out.println("\nFiltrando con 'C' en todos los sistemas:");
    List<Object> filtrados = biblioteca.filtrarEnTodos("C");
    System.out.println("Resultados filtrados: " + filtrados.size());
    for (Object resultado : filtrados) {
        System.out.println("- " + resultado);
    }
    
    // Probar acceso individual a sistemas
    System.out.println("\nBusqueda solo en catalogo:");
    List<Object> soloLibros = biblioteca.getCatalogoBiblioteca().buscarPor("Quijote");
    System.out.println("Libros encontrados: " + soloLibros.size());
    
    System.out.println("\n=== TODAS LAS TAREAS COMPLETADAS ===");
}

    private List<Socio> socios = new ArrayList<>();
    private List<Libro> libros = new ArrayList<>();
    private PoliticaPrestamo politicaActual = new PoliticaEstricta();
    
    // Sistemas de búsqueda dentro de la biblioteca
    private CatalogoBiblioteca catalogoBiblioteca = new CatalogoBiblioteca();
    private BibliotecaDigital bibliotecaDigital = new BibliotecaDigital();
    private ArchivoHistorico archivoHistorico = new ArchivoHistorico();
    private BaseConocimiento baseConocimiento = new BaseConocimiento();
    
    public void setPoliticaPrestamo(PoliticaPrestamo politica) {
        this.politicaActual = politica;
    }
    
    public boolean procesarPrestamo(Socio socio, Libro libro) {
        return politicaActual.puedeRetirar(socio, libro);
    }
    
    // BuscadorUniversal que busca en todos los sistemas internos
    public List<Object> buscarEnTodos(String criterio) {
        List<Object> resultados = new ArrayList<>();
        resultados.addAll(catalogoBiblioteca.buscarPor(criterio));
        resultados.addAll(bibliotecaDigital.buscarPor(criterio));
        resultados.addAll(archivoHistorico.buscarPor(criterio));
        resultados.addAll(baseConocimiento.buscarPor(criterio));
        return resultados;
    }
    
    public List<Object> filtrarEnTodos(String condicion) {
        List<Object> resultados = new ArrayList<>();
        resultados.addAll(catalogoBiblioteca.filtrar(condicion));
        resultados.addAll(bibliotecaDigital.filtrar(condicion));
        resultados.addAll(archivoHistorico.filtrar(condicion));
        resultados.addAll(baseConocimiento.filtrar(condicion));
        return resultados;
    }
    
    // Acceso a sistemas individuales
    public CatalogoBiblioteca getCatalogoBiblioteca() {
        return catalogoBiblioteca;
    }
    
    public BibliotecaDigital getBibliotecaDigital() {
        return bibliotecaDigital;
    }
    
    public ArchivoHistorico getArchivoHistorico() {
        return archivoHistorico;
    }
    
    public BaseConocimiento getBaseConocimiento() {
        return baseConocimiento;
    }
}
interface IBuscable {
    List<Object> buscarPor(String criterio);
    List<Object> filtrar(String condicion);
}

class CatalogoBiblioteca implements IBuscable {
    private List<Libro> libros = new ArrayList<>();
    
    @Override
    public List<Object> buscarPor(String criterio) {
        List<Object> resultados = new ArrayList<>();
        for (Libro libro : libros) {
            if (libro.getTitulo().contains(criterio) || 
                libro.getAutor().contains(criterio) ||
                libro.getIsbn().contains(criterio)) {
                resultados.add(libro);
            }
        }
        return resultados;
    }
    
    @Override
    public List<Object> filtrar(String condicion) {
        List<Object> resultados = new ArrayList<>();
        for (Libro libro : libros) {
            if (libro.getAutor().startsWith(condicion)) {
                resultados.add(libro);
            }
        }
        return resultados;
    }
    public void agregarLibro(Libro libro) {
        libros.add(libro);
    }
}

class BibliotecaDigital implements IBuscable {
    private List<String> recursosOnline = new ArrayList<>();
    
    @Override
    public List<Object> buscarPor(String criterio) {
        List<Object> resultados = new ArrayList<>();
        for (String recurso : recursosOnline) {
            if (recurso.contains(criterio)) {
                resultados.add(recurso);
            }
        }
        return resultados;
    }
    
    @Override
    public List<Object> filtrar(String condicion) {
        List<Object> resultados = new ArrayList<>();
        for (String recurso : recursosOnline) {
            if (recurso.toLowerCase().contains(condicion.toLowerCase())) {
                resultados.add(recurso);
            }
        }
        return resultados;
    }
    public void agregarRecurso(String recurso) {
        recursosOnline.add(recurso);
    }
}

class ArchivoHistorico implements IBuscable {
    private List<String> documentosAntiguos = new ArrayList<>();
    
    @Override
    public List<Object> buscarPor(String criterio) {
        List<Object> resultados = new ArrayList<>();
        for (String documento : documentosAntiguos) {
            if (documento.contains(criterio)) {
                resultados.add(documento);
            }
        }
        return resultados;
    }
    
    @Override
    public List<Object> filtrar(String condicion) {
        List<Object> resultados = new ArrayList<>();
        for (String documento : documentosAntiguos) {
            if (documento.contains(condicion)) {
                resultados.add(documento);
            }
        }
        return resultados;
    }
    public void agregarDocumento(String documento) {
        documentosAntiguos.add(documento);
    }
}

class BaseConocimiento implements IBuscable {
    private List<String> articulosAcademicos = new ArrayList<>();
    
    public void agregarArticulo(String articulo) {
        articulosAcademicos.add(articulo);
    }
    
    @Override
    public List<Object> buscarPor(String criterio) {
        List<Object> resultados = new ArrayList<>();
        for (String articulo : articulosAcademicos) {
            if (articulo.contains(criterio)) {
                resultados.add(articulo);
            }
        }
        return resultados;
    }
    
    @Override
    public List<Object> filtrar(String condicion) {
        List<Object> resultados = new ArrayList<>();
        for (String articulo : articulosAcademicos) {
            if (articulo.contains(condicion)) {
                resultados.add(articulo);
            }
        }
        return resultados;
    }
}