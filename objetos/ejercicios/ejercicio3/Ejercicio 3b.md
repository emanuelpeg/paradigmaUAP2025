# Sistema de Juego RPG - Ejercicio POO Compacto

## Descripción General

Los estudiantes crearán un sistema básico de juego RPG que demuestra los conceptos fundamentales de POO: encapsulamiento, composición, herencia y polimorfismo.

**Conceptos cubiertos:** Encapsulamiento, Composición, Herencia, Polimorfismo

---

## Parte 1: Clases Básicas y Composición

### Clase `Personaje`

- **Propiedades**: nombre, vida (máxima 100), ataque (base 10)
- **Métodos**: `atacar(objetivo)`, `recibirDanio(cantidad)`, `estaVivo()`
- **Encapsulamiento**: vida debe ser privada, solo modificable por métodos públicos

### Clase `Item`

- **Propiedades**: nombre, efecto (número que representa cuánto cura o daño hace)
- **Método abstracto**: `usar(personaje)` - cada subclase lo implementará diferente

### Composición: `Inventario`

- **Relación**: Cada `Personaje` TIENE un `Inventario`
- El inventario puede contener máximo 3 items
- **Métodos**: `agregarItem(item)`, `usarItem(nombre, personaje)`

### Clase `Juego`

- Esta clase manejara el juego en si y es la única clase externa

**Tarea 1**: Implementar estas clases y demostrar que un personaje puede usar items de su inventario para curarse.

---

## Parte 2: Herencia y Polimorfismo

### Jerarquía de Items (Herencia)

**Clase base**: `Item` (ya implementada)

**Subclases**:

- **`Pocion`**: implementa `usar()` para curar al personaje
- **`Arma`**: implementa `usar()` para aumentar temporalmente el ataque del personaje

### Jerarquía de Personajes (Polimorfismo)

**Clase base**: `Personaje` (ya implementada, ahora será abstracta)

**Subclases**:

- **`Guerrero`**: 120 vida, 15 ataque, método `atacar()` hace daño fijo
- **`Mago`**: 80 vida, 10 ataque, método `atacar()` hace daño variable (50%-150%)
- **`Arquero`**: 100 vida, 20 ataque, método `atacar()` tiene 20% probabilidad de fallar

**Tarea 2**:

1. Implementar las subclases de personajes con diferentes comportamientos de ataque
2. Crear un array con diferentes tipos de personajes
3. Demostrar polimorfismo: hacer que todos ataquen a un objetivo usando el mismo método

---

## Parte 3: Sistema de Combate

### Clase `Juego`

- **Método**: `combateSimple(personaje1: Personaje, personaje2: Personaje)`
- Los personajes se atacan por turnos hasta que uno muera
- Debe funcionar con cualquier tipo de personaje (polimorfismo)
- Retorna el nombre del ganador

- **Método**: `combate(personajes: Personaje[])`
- Funciona como el combate simple, pero hay mas de 2 personajes
- Se termina cuando queda 1 vivo
- Retorna el nombre del ganador
- El mago puede atacar hasta a 3 enemigos con 1 sola llamada a atacar (pensar como deberían ser los parámetros)

**Tarea 3**: Implementar el sistema de combate y probar con diferentes combinaciones de personajes.

---

## Demostración Final (20 minutos)

Crear un programa que demuestre:

1. **Encapsulamiento**: Intentar modificar la vida directamente (debe fallar), no se debe poder sobrescribir el inventario
2. **Composición**: Personajes usando items de su inventario
3. **Herencia**: Items y personajes de diferentes tipos funcionando
4. **Polimorfismo**: Array de personajes mixtos atacando

Ejemplo de demostración:

```typescript
// Crear personajes de diferentes tipos
const guerrero = new Guerrero("Arthas");
const mago = new Mago("Gandalf");
const arquero = new Arquero("Legolas");

// Demostrar composición: agregar items al inventario
guerrero.inventario.agregarItem(new Pocion("Vida", 30));
mago.inventario.agregarItem(new Arma("Bastón", 5));

// Demostrar polimorfismo: todos atacan igual pero actúan diferente
const personajes = [guerrero, mago, arquero];
for (const personaje of personajes) {
  personaje.atacar(objetivo);
}

// Sistema de combate
const ganador = juego.combate(guerrero, mago);
```

## Parte 4: Cambio de esquema

Se introducen 3 tipos de objetos: Pergamino de guerrero, pergamino de mago y pergamino de arquero.
Cuando un personaje usa estos objetos en el medio de un combate, cambia su tipo de personaje al nuevo seleccionado.
Agregar esta funcionalidad y que todo lo demas siga funcionando.
