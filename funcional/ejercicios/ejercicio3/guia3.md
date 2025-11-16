# Guía de Ejercicios - Programación Funcional en Elm

## Introducción

Esta guía presenta ejercicios para practicar programación funcional en Elm, enfocándose en el trabajo con listas y funciones de orden superior. Todos los ejercicios deben implementarse usando **funciones puras** y aprovechando las características de la programación funcional.

### Conceptos importantes:

- Trabajamos con `List Int` en lugar de arrays mutables
- Las funciones que podrían fallar devuelven valores por defecto (0) en lugar de usar Maybe
- Las funciones deben ser puras (sin efectos secundarios)

---

## Parte 0: Implementaciones Personalizadas

Antes de usar las funciones de orden superior de Elm, implementá tus propias versiones usando recursión. Esto te ayudará a entender cómo funcionan internamente.

**1. Map Personalizado**: Implementá tu propia versión de map usando recursión y las funciones genéricas `head`, `tail` e `isEmpty`.

```elm
miMap : (a -> b) -> List a -> List b
-- Debe comportarse exactamente como List.map
-- Ejemplo: miMap (\x -> x * 2) [1, 2, 3] == [2, 4, 6]
```

**2. Filter Personalizado**: Implementá tu propia versión de filter usando recursión.

```elm
miFiltro : (a -> Bool) -> List a -> List a
-- Debe comportarse exactamente como List.filter
-- Ejemplo: miFiltro (\x -> x > 2) [1, 2, 3, 4] == [3, 4]
```

**3. Foldl Personalizado**: Implementá tu propia versión de foldl usando recursión.

```elm
miFoldl : (a -> b -> b) -> b -> List a -> b
-- Debe comportarse exactamente como List.foldl
-- Ejemplo: miFoldl (+) 0 [1, 2, 3] == 6
```

---

## Parte 1: Entendiendo Map

**Concepto**: `map` transforma cada elemento en una lista usando una función.

**Firma**: `List.map : (a -> b) -> List a -> List b`

### Ejercicios

**4. Duplicar Números**: Escribí una función que duplique cada número en una lista.

```elm
duplicar : List Int -> List Int
-- Ejemplo: duplicar [1, 2, 3] == [2, 4, 6]
```

**5. Longitudes de Strings**: Convertí una lista de strings a una lista de sus longitudes.

```elm
longitudes : List String -> List Int
-- Ejemplo: longitudes ["hola", "chau"] == [4, 4]
```

**6. Incrementar Todos**: Sumá 1 a cada número en una lista.

```elm
incrementarTodos : List Int -> List Int
-- Ejemplo: incrementarTodos [1, 2, 3] == [2, 3, 4]
```

**7. A Mayúsculas**: Convertí todos los strings de una lista a mayúsculas.

```elm
todasMayusculas : List String -> List String
-- Ejemplo: todasMayusculas ["hola", "chau"] == ["HOLA", "CHAU"]
```

**8. Negar Booleanos**: Invertí todos los valores booleanos en una lista.

```elm
negarTodos : List Bool -> List Bool
-- Ejemplo: negarTodos [True, False, True] == [False, True, False]
```

---

## Parte 2: Entendiendo Filter

**Concepto**: `filter` mantiene solo los elementos que satisfacen una condición (predicado).

**Firma**: `List.filter : (a -> Bool) -> List a -> List a`

### Ejercicios

**9. Números Pares**: Mantené solo los números pares de una lista.

```elm
pares : List Int -> List Int
-- Ejemplo: pares [1, 2, 3, 4, 5] == [2, 4]
```

**10. Números Positivos**: Mantené solo los números positivos.

```elm
positivos : List Int -> List Int
-- Ejemplo: positivos [-1, 2, -3, 4] == [2, 4]
```

**11. Strings Largos**: Mantené solo los strings con más de 5 caracteres.

```elm
stringsLargos : List String -> List String
-- Ejemplo: stringsLargos ["hola", "buenos dias", "mundo"] == ["buenos dias", "mundo"]
```

**12. Remover Falsos**: Remové todos los valores `False` de una lista de booleanos.

```elm
soloVerdaderos : List Bool -> List Bool
-- Ejemplo: soloVerdaderos [True, False, True] == [True, True]
```

**13. Mayor Que**: Filtrá números mayores que un valor dado.

```elm
mayoresQue : Int -> List Int -> List Int
-- Ejemplo: mayoresQue 3 [1, 2, 3, 4, 5] == [4, 5]
```

---

## Parte 3: Entendiendo Fold (foldl y foldr)

**Concepto**: `fold` reduce una lista a un único valor aplicando una función repetidamente.

**Firmas**:

- `List.foldl : (a -> b -> b) -> b -> List a -> b`
- `List.foldr : (a -> b -> b) -> b -> List a -> b`

### Ejercicios

**14. Suma con Fold**: Implementá suma usando `List.foldl`.

```elm
sumaFold : List Int -> Int
-- Ejemplo: sumaFold [1, 2, 3, 4] == 10
```

**15. Producto**: Multiplicá todos los números de una lista entre sí.

```elm
producto : List Int -> Int
-- Ejemplo: producto [2, 3, 4] == 24
```

**16. Contar con Fold**: Implementá contar usando `List.foldl`.

```elm
contarFold : List a -> Int
-- Ejemplo: contarFold [1, 2, 3] == 3
```

**17. Concatenar Strings**: Uní todos los strings de una lista.

```elm
concatenar : List String -> String
-- Ejemplo: concatenar ["Hola", " ", "Mundo"] == "Hola Mundo"
```

**18. Valor Máximo**: Encontrá el valor máximo en una lista de números (devolvé 0 para lista vacía).

```elm
maximo : List Int -> Int
-- Ejemplo: maximo [3, 1, 4, 1, 5] == 5
```

**19. Invertir con Fold**: Invertí una lista usando `List.foldl`.

```elm
invertirFold : List a -> List a
-- Ejemplo: invertirFold [1, 2, 3] == [3, 2, 1]
```

**20. Todos Verdaderos**: Verificá si todos los elementos de una lista satisfacen una condición.

```elm
todos : (a -> Bool) -> List a -> Bool
-- Ejemplo: todos (\x -> x > 0) [1, 2, 3] == True
-- Ejemplo: todos (\x -> x > 0) [1, -2, 3] == False
```

**21. Alguno Verdadero**: Verificá si al menos un elemento satisface una condición.

```elm
alguno : (a -> Bool) -> List a -> Bool
-- Ejemplo: alguno (\x -> x > 5) [1, 2, 6] == True
```

---

## Parte 4: Combinando Operaciones

**22. Suma de Cuadrados**: Calculá la suma de los cuadrados de todos los números.

```elm
sumaDeCuadrados : List Int -> Int
-- Ejemplo: sumaDeCuadrados [1, 2, 3] == 14 (1² + 2² + 3²)
```

**23. Contar Números Pares**: Contá cuántos números pares hay en una lista.

```elm
contarPares : List Int -> Int
-- Ejemplo: contarPares [1, 2, 3, 4, 5] == 2
```

**24. Promedio**: Calculá el promedio de una lista de números (devolvé 0 para lista vacía).

```elm
promedio : List Float -> Float
-- Ejemplo: promedio [1.0, 2.0, 3.0] == 2.0
```

**25. Palabras a Longitudes**: Dada una oración (string), dividila en palabras y devolvé sus longitudes.

```elm
longitudesPalabras : String -> List Int
-- Ejemplo: longitudesPalabras "hola mundo" == [4, 5]
-- Pista: Usá String.words para dividir un string
```

**26. Remover Palabras Cortas**: Mantené solo las palabras con más de 3 caracteres de una oración.

```elm
palabrasLargas : String -> List String
-- Ejemplo: palabrasLargas "Yo estoy aprendiendo Elm" == ["estoy", "aprendiendo"]
```

**27. Sumar Números Positivos**: Sumá solo los números positivos de una lista.

```elm
sumarPositivos : List Int -> Int
-- Ejemplo: sumarPositivos [1, -2, 3, -4, 5] == 9
```

**28. Duplicar Pares**: Duplicá solo los números pares de una lista, mantené los impares sin cambios.

```elm
duplicarPares : List Int -> List Int
-- Ejemplo: duplicarPares [1, 2, 3, 4] == [1, 4, 3, 8]
```

---

## Parte 5: Desafíos Avanzados

**29. Aplanar**: Aplaná una lista de listas en una única lista.

```elm
aplanar : List (List a) -> List a
-- Ejemplo: aplanar [[1, 2], [3, 4], [5]] == [1, 2, 3, 4, 5]
```

**30. Agrupar Por**: Agrupá elementos por una función clave (devolvé lista de listas).

```elm
agruparPor : (a -> a -> Bool) -> List a -> List (List a)
-- ¡Esto es desafiante! Agrupá elementos iguales consecutivos juntos
-- Ejemplo: agruparPor (==) [1, 1, 2, 2, 3, 1] == [[1, 1], [2, 2], [3], [1]]
```

**31. Particionar**: Separá una lista en dos listas basándote en un predicado.

```elm
particionar : (a -> Bool) -> List a -> (List a, List a)
-- Ejemplo: particionar (\x -> x > 3) [1, 2, 3, 4, 5] == ([4, 5], [1, 2, 3])
```

**32. Suma Acumulada**: Creá una lista de sumas acumuladas.

```elm
sumaAcumulada : List Int -> List Int
-- Ejemplo: sumaAcumulada [1, 2, 3, 4] == [1, 3, 6, 10]
```

---

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

## Bonus: Entendiendo Fold Izquierdo vs Derecho

**Pregunta**: ¿Cuál es la diferencia entre `foldl` y `foldr`?

Probá este ejercicio para verlo:

```elm
-- Usando foldl
List.foldl (::) [] [1, 2, 3]  -- ¿Qué obtenés?

-- Usando foldr
List.foldr (::) [] [1, 2, 3]  -- ¿Qué obtenés?
```

¡Experimentá y explicá la diferencia con tus propias palabras!
