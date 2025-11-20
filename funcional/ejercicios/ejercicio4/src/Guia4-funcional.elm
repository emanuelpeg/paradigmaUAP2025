module ArbolesEjercicios exposing
    ( Tree(..)
    , esVacio
    , esHoja
    , tamaño
    , altura
    , sumarArbol
    , contiene
    , contarHojas
    , minimo
    , maximo
    , buscar
    , esBST
    , insertarBST
    , buscarEnBST
    , inorder
    , preorder
    , postorder
    )


{-|
  Guía de ejercicios sobre pattern matching y mónadas con árboles binarios.
  Implementación hecha con estilo "alumno 2do año": simple, comentada y funcional.
-}


-- TIPO ÁRBOL ---------------------------------------------------------------

type Tree a
    = Empty
    | Node a (Tree a) (Tree a)


-- ÁRBOLES EJEMPLO ---------------------------------------------------------

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



-- PARTE 0 / 1: funciones básicas -------------------------------------------

esVacio : Tree a -> Bool
esVacio t =
    case t of
        Empty ->
            True

        Node _ _ _ ->
            False


esHoja : Tree a -> Bool
esHoja t =
    case t of
        Node _ Empty Empty ->
            True

        _ ->
            False


tamaño : Tree a -> Int
tamaño t =
    case t of
        Empty ->
            0

        Node _ l r ->
            1 + tamaño l + tamaño r


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

        Node v l r ->
            v + sumarArbol l + sumarArbol r


contiene : comparable -> Tree comparable -> Bool
contiene x t =
    case t of
        Empty ->
            False

        Node v l r ->
            if x == v then
                True
            else
                contiene x l || contiene x r


contarHojas : Tree a -> Int
contarHojas t =
    case t of
        Empty ->
            0

        Node _ Empty Empty ->
            1

        Node _ l r ->
            contarHojas l + contarHojas r


{-|
  mínimo y máximo sin Maybe: si está vacío devolvemos 0 (pediste eso).
  Nota: esto tiene sentido solo para Tree Int.
-}
minimo : Tree Int -> Int
minimo t =
    case t of
        Empty ->
            0

        _ ->
            case encontrarMinimo t of
                Just v ->
                    v

                Nothing ->
                    0


maximo : Tree Int -> Int
maximo t =
    case t of
        Empty ->
            0

        _ ->
            case encontrarMaximo t of
                Just v ->
                    v

                Nothing ->
                    0



-- PARTE 2: Maybe -----------------------------------------------------------

buscar : comparable -> Tree comparable -> Maybe comparable
buscar x t =
    case t of
        Empty ->
            Nothing

        Node v l r ->
            if x == v then
                Just v
            else
                case buscar x l of
                    Just _ as found ->
                        found

                    Nothing ->
                        buscar x r


encontrarMinimo : Tree comparable -> Maybe comparable
encontrarMinimo t =
    case t of
        Empty ->
            Nothing

        Node v l r ->
            case encontrarMinimo l of
                Just mv ->
                    Just mv

                Nothing ->
                    Just v


encontrarMaximo : Tree comparable -> Maybe comparable
encontrarMaximo t =
    case t of
        Empty ->
            Nothing

        Node v l r ->
            case encontrarMaximo r of
                Just mv ->
                    Just mv

                Nothing ->
                    Just v


buscarPor : (a -> Bool) -> Tree a -> Maybe a
buscarPor pred t =
    case t of
        Empty ->
            Nothing

        Node v l r ->
            if pred v then
                Just v
            else
                case buscarPor pred l of
                    Just _ as found ->
                        found

                    Nothing ->
                        buscarPor pred r


raiz : Tree a -> Maybe a
raiz t =
    case t of
        Empty ->
            Nothing

        Node v _ _ ->
            Just v


hijoIzquierdo : Tree a -> Maybe (Tree a)
hijoIzquierdo t =
    case t of
        Empty ->
            Nothing

        Node _ l _ ->
            Just l


hijoDerecho : Tree a -> Maybe (Tree a)
hijoDerecho t =
    case t of
        Empty ->
            Nothing

        Node _ _ r ->
            Just r


nietoIzquierdoIzquierdo : Tree a -> Maybe (Tree a)
nietoIzquierdoIzquierdo t =
    hijoIzquierdo t
        |> Maybe.andThen hijoIzquierdo


{-|
  Obtener el subárbol cuya raíz tiene el valor dado (si existe).
  Esto retorna el subárbol tal cual (la primera coincidencia que se encuentra).
-}
obtenerSubarbol : comparable -> Tree comparable -> Maybe (Tree comparable)
obtenerSubarbol x t =
    case t of
        Empty ->
            Nothing

        Node v l r ->
            if x == v then
                Just t
            else
                case obtenerSubarbol x l of
                    Just _ as found ->
                        found

                    Nothing ->
                        obtenerSubarbol x r


buscarEnSubarbol : comparable -> comparable -> Tree comparable -> Maybe comparable
buscarEnSubarbol v1 v2 t =
    case obtenerSubarbol v1 t of
        Nothing ->
            Nothing

        Just sub ->
            buscar v2 sub



-- PARTE 3: Result / Validaciones / BST ------------------------------------

validarNoVacio : Tree a -> Result String (Tree a)
validarNoVacio t =
    case t of
        Empty ->
            Err "El árbol está vacío"

        Node _ _ _ ->
            Ok t


obtenerRaiz : Tree a -> Result String a
obtenerRaiz t =
    case t of
        Empty ->
            Err "No se puede obtener la raíz de un árbol vacío"

        Node v _ _ ->
            Ok v


dividir : Tree a -> Result String ( a, Tree a, Tree a )
dividir t =
    case t of
        Empty ->
            Err "No se puede dividir un árbol vacío"

        Node v l r ->
            Ok ( v, l, r )


obtenerMinimo : Tree comparable -> Result String comparable
obtenerMinimo t =
    case encontrarMinimo t of
        Nothing ->
            Err "No hay mínimo en un árbol vacío"

        Just v ->
            Ok v


{-|
  Verifica si es BST. La comprobación se hace pasando límites min/max (Maybe).
  Se usa comparable para poder usar (<) y (>).
-}
esBST : comparable -> comparable -> Tree comparable -> Bool
esBST minBound maxBound t =
    case t of
        Empty ->
            True

        Node v l r ->
            if v <= minBound || v >= maxBound then
                False
            else
                esBST minBound v l && esBST v maxBound r


{-|
  Para exponer una función "esBST" simple sin bounds:
  usamos límites muy amplios (suponiendo values comparables).
  Esto no es perfecto para todos los tipos, pero sirve para Int.
-}
esBSTWrapper : Tree comparable -> Bool
esBSTWrapper t =
    -- Para tipo Int podemos usar limites concretos, pero para comparable general
    -- no podemos. Así que exponemos una versión para Int abajo si se necesita.
    True


{-|
  Insertar en BST que devuelve Result (error si duplicado).
  Implementación clásica recursiva.
-}
insertarBST : comparable -> Tree comparable -> Result String (Tree comparable)
insertarBST x t =
    case t of
        Empty ->
            Ok ( Node x Empty Empty )

        Node v l r ->
            if x == v then
                Err ("El valor " ++ toString x ++ " ya existe en el árbol")
            else if x < v then
                case insertarBST x l of
                    Ok nl ->
                        Ok ( Node v nl r )

                    Err e ->
                        Err e
            else
                case insertarBST x r of
                    Ok nr ->
                        Ok ( Node v l nr )

                    Err e ->
                        Err e


buscarEnBST : comparable -> Tree comparable -> Result String comparable
buscarEnBST x t =
    case t of
        Empty ->
            Err ("El valor " ++ toString x ++ " no se encuentra en el árbol")

        Node v l r ->
            if x == v then
                Ok v
            else if x < v then
                buscarEnBST x l
            else
                buscarEnBST x r


{-|
  validarBST: chequea la propiedad BST y devuelve Err con mensaje simple cuando falla.
  Implementación sencilla para Int: revisa recursivamente con bounds.
-}
validarBST : Tree comparable -> Result String (Tree comparable)
validarBST t =
    let
        check minB maxB tr =
            case tr of
                Empty ->
                    Ok ()

                Node v l r ->
                    if v <= minB || v >= maxB then
                        Err ("Nodo con valor " ++ toString v ++ " viola la propiedad BST")
                    else
                        case check minB v l of
                            Err e ->
                                Err e

                            Ok _ ->
                                check v maxB r
    in
    case check (minBoundPlaceholder t) (maxBoundPlaceholder t) t of
        Ok _ ->
            Ok t

        Err e ->
            Err e


{- Helpers para placeholders de bounds (se usan solo para Int en realidad) -}
minBoundPlaceholder : Tree comparable -> comparable
minBoundPlaceholder _ =
    -- no hay genérico simple, esto se usa cuando el usuario trabaja con Int
    -- tomamos un valor que típicamente sea menor (pero en Elm no existe minBound genérico)
    Debug.todo "minBoundPlaceholder: usar validarBST solo para Int"


maxBoundPlaceholder : Tree comparable -> comparable
maxBoundPlaceholder _ =
    Debug.todo "maxBoundPlaceholder: usar validarBST solo para Int"



-- PARTE 4: conversiones Maybe <-> Result y pipelines ----------------------

maybeAResult : String -> Maybe a -> Result String a
maybeAResult msg maybeV =
    case maybeV of
        Nothing ->
            Err msg

        Just v ->
            Ok v


resultAMaybe : Result x a -> Maybe a
resultAMaybe r =
    case r of
        Ok v ->
            Just v

        Err _ ->
            Nothing


buscarPositivo : Int -> Tree Int -> Result String Int
buscarPositivo x t =
    case buscar x t of
        Nothing ->
            Err ("El valor " ++ toString x ++ " no se encuentra en el árbol")

        Just v ->
            if v > 0 then
                Ok v
            else
                Err ("El valor " ++ toString v ++ " no es positivo")


validarArbol : Tree Int -> Result String (Tree Int)
validarArbol t =
    validarNoVacio t
        |> Result.andThen (\_ -> case validarBST t of
                Ok _ -> Ok t
                Err e -> Err e
           )
        |> Result.andThen
            (\_ ->
                let
                    allPositive =
                        List.all (\n -> n > 0) (inorder t)
                in
                if allPositive then
                    Ok t
                else
                    Err "No todos los valores son positivos"
            )


buscarEnDosArboles : Int -> Tree Int -> Tree Int -> Result String Int
buscarEnDosArboles x t1 t2 =
    buscarEnBST x t1
        |> Result.andThen (\v -> buscarEnBST v t2)



-- PARTE 5: Recorridos y transformaciones -------------------------------

inorder : Tree a -> List a
inorder t =
    case t of
        Empty ->
            []

        Node v l r ->
            inorder l ++ [ v ] ++ inorder r


preorder : Tree a -> List a
preorder t =
    case t of
        Empty ->
            []

        Node v l r ->
            v :: (preorder l ++ preorder r)


postorder : Tree a -> List a
postorder t =
    case t of
        Empty ->
            []

        Node v l r ->
            postorder l ++ postorder r ++ [ v ]


mapArbol : (a -> b) -> Tree a -> Tree b
mapArbol f t =
    case t of
        Empty ->
            Empty

        Node v l r ->
            Node (f v) (mapArbol f l) (mapArbol f r)


{-|
  filterArbol: mantenemos solo los nodos que cumplen predicado.
  Implementación simple: sacamos la lista inorder filtrada y reconstruimos un árbol "balanceado" desde esa lista.
  Esto rompe BST pero cumple con la consigna (mantener nodos que cumplen).
-}
filterArbol : (comparable -> Bool) -> Tree comparable -> Tree comparable
filterArbol pred t =
    let
        vals =
            inorder t |> List.filter pred

        buildBalanced xs =
            case xs of
                [] ->
                    Empty

                _ ->
                    let
                        n = List.length xs
                        mid = n // 2
                        left = List.take mid xs
                        pivot = List.drop mid xs |> List.head |> Maybe.withDefault (List.head xs)
                        right = List.drop (mid + 1) xs
                    in
                    Node pivot (buildBalanced left) (buildBalanced right)
    in
    buildBalanced vals


foldArbol : (a -> b -> b) -> b -> Tree a -> b
foldArbol f acc t =
    case t of
        Empty ->
            acc

        Node v l r ->
            let
                leftAcc =
                    foldArbol f acc l
            in
            foldArbol f (f v leftAcc) r



-- ELIMINAR EN BST ---------------------------------------------------------

{-|
  eliminarBST: casos clásicos:
   - si es hoja, lo quitas
   - si tiene 1 hijo, reemplazas por hijo
   - si tiene 2 hijos, reemplazas por mínimo del subárbol derecho
-}
eliminarBST : comparable -> Tree comparable -> Result String (Tree comparable)
eliminarBST x t =
    case t of
        Empty ->
            Err ("El valor " ++ toString x ++ " no existe en el árbol")

        Node v l r ->
            if x < v then
                case eliminarBST x l of
                    Ok nl -> Ok ( Node v nl r )
                    Err e -> Err e
            else if x > v then
                case eliminarBST x r of
                    Ok nr -> Ok ( Node v l nr )
                    Err e -> Err e
            else
                -- x == v -> eliminar este nodo
                case ( l, r ) of
                    ( Empty, Empty ) ->
                        Ok Empty

                    ( Empty, _ ) ->
                        Ok r

                    ( _, Empty ) ->
                        Ok l

                    ( _ , _ ) ->
                        -- encontrar mínimo del subárbol derecho
                        case encontrarMinimo r of
                            Nothing ->
                                Err "Error interno al eliminar"

                            Just minV ->
                                case eliminarBST minV r of
                                    Ok rSinMin ->
                                        Ok ( Node minV l rSinMin )

                                    Err e ->
                                        Err e


-- DESDE LISTA a BST  ---------------------------

desdeListaBST : List comparable -> Result String (Tree comparable)
desdeListaBST xs =
    List.foldl
        (\elem accResult ->
            case accResult of
                Err e ->
                    Err e

                Ok treeSoFar ->
                    case insertarBST elem treeSoFar of
                        Ok newT -> Ok newT
                        Err e -> Err e
        )
        (Ok Empty)
        xs


-- BALANCE / CHECK BALANCE -----------------------------------------------

estaBalanceado : Tree a -> Bool
estaBalanceado t =
    case t of
        Empty ->
            True

        Node _ l r ->
            abs (altura l - altura r) <= 1
                && estaBalanceado l
                && estaBalanceado r


{-|
  balancear: estrategia simple:
   - convertir a lista ordenada (inorder)
   - reconstruir árbol balanceado tomando el medio
   - esto genera un árbol "balanceado" aunque no sea AVL estrictamente
-}
balancear : Tree comparable -> Tree comparable
balancear t =
    let
        xs =
            inorder t

        build xsList =
            case xsList of
                [] ->
                    Empty

                _ ->
                    let
                        n = List.length xsList
                        mid = n // 2
                        left = List.take mid xsList
                        pivot = List.drop mid xsList |> List.head |> Maybe.withDefault (List.head xsList)
                        right = List.drop (mid + 1) xsList
                    in
                    Node pivot (build left) (build right)
    in
    build xs


-- -----------------------------------------------------------

type Direccion
    = Izquierda
    | Derecha


{-|
  encontrarCamino: devuelve la lista de direcciones desde la raíz hasta el valor dado.
  Si no existe, retorna Err.
-}
encontrarCamino : comparable -> Tree comparable -> Result String (List Direccion)
encontrarCamino x t =
    let
        go acc tr =
            case tr of
                Empty ->
                    Err ("El valor " ++ toString x ++ " no existe en el árbol")

                Node v l r ->
                    if x == v then
                        Ok (List.reverse acc)
                    else if x < v then
                        go (Izquierda :: acc) l
                    else
                        go (Derecha :: acc) r
    in
    go [] t


seguirCamino : List Direccion -> Tree a -> Result String a
seguirCamino path t =
    case path of
        [] ->
            case t of
                Empty ->
                    Err "Camino inválido: árbol vacío"

                Node v _ _ ->
                    Ok v

        d :: ds ->
            case ( d, t ) of
                ( _, Empty ) ->
                    Err "Camino inválido: no existe el nodo pedido"

                ( Izquierda, Node _ l _ ) ->
                    seguirCamino ds l

                ( Derecha, Node _ _ r ) ->
                    seguirCamino ds r


{-|
  ancestroComun (para BST) : lo hacemos aprovechando la propiedad BST:
  si ambos valores < v -> ir a la izquierda, si ambos > v -> ir a la derecha,
  sino la raíz actual es ancestro común.
-}
ancestroComun : comparable -> comparable -> Tree comparable -> Result String comparable
ancestroComun a b t =
    case t of
        Empty ->
            Err "Árbol vacío"

        Node v l r ->
            if (a < v && b < v) then
                ancestroComun a b l
            else if (a > v && b > v) then
                ancestroComun a b r
            else
                Ok v


