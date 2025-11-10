module GuiaPatternYMonadas exposing (..)
import List exposing (foldl, foldr)
import Maybe exposing (Maybe(..))
import Result exposing (Result(..))


-- PARTE 0: Definición y árboles de ejemplo
type Tree a
    = Empty
    | Node a (Tree a) (Tree a)


-- Ejemplos solicitados
arbolVacio : Tree Int
arbolVacio =
    Empty


arbolHoja : Tree Int
arbolHoja =
    Node 5 Empty Empty


arbolPequeno : Tree Int
--      3
--     / \
--    1   5
arbolPequeno =
    Node 3 (Node 1 Empty Empty) (Node 5 Empty Empty)


arbolMediano : Tree Int
--        10
--       /  \
--      5    15
--     / \   / \
--    3  7 12  20
arbolMediano =
    Node 10
        (Node 5 (Node 3 Empty Empty) (Node 7 Empty Empty))
        (Node 15 (Node 12 Empty Empty) (Node 20 Empty Empty))



-- Parte 0 helpers: Predicados básicos


esVacio : Tree a -> Bool
esVacio tree =
    case tree of
        Empty ->
            True

        Node _ _ _ ->
            False


esHoja : Tree a -> Bool
esHoja tree =
    case tree of
        Node _ Empty Empty ->
            True

        _ ->
            False



-- PARTE 1: Coincidencia de patrones con Árboles (básicos)


tamaño : Tree a -> Int
tamaño tree =
    case tree of
        Empty ->
            0

        Node _ l r ->
            1 + tamaño l + tamaño r


altura : Tree a -> Int
altura tree =
    case tree of
        Empty ->
            0

        Node _ l r ->
            1 + max (altura l) (altura r)


sumarArbol : Tree Int -> Int
sumarArbol tree =
    case tree of
        Empty ->
            0

        Node v l r ->
            v + sumarArbol l + sumarArbol r



contiene : comparable -> Tree comparable -> Bool
contiene x tree =
    case tree of
        Empty ->
            False

        Node v l r ->
            if x == v then
                True
            else
                contiene x l || contiene x r


contarHojas : Tree a -> Int
contarHojas tree =
    case tree of
        Empty ->
            0

        Node _ Empty Empty ->
            1

        Node _ l r ->
            contarHojas l + contarHojas r


-- mínimo y máximo sin Maybe (especificado: devolver 0 para Empty)
minimo : Tree Int -> Int
minimo tree =
    case tree of
        Empty ->
            0

        Node v l r ->
            let
                leftMin =
                    case l of
                        Empty -> v
                        _ -> minimo l

                rightMin =
                    case r of
                        Empty -> v
                        _ -> minimo r
            in
            min v (min leftMin rightMin)


maximo : Tree Int -> Int
maximo tree =
    case tree of
        Empty ->
            0

        Node v l r ->
            let
                leftMax =
                    case l of
                        Empty -> v
                        _ -> maximo l

                rightMax =
                    case r of
                        Empty -> v
                        _ -> maximo r
            in
            max v (max leftMax rightMax)




-- PARTE 2: Maybe (búsquedas que pueden fallar)


buscar : comparable -> Tree comparable -> Maybe comparable
buscar x tree =
    case tree of
        Empty ->
            Nothing

        Node v l r ->
            if x == v then
                Just v
            else
                case buscar x l of
                    Just found ->
                        Just found

                    Nothing ->
                        buscar x r


encontrarMinimo : Tree comparable -> Maybe comparable
encontrarMinimo tree =
    case tree of
        Empty ->
            Nothing

        Node v l r ->
            case encontrarMinimo l of
                Just mv ->
                    Just mv

                Nothing ->
                    Just v


encontrarMaximo : Tree comparable -> Maybe comparable
encontrarMaximo tree =
    case tree of
        Empty ->
            Nothing

        Node v l r ->
            case encontrarMaximo r of
                Just mv ->
                    Just mv

                Nothing ->
                    Just v


buscarPor : (a -> Bool) -> Tree a -> Maybe a
buscarPor pred tree =
    case tree of
        Empty ->
            Nothing

        Node v l r ->
            if pred v then
                Just v
            else
                case buscarPor pred l of
                    Just found ->
                        Just found

                    Nothing ->
                        buscarPor pred r


raiz : Tree a -> Maybe a
raiz tree =
    case tree of
        Empty ->
            Nothing

        Node v _ _ ->
            Just v


-- andThen / encadenamiento con Maybe
hijoIzquierdo : Tree a -> Maybe (Tree a)
hijoIzquierdo tree =
    case tree of
        Empty ->
            Nothing

        Node _ l _ ->
            Just l


hijoDerecho : Tree a -> Maybe (Tree a)
hijoDerecho tree =
    case tree of
        Empty ->
            Nothing

        Node _ _ r ->
            Just r


nietoIzquierdoIzquierdo : Tree a -> Maybe (Tree a)
nietoIzquierdoIzquierdo tree =
    hijoIzquierdo tree
        |> Maybe.andThen hijoIzquierdo


-- obtenerSubarbol: busca el subárbol cuya raíz es 'valor'
obtenerSubarbol : comparable -> Tree comparable -> Maybe (Tree comparable)
obtenerSubarbol valor tree =
    case tree of
        Empty ->
            Nothing

        Node v l r ->
            if valor == v then
                Just tree
            else
                case obtenerSubarbol valor l of
                    Just s ->
                        Just s

                    Nothing ->
                        obtenerSubarbol valor r


buscarEnSubarbol : comparable -> comparable -> Tree comparable -> Maybe comparable
buscarEnSubarbol v1 v2 tree =
    obtenerSubarbol v1 tree
        |> Maybe.andThen (\sub -> buscar v2 sub)


-- PARTE 3: Result para validaciones con errores descriptivos


validarNoVacio : Tree a -> Result String (Tree a)
validarNoVacio tree =
    case tree of
        Empty ->
            Err "El árbol está vacío"

        _ ->
            Ok tree


obtenerRaiz : Tree a -> Result String a
obtenerRaiz tree =
    case tree of
        Empty ->
            Err "No se puede obtener la raíz de un árbol vacío"

        Node v _ _ ->
            Ok v


dividir : Tree a -> Result String ( a, Tree a, Tree a )
dividir tree =
    case tree of
        Empty ->
            Err "No se puede dividir un árbol vacío"

        Node v l r ->
            Ok ( v, l, r )


obtenerMinimo : Tree comparable -> Result String comparable
obtenerMinimo tree =
    case encontrarMinimo tree of
        Just m ->
            Ok m

        Nothing ->
            Err "No hay mínimo en un árbol vacío"




-- PARTE BST: Utilidades y verificación



isBSTBetween : Tree comparable -> Maybe comparable -> Maybe comparable -> Bool
isBSTBetween tree low high =
    case tree of
        Empty ->
            True

        Node v l r ->
            let
                okLow =
                    case low of
                        Nothing -> True
                        Just lo -> v > lo

                okHigh =
                    case high of
                        Nothing -> True
                        Just hi -> v < hi
            in
            okLow && okHigh && isBSTBetween l low (Just v) && isBSTBetween r (Just v) high


esBST : Tree comparable -> Bool
esBST tree =
    isBSTBetween tree Nothing Nothing


-- insertarBST: devuelve Err si ya existe
insertarBST : comparable -> Tree comparable -> Result String (Tree comparable)
insertarBST x tree =
    case tree of
        Empty ->
            Ok (Node x Empty Empty)

        Node v l r ->
            if x == v then
                Err ("El valor " ++ toString x ++ " ya existe en el árbol")
            else if x < v then
                case insertarBST x l of
                    Ok newLeft -> Ok (Node v newLeft r)
                    Err e -> Err e
            else
                case insertarBST x r of
                    Ok newRight -> Ok (Node v l newRight)
                    Err e -> Err e


buscarEnBST : comparable -> Tree comparable -> Result String comparable
buscarEnBST x tree =
    case tree of
        Empty ->
            Err ("El valor " ++ toString x ++ " no se encuentra en el árbol")

        Node v l r ->
            if x == v then
                Ok v
            else if x < v then
                buscarEnBST x l
            else
                buscarEnBST x r



validarBST : Tree comparable -> Result String (Tree comparable)
validarBST tree =
    case validate tree Nothing Nothing of
        Nothing ->
            Ok tree

        Just msg ->
            Err msg


validate : Tree comparable -> Maybe comparable -> Maybe comparable -> Maybe String
validate tree low high =
    case tree of
        Empty ->
            Nothing

        Node v l r ->
            case ( low, high ) of
                ( Just lo, _ ) | not (v > lo) ->
                    Just ("Nodo con valor " ++ toString v ++ " viola la propiedad BST: debe ser mayor que " ++ toString lo)

                ( _, Just hi ) | not (v < hi) ->
                    Just ("Nodo con valor " ++ toString v ++ " viola la propiedad BST: debe ser menor que " ++ toString hi)

                _ ->
                    case validate l low (Just v) of
                        Just err -> Just err
                        Nothing -> validate r (Just v) high



-- PARTE 4: Conversiones Maybe <-> Result y pipelines

maybeAResult : String -> Maybe a -> Result String a
maybeAResult msg maybeVal =
    case maybeVal of
        Just v ->
            Ok v

        Nothing ->
            Err msg


resultAMaybe : Result e a -> Maybe a
resultAMaybe res =
    case res of
        Ok v ->
            Just v

        Err _ ->
            Nothing


buscarPositivo : Int -> Tree Int -> Result String Int
buscarPositivo valor tree =
    case buscar valor tree of
        Just v ->
            if v > 0 then
                Ok v
            else
                Err ("El valor " ++ toString v ++ " no es positivo")

        Nothing ->
            Err ("El valor " ++ toString valor ++ " no se encuentra en el árbol")


validarArbol : Tree Int -> Result String (Tree Int)
validarArbol tree =
    validarNoVacio tree
        |> Result.andThen (\t -> validarBST t)
        |> Result.andThen
            (\t ->
                if allPositivos t then
                    Ok t
                else
                    Err "No todos los valores son positivos"
            )


allPositivos : Tree Int -> Bool
allPositivos tree =
    case tree of
        Empty ->
            True

        Node v l r ->
            v > 0 && allPositivos l && allPositivos r


buscarEnDosArboles : Int -> Tree Int -> Tree Int -> Result String Int
buscarEnDosArboles valor arbol1 arbol2 =
    case buscar valor arbol1 of
        Just v ->
            buscarEnBST v arbol2

        Nothing ->
            Err ("El valor " ++ toString valor ++ " no se encuentra en el primer árbol")




-- PARTE 5: Recorridos y transformaciones


inorder : Tree a -> List a
inorder tree =
    case tree of
        Empty ->
            []

        Node v l r ->
            inorder l ++ [ v ] ++ inorder r


preorder : Tree a -> List a
preorder tree =
    case tree of
        Empty ->
            []

        Node v l r ->
            v :: (preorder l ++ preorder r)


postorder : Tree a -> List a
postorder tree =
    case tree of
        Empty ->
            []

        Node v l r ->
            postorder l ++ postorder r ++ [ v ]


mapArbol : (a -> b) -> Tree a -> Tree b
mapArbol f tree =
    case tree of
        Empty ->
            Empty

        Node v l r ->
            Node (f v) (mapArbol f l) (mapArbol f r)


filterArbol : (a -> Bool) -> Tree a -> Tree a
filterArbol pred tree =
    let
        listaFiltrada =
            inorder tree
                |> List.filter pred
    in
    fromListBalanced listaFiltrada


-- foldArbol: usa inorder y foldl para aplicar la función
foldArbol : (a -> b -> b) -> b -> Tree a -> b
foldArbol f acc tree =
    List.foldl (\x a -> f x a) acc (inorder tree)




-- BST avanzado: eliminación, construcción desde lista, balanceo


eliminarBST : comparable -> Tree comparable -> Result String (Tree comparable)
eliminarBST x tree =
    case tree of
        Empty ->
            Err ("El valor " ++ toString x ++ " no existe en el árbol")

        Node v l r ->
            if x < v then
                case eliminarBST x l of
                    Ok nl -> Ok (Node v nl r)
                    Err e -> Err e
            else if x > v then
                case eliminarBST x r of
                    Ok nr -> Ok (Node v l nr)
                    Err e -> Err e
            else
                -- encontramos el nodo a eliminar (x == v)
                case ( l, r ) of
                    ( Empty, Empty ) ->
                        Ok Empty

                    ( Empty, _ ) ->
                        Ok r

                    ( _, Empty ) ->
                        Ok l

                    ( _, _ ) ->
                        -- ambos hijos existen: reemplazar por mínimo del subárbol derecho
                        case encontrarMinimo r of
                            Just succ ->
                                case eliminarBST succ r of
                                    Ok newRight ->
                                        Ok (Node succ l newRight)
                                    Err e ->
                                        Err e
                            Nothing ->
                                -- esto no debería pasar porque r no es Empty
                                Err "Error interno al eliminar: subárbol derecho vacío inesperado"


-- insertar todos los elementos de una lista (detecta duplicados)
desdeListaBST : List comparable -> Result String (Tree comparable)
desdeListaBST lst =
    List.foldl
        (\x accRes ->
            case accRes of
                Err e ->
                    Err e

                Ok tree ->
                    case insertarBST x tree of
                        Ok t -> Ok t
                        Err e -> Err e
        )
        (Ok Empty)
        lst


-- estaBalanceado: diferencia de alturas <= 1 en todos los nodos
estaBalanceado : Tree a -> Bool
estaBalanceado tree =
    case tree of
        Empty ->
            True

        Node _ l r ->
            abs (altura l - altura r) <= 1 && estaBalanceado l && estaBalanceado r



balancear : Tree comparable -> Tree comparable
balancear tree =
    let
        ls =
            inorder tree
    in
    fromListBalanced ls


-- construir árbol balanceado desde lista (lista entendida como ordenada/ordenable)
fromListBalanced : List comparable -> Tree comparable
fromListBalanced lst =
    case lst of
        [] ->
            Empty

        _ ->
            let
                midIndex =
                    List.length lst // 2

                ( leftList, rest ) =
                    List.splitAt midIndex lst

                rootVal =
                    case rest of
                        [] -> List.head leftList |> Maybe.withDefault (Debug.todo "root extraction")
                        rHead :: _ -> rHead

                rightList =
                    case rest of
                        [] -> []
                        _ -> List.tail rest |> Maybe.withDefault []
            in
            Node rootVal (fromListBalanced leftList) (fromListBalanced rightList)




-- PARTE 5B: Búsqueda de rutas


type Direccion
    = Izquierda
    | Derecha


encontrarCamino : comparable -> Tree comparable -> Result String (List Direccion)
encontrarCamino objetivo tree =
    case pathHelper objetivo tree of
        Just p ->
            Ok p

        Nothing ->
            Err ("El valor " ++ toString objetivo ++ " no existe en el árbol")


pathHelper : comparable -> Tree comparable -> Maybe (List Direccion)
pathHelper objetivo tree =
    case tree of
        Empty ->
            Nothing

        Node v l r ->
            if objetivo == v then
                Just []
            else
                case pathHelper objetivo l of
                    Just p -> Just (Izquierda :: p)
                    Nothing ->
                        case pathHelper objetivo r of
                            Just p2 -> Just (Derecha :: p2)
                            Nothing -> Nothing


seguirCamino : List Direccion -> Tree comparable -> Result String comparable
seguirCamino dirs tree =
    case follow dirs tree of
        Just v -> Ok v
        Nothing -> Err "Camino inválido: no se llegó a un nodo con valor"


follow : List Direccion -> Tree comparable -> Maybe comparable
follow dirs tree =
    case dirs of
        [] ->
            case tree of
                Empty -> Nothing
                Node v _ _ -> Just v

        d :: ds ->
            case tree of
                Empty -> Nothing
                Node _ l r ->
                    case d of
                        Izquierda -> follow ds l
                        Derecha -> follow ds r


-- ancestro común más cercano (LCA) para BST (asume BST)
ancestroComun : comparable -> comparable -> Tree comparable -> Result String comparable
ancestroComun a b tree =
    -- primero verificar que ambos valores existan
    case ( buscar a tree, buscar b tree ) of
        ( Nothing, _ ) ->
            Err ("El valor " ++ toString a ++ " no existe en el árbol")

        ( _, Nothing ) ->
            Err ("El valor " ++ toString b ++ " no existe en el árbol")

        _ ->
            -- asumiendo BST, recorre desde la raíz
            findLCA a b tree


findLCA : comparable -> comparable -> Tree comparable -> Result String comparable
findLCA a b tree =
    case tree of
        Empty ->
            Err "Árbol vacío"

        Node v l r ->
            if a < v && b < v then
                findLCA a b l

            else if a > v && b > v then
                findLCA a b r

            else
                Ok v




-- PARTE 6: Sistema Completo (alias de funciones ya implementadas)


-- Operaciones Bool
esBSTValido : Tree comparable -> Bool
esBSTValido =
    esBST


-- ya existe esta función: estaBalanceado
-- contiene también ya implementada pero con comparable:
contieneComparable : comparable -> Tree comparable -> Bool
contieneComparable =
    contiene


-- Operaciones Maybe
buscarMaybe : comparable -> Tree comparable -> Maybe comparable
buscarMaybe =
    buscar


encontrarMinimoMaybe : Tree comparable -> Maybe comparable
encontrarMinimoMaybe =
    encontrarMinimo


encontrarMaximoMaybe : Tree comparable -> Maybe comparable
encontrarMaximoMaybe =
    encontrarMaximo


-- Operaciones Result
insertar : comparable -> Tree comparable -> Result String (Tree comparable)
insertar =
    insertarBST


eliminar : comparable -> Tree comparable -> Result String (Tree comparable)
eliminar =
    eliminarBST


validar : Tree comparable -> Result String (Tree comparable)
validar =
    validarBST


obtenerEnPosicion : Int -> Tree comparable -> Result String comparable
obtenerEnPosicion n tree =
    let
        ls = inorder tree
    in
    if n < 0 || n >= List.length ls then
        Err "Índice fuera de rango"
    else
        Ok (List.drop n ls |> List.head |> Maybe.withDefault (Debug.todo "index"))

-- Transformaciones
mapTree : (a -> b) -> Tree a -> Tree b
mapTree =
    mapArbol


filterTree : (a -> Bool) -> Tree a -> Tree a
filterTree =
    filterArbol


foldTree : (a -> b -> b) -> b -> Tree a -> b
foldTree =
    foldArbol


-- Conversiones
aLista : Tree a -> List a
aLista =
    inorder


desdeListaBalanceada : List comparable -> Tree comparable
desdeListaBalanceada =
    fromListBalanced


- -   G u � a   4 R i c a r d o   D e l g a d o  
 