
module Clase2 exposing (main)

import Html exposing (text)

--main= text (Debug.toString(quickSort [5,3,1,1,5]))

--head : List a -> a
--head list =
--Maybe.withDefault (Debug.todo "head called on empty list") (List.head list)
--head : List number -> number
--head list =
  --  Maybe.withDefault 0 (List.head list)



tail : List a -> List a
tail list =
    Maybe.withDefault [] (List.tail list)


isEmpty : List a -> Bool
isEmpty list =
    List.isEmpty list


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
    if isEmpty lista2 then lista1
    else (head lista1) :: concatenar (lista1) lista2
    
--concatenar [1,2,3] [4,5,6] -> 1:: concatenar [2,3] [4,5,6]
--concatenar [2,3] [4,5,6] -> 2:: concatenar [3] [4,5,6]
--concatenar [3] [4,5,6] -> 3:: [4,5,6]
--concatenar [] [4,5,6]

-- Buscar
-- Dada una lista y una función de comparación, devuelve el valor que cumple la condición.
-- Devuelve 0 si la lista está vacía.


buscar : List Int -> (Int -> Int -> Bool) -> Int
buscar lista com =
    if isEmpty lista then
        0
    else if isEmpty (tail lista) then
        head lista
    else
        let
            h = head lista
            m = buscar (tail lista) com
        in
        if com h m then
            h
        else
            m



-- Busca el Máximo
-- Encuentra el valor máximo en una lista


max : List Int -> Int
max lista =
    if isEmpty lista then 0
    else buscar lista (\x y -> x > y)
    



-- Busca el Mínimo
-- Encuentra el valor mínimo en una lista


min : List Int -> Int
min lista =
    if isEmpty lista then 0
    else buscar lista (\x y -> x < y)



-- Filtra la lista de valores mayores que el valor e pasado por parámetro


maximos : List Int -> Int -> List Int
maximos lista e =
    if isEmpty lista then [] 
    else if head lista > e then head lista :: (maximos (tail lista) e)
    else maximos (tail lista) e



-- Filtra la lista de valores menores que el valor e pasado por parámetro


minimos : List Int -> Int -> List Int
minimos lista e =
    if isEmpty lista then []
    else if head lista <= e then head lista :: (minimos (tail lista) e)
    else minimos (tail lista) e



-- Ordena los valores de una lista utilizando quicksort


quickSort : List Int -> List Int
quickSort xs =
    case xs of
        [] ->
            []
        pivot :: resto -> --resto equivaldria al tail y pivot seria el primer elemento
            let
                --t = tail xs
                --h = head xs
                mx = maximos (resto) (pivot)
                mn = minimos (resto) (pivot)
            in
            concatenar (quickSort(mn))(pivot :: quickSort (mx))
            -- TODO: Implementar quicksort recursivamente
            -- 1. Dividir resto en menores y mayores que pivot
            -- 2. Ordenar recursivamente ambas particiones
            -- 3. Concatenar: (menores ordenados) ++ [pivot] ++ (mayores ordenados)
--[5,3,1,1,5] -> min=(3,1,1,5) ->concatenar QuickSort(3,1,1,5) 5::[]
--(3,1,1,5) -> mx(5) mn (1,1) -> concatenar QuickSort(1,1) (3 :: 5) -> Quicksort[5]= concatenar([]) (5 :: [])
--() 

-- Obtiene un elemento en la posición n (empezando desde 0)
-- Devuelve 0 si la posición está fuera de rango


obtenerElemento : List Int -> Int -> Int
obtenerElemento lista posicion =
    if isEmpty lista then 0
    else if posicion > (List.length lista -1) then 0
    else if posicion == 0 then head lista
    else obtenerElemento (tail lista) (posicion - 1)



-- Busca la mediana
-- En el ámbito de la estadística, la mediana representa el
-- valor de la variable de posición central en un conjunto de datos ordenados.
-- Devuelve 0 si la lista está vacía.


mediana : List Int -> Int
mediana lista =
    if isEmpty lista then 0
    else if modBy 2 (List.length lista) == 0 then 
    obtenerElemento (QuickSort lista) (List.length lista//2)--logica para cuando es par
    else    
        let 
            listaOrdenada = QuickSort (lista)
            t = List.length lista - 1
        in 
        obtenerElemento listaOrdenada (t//2)  

    


-- Cuenta los elementos


contar : List Int -> Int
contar lista =
    if isEmpty lista then 0
    else 1 + contar (tail lista)


-- Acumula los elementos


acc : List Int -> Int
acc lista =
    if isEmpty lista then 0
    else List.sum lista


-- Filtra los elementos de la lista xs según la función p


filtrar : List Int -> (Int -> Bool) -> List Int
filtrar xs p =
    if isEmpty xs then []
    else List.filter p xs
    
-- filtrar lista (\h -> h < e ) (para min y para max (invertir comparador)) (tambien sirve para maximos y para minimos creo)

-- clausura. Se puede acceder a variables de otra funcion (esto se ve bien en teoria)
-- Filtra los elementos pares usando la función filtrar


filtrarPares : List Int -> List Int
filtrarPares xs =
    -- Pista: Usar modBy 2 para verificar números pares
    if isEmpty xs then 
    []
    else if modBy 2 head xs == 0 then
        head xs :: filtrarPares (tail xs)
    else filtrarPares (tail xs)



-- Filtra los elementos múltiplos de 3 usando filtrar


filtrarMultiplosDeTres : List Int -> List Int
filtrarMultiplosDeTres xs =
    if isEmpty xs then 
    []
    else if modBy 3 head xs == 0 then
        head xs :: filtrarPares (tail xs)
    else filtrarPares (tail xs)



-- Acumula los elementos aplicándoles fx


acumular : List Int -> (Int -> Int) -> Int
acumular lista fx =
    if isEmpty lista then 0
    else fx head lista + acumular (tail lista) (fx)


-- Acumula todos los elementos de una lista usando acumular (función identidad)


acumularUnidad : List Int -> Int
acumularUnidad lista =
    acumular lista (\x -> x)
    -- Pista: (\x -> x)
    



-- Acumula el doble de los elementos de una lista usando acumular


acumularDoble : List Int -> Int
acumularDoble lista =
    acumular lista (\x -> x * 2)
    -- Pista: (\x -> x * 2)
    



-- Acumula el cuadrado de los elementos de una lista usando acumular


acumularCuadrado : List Int -> Int
acumularCuadrado lista =
    acumular lista (\x -> x * x)
    -- Pista: (\x -> x * x)
    



-- Transforma la lista a una lista de otro tipo
-- Esto es equivalente a la función map de Scala


transformar : List Int -> (Int -> a) -> List a
transformar lista fx =
    if isEmpty then 
    []
    else List.map fx lista



-- Retorna true si un elemento existe en la lista


existe : List Int -> Int -> Bool
existe lista nro =
    List.member nro lista
--if isEmpty lista then false
--else if head lista == nro then true
--else existe (tail lista) nro


-- Une 2 listas pasadas por parámetros pero ignora los repetidos


unirOfSet : List Int -> List Int -> List Int
unirOfSet lista otraLista =
    let 
        listUnidas = concatenar lista otraLista
    in
    removerDuplicados listUnidas
    -- Vas a necesitar una función auxiliar para remover duplicados


-- Función auxiliar para remover duplicados de una lista


removerDuplicados : List Int -> List Int
removerDuplicados lista =
    if List.member (head lista) (tail lista) then 
        List.foldl (\x acc -> if x == head lista then acc else x :: acc) [] lista |> List.reverse
    else 
        removerDuplicados tail lista 
    



-- OPCIONAL: Subconjuntos
-- Dada una lista de enteros, retorna una lista con todos los posibles subconjuntos
-- Por ejemplo: [1,2,3] -> [[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]


subSets : List Int -> List (List Int)
subSets lista =
    case lista of
        [] ->
            [ [] ]

        x :: xs ->
            []



-- OPCIONAL: Cortar
-- Dada una lista de enteros y un número entero n, retorna subconjuntos con n elementos
-- Ejemplo: [1,2,3,4,5] y 2 -> [[1,2], [3,4], [5]]


cortar : List Int -> Int -> List (List Int)
cortar lista n =
    []



-- Función auxiliar para tomar los primeros n elementos de una lista


tomar : Int -> List a -> List a
tomar n lista =
    []



-- Función auxiliar para saltar los primeros n elementos de una lista


saltar : Int -> List a -> List a
saltar n lista =
    []



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
