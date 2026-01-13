module Clase2 exposing (..)


head : List a -> a
head lista =
    case List.head lista of 
        Just h ->
            h   
        Nothing -> Debug.todo "head called on empty list"


tail : List a -> List a
tail lista =
    Maybe.withDefault [] (List.tail lista)


isEmpty : List a -> Bool
isEmpty lista =
    List.isEmpty lista


{-| Ejercicios de Programación Funcional - Clase 2
Este módulo contiene ejercicios para practicar conceptos de programación funcional en Elm.
Cada función debe implementarse usando principios de programación funcional.

Nota: Las funciones que podrían fallar (como buscar elementos) devuelven valores por defecto (0)
en lugar de usar Maybe. Trabajamos con List en lugar del List de Scala.

-}



-- Concatenar
-- Dadas 2 listas, devuelve una lista que es la concatenación de ambas.
-- Usar recursión


concatenar : List Int -> List Int -> List Int
concatenar lista1 lista2 =
    if isEmpty lista1 then lista2
    else (head lista1) :: concatenar (tail lista1) lista2


--concatenar [1,2,3] | [4,5,6] -> 1 :: concatenar [2,3] | [4,5,6] -- 1 :: [2,3,4,5,6]
--concatenar [2,3] | [4,5,6] -> 2 :: concatenar [3] | [4,5,6] -- 2 :: [3,4,5,6]
--concatenar [3] | [4,5,6] -> 3 :: concatenar [] | [4,5,6] -- 3 :: [4,5,6]
--concatenar [] | [4,5,6]


-- Buscar
-- Dada una lista y una función de comparación, devuelve el valor que cumple la condición.
-- Devuelve 0 si la lista está vacía.


buscar : List Int -> (Int -> Int -> Bool) -> Int
buscar lista com =
    if isEmpty lista then 
        0
    else if (isEmpty (tail lista)) then 
        head lista
    else 
        let
            h = head lista
            m = buscar (tail lista) com
        in
        if (com h m) then h
        else m



-- Busca el Máximo
-- Encuentra el valor máximo en una lista

maximo : List Int -> Int
maximo lista =
    buscar lista (\x y -> x > y)


-- Busca el Mínimo
-- Encuentra el valor mínimo en una lista

minimo : List Int -> Int
minimo lista =
    buscar lista (\x y -> x < y)



-- Filtra la lista de valores mayores que el valor e pasado por parámetro


maximos : List Int -> Int -> List Int
maximos lista e =
    if isEmpty lista then 
        lista
        
    else if (head lista) > e then
        (head lista) :: maximos (tail lista) e
    else
        maximos (tail lista) e
    



-- Filtra la lista de valores menores que el valor e pasado por parámetro


minimos : List Int -> Int -> List Int
minimos lista e =
    -- Caso base: si la lista está vacía, devolvemos una lista vacía.
    if isEmpty lista then
        []
    -- Paso recursivo: si la cabeza de la lista es menor que 'e',
    -- la incluimos en el resultado y seguimos con el resto de la lista.
    else if (head lista) < e then
        (head lista) :: minimos (tail lista) e
    -- Si no es menor, simplemente seguimos con el resto de la lista.
    else
        minimos (tail lista) e



-- Ordena los valores de una lista utilizando quicksort
quickSort : List Int -> List Int
quickSort xs =
    case xs of
        -- Caso base: una lista vacía ya está ordenada.
        [] ->
            []

        -- Paso recursivo: usamos el primer elemento como pivote.
        pivot :: resto ->
            -- 1. Dividimos el resto en dos listas: menores o iguales al pivote, y mayores.
            let
                menores = filtrar resto (\x -> x <= pivot)
                mayores = filtrar resto (\x -> x > pivot)
            in
            -- 2. Ordenamos cada lista recursivamente y las concatenamos.
            concatenar (quickSort menores) (pivot :: quickSort mayores)



-- Obtiene un elemento en la posición n (empezando desde 0)
-- Devuelve 0 si la posición está fuera de rango


obtenerElemento : List Int -> Int -> Int
obtenerElemento lista posicion =
    if posicion < 0 then 0
    else if isEmpty lista then 0
    else if posicion == 0 then head lista
    else obtenerElemento (tail lista) (posicion - 1)



-- Busca la mediana
-- En el ámbito de la estadística, la mediana representa el
-- valor de la variable de posición central en un conjunto de datos ordenados.
-- Devuelve 0 si la lista está vacía.


mediana : List Int -> Int
mediana lista =
    if isEmpty lista then 0
    else
        let
            -- Para encontrar la mediana, primero ordenamos la lista.
            ordenada = quickSort lista
            -- Luego, contamos los elementos para encontrar la posición central.
            n = contar ordenada
            posicionCentral = (n - 1) // 2
        in
        -- Obtenemos el elemento en esa posición.
        obtenerElemento ordenada posicionCentral



-- Cuenta los elementos
contar : List Int -> Int
contar lista =
    if isEmpty lista then 0
    else 1 + contar (tail lista)



-- Acumula los elementos
acc : List Int -> Int
acc lista =
    if isEmpty lista then 0
    else (head lista) + acc (tail lista)



-- Filtra los elementos de la lista xs según la función p
filtrar : List Int -> (Int -> Bool) -> List Int
filtrar xs p =
    if isEmpty xs then []
    else
        let
            h = head xs
            t = tail xs
        in
        if p h then h :: filtrar t p
        else filtrar t p



-- Filtra los elementos pares usando la función filtrar
filtrarPares : List Int -> List Int
filtrarPares xs =
    -- Usamos la función de orden superior 'filtrar' con una función lambda
    -- que comprueba si un número es par.
    filtrar xs (\x -> modBy 2 x == 0)



-- Filtra los elementos múltiplos de 3 usando filtrar
filtrarMultiplosDeTres : List Int -> List Int
filtrarMultiplosDeTres xs =
    filtrar xs (\x -> modBy 3 x == 0)



-- Acumula los elementos aplicándoles fx
acumular : List Int -> (Int -> Int) -> Int
acumular lista fx =
    if isEmpty lista then 0
    else (fx (head lista)) + acumular (tail lista) fx



-- Acumula todos los elementos de una lista usando acumular (función identidad)
acumularUnidad : List Int -> Int
acumularUnidad lista =
    -- La función identidad es (\x -> x), no altera el valor.
    acumular lista (\x -> x)



-- Acumula el doble de los elementos de una lista usando acumular
acumularDoble : List Int -> Int
acumularDoble lista =
    acumular lista (\x -> x * 2)



-- Acumula el cuadrado de los elementos de una lista usando acumular
acumularCuadrado : List Int -> Int
acumularCuadrado lista =
    acumular lista (\x -> x * x)



-- Transforma la lista a una lista de otro tipo
-- Esto es equivalente a la función map de Scala
transformar : List Int -> (Int -> a) -> List a
transformar lista fx =
    if isEmpty lista then []
    else (fx (head lista)) :: transformar (tail lista) fx



-- Retorna true si un elemento existe en la lista
existe : List Int -> Int -> Bool
existe lista nro =
    if isEmpty lista then False
    else if (head lista) == nro then True
    else existe (tail lista) nro



-- Une 2 listas pasadas por parámetros pero ignora los repetidos
unirOfSet : List Int -> List Int -> List Int
unirOfSet lista otraLista =
    -- Primero concatenamos ambas listas y luego eliminamos los duplicados.
    removerDuplicados (concatenar lista otraLista)



-- Función auxiliar para remover duplicados de una lista
removerDuplicados : List Int -> List Int
removerDuplicados lista =
    case lista of
        [] -> []
        x :: xs ->
            -- Mantenemos el primer elemento 'x' y lo removemos del resto de la lista
            -- antes de continuar recursivamente.
            x :: removerDuplicados (filtrar xs (\y -> y /= x))



-- OPCIONAL: Subconjuntos
-- Dada una lista de enteros, retorna una lista con todos los posibles subconjuntos
subSets : List Int -> List (List Int)
subSets lista =
    case lista of
        [] ->
            [ [] ]
        x :: xs ->
            let
                -- Obtenemos los subconjuntos del resto de la lista.
                subsDeXs = subSets xs
            in
            -- El resultado es:
            -- 1. Los subconjuntos que no incluyen a 'x' (subsDeXs).
            -- 2. Los subconjuntos que sí incluyen a 'x' (transformamos subsDeXs y le añadimos 'x' a cada uno).
            subsDeXs ++ (List.map (\s -> x :: s) subsDeXs)



-- OPCIONAL: Cortar
-- Dada una lista de enteros y un número entero n, retorna subconjuntos con n elementos
cortar : List Int -> Int -> List (List Int)
cortar lista n =
    if isEmpty lista then []
    else
        -- Tomamos los primeros 'n' elementos para el primer subconjunto,
        -- y luego llamamos recursivamente a 'cortar' con el resto de la lista.
        (tomar n lista) :: cortar (saltar n lista) n



-- Función auxiliar para tomar los primeros n elementos de una lista
tomar : Int -> List a -> List a
tomar n lista =
    if n <= 0 || isEmpty lista then []
    else (head lista) :: tomar (n - 1) (tail lista)



-- Función auxiliar para saltar los primeros n elementos de una lista
saltar : Int -> List a -> List a
saltar n lista =
    if n <= 0 || isEmpty lista then lista
    else saltar (n - 1) (tail lista)



-- Ejemplos de uso y funciones de prueba
-- Podés usar estos para probar tus implementaciones


ejemplos : List String
ejemplos =
    [ "max [1,2,3,4,5] debería devolver 5"
    , "min [1,2,3,4,5] debería devolver 1"
    , "maximos [1,2,3,4,5] 3 debería devolver [4,5]"
    , "minimos [1,2,3,4,5] 3 debería devolver [1,2]"
    , "quickSort [3,1,4,1,5,9,2,6] debería devolver [1,1,2,3,4,5,6,9]"
    , "contar [1,2,3,4,5] debería devolver 5"
    , "acc [1,2,3,4,5] debería devolver 15"
    , "filtrarPares [1,2,3,4,5,6] debería devolver [2,4,6]"
    , "filtrarMultiplosDeTres [1,2,3,6,9,10] debería devolver [3,6,9]"
    , "acumularDoble [1,2,3] debería devolver 12 (2+4+6)"
    , "acumularCuadrado [1,2,3] debería devolver 14 (1+4+9)"
    , "unir [1,2] [3,4] debería devolver [1,2,3,4]"
    , "existe [1,2,3] 2 debería devolver True"
    , "existe [1,2,3] 4 debería devolver False"
    ]
