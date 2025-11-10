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
            primero = head lista
        in
        if predicado primero then
            primero :: miFiltro predicado (tail lista)
        else
            miFiltro predicado (tail lista)



miFoldl : (a -> b -> b) -> b -> List a -> b
miFoldl fx acumulador lista =
    if isEmpty lista then
        acumulador
    else
        miFoldl fx (fx (head lista) acumulador) (tail lista)



-- ============================================================================
-- PARTE 1: MAP
-- ============================================================================


duplicar : List Int -> List Int
duplicar lista =
    miMap (\x -> x * 2) lista


longitudes : List String -> List Int
longitudes lista =
    miMap String.length lista


incrementarTodos : List Int -> List Int
incrementarTodos lista =
    miMap ((+) 1) lista


todasMayusculas : List String -> List String
todasMayusculas lista =
    miMap String.toUpper lista


negarTodos : List Bool -> List Bool
negarTodos lista =
    miMap not lista



-- ============================================================================
-- PARTE 2: FILTER
-- ============================================================================


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
    miFiltro identity lista


mayoresQue : Int -> List Int -> List Int
mayoresQue valor lista =
    miFiltro (\x -> x > valor) lista



-- ============================================================================
-- PARTE 3: FOLD
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
        |> List.map (\x -> x * x)
        |> List.foldl (+) 0


contarPares : List Int -> Int
contarPares lista =
    lista
        |> List.filter (\x -> modBy 2 x == 0)
        |> List.length


promedio : List Float -> Float
promedio lista =
    let
        total = List.foldl (+) 0 lista
        cant = toFloat (List.length lista)
    in
    if cant == 0 then 0 else total / cant


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
        |> List.foldl (+) 0


duplicarPares : List Int -> List Int
duplicarPares lista =
    List.map (\x -> if modBy 2 x == 0 then x * 2 else x) lista



-- ============================================================================
-- PARTE 5: DESAFÍOS
-- ============================================================================


aplanar : List (List a) -> List a
aplanar lista =
    List.foldl (\x acc -> acc ++ x) [] lista


agruparPor : (a -> a -> Bool) -> List a -> List (List a)
agruparPor comparador lista =
    case lista of
        [] ->
            []

        x :: xs ->
            let
                (grupo, resto) = juntar comparador x xs
            in
            (x :: grupo) :: agruparPor comparador resto


juntar : (a -> a -> Bool) -> a -> List a -> ( List a, List a )
juntar comparador base lista =
    case lista of
        [] ->
            ( [], [] )

        y :: ys ->
            if comparador base y then
                let
                    (g, r) = juntar comparador base ys
                in
                ( y :: g, r )
            else
                ( [], lista )


particionar : (a -> Bool) -> List a -> ( List a, List a )
particionar predicado lista =
    List.foldl
        (\x (a, b) ->
            if predicado x then
                ( x :: a, b )
            else
                ( a, x :: b )
        )
        ( [], [] )
        lista


sumaAcumulada : List Int -> List Int
sumaAcumulada lista =
    List.foldl
        (\x (acc, res) -> ( acc + x, res ++ [ acc + x ] ))
        ( 0, [] )
        lista
        |> Tuple.second



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
                resto = subSets xs
            in
            resto ++ List.map (\r -> x :: r) resto


cortar : List Int -> Int -> List (List Int)
cortar lista n =
    if isEmpty lista then
        []
    else
        tomar n lista :: cortar (saltar n lista) n


tomar : Int -> List a -> List a
tomar n lista =
    if isEmpty lista || n <= 0 then
        []
    else
        head lista :: tomar (n - 1) (tail lista)


saltar : Int -> List a -> List a
saltar n lista =
    if isEmpty lista || n <= 0 then
        lista
    else
        saltar (n - 1) (tail lista)
