# Sistema de Juego RPG - Ejercicio POO

## Descripción del Problema

Necesitamos crear un sistema para simular combates en un juego de rol (RPG). El sistema debe manejar diferentes tipos de personajes que pueden luchar entre sí, usar objetos para mejorar sus habilidades, y determinar ganadores en combates.

**Conceptos a demostrar:** Encapsulamiento, Composición, Herencia, Polimorfismo

---

## Requerimientos del Sistema

### Funcionalidad Básica Requerida

El sistema debe poder:

1. **Crear personajes** con nombres únicos y características específicas
2. **Manejar combates** entre personajes hasta que solo quede uno vivo
3. **Permitir el uso de objetos** que modifiquen las habilidades de los personajes
4. **Soportar diferentes tipos de personajes** con comportamientos únicos de combate
5. **Gestionar inventarios** donde los personajes puedan almacenar y usar objetos

### Reglas del Juego

**Combate:**

- Los personajes se atacan por turnos
- Un personaje muere cuando su vida llega a 0
- El combate termina cuando solo queda un personaje vivo

**Personajes:**

- Cada personaje tiene un nombre, vida inicial y capacidad de ataque
- Los personajes no pueden tener vida negativa
- Los personajes pueden usar objetos de su inventario

**Objetos:**

- Los personajes pueden llevar máximo 3 objetos
- Existen objetos que curan vida y objetos que mejoran el ataque
- Los objetos se consumen al usarse

**Tipos de Personajes (comportamientos diferentes):**

- **Guerrero**: Ataque consistente y predecible
- **Mago**: Ataque variable, a veces más fuerte, a veces más débil. Puede atacar múltiples objetivos simultáneamente
- **Arquero**: Ataque poderoso pero puede fallar ocasionalmente

---

## Desafíos de Diseño

### 1. Identificación de Entidades

**Pregunta clave:** ¿Qué "cosas" (sustantivos) existen en este sistema?

- ¿Qué entidades principales necesitas para representar el problema?
- ¿Qué relaciones existen entre estas entidades?
- ¿Cuáles de estas entidades pueden tener subtipos?

### 2. Definición de Responsabilidades

**Pregunta clave:** ¿Qué puede hacer cada entidad?

- ¿Qué acciones puede realizar cada tipo de entidad?
- ¿Qué información debe mantener cada entidad?
- ¿Cómo se comunican las entidades entre sí?

### 3. Aplicación de Conceptos POO

**Encapsulamiento:**

- ¿Qué información debe mantenerse privada?
- ¿Qué operaciones deben estar controladas?
- ¿Cómo evitar que se modifique el estado de manera inválida?

**Composición:**

- ¿Qué entidades "contienen" o "tienen" otras entidades?
- ¿Cuáles son las relaciones de "parte-todo"?

**Herencia:**

- ¿Qué entidades comparten características comunes?
- ¿Dónde puedes reutilizar código mediante herencia?
- ¿Qué comportamientos base pueden ser especializados?

**Polimorfismo:**

- ¿Dónde diferentes tipos deben responder al mismo mensaje de manera distinta?
- ¿Cómo manejar colecciones de objetos de diferentes tipos de manera uniforme?

---

## Especificaciones Técnicas Mínimas

### Valores Sugeridos (pueden ajustarse según tu diseño)

- Vida inicial: entre 80-120 puntos según el tipo
- Ataque base: entre 10-20 puntos según el tipo
- Capacidad de inventario: 3 objetos máximo

### Items

- Efecto de curación: 20-40 puntos
- Mejora de ataque: 5-10 puntos adicionales

### Casos de Prueba Obligatorios

Tu sistema debe poder ejecutar escenarios como:

1. Crear personajes de diferentes tipos
2. Intentar acceder/modificar propiedades que deberían ser privadas
3. Agregar objetos al inventario y usarlos
4. Combate simple entre dos personajes
5. Combate grupal con múltiples personajes
6. Demostrar que personajes de diferentes tipos atacan de manera distinta

---

**Tarea 1**: Implementar las clases y demostrar que un personaje puede usar items de su inventario para curarse.

**Tarea 2**:

1. Implementar las subclases de personajes con diferentes comportamientos de ataque
2. Crear un array con diferentes tipos de personajes
3. Demostrar polimorfismo: hacer que todos ataquen a un objetivo usando el mismo método

## **Tarea 3**: Implementar el sistema de combate y probar con diferentes combinaciones de personajes.

## Pistas para Empezar

1. **Comienza identificando los sustantivos** en la descripción del problema
2. **Luego identifica los verbos** (acciones) asociados a cada sustantivo
3. **Busca patrones** de comportamiento similar entre entidades
4. **Piensa en las relaciones** entre entidades (¿quién contiene qué?)
5. **Considera la flexibilidad** del diseño para futuras extensiones
