module Clase2 exposing (..)

{-| 
Guía 2 – Programación Funcional en Elm
Ejercicios de listas, funciones de orden superior y recursión.
Todas las funciones son puras, trabajan con `List Int`, 
y devuelven valores por defecto (0 o []) en caso de error.
-}


-- Ejercicio 1: Búsqueda Genérica
buscar : List Int -> (Int -> Int -> Bool) -> Int
buscar lista com =
    case lista of
        [] ->
            0

        x :: xs ->
            List.foldl
                (\actual acumulado ->
                    if com actual acumulado then
                        actual
                    else
                        acumulado
                )
                x
                xs



-- Ejercicio 2: Máximo y Mínimo
max : List Int -> Int
max lista =
    buscar lista (\a b -> a > b)


min : List Int -> Int
min lista =
    buscar lista (\a b -> a < b)



-- Ejercicio 3: Filtros por Umbral
maximos : List Int -> Int -> List Int
maximos lista e =
    List.filter (\x -> x > e) lista


minimos : List Int -> Int -> List Int
minimos lista e =
    List.filter (\x -> x < e) lista



-- Ejercicio 4: QuickSort
quickSort : List Int -> List Int
quickSort xs =
    case xs of
        [] ->
            []

        pivot :: resto ->
            let
                menores =
                    List.filter (\x -> x < pivot) resto

                mayores =
                    List.filter (\x -> x >= pivot) resto
            in
            quickSort menores ++ [ pivot ] ++ quickSort mayores



-- Ejercicio 5: Acceso por Índice
obtenerElemento : List Int -> Int -> Int
obtenerElemento lista posicion =
    case ( lista, posicion ) of
        ( [], _ ) ->
            0

        ( x :: _, 0 ) ->
            x

        ( _ :: xs, n ) ->
            if n < 0 then
                0
            else
                obtenerElemento xs (n - 1)



-- Ejercicio 6: Mediana
mediana : List Int -> Int
mediana lista =
    if List.isEmpty lista then
        0
    else
        let
            listaOrdenada =
                quickSort lista

            longitud =
                List.length listaOrdenada

            indiceMedia =
                longitud // 2
        in
        if modBy 2 longitud == 1 then
            obtenerElemento listaOrdenada indiceMedia
        else
            obtenerElemento listaOrdenada indiceMedia
            -- Podría ser (indiceMedia - 1), ambas válidas según la consigna



-- Ejercicio 7: Contar y Acumular
contar : List Int -> Int
contar lista =
    List.length lista


acc : List Int -> Int
acc lista =
    List.sum lista



-- Ejercicio 8: Filtrado Genérico
filtrar : List Int -> (Int -> Bool) -> List Int
filtrar xs p =
    List.filter p xs


filtrarPares : List Int -> List Int
filtrarPares xs =
    filtrar xs (\x -> modBy 2 x == 0)


filtrarMultiplosDeTres : List Int -> List Int
filtrarMultiplosDeTres xs =
    filtrar xs (\x -> modBy 3 x == 0)



-- Ejercicio 9: Acumulación con Transformación
acumular : List Int -> (Int -> Int) -> Int
acumular lista fx =
    List.sum (List.map fx lista)


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
unir lista1 lista2 =
    lista1 ++ lista2


transformar : List Int -> (Int -> a) -> List a
transformar lista fx =
    List.map fx lista


existe : List Int -> Int -> Bool
existe lista nro =
    List.member nro lista



-- Ejercicio 11: Unión sin Duplicados
unirOfSet : List Int -> List Int -> List Int
unirOfSet lista otraLista =
    removerDuplicados (unir lista otraLista)


removerDuplicados : List Int -> List Int
removerDuplicados lista =
    List.foldl
        (\elemento acumulador ->
            if List.member elemento acumulador then
                acumulador
            else
                acumulador ++ [ elemento ]
        )
        []
        lista



-- Ejercicio Opcional 1: Subconjuntos
subSets : List Int -> List (List Int)
subSets lista =
    case lista of
        [] ->
            [ [] ]

        x :: xs ->
            let
                subConjuntosSinX =
                    subSets xs
            in
            subConjuntosSinX ++ List.map (\subConjunto -> x :: subConjunto) subConjuntosSinX



-- Ejercicio Opcional 2: Dividir en Grupos
cortar : List Int -> Int -> List (List Int)
cortar lista n =
    if n <= 0 || List.isEmpty lista then
        []
    else
        let
            grupo =
                tomar n lista

            resto =
                saltar n lista
        in
        grupo :: cortar resto n


tomar : Int -> List a -> List a
tomar n lista =
    if n <= 0 then
        []
    else
        case lista of
            [] ->
                []

            x :: xs ->
                x :: tomar (n - 1) xs


saltar : Int -> List a -> List a
saltar n lista =
    if n <= 0 then
        lista
    else
        case lista of
            [] ->
                []

            _ :: xs ->
                saltar (n - 1) xs
