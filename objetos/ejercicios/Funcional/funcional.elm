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
        [] ->
            lista2

        x :: xs ->
            x :: concatenar xs lista2



-- Buscar
-- Dada una lista y una función de comparación, devuelve el valor que cumple la condición.
-- Devuelve 0 si la lista está vacía.


buscar : List Int -> (Int -> Int -> Bool) -> Int
buscar lista com =
    case lista of
        [] ->
            0

        x :: xs ->
            List.foldl
                (\actual acumulado ->
                    if com actual acumulado then
                        actual

                    else
                        acumulado
                )
                x
                xs



-- Busca el Máximo
-- Encuentra el valor máximo en una lista


max : List Int -> Int
max lista =
    buscar lista (\a b -> a > b)



-- Busca el Mínimo
-- Encuentra el valor mínimo en una lista


min : List Int -> Int
min lista =
    buscar lista (\a b -> a < b)



-- Filtra la lista de valores mayores que el valor e pasado por parámetro


maximos : List Int -> Int -> List Int
maximos lista e =
    List.filter (\x -> x > e) lista



-- Filtra la lista de valores menores que el valor e pasado por parámetro


minimos : List Int -> Int -> List Int
minimos lista e =
    List.filter (\x -> x < e) lista



-- Ordena los valores de una lista utilizando quicksort


quickSort : List Int -> List Int
quickSort xs =
    case xs of
        [] ->
            []

        pivot :: resto ->
            let
                menores =
                    List.filter (\x -> x <= pivot) resto

                mayores =
                    List.filter (\x -> x > pivot) resto
            in
            concatenar (concatenar (quickSort menores) [ pivot ]) (quickSort mayores)



-- Obtiene un elemento en la posición n (empezando desde 0)
-- Devuelve 0 si la posición está fuera de rango


obtenerElemento : List Int -> Int -> Int
obtenerElemento lista posicion =
    case ( lista, posicion ) of
        ( [], _ ) ->
            0

        ( x :: _, 0 ) ->
            x

        ( _ :: xs, n ) ->
            if n < 0 then
                0

            else
                obtenerElemento xs (n - 1)



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
            listaOrdenada =
                quickSort lista

            longitud =
                contar listaOrdenada

            indiceMedia =
                longitud // 2
        in
        if modBy 2 longitud == 1 then
            obtenerElemento listaOrdenada indiceMedia

        else
            obtenerElemento listaOrdenada (indiceMedia - 1)



-- Cuenta los elementos


contar : List Int -> Int
contar lista =
    List.length lista



-- Acumula los elementos


acc : List Int -> Int
acc lista =
    List.sum lista



-- Filtra los elementos de la lista xs según la función p


filtrar : List Int -> (Int -> Bool) -> List Int
filtrar xs p =
    List.filter p xs



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
    List.sum (List.map fx lista)



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
-- Esto es equivalente a la función map de Scala


transformar : List Int -> (Int -> a) -> List a
transformar lista fx =
    List.map fx lista





existe : List Int -> Int -> Bool
existe lista nro =
    List.member nro lista



-- Une 2 listas pasadas por parámetros pero ignora los repetidos


unirOfSet : List Int -> List Int -> List Int
unirOfSet lista otraLista =
    removerDuplicados (concatenar lista otraLista)



-- Función auxiliar para remover duplicados de una lista


removerDuplicados : List Int -> List Int
removerDuplicados lista =
    List.foldl
        (\elemento acumulador ->
            if existe acumulador elemento then
                acumulador

            else
                concatenar acumulador [ elemento ]
        )
        []
        lista




-- Genera el conjunto potencia (subconjuntos)


subSets : List Int -> List (List Int)
subSets lista =
    case lista of
        [] ->
            [ [] ]

        x :: xs ->
            let
                subConjuntosSinX =
                    subSets xs
            in
            subConjuntosSinX ++ List.map (\subConjunto -> x :: subConjunto) subConjuntosSinX



-- Divide una lista en grupos de n elementos


cortar : List Int -> Int -> List (List Int)
cortar lista n =
    if n <= 0 || isEmpty lista then
        []

    else
        let
            grupo =
                tomar n lista

            resto =
                saltar n lista
        in
        grupo :: cortar resto n



-- Función auxiliar para tomar los primeros n elementos de una lista


tomar : Int -> List a -> List a
tomar n lista =
    if n <= 0 then
        []

    else
        case lista of
            [] ->
                []

            x :: xs ->
                x :: tomar (n - 1) xs



-- Función auxiliar para saltar los primeros n elementos de una lista


saltar : Int -> List a -> List a
saltar n lista =
    if n <= 0 then
        lista

    else
        case lista of
            [] ->
                []

            _ :: xs ->
                saltar (n - 1) xs



-- Bloque de pruebas compactas

main =
    let
        lista1 = [ 1, 2, 3 ]
        lista2 = [ 4, 5, 6 ]
    in
    Debug.log "Resultados"
        [ head lista1
        , tail lista1
        , isEmpty []
        , concatenar lista1 lista2
        , buscar [1,5,2] (\a b -> a > b)
        , max [1,5,2]
        , min [1,5,2]
        , maximos [1,2,5,6] 3
        , minimos [1,2,5,6] 3
        , quickSort [5,2,8,1]
        , obtenerElemento [10,20,30] 1
        , mediana [7,1,3]
        , contar [1,2,3,4]
        , acc [1,2,3,4]
        , filtrarPares [1,2,3,4,5,6]
        , filtrarMultiplosDeTres [1,2,3,4,5,6,7,8,9]
        , acumularUnidad [1,2,3]
        , acumularDoble [1,2,3]
        , acumularCuadrado [1,2,3]
        , transformar [1,2,3] (\x -> x * 2)
        , existe [1,2,3] 2
        , unirOfSet [1,2,2,3] [3,4]
        , removerDuplicados [1,1,2,3,2]
        , subSets [1,2]
        , cortar [1,2,3,4,5,6,7,8,9,10] 3
        ]