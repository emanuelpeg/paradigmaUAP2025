module Clase3 exposing (..)

head : List a -> a
head list =
    case List.head list of
        Just h ->
            h

        Nothing ->
            Debug.todo "head llamada con lista vacía"


tail : List a -> List a
tail list =
    Maybe.withDefault [] (List.tail list)


isEmpty : List a -> Bool
isEmpty list =
    List.isEmpty list



-- ==============================================
-- Clase 3 - Programación Funcional
-- Funciones de orden superior y recursión
-- ==============================================


-- ===========================
-- PARTE 0: Implementaciones propias
-- ===========================

miMap : (a -> b) -> List a -> List b
miMap fx lista =
    if isEmpty lista then
        []
    else
        fx (head lista) :: miMap fx (tail lista)


miFiltro : (a -> Bool) -> List a -> List a
miFiltro predicado lista =
    if isEmpty lista then
        []
    else
        let
            h = head lista
            t = tail lista
        in
        if predicado h then
            h :: miFiltro predicado t
        else
            miFiltro predicado t


miFoldl : (a -> b -> b) -> b -> List a -> b
miFoldl fx acum lista =
    if isEmpty lista then
        acum
    else
        miFoldl fx (fx (head lista) acum) (tail lista)



-- ===========================
-- PARTE 1: MAP
-- ===========================

duplicar : List Int -> List Int
duplicar lista =
    miMap (\x -> x * 2) lista


longitudes : List String -> List Int
longitudes lista =
    miMap String.length lista


incrementarTodos : List Int -> List Int
incrementarTodos lista =
    miMap (\x -> x + 1) lista


todasMayusculas : List String -> List String
todasMayusculas lista =
    miMap String.toUpper lista


negarTodos : List Bool -> List Bool
negarTodos lista =
    miMap not lista



-- ===========================
-- PARTE 2: FILTER
-- ===========================

pares : List Int -> List Int
pares lista =
    miFiltro (\x -> modBy 2 x == 0) lista


positivos : List Int -> List Int
positivos lista =
    miFiltro (\x -> x > 0) lista


stringsLargos : List String -> List String
stringsLargos lista =
    miFiltro (\s -> String.length s > 5) lista


soloVerdaderos : List Bool -> List Bool
soloVerdaderos lista =
    miFiltro (\b -> b) lista


mayoresQue : Int -> List Int -> List Int
mayoresQue valor lista =
    miFiltro (\x -> x > valor) lista



-- ===========================
-- PARTE 3: FOLD
-- ===========================

sumaFold : List Int -> Int
sumaFold lista =
    List.foldl (\x acc -> x + acc) 0 lista


producto : List Int -> Int
producto lista =
    List.foldl (\x acc -> x * acc) 1 lista


contarFold : List a -> Int
contarFold lista =
    List.foldl (\_ acc -> acc + 1) 0 lista


concatenar : List String -> String
concatenar lista =
    List.foldl (\s acc -> s ++ acc) "" lista


maximo : List Int -> Int
maximo lista =
    case lista of
        [] ->
            0

        x :: xs ->
            List.foldl max x xs


invertirFold : List a -> List a
invertirFold lista =
    List.foldl (\x acc -> x :: acc) [] lista


todos : (a -> Bool) -> List a -> Bool
todos predicado lista =
    List.foldl (\x acc -> acc && predicado x) True lista


alguno : (a -> Bool) -> List a -> Bool
alguno predicado lista =
    List.foldl (\x acc -> acc || predicado x) False lista



-- ===========================
-- PARTE 4: Combinaciones
-- ===========================

sumaDeCuadrados : List Int -> Int
sumaDeCuadrados lista =
    List.foldl (\x acc -> acc + (x * x)) 0 lista


contarPares : List Int -> Int
contarPares lista =
    List.foldl (\x acc -> if modBy 2 x == 0 then acc + 1 else acc) 0 lista


promedio : List Float -> Float
promedio lista =
    if List.isEmpty lista then
        0
    else
        List.sum lista / toFloat (List.length lista)


longitudesPalabras : String -> List Int
longitudesPalabras oracion =
    miMap String.length (String.words oracion)


palabrasLargas : String -> List String
palabrasLargas oracion =
    miFiltro (\s -> String.length s > 3) (String.words oracion)


sumarPositivos : List Int -> Int
sumarPositivos lista =
    List.foldl (\x acc -> if x > 0 then acc + x else acc) 0 lista


duplicarPares : List Int -> List Int
duplicarPares lista =
    miMap (\x -> if modBy 2 x == 0 then x * 2 else x) lista



-- ===========================
-- PARTE 5: Desafíos
-- ===========================

aplanar : List (List a) -> List a
aplanar lista =
    List.foldl (\xs acc -> xs ++ acc) [] lista


agruparPor : (a -> a -> Bool) -> List a -> List (List a)
agruparPor comparador lista =
    case lista of
        [] ->
            []

        x :: xs ->
            let
                agrupar actual resto =
                    case resto of
                        [] ->
                            [ List.reverse actual ]

                        y :: ys ->
                            if comparador (head actual) y then
                                agrupar (y :: actual) ys
                            else
                                List.reverse actual :: agrupar [ y ] ys
            in
            agrupar [ x ] xs


particionar : (a -> Bool) -> List a -> ( List a, List a )
particionar predicado lista =
    case lista of
        [] ->
            ( [], [] )

        x :: xs ->
            let
                (si, no) =
                    particionar predicado xs
            in
            if predicado x then
                ( x :: si, no )
            else
                ( si, x :: no )


sumaAcumulada : List Int -> List Int
sumaAcumulada lista =
    let
        helper l total =
            case l of
                [] ->
                    []

                x :: xs ->
                    let
                        nuevo = total + x
                    in
                    nuevo :: helper xs nuevo
    in
    helper lista 0



-- ===========================
-- OPCIONALES
-- ===========================

subSets : List Int -> List (List Int)
subSets lista =
    case lista of
        [] ->
            [ [] ]

        x :: xs ->
            let
                resto = subSets xs
            in
            resto ++ List.map (\s -> x :: s) resto


cortar : List Int -> Int -> List (List Int)
cortar lista n =
    if isEmpty lista then
        []
    else
        tomar n lista :: cortar (saltar n lista) n


tomar : Int -> List a -> List a
tomar n lista =
    if isEmpty lista || n == 0 then
        []
    else
        head lista :: tomar (n - 1) (tail lista)


saltar : Int -> List a -> List a
saltar n lista =
    if isEmpty lista || n == 0 then
        lista
    else
        saltar (n - 1) (tail lista)
