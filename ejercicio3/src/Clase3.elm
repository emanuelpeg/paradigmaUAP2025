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


{-| Ejercicios de Programación Funcional - Clase 3
-}


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
-- PARTE 1: ENTENDIENDO MAP (Usando miMap)
-- ============================================================================


-- 4. Duplicar Números
duplicar : List Int -> List Int
duplicar lista =
    miMap (\n -> n * 2) lista


-- 5. Longitudes de Strings
longitudes : List String -> List Int
longitudes lista =
    miMap String.length lista


-- 6. Incrementar Todos
incrementarTodos : List Int -> List Int
incrementarTodos lista =
    miMap (\n -> n + 1) lista


-- 7. A Mayúsculas
todasMayusculas : List String -> List String
todasMayusculas lista =
    miMap String.toUpper lista


-- 8. Negar Booleanos
negarTodos : List Bool -> List Bool
negarTodos lista =
    miMap not lista



-- ============================================================================
-- PARTE 2: ENTENDIENDO FILTER (Usando miFiltro)
-- ============================================================================


-- 9. Números Pares
pares : List Int -> List Int
pares lista =
    miFiltro (\n -> modBy 2 n == 0) lista


-- 10. Números Positivos
positivos : List Int -> List Int
positivos lista =
    miFiltro (\n -> n > 0) lista


-- 11. Strings Largos
stringsLargos : List String -> List String
stringsLargos lista =
    miFiltro (\s -> String.length s > 5) lista


-- 12. Remover Falsos
soloVerdaderos : List Bool -> List Bool
soloVerdaderos lista =
    miFiltro identity lista


-- 13. Mayor Que
mayoresQue : Int -> List Int -> List Int
mayoresQue valor lista =
    miFiltro (\n -> n > valor) lista



-- ============================================================================
-- PARTE 3: ENTENDIENDO FOLD
-- ============================================================================


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
        [] -> 0
        x :: xs -> List.foldl max x xs


-- 19. Invertir con Fold
invertirFold : List a -> List a
invertirFold lista =
    List.foldl (\elem acc -> elem :: acc) [] lista


-- 20. Todos Verdaderos
todos : (a -> Bool) -> List a -> Bool
todos predicado lista =
    List.foldl (\x acc -> acc && predicado x) True lista


-- 21. Alguno Verdadero
alguno : (a -> Bool) -> List a -> Bool
alguno predicado lista =
    List.foldl (\x acc -> acc || predicado x) False lista



-- ============================================================================
-- PARTE 4: COMBINANDO OPERACIONES
-- ============================================================================


-- 22. Suma de Cuadrados
sumaDeCuadrados : List Int -> Int
sumaDeCuadrados lista =
    lista
        |> List.map (\n -> n * n)
        |> List.sum


-- 23. Contar Números Pares
contarPares : List Int -> Int
contarPares lista =
    lista
        |> List.filter (\n -> modBy 2 n == 0)
        |> List.length


-- 24. Promedio
promedio : List Float -> Float
promedio lista =
    let
        total = List.sum lista
        count = List.length lista
    in
    if count == 0 then
        0
    else
        total / toFloat count


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
        |> List.filter (\p -> String.length p > 3)


-- 27. Sumar Números Positivos
sumarPositivos : List Int -> Int
sumarPositivos lista =
    lista
        |> List.filter (\n -> n > 0)
        |> List.sum


-- 28. Duplicar Pares (los impares quedan igual)
duplicarPares : List Int -> List Int
duplicarPares lista =
    List.map (\n -> if modBy 2 n == 0 then n * 2 else n) lista



-- ============================================================================
-- PARTE 5: DESAFÍOS AVANZADOS
-- ============================================================================


-- 29. Aplanar
aplanar : List (List a) -> List a
aplanar lista =
    List.concat lista
    -- Alternativa con fold: List.foldl (++) [] lista


-- 30. Agrupar Por (Consecutivos iguales)
agruparPor : (a -> a -> Bool) -> List a -> List (List a)
agruparPor comparador lista =
    case lista of
        [] ->
            []

        first :: rest ->
            let
                -- Función auxiliar para tomar elementos mientras cumplan la condición con el primero
                tomarMientras : a -> List a -> ( List a, List a )
                tomarMientras pivote l =
                    case l of
                        [] ->
                            ( [], [] )

                        y :: ys ->
                            if comparador pivote y then
                                let
                                    (match, remaining) = tomarMientras pivote ys
                                in
                                ( y :: match, remaining )
                            else
                                ( [], l )
                
                (grupoActual, resto) = tomarMientras first rest
            in
            (first :: grupoActual) :: agruparPor comparador resto


-- 31. Particionar
particionar : (a -> Bool) -> List a -> ( List a, List a )
particionar predicado lista =
    -- Usamos List.partition nativo, o se puede implementar con foldr
    List.partition predicado lista


-- 32. Suma Acumulada ([1, 2, 3] -> [1, 3, 6])
sumaAcumulada : List Int -> List Int
sumaAcumulada lista =
    let
        -- foldl produce la lista al revés, así que necesitamos invertirla al final
        operacion x (accList, currentSum) =
            let
                newSum = currentSum + x
            in
            ( newSum :: accList, newSum )
        
        (resultadoInvertido, _) = List.foldl operacion ([], 0) lista
    in
    List.reverse resultadoInvertido



-- ============================================================================
-- EJERCICIOS OPCIONALES
-- ============================================================================


-- Subconjuntos
subSets : List Int -> List (List Int)
subSets lista =
    case lista of
        [] ->
            [ [] ]

        x :: xs ->
            let
                subsetResto = subSets xs
            in
            subsetResto ++ List.map ((::) x) subsetResto


-- Dividir en Grupos (Implementado usando tus helpers)
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
    else if n <= 0 then
        []
    else
        head lista :: tomar (n - 1) (tail lista)


saltar : Int -> List a -> List a
saltar n lista =
    if isEmpty lista then
        []
    else if n <= 0 then
        lista
    else
        saltar (n - 1) (tail lista)