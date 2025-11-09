module GuiaElm exposing (..)

import String


-- PARTE 0: Implementaciones Personalizadas

miMap : (a -> b) -> List a -> List b
miMap f xs =
    case xs of
        [] ->
            []

        x :: rest ->
            f x :: miMap f rest


miFiltro : (a -> Bool) -> List a -> List a
miFiltro p xs =
    case xs of
        [] ->
            []

        x :: rest ->
            if p x then
                x :: miFiltro p rest
            else
                miFiltro p rest


miFoldl : (a -> b -> b) -> b -> List a -> b
miFoldl step acc xs =
    case xs of
        [] ->
            acc

        x :: rest ->
            miFoldl step (step x acc) rest



-- PARTE 1: Uso de map

duplicar : List Int -> List Int
duplicar =
    List.map (\n -> n * 2)


longitudes : List String -> List Int
longitudes =
    List.map String.length


incrementarTodos : List Int -> List Int
incrementarTodos =
    List.map (\n -> n + 1)


todasMayusculas : List String -> List String
todasMayusculas =
    List.map String.toUpper


negarTodos : List Bool -> List Bool
negarTodos =
    List.map not



-- PARTE 2: Uso de filter

pares : List Int -> List Int
pares =
    List.filter (\n -> modBy 2 n == 0)


positivos : List Int -> List Int
positivos =
    List.filter (\n -> n > 0)


stringsLargos : List String -> List String
stringsLargos =
    List.filter (\s -> String.length s > 5)


soloVerdaderos : List Bool -> List Bool
soloVerdaderos =
    List.filter (\b -> b)


mayoresQue : Int -> List Int -> List Int
mayoresQue k =
    List.filter (\n -> n > k)



-- PARTE 3: Uso de foldl / foldr

sumaFold : List Int -> Int
sumaFold =
    List.foldl (+) 0


producto : List Int -> Int
producto =
    List.foldl (*) 1


contarFold : List a -> Int
contarFold =
    List.foldl (\_ acc -> acc + 1) 0


concatenar : List String -> String
concatenar =
    List.foldl (++) ""


maximo : List Int -> Int
maximo xs =
    List.foldl max 0 xs


invertirFold : List a -> List a
invertirFold =
    List.foldl (\x acc -> x :: acc) []


todos : (a -> Bool) -> List a -> Bool
todos p =
    List.foldl (\x acc -> acc && p x) True


alguno : (a -> Bool) -> List a -> Bool
alguno p =
    List.foldl (\x acc -> acc || p x) False



-- PARTE 4: Combinando Operaciones

sumaDeCuadrados : List Int -> Int
sumaDeCuadrados =
    List.foldl (\n acc -> acc + n * n) 0


contarPares : List Int -> Int
contarPares =
    List.foldl (\n acc -> acc + (if modBy 2 n == 0 then 1 else 0)) 0


promedio : List Float -> Float
promedio xs =
    let
        ( suma, cant ) =
            List.foldl (\x (s, c) -> ( s + x, c + 1 )) ( 0, 0 ) xs
    in
    if cant == 0 then
        0
    else
        suma / toFloat cant


longitudesPalabras : String -> List Int
longitudesPalabras oracion =
    oracion
        |> String.words
        |> List.map String.length


palabrasLargas : String -> List String
palabrasLargas oracion =
    oracion
        |> String.words
        |> List.filter (\w -> String.length w > 3)


sumarPositivos : List Int -> Int
sumarPositivos =
    List.filter (\n -> n > 0) >> List.foldl (+) 0


duplicarPares : List Int -> List Int
duplicarPares =
    List.map (\n -> if modBy 2 n == 0 then n * 2 else n)



-- PARTE 5: Desafíos Avanzados

aplanar : List (List a) -> List a
aplanar =
    List.concat


agruparPor : (a -> a -> Bool) -> List a -> List (List a)
agruparPor eq xs =
    let
        step x ( actual, grupos ) =
            case actual of
                [] ->
                    ( [ x ], grupos )

                y :: _ ->
                    if eq x y then
                        ( x :: actual, grupos )
                    else
                        ( [ x ], List.reverse actual :: grupos )

        ( ultimoGrupo, acumulados ) =
            List.foldl step ( [], [] ) xs

        terminado =
            case ultimoGrupo de
                [] ->
                    acumulados

                _ ->
                    List.reverse ultimoGrupo :: acumulados
    in
    List.reverse terminado


particionar : (a -> Bool) -> List a -> ( List a, List a )
particionar p =
    List.foldr
        (\x ( ts, fs ) -> if p x then ( x :: ts, fs ) else ( ts, x :: fs ))
        ( [], [] )


sumaAcumulada : List Int -> List Int
sumaAcumulada xs =
    let
        ( _, revOut ) =
            List.foldl
                (\n ( suma, acc ) ->
                    let
                        s = suma + n
                    in
                    ( s, s :: acc )
                )
                ( 0, [] )
                xs
    in
    List.reverse revOut


subSets : List Int -> List (List Int)
subSets =
    List.foldl
        (\x acc ->
            let
                -- Agrega x al FINAL de cada subset para mantener el orden
                conX = List.map (\subset -> subset ++ [ x ]) acc
            in
            acc ++ conX
        )
        [ [] ]


tomar : Int -> List a -> List a
tomar n xs =
    if n <= 0 then
        []
    else
        case xs of
            [] ->
                []

            y :: ys ->
                y :: tomar (n - 1) ys


saltar : Int -> List a -> List a
saltar n xs =
    if n <= 0 then
        xs
    else
        case xs of
            [] ->
                []

            _ :: ys ->
                saltar (n - 1) ys


cortar : List Int -> Int -> List (List Int)
cortar xs n =
    if n <= 0 || List.isEmpty xs then
        []
    else
        let
            chunk = tomar n xs
            resto = saltar n xs
        in
        chunk :: cortar resto n
