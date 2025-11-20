# Guía de Ejercicios - Pattern Matching y Mónadas con Árboles Binarios

## Introducción

Esta guía presenta ejercicios para practicar **pattern matching** y **mónadas** en Elm, usando **árboles binarios** como estructura de datos principal. Aprenderás a:

- Trabajar con tipos algebraicos y pattern matching
- Manejar operaciones que pueden fallar con `Maybe`
- Proporcionar errores descriptivos con `Result`
- Encadenar operaciones con `andThen` (bind monádico)
- Combinar diferentes mónadas en pipelines de transformación

### Conceptos importantes:

- **Pattern Matching**: Destructurar datos según su forma
- **Maybe**: Representa valores opcionales (`Just valor` o `Nothing`)
- **Result**: Representa operaciones que pueden fallar (`Ok valor` o `Err mensaje`)
- **andThen**: Encadena operaciones monádicas (también conocido como `>>=` o bind)

---

## Parte 0: Definición del Árbol Binario

Antes de comenzar, vamos a definir nuestro tipo de dato árbol binario:

```elm
type Tree a
    = Empty
    | Node a (Tree a) (Tree a)
```

Un árbol puede ser:
- `Empty`: Un árbol vacío (caso base)
- `Node valor izquierdo derecho`: Un nodo con un valor y dos subárboles

### Ejercicios de Construcción

**1. Crear Árboles de Ejemplo**

Creá los siguientes árboles usando la definición anterior:

```elm
-- Un árbol vacío
arbolVacio : Tree Int

-- Un árbol con un solo nodo (hoja)
arbolHoja : Tree Int
-- Ejemplo:     5

-- Un árbol pequeño
arbolPequeno : Tree Int
-- Ejemplo:
--      3
--     / \
--    1   5

-- Un árbol mediano
arbolMediano : Tree Int
-- Ejemplo:
--        10
--       /  \
--      5    15
--     / \   / \
--    3  7 12  20
```

**2. Es Vacío**

Escribí una función que determine si un árbol está vacío.

```elm
esVacio : Tree a -> Bool
-- Ejemplo: esVacio Empty == True
-- Ejemplo: esVacio (Node 5 Empty Empty) == False
```

**3. Es Hoja**

Escribí una función que determine si un árbol es una hoja (nodo sin hijos).

```elm
esHoja : Tree a -> Bool
-- Ejemplo: esHoja (Node 5 Empty Empty) == True
-- Ejemplo: esHoja (Node 5 (Node 3 Empty Empty) Empty) == False
```

---

## Parte 1: Pattern Matching con Árboles

El pattern matching nos permite escribir funciones recursivas de forma clara y concisa.

### Ejercicios Básicos

**4. Tamaño del Árbol**

Contá cuántos nodos tiene un árbol.

```elm
tamaño : Tree a -> Int
-- Ejemplo: tamaño Empty == 0
-- Ejemplo: tamaño (Node 5 Empty Empty) == 1
-- Ejemplo: tamaño arbolPequeno == 3
```

**5. Altura del Árbol**

Calculá la altura de un árbol (la distancia del nodo raíz a la hoja más lejana).

```elm
altura : Tree a -> Int
-- Un árbol vacío tiene altura 0
-- Una hoja tiene altura 1
-- Ejemplo: altura Empty == 0
-- Ejemplo: altura (Node 5 Empty Empty) == 1
-- Ejemplo: altura arbolPequeno == 2
```

**6. Suma de Valores**

Sumá todos los valores de un árbol de enteros.

```elm
sumarArbol : Tree Int -> Int
-- Ejemplo: sumarArbol Empty == 0
-- Ejemplo: sumarArbol (Node 5 (Node 3 Empty Empty) (Node 7 Empty Empty)) == 15
```

**7. Contiene Valor**

Verificá si un valor existe en el árbol.

```elm
contiene : a -> Tree a -> Bool
-- Ejemplo: contiene 5 arbolPequeno == True
-- Ejemplo: contiene 10 arbolPequeno == False
```

**8. Contar Hojas**

Contá cuántas hojas tiene un árbol.

```elm
contarHojas : Tree a -> Int
-- Ejemplo: contarHojas Empty == 0
-- Ejemplo: contarHojas (Node 5 Empty Empty) == 1
-- Ejemplo: contarHojas arbolPequeno == 2
```

**9. Valor Mínimo (sin Maybe)**

Encontrá el valor mínimo en un árbol. Si el árbol está vacío, devolvé 0.

```elm
minimo : Tree Int -> Int
-- Ejemplo: minimo Empty == 0
-- Ejemplo: minimo arbolPequeno == 1
```

**10. Valor Máximo (sin Maybe)**

Encontrá el valor máximo en un árbol. Si el árbol está vacío, devolvé 0.

```elm
maximo : Tree Int -> Int
-- Ejemplo: maximo Empty == 0
-- Ejemplo: maximo arbolPequeno == 5
```

---

## Parte 2: Introducción a Maybe (Búsquedas que Pueden Fallar)

`Maybe` representa valores opcionales. Es perfecto para búsquedas que pueden no encontrar nada.

```elm
type Maybe a
    = Just a    -- Contiene un valor
    | Nothing   -- No hay valor
```

### Ejercicios con Maybe

**11. Buscar Valor**

Buscá un valor en el árbol. Si existe, devolvé `Just valor`, sino `Nothing`.

```elm
buscar : a -> Tree a -> Maybe a
-- Ejemplo: buscar 5 arbolPequeno == Just 5
-- Ejemplo: buscar 10 arbolPequeno == Nothing
```

**12. Encontrar Mínimo (con Maybe)**

Encontrá el valor mínimo. Si el árbol está vacío, devolvé `Nothing`.

```elm
encontrarMinimo : Tree comparable -> Maybe comparable
-- Ejemplo: encontrarMinimo Empty == Nothing
-- Ejemplo: encontrarMinimo arbolPequeno == Just 1
```

**13. Encontrar Máximo (con Maybe)**

Encontrá el valor máximo. Si el árbol está vacío, devolvé `Nothing`.

```elm
encontrarMaximo : Tree comparable -> Maybe comparable
-- Ejemplo: encontrarMaximo Empty == Nothing
-- Ejemplo: encontrarMaximo arbolPequeno == Just 5
```

**14. Buscar Por Predicado**

Buscá el primer valor que satisfaga un predicado.

```elm
buscarPor : (a -> Bool) -> Tree a -> Maybe a
-- Ejemplo: buscarPor (\x -> x > 3) arbolPequeno == Just 5
-- Ejemplo: buscarPor (\x -> x > 10) arbolPequeno == Nothing
```

**15. Obtener Valor de Raíz**

Obtené el valor de la raíz del árbol.

```elm
raiz : Tree a -> Maybe a
-- Ejemplo: raiz Empty == Nothing
-- Ejemplo: raiz (Node 5 Empty Empty) == Just 5
```

### Encadenando Operaciones con andThen

`andThen` (o `Maybe.andThen`) permite encadenar operaciones que pueden fallar.

**Firma**: `andThen : (a -> Maybe b) -> Maybe a -> Maybe b`

**16. Obtener Hijo Izquierdo**

Escribí funciones para obtener el subárbol izquierdo y derecho.

```elm
hijoIzquierdo : Tree a -> Maybe (Tree a)
-- Ejemplo: hijoIzquierdo Empty == Nothing
-- Ejemplo: hijoIzquierdo (Node 5 (Node 3 Empty Empty) Empty) == Just (Node 3 Empty Empty)

hijoDerecho : Tree a -> Maybe (Tree a)
-- Similar al izquierdo
```

**17. Obtener Nieto**

Usá `andThen` para obtener el hijo izquierdo del hijo izquierdo.

```elm
nietoIzquierdoIzquierdo : Tree a -> Maybe (Tree a)
-- Pista: Usá andThen para encadenar hijoIzquierdo dos veces
-- Ejemplo: nietoIzquierdoIzquierdo arbolMediano == Just (Node 3 Empty Empty)
```

**18. Buscar en Profundidad**

Buscá un valor en el árbol y luego buscá otro valor en el subárbol encontrado.

```elm
-- Primero implementá esta función auxiliar:
obtenerSubarbol : a -> Tree a -> Maybe (Tree a)
-- Retorna el subárbol cuya raíz tiene el valor buscado

-- Luego úsala para implementar:
buscarEnSubarbol : a -> a -> Tree a -> Maybe a
-- buscarEnSubarbol valor1 valor2 arbol:
-- Busca valor1, y en ese subárbol busca valor2
```

---

## Parte 3: Result para Validaciones con Errores Descriptivos

`Result` es como `Maybe`, pero cuando falla te dice **por qué**.

```elm
type Result error value
    = Ok value           -- Operación exitosa
    | Err error          -- Operación falló con un error
```

### Ejercicios con Result

**19. Validar No Vacío**

Verificá que un árbol no esté vacío. Si está vacío, devolvé un error.

```elm
validarNoVacio : Tree a -> Result String (Tree a)
-- Ejemplo: validarNoVacio Empty == Err "El árbol está vacío"
-- Ejemplo: validarNoVacio (Node 5 Empty Empty) == Ok (Node 5 Empty Empty)
```

**20. Obtener Raíz con Error**

Obtené la raíz del árbol. Si está vacío, devolvé un mensaje de error.

```elm
obtenerRaiz : Tree a -> Result String a
-- Ejemplo: obtenerRaiz Empty == Err "No se puede obtener la raíz de un árbol vacío"
-- Ejemplo: obtenerRaiz (Node 5 Empty Empty) == Ok 5
```

**21. Dividir en Valor Raíz y Subárboles**

Dividí un árbol en su valor raíz y sus dos subárboles.

```elm
dividir : Tree a -> Result String (a, Tree a, Tree a)
-- Retorna una tupla (valor, izquierdo, derecho)
-- Ejemplo: dividir Empty == Err "No se puede dividir un árbol vacío"
-- Ejemplo: dividir (Node 5 (Node 3 Empty Empty) (Node 7 Empty Empty))
--          == Ok (5, Node 3 Empty Empty, Node 7 Empty Empty)
```

**22. Obtener Mínimo con Error**

Encontrá el mínimo, pero con un mensaje de error descriptivo si falla.

```elm
obtenerMinimo : Tree comparable -> Result String comparable
-- Ejemplo: obtenerMinimo Empty == Err "No hay mínimo en un árbol vacío"
-- Ejemplo: obtenerMinimo arbolPequeno == Ok 1
```

### Árbol Binario de Búsqueda (BST)

En un BST:
- Todos los valores del subárbol izquierdo son **menores** que la raíz
- Todos los valores del subárbol derecho son **mayores** que la raíz

**23. Verificar si es BST**

Verificá si un árbol es un BST válido.

```elm
esBST : Tree comparable -> Bool
-- Pista: Necesitás verificar que todos los valores a la izquierda sean menores
-- y todos los valores a la derecha sean mayores
-- Ejemplo: esBST (Node 5 (Node 3 Empty Empty) (Node 7 Empty Empty)) == True
-- Ejemplo: esBST (Node 5 (Node 7 Empty Empty) (Node 3 Empty Empty)) == False
```

**24. Insertar en BST**

Insertá un valor en un BST. Si el valor ya existe, devolvé un error.

```elm
insertarBST : comparable -> Tree comparable -> Result String (Tree comparable)
-- Ejemplo: insertarBST 4 arbolPequeno == Ok (Node 3 (Node 1 Empty Empty) (Node 5 (Node 4 Empty Empty) Empty))
-- Ejemplo: insertarBST 3 arbolPequeno == Err "El valor 3 ya existe en el árbol"
```

**25. Buscar en BST**

Buscá un valor en un BST de forma eficiente. Devolvé `Result` con error descriptivo.

```elm
buscarEnBST : comparable -> Tree comparable -> Result String comparable
-- Ejemplo: buscarEnBST 5 arbolPequeno == Ok 5
-- Ejemplo: buscarEnBST 10 arbolPequeno == Err "El valor 10 no se encuentra en el árbol"
```

**26. Validar BST con Result**

Verificá si un árbol es un BST válido. Si no lo es, explicá por qué.

```elm
validarBST : Tree comparable -> Result String (Tree comparable)
-- Ejemplo: validarBST arbolPequeno == Ok arbolPequeno
-- Ejemplo: validarBST (Node 5 (Node 7 Empty Empty) Empty)
--          == Err "Nodo con valor 7 viola la propiedad BST: debe ser menor que 5"
```

---

## Parte 4: Combinando Maybe y Result

A veces necesitamos convertir entre `Maybe` y `Result`, o combinar operaciones de ambas.

### Conversiones

**27. Maybe a Result**

Convertí un `Maybe` a `Result`, proporcionando un mensaje de error.

```elm
maybeAResult : String -> Maybe a -> Result String a
-- Ejemplo: maybeAResult "Error personalizado" Nothing == Err "Error personalizado"
-- Ejemplo: maybeAResult "Error" (Just 5) == Ok 5
```

**28. Result a Maybe**

Convertí un `Result` a `Maybe`, descartando el mensaje de error.

```elm
resultAMaybe : Result error value -> Maybe value
-- Ejemplo: resultAMaybe (Err "algo") == Nothing
-- Ejemplo: resultAMaybe (Ok 5) == Just 5
```

### Pipelines de Transformación

**29. Buscar y Validar**

Buscá un valor en un árbol y luego validá que sea positivo.

```elm
buscarPositivo : Int -> Tree Int -> Result String Int
-- Primero busca el valor, luego valida que sea > 0
-- Ejemplo: buscarPositivo 5 arbolPequeno == Ok 5
-- Ejemplo: buscarPositivo (-3) (Node (-3) Empty Empty) == Err "El valor -3 no es positivo"
-- Ejemplo: buscarPositivo 10 arbolPequeno == Err "El valor 10 no se encuentra en el árbol"
```

**30. Pipeline de Validaciones**

Realizá múltiples validaciones en secuencia sobre un árbol.

```elm
validarArbol : Tree Int -> Result String (Tree Int)
-- Valida que:
-- 1. No esté vacío
-- 2. Sea un BST válido
-- 3. Todos los valores sean positivos
-- Si alguna validación falla, retorna el error correspondiente
```

**31. Encadenar Búsquedas**

Buscá un valor, y si lo encontrás, usá ese valor para buscar en otro árbol.

```elm
buscarEnDosArboles : Int -> Tree Int -> Tree Int -> Result String Int
-- Busca 'valor' en arbol1, obtiene el resultado, y busca ese resultado en arbol2
-- Pista: Usa Result.andThen para encadenar las búsquedas
```

---

## Parte 5: Desafíos Avanzados

### Recorridos (Traversals)

Los recorridos visitan todos los nodos en un orden específico.

**32. Recorrido Inorder**

Recorrido: izquierdo → raíz → derecho (en BST da valores ordenados).

```elm
inorder : Tree a -> List a
-- Ejemplo: inorder arbolPequeno == [1, 3, 5]
```

**33. Recorrido Preorder**

Recorrido: raíz → izquierdo → derecho.

```elm
preorder : Tree a -> List a
-- Ejemplo: preorder arbolPequeno == [3, 1, 5]
```

**34. Recorrido Postorder**

Recorrido: izquierdo → derecho → raíz.

```elm
postorder : Tree a -> List a
-- Ejemplo: postorder arbolPequeno == [1, 5, 3]
```

### Transformaciones

**35. Map sobre Árbol**

Aplicá una función a todos los valores del árbol.

```elm
mapArbol : (a -> b) -> Tree a -> Tree b
-- Ejemplo: mapArbol (\x -> x * 2) arbolPequeno
--          == Node 6 (Node 2 Empty Empty) (Node 10 Empty Empty)
```

**36. Filter sobre Árbol**

Mantené solo los nodos que satisfagan un predicado. ¡Cuidado! Esto puede romper la estructura BST.

```elm
filterArbol : (a -> Bool) -> Tree a -> Tree a
-- Mantén solo los nodos donde el predicado es True
-- Ejemplo: filterArbol (\x -> x > 2) arbolPequeno == Node 3 Empty (Node 5 Empty Empty)
```

**37. Fold sobre Árbol**

Implementá fold para árboles (similar a List.foldl).

```elm
foldArbol : (a -> b -> b) -> b -> Tree a -> b
-- Usa recorrido inorder
-- Ejemplo: foldArbol (+) 0 arbolPequeno == 9
```

### BST Avanzado

**38. Eliminar de BST**

Eliminá un valor de un BST. Esta es una operación compleja que requiere manejar 3 casos:
1. Nodo es hoja
2. Nodo tiene un hijo
3. Nodo tiene dos hijos (reemplazar con el mínimo del subárbol derecho)

```elm
eliminarBST : comparable -> Tree comparable -> Result String (Tree comparable)
-- Ejemplo: eliminarBST 1 arbolPequeno == Ok (Node 3 Empty (Node 5 Empty Empty))
-- Ejemplo: eliminarBST 10 arbolPequeno == Err "El valor 10 no existe en el árbol"
```

**39. Construir BST desde Lista**

Creá un BST insertando todos los elementos de una lista.

```elm
desdeListaBST : List comparable -> Result String (Tree comparable)
-- Si hay valores duplicados, retorna un error
-- Ejemplo: desdeListaBST [3, 1, 5] == Ok arbolPequeno
-- Ejemplo: desdeListaBST [3, 1, 3] == Err "Valor duplicado: 3"
```

**40. Verificar Balance**

Un árbol está balanceado si la diferencia de altura entre subárboles no supera 1.

```elm
estaBalanceado : Tree a -> Bool
-- Ejemplo: estaBalanceado arbolPequeno == True
```

**41. Balancear BST**

Convertí un BST desbalanceado en uno balanceado.

```elm
balancear : Tree comparable -> Tree comparable
-- Pista: Convierte a lista ordenada (inorder), luego reconstruye balanceado
-- desde el elemento medio
```

### Path Finding

**42. Camino a un Valor**

Encontrá el camino desde la raíz hasta un valor (lista de direcciones).

```elm
type Direccion = Izquierda | Derecha

encontrarCamino : a -> Tree a -> Result String (List Direccion)
-- Ejemplo: encontrarCamino 1 arbolPequeno == Ok [Izquierda]
-- Ejemplo: encontrarCamino 5 arbolPequeno == Ok [Derecha]
-- Ejemplo: encontrarCamino 10 arbolPequeno == Err "El valor 10 no existe en el árbol"
```

**43. Seguir Camino**

Dado un camino, llegá al nodo correspondiente.

```elm
seguirCamino : List Direccion -> Tree a -> Result String a
-- Ejemplo: seguirCamino [Izquierda] arbolPequeno == Ok 1
-- Ejemplo: seguirCamino [Izquierda, Izquierda] arbolPequeno == Err "Camino inválido: no hay hijo izquierdo"
```

**44. Ancestro Común Más Cercano**

Encontrá el ancestro común más cercano de dos valores en un BST.

```elm
ancestroComun : comparable -> comparable -> Tree comparable -> Result String comparable
-- Ejemplo: Para el árbol arbolMediano:
--        10
--       /  \
--      5    15
--     / \   / \
--    3  7 12  20
-- ancestroComun 3 7 arbolMediano == Ok 5
-- ancestroComun 3 12 arbolMediano == Ok 10
```

---

## Parte 6: Desafío Final - Sistema de Árbol con Todo

**45. Sistema Completo de BST**

Implementá un módulo completo con todas las operaciones de BST, cada una usando el tipo de retorno apropiado (`Bool`, `Maybe`, o `Result`).

```elm
-- Operaciones que retornan Bool
esBSTValido : Tree comparable -> Bool
estaBalanceado : Tree comparable -> Bool
contiene : comparable -> Tree comparable -> Bool

-- Operaciones que retornan Maybe
buscar : comparable -> Tree comparable -> Maybe comparable
encontrarMinimo : Tree comparable -> Maybe comparable
encontrarMaximo : Tree comparable -> Maybe comparable

-- Operaciones que retornan Result
insertar : comparable -> Tree comparable -> Result String (Tree comparable)
eliminar : comparable -> Tree comparable -> Result String (Tree comparable)
validar : Tree comparable -> Result String (Tree comparable)
obtenerEnPosicion : Int -> Tree comparable -> Result String comparable  -- n-ésimo elemento en inorder

-- Operaciones de transformación
map : (a -> b) -> Tree a -> Tree b
filter : (a -> Bool) -> Tree a -> Tree a
fold : (a -> b -> b) -> b -> Tree a -> b

-- Conversiones
aLista : Tree a -> List a  -- inorder
desdeListaBalanceada : List comparable -> Tree comparable
```

---

## Bonus: Reflexión sobre Mónadas

### Preguntas para pensar:

1. **¿Por qué usar Maybe en lugar de devolver 0 o ""?**
   - Compará `buscar` que retorna `Maybe` vs la versión que retorna 0 si no encuentra

2. **¿Cuándo usar Maybe vs Result?**
   - ¿En qué casos preferirías un mensaje de error descriptivo?

3. **¿Qué ventaja tiene andThen?**
   - Escribí código que busque un valor, luego busque en su subárbol, usando:
     - a) Pattern matching manual con case
     - b) andThen
   - ¿Cuál es más limpio?

4. **Composición de validaciones**
   - Si tenés 5 validaciones que pueden fallar, ¿cómo las encadenarías con Result?

---

## Recursos Adicionales

### Funciones Útiles de la Biblioteca Estándar

```elm
-- Maybe
Maybe.map : (a -> b) -> Maybe a -> Maybe b
Maybe.andThen : (a -> Maybe b) -> Maybe a -> Maybe b
Maybe.withDefault : a -> Maybe a -> a

-- Result
Result.map : (a -> b) -> Result x a -> Result x b
Result.andThen : (a -> Result x b) -> Result x a -> Result x b
Result.withDefault : a -> Result x a -> a
Result.mapError : (x -> y) -> Result x a -> Result y a
```

### Patrón de Uso Común

```elm
-- Encadenar operaciones con pipeline
obtenerYValidar : Tree Int -> Result String Int
obtenerYValidar arbol =
    obtenerRaiz arbol
        |> Result.andThen (\valor ->
            if valor > 0 then
                Ok valor
            else
                Err "El valor debe ser positivo"
           )
        |> Result.andThen (\valor ->
            if valor < 100 then
                Ok valor
            else
                Err "El valor debe ser menor que 100"
           )
```

¡Buena suerte con los ejercicios!
