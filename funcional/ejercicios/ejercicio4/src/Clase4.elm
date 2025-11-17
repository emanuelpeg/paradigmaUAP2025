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
-- 1. Crear Árboles de Ejemplo

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

        _ ->
            False


-- 3. Es Hoja

esHoja : Tree a -> Bool
esHoja arbol =
    case arbol of
        Node _ Empty Empty ->
            True

        _ ->
            False


-- ============================================================================
-- PARTE 1: PATTERN MATCHING CON ÁRBOLES
-- ============================================================================

tamano : Tree a -> Int
tamano arbol =
    case arbol of
        Empty ->
            0

        Node _ l r ->
            1 + tamano l + tamano r


altura : Tree a -> Int
altura arbol =
    case arbol of
        Empty ->
            0

        Node _ l r ->
            1 + max (altura l) (altura r)


sumarArbol : Tree Int -> Int
sumarArbol arbol =
    case arbol of
        Empty ->
            0

        Node x l r ->
            x + sumarArbol l + sumarArbol r


contiene : comparable -> Tree comparable -> Bool
contiene valor arbol =
    case arbol of
        Empty ->
            False

        Node v l r ->
            if valor == v then
                True
            else
                contiene valor l || contiene valor r


contarHojas : Tree a -> Int
contarHojas arbol =
    case arbol of
        Empty ->
            0

        Node _ Empty Empty ->
            1

        Node _ l r ->
            contarHojas l + contarHojas r


minimo : Tree Int -> Int
minimo arbol =
    case arbol of
        Empty ->
            0

        Node v Empty _ ->
            v

        Node _ l _ ->
            minimo l


maximo : Tree Int -> Int
maximo arbol =
    case arbol of
        Empty ->
            0

        Node v _ Empty ->
            v

        Node _ _ r ->
            maximo r


-- ============================================================================
-- PARTE 2: INTRODUCCIÓN A MAYBE
-- ============================================================================

buscar : comparable -> Tree comparable -> Maybe comparable
buscar valor arbol =
    case arbol of
        Empty ->
            Nothing

        Node v l r ->
            if valor == v then
                Just v
            else
                buscar valor l |> Maybe.orElse (buscar valor r)


encontrarMinimo : Tree comparable -> Maybe comparable
encontrarMinimo arbol =
    case arbol of
        Empty ->
            Nothing

        Node v Empty _ ->
            Just v

        Node _ l _ ->
            encontrarMinimo l


encontrarMaximo : Tree comparable -> Maybe comparable
encontrarMaximo arbol =
    case arbol of
        Empty ->
            Nothing

        Node v _ Empty ->
            Just v

        Node _ _ r ->
            encontrarMaximo r


buscarPor : (a -> Bool) -> Tree a -> Maybe a
buscarPor predicado arbol =
    case arbol of
        Empty ->
            Nothing

        Node v l r ->
            if predicado v then
                Just v
            else
                buscarPor predicado l |> Maybe.orElse (buscarPor predicado r)


raiz : Tree a -> Maybe a
raiz arbol =
    case arbol of
        Empty ->
            Nothing

        Node v _ _ ->
            Just v


hijoIzquierdo : Tree a -> Maybe (Tree a)
hijoIzquierdo arbol =
    case arbol of
        Node _ l _ ->
            Just l

        Empty ->
            Nothing


hijoDerecho : Tree a -> Maybe (Tree a)
hijoDerecho arbol =
    case arbol of
        Node _ _ r ->
            Just r

        Empty ->
            Nothing


nietoIzquierdoIzquierdo : Tree a -> Maybe (Tree a)
nietoIzquierdoIzquierdo arbol =
    hijoIzquierdo arbol |> Maybe.andThen hijoIzquierdo


obtenerSubarbol : comparable -> Tree comparable -> Maybe (Tree comparable)
obtenerSubarbol valor arbol =
    case arbol of
        Empty ->
            Nothing

        Node v l r ->
            if v == valor then
                Just arbol
            else
                obtenerSubarbol valor l |> Maybe.orElse (obtenerSubarbol valor r)


buscarEnSubarbol : comparable -> comparable -> Tree comparable -> Maybe comparable
buscarEnSubarbol v1 v2 arbol =
    obtenerSubarbol v1 arbol |> Maybe.andThen (buscar v2)


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

        Node v l r ->
            Ok ( v, l, r )


obtenerMinimo : Tree comparable -> Result String comparable
obtenerMinimo arbol =
    case encontrarMinimo arbol of
        Just v ->
            Ok v

        Nothing ->
            Err "No hay mínimo en un árbol vacío"


esBST : Tree comparable -> Bool
esBST arbol =
    let
        helper node minVal maxVal =
            case node of
                Empty ->
                    True

                Node v l r ->
                    (Maybe.map ((>) v) minVal |> Maybe.withDefault True)
                        && (Maybe.map ((<) v) maxVal |> Maybe.withDefault True)
                        && helper l minVal (Just v)
                        && helper r (Just v) maxVal
    in
    helper arbol Nothing Nothing


insertarBST : comparable -> Tree comparable -> Result String (Tree comparable)
insertarBST valor arbol =
    case arbol of
        Empty ->
            Ok (Node valor Empty Empty)

        Node v l r ->
            if valor == v then
                Err "El valor ya existe en el árbol"
            else if valor < v then
                insertarBST valor l |> Result.map (\nl -> Node v nl r)
            else
                insertarBST valor r |> Result.map (\nr -> Node v l nr)


buscarEnBST : comparable -> Tree comparable -> Result String comparable
buscarEnBST valor arbol =
    case arbol of
        Empty ->
            Err "El valor no se encuentra en el árbol"

        Node v l r ->
            if valor == v then
                Ok v
            else if valor < v then
                buscarEnBST valor l
            else
                buscarEnBST valor r


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
        Just v ->
            Ok v

        Nothing ->
            Err mensajeError


resultAMaybe : Result error value -> Maybe value
resultAMaybe result =
    case result of
        Ok v ->
            Just v

        Err _ ->
            Nothing


buscarPositivo : Int -> Tree Int -> Result String Int
buscarPositivo valor arbol =
    case buscar valor arbol of
        Just v ->
            if v > 0 then
                Ok v
            else
                Err "El valor no es positivo"

        Nothing ->
            Err "El valor no se encuentra en el árbol"


validarArbol : Tree Int -> Result String (Tree Int)
validarArbol arbol =
    validarNoVacio arbol |> Result.andThen validarBST


buscarEnDosArboles : Int -> Tree Int -> Tree Int -> Result String Int
buscarEnDosArboles valor arbol1 arbol2 =
    case buscar valor arbol1 of
        Just v ->
            Ok v

        Nothing ->
            case buscar valor arbol2 of
                Just v2 ->
                    Ok v2

                Nothing ->
                    Err "Búsqueda fallida"


-- ============================================================================
-- PARTE 5: DESAFÍOS AVANZADOS
-- ============================================================================

inorder : Tree a -> List a
inorder arbol =
    case arbol of
        Empty ->
            []

        Node v l r ->
            inorder l ++ [ v ] ++ inorder r


preorder : Tree a -> List a
preorder arbol =
    case arbol of
        Empty ->
            []

        Node v l r ->
            [ v ] ++ preorder l ++ preorder r


postorder : Tree a -> List a
postorder arbol =
    case arbol of
        Empty ->
            []

        Node v l r ->
            postorder l ++ postorder r ++ [ v ]


mapArbol : (a -> b) -> Tree a -> Tree b
mapArbol funcion arbol =
    case arbol of
        Empty ->
            Empty

        Node v l r ->
            Node (funcion v) (mapArbol funcion l) (mapArbol funcion r)


filterArbol : (a -> Bool) -> Tree a -> Tree a
filterArbol predicado arbol =
    case arbol of
        Empty ->
            Empty

        Node v l r ->
            let
                nl = filterArbol predicado l
                nr = filterArbol predicado r
            in
            if predicado v then
                Node v nl nr
            else
                if esVacio nl && esVacio nr then
                    Empty
                else
                    Node v nl nr


foldArbol : (a -> b -> b) -> b -> Tree a -> b
foldArbol funcion acumulador arbol =
    case arbol of
        Empty ->
            acumulador

        Node v l r ->
            foldArbol funcion (funcion v (foldArbol funcion acumulador r)) l


eliminarBST : comparable -> Tree comparable -> Result String (Tree comparable)
eliminarBST valor arbol =
    case arbol of
        Empty ->
            Err "El valor no existe en el árbol"

        Node v l r ->
            if valor < v then
                eliminarBST valor l |> Result.map (\nl -> Node v nl r)
            else if valor > v then
                eliminarBST valor r |> Result.map (\nr -> Node v l nr)
            else
                case ( l, r ) of
                    ( Empty, Empty ) ->
                        Ok Empty

                    ( l, Empty ) ->
                        Ok l

                    ( Empty, r ) ->
                        Ok r

                    _ ->
                        case encontrarMinimo r of
                            Just minV ->
                                eliminarBST minV r
                                    |> Result.map (\nr -> Node minV l nr)

                            Nothing ->
                                Err "Error interno"


desdeListaBST : List comparable -> Result String (Tree comparable)
desdeListaBST lista =
    List.foldl
        (\x acc ->
            acc |> Result.andThen (insertarBST x)
        )
        (Ok Empty)
        lista


estaBalanceado : Tree a -> Bool
estaBalanceado arbol =
    case arbol of
        Empty ->
            True

        Node _ l r ->
            abs (altura l - altura r) <= 1
                && estaBalanceado l
                && estaBalanceado r


balancear : Tree comparable -> Tree comparable
balancear arbol =
    let
        lista = inorder arbol

        construir l =
            case l of
                [] ->
                    Empty

                _ ->
                    let
                        mitad = List.length l // 2
                        ( izquierda, derecha ) = List.splitAt mitad l
                    in
                    case derecha of
                        [] ->
                            Empty

                        x :: xs ->
                            Node x (construir izquierda) (construir xs)
    in
    construir lista


type Direccion
    = Izquierda
    | Derecha


encontrarCamino : comparable -> Tree comparable -> Result String (List Direccion)
encontrarCamino valor arbol =
    case arbol of
        Empty ->
            Err "El valor no existe en el árbol"

        Node v l r ->
            if valor == v then
                Ok []
            else
                case encontrarCamino valor l of
                    Ok camino ->
                        Ok (Izquierda :: camino)

                    Err _ ->
                        case encontrarCamino valor r of
                            Ok camino ->
                                Ok (Derecha :: camino)

                            Err _ ->
                                Err "El valor no existe en el árbol"


seguirCamino : List Direccion -> Tree a -> Result String a
seguirCamino camino arbol =
    case ( camino, arbol ) of
        ( [], Node v _ _ ) ->
            Ok v

        ( Izquierda :: resto, Node _ l _ ) ->
            seguirCamino resto l

        ( Derecha :: resto, Node _ _ r ) ->
            seguirCamino resto r

        _ ->
            Err "Camino inválido"


ancestroComun : comparable -> comparable -> Tree comparable -> Result String comparable
ancestroComun v1 v2 arbol =
    case arbol of
        Empty ->
            Err "Uno o ambos valores no existen en el árbol"

        Node v l r ->
            if v1 < v && v2 < v then
                ancestroComun v1 v2 l
            else if v1 > v && v2 > v then
                ancestroComun v1 v2 r
            else
                Ok v


-- ============================================================================
-- PARTE 6: DESAFÍO FINAL - SISTEMA COMPLETO
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
        lista = inorder arbol
    in
    case List.drop posicion lista |> List.head of
        Just v ->
            Ok v

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
    let
        mitad = List.length lista // 2
        ( izquierda, derecha ) = List.splitAt mitad lista
    in
    case derecha of
        [] ->
            Empty

        x :: xs ->
            Node x (desdeListaBalanceada izquierda) (desdeListaBalanceada xs)
