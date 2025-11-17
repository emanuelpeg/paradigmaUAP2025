module Clase3 exposing (..)

import String
import List


-- ============================================================================
-- FUNCIONES BASE
-- ============================================================================

head : List a -> a
head list =
    case List.head list of
        Just h ->
            h

        Nothing ->
            Debug.todo "head called on empty list"


tail : List a -> List a
tail list =
    Maybe.withDefault [] (List.tail list)


isEmpty : List a -> Bool
isEmpty list =
    List.isEmpty list



-- ============================================================================
-- PARTE 0: IMPLEMENTACIONES PERSONALIZADAS
-- ============================================================================

miMap : (a -> b) -> List a -> List b
miMap fx lista =
    if isEmpty lista then
        []
    else
        fx (head lista) :: miMap fx (tail lista)


miFiltro : (a -> Bool) -> List a -> List a
miFiltro pred lista =
    if isEmpty lista then
        []
    else if pred (head lista) then
        head lista :: miFiltro pred (tail lista)
    else
        miFiltro pred (tail lista)


miFoldl : (a -> b -> b) -> b -> List a -> b
miFoldl fx acc lista =
    if isEmpty lista then
        acc
    else
        miFoldl fx (fx (head lista) acc) (tail lista)



-- ============================================================================
-- PARTE 1: ENTENDIENDO MAP
-- ============================================================================

duplicar : List Int -> List Int
duplicar lista =
    List.map (\x -> x * 2) lista


longitudes : List String -> List Int
longitudes lista =
    List.map String.length lista


incrementarTodos : List Int -> List Int
incrementarTodos lista =
    List.map (\x -> x + 1) lista


todasMayusculas : List String -> List String
todasMayusculas lista =
    List.map String.toUpper lista


negarTodos : List Bool -> List Bool
negarTodos lista =
    List.map not lista



-- ============================================================================
-- PARTE 2: ENTENDIENDO FILTER
-- ============================================================================

pares : List Int -> List Int
pares lista =
    List.filter (\x -> modBy 2 x == 0) lista


positivos : List Int -> List Int
positivos lista =
    List.filter (\x -> x > 0) lista


stringsLargos : List String -> List String
stringsLargos lista =
    List.filter (\x -> String.length x > 5) lista


soloVerdaderos : List Bool -> List Bool
soloVerdaderos lista =
    List.filter (\x -> x == True) lista


mayoresQue : Int -> List Int -> List Int
mayoresQue valor lista =
    List.filter (\x -> x > valor) lista



-- ============================================================================
-- PARTE 3: ENTENDIENDO FOLD
-- ============================================================================

sumaFold : List Int -> Int
sumaFold lista =
    List.foldl (+) 0 lista


producto : List Int -> Int
producto lista =
    List.foldl (*) 1 lista


contarFold : List a -> Int
contarFold lista =
    List.foldl (\_ acc -> acc + 1) 0 lista


concatenar : List String -> String
concatenar lista =
    List.foldl (++) "" lista


maximo : List Int -> Int
maximo lista =
    List.foldl max 0 lista


invertirFold : List a -> List a
invertirFold lista =
    List.foldl (\x acc -> x :: acc) [] lista


todos : (a -> Bool) -> List a -> Bool
todos predicado lista =
    List.foldl (\x acc -> predicado x && acc) True lista


alguno : (a -> Bool) -> List a -> Bool
alguno predicado lista =
    List.foldl (\x acc -> predicado x || acc) False lista



-- ============================================================================
-- PARTE 4: COMBINANDO OPERACIONES
-- ============================================================================

sumaDeCuadrados : List Int -> Int
sumaDeCuadrados lista =
    lista
        |> List.map (\x -> x * x)
        |> List.foldl (+) 0


contarPares : List Int -> Int
contarPares lista =
    lista
        |> List.filter (\x -> modBy 2 x == 0)
        |> List.length


promedio : List Float -> Float
promedio lista =
    if List.isEmpty lista then
        0
    else
        List.sum lista / toFloat (List.length lista)


longitudesPalabras : String -> List Int
longitudesPalabras oracion =
    oracion
        |> String.words
        |> List.map String.length


palabrasLargas : String -> List String
palabrasLargas oracion =
    oracion
        |> String.words
        |> List.filter (\p -> String.length p > 3)


sumarPositivos : List Int -> Int
sumarPositivos lista =
    lista
        |> List.filter (\x -> x > 0)
        |> List.sum


duplicarPares : List Int -> List Int
duplicarPares lista =
    List.map (\x -> if modBy 2 x == 0 then x * 2 else x) lista
