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



-- EJERCICIO 1: Concatenar
-- Dadas 2 listas, devuelve una lista que es la concatenación de ambas.
-- Usar recursión

concatenar : List Int -> List Int -> List Int
concatenar lista1 lista2 =
    case lista1 of
        [] ->
            lista2
        cabeza :: cola ->
            cabeza :: concatenar cola lista2



-- EJERCICIO 1: Buscar
-- Dada una lista y una función de comparación, devuelve el valor que cumple la condición.
-- Devuelve 0 si la lista está vacía.


buscar : List Int -> (Int -> Int -> Bool) -> Int
buscar lista com =
    case lista of   
        [] ->
            0 
        [x] ->
            x
        x :: xs ->
            let
                mejorDelResto = buscar xs com
            in
            if com x mejorDelResto then
                x
            else
                mejorDelResto



-- EJERCICIO 2: Busca el Máximo
-- Encuentra el valor máximo en una lista
max : List Int -> Int
max lista =
    buscar lista (\a b -> a > b)

-- EJERCICIO 2: Busca el Mínimo
-- Encuentra el valor mínimo en una lista
min : List Int -> Int
min lista =
    buscar lista (\a b -> a < b)



-- EJERCICIO 3: Filtra la lista de valores mayores que el valor e pasado por parámetro

maximos : List Int -> Int -> List Int
maximos lista e =
    List.filter (\x -> x > e) lista



-- EJERCICIO 3: Filtra la lista de valores menores que el valor e pasado por parámetro

minimos : List Int -> Int -> List Int
minimos lista e =
    List.filter (\x -> x < e) lista



-- EJERCICIO 4: Ordena los valores de una lista utilizando quicksort

quickSort : List Int -> List Int
quickSort xs =
    case xs of
        [] ->
            []

        pivot :: resto ->
            let
                menores = List.filter (\n -> n < pivot) resto
                mayores = List.filter (\n -> n >= pivot) resto
            in
            quickSort menores ++ [pivot] ++ quickSort mayores



-- EJERCICIO 5: Obtiene un elemento en la posición n (empezando desde 0)
-- Devuelve 0 si la posición está fuera de rango

obtenerElemento : List Int -> Int -> Int
obtenerElemento lista posicion =
    case (lista, posicion) of
        ([], _) ->
            0
        (x :: _, 0) ->
            x
        (x :: xs, n) ->
            if n < 0 then
                0
            else
                obtenerElemento xs (n - 1)



-- EJERCICIO 6: Busca la mediana
-- En el ámbito de la estadística, la mediana representa el
-- valor de la variable de posición central en un conjunto de datos ordenados.
-- Devuelve 0 si la lista está vacía.

mediana : List Int -> Int
mediana lista =
    case lista of
        [] ->
            0
        _ ->
            let
                listaOrdenada = quickSort lista
                longitud = List.length listaOrdenada
                indiceMedia = longitud // 2
            in
            if modBy 2 longitud == 1 then
                obtenerElemento listaOrdenada indiceMedia
            else
                obtenerElemento listaOrdenada (indiceMedia - 1)



-- EJERCICIO 7: Cuenta los elementos

contar : List Int -> Int
contar lista =
    List.length lista



-- EJERCICIO 7: Acumula los elementos

acc : List Int -> Int
acc lista =
    List.sum lista



-- EJERCICIO 8: Filtra los elementos de la lista xs según la función p

filtrar : List Int -> (Int -> Bool) -> List Int
filtrar xs p =
    List.filter p xs



-- EJERCICIO 8: Filtra los elementos pares usando la función filtrar

filtrarPares : List Int -> List Int
filtrarPares xs =
    filtrar xs (\numero -> modBy 2 numero == 0)



-- EJERCICIO 8: Filtra los elementos múltiplos de 3 usando filtrar

filtrarMultiplosDeTres : List Int -> List Int
filtrarMultiplosDeTres xs =
    filtrar xs (\numero -> modBy 3 numero == 0)



-- EJERCICIO 9: Acumula los elementos aplicándoles fx

acumular : List Int -> (Int -> Int) -> Int
acumular lista fx =
    List.sum (List.map fx lista)



-- EJERCICIO 9: Acumula todos los elementos de una lista usando acumular (función identidad)

acumularUnidad : List Int -> Int
acumularUnidad lista =
    acumular lista (\x -> x)



-- EJERCICIO 9: Acumula el doble de los elementos de una lista usando acumular

acumularDoble : List Int -> Int
acumularDoble lista =
    acumular lista (\x -> x * 2)



-- Acumula el cuadrado de los elementos de una lista usando acumular

-- EJERCICIO 9: Acumula el cuadrado de los elementos de una lista usando acumular

acumularCuadrado : List Int -> Int
acumularCuadrado lista =
    acumular lista (\x -> x * x)



-- EJERCICIO 10: Transforma la lista a una lista de otro tipo
-- Esto es equivalente a la función map de Scala

transformar : List Int -> (Int -> a) -> List a
transformar lista fx =
    List.map fx lista



-- EJERCICIO 10: Retorna true si un elemento existe en la lista

existe : List Int -> Int -> Bool
existe lista nro =
    List.member nro lista



-- EJERCICIO 10: Une dos listas

unir : List Int -> List Int -> List Int
unir lista1 lista2 =
    lista1 ++ lista2



-- EJERCICIO 11: Une 2 listas pasadas por parámetros pero ignora los repetidos

unirOfSet : List Int -> List Int -> List Int
unirOfSet lista otraLista =
    removerDuplicados (unir lista otraLista)



-- EJERCICIO 11: Función auxiliar para remover duplicados de una lista

removerDuplicados : List Int -> List Int
removerDuplicados lista =
    List.foldl
        (\elemento acumulador ->
            if List.member elemento acumulador then
                acumulador
            else
                acumulador ++ [elemento]
        )
        []
        lista



-- OPCIONAL: Subconjuntos
-- Dada una lista de enteros, retorna una lista con todos los posibles subconjuntos
-- Por ejemplo: [1,2,3] -> [[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]

subSets : List Int -> List (List Int)
subSets lista =
    case lista of
        [] ->
            [ [] ]

        x :: xs ->
            let
                subconjuntosSinX = subSets xs
            in
            subconjuntosSinX ++ List.map (\subset -> x :: subset) subconjuntosSinX



-- OPCIONAL: Cortar
-- Dada una lista de enteros y un número entero n, retorna subconjuntos con n elementos
-- Ejemplo: [1,2,3,4,5] y 2 -> [[1,2], [3,4], [5]]

cortar : List Int -> Int -> List (List Int)
cortar lista n =
    if n <= 0 || List.isEmpty lista then
        []
    else
        let
            pedazo = tomar n lista
            resto = saltar n lista
        in
        if List.isEmpty pedazo then
            []
        else
            pedazo :: cortar resto n



-- Función auxiliar para tomar los primeros n elementos de una lista

tomar : Int -> List a -> List a
tomar n lista =
    List.take n lista



-- Función auxiliar para saltar los primeros n elementos de una lista

saltar : Int -> List a -> List a
saltar n lista =
    List.drop n lista



-- Ejemplos de uso y funciones de prueba
-- Podés usar estos para probar tus implementaciones


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
