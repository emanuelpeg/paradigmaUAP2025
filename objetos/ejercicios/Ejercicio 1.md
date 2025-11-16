# Sistema de Gestión de Biblioteca - Ejercicio de Programación Orientada a Objetos

## Descripción del Ejercicio

En clase desarrollamos un sistema básico de gestión de biblioteca que maneja libros, socios y operaciones de préstamo/devolución. El sistema implementa tres clases principales:

- **Libro**: Maneja información del libro (título, autor, ISBN) y su estado de disponibilidad
- **Socio**: Representa a los miembros de la biblioteca con sus libros prestados
- **Biblioteca**: Coordina las operaciones entre libros y socios

El sistema permite agregar libros y socios, realizar préstamos, devoluciones, y consultar el estado de los libros y socios.

---

## Extensiones para Resolver como Tarea

### Tarea 1: Sistema de Reservas

Implementá un sistema de reservas para libros que ya están prestados. Los socios pueden reservar un libro y ser notificados cuando esté disponible. La biblioteca debe manejar una cola de reservas por libro.

### Tarea 2: Cálculo de Multas

Agregá funcionalidad para calcular multas por libros vencidos. Cada día de retraso genera una multa de $50. Los socios con multas pendientes no pueden tomar nuevos libros prestados hasta saldar su deuda.

### Tarea 3: Gestión de Autores

Agregá una clase `Autor` con propiedades como nombre, biografía y año de nacimiento. Los libros deben referenciar objetos Autor en lugar de guardar el nombre del autor como string. Incluí métodos para encontrar todos los libros de un autor específico.

### Tarea 4: Eventos y Notificaciones

Creá una clase `EventoBiblioteca` para clubes de lectura, charlas de autores, etc. Agregá un sistema de notificaciones donde los socios puedan ser notificados sobre libros vencidos, reservas disponibles, o eventos próximos en los que están registrados.

### Tarea 5: Historial de Lectura y Recomendaciones

Agregá funcionalidad para rastrear el historial completo de lectura de cada socio. Implementá un sistema simple de recomendaciones que sugiera libros basándose en autores o títulos similares a los que el socio ha leído anteriormente.
