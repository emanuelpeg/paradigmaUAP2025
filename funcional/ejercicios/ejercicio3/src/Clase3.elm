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


miMap : (a -> b) -> List a -> List b
miMap fx lista =
    if isEmpty lista then []
    else fx (head lista) :: (miMap fx (tail lista))



-- 2. Filter Personalizado
-- Implementá tu propia versión de filter usando recursión


miFiltro : (a -> Bool) -> List a -> List a
miFiltro predicado lista =
    if isEmpty lista then []
    else let h = head lista in
    if (predicado h) then h :: (miFiltro predicado (tail lista))
    else miFiltro predicado (tail lista)



-- 3. Foldl Personalizado
-- Implementá tu propia versión de foldl usando recursión


miFoldl : (a -> b -> b) -> b -> List a -> b
miFoldl fx acumulador lista =
    if isEmpty lista then acumulador
    else let nuevoAcumulador = (fx (head lista) acumulador)
    in
        miFoldl fx nuevoAcumulador (tail lista)

--miFoldL (\numero state = state ++ (String.fromInt numero)) "" [1,2,3] --> 6
-- Transforma A en B

reverse : List a -> List a
reverse lista =
    miFoldl (\a b -> a :: b) [] lista

otherMap : (a -> b) -> List a -> List b
otherMap t lista =
    reverse (miFoldl(\h result -> (t h) :: result) [] lista)

otherFilter : (a -> Bool) -> List a -> List a
otherFilter filtro lista =
    reverse (miFoldl (\h result -> if filtro h then h :: result else result) [] lista)

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
    --miMap String.length lista
    miMap (\s -> String.length s) lista



-- 6. Incrementar Todos
-- Sumá 1 a cada número en una lista


incrementarTodos : List Int -> List Int
incrementarTodos lista =
    miMap (\x -> x + 1) lista



-- 7. A Mayúsculas
-- Convertí todos los strings de una lista a mayúsculas


todasMayusculas : List String -> List String
todasMayusculas lista =
    miMap (\s -> String.toUpper s) lista
    --miMap (\s -> String.toList s |> List.map Char.toUpper |> String.fromList) lista
    --miMap (\s -> String.map Char.toUpper s) lista



-- 8. Negar Booleanos
-- Invertí todos los valores booleanos en una lista


negarTodos : List Bool -> List Bool
negarTodos lista =
    miMap (\b -> not b) lista
    --miMap (\b -> if b then False else True) lista
    --miMap (\b -> case b of
    --                True -> False
    --                False -> True) lista



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
    miFiltro (\palabra -> String.length palabra > 4) lista



-- 12. Remover Falsos
-- Remové todos los valores False de una lista de booleanos


soloVerdaderos : List Bool -> List Bool
soloVerdaderos lista =
    --miFiltro (\b -> b) lista
    miFiltro (\b -> b == True) lista
    --miFiltro (\b -> case b of
    --                True -> True
    --                False -> False) lista



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
    miFoldl (\elemento acumulador -> acumulador + elemento) 0 lista
    --List.foldl (\elemento acumulador -> acumulador + elemento) 0 lista
    --List.foldl (+) 0 lista
    --List.sum lista



-- 15. Producto
-- Multiplicá todos los números de una lista entre sí


producto : List Int -> Int
producto lista =
    miFoldl (\elemento acumulador -> acumulador * elemento) 1 lista
    --List.foldl (\elemento acumulador -> acumulador * elemento) 1 lista
    --List.foldl (*) 1 lista
    --List.product lista



-- 16. Contar con Fold
-- Implementá contar usando List.foldl


contarFold : List a -> Int
contarFold lista =
    miFoldl (\elemento acumulador -> acumulador + 1) 0 lista



-- 17. Concatenar Strings
-- Uní todos los strings de una lista


concatenar : List String -> String
concatenar lista =
    miFoldl (\elemento acumulador -> acumulador ++ elemento) "" lista
    --List.foldl (\elemento acumulador -> acumulador ++ elemento) "" lista
    --List.foldl (++) "" lista
    --String.join "" lista
    --String.concat lista



-- 18. Valor Máximo
-- Encontrá el valor máximo en una lista de números (devolvé 0 para lista vacía)


maximo : List Int -> Int
maximo lista =
    miFoldl (\elemento acumulador -> if elemento > acumulador then elemento else acumulador) 0 lista
    --List.foldl (\elemento acumulador -> if elemento > acumulador then elemento else acumulador) 0 lista
    --List.maximum lista |> Maybe.withDefault 0



-- 19. Invertir con Fold
-- Invertí una lista usando List.foldl


invertirFold : List a -> List a
invertirFold lista =
    miFoldl (\elemento acumulador -> elemento :: acumulador) [] lista
    --List.foldl (\elemento acumulador -> elemento :: acumulador) [] lista
    --List.reverse lista



-- 20. Todos Verdaderos
-- Verificá si todos los elementos de una lista satisfacen una condición


todos : (a -> Bool) -> List a -> Bool
todos predicado lista =
    -- contar (miFiltro predicado lista) == contar lista (no hace lo que necesitamos)
    miFoldl (\elemento acumulador -> acumulador && (predicado elemento)) True lista



-- 21. Alguno Verdadero
-- Verificá si al menos un elemento satisface una condición


alguno : (a -> Bool) -> List a -> Bool
alguno predicado lista =
    miFoldl (\elemento acumulador -> acumulador || (predicado elemento)) False lista



-- ============================================================================
-- PARTE 4: COMBINANDO OPERACIONES
-- ============================================================================


-- 22. Suma de Cuadrados
-- Calculá la suma de los cuadrados de todos los números


sumaDeCuadrados : List Int -> Int
sumaDeCuadrados lista =
    miFoldl (\elemento acumulador -> acumulador + (elemento * elemento)) 0 lista
    --List.foldl (\elemento acumulador -> acumulador + (elemento * elemento)) 0 lista
    --List.sum (miMap (\x -> x * x) lista)
    --List.sum (List.map (\x -> x * x) lista)



-- 23. Contar Números Pares
-- Contá cuántos números pares hay en una lista


contarPares : List Int -> Int
contarPares lista =
    miFoldl (\elemento acumulador -> if modBy 2 elemento == 0 then acumulador + 1 else acumulador) 0 lista
    --List.foldl (\elemento acumulador -> if modBy 2 elemento == 0 then acumulador + 1 else acumulador) 0 lista
    --contar (miFiltro (\x -> modBy 2 x == 0) lista)
    --List.length (List.filter (\x -> modBy 2 x == 0) lista)



-- 24. Promedio
-- Calculá el promedio de una lista de números (devolvé 0 para lista vacía)


promedio : List Float -> Float
promedio lista =
    if isEmpty lista then 0
    --toFloat para que no de error de tipos
    else (miFoldl (\elemento acumulador -> acumulador + elemento) 0 lista) / (toFloat (miFoldl (\_ acumulador -> acumulador + 1) 0 lista))
    --if isEmpty lista then 0
    --else (List.sum lista) / (toFloat (List.length lista))



-- 25. Palabras a Longitudes
-- Dada una oración (string), dividila en palabras y devolvé sus longitudes


longitudesPalabras : String -> List Int
longitudesPalabras oracion =
    miFoldl (\palabra acumulador -> acumulador ++ [String.length palabra]) [] (String.words oracion)
    -- String.length longitudesPalabras "Hola mundo" --> [4,5]
    -- String.words cantidad de palabras



-- 26. Remover Palabras Cortas
-- Mantené solo las palabras con más de 3 caracteres de una oración


palabrasLargas : String -> List String
palabrasLargas oracion =
    --miFiltro (\palabra -> String.length palabra > 3) (String.words oracion)
    --List.filter (\palabra -> String.length palabra > 3) (String.words oracion)
    miFiltro (\palabra -> contarFold (String.toList palabra) > 3) (String.words oracion)



-- 27. Sumar Números Positivos
-- Sumá solo los números positivos de una lista


sumarPositivos : List Int -> Int
sumarPositivos lista =
    miFoldl (\elemento acumulador -> if elemento > 0 then acumulador + elemento else acumulador) 0 lista
    --List.foldl (\elemento acumulador -> if elemento > 0 then acumulador + elemento else acumulador) 0 lista
    --List.sum (miFiltro (\x -> x > 0) lista)
    --List.sum (List.filter (\x -> x > 0) lista)



-- 28. Duplicar Pares
-- Duplicá solo los números pares de una lista, mantené los impares sin cambios


duplicarPares : List Int -> List Int
duplicarPares lista =
    miMap (\x -> if modBy 2 x == 0 then x * 2 else x) lista
    --List.map (\x -> if modBy 2 x == 0 then x * 2 else x) lista



-- ============================================================================
-- PARTE 5: DESAFÍOS AVANZADOS
-- ============================================================================


-- 29. Aplanar
-- Aplaná una lista de listas en una única lista


aplanar : List (List a) -> List a
aplanar lista =
    miFoldl (\sublista acumulador -> acumulador ++ sublista) [] lista
    --List.foldl (\sublista acumulador -> acumulador ++ sublista) [] lista
    --List.concat lista
    --List.flatten lista



-- 30. Agrupar Por
-- Agrupá elementos por una función clave (devolvé lista de listas)
-- ¡Esto es desafiante! Agrupá elementos iguales consecutivos juntos


agruparPor : (a -> a -> Bool) -> List a -> List (List a)
agruparPor comparador lista =
    case lista of
        [] -> []
        head1::tail1 ->
            case agruparPor comparador tail1 of
                [] -> [[head1]]
                head2::tail2 ->
                    if comparador head1 (head head2) then
                        (head1 :: head2) :: tail2
                    else
                        [head1] :: head2 :: tail2
    -- agruparPor (\x y -> x == y) [1,1,2,2,3,1] --> [[1,1],[2,2],[3],[1]]




-- 31. Particionar
-- Separá una lista en dos listas basándote en un predicado


particionar : (a -> Bool) -> List a -> ( List a, List a )
particionar predicado lista =
    ( miFiltro predicado lista, miFiltro (\x -> not (predicado x)) lista )
    -- funcionamiento: 
        -- miFiltro predicado lista --> lista con los que cumplen el predicado
    --( List.filter predicado lista, List.filter (\x -> not (predicado x)) lista )



-- 32. Suma Acumulada
-- Creá una lista de sumas acumuladas


sumaAcumulada : List Int -> List Int
sumaAcumulada lista =
    case lista of
        [] -> []
        h::t -> miFoldl (\x acc -> (head acc + x) :: acc) [h] t |> List.reverse

    -- sumaAcumulada [1,2,3] --> [1,3,6]
    -- Funcionamiento: 
        -- miFoldl (\x acc -> (head acc + x) :: acc) [h] t 
            -- head acc --> toma el primer elemento de la lista acumulada (la suma hasta el momento)
            -- + x --> le suma el siguiente elemento de la lista original
            -- :: acc --> agrega el nuevo valor al frente de la lista acumulada
        -- |> List.reverse --> invierte la lista para que esté en el orden correcto

        -- [h] es la lista inicial con el primer elemento de la lista original
        -- t es el resto de la lista original para procesar
        -- [h] t --> [1] [2,3]



-- ============================================================================
-- EJERCICIOS OPCIONALES
-- ============================================================================


-- Subconjuntos
-- Generá todos los posibles subconjuntos de una lista


subSets : List Int -> List (List Int)
subSets lista =
    case lista of
        [] -> [ [] ]
        head1::tail1 ->
            let
                subsetsSinElemento = subSets tail1
                subsetsConElemento = miMap (\subset -> head1 :: subset) subsetsSinElemento
            in
                subsetsSinElemento ++ subsetsConElemento

    -- Funcionamiento: 
        -- Si la lista está vacía, el único subconjunto es la lista vacía: [ [] ]
        -- Si la lista no está vacía, tomamos el primer elemento (x) y el resto (xs)
        -- Calculamos los subconjuntos de xs (subsetsSinElemento)
        -- Luego, para cada subconjunto en subsetsSinElemento, creamos un nuevo subconjunto que incluye x (subsetsConElemento)
        -- Finalmente, combinamos ambos conjuntos de subconjuntos (subsetsSinElemento ++ subsetsConElemento)
    -- subSets [1,2] --> [[],[2],[1],[1,2]]



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
