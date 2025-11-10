module Guia3 exposing (..)

-- Parte 0: Implementaciones Personalizadas

-- 1. Map Personalizado
miMap : (a -> b) -> List a -> List b
miMap f lista =
    if List.isEmpty lista then
        []
    else
        let
            primero = List.head lista
            resto = List.tail lista
        in
        case (primero, resto) of
            (Just x, Just xs) ->
                (f x) :: (miMap f xs)
            _ ->
                []

-- 2. Filter Personalizado
miFiltro : (a -> Bool) -> List a -> List a
miFiltro f lista =
    if List.isEmpty lista then
        []
    else
        let
            primero = List.head lista
            resto = List.tail lista
        in
        case (primero, resto) of
            (Just x, Just xs) ->
                if f x then
                    x :: (miFiltro f xs)
                else
                    miFiltro f xs
            _ ->
                []

-- 3. Foldl Personalizado
miFoldl : (a -> b -> b) -> b -> List a -> b
miFoldl f acc lista =
    case lista of
        [] ->
            acc

        x :: xs ->
            miFoldl f (f x acc) xs
        _ ->
                acc


-- Parte 1 - Entendiendo Map

-- 4. Duplicar Números
duplicar : List Int -> List Int
duplicar lista =
    List.map (\x -> x * 2) lista

-- 5. Longitudes de Strings
longitudes : List String -> List Int
longitudes lista =
    List.map String.length lista

-- 6. Incrementar Todos
incrementarTodos : List Int -> List Int
incrementarTodos lista =
    List.map (\x -> x + 1) lista

-- 7. A Mayúsculas
todasMayusculas : List String -> List String
todasMayusculas lista =
    List.map String.toUpper lista

-- 8. Negar Booleanos
negarTodos : List Bool -> List Bool
negarTodos lista =
    List.map not lista


-- Parte 2: Entendiendo Filter

-- 9. Números Pares
pares : List Int -> List Int
pares lista =
    List.filter (\x -> modBy 2 x == 0) lista

-- 10. Números Positivos
positivos : List Int -> List Int
positivos lista =
    List.filter (\x -> x > 0) lista

-- 11. Strings Largos
stringsLargos : List String -> List String
stringsLargos lista =
    List.filter (\s -> String.length s > 5) lista

-- 12. Remover Falsos
soloVerdaderos : List Bool -> List Bool
soloVerdaderos lista =
    List.filter (\b -> b == True) lista

-- 13. Mayor Que
mayoresQue : Int -> List Int -> List Int
mayoresQue n lista =
    List.filter (\x -> x > n) lista


-- Parte 3: Entendiendo Fold (foldl y foldr)

-- 14. Suma con Fold
sumaFold : List Int -> Int
sumaFold lista =
    List.foldl (+) 0 lista

-- 15. Producto
producto : List Int -> Int
producto lista =
    List.foldl (*) 1 lista

-- 16. Contar con Fold
contarFold : List a -> Int
contarFold lista =
    List.foldl (\_ acc -> acc + 1) 0 lista

-- 17. Concatenar Strings
concatenar : List String -> String
concatenar lista =
    List.foldl (++) "" lista

-- 18. Valor Máximo
maximo : List Int -> Int
maximo lista =
    case lista of
        [] ->
            0

        x :: xs ->

 List.foldl (\n acc -> if n > acc then n else acc) x xs

-- 19. Invertir con Fold
invertirFold : List a -> List a
invertirFold lista =
    List.foldl (\x acc -> x :: acc) [] lista

-- 20. Todos Verdaderos
todos : (a -> Bool) -> List a -> Bool
todos condicion lista =
    List.foldl (\x acc -> condicion x && acc) True lista

-- 21. Alguno Verdadero
alguno : (a -> Bool) -> List a -> Bool
alguno condicion lista =
    List.foldl (\x acc -> condicion x || acc) False lista


-- Parte 4: Combinando Operaciones

-- 22. Suma de Cuadrados
sumaDeCuadrados : List Int -> Int
sumaDeCuadrados lista =
    lista
        |> List.map (\x -> x * x)
        |> List.foldl (+) 0

-- 23. Contar Números Pares
contarPares : List Int -> Int
contarPares lista =
    lista
        |> List.filter (\x -> modBy 2 x == 0)
        |> List.length

-- 24. Promedio
promedio : List Float -> Float
promedio lista =
    case lista of
        [] ->
            0

        _ ->
            let
                suma = List.foldl (+) 0 lista
                cantidad = toFloat (List.length lista)
            in
            suma / cantidad

-- 25. Palabras a Longitudes
longitudesPalabras : String -> List Int
longitudesPalabras oracion =
    oracion
        |> String.words
        |> List.map String.length

-- 26. Remover Palabras Cortas
palabrasLargas : String -> List String
palabrasLargas oracion =
    oracion
        |> String.words
        |> List.filter (\palabra -> String.length palabra > 3)

-- 27. Sumar Números Positivos
sumarPositivos : List Int -> Int
sumarPositivos lista =
    lista
        |> List.filter (\x -> x > 0)
        |> List.foldl (+) 0

-- 28. Duplicar Pares
duplicarPares : List Int -> List Int
duplicarPares lista =
    List.map (\x -> if modBy 2 x == 0 then x * 2 else x) lista


-- Parte 5: Desafíos Avanzados

-- 29. Aplanar
aplanar : List (List a) -> List a
aplanar listaDeListas =
    List.foldl (++) [] listaDeListas

-- 30. Agrupar Por
agruparPor : (a -> a -> Bool) -> List a -> List (List a)
agruparPor comparar lista =
    case lista of
        [] ->
            []

        x :: xs ->
            let
                (iguales, resto) =
                    List.span (comparar x) xs
            in
            (x :: iguales) :: agruparPor comparar resto

-- 31. Particionar
particionar : (a -> Bool) -> List a -> (List a, List a)
particionar predicado lista =
    List.foldr
        (\x (verdaderos, falsos) ->
            if predicado x then
                (x :: verdaderos, falsos)
            else
                (verdaderos, x :: falsos)
        )
        ([], [])
        lista

-- 32. Suma Acumulada
sumaAcumulada : List Int -> List Int
sumaAcumulada lista =
    let
        (_, resultado) =
            List.foldl
                (\x (acum, res) ->
                    let
                        nuevo = acum + x
                    in
                     (nuevo, res ++ [nuevo])
                )
                (0, [])
                lista
    in
    resultado


-- Subconjuntos
subSets : List Int -> List (List Int)
subSets xs =
    case xs of
        [] ->
            [[]]

        x :: rest ->
            let
                subs = subSets rest
            in
            subs ++ List.map (\s -> x :: s) subs


-- Dividir en Grupos
-- 1.
tomar : Int -> List a -> List a
tomar n xs =
    case (n, xs) of
        (0, _) ->
            []

        (_, []) ->
            []

        (_, x :: rest) ->
            x :: tomar (n - 1) rest

-- 2.
saltar : Int -> List a -> List a
saltar n xs =
    case (n, xs) of
        (0, _) ->
            xs

        (_, []) ->
            []

        (_, _ :: rest) ->
            saltar (n - 1) rest

-- 3.
cortar : List Int -> Int -> List (List Int)
cortar xs n =
    case xs of
        [] ->
            []

        _ ->
            let
                grupo = tomar n xs
                resto = saltar n xs
            in
            grupo :: cortar resto n


-- Bonus: Entendiendo Fold Izquierdo vs Derecho

-- Usando foldl
ejemploFoldl : List Int
ejemploFoldl =
    List.foldl (::) [] [1, 2, 3]

-- foldr
ejemploFoldr : List Int
ejemploFoldr =
    List.foldr (::) [] [1, 2, 3]

-- Respuesta:
-- List.foldl recorre la lista de izquierda a derecha, pero va poniendo los elementos al principio del acumulador, por eso el resultado queda invertido.
-- List.foldr recorre desde la derecha hacia la izquierda y mantiene el orden original.
