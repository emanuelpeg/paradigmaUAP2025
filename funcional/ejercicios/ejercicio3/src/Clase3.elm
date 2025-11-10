module Clase3 exposing (..)
import List exposing (filter)
import Fuzz exposing (string)
import Html exposing (b)
import Fuzz exposing (list)
import List exposing (head)
import Html exposing (s)


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


miMap : (a -> b) -> List a -> List b
miMap fx lista =
    if isEmpty lista then []
    else fx (head lista) :: miMap fx (tail lista)




-- 2. Filter Personalizado
-- Implementá tu propia versión de filter usando recursión


miFiltro : (a -> Bool) -> List a -> List a
miFiltro predicado lista =
    if isEmpty lista then []
    else let h = head lista in 
    if (predicado h) then h :: miFiltro predicado (tail lista)  
    else miFiltro predicado (tail lista)



-- 3. Foldl Personalizado
-- Implementá tu propia versión de foldl usando recursión


miFoldl : (a -> b -> b) -> b -> List a -> b
miFoldl fx acumulador lista =
    if isEmpty lista then acumulador
    else let nuevoAcummulador = (fx (head lista) acumulador)
    in
    miFoldl fx nuevoAcummulador (tail lista)

reverse: List a -> List a 
reverse lista = 
    miFoldl(\a b -> a :: b) [] lista

otherMap : (a -> b) -> List a -> List b
otherMap t lista =
    reverse (miFoldl (\h result -> (t h) :: result) [] lista)

otherFilter : (a -> Bool) -> List a -> List a
otherFilter filtro lista =
    reverse (miFoldl (\h result -> if filtro h then h :: result
        else result) [] lista)


-- ============================================================================
-- PARTE 1: ENTENDIENDO MAP
-- ============================================================================


-- 4. Duplicar Números
-- Escribí una función que duplique cada número en una lista


duplicar : List Int -> List Int
duplicar lista =
    miMap (\x -> x * 2) lista



-- 5. Longitudes de Strings
-- Convertí una lista de strings a una lista de sus longitudes


longitudes : List String -> List Int
longitudes lista =
    miMap (\x -> String.length x) lista



-- 6. Incrementar Todos
-- Sumá 1 a cada número en una lista


incrementarTodos : List Int -> List Int
incrementarTodos lista =
    miMap (\x -> x+1) lista



-- 7. A Mayúsculas
-- Convertí todos los strings de una lista a mayúsculas


todasMayusculas : List String -> List String
todasMayusculas lista =
    miMap (\x -> String.toUpper x) lista



-- 8. Negar Booleanos
-- Invertí todos los valores booleanos en una lista


negarTodos : List Bool -> List Bool
negarTodos lista =
    miMap (\x -> not x) lista



-- ============================================================================
-- PARTE 2: ENTENDIENDO FILTER
-- ============================================================================


-- 9. Números Pares
-- Mantené solo los números pares de una lista


pares : List Int -> List Int
pares lista =
    miFiltro (\x -> modBy 2 x == 0) lista



-- 10. Números Positivos
-- Mantené solo los números positivos


positivos : List Int -> List Int
positivos lista =
    miFiltro (\x -> x > 0) lista



-- 11. Strings Largos
-- Mantené solo los strings con más de 5 caracteres


stringsLargos : List String -> List String
stringsLargos lista =
    miFiltro (\x -> String.length x >= 5) lista



-- 12. Remover Falsos
-- Remové todos los valores False de una lista de booleanos


soloVerdaderos : List Bool -> List Bool
soloVerdaderos lista =
    miFiltro (\x -> x == True) lista



-- 13. Mayor Que
-- Filtrá números mayores que un valor dado


mayoresQue : Int -> List Int -> List Int
mayoresQue valor lista =
    miFiltro (\x -> x > valor) lista 



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
    miFoldl (\_ acc -> acc + 1) 0 lista --Ignora el 0 que le estoy pasando y por cada elemento va sumando uno al acumulador



-- 17. Concatenar Strings
-- Uní todos los strings de una lista


concatenar : List String -> String
concatenar lista =
    miFoldl (\elem acum -> acum++elem) "" lista



-- 18. Valor Máximo
-- Encontrá el valor máximo en una lista de números (devolvé 0 para lista vacía)


maximo : List Int -> Int
maximo lista =
    miFoldl (\x y -> if x > y then x else y) 0 lista 



-- 19. Invertir con Fold
-- Invertí una lista usando List.foldl


invertirFold : List a -> List a
invertirFold lista =
    miFoldl (\a b -> a :: b) [] lista



-- 20. Todos Verdaderos
-- Verificá si todos los elementos de una lista satisfacen una condición


todos : (a -> Bool) -> List a -> Bool
todos predicado lista =
    miFoldl (\elem acum -> acum &&(predicado elem) ) True lista



-- 21. Alguno Verdadero
-- Verificá si al menos un elemento satisface una condición


alguno : (a -> Bool) -> List a -> Bool
alguno predicado lista =
    miFoldl (\elem acum-> acum || (predicado elem)) False lista



-- ============================================================================
-- PARTE 4: COMBINANDO OPERACIONES
-- ============================================================================


-- 22. Suma de Cuadrados
-- Calculá la suma de los cuadrados de todos los números


sumaDeCuadrados : List Int -> Int
sumaDeCuadrados lista =
    sumaFold (miMap (\x -> x * x) lista)



-- 23. Contar Números Pares
-- Contá cuántos números pares hay en una lista


contarPares : List Int -> Int
contarPares lista =
    contarFold (pares lista)



-- 24. Promedio
-- Calculá el promedio de una lista de números (devolvé 0 para lista vacía)


promedio : List Float -> Float
promedio lista =
    if isEmpty lista then 0
    else (miFoldl (+) 0 lista) / (miFoldl (\_ acc -> acc + 1) 0 lista)


-- 25. Palabras a Longitudes
-- Dada una oración (string), dividila en palabras y devolvé sus longitudes


longitudesPalabras : String -> List Int
longitudesPalabras oracion =
    longitudes (String.words oracion)



-- 26. Remover Palabras Cortas
-- Mantené solo las palabras con más de 3 caracteres de una oración


palabrasLargas : String -> List String
palabrasLargas oracion =
    (miFiltro (\x -> String.length x > 3) (String.words oracion))



-- 27. Sumar Números Positivos
-- Sumá solo los números positivos de una lista


sumarPositivos : List Int -> Int
sumarPositivos lista =
    sumaFold (positivos lista)



-- 28. Duplicar Pares
-- Duplicá solo los números pares de una lista, mantené los impares sin cambios


duplicarPares : List Int -> List Int
duplicarPares lista =
    reverse(miFoldl (\x acc -> if modBy 2 x == 0 then (x * 2) :: acc else x :: acc) [] lista)



-- ============================================================================
-- PARTE 5: DESAFÍOS AVANZADOS
-- ============================================================================


-- 29. Aplanar
-- Aplaná una lista de listas en una única lista


aplanar : List (List a) -> List a
aplanar lista =
    miFoldl (\x acc -> acc ++ x) [] lista



-- 30. Agrupar Por
-- Agrupá elementos por una función clave (devolvé lista de listas)
-- ¡Esto es desafiante! Agrupá elementos iguales consecutivos juntos


agruparPor : (a -> a -> Bool) -> List a -> List (List a)
agruparPor comparador lista =
    case lista of
        [] ->
            []

        [x] ->
            [[x]]

        h :: h2 :: resto ->
            if comparador h h2 then
                case agruparPor comparador (h2 :: resto) of
                    (g :: gs) ->
                        (h :: g) :: gs
                    [] ->
                        [[h, h2]]
            else
                [h] :: agruparPor comparador (h2 :: resto)

-- 31. Particionar
-- Separá una lista en dos listas basándote en un predicado


particionar : (a -> Bool) -> List a -> ( List a, List a )
particionar predicado lista =
    case lista of 
        [] ->  ( [], [] )
        h :: rest -> 
            let
                list = miFiltro predicado lista
                list2=miFiltro (not<<predicado) lista
            in
            (list,list2)


-- 32. Suma Acumulada
-- Creá una lista de sumas acumuladas


sumaAcumulada : List Int -> List Int
sumaAcumulada lista =
    List.reverse(miFoldl (\x acum -> if isEmpty acum then x :: acum else (x + (head acum)) :: acum) [] lista)


-- ============================================================================
-- EJERCICIOS OPCIONALES
-- ============================================================================


-- Subconjuntos
-- Generá todos los posibles subconjuntos de una lista


subSets : List Int -> List (List Int)
subSets lista =
    miFoldl
        (\x acc ->acc ++ (miMap (\subset -> x :: subset) acc)) [ [] ] lista



-- 1,2,3 -> [] :: [1] :: [] :: [2] :: [] :: [3] 
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