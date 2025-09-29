module Clase2 exposing (..)


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
    if isEmpty lista1 then 
        lista2
    else 
        (head lista1) :: concatenar (tail lista1) lista2

    --concatenar [1,2,3] [4,5,6] -> :: concatenar [2,3] [4,5,6] = [2,3,4,5,6]
    --concatenar [2,3] [4,5,6] -> 2 :: concatenar [3] [4,5,6] = [3,4,5,6]
    --concatenar [3] [4,5,6] -> 3 :: concatenar [] [4,5,6] = [4,5,6]
    --concatenar [] [4,5,6] -> [4,5,6] -- caso base
    -- Resultado final: [1,2,3,4,5,6]



-- Buscar
-- Dada una lista y una función de comparación, devuelve el valor que cumple la condición.
-- Devuelve 0 si la lista está vacía.


buscar : List Int -> (Int -> Int -> Bool) -> Int
buscar lista com =
    if isEmpty lista then 
        0
    else if isEmpty (tail lista) then 
        head lista -- Si solo la lista tiene 1 elemento

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
    if isEmpty lista then 
        0
    else if isEmpty (tail lista) then 
        head lista -- Si solo la lista tiene 1 elemento
    else 
        let
            h = head lista
            m = max (tail lista)
        in 
        if h > m then 
            h
        else 
            m

    --buscar lista (\x y -> x > y)   --otra forma de hacerla




-- Busca el Mínimo
-- Encuentra el valor mínimo en una lista


min : List Int -> Int
min lista =
    if isEmpty lista then 0

    else if isEmpty (tail lista) then 
        head lista

    else
        let
            h = head lista
            m = min (tail lista)
        in
        if h < m then 
            h 
        else 
            m

--buscar lista (\x y -> x < y)  -- otra forma de hacerla



-- Filtra la lista de valores mayores que el valor e pasado por parámetro


maximos : List Int -> Int -> List Int
maximos lista e =
    if (isEmpty lista) then  
        []-- caso base
    -- caso recursivo
    
    else 
        let
            h = head lista
        in 
        if h > e then 
            h :: maximos (tail lista) e --concatenacion para agregar el elemento a la lista
        else 
            maximos (tail lista) e

    -- Otra forma de hacerlo
    --filtrar lista(\h -> h > e)



-- maximos [1,4,2,3] 2 -> maximos [4,2,3] 2 :: [4,3]
-- maximos [4,2,3] 2 -> 4 :: maximos [2,3] 2 :: [3]
-- maximos [2,3] 2 -> maximos [3] 2 :: [3]
-- maximos [3] 2 -> 3 :: maximos [] 2 :: [3]
-- maximos [] 2 -> []  -- caso base

-- Resultado final: [4,3]

-- Filtra la lista de valores menores que el valor e pasado por parámetro


minimos : List Int -> Int -> List Int
minimos lista e =
    if isEmpty lista then 
        [] --caso base

    else 
        let 
            h = head lista
        in
        if h < e then 
            h :: minimos (tail lista) e
        else 
            minimos (tail lista) e


--otra forma de escribirlo usando filtrar
-- filtrar lista(\h -> h < e)

-- Ordena los valores de una lista utilizando quicksort


quickSort : List Int -> List Int
quickSort xs =
    case xs of
        [] ->
            []

        pivot :: resto ->
            -- TODO: Implementar quicksort recursivamente
            -- 1. Dividir resto en menores y mayores que pivot
            -- 2. Ordenar recursivamente ambas particiones
            -- 3. Concatenar: (menores ordenados) ++ [pivot] ++ (mayores ordenados)
            if isEmpty resto then
                [pivot]
            else
                let
                    menores = filtrar resto (\n -> n <= pivot)
                    mayores = filtrar resto (\n -> n > pivot)
                in
                concatenar (quickSort menores) (pivot :: quickSort mayores)



-- Obtiene un elemento en la posición n (empezando desde 0)
-- Devuelve 0 si la posición está fuera de rango


obtenerElemento : List Int -> Int -> Int
obtenerElemento lista posicion =
    if isEmpty lista || posicion < 0 then
        0
    else if posicion == 0 then
        head lista
    else
        obtenerElemento (tail lista) (posicion - 1) -- Disminuis la pos hasta llegar al 0


-- Busca la mediana
-- En el ámbito de la estadística, la mediana representa el
-- valor de la variable de posición central en un conjunto de datos ordenados.
-- Devuelve 0 si la lista está vacía.


mediana : List Int -> Int
mediana lista =
    if isEmpty lista then
        0
    else
        let
            sorted = quickSort lista
            len = sorted |> List.length
            mid = len // 2
        in
        if modBy 2 len == 1 then
            obtenerElemento sorted mid
        else
            let
                a = obtenerElemento sorted (mid - 1)
                b = obtenerElemento sorted mid
            in
            (a + b) // 2



-- Cuenta los elementos


contar : List Int -> Int --contar la cant de elementos que tiene la lista
contar lista =
    if isEmpty lista then 
        0 --caso base
    else 
        1 + contar (tail lista)

-- Acumula los elementos


acc : List Int -> Int
acc lista =
    if isEmpty lista then
        0
    else
        head lista + acc (tail lista)



-- Filtra los elementos de la lista xs según la función p


filtrar : List Int -> (Int -> Bool) -> List Int
filtrar lista com =

    List.filter com lista
    
    -- Otra forma de hacerlo con recursión

    -- if isEmpty lista then 
    --     lista --caso base
    -- else 
    --     let 
    --         h = head lista
    --     in
    --     if (com h) then 
    --         h :: filtrar (tail lista) com
    --     else 
    --         filtrar (tail lista) com


-- Filtra los elementos pares usando la función filtrar

filtrarPares : List Int -> List Int
filtrarPares xs =
    -- Pista: Usar modBy 2 para verificar números pares
    List.filter (\n -> modBy 2 n == 0) xs


-- Filtra los elementos múltiplos de 3 usando filtrar

filtrarMultiplosDeTres : List Int -> List Int
filtrarMultiplosDeTres xs =
    List.filter (\n -> modBy 3 n == 0) xs

-- Acumula los elementos aplicándoles fx

acumular : List Int -> (Int -> Int) -> Int
acumular lista fx =
    List.map fx lista |> List.sum

    --con List.map y List.sum

    -- Otra forma de hacerlo con recursión
    -- if isEmpty lista then
    --     0
    -- else
    --     fx (head lista) + acumular (tail lista) fx



-- Acumula todos los elementos de una lista usando acumular (función identidad)


acumularUnidad : List Int -> Int
acumularUnidad lista =
    -- Pista: (\x -> x)
    List.foldl (\x accc -> x + accc) 0 lista

    --usando List.foldl

    --acumular lista (\x -> x)


-- Acumula el doble de los elementos de una lista usando acumular

acumularDoble : List Int -> Int
acumularDoble lista =
    -- Pista: (\x -> x * 2)
    acumular lista (\x -> x  * 2)

-- Acumula el cuadrado de los elementos de una lista usando acumular

acumularCuadrado : List Int -> Int
acumularCuadrado lista =
    -- Pista: (\x -> x * x)
    List.map (\x -> x * x) lista |> List.sum


-- Transforma la lista a una lista de otro tipo
-- Esto es equivalente a la función map de Scala

transformar : List Int -> (Int -> a) -> List a
transformar lista fx =
    if isEmpty lista then
        []
    else
        fx (head lista) :: transformar (tail lista) fx

-- Retorna true si un elemento existe en la lista

existe : List Int -> Int -> Bool
existe lista nro =
    if isEmpty lista then 
        False
    else if head lista == nro then
        True
    else
        existe (tail lista) nro

-- Une 2 listas pasadas por parámetros pero ignora los repetidos

unirOfSet : List Int -> List Int -> List Int
unirOfSet lista otraLista =
    -- Vas a necesitar una función auxiliar para remover duplicados
    removerDuplicados (concatenar lista otraLista)


-- Función auxiliar para remover duplicados de una lista

removerDuplicados : List Int -> List Int
removerDuplicados lista =
    case lista of
        [] -> 
            []
        x :: xs ->
            if existe xs x then
                removerDuplicados xs
            else
                x :: removerDuplicados xs



-- OPCIONAL: Subconjuntos
-- Dada una lista de enteros, retorna una lista con todos los posibles subconjuntos
-- Por ejemplo: [1,2,3] -> [[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]


subSets : List Int -> List (List Int)
subSets lista =
    case lista of
        [] ->
            [ []]

        x :: xs ->
            let 
                subs = subSets xs
            in
            subs ++ List.map (\s -> x :: s) subs



-- OPCIONAL: Cortar
-- Dada una lista de enteros y un número entero n, retorna subconjuntos con n elementos
-- Ejemplo: [1,2,3,4,5] y 2 -> [[1,2], [3,4], [5]]


cortar : List Int -> Int -> List (List Int)
cortar lista n =
    if isEmpty lista || n <= 0 then
        []
    else 
        tomar n lista :: cortar (saltar n lista) n



-- Función auxiliar para tomar los primeros n elementos de una lista

tomar : Int -> List a -> List a
tomar n lista =
    if isEmpty lista || n <= 0 then
        []
    else
        head lista :: tomar (n - 1) (tail lista)



-- Función auxiliar para saltar los primeros n elementos de una lista


saltar : Int -> List a -> List a
saltar n lista =
    if isEmpty lista || n <= 0 then
        lista
    else
        saltar (n - 1) (tail lista)



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
