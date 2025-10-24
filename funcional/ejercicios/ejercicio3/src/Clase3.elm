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
-- Implementá tus propias versiones de map, filter y fold usando recursión


-- 1. Map Personalizado
-- Implementá tu propia versión de map usando recursión y las funciones genéricas head, tail e isEmpty


miMap : (a -> b) -> List a -> List b -- sirve para trabajar con cada uno de los elemntos de la lista a
miMap fx lista =
    if isEmpty lista then
        []
    else
        fx (head lista) :: miMap fx (tail lista)


-- 2. Filter Personalizado
-- Implementá tu propia versión de filter usando recursión


miFiltro : (a -> Bool) -> List a -> List a -- es para filtrar elementos de la lista a bajo una condicion 
miFiltro predicado lista = -- predicado va a ser la condicion que le vamos a dar a la lista 
    if isEmpty lista then
        []
    else if predicado (head lista) then
        head lista :: miFiltro predicado (tail lista)
    else
        miFiltro predicado (tail lista)



-- 3. Foldl Personalizado
-- Implementá tu propia versión de foldl usando recursión


miFoldl : (a -> b -> b) -> b -> List a -> b -- es una funcion que devuelve un solo valor 
miFoldl fx acumulador lista =
    if isEmpty lista then
        acumulador
    else 
        miFoldl fx (fx (head lista) acumulador) (tail lista)



-- ============================================================================
-- PARTE 1: ENTENDIENDO MAP
-- ============================================================================


-- 4. Duplicar Números
-- Escribí una función que duplique cada número en una lista


duplicar : List Int -> List Int
duplicar lista =
    miMap (\x -> x *2 ) lista


-- 5. Longitudes de Strings
-- Convertí una lista de strings a una lista de sus longitudes


longitudes : List String -> List Int
longitudes lista =
    if isEmpty lista then
        []
    else
        miMap String.length lista


-- 6. Incrementar Todos
-- Sumá 1 a cada número en una lista


incrementarTodos : List Int -> List Int
incrementarTodos lista =
    if isEmpty lista then
        []
    else
        miMap (\x -> x + 1) lista 


-- 7. A Mayúsculas
-- Convertí todos los strings de una lista a mayúsculas


todasMayusculas : List String -> List String
todasMayusculas lista =
    if isEmpty lista then
        []
    else
        miMap String.toUpper lista


-- 8. Negar Booleanos
-- Invertí todos los valores booleanos en una lista


negarTodos : List Bool -> List Bool
negarTodos lista =
    if isEmpty lista then
        []
    else
        miMap not lista



-- ============================================================================
-- PARTE 2: ENTENDIENDO FILTER
-- ============================================================================


-- 9. Números Pares
-- Mantené solo los números pares de una lista


pares : List Int -> List Int
pares lista =
    miFiltro (\x -> modBy 2 x == 0) lista -- aca no agrego los isEmpty para el caso base pq me acorde tarde que ya estaban implementadas en las funciones miMap, miFiltro y miFold



-- 10. Números Positivos
-- Mantené solo los números positivos


positivos : List Int -> List Int
positivos lista =
    miFiltro (\x -> x>0) lista 



-- 11. Strings Largos
-- Mantené solo los strings con más de 5 caracteres


stringsLargos : List String -> List String
stringsLargos lista =
    miFiltro (\s -> String.length s >= 5) lista -- aca le puse >= pq sino no me tomaba las palabras de 5 letras



-- 12. Remover Falsos
-- Remové todos los valores False de una lista de booleanos


soloVerdaderos : List Bool -> List Bool
soloVerdaderos lista =
    miFiltro (\b -> b == True) lista



-- 13. Mayor Que
-- Filtrá números mayores que un valor dado


mayoresQue : Int -> List Int -> List Int
mayoresQue valor lista =
    miFiltro (\x -> valor < x) lista



-- ============================================================================
-- PARTE 3: ENTENDIENDO FOLD
-- ============================================================================


-- 14. Suma con Fold
-- Implementá suma usando List.foldl


sumaFold : List Int -> Int
sumaFold lista =
    miFoldl (+) 0 lista



-- 15. Producto
-- Multiplicá todos los números de una lista entre sí


producto : List Int -> Int
producto lista =
    miFoldl (*) 1 lista



-- 16. Contar con Fold
-- Implementá contar usando List.foldl


contarFold : List a -> Int
contarFold lista =
    miFoldl (\_ acumulador -> acumulador + 1) 0 lista



-- 17. Concatenar Strings
-- Uní todos los strings de una lista


concatenar : List String -> String
concatenar lista =
    miFoldl (\string acc -> acc ++ string) "" lista 
-- ++ es un operador de elm para unir dos strings



-- 18. Valor Máximo
-- Encontrá el valor máximo en una lista de números (devolvé 0 para lista vacía)


maximo : List Int -> Int
maximo lista =
    if isEmpty lista then
        0
    else
        miFoldl max (head lista) (tail lista)



-- 19. Invertir con Fold
-- Invertí una lista usando List.foldl


invertirFold : List a -> List a
invertirFold lista =
    miFoldl (\x acc -> x :: acc) [] lista



-- 20. Todos Verdaderos
-- Verificá si todos los elementos de una lista satisfacen una condición


todos : (a -> Bool) -> List a -> Bool
todos predicado lista =
    if isEmpty lista then
        True
    else
        miFoldl (\x acc -> acc && predicado x) True lista



-- 21. Alguno Verdadero
-- Verificá si al menos un elemento satisface una condición


alguno : (a -> Bool) -> List a -> Bool
alguno predicado lista =
    if isEmpty lista then
        False
    else
        miFoldl (\x acc -> acc || predicado x) False lista



-- ============================================================================
-- PARTE 4: COMBINANDO OPERACIONES
-- ============================================================================


-- 22. Suma de Cuadrados
-- Calculá la suma de los cuadrados de todos los números


sumaDeCuadrados : List Int -> Int
sumaDeCuadrados lista =
    if isEmpty lista then
        0
    else
        miFoldl (+) 0 (miMap (\x -> x * x) lista)


-- 23. Contar Números Pares
-- Contá cuántos números pares hay en una lista


contarPares : List Int -> Int
contarPares lista =
    if isEmpty lista then
        0
    else
        miFoldl (\_ acc -> acc + 1) 0 (miFiltro (\x -> modBy 2 x == 0) lista)
        --contarFold (miFiltro (\x -> modBy 2 x == 0) lista) tambien se podria hacer asi ya que ya hay una 
        --funcion que cuenta los elementos de una lista

-- 24. Promedio
-- Calculá el promedio de una lista de números (devolvé 0 para lista vacía)


promedio : List Float -> Float
promedio lista =
    if isEmpty lista then
        0
    else
        (miFoldl (+) 0 lista) / 3



-- 25. Palabras a Longitudes
-- Dada una oración (string), dividila en palabras y devolvé sus longitudes


longitudesPalabras : String -> List Int
longitudesPalabras oracion =
    if String.words oracion == [] then
        []
    else
        miMap String.length (String.words oracion)


-- 26. Remover Palabras Cortas
-- Mantené solo las palabras con más de 3 caracteres de una oración


palabrasLargas : String -> List String
palabrasLargas oracion =
    oracion
        |> String.words
        |> miFiltro (\palabra -> String.length palabra > 3)



-- 27. Sumar Números Positivos
-- Sumá solo los números positivos de una lista


sumarPositivos : List Int -> Int
sumarPositivos lista =
    miFoldl (+) 0 (miFiltro (\x -> x > 0) lista)



-- 28. Duplicar Pares
-- Duplicá solo los números pares de una lista, mantené los impares sin cambios


duplicarPares : List Int -> List Int
duplicarPares lista =
    miMap (\x -> if modBy 2 x == 0 then x * 2 else x) lista


-- ============================================================================
-- PARTE 5: DESAFÍOS AVANZADOS
-- ============================================================================


-- 29. Aplanar
-- Aplaná una lista de listas en una única lista


aplanar : List (List a) -> List a
aplanar lista =
    miFoldl (\sublista acc -> acc ++ sublista) [] lista



-- 30. Agrupar Por
-- Agrupá elementos por una función clave (devolvé lista de listas)
-- ¡Esto es desafiante! Agrupá elementos iguales consecutivos juntos


agruparPor : (a -> a -> Bool) -> List a -> List (List a)
agruparPor comparador lista =
    case lista of
        [] ->
            []

        x :: xs ->
            agruparAux comparador xs [x] []

agruparAux : (a -> a -> Bool) -> List a -> List a -> List (List a) -> List (List a)
agruparAux comparador lista grupoActual gruposCompletos =
    case lista of
        [] ->
            gruposCompletos ++ [grupoActual] -- cuando se termina la lista agrega el grupo actual a los grupos completos

        y :: ys ->
            if comparador (head grupoActual) y then
                agruparAux comparador ys (grupoActual ++ [y]) gruposCompletos -- y es igual: seguimos agregando al grupo actual
            else
                agruparAux comparador ys [y] (gruposCompletos ++ [grupoActual]) -- y es diferente: cerramos el grupo actual y empezamos uno nuevo



-- 31. Particionar
-- Separá una lista en dos listas basándote en un predicado


particionar : (a -> Bool) -> List a -> ( List a, List a )
particionar predicado lista =
    particionarAux predicado lista [] []

particionarAux : (a -> Bool) -> List a -> List a -> List a -> ( List a, List a )
particionarAux predicado lista listaTrue listaFalse =
    case lista of
        [] ->
            ( listaTrue, listaFalse )

        x :: xs ->
            if predicado x then
                particionarAux predicado xs (listaTrue ++ [x]) listaFalse
            else
                particionarAux predicado xs listaTrue (listaFalse ++ [x])


-- 32. Suma Acumulada
-- Creá una lista de sumas acumuladas


sumaAcumulada : List Int -> List Int
sumaAcumulada lista =
    sumaAcumuladaAux lista 0

sumaAcumuladaAux : List Int -> Int -> List Int
sumaAcumuladaAux lista sumaParcial =    
    case lista of
        [] ->
            []

        x :: xs ->
            let
                nuevaSuma =
                    sumaParcial + x
            in
            nuevaSuma :: sumaAcumuladaAux xs nuevaSuma



-- ============================================================================
-- EJERCICIOS OPCIONALES
-- ============================================================================


-- Subconjuntos
-- Generá todos los posibles subconjuntos de una lista


subSets : List Int -> List (List Int)
subSets lista =
    case lista of
        [] ->
            [ [] ]

        x :: xs ->
            let
                subsinX =
                    subSets xs

                subsconX =
                    miMap (\sub -> x :: sub) subsinX
            in
            subsinX ++ subsconX



-- Dividir en Grupos
-- Dividí una lista en grupos de tamaño n


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
-- --- IGNORE ---