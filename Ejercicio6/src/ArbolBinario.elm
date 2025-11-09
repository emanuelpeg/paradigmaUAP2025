module ArbolBinario exposing
    ( Tree(..), Direccion(..)
    , arbolVacio, arbolHoja, arbolPequeno, arbolMediano
    , esVacio, esHoja
    , tamano, altura
    , sumarArbol
    , contiene
    , contarHojas
    , minimo, maximo
    -- Parte 2 (Maybe + andThen)
    , buscar
    , encontrarMinimo, encontrarMaximo
    , buscarPor
    , raiz
    , hijoIzquierdo, hijoDerecho
    , nietoIzquierdoIzquierdo
    , obtenerSubarbol
    , buscarEnSubarbol
    -- Parte 3 (Result)
    , validarNoVacio
    , obtenerRaiz
    , dividir
    , obtenerMinimo
    -- BST
    , esBST
    , insertarBST
    , buscarEnBST
    , validarBST
    -- Conversiones Maybe/Result
    , maybeAResult
    , resultAMaybe
    -- Pipelines con Result
    , buscarPositivo
    , validarArbol
    , buscarEnDosArboles
    -- Recorridos
    , inorder, preorder, postorder
    -- Transformaciones
    , mapArbol, filterArbol, foldArbol
    -- BST avanzado
    , eliminarBST
    , desdeListaBST
    , estaBalanceado
    , balancear
    -- Paths
    , encontrarCamino
    , seguirCamino
    , ancestroComun
    -- Sistema final (aliases solicitados)
    , esBSTValido
    , insertar, eliminar, validar
    , obtenerEnPosicion
    , map, filter, fold
    , aLista
    , desdeListaBalanceada
    )

-- ======================
-- Tipo de árbol binario
-- ======================

type Tree a
    = Empty
    | Node a (Tree a) (Tree a)


-- =========
-- Direcciones
-- =========

type Direccion
    = Izquierda
    | Derecha


-- ===========================
-- Ejercicios de Construcción
-- ===========================

arbolVacio : Tree Int
arbolVacio =
    Empty


arbolHoja : Tree Int
--    5
arbolHoja =
    Node 5 Empty Empty


arbolPequeno : Tree Int
--      3
--     / \
--    1   5
arbolPequeno =
    Node 3 (Node 1 Empty Empty) (Node 5 Empty Empty)


arbolMediano : Tree Int
--         10
--        /  \
--       5    15
--      / \   / \
--     3  7 12  20
arbolMediano =
    Node 10
        (Node 5 (Node 3 Empty Empty) (Node 7 Empty Empty))
        (Node 15 (Node 12 Empty Empty) (Node 20 Empty Empty))



-- ===============================
-- Parte 1: Pattern Matching básico
-- ===============================

esVacio : Tree a -> Bool
esVacio t =
    case t of
        Empty ->
            True

        _ ->
            False


esHoja : Tree a -> Bool
esHoja t =
    case t of
        Node _ Empty Empty ->
            True

        _ ->
            False


tamano : Tree a -> Int
tamano t =
    case t of
        Empty ->
            0

        Node _ l r ->
            1 + tamano l + tamano r


altura : Tree a -> Int
altura t =
    case t of
        Empty ->
            0

        Node _ l r ->
            1 + max (altura l) (altura r)


sumarArbol : Tree Int -> Int
sumarArbol t =
    case t of
        Empty ->
            0

        Node x l r ->
            x + sumarArbol l + sumarArbol r


contiene : a -> Tree a -> Bool
contiene v t =
    case t of
        Empty ->
            False

        Node x l r ->
            (x == v) || contiene v l || contiene v r


contarHojas : Tree a -> Int
contarHojas t =
    case t of
        Empty ->
            0

        Node _ Empty Empty ->
            1

        Node _ l r ->
            contarHojas l + contarHojas r


-- 9) mínimo (firma sin Maybe; robusto internamente)
minimo : Tree Int -> Int
minimo t =
    let
        minMaybe : Tree Int -> Maybe Int
        minMaybe tree =
            case tree of
                Empty ->
                    Nothing

                Node x l r ->
                    [ Just x, minMaybe l, minMaybe r ]
                        |> List.filterMap identity
                        |> List.minimum
    in
    minMaybe t |> Maybe.withDefault 0


-- 10) máximo (firma sin Maybe; robusto internamente)
maximo : Tree Int -> Int
maximo t =
    maximoMaybe t |> Maybe.withDefault 0


maximoMaybe : Tree Int -> Maybe Int
maximoMaybe tree =
    case tree of
        Empty ->
            Nothing

        Node x l r ->
            [ Just x, maximoMaybe l, maximoMaybe r ]
                |> List.filterMap identity
                |> List.maximum



-- ======================================
-- Parte 2: Introducción a Maybe (+andThen)
-- ======================================

buscar : a -> Tree a -> Maybe a
buscar v t =
    case t of
        Empty ->
            Nothing

        Node x l r ->
            if x == v then
                Just x
            else
                case buscar v l of
                    Just y ->
                        Just y

                    Nothing ->
                        buscar v r


encontrarMinimo : Tree comparable -> Maybe comparable
encontrarMinimo t =
    case t of
        Empty ->
            Nothing

        Node x l r ->
            [ Just x, encontrarMinimo l, encontrarMinimo r ]
                |> List.filterMap identity
                |> List.minimum


encontrarMaximo : Tree comparable -> Maybe comparable
encontrarMaximo t =
    case t of
        Empty ->
            Nothing

        Node x l r ->
            [ Just x, encontrarMaximo l, encontrarMaximo r ]
                |> List.filterMap identity
                |> List.maximum


buscarPor : (a -> Bool) -> Tree a -> Maybe a
buscarPor p t =
    case t of
        Empty ->
            Nothing

        Node x l r ->
            if p x then
                Just x
            else
                case buscarPor p l of
                    Just y ->
                        Just y

                    Nothing ->
                        buscarPor p r


raiz : Tree a -> Maybe a
raiz t =
    case t of
        Empty ->
            Nothing

        Node x _ _ ->
            Just x


hijoIzquierdo : Tree a -> Maybe (Tree a)
hijoIzquierdo t =
    case t of
        Empty ->
            Nothing

        Node _ l _ ->
            case l of
                Empty ->
                    Nothing

                _ ->
                    Just l


hijoDerecho : Tree a -> Maybe (Tree a)
hijoDerecho t =
    case t of
        Empty ->
            Nothing

        Node _ _ r ->
            case r of
                Empty ->
                    Nothing

                _ ->
                    Just r


nietoIzquierdoIzquierdo : Tree a -> Maybe (Tree a)
nietoIzquierdoIzquierdo t =
    hijoIzquierdo t
        |> Maybe.andThen hijoIzquierdo


obtenerSubarbol : a -> Tree a -> Maybe (Tree a)
obtenerSubarbol v t =
    case t of
        Empty ->
            Nothing

        Node x l r ->
            if x == v then
                Just t
            else
                case obtenerSubarbol v l of
                    Just sub ->
                        Just sub

                    Nothing ->
                        obtenerSubarbol v r


buscarEnSubarbol : a -> a -> Tree a -> Maybe a
buscarEnSubarbol valor1 valor2 arbol =
    obtenerSubarbol valor1 arbol
        |> Maybe.andThen (\sub -> buscar valor2 sub)



-- ============================
-- Parte 3: Result (validaciones)
-- ============================

validarNoVacio : Tree a -> Result String (Tree a)
validarNoVacio t =
    case t of
        Empty ->
            Err "El árbol está vacío"

        _ ->
            Ok t


obtenerRaiz : Tree a -> Result String a
obtenerRaiz t =
    case t of
        Empty ->
            Err "No se puede obtener la raíz de un árbol vacío"

        Node x _ _ ->
            Ok x


dividir : Tree a -> Result String ( a, Tree a, Tree a )
dividir t =
    case t of
        Empty ->
            Err "No se puede dividir un árbol vacío"

        Node x l r ->
            Ok ( x, l, r )


obtenerMinimo : Tree comparable -> Result String comparable
obtenerMinimo t =
    case encontrarMinimo t of
        Just m ->
            Ok m

        Nothing ->
            Err "No hay mínimo en un árbol vacío"



-- =====================
-- BST (búsqueda ordenada)
-- =====================

-- Verificación de BST usando cotas (min/max)
esBST : Tree comparable -> Bool
esBST t =
    esBSTConRango Nothing Nothing t |> Result.isOk


esBSTConRango : Maybe comparable -> Maybe comparable -> Tree comparable -> Result String ()
esBSTConRango minV maxV t =
    case t of
        Empty ->
            Ok ()

        Node x l r ->
            let
                checkMin =
                    case minV of
                        Nothing ->
                            Ok ()

                        Just m ->
                            if x > m then Ok () else Err ("Nodo con valor " ++ toString x ++ " viola BST: debe ser mayor que " ++ toString m)

                checkMax =
                    case maxV of
                        Nothing ->
                            Ok ()

                        Just M ->
                            if x < M then Ok () else Err ("Nodo con valor " ++ toString x ++ " viola BST: debe ser menor que " ++ toString M)
            in
            case ( checkMin, checkMax ) of
                ( Ok (), Ok () ) ->
                    esBSTConRango minV (Just x) l
                        |> Result.andThen (\_ -> esBSTConRango (Just x) maxV r)

                ( Err e, _ ) ->
                    Err e

                ( _, Err e ) ->
                    Err e


insertarBST : comparable -> Tree comparable -> Result String (Tree comparable)
insertarBST v t =
    case t of
        Empty ->
            Ok (Node v Empty Empty)

        Node x l r ->
            if v == x then
                Err ("El valor " ++ toString v ++ " ya existe en el árbol")
            else if v < x then
                insertarBST v l |> Result.map (\nl -> Node x nl r)
            else
                insertarBST v r |> Result.map (\nr -> Node x l nr)


buscarEnBST : comparable -> Tree comparable -> Result String comparable
buscarEnBST v t =
    case t of
        Empty ->
            Err ("El valor " ++ toString v ++ " no se encuentra en el árbol")

        Node x l r ->
            if v == x then
                Ok x
            else if v < x then
                buscarEnBST v l
            else
                buscarEnBST v r


validarBST : Tree comparable -> Result String (Tree comparable)
validarBST t =
    case esBSTConRango Nothing Nothing t of
        Ok () ->
            Ok t

        Err e ->
            Err e



-- ==========================
-- Conversiones Maybe/Result
-- ==========================

maybeAResult : String -> Maybe a -> Result String a
maybeAResult msg m =
    case m of
        Just x ->
            Ok x

        Nothing ->
            Err msg


resultAMaybe : Result error value -> Maybe value
resultAMaybe r =
    case r of
        Ok x ->
            Just x

        Err _ ->
            Nothing



-- =====================
-- Pipelines con Result
-- =====================

buscarPositivo : Int -> Tree Int -> Result String Int
buscarPositivo v t =
    case buscar v t of
        Nothing ->
            Err ("El valor " ++ toString v ++ " no se encuentra en el árbol")

        Just x ->
            if x > 0 then
                Ok x
            else
                Err ("El valor " ++ toString x ++ " no es positivo")


allPositivos : Tree Int -> Bool
allPositivos t =
    case t of
        Empty ->
            True

        Node x l r ->
            (x > 0) && allPositivos l && allPositivos r


validarArbol : Tree Int -> Result String (Tree Int)
validarArbol t =
    validarNoVacio t
        |> Result.andThen (\ar -> validarBST ar)
        |> Result.andThen
            (\ar ->
                if allPositivos ar then
                    Ok ar
                else
                    Err "Hay valores no positivos en el árbol"
            )


buscarEnDosArboles : Int -> Tree Int -> Tree Int -> Result String Int
buscarEnDosArboles v t1 t2 =
    buscarPositivo v t1
        |> Result.andThen (\x -> buscarPositivo x t2)



-- =========
-- Recorridos
-- =========

inorder : Tree a -> List a
inorder t =
    case t of
        Empty ->
            []

        Node x l r ->
            inorder l ++ (x :: inorder r)


preorder : Tree a -> List a
preorder t =
    case t of
        Empty ->
            []

        Node x l r ->
            x :: (preorder l ++ preorder r)


postorder : Tree a -> List a
postorder t =
    case t of
        Empty ->
            []

        Node x l r ->
            postorder l ++ postorder r ++ [ x ]



-- =================
-- Transformaciones
-- =================

mapArbol : (a -> b) -> Tree a -> Tree b
mapArbol f t =
    case t of
        Empty ->
            Empty

        Node x l r ->
            Node (f x) (mapArbol f l) (mapArbol f r)


mergeTrees : Tree a -> Tree a -> Tree a
mergeTrees left right =
    case ( left, right ) of
        ( Empty, _ ) ->
            right

        ( _, Empty ) ->
            left

        ( Node x l r, _ ) ->
            Node x l (mergeTrees r right)


filterArbol : (a -> Bool) -> Tree a -> Tree a
filterArbol p t =
    case t of
        Empty ->
            Empty

        Node x l r ->
            let
                fl = filterArbol p l
                fr = filterArbol p r
            in
            if p x then
                Node x fl fr
            else
                mergeTrees fl fr


foldArbol : (a -> b -> b) -> b -> Tree a -> b
foldArbol f acc t =
    case t of
        Empty ->
            acc

        Node x l r ->
            let
                accL = foldArbol f acc l
                accX = f x accL
            in
            foldArbol f accX r



-- ===============
-- BST Avanzado
-- ===============

-- eliminarBST: maneja hoja, un hijo, dos hijos (reemplaza con mínimo del derecho)
eliminarBST : comparable -> Tree comparable -> Result String (Tree comparable)
eliminarBST v t =
    case t of
        Empty ->
            Err ("El valor " ++ toString v ++ " no existe en el árbol")

        Node x l r ->
            if v < x then
                eliminarBST v l |> Result.map (\nl -> Node x nl r)

            else if v > x then
                eliminarBST v r |> Result.map (\nr -> Node x l nr)

            else
                -- v == x (borrar este nodo)
                case ( l, r ) of
                    ( Empty, Empty ) ->
                        Ok Empty

                    ( Empty, _ ) ->
                        Ok r

                    ( _, Empty ) ->
                        Ok l

                    ( _, _ ) ->
                        case extraerMin r of
                            ( m, rSinMin ) ->
                                Ok (Node m l rSinMin)


extraerMin : Tree comparable -> ( comparable, Tree comparable )
extraerMin t =
    case t of
        Node x Empty r ->
            ( x, r )

        Node x l r ->
            let
                ( m, nl ) =
                    extraerMin l
            in
            ( m, Node x nl r )

        Empty ->
            Debug.todo "extraerMin no debe llamarse con Empty"


desdeListaBST : List comparable -> Result String (Tree comparable)
desdeListaBST xs =
    List.foldl
        (\v acc ->
            acc |> Result.andThen (\t -> insertarBST v t)
        )
        (Ok Empty)
        xs



-- ==============
-- Balanceo / Altura
-- ==============

estaBalanceado : Tree a -> Bool
estaBalanceado t =
    balancedAlt t |> Tuple.first


balancedAlt : Tree a -> ( Bool, Int )
balancedAlt t =
    case t of
        Empty ->
            ( True, 0 )

        Node _ l r ->
            let
                ( bl, hl ) =
                    balancedAlt l

                ( br, hr ) =
                    balancedAlt r

                bal =
                    bl && br && (abs (hl - hr) <= 1)
            in
            ( bal, 1 + max hl hr )


balancear : Tree comparable -> Tree comparable
balancear t =
    let
        listaOrdenada =
            inorder t |> List.sort

    in
    desdeListaBalanceada listaOrdenada


desdeListaBalanceada : List comparable -> Tree comparable
desdeListaBalanceada xs =
    case xs of
        [] ->
            Empty

        _ ->
            let
                n = List.length xs
                mid = n // 2
                antes = List.take mid xs
                despues = List.drop (mid + 1) xs
                raizVal =
                    List.drop mid xs |> List.head |> Maybe.withDefault (Debug.todo "lista no vacía")
            in
            Node raizVal (desdeListaBalanceada antes) (desdeListaBalanceada despues)



-- =========
-- Paths
-- =========

encontrarCamino : comparable -> Tree comparable -> Result String (List Direccion)
encontrarCamino v t =
    let
        go tree =
            case tree of
                Empty ->
                    Nothing

                Node x l r ->
                    if v == x then
                        Just []
                    else
                        case go l of
                            Just pathL ->
                                Just (Izquierda :: pathL)

                            Nothing ->
                                case go r of
                                    Just pathR ->
                                        Just (Derecha :: pathR)

                                    Nothing ->
                                        Nothing
    in
    case go t of
        Just path ->
            Ok path

        Nothing ->
            Err ("El valor " ++ toString v ++ " no existe en el árbol")


seguirCamino : List Direccion -> Tree a -> Result String a
seguirCamino dirs t =
    case ( dirs, t ) of
        ( [], Empty ) ->
            Err "Camino inválido: árbol vacío"

        ( [], Node x _ _ ) ->
            Ok x

        ( Izquierda :: ds, Node _ l _ ) ->
            case l of
                Empty ->
                    Err "Camino inválido: no hay hijo izquierdo"

                _ ->
                    seguirCamino ds l

        ( Derecha :: ds, Node _ _ r ) ->
            case r of
                Empty ->
                    Err "Camino inválido: no hay hijo derecho"

                _ ->
                    seguirCamino ds r

        ( _ :: _, Empty ) ->
            Err "Camino inválido: no hay más nodos"


ancestroComun : comparable -> comparable -> Tree comparable -> Result String comparable
ancestroComun a b t =
    -- Requiere BST
    validarBST t
        |> Result.andThen (\_ -> buscarEnBST a t)
        |> Result.andThen (\_ -> buscarEnBST b t)
        |> Result.andThen
            (\_ ->
                let
                    go tree =
                        case tree of
                            Empty ->
                                Err "Árbol vacío"

                            Node x l r ->
                                if a < x && b < x then
                                    go l
                                else if a > x && b > x then
                                    go r
                                else
                                    Ok x
                in
                go t
            )



-- ==========================
-- Sistema Final (aliases)
-- ==========================

esBSTValido : Tree comparable -> Bool
esBSTValido =
    esBST


insertar : comparable -> Tree comparable -> Result String (Tree comparable)
insertar =
    insertarBST


eliminar : comparable -> Tree comparable -> Result String (Tree comparable)
eliminar =
    eliminarBST


validar : Tree comparable -> Result String (Tree comparable)
validar =
    validarBST


obtenerEnPosicion : Int -> Tree a -> Result String a
obtenerEnPosicion n t =
    let
        xs = inorder t
    in
    if n < 0 || n >= List.length xs then
        Err ("Índice fuera de rango: " ++ toString n)
    else
        List.drop n xs |> List.head |> maybeAResult "Índice inesperado"


-- Transformaciones (aliases con nombres solicitados)
map : (a -> b) -> Tree a -> Tree b
map =
    mapArbol


filter : (a -> Bool) -> Tree a -> Tree a
filter =
    filterArbol


fold : (a -> b -> b) -> b -> Tree a -> b
fold =
    foldArbol


-- Conversiones
aLista : Tree a -> List a
aLista =
    inorder
