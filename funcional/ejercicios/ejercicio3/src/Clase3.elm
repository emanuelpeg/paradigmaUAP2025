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
Este módulo contiene ejercicios para practicar funciones de orden superior en Elm.
Cada función debe implementarse usando principios de programación funcional.

Nota: Las funciones que podrían fallar devuelven valores por defecto (0)
en lugar de usar Maybe. Trabajamos con List de Elm.

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
            h = head lista
            resto = miFiltro predicado (tail lista)
        in
        if predicado h then
            h :: resto
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


-- 4. Duplicar Números
duplicar : List Int -> List Int
duplicar lista =
    miMap (\x -> x * 2) lista


-- 5. Longitudes de Strings
longitudes : List String -> List Int
longitudes lista =
    miMap String.length lista


-- 6. Incrementar Todos
incrementarTodos : List Int -> List Int
incrementarTodos lista =
    miMap (\x -> x + 1) lista


-- 7. A Mayúsculas
todasMayusculas : List String -> List String
todasMayusculas lista =
    miMap String.toUpper lista


-- 8. Negar Booleanos
negarTodos : List Bool -> List Bool
negarTodos lista =
    miMap not lista


-- ============================================================================
-- PARTE 2: ENTENDIENDO FILTER
-- ============================================================================


-- 9. Números Pares
pares : List Int -> List Int
pares lista =
    miFiltro (\x -> modBy 2 x == 0) lista


-- 10. Números Positivos
positivos : List Int -> List Int
positivos lista =
    miFiltro (\x -> x > 0) lista


-- 11. Strings Largos
stringsLargos : List String -> List String
stringsLargos lista =
    miFiltro (\s -> String.length s > 5) lista


-- 12. Remover Falsos
soloVerdaderos : List Bool -> List Bool
soloVerdaderos lista =
    miFiltro (\x -> x == True) lista


-- 13. Mayor Que
mayoresQue : Int -> List Int -> List Int
mayoresQue valor lista =
    miFiltro (\x -> x > valor) lista


-- ============================================================================
-- PARTE 3: ENTENDIENDO FOLD
-- ============================================================================


-- 14. Suma con Fold
sumaFold : List Int -> Int
sumaFold lista =
    miFoldl (\x acc -> x + acc) 0 lista


-- 15. Producto
producto : List Int -> Int
producto lista =
    miFoldl (\x acc -> x * acc) 1 lista


-- 16. Contar con Fold
contarFold : List a -> Int
contarFold lista =
    miFoldl (\_ acc -> acc + 1) 0 lista


-- 17. Concatenar Strings
concatenar : List String -> String
concatenar lista =
    miFoldl (\x acc -> x ++ acc) "" lista


-- 18. Valor Máximo
maximo : List Int -> Int
maximo lista =
    if isEmpty lista then
        0
    else
        miFoldl (\x acc -> if x > acc then x else acc) (head lista) (tail lista)


-- 19. Invertir con Fold
invertirFold : List a -> List a
invertirFold lista =
    miFoldl (\x acc -> x :: acc) [] lista


-- 20. Todos Verdaderos
todos : (a -> Bool) -> List a -> Bool
todos predicado lista =
    miFoldl (\x acc -> acc && predicado x) True lista


-- 21. Alguno Verdadero
alguno : (a -> Bool) -> List a -> Bool
alguno predicado lista =
    miFoldl (\x acc -> acc || predicado x) False lista


-- ============================================================================
-- PARTE 4: COMBINANDO OPERACIONES
-- ============================================================================


-- 22. Suma de Cuadrados
sumaDeCuadrados : List Int -> Int
sumaDeCuadrados lista =
    sumaFold (miMap (\x -> x * x) lista)


-- 23. Contar Números Pares
contarPares : List Int -> Int
contarPares lista =
    contarFold (pares lista)


-- 24. Promedio
promedio : List Float -> Float
promedio lista =
    if isEmpty lista then
        0
    else
        let
            suma = miFoldl (\x acc -> x + acc) 0 lista
            cantidad = contarFold lista
        in
        suma / toFloat cantidad


-- 25. Palabras a Longitudes
longitudesPalabras : String -> List Int
longitudesPalabras oracion =
    longitudes (String.words oracion)


-- 26. Remover Palabras Cortas
palabrasLargas : String -> List String
palabrasLargas oracion =
    miFiltro (\palabra -> String.length palabra > 3) (String.words oracion)


-- 27. Sumar Números Positivos
sumarPositivos : List Int -> Int
sumarPositivos lista =
    sumaFold (positivos lista)


-- 28. Duplicar Pares
duplicarPares : List Int -> List Int
duplicarPares lista =
    miMap (\x -> if modBy 2 x == 0 then x * 2 else x) lista


-- ============================================================================
-- PARTE 5: DESAFÍOS AVANZADOS
-- ============================================================================


-- 29. Aplanar
aplanar : List (List a) -> List a
aplanar lista =
    miFoldl (\sublista acc -> concatenarListas sublista acc) [] lista


-- Función auxiliar para concatenar listas
concatenarListas : List a -> List a -> List a
concatenarListas lista1 lista2 =
    if isEmpty lista1 then
        lista2
    else
        head lista1 :: concatenarListas (tail lista1) lista2


-- 30. Agrupar Por
agruparPor : (a -> a -> Bool) -> List a -> List (List a)
agruparPor comparador lista =
    if isEmpty lista then
        []
    else
        let
            primero = head lista
            resto = tail lista
            grupoActual = primero :: tomarMientras (\x -> comparador primero x) resto
            restante = saltarMientras (\x -> comparador primero x) resto
        in
        grupoActual :: agruparPor comparador restante


-- Funciones auxiliares para agruparPor
tomarMientras : (a -> Bool) -> List a -> List a
tomarMientras predicado lista =
    if isEmpty lista then
        []
    else if predicado (head lista) then
        head lista :: tomarMientras predicado (tail lista)
    else
        []


saltarMientras : (a -> Bool) -> List a -> List a
saltarMientras predicado lista =
    if isEmpty lista then
        []
    else if predicado (head lista) then
        saltarMientras predicado (tail lista)
    else
        lista


-- 31. Particionar
particionar : (a -> Bool) -> List a -> ( List a, List a )
particionar predicado lista =
    miFoldl 
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
    if isEmpty lista then
        []
    else
        sumaAcumuladaHelper lista 0


sumaAcumuladaHelper : List Int -> Int -> List Int
sumaAcumuladaHelper lista acum =
    if isEmpty lista then
        []
    else
        let
            nuevoAcum = acum + head lista
        in
        nuevoAcum :: sumaAcumuladaHelper (tail lista) nuevoAcum


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
                subsetsXs = subSets xs
                withX = miMap (\subset -> x :: subset) subsetsXs
            in
            concatenarListas subsetsXs withX


-- Dividir en Grupos
cortar : List Int -> Int -> List (List Int)
cortar lista n =
    if isEmpty lista then
        []
    else
        tomar n lista :: cortar (saltar n lista) n


-- Función auxiliar para tomar los primeros n elementos de una lista
tomar : Int -> List a -> List a
tomar n lista =
    if isEmpty lista then
        []
    else if n == 0 then
        []
    else
        head lista :: tomar (n - 1) (tail lista)


-- Función auxiliar para saltar los primeros n elementos de una lista
saltar : Int -> List a -> List a
saltar n lista =
    if isEmpty lista then
        []
    else if n == 0 then
        lista
    else
        saltar (n - 1) (tail lista)
