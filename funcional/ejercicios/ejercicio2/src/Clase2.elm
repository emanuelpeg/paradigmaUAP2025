module Clase2 exposing (..)


head : List a -> a
head list =
    Maybe.withDefault (Debug.todo "head called on empty list") (List.head list)


tail : List a -> List a
tail list =
    Maybe.withDefault [] (List.tail list)


isEmpty : List a -> Bool
isEmpty list =
    List.isEmpty list


{-| Ejercicios de Programación Funcional - Clase 2
Este módulo contiene ejercicios para practicar conceptos de programación funcional en Elm.
Cada función debe implementarse usando principios de programación funcional.

Nota: Las funciones que podrían fallar (como buscar elementos) devuelven valores por defecto (0)
en lugar de usar Maybe. Trabajamos con List en lugar del List de Scala.

-}


-- Ejercicio 1: Buscar
-- Dada una lista y una función de comparación, devuelve el valor que cumple la condición.
-- Ejemplo: buscar [1,2,3,4,5] (\a b -> a > b) devuelve 5 (máximo)
-- Ejemplo: buscar [1,2,3,4,5] (\a b -> a < b) devuelve 1 (mínimo)

buscar : List Int -> (Int -> Int -> Bool) -> Int
buscar lista cmp =
    case lista of
        [] ->
            -- Si la lista está vacía devolvemos 0 (caso especial que pide la consigna)
            0

        x :: xs ->
            -- Si la lista tiene al menos un elemento, usamos foldl
            -- x será el acumulador inicial
            List.foldl
                (\elem actual ->
                    -- Para cada elemento de la lista:
                    -- comparamos elem con el acumulador (acc)
                    -- usando la función de comparación que recibimos como parámetro
                    if cmp elem actual then
                        -- Si la comparación devuelve True,
                        -- el nuevo "mejor valor" será elem
                        elem
                    else
                        -- Si no, mantenemos el acumulador actual
                        actual
                )
                x  -- acumulador inicial (el primer elemento de la lista)
                xs -- la parte restante de la lista (sin el primer elemento)



-- Ejercicio 2: Máximo y Mínimo
-- Usamos la función "buscar" definida en el ejercicio 1
-- para no repetir la lógica de recorrer y comparar.

-- Función que devuelve el máximo valor de una lista
max : List Int -> Int
max lista =
    -- Llamamos a "buscar" pasando la lista
    -- y una función de comparación que se queda con el mayor
    buscar lista (\a b -> a > b)


-- Función que devuelve el mínimo valor de una lista
min : List Int -> Int
min lista =
    -- Llamamos a "buscar" pasando la lista
    -- y una función de comparación que se queda con el menor
    buscar lista (\a b -> a < b)


-- Ejercicio 3: Filtros por Umbral

-- Devuelve los elementos mayores que un valor dado
maximos : List Int -> Int -> List Int
maximos lista umbral =
    -- Usamos List.filter para quedarnos con los que sean mayores que "umbral"
    List.filter (\x -> x > umbral) lista


-- Devuelve los elementos menores que un valor dado
minimos : List Int -> Int -> List Int
minimos lista umbral =
    -- Usamos List.filter para quedarnos con los que sean menores que "umbral"
    List.filter (\x -> x < umbral) lista



-- Ejercicio 4: QuickSort
-- Ordena una lista de enteros usando el algoritmo de quicksort

quickSort : List Int -> List Int
quickSort lista =
    case lista of
        [] ->
            -- Caso base: una lista vacía ya está ordenada
            []

        pivot :: resto ->
            -- Separamos los elementos menores o iguales al pivot
            let
                menores =
                    List.filter (\x -> x <= pivot) resto

                -- Separamos los elementos mayores al pivot
                mayores =
                    List.filter (\x -> x > pivot) resto
            in
            -- Ordenamos recursivamente menores y mayores
            -- y luego los concatenamos con el pivot en el medio
            (quickSort menores) ++ [ pivot ] ++ (quickSort mayores)




-- Ejercicio 5: Acceso por Índice
-- Devuelve el elemento de la lista en la posición dada (empezando desde 0).
-- Si la posición está fuera de rango, devuelve 0.

obtenerElemento : List Int -> Int -> Int
obtenerElemento lista indice =
    case (lista, indice) of
        ([], _) ->
            -- Si la lista está vacía, no hay nada que devolver
            0

        (x :: _, 0) ->
            -- Si el índice es 0, devolvemos el primer elemento
            x

        (_ :: xs, n) ->
            -- Si no es 0, seguimos buscando en el resto de la lista
            -- reduciendo el índice en 1
            obtenerElemento xs (n - 1)


-- Ejercicio 6: Mediana
-- Devuelve el valor central de una lista ordenada.
-- Si la lista está vacía, devuelve 0.

mediana : List Int -> Int
mediana lista =
    case quickSort lista of
        [] ->
            -- Lista vacía → devolvemos 0
            0

        ordenada ->
            let
                n = List.length ordenada
                medio = n // 2
            in
            if modBy 2 n == 1 then
                -- Si la longitud es impar, devolvemos el elemento central
                obtenerElemento ordenada medio
            else
                -- Si es par, devolvemos uno de los dos del medio.
                -- Por ejemplo, el "medio - 1"
                obtenerElemento ordenada (medio - 1)


-- Ejercicio 7: Contar y Acumular

-- Cuenta la cantidad de elementos de la lista
contar : List Int -> Int
contar lista =
    -- Podemos usar la función ya existente List.length
    List.length lista


-- Suma todos los elementos de la lista
acc : List Int -> Int
acc lista =
    -- Podemos usar directamente List.sum
    List.sum lista


-- Ejercicio 8: Filtrado Genérico

-- Función de filtrado genérica: recibe una lista y una condición
filtrar : List Int -> (Int -> Bool) -> List Int
filtrar lista condicion =
    List.filter condicion lista


-- Filtra los números pares usando la función filtrar
filtrarPares : List Int -> List Int
filtrarPares lista =
    filtrar lista (\x -> modBy 2 x == 0)


-- Filtra los múltiplos de 3 usando la función filtrar
filtrarMultiplosDeTres : List Int -> List Int
filtrarMultiplosDeTres lista =
    filtrar lista (\x -> modBy 3 x == 0)



-- Ejercicio 9: Acumulación con Transformación

-- Función genérica: transforma cada elemento y acumula el resultado
acumular : List Int -> (Int -> Int) -> Int
acumular lista transformacion =
    -- 1. Aplico la transformación con map
    -- 2. Sumo los resultados
    List.sum (List.map transformacion lista)


-- Acumula cada elemento tal cual está (función identidad)
acumularUnidad : List Int -> Int
acumularUnidad lista =
    acumular lista (\x -> x)


-- Acumula el doble de cada elemento
acumularDoble : List Int -> Int
acumularDoble lista =
    acumular lista (\x -> x * 2)


-- Acumula el cuadrado de cada elemento
acumularCuadrado : List Int -> Int
acumularCuadrado lista =
    acumular lista (\x -> x * x)


-- Ejercicio 10: Operaciones con Listas

-- Une dos listas
unir : List Int -> List Int -> List Int
unir lista1 lista2 =
    -- Usamos el operador (++) para concatenar
    lista1 ++ lista2


-- Transforma los elementos de la lista a otro tipo usando una función
transformar : List Int -> (Int -> a) -> List a
transformar lista fx =
    -- Usamos List.map para aplicar la transformación
    List.map fx lista


-- Verifica si un elemento existe en la lista
existe : List Int -> Int -> Bool
existe lista valor =
    -- Usamos List.member para chequear si está
    List.member valor lista



-- Ejercicio 11: Unión sin Duplicados
-- Elimina duplicados preservando el orden de aparición
removerDuplicados : List Int -> List Int
removerDuplicados lista =
    -- Usamos foldl para recorrer y construir una lista sin repetidos
    List.reverse                 -- Damos vuelta al final para recuperar el orden original
        (List.foldl
            (\elem acumulada ->  -- acumulada = lista parcial sin duplicados (¡no usar 'acc' para evitar shadowing!)
                if List.member elem acumulada then
                    acumulada    -- Si ya existe, la dejamos igual
                else
                    elem :: acumulada  -- Si no existe, lo agregamos al frente
            )
            []                   -- Acumulador inicial vacío
            lista                -- Lista de entrada
        )


-- Une dos listas y elimina duplicados (preservando el orden)
unirOfSet : List Int -> List Int -> List Int
unirOfSet lista1 lista2 =
    let
        unidas =
            unir lista1 lista2   -- Reutilizamos tu función 'unir' del Ejercicio 10
    in
    removerDuplicados unidas      -- Quitamos duplicados de la concatenación



ejemplos : List String
ejemplos =
    [ "max [1,2,3,4,5] debería devolver 5"
    , "min [1,2,3,4,5] debería devolver 1"
    , "maximos [1,2,3,4,5] 3 debería devolver [4,5]"
    , "minimos [1,2,3,4,5] 3 debería devolver [1,2]"
    , "quickSort [3,1,4,1,5,9,2,6] debería devolver [1,1,2,3,4,5,6,9]"
    , "contar [1,2,3,4,5] debería devolver 5"
    , "acc [1,2,3,4,5] debería devolver 15"
    , "filtrarPares [1,2,3,4,5,6] debería devolver [2,4,6]"
    , "filtrarMultiplosDeTres [1,2,3,6,9,10] debería devolver [3,6,9]"
    , "acumularDoble [1,2,3] debería devolver 12 (2+4+6)"
    , "acumularCuadrado [1,2,3] debería devolver 14 (1+4+9)"
    , "unir [1,2] [3,4] debería devolver [1,2,3,4]"
    , "existe [1,2,3] 2 debería devolver True"
    , "existe [1,2,3] 4 debería devolver False"
    ]
