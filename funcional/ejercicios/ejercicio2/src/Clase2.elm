module Clase2 exposing (..)


head : List a -> a
head list =
    Maybe.withDefault (Debug.todo "head called on empty list") (List.head list)


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
    case lista1 of
        [] -> lista2
        x :: xs -> 
            x :: concatenar xs lista2

{-
ejemplo:
1 :: concatenar [2] [3,4]
1 :: (2 :: concatenar [] [3,4])
1 :: (2 :: [3,4])
=> [1,2,3,4]

-}

-- Buscar
-- Dada una lista y una función de comparación, devuelve el valor que cumple la condición.
-- Devuelve 0 si la lista está vacía.

buscar : List Int -> (Int -> Int -> Bool) -> Int
buscar lista com =
    case lista of
        [] -> 0
        x :: xs ->
            if com x x then
             x 
            else buscar xs com



-- Busca el Máximo
-- Encuentra el valor máximo en una lista

max : List Int -> Int
max lista =
    case lista of
        [] -> 0
        [x] -> x
        x :: xs -> 
            let m = max xs --m guarda el max de la cola
            in if x > m then x else m -- si la cabeza actual es mayor 
            --al max devolve esa cabeza actual, sino devolve ese max



-- Busca el Mínimo
-- Encuentra el valor mínimo en una lista

min : List Int -> Int
min lista =
    case lista of
        [] -> 0
        [x] -> x
        x :: xs ->
            let m = min xs
            in if x < m then x else m



-- Filtra la lista de valores mayores que el valor e pasado por parámetro

maximos : List Int -> Int -> List Int
maximos lista e =
    case lista of
        [] -> []
        x :: xs ->
            if x > e then x :: maximos xs e --si es mayor lo meto en la cola 
            else maximos xs e



-- Filtra la lista de valores menores que el valor e pasado por parámetro

minimos : List Int -> Int -> List Int
minimos lista e =
    case lista of
        [] -> []
        x :: xs ->
            if x < e then x :: minimos xs e
            else minimos xs e



-- Ordena los valores de una lista utilizando quicksort

quickSort : List Int -> List Int
quickSort xs =
    case xs of
        [] -> []
        pivot :: resto ->
            let
                menores = filtrar resto (\n -> n < pivot)
                mayores = filtrar resto (\n -> n >= pivot)
            in
            concatenar (quickSort menores) (pivot :: quickSort mayores)



-- Obtiene un elemento en la posición n (empezando desde 0)
-- Devuelve 0 si la posición está fuera de rango

obtenerElemento : List Int -> Int -> Int
obtenerElemento lista posicion =
    case (lista, posicion) of
        ([], _) -> 0
        (x :: _, 0) -> x
        (_ :: xs, n) -> obtenerElemento xs (n - 1)



-- Busca la mediana

mediana : List Int -> Int
mediana lista =
    let
        ordenada = quickSort lista
        len = contar ordenada
    in
    if len == 0 then 0
    else obtenerElemento ordenada (len // 2)



-- Cuenta los elementos

contar : List Int -> Int
contar lista =
    case lista of
        [] -> 0
        _ :: xs -> 1 + contar xs



-- Acumula los elementos

acc : List Int -> Int
acc lista =
    case lista of
        [] -> 0
        x :: xs -> x + acc xs



-- Filtra los elementos de la lista xs según la función p

filtrar : List Int -> (Int -> Bool) -> List Int
filtrar xs p =
    case xs of
        [] -> []
        x :: xs2 ->
            if p x then x :: filtrar xs2 p
            else filtrar xs2 p



-- Filtra los elementos pares usando la función filtrar

filtrarPares : List Int -> List Int
filtrarPares xs =
    filtrar xs (\x -> modBy 2 x == 0)



-- Filtra los elementos múltiplos de 3 usando filtrar

filtrarMultiplosDeTres : List Int -> List Int
filtrarMultiplosDeTres xs =
    filtrar xs (\x -> modBy 3 x == 0)



-- Acumula los elementos aplicándoles fx

acumular : List Int -> (Int -> Int) -> Int
acumular lista fx =
    case lista of
        [] -> 0
        x :: xs -> fx x + acumular xs fx



-- Acumula todos los elementos de una lista usando acumular (función identidad)

acumularUnidad : List Int -> Int
acumularUnidad lista =
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

transformar : List Int -> (Int -> a) -> List a
transformar lista fx =
    case lista of
        [] -> []
        x :: xs -> fx x :: transformar xs fx



-- Retorna true si un elemento existe en la lista

existe : List Int -> Int -> Bool
existe lista nro =
    case lista of
        [] -> False
        x :: xs -> if x == nro then True else existe xs nro



-- Une 2 listas pasadas por parámetros pero ignora los repetidos

unirOfSet : List Int -> List Int -> List Int
unirOfSet lista otraLista =
    removerDuplicados (concatenar lista otraLista)



-- Función auxiliar para remover duplicados de una lista

removerDuplicados : List Int -> List Int
removerDuplicados lista =
    case lista of
        [] -> []
        x :: xs ->
            if existe xs x
            then removerDuplicados xs
            else x :: removerDuplicados xs



-- OPCIONAL: Subconjuntos

subSets : List Int -> List (List Int)
subSets lista =
    case lista of
        [] -> [ [] ]
        x :: xs ->
            let sinX = subSets xs
                conX = transformar sinX (\sub -> x :: sub)
            in concatenar sinX conX



-- OPCIONAL: Cortar

cortar : List Int -> Int -> List (List Int)
cortar lista n =
    if lista == [] then []
    else tomar n lista :: cortar (saltar n lista) n



-- Función auxiliar para tomar los primeros n elementos de una lista

tomar : Int -> List a -> List a
tomar n lista =
    case (n, lista) of
        (0, _) -> []
        (_, []) -> []
        (n2, x :: xs) -> x :: tomar (n2 - 1) xs



-- Función auxiliar para saltar los primeros n elementos de una lista

saltar : Int -> List a -> List a
saltar n lista =
    case (n, lista) of
        (0, _) -> lista
        (_, []) -> []
        (n2, _ :: xs) -> saltar (n2 - 1) xs



-- Ejemplos de uso y funciones de prueba

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
