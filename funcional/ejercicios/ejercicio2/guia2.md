# Guía de Ejercicios - Programación Funcional en Elm

## Introducción

Esta guía presenta ejercicios para practicar programación funcional en Elm, enfocándose en el trabajo con listas y funciones de orden superior. Todos los ejercicios deben implementarse usando **funciones puras** y aprovechando las características de la programación funcional.

### Conceptos importantes:

- Trabajamos con `List Int` en lugar de arrays mutables
- Las funciones que podrían fallar devuelven valores por defecto (0) en lugar de usar Maybe
- Las funciones deben ser puras (sin efectos secundarios)
- Aprovechá las funciones de orden superior de Elm como `List.map`, `List.filter`, `List.foldl`

---

## Ejercicio 1: Búsqueda Genérica

**Consigna:** Implementá una función que busque en una lista usando una función de comparación.

**Firma:**
```elm
buscar : List Int -> (Int -> Int -> Bool) -> Int
```

**Ejemplos:**
- `buscar [1,2,3,4,5] (\a b -> a > b)` debería encontrar el máximo
- `buscar [1,2,3,4,5] (\a b -> a < b)` debería encontrar el mínimo

**Pistas:**
- Usá `List.foldl` o recursión con pattern matching
- Devolvé 0 si la lista está vacía

---

## Ejercicio 2: Máximo y Mínimo

**Consigna:** Implementá funciones para encontrar el máximo y mínimo de una lista.

**Firmas:**
```elm
max : List Int -> Int
min : List Int -> Int
```

**Ejemplos:**
- `max [1,2,3,4,5]` debería retornar `5`
- `min [1,2,3,4,5]` debería retornar `1`
- `max []` debería retornar `0`

**Pistas:**
- Podés usar la función `buscar` que implementaste antes
- Devolvé 0 para listas vacías

---

## Ejercicio 3: Filtros por Umbral

**Consigna:** Implementá funciones que filtren elementos mayores o menores que un valor dado.

**Firmas:**
```elm
maximos : List Int -> Int -> List Int
minimos : List Int -> Int -> List Int
```

**Ejemplos:**
- `maximos [1,2,3,4,5] 3` debería retornar `[4,5]`
- `minimos [1,2,3,4,5] 3` debería retornar `[1,2]`

**Pistas:**
- Usá `List.filter` con las condiciones apropiadas

---

## Ejercicio 4: QuickSort

**Consigna:** Implementá el algoritmo de ordenamiento quicksort.

**Firma:**
```elm
quickSort : List Int -> List Int
```

**Ejemplos:**
- `quickSort [3,1,4,1,5,9,2,6]` debería retornar `[1,1,2,3,4,5,6,9]`

**Pistas:**
- Caso base: lista vacía retorna lista vacía
- Elegí un pivot (primer elemento)
- Dividí el resto en menores y mayores que el pivot
- Aplicá quickSort recursivamente a ambas particiones
- Concatená: `(menores ordenados) ++ [pivot] ++ (mayores ordenados)`

---

## Ejercicio 5: Acceso por Índice

**Consigna:** Implementá una función que obtenga un elemento en una posición específica.

**Firma:**
```elm
obtenerElemento : List Int -> Int -> Int
```

**Ejemplos:**
- `obtenerElemento [1,2,3,4,5] 2` debería retornar `3`
- `obtenerElemento [1,2,3] 5` debería retornar `0`

**Pistas:**
- Implementá con recursión y pattern matching
- Devolvé 0 si la posición está fuera de rango

---

## Ejercicio 6: Mediana

**Consigna:** Implementá una función que calcule la mediana de una lista.

**Firma:**
```elm
mediana : List Int -> Int
```

**Ejemplos:**
- `mediana [1,3,5]` debería retornar `3`
- `mediana [1,2,3,4]` debería retornar `2` o `3`
- `mediana []` debería retornar `0`

**Pistas:**
- Primero ordená la lista usando `quickSort`
- Si la longitud es impar, tomá el elemento del medio
- Si es par, podés tomar cualquiera de los dos del medio
- Devolvé 0 para listas vacías

---

## Ejercicio 7: Contar y Acumular

**Consigna:** Implementá funciones básicas para contar elementos y sumar todos los valores.

**Firmas:**
```elm
contar : List Int -> Int
acc : List Int -> Int
```

**Ejemplos:**
- `contar [1,2,3,4,5]` debería retornar `5`
- `acc [1,2,3,4,5]` debería retornar `15`

**Pistas:**
- Para contar: usá `List.length` o recursión manual
- Para acumular: usá `List.sum` o `List.foldl`

---

## Ejercicio 8: Filtrado Genérico

**Consigna:** Implementá una función de filtrado genérica y usala para casos específicos.

**Firmas:**
```elm
filtrar : List Int -> (Int -> Bool) -> List Int
filtrarPares : List Int -> List Int
filtrarMultiplosDeTres : List Int -> List Int
```

**Ejemplos:**
- `filtrarPares [1,2,3,4,5,6]` debería retornar `[2,4,6]`
- `filtrarMultiplosDeTres [1,2,3,6,9,10]` debería retornar `[3,6,9]`

**Pistas:**
- `filtrar` es básicamente `List.filter`
- Para números pares: `modBy 2 x == 0`
- Para múltiplos de 3: `modBy 3 x == 0`

---

## Ejercicio 9: Acumulación con Transformación

**Consigna:** Implementá una función que acumule aplicando una transformación a cada elemento.

**Firmas:**
```elm
acumular : List Int -> (Int -> Int) -> Int
acumularUnidad : List Int -> Int
acumularDoble : List Int -> Int
acumularCuadrado : List Int -> Int
```

**Ejemplos:**
- `acumularDoble [1,2,3]` debería retornar `12` (2+4+6)
- `acumularCuadrado [1,2,3]` debería retornar `14` (1+4+9)

**Pistas:**
- Usá `List.map` seguido de `List.sum`
- O usá `List.foldl` aplicando la transformación en cada paso

---

## Ejercicio 10: Operaciones con Listas

**Consigna:** Implementá funciones para unir listas y transformar elementos.

**Firmas:**
```elm
unir : List Int -> List Int -> List Int
transformar : List Int -> (Int -> a) -> List a
existe : List Int -> Int -> Bool
```

**Ejemplos:**
- `unir [1,2] [3,4]` debería retornar `[1,2,3,4]`
- `transformar [1,2,3] (\x -> x * 2)` debería retornar `[2,4,6]`
- `existe [1,2,3] 2` debería retornar `True`

**Pistas:**
- Para unir: usá `List.append` o el operador `(++)`
- Para transformar: usá `List.map`
- Para existe: usá `List.member` o `List.any`

---

## Ejercicio 11: Unión sin Duplicados

**Consigna:** Implementá una función que una dos listas eliminando duplicados.

**Firmas:**
```elm
unirOfSet : List Int -> List Int -> List Int
removerDuplicados : List Int -> List Int
```

**Ejemplos:**
- `unirOfSet [1,2,3] [2,3,4]` debería retornar `[1,2,3,4]`

**Pistas:**
- Primero uní las listas con `unir`
- Después removí duplicados usando `List.foldl` con `List.member`

---

## Ejercicios Opcionales

### Subconjuntos
**Consigna:** Generá todos los posibles subconjuntos de una lista.

**Firma:**
```elm
subSets : List Int -> List (List Int)
```

**Ejemplo:**
- `subSets [1,2,3]` debería retornar `[[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]`

### Dividir en Grupos
**Consigna:** Dividí una lista en grupos de tamaño n.

**Firmas:**
```elm
cortar : List Int -> Int -> List (List Int)
tomar : Int -> List a -> List a
saltar : Int -> List a -> List a
```

**Ejemplo:**
- `cortar [1,2,3,4,5] 2` debería retornar `[[1,2], [3,4], [5]]`

---

## Funciones Auxiliares Útiles

Para implementar los ejercicios, te van a ser útiles estas funciones de Elm:

- `List.map` - aplica una función a cada elemento
- `List.filter` - filtra elementos según un predicado
- `List.foldl` - reduce una lista a un valor
- `List.append` o `(++)` - concatena listas
- `List.member` - verifica si un elemento está en la lista
- `List.length` - obtiene la longitud de la lista
- `List.head` - obtiene el primer elemento
- `List.tail` - obtiene todos los elementos excepto el primero
- `List.take` - toma los primeros n elementos
- `List.drop` - descarta los primeros n elementos

---

## Consejos

- Empezá con los ejercicios más simples y avanzá gradualmente
- Usá el REPL de Elm para probar tus funciones
- Aprovechá el sistema de tipos de Elm para detectar errores temprano
- No tengas miedo de usar funciones auxiliares para dividir problemas complejos

¡Éxito con la programación funcional!