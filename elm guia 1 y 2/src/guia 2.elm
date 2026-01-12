module Ejercicios exposing (..)

-- Ejercicio 1: Búsqueda Genérica
buscar : List Int -> (Int -> Int -> Bool) -> Int
buscar lista comparador =
    case lista of
        [] ->
            0

        cabeza :: cola ->
            List.foldl
                (\actual mejorActual ->
                    if comparador actual mejorActual then
                        actual
                    else
                        mejorActual
                )
                cabeza
                cola



-- Ejercicio 2: Máximo y Mínimo

max : List Int -> Int
max lista =
    buscar lista (\a b -> a > b)


min : List Int -> Int
min lista =
    buscar lista (\a b -> a < b)



-- Ejercicio 3: Filtros por Umbral

maximos : List Int -> Int -> List Int
maximos lista umbral =
    List.filter (\x -> x > umbral) lista


minimos : List Int -> Int -> List Int
minimos lista umbral =
    List.filter (\x -> x < umbral) lista


-- Ejercicio 4: QuickSort

quickSort : List Int -> List Int
quickSort lista =
    case lista of
        [] ->
            []

        pivot :: resto ->
            let
                menores = List.filter (\x -> x <= pivot) resto
                mayores = List.filter (\x -> x > pivot) resto
            in
            quickSort menores ++ [ pivot ] ++ quickSort mayores


-- Ejercicio 5: Acceso por Índice

obtenerElemento : List Int -> Int -> Int
obtenerElemento lista indice =
    if indice < 0 then
        0

    else
        case ( lista, indice ) of
            ( [], _ ) ->
                0

            ( x :: _, 0 ) ->
                x

            ( _ :: xs, n ) ->
                obtenerElemento xs (n - 1)



-- Ejercicio 6: Mediana

mediana : List Int -> Int
mediana lista =
    let
        ordenada = quickSort lista
        longitud = List.length ordenada
    in
    if longitud == 0 then
        0

    else if modBy 2 longitud == 1 then
        -- impar → elemento del medio
        obtenerElemento ordenada (longitud // 2)

    else
        -- par → cualquiera de los dos del medio (elegimos el menor)
        obtenerElemento ordenada (longitud // 2 - 1)



-- Ejercicio 7: Contar y Acumular

contar : List Int -> Int
contar lista =
    List.length lista


acc : List Int -> Int
acc lista =
    List.sum lista


-- Ejercicio 8: Filtrado Genérico

filtrar : List Int -> (Int -> Bool) -> List Int
filtrar lista predicado =
    List.filter predicado lista


filtrarPares : List Int -> List Int
filtrarPares lista =
    filtrar lista (\x -> modBy 2 x == 0)


filtrarMultiplosDeTres : List Int -> List Int
filtrarMultiplosDeTres lista =
    filtrar lista (\x -> modBy 3 x == 0)


-- Ejercicio 9: Acumulación con Transformación

acumular : List Int -> (Int -> Int) -> Int
acumular lista transformacion =
    lista
        |> List.map transformacion
        |> List.sum


acumularUnidad : List Int -> Int
acumularUnidad lista =
    acumular lista (\x -> x)


acumularDoble : List Int -> Int
acumularDoble lista =
    acumular lista (\x -> x * 2)


acumularCuadrado : List Int -> Int
acumularCuadrado lista =
    acumular lista (\x -> x * x)



-- Ejercicio 10: Operaciones con Listas

unir : List Int -> List Int -> List Int
unir a b =
    a ++ b


transformar : List Int -> (Int -> a) -> List a
transformar lista f =
    List.map f lista


existe : List Int -> Int -> Bool
existe lista valor =
    List.member valor lista



-- Ejercicio 11: Unión sin Duplicados

removerDuplicados : List Int -> List Int
removerDuplicados lista =
    List.foldl
        (\x acc ->
            if List.member x acc then
                acc
            else
                acc ++ [ x ]
        )
        []
        lista


unirOfSet : List Int -> List Int -> List Int
unirOfSet a b =
    unir a b |> removerDuplicados


