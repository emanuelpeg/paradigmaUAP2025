module Parcial exposing (..)

type Set a
    = EmptySet
    | SetImpl a (Set a)


-- Agrega un elemento al inicio del Set (si no está repetido)
add : a -> Set a -> Set a
add x set =
    if contains x set then
        set
    else
        SetImpl x set


-- Auxiliar para ver si un elemento ya está en el Set
contains : a -> Set a -> Bool
contains x set =
    case set of
        EmptySet ->
            False

        SetImpl y rest ->
            if x == y then
                True
            else
                contains x rest


-- Devuelve el elemento en el índice dado (si existe)
getIndex : Int -> Set a -> Maybe a
getIndex n set =
    case ( n, set ) of
        ( _, EmptySet ) ->
            Nothing

        ( 0, SetImpl x _ ) ->
            Just x

        ( _, SetImpl _ rest ) ->
            getIndex (n - 1) rest


-- Acumula los valores usando una función y un valor inicial
fold : (a -> b -> b) -> b -> Set a -> b
fold f acc set =
    case set of
        EmptySet ->
            acc

        SetImpl x rest ->
            fold f (f x acc) rest


-- Quicksort con función de comparación pasada por parámetro
sort : (a -> a -> Bool) -> Set a -> Set a
sort cmp set =
    case set of
        EmptySet ->
            EmptySet

        SetImpl x rest ->
            let
                left =
                    filter (\y -> cmp y x) rest

                right =
                    filter (\y -> not (cmp y x)) rest
            in
            concat (sort cmp left) (SetImpl x (sort cmp right))


-- Filtra elementos del Set
filter : (a -> Bool) -> Set a -> Set a
filter f set =
    case set of
        EmptySet ->
            EmptySet

        SetImpl x rest ->
            if f x then
                SetImpl x (filter f rest)
            else
                filter f rest


-- Concatena dos sets sin repetir
concat : Set a -> Set a -> Set a
concat s1 s2 =
    fold add s2 s1


-- Implementa el operador andThen (monádico)
andThen : (a -> Set b) -> Set a -> Set b
andThen f set =
    case set of
        EmptySet ->
            EmptySet

        SetImpl x rest ->
            concat (f x) (andThen f rest)


-- Devuelve los divisores propios de cada número (excluyendo 1 y el mismo número)
divisoresPropios : Set Int -> Set Int
divisoresPropios set =
    andThen
        (\n -> divisores n)
        set


-- Divisores de un número
divisores : Int -> Set Int
divisores n =
    let
        esDivisor x =
            n % x == 0
    in
    fromList
        (List.filter (\x -> esDivisor x && x /= 1 && x /= n) (List.range 1 (n - 1)))


-- Crea un Set desde una lista
fromList : List a -> Set a
fromList list =
    List.foldr add EmptySet list
