module Guia exposing (..)


-- Ejercicio 1: Búsqueda Genérica


buscar : List Int -> (Int -> Int -> Bool) -> Int
buscar xs cmp =
    case xs of
        [] ->
            0

        y :: ys ->
            List.foldl (\a best -> if cmp a best then a else best) y ys



-- Ejercicio 2: Máximo y Mínimo


max : List Int -> Int
max xs =
    buscar xs (\a b -> a > b)

min : List Int -> Int
min xs =
    buscar xs (\a b -> a < b)



-- Ejercicio 3: Filtros por Umbral


maximos : List Int -> Int -> List Int
maximos xs t =
    List.filter (\x -> x > t) xs

minimos : List Int -> Int -> List Int
minimos xs t =
    List.filter (\x -> x < t) xs



-- Ejercicio 4: QuickSort


quickSort : List Int -> List Int
quickSort xs =
    case xs of
        [] ->
            []

        pivot :: rest ->
            let
                menores =
                    List.filter (\x -> x <= pivot) rest

                mayores =
                    List.filter (\x -> x > pivot) rest
            in
            quickSort menores ++ (pivot :: quickSort mayores)



-- Ejercicio 5: Acceso por Índice


obtenerElemento : List Int -> Int -> Int
obtenerElemento xs i =
    if i < 0 then
        0
    else
        case xs of
            [] ->
                0

            y :: ys ->
                if i == 0 then
                    y
                else
                    obtenerElemento ys (i - 1)



-- Ejercicio 6: Mediana


mediana : List Int -> Int
mediana xs =
    let
        ordenada =
            quickSort xs

        n =
            List.length ordenada
    in
    if n == 0 then
        0
    else if modBy 2 n == 1 then
        obtenerElemento ordenada (n // 2)
    else
        obtenerElemento ordenada ((n // 2) - 1)



-- Ejercicio 7: Contar y Acumular


contar : List Int -> Int
contar =
    List.length

acc : List Int -> Int
acc =
    List.sum



-- Ejercicio 8: Filtrado Genérico


filtrar : (Int -> Bool) -> List Int -> List Int
filtrar =
    List.filter

filtrarPares : List Int -> List Int
filtrarPares xs =
    List.filter (\x -> modBy 2 x == 0) xs

filtrarMultiplosDeTres : List Int -> List Int
filtrarMultiplosDeTres xs =
    List.filter (\x -> modBy 3 x == 0) xs



-- Ejercicio 9: Acumulación con Transformación


acumular : List Int -> (Int -> Int) -> Int
acumular xs f =
    List.foldl (\x total -> total + f x) 0 xs

acumularUnidad : List Int -> Int
acumularUnidad xs =
    acumular xs (\x -> x)

acumularDoble : List Int -> Int
acumularDoble xs =
    acumular xs (\x -> 2 * x)

acumularCuadrado : List Int -> Int
acumularCuadrado xs =
    acumular xs (\x -> x * x)



-- Ejercicio 10: Operaciones con Listas


unir : List Int -> List Int -> List Int
unir a b =
    a ++ b

transformar : List Int -> (Int -> a) -> List a
transformar xs f =
    List.map f xs

existe : List Int -> Int -> Bool
existe xs n =
    List.member n xs



-- Ejercicio 11: Unión sin Duplicados


removerDuplicados : List Int -> List Int
removerDuplicados xs =
    xs
        |> List.foldl (\x resultado -> if List.member x resultado then resultado else x :: resultado) []
        |> List.reverse

unirOfSet : List Int -> List Int -> List Int
unirOfSet a b =
    unir a b |> removerDuplicados
