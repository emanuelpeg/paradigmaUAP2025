module Clase4 exposing (..)

{-| Ejercicios de Programación Funcional - Clase 4
Este módulo contiene ejercicios para practicar pattern matching y mónadas en Elm
usando árboles binarios como estructura de datos principal.

Temas:
  - Pattern Matching con tipos algebraicos
  - Mónada Maybe para operaciones opcionales
  - Mónada Result para manejo de errores
  - Composición monádica con andThen
-}

-- ============================================================================
-- DEFINICIÓN DEL ÁRBOL BINARIO
-- ============================================================================

type Tree a
    = Empty
    | Node a (Tree a) (Tree a)


-- ============================================================================
-- PARTE 0: CONSTRUCCIÓN DE ÁRBOLES
-- ============================================================================

arbolVacio : Tree Int
arbolVacio =
    Empty


arbolHoja : Tree Int
arbolHoja =
    Node 5 Empty Empty


arbolPequeno : Tree Int
arbolPequeno =
    Node 3 (Node 1 Empty Empty) (Node 5 Empty Empty)


arbolMediano : Tree Int
arbolMediano =
    Node 10
        (Node 5 (Node 3 Empty Empty) (Node 7 Empty Empty))
        (Node 15 (Node 12 Empty Empty) (Node 20 Empty Empty))


-- 2. Es Vacío

esVacio : Tree a -> Bool
esVacio arbol =
    case arbol of
        Empty ->
            True

        Node _ _ _ ->
            False


-- 3. Es Hoja

esHoja : Tree a -> Bool
esHoja arbol =
    case arbol of
        Empty ->
            False

        Node _ Empty Empty ->
            True

        Node _ _ _ ->
            False


-- ============================================================================
-- PARTE 1: PATTERN MATCHING CON ÁRBOLES
-- ============================================================================

-- 4. Tamaño del Árbol

tamano : Tree a -> Int
tamano arbol =
    case arbol of
        Empty ->
            0

        Node _ izq der ->
            1 + tamano izq + tamano der


-- 5. Altura del Árbol

altura : Tree a -> Int
altura arbol =
    case arbol of
        Empty ->
            0

        Node _ izq der ->
            1 + max (altura izq) (altura der)


-- 6. Suma de valores

sumarArbol : Tree Int -> Int
sumarArbol arbol =
    case arbol of
        Empty ->
            0

        Node valor izq der ->
            valor + sumarArbol izq + sumarArbol der


-- 7. Contiene valor

contiene : a -> Tree a -> Bool
contiene valor arbol =
    case arbol of
        Empty ->
            False

        Node v izq der ->
            v == valor || contiene valor izq || contiene valor der


-- 8. Contar hojas

contarHojas : Tree a -> Int
contarHojas arbol =
    case arbol of
        Empty ->
            0

        Node _ Empty Empty ->
            1

        Node _ izq der ->
            contarHojas izq + contarHojas der


-- 9. Valor mínimo sin Maybe

minimo : Tree Int -> Int
minimo arbol =
    case arbol of
        Empty ->
            0

        Node v Empty Empty ->
            v

        Node v izq der ->
            min v (min (minimo izq) (minimo der))


-- 10. Valor máximo sin Maybe

maximo : Tree Int -> Int
maximo arbol =
    case arbol of
        Empty ->
            0

        Node v Empty Empty ->
            v

        Node v izq der ->
            max v (max (maximo izq) (maximo der))


-- ============================================================================
-- PARTE 2: MAYBE
-- ============================================================================

-- 11. Buscar valor en lista

buscarEnLista : a -> List a -> Maybe a
buscarEnLista valor lista =
    case lista of
        [] ->
            Nothing

        x :: xs ->
            if x == valor then
                Just x
            else
                buscarEnLista valor xs


buscar : a -> Tree a -> Maybe a
buscar valor arbol =
    case arbol of
        Empty ->
            Nothing

        Node v izq der ->
            if v == valor then
                Just v
            else
                case buscar valor izq of
                    Just x ->
                        Just x

                    Nothing ->
                        buscar valor der


-- 12. Encontrar mínimo con Maybe

encontrarMinimo : Tree Int -> Maybe Int
encontrarMinimo arbol =
    case arbol of
        Empty ->
            Nothing

        Node v Empty Empty ->
            Just v

        Node v izq der ->
            case ( encontrarMinimo izq, encontrarMinimo der ) of
                ( Nothing, Nothing ) ->
                    Just v

                ( Just a, Nothing ) ->
                    Just (min v a)

                ( Nothing, Just b ) ->
                    Just (min v b)

                ( Just a, Just b ) ->
                    Just (min v (min a b))


-- 13. Encontrar máximo con Maybe

encontrarMaximo : Tree comparable -> Maybe comparable
encontrarMaximo arbol =
    case arbol of
        Empty ->
            Nothing

        Node v Empty Empty ->
            Just v

        Node v izq der ->
            case ( encontrarMaximo izq, encontrarMaximo der ) of
                ( Nothing, Nothing ) ->
                    Just v

                ( Just a, Nothing ) ->
                    Just (max v a)

                ( Nothing, Just b ) ->
                    Just (max v b)

                ( Just a, Just b ) ->
                    Just (max v (max a b))


-- 14. Buscar por predicado

buscarPor : (a -> Bool) -> Tree a -> Maybe a
buscarPor predicado arbol =
    case arbol of
        Empty ->
            Nothing

        Node v izq der ->
            if predicado v then
                Just v
            else
                case buscarPor predicado izq of
                    Just x ->
                        Just x

                    Nothing ->
                        buscarPor predicado der


-- 15. Obtener raíz

raiz : Tree a -> Maybe a
raiz arbol =
    case arbol of
        Empty ->
            Nothing

        Node v _ _ ->
            Just v


-- 16. Obtener hijo izquierdo

hijoIzquierdo : Tree a -> Maybe (Tree a)
hijoIzquierdo arbol =
    case arbol of
        Empty ->
            Nothing

        Node _ izq _ ->
            Just izq


hijoDerecho : Tree a -> Maybe (Tree a)
hijoDerecho arbol =
    case arbol of
        Empty ->
            Nothing

        Node _ _ der ->
            Just der


-- 17. Obtener nieto

nietoIzquierdoIzquierdo : Tree a -> Maybe (Tree a)
nietoIzquierdoIzquierdo arbol =
    hijoIzquierdo arbol
        |> Maybe.andThen hijoIzquierdo


-- 18. Buscar subárbol por valor

obtenerSubarbol : a -> Tree a -> Maybe (Tree a)
obtenerSubarbol valor arbol =
    case arbol of
        Empty ->
            Nothing

        Node v izq der ->
            if v == valor then
                Just arbol
            else
                case obtenerSubarbol valor izq of
                    Just x ->
                        Just x

                    Nothing ->
                        obtenerSubarbol valor der


buscarEnSubarbol : a -> a -> Tree a -> Maybe a
buscarEnSubarbol valor1 valor2 arbol =
    obtenerSubarbol valor1 arbol
        |> Maybe.andThen (\sub -> buscar valor2 sub)


-- ============================================================================
-- PARTE 3: RESULT PARA VALIDACIONES
-- ============================================================================

validarNoVacio : Tree a -> Result String (Tree a)
validarNoVacio arbol =
    case arbol of
        Empty ->
            Err "El árbol está vacío"

        _ ->
            Ok arbol


obtenerRaiz : Tree a -> Result String a
obtenerRaiz arbol =
    case arbol of
        Empty ->
            Err "No se puede obtener la raíz de un árbol vacío"

        Node v _ _ ->
            Ok v


dividir : Tree a -> Result String ( a, Tree a, Tree a )
dividir arbol =
    case arbol of
        Empty ->
            Err "No se puede dividir un árbol vacío"

        Node v izq der ->
            Ok ( v, izq, der )


obtenerMinimo : Tree comparable -> Result String comparable
obtenerMinimo arbol =
    case encontrarMinimo arbol of
        Nothing ->
            Err "No hay mínimo en un árbol vacío"

        Just x ->
            Ok x


-- Verificación de BST

esBST : Tree comparable -> Bool
esBST arbol =
    case inorder arbol of
        [] ->
            True

        x :: xs ->
            List.all (\(a, b) -> a <= b) (List.map2 Tuple.pair (x :: xs) xs)


insertarBST : comparable -> Tree comparable -> Result String (Tree comparable)
insertarBST valor arbol =
    case arbol of
        Empty ->
            Ok (Node valor Empty Empty)

        Node v izq der ->
            if valor == v then
                Err "El valor ya existe en el árbol"
            else if valor < v then
                insertarBST valor izq
                    |> Result.map (\nuevo -> Node v nuevo der)
            else
                insertarBST valor der
                    |> Result.map (\nuevo -> Node v izq nuevo)


buscarEnBST : comparable -> Tree comparable -> Result String comparable
buscarEnBST valor arbol =
    case arbol of
        Empty ->
            Err "El valor no se encuentra en el árbol"

        Node v izq der ->
            if valor == v then
                Ok v
            else if valor < v then
                buscarEnBST valor izq
            else
                buscarEnBST valor der


validarBST : Tree comparable -> Result String (Tree comparable)
validarBST arbol =
    if esBST arbol then
        Ok arbol
    else
        Err "El árbol no es un BST válido"


-- ============================================================================
-- PARTE 4: COMBINANDO MAYBE Y RESULT
-- ============================================================================

maybeAResult : String -> Maybe a -> Result String a
maybeAResult mensajeError maybe =
    case maybe of
        Just x ->
            Ok x

        Nothing ->
            Err mensajeError


resultAMaybe : Result error value -> Maybe value
resultAMaybe result =
    case result of
        Ok x ->
            Just x

        Err _ ->
            Nothing


buscarPositivo : Int -> Tree Int -> Result String Int
buscarPositivo valor arbol =
    case buscar valor arbol of
        Nothing ->
            Err "El valor no se encuentra en el árbol"

        Just x ->
            if x > 0 then
                Ok x
            else
                Err "El valor es negativo"


validarArbol : Tree Int -> Result String (Tree Int)
validarArbol arbol =
    validarNoVacio arbol
        |> Result.andThen validarBST


buscarEnDosArboles : Int -> Tree Int -> Tree Int -> Result String Int
buscarEnDosArboles valor arbol1 arbol2 =
    case buscar valor arbol1 of
        Just x ->
            Ok x

        Nothing ->
            buscarPositivo valor arbol2


-- ============================================================================
-- PARTE 5: RECORRIDOS Y OPERACIONES
-- ============================================================================

inorder : Tree a -> List a
inorder arbol =
    case arbol of
        Empty ->
            []

        Node v izq der ->
            inorder izq ++ [ v ] ++ inorder der


preorder : Tree a -> List a
preorder arbol =
    case arbol of
        Empty ->
            []

        Node v izq der ->
            v :: preorder izq ++ preorder der


postorder : Tree a -> List a
postorder arbol =
    case arbol of
        Empty ->
            []

        Node v izq der ->
            postorder izq ++ postorder der ++ [ v ]


mapArbol : (a -> b) -> Tree a -> Tree b
mapArbol funcion arbol =
    case arbol of
        Empty ->
            Empty

        Node v izq der ->
            Node (funcion v) (mapArbol funcion izq) (mapArbol funcion der)


filterArbol : (a -> Bool) -> Tree a -> Tree a
filterArbol predicado arbol =
    case arbol of
        Empty ->
            Empty

        Node v izq der ->
            let
                izqFiltrado =
                    filterArbol predicado izq

                derFiltrado =
                    filterArbol predicado der
            in
            if predicado v then
                Node v izqFiltrado derFiltrado
            else
                case ( izqFiltrado, derFiltrado ) of
                    (Empty, Empty) ->
                        Empty

                    (x, Empty) ->
                        x

                    (Empty, x) ->
                        x

                    (x, y) ->
                        Node v x y


foldArbol : (a -> b -> b) -> b -> Tree a -> b
foldArbol funcion acumulador arbol =
    case arbol of
        Empty ->
            acumulador

        Node v izq der ->
            let
                acumuladoIzq =
                    foldArbol funcion acumulador izq

                acumuladoDer =
                    foldArbol funcion acumuladoIzq der
            in
            funcion v acumuladoDer


eliminarBST : comparable -> Tree comparable -> Result String (Tree comparable)
eliminarBST valor arbol =
    case arbol of
        Empty ->
            Err "El valor no existe en el árbol"

        Node v izq der ->
            if valor < v then
                eliminarBST valor izq
                    |> Result.map (\nuevo -> Node v nuevo der)

            else if valor > v then
                eliminarBST valor der
                    |> Result.map (\nuevo -> Node v izq nuevo)

            else
                case ( izq, der ) of
                    ( Empty, Empty ) ->
                        Ok Empty

                    ( Empty, _ ) ->
                        Ok der

                    ( _, Empty ) ->
                        Ok izq

                    _ ->
                        case encontrarMinimo der of
                            Just menor ->
                                eliminarBST menor der
                                    |> Result.map (\nuevoDer -> Node menor izq nuevoDer)

                            Nothing ->
                                Err "Error inesperado"


desdeListaBST : List comparable -> Result String (Tree comparable)
desdeListaBST lista =
    List.foldl
        (\v acc ->
            case acc of
                Err e ->
                    Err e

                Ok arbol ->
                    insertarBST v arbol
        )
        (Ok Empty)
        lista


estaBalanceado : Tree a -> Bool
estaBalanceado arbol =
    case arbol of
        Empty ->
            True

        Node _ izq der ->
            abs (altura izq - altura der) <= 1
                && estaBalanceado izq
                && estaBalanceado der


balancear : Tree comparable -> Tree comparable
balancear arbol =
    let
        listaOrdenada =
            inorder arbol

        construir lst =
            case lst of
                [] ->
                    Empty

                _ ->
                    let
                        mitad =
                            List.length lst // 2

                        izquierda =
                            List.take mitad lst

                        derecha =
                            List.drop (mitad + 1) lst

                        valor =
                            List.head (List.drop mitad lst)
                                |> Maybe.withDefault (Debug.todo "No debería estar vacío")
                    in
                    Node valor (construir izquierda) (construir derecha)
    in
    construir listaOrdenada


type Direccion
    = Izquierda
    | Derecha


encontrarCamino : a -> Tree a -> Result String (List Direccion)
encontrarCamino valor arbol =
    case arbol of
        Empty ->
            Err "El valor no existe en el árbol"

        Node v izq der ->
            if valor == v then
                Ok []
            else
                case encontrarCamino valor izq of
                    Ok camino ->
                        Ok (Izquierda :: camino)

                    Err _ ->
                        case encontrarCamino valor der of
                            Ok camino ->
                                Ok (Derecha :: camino)

                            Err _ ->
                                Err "El valor no existe en el árbol"


seguirCamino : List Direccion -> Tree a -> Result String a
seguirCamino camino arbol =
    case ( camino, arbol ) of
        ( [], Node v _ _ ) ->
            Ok v

        ( Izquierda :: resto, Node _ izq _ ) ->
            seguirCamino resto izq

        ( Derecha :: resto, Node _ _ der ) ->
            seguirCamino resto der

        _ ->
            Err "Camino inválido"


ancestroComun : comparable -> comparable -> Tree comparable -> Result String comparable
ancestroComun a b arbol =
    case arbol of
        Empty ->
            Err "Uno o ambos valores no existen en el árbol"

        Node v izq der ->
            if a < v && b < v then
                ancestroComun a b izq
            else if a > v && b > v then
                ancestroComun a b der
            else
                Ok v


-- ============================================================================
-- PARTE 6: SISTEMA COMPLETO BST
-- ============================================================================

esBSTValido : Tree comparable -> Bool
esBSTValido arbol =
    esBST arbol


estaBalanceadoCompleto : Tree comparable -> Bool
estaBalanceadoCompleto arbol =
    estaBalanceado arbol


contieneValor : comparable -> Tree comparable -> Bool
contieneValor valor arbol =
    contiene valor arbol


buscarMaybe : comparable -> Tree comparable -> Maybe comparable
buscarMaybe valor arbol =
    buscar valor arbol


encontrarMinimoMaybe : Tree comparable -> Maybe comparable
encontrarMinimoMaybe arbol =
    encontrarMinimo arbol


encontrarMaximoMaybe : Tree comparable -> Maybe comparable
encontrarMaximoMaybe arbol =
    encontrarMaximo arbol


insertarResult : comparable -> Tree comparable -> Result String (Tree comparable)
insertarResult valor arbol =
    insertarBST valor arbol


eliminarResult : comparable -> Tree comparable -> Result String (Tree comparable)
eliminarResult valor arbol =
    eliminarBST valor arbol


validarResult : Tree comparable -> Result String (Tree comparable)
validarResult arbol =
    validarBST arbol


obtenerEnPosicion : Int -> Tree comparable -> Result String comparable
obtenerEnPosicion posicion arbol =
    let
        lista =
            inorder arbol
    in
    case List.drop posicion lista |> List.head of
        Just x ->
            Ok x

        Nothing ->
            Err "Posición inválida"


map : (a -> b) -> Tree a -> Tree b
map funcion arbol =
    mapArbol funcion arbol


filter : (a -> Bool) -> Tree a -> Tree a
filter predicado arbol =
    filterArbol predicado arbol


fold : (a -> b -> b) -> b -> Tree a -> b
fold funcion acumulador arbol =
    foldArbol funcion acumulador arbol


aLista : Tree a -> List a
aLista arbol =
    inorder arbol


desdeListaBalanceada : List comparable -> Tree comparable
desdeListaBalanceada lista =
    balancear (Result.withDefault Empty (desdeListaBST lista))
