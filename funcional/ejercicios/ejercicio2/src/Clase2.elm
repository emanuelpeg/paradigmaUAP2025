module Clase2 exposing (..)


head : List a -> a
head list = 
    case List.head list of 
        Just h -> h
        Nothing -> Debug.todo "HEAD CALLED ON EMPTY LIST"


tail : List a -> List a
tail list =
    Maybe.withDefault [] (List.tail list)


isEmpty : List a -> Bool
isEmpty list =
    List.isEmpty list


-- Concatenar
concatenar : List Int -> List Int -> List Int
concatenar lista1 lista2 =
    if isEmpty lista1 then 
        lista2
    else 
        (head lista1) :: concatenar (tail lista1) lista2


-- Buscar
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
max : List Int -> Int
max lista =
    buscar lista (>)


-- Busca el Mínimo
min : List Int -> Int
min lista =
    buscar lista (<)


-- Filtra la lista de valores mayores que el valor e pasado por parámetro
maximos : List Int -> Int -> List Int
maximos lista e =
    filtrar lista (\x -> x > e)


-- Filtra la lista de valores menores que el valor e pasado por parámetro
minimos : List Int -> Int -> List Int
minimos lista e =
    filtrar lista (\x -> x < e)


-- Ordena los valores de una lista utilizando quicksort
quickSort : List Int -> List Int
quickSort xs =
    if isEmpty xs then
        []
    else
        let
            pivot = head xs
            resto = tail xs
            menores = filtrar resto (\x -> x <= pivot)
            mayores = filtrar resto (\x -> x > pivot)
        in
        concatenar (concatenar (quickSort menores) [pivot]) (quickSort mayores)


-- Obtiene un elemento en la posición n (empezando desde 0)
obtenerElemento : List Int -> Int -> Int
obtenerElemento lista posicion =
    if posicion < 0 then 
        0
    else if isEmpty lista then 
        0
    else if posicion == 0 then 
        head lista
    else 
        obtenerElemento (tail lista) (posicion - 1)


-- Busca la mediana
mediana : List Int -> Int
mediana lista =
    let
        listaOrdenada = quickSort lista
        longitud = contar listaOrdenada
        mitad = longitud // 2
    in
    if longitud == 0 then
        0
    else
        obtenerElemento listaOrdenada mitad


-- Cuenta los elementos
contar : List Int -> Int
contar lista =
    if isEmpty lista then
        0
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
filtrar xs p =
    if isEmpty xs then
        []
    else
        let
            h = head xs
            resto = filtrar (tail xs) p
        in
        if p h then
            h :: resto
        else
            resto


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
    if isEmpty lista then
        0
    else
        fx (head lista) + acumular (tail lista) fx


-- Acumula todos los elementos de una lista usando acumular
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
    removerDuplicados (concatenar lista otraLista)


-- Función auxiliar para remover duplicados de una lista
removerDuplicados : List Int -> List Int
removerDuplicados lista =
    if isEmpty lista then
        []
    else
        let
            h = head lista
            resto = removerDuplicados (tail lista)
        in
        if existe resto h then
            resto
        else
            h :: resto


-- Función auxiliar para transformar listas de listas
transformarListas : List (List Int) -> (List Int -> List Int) -> List (List Int)
transformarListas listas fx =
    if isEmpty listas then
        []
    else
        fx (head listas) :: transformarListas (tail listas) fx


-- Función auxiliar para concatenar listas de listas
concatenarListas : List (List Int) -> List (List Int) -> List (List Int)
concatenarListas lista1 lista2 =
    if isEmpty lista1 then 
        lista2
    else 
        (head lista1) :: concatenarListas (tail lista1) lista2


-- OPCIONAL: Subconjuntos
subSets : List Int -> List (List Int)
subSets lista =
    if isEmpty lista then
        [ [] ]
    else
        let
            x = head lista
            xs = tail lista
            subsetsXs = subSets xs
            withX = transformarListas subsetsXs (\subset -> x :: subset)
        in
        concatenarListas subsetsXs withX


-- Función auxiliar para tomar los primeros n elementos de una lista
tomar : Int -> List a -> List a
tomar n lista =
    if n <= 0 || isEmpty lista then
        []
    else
        head lista :: tomar (n - 1) (tail lista)


-- Función auxiliar para saltar los primeros n elementos de una lista
saltar : Int -> List a -> List a
saltar n lista =
    if n <= 0 then
        lista
    else if isEmpty lista then
        []
    else
        saltar (n - 1) (tail lista)


-- OPCIONAL: Cortar
cortar : List Int -> Int -> List (List Int)
cortar lista n =
    if n <= 0 || isEmpty lista then
        []
    else
        let
            chunk = tomar n lista
            resto = saltar n lista
        in
        chunk :: cortar resto n


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