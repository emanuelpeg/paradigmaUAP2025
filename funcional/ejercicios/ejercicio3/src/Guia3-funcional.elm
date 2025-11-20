module Clase3 exposing (..)


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

-- 1. Map Personalizado
miMap : (a -> b) -> List a -> List b
miMap fx lista =
    if isEmpty lista then
        []
    else
        fx (head lista) :: miMap fx (tail lista)



-- 2. Filter Personalizado
miFiltro : (a -> Bool) -> List a -> List a
miFiltro predicado lista =
    if isEmpty lista then
        []
    else
        let
            x = head lista
            resto = miFiltro predicado (tail lista)
        in
        if predicado x then
            x :: resto
        else
            resto



-- 3. Foldl Personalizado
miFoldl : (a -> b -> b) -> b -> List a -> b
miFoldl fx acumulador lista =
    if isEmpty lista then
        acumulador
    else
        miFoldl fx (fx (head lista) acumulador) (tail lista)



-- ============================================================================
-- PARTE 1: ENTENDIENDO MAP
-- ============================================================================


duplicar : List Int -> List Int
duplicar lista =
    miMap (\n -> n * 2) lista


longitudes : List String -> List Int
longitudes lista =
    miMap String.length lista


incrementarTodos : List Int -> List Int
incrementarTodos lista =
    miMap (\n -> n + 1) lista


todasMayusculas : List String -> List String
todasMayusculas lista =
    miMap String.toUpper lista


negarTodos : List Bool -> List Bool
negarTodos lista =
    miMap not lista



-- ============================================================================
-- PARTE 2: ENTENDIENDO FILTER
-- ============================================================================


pares : List Int -> List Int
pares lista =
    miFiltro (\n -> modBy 2 n == 0) lista


positivos : List Int -> List Int
positivos lista =
    miFiltro (\n -> n > 0) lista


stringsLargos : List String -> List String
stringsLargos lista =
    miFiltro (\s -> String.length s > 5) lista


soloVerdaderos : List Bool -> List Bool
soloVerdaderos lista =
    miFiltro identity lista


mayoresQue : Int -> List Int -> List Int
mayoresQue valor lista =
    miFiltro (\n -> n > valor) lista



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
    case lista of
        [] ->
            0

        x :: xs ->
            List.foldl (\n acc -> if n > acc then n else acc) x xs


invertirFold : List a -> List a
invertirFold lista =
    List.foldl (\elem acc -> elem :: acc) [] lista


todos : (a -> Bool) -> List a -> Bool
todos predicado lista =
    List.foldl (\x acc -> acc && predicado x) True lista


alguno : (a -> Bool) -> List a -> Bool
alguno predicado lista =
    List.foldl (\x acc -> acc || predicado x) False lista



-- ============================================================================
-- PARTE 4: COMBINANDO OPERACIONES
-- ============================================================================


sumaDeCuadrados : List Int -> Int
sumaDeCuadrados lista =
    lista
        |> List.map (\n -> n * n)
        |> List.sum


contarPares : List Int -> Int
contarPares lista =
    pares lista |> List.length


promedio : List Float -> Float
promedio lista =
    case List.length lista of
        0 ->
            0

        n ->
            List.sum lista / toFloat n


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
    positivos lista |> List.sum


duplicarPares : List Int -> List Int
duplicarPares lista =
    List.map (\n -> if modBy 2 n == 0 then n * 2 else n) lista



-- ============================================================================
-- PARTE 5: DESAFÍOS AVANZADOS
-- ============================================================================


aplanar : List (List a) -> List a
aplanar lista =
    List.foldl (++) [] lista


agruparPor : (a -> a -> Bool) -> List a -> List (List a)
agruparPor comparador lista =
    case lista of
        [] ->
            []

        x :: xs ->
            let
                (grupo, resto) =
                    List.foldl
                        (\elem (actual, otros) ->
                            if comparador x elem then
                                (elem :: actual, otros)
                            else
                                (actual, elem :: otros)
                        )
                        ( [ x ], [] )
                        xs
            in
            grupo :: agruparPor comparador resto


particionar : (a -> Bool) -> List a -> ( List a, List a )
particionar pred lista =
    List.foldl
        (\elem (si, no) ->
            if pred elem then
                (elem :: si, no)
            else
                (si, elem :: no)
        )
        ( [], [] )
        lista


sumaAcumulada : List Int -> List Int
sumaAcumulada lista =
    let
        f n (ac, total) =
            ( (total + n) :: ac, total + n )
    in
    List.reverse (fst (List.foldl f ( [], 0 ) lista))



-- ============================================================================
-- OPCIONALES
-- ============================================================================


subSets : List Int -> List (List Int)
subSets lista =
    case lista of
        [] ->
            [ [] ]

        x :: xs ->
            let
                rec = subSets xs
            in
            rec ++ List.map (\s -> x :: s) rec


cortar : List Int -> Int -> List (List Int)
cortar lista n =
    if isEmpty lista then
        []

    else
        tomar n lista :: cortar (saltar n lista) n


tomar : Int -> List a -> List a
tomar n lista =
    if isEmpty lista then
        []

    else if n == 0 then
        []

    else
        head lista :: tomar (n - 1) (tail lista)


saltar : Int -> List a -> List a
saltar n lista =
    if isEmpty lista then
        []

    else if n == 0 then
        lista

    else
        saltar (n - 1) (tail lista)
