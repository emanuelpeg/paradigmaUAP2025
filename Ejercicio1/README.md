# Sistema de Biblioteca - Ejercicio POO

Este proyecto implementa un sistema básico de gestión de biblioteca usando programación orientada a objetos en TypeScript.

## Características

- ✅ Gestión de libros e inventario
- ✅ Registro de socios
- ✅ Sistema de préstamos con fechas de vencimiento
- ✅ Multas por devoluciones tardías
- ✅ Cola de espera para libros no disponibles
- ✅ Sistema de notificaciones
- ✅ Historial de lectura
- ✅ Recomendaciones básicas de libros
- ✅ Eventos de biblioteca

## Estructura del Proyecto

```
/clases
  ├── Autor.ts          # Información de autores
  ├── Biblioteca.ts     # Lógica principal del sistema
  ├── EventoBiblioteca.ts # Eventos y actividades
  ├── Libro.ts          # Gestión de libros y préstamos
  └── Socio.ts          # Información y funcionalidades de socios
index.ts                # Demostración del sistema
```

## Uso

```bash
# Instalar dependencias
npm install

# Ejecutar el proyecto
npm run dev

# Compilar TypeScript
npm run build
```

## Flujo de Trabajo Principal

1. **Agregar libros** al inventario de la biblioteca
2. **Registrar socios** en el sistema
3. **Retirar libros** (se verifica disponibilidad y multas)
4. **Devolver libros** (se calculan multas si hay retraso)
5. **Pagar multas** para poder retirar nuevos libros
6. **Sistema automático de notificaciones** y cola de espera

## Mejoras Implementadas

- Manejo robusto de errores
- Sistema de multas mejorado
- Cola de espera automática
- Notificaciones detalladas
- Validaciones completas
- Eliminación de dependencias circulares
