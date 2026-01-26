module Clase2 exposing (..)
import Html.Attributes exposing (list)


head : List a -> a
head list =
    case List.head list of
        Just h -> h
        Nothing -> Debug.todo "head called on empty list"
    --Maybe.withDefault (Debug.todo "head called on empty list") (List.head list)


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


concatenar : List Int -> List Int -> List Int -- Listo
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


buscar : List Int -> (Int -> Int -> Bool) -> Int -- Listo
buscar lista com =
    if isEmpty lista then 0
    else if (isEmpty (tail lista)) then head lista
    else 
    let
        h = head lista
        m = buscar (tail lista) com
        in

        if (com h m) then h
        else m



-- Busca el Máximo
-- Encuentra el valor máximo en una lista


maxInt : List Int -> Int -- Listo
maxInt lista =
    -- let
    --     com = (\x y -> x > y)
    -- in
    -- buscar lista com

    -- buscar lista (\x y -> x > y)

    -- if isEmpty lista then 0
    -- else if (isEmpty (tail lista)) then head lista -- Si solo tiene 1 elemento

    -- else if (head lista) > (max (tail lista)) then (head lista)
    -- else max (tail lista)
    if isEmpty lista then 0
    else if (isEmpty (tail lista)) then head lista
    else 
    let
        h = head lista
        m = maxInt (tail lista)
        in

        if h > m then h
        else m


-- Busca el Mínimo
-- Encuentra el valor mínimo en una lista


min : List Int -> Int -- Listo
min lista =
    -- buscar lista (\x y -> x < y)
    if isEmpty lista then 0
    else if (isEmpty (tail lista)) then head lista
    else 
    let
        h = head lista
        m = min (tail lista)
        in

        if h < m then h
        else m



-- Filtra la lista de valores mayores que el valor e pasado por parámetro


maximos : List Int -> Int -> List Int -- Listo
maximos lista e =
    if isEmpty lista then lista
    -- else if head lista > e then (head lista) :: (maximos (tail lista) e)
    -- else maximos (tail lista) e

    else
        let h = head lista
        in
        if h > e then h :: maximos (tail lista) e
        else maximos (tail lista) e

    --filtrar lista (\h -> h > e)

-- maximos [1,4,2,3] 2 -> maximos [4,2,3] 2 -- [4,3]
-- maximos [4,2,3] 2 -> :: maximos [2,3] 2 -- [3]
-- maximos [2,3] 2 -> maximos [3] 2 -- [3]
-- maximos [3] 2 -> 3 :: maximos [] 2 -- []
-- maximos [] 2 -> []


-- Filtra la lista de valores menores que el valor e pasado por parámetro


minimos : List Int -> Int -> List Int -- Listo
minimos lista e =
    -- if isEmpty lista then lista
    -- else 
    --     let
    --     h = head lista
    --     in
    --     if h < e then h :: minimos (tail lista) e
    --     else minimos (tail lista) e
    filtrar lista (\h -> h < e)


-- Ordena los valores de una lista utilizando quicksort


quickSort : List Int -> List Int 
quickSort xs =
    if isEmpty xs then xs
    else 
        let
            h = head xs
            t = tail xs
        in
        (quickSort (filtrar t (\x -> x < h)))
        ++ h :: []
        ++ (quickSort (filtrar t (\x -> x >= h)))
    -- case xs of
    --     [] -> 
    --         []
    --     h :: t 
    --         ->
    --         (quickSort (filtrar t (\x -> x < h)))
    --         ++ h :: []
    --         ++ (quickSort (filtrar t (\x -> x > h)))
        -- pivot :: resto ->
        --     -- TODO: Implementar quicksort recursivamente
        --     -- 1. Dividir resto en menores y mayores que pivot
        --     -- 2. Ordenar recursivamente ambas particiones
        --     -- 3. Concatenar: (menores ordenados) ++ [pivot] ++ (mayores ordenados)
        --     []



-- Obtiene un elemento en la posición n (empezando desde 0)
-- Devuelve 0 si la posición está fuera de rango


obtenerElemento : List Int -> Int -> Int -- Listo
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
    case lista of
        [] ->
            0
        _ ->
            let
                sorted = quickSort lista
                len = contar sorted
                mid = len // 2
            in
            if (modBy 2 len == 1) then -- Si es impar
                obtenerElemento sorted mid
            else
                let
                    a = obtenerElemento sorted (mid - 1)
                    b = obtenerElemento sorted mid
                in
                (a + b) // 2



-- Cuenta los elementos


contar : List Int -> Int
contar lista =
    case lista of
        [] ->
            0
        _ ->
            1 + contar (tail lista)



-- Acumula los elementos


acc : List Int -> Int
acc lista =
    case lista of
        [] ->
            0
        _ ->
            head lista + acc (tail lista)



-- Filtra los elementos de la lista xs según la función p


filtrar : List Int -> (Int -> Bool) -> List Int -- Listo
filtrar xs p =
    if isEmpty xs then xs
    else
        let h = head xs
        in 
        if (p h) then h :: filtrar (tail xs) p
        else filtrar (tail xs) p



-- Filtra los elementos pares usando la función filtrar


filtrarPares : List Int -> List Int
filtrarPares xs =
    -- Pista: Usar modBy 2 para verificar números pares
    filtrar xs (\x -> modBy 2 x == 0)



-- Filtra los elementos múltiplos de 3 usando filtrar


filtrarMultiplosDeTres : List Int -> List Int
filtrarMultiplosDeTres xs =
    filtrar xs (\x -> modBy 3 x == 0)



-- Acumula los elementos aplicándoles fx


acumular : List Int -> (Int -> Int) -> Int
acumular lista fx =
    case lista of
        [] ->
            0
        _ ->
            fx (head lista) + acumular (tail lista) fx



-- Acumula todos los elementos de una lista usando acumular (función identidad)


acumularUnidad : List Int -> Int
acumularUnidad lista =
    -- Pista: (\x -> x)
    acumular lista (\x -> x)



-- Acumula el doble de los elementos de una lista usando acumular


acumularDoble : List Int -> Int
acumularDoble lista =
    -- Pista: (\x -> x * 2)
    acumular lista (\x -> x * 2)



-- Acumula el cuadrado de los elementos de una lista usando acumular


acumularCuadrado : List Int -> Int
acumularCuadrado lista =
    -- Pista: (\x -> x * x)
    acumular lista (\x -> x * x)



--/* Fold --> plegar la lista (plegando por la izquierda)
--acc: List a -> (a -> a -> a) -> a -> a

-- Acumular un tipo y devolver lo acumulado como otro tipo distinto
foldl: List a -> (b -> a -> b) -> b -> b -- Para cualquier tipo
foldl l fx inicio =
  case l of
    [] -> 
        inicio
    h :: t -> foldl t fx (fx inicio h)


-- Transforma la lista a una lista de otro tipo
-- Esto es equivalente a la función map de Scala


transformar: List a -> (a -> b) -> List b
transformar l fx = 
    foldl l (\acu a -> acu ++ (fx a)::[]) []




-- Retorna true si un elemento existe en la lista


existe : List Int -> Int -> Bool
existe lista nro =
    case lista of
        [] ->
            False
        _ ->
            if head lista == nro then True
            else existe (tail lista) nro



-- Une 2 listas pasadas por parámetros pero ignora los repetidos


unirOfSet : List Int -> List Int -> List Int
unirOfSet lista otraLista =
    -- Vas a necesitar una función auxiliar para remover duplicados
    case lista of
        [] ->
            removerDuplicados otraLista
        _ ->
            let
                h = head lista
                t = tail lista
            in
            if existe otraLista h then unirOfSet t otraLista
            else h :: unirOfSet t otraLista



-- Función auxiliar para remover duplicados de una lista


removerDuplicados : List Int -> List Int
removerDuplicados lista =
    case lista of
        [] ->
            []
        _ ->
            let
                h = head lista
                t = tail lista
            in
            if existe t h then removerDuplicados t
            else h :: removerDuplicados t



-- OPCIONAL: Subconjuntos
-- Dada una lista de enteros, retorna una lista con todos los posibles subconjuntos
-- Por ejemplo: [1,2,3] -> [[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]


subSets : List Int -> List (List Int)
subSets lista =
    case lista of
        [] ->
            [ [] ]
        h :: t ->
            let
                subs = subSets t
            in
            subs ++ (List.map (\s -> h :: s) subs)



-- OPCIONAL: Cortar
-- Dada una lista de enteros y un número entero n, retorna subconjuntos con n elementos
-- Ejemplo: [1,2,3,4,5] y 2 -> [[1,2], [3,4], [5]]


cortar : List Int -> Int -> List (List Int)
cortar lista n =
    case lista of
        [] ->
            []
        _ ->
            let
                grupo = tomar n lista
                resto = saltar n lista
            in
            grupo :: cortar resto n



-- Función auxiliar para tomar los primeros n elementos de una lista


tomar : Int -> List a -> List a
tomar n lista =
    case lista of
        [] ->
            []
        h :: t ->
            if n <= 0 then []
            else h :: tomar (n - 1) t



-- Función auxiliar para saltar los primeros n elementos de una lista


saltar : Int -> List a -> List a
saltar n lista =
    case lista of
        [] ->
            []
        h :: t ->
            if n <= 0 then lista
            else saltar (n - 1) t



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
