import { biblioteca } from "./clases/Biblioteca";
import { TipoSocio } from "./clases/Socio";
import { TipoPrestamo } from "./clases/Prestamo";
import { 
  PoliticaEstricta, 
  PoliticaFlexible, 
  PoliticaEstudiante, 
  PoliticaDocente 
} from "./clases/PoliticaPrestamo";

function probarSistema() {
  // Registro de socios
  const socioRegular = biblioteca.registrarSocio(TipoSocio.REGULAR, 1001, "Ana", "García");
  const socioVIP = biblioteca.registrarSocio(TipoSocio.VIP, 1002, "Carlos", "López");
  const empleado = biblioteca.registrarSocio(TipoSocio.EMPLEADO, 1003, "María", "Rodríguez");
  const visitante = biblioteca.registrarSocio(TipoSocio.VISITANTE, 1004, "Juan", "Pérez");
  
  console.log("Socios registrados:");
  console.log(`- ${socioRegular.nombreCompleto} (${socioRegular.id})`);
  console.log(`- ${socioVIP.nombreCompleto} (${socioVIP.id})`);
  console.log(`- ${empleado.nombreCompleto} (${empleado.id})`);
  console.log(`- ${visitante.nombreCompleto} (${visitante.id})\n`);

  // Agregar libros y recursos
  const libro1 = biblioteca.agregarLibro("El Quijote", "Miguel de Cervantes", "978-84-376-0494-7");
  const libro2 = biblioteca.agregarLibro("Cien años de soledad", "Gabriel García Márquez", "978-84-376-0495-8");
  const libro3 = biblioteca.agregarLibro("Manual de JavaScript", "Autor Técnico", "978-84-376-0496-9");
  const libro4 = biblioteca.agregarLibro("Historia de España", "Historiador", "978-84-376-0497-0");
  
  biblioteca.agregarRecursoDigital(
    "Curso Online de Python", 
    "Video", 
    "https://ejemplo.com/python", 
    ["programación", "python", "curso"]
  );
  
  biblioteca.agregarDocumentoHistorico(
    "Constitución de 1853", 
    "Siglo XIX", 
    "Documento fundacional de la República Argentina"
  );
  
  biblioteca.agregarArticuloAcademico(
    "Algoritmos de Búsqueda Moderna",
    ["Dr. Smith", "Dr. Johnson"],
    2023,
    "Estudio sobre algoritmos de búsqueda eficientes",
    ["algoritmos", "búsqueda", "eficiencia"]
  );

  // Préstamos polimórficos
  console.log("Préstamos realizados:");
  try {
    biblioteca.retirarLibro(socioRegular.id, libro1.isbn, TipoPrestamo.REGULAR);
    console.log(`- Préstamo regular: ${socioRegular.nombreCompleto} - ${libro1.titulo}`);
    
    biblioteca.retirarLibro(socioVIP.id, libro2.isbn, TipoPrestamo.CORTO);
    console.log(`- Préstamo corto: ${socioVIP.nombreCompleto} - ${libro2.titulo}`);
    
    biblioteca.retirarLibro(empleado.id, libro3.isbn, TipoPrestamo.REFERENCIA);
    console.log(`- Préstamo de referencia: ${empleado.nombreCompleto} - ${libro3.titulo}`);
    
    biblioteca.retirarLibro(socioVIP.id, libro4.isbn, TipoPrestamo.DIGITAL);
    console.log(`- Préstamo digital: ${socioVIP.nombreCompleto} - ${libro4.titulo}`);
    
  } catch (error) {
    console.log(`Error: ${error}`);
  }
  
  console.log(`Total de préstamos activos: ${biblioteca.getPrestamosActivos().length}\n`);

  // Cambio de políticas
  console.log("Cambio de políticas:");
  console.log("Política estricta -> flexible");
  biblioteca.cambiarPoliticaPrestamo(new PoliticaFlexible());
  
  console.log("Política flexible -> estudiante");
  biblioteca.cambiarPoliticaPrestamo(new PoliticaEstudiante(true));
  
  console.log("Política estudiante -> docente\n");
  biblioteca.cambiarPoliticaPrestamo(new PoliticaDocente());

  // Búsquedas
  console.log("Búsquedas:");
  const resultadosQuijote = biblioteca.buscarEnCatalogo("Quijote");
  console.log(`Búsqueda 'Quijote': ${resultadosQuijote.length} resultados`);
  
  const resultadosAlgoritmos = biblioteca.buscarEnTodos("algoritmos");
  console.log(`Búsqueda 'algoritmos': ${resultadosAlgoritmos.length} resultados`);
  
  const librosModernos = biblioteca.filtrarLibros(libro => 
    libro.autor.includes("García Márquez") || libro.titulo.includes("JavaScript")
  );
  console.log(`Filtro libros modernos: ${librosModernos.length} resultados\n`);

  // Renovaciones
  try {
    const renovacionExitosa = biblioteca.renovarPrestamo(socioRegular.id, libro1.isbn);
    console.log(`Renovación para ${socioRegular.nombreCompleto}: ${renovacionExitosa ? 'exitosa' : 'fallida'}`);
  } catch (error) {
    console.log(`Error en renovación: ${error}`);
  }
  
  const multaTotal = biblioteca.calcularMultaTotal(socioRegular.id);
  console.log(`Multa total para ${socioRegular.nombreCompleto}: $${multaTotal}\n`);

  // Reportes
  const prestamosVencidos = biblioteca.obtenerPrestamosVencidos();
  const prestamosSocio = biblioteca.obtenerPrestamosPorSocio(socioVIP.id);
  
  console.log("Reportes:");
  console.log(`- Préstamos vencidos: ${prestamosVencidos.length}`);
  console.log(`- Préstamos de ${socioVIP.nombreCompleto}: ${prestamosSocio.length}`);
  console.log(`- Total socios: ${biblioteca.getSocios().length}`);
  console.log(`- Total libros: ${biblioteca.getInventario().length}\n`);

  // Devolución
  try {
    const multa = biblioteca.devolverLibro(socioRegular.id, libro1.isbn);
    console.log(`Libro devuelto por ${socioRegular.nombreCompleto}. Multa: $${multa}`);
    console.log(`Préstamos restantes: ${biblioteca.getPrestamosActivos().length}`);
  } catch (error) {
    console.log(`Error en devolución: ${error}`);
  }
}

probarSistema();
