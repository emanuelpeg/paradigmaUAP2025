module Clase3 exposing (..)

-- ============================================================================
-- FUNCIONES AUXILIARES
-- ================
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
    else if predicado (head lista) then
        head lista :: miFiltro predicado (tail lista)
    else
        miFiltro predicado (tail lista)


-- 3. Foldl Personalizado
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
    miMap (\x -> x + 1) lista


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
    miFiltro (\b -> b == True) lista


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


-- ============================================================================
-- PARTE 4: COMBINANDO OPERACIONES
-- ============================================================================

sumaDeCuadrados : List Int -> Int
sumaDeCuadrados lista =
    lista
        |> miMap (\x -> x * x)
        |> sumaFold


contarPares : List Int -> Int
contarPares lista =
    pares lista |> contarFold


promedio : List Float -> Float
promedio lista =
    if isEmpty lista then
        0
    else
        let
            suma = List.foldl (+) 0 lista
            cantidad = toFloat (List.length lista)
        in
        suma / cantidad


longitudesPalabras : String -> List Int
longitudesPalabras oracion =
    oracion
        |> String.words
        |> miMap String.length


palabrasLargas : String -> List String
palabrasLargas oracion =
    oracion
        |> String.words
        |> miFiltro (\p -> String.length p > 3)


sumarPositivos : List Int -> Int
sumarPositivos lista =
    lista
        |> miFiltro (\x -> x > 0)
        |> sumaFold


duplicarPares : List Int -> List Int
duplicarPares lista =
    miMap (\x -> if modBy 2 x == 0 then x * 2 else x) lista


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
                agruparAux actual restantes =
                    case restantes of
                        [] ->
                            ( [ actual ], [] )

                        y :: ys ->
                            if comparador actual y then
                                let
                                    (grupo, resto) = agruparAux y ys
                                in
                                (actual :: grupo, resto)
                            else
                                ( [ actual ], restantes )
            in
            let
                (grupo, resto) = agruparAux x xs
            in
            grupo :: agruparPor comparador resto


particionar : (a -> Bool) -> List a -> ( List a, List a )
particionar predicado lista =
    List.foldr
        (\x ( si, no ) ->
            if predicado x then
                ( x :: si, no )
            else
                ( si, x :: no )
        )
        ( [], [] )
        lista


sumaAcumulada : List Int -> List Int
sumaAcumulada lista =
    let
        acumulador x ( suma, resultado ) =
            let
                nuevoSuma = suma + x
            in
            ( nuevoSuma, nuevoSuma :: resultado )
    in
    lista
        |> List.foldl acumulador ( 0, [] )
        |> Tuple.second
        |> invertirFold


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
                sinX = subSets xs
                conX = miMap (\s -> x :: s) sinX
            in
            sinX ++ conX


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
