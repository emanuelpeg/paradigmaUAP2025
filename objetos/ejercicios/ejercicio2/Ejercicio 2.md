Vamos a extender la aplicación de la biblioteca.

Tarea 1 (Ya resuelto):
Multiples tipos de socios. Nuestro sistema debe poder soportar multiples tipos de socios, con distintos permisos.

- SocioRegular: Hereda de Usuario, máximo 3 libros, período estándar
- SocioVIP: Hereda de Usuario, máximo 5 libros, período extendido, sin multas
- Empleado: Hereda de Usuario, acceso ilimitado, puede acceder a libros de referencia
- Visitante: Hereda de Usuario, solo puede consultar catálogo, no puede pedir prestado

Tarea 2:
Polimorfismo con Tipos de Préstamo
Implementá diferentes tipos de préstamo usando herencia:

Clase base Prestamo: Con métodos abstractos calcularVencimiento() y calcularMulta()
PrestamoRegular: 14 días, multa estándar
PrestamoCorto: 7 días, multa doble
PrestamoReferencia: Solo consulta en biblioteca, sin llevar
PrestamoDigital: Sin límite de tiempo, sin multa

La biblioteca debe manejar todos los tipos de préstamo de manera uniforme usando polimorfismo.

Tarea 3:
Patrón Strategy con Políticas de Préstamo
Implementá diferentes políticas de préstamo usando el patrón Strategy:

PoliticaEstricta: No permite préstamos si hay libros vencidos
PoliticaFlexible: Permite préstamos pero con período reducido si hay vencidos
PoliticaEstudiante: Período extendido durante épocas de exámenes
PoliticaDocente: Préstamos de larga duración y múltiples renovaciones

La biblioteca debe poder cambiar de política dinámicamente según el contexto.

Tarea 4:
Interfaces y Polimorfismo - Sistemas de Búsqueda
Definí una interfaz IBuscable con métodos buscarPor(criterio) y filtrar(condicion). Implementala en:

CatalogoBiblioteca: Busca en libros físicos
BibliotecaDigital: Busca en recursos online
ArchivoHistorico: Busca en documentos antiguos
BaseConocimiento: Busca en artículos académicos

Creá un BuscadorUniversal que pueda buscar en cualquier sistema que implemente IBuscable.
Pista: estos buscadores estan dentro de la biblioteca
