module BST exposing
    ( Tree(..)
    , Direccion(..)
    , esBSTValido
    , estaBalanceado
    , contiene
    , buscar
    , encontrarMinimo
    , encontrarMaximo
    , insertar
    , eliminar
    , validar
    , obtenerEnPosicion
    , map
    , filter
    , fold
    , aLista
    , desdeListaBalanceada
    )

type Tree a
    = Empty
    | Node a (Tree a) (Tree a)

type Direccion
    = Izquierda
    | Derecha

inorder : Tree a -> List a
inorder tree =
    case tree of
        Empty ->
            []

        Node x l r ->
            inorder l ++ [ x ] ++ inorder r

aLista : Tree a -> List a
aLista =
    inorder

altura : Tree a -> Int
altura tree =
    case tree of
        Empty ->
            0

        Node _ l r ->
            1 + max (altura l) (altura r)

esBSTValido : Tree comparable -> Bool
esBSTValido tree =
    let
        dentroRango minM maxM x =
            case ( minM, maxM ) of
                ( Just minV, Just maxV ) ->
                    x > minV && x < maxV

                ( Just minV, Nothing ) ->
                    x > minV

                ( Nothing, Just maxV ) ->
                    x < maxV

                ( Nothing, Nothing ) ->
                    True

        esConRango minM maxM t =
            case t of
                Empty ->
                    True

                Node x l r ->
                    dentroRango minM maxM x
                        && esConRango minM (Just x) l
                        && esConRango (Just x) maxM r
    in
    esConRango Nothing Nothing tree

estaBalanceado : Tree a -> Bool
estaBalanceado tree =
    case tree of
        Empty ->
            True

        Node _ l r ->
            let
                dif = abs (altura l - altura r)
            in
            dif <= 1 && estaBalanceado l && estaBalanceado r

contiene : comparable -> Tree comparable -> Bool
contiene v tree =
    case tree of
        Empty ->
            False

        Node x l r ->
            if v == x then
                True
            else if v < x then
                contiene v l
            else
                contiene v r

buscar : comparable -> Tree comparable -> Maybe comparable
buscar v tree =
    case tree of
        Empty ->
            Nothing

        Node x l r ->
            if v == x then
                Just x
            else if v < x then
                buscar v l
            else
                buscar v r

encontrarMinimo : Tree comparable -> Maybe comparable
encontrarMinimo tree =
    case tree of
        Empty ->
            Nothing

        Node x Empty _ ->
            Just x

        Node _ l _ ->
            encontrarMinimo l

encontrarMaximo : Tree comparable -> Maybe comparable
encontrarMaximo tree =
    case tree of
        Empty ->
            Nothing

        Node x _ Empty ->
            Just x

        Node _ _ r ->
            encontrarMaximo r

insertar : comparable -> Tree comparable -> Result String (Tree comparable)
insertar v tree =
    case tree of
        Empty ->
            Ok (Node v Empty Empty)

        Node x l r ->
            if v == x then
                Err ("El valor " ++ Debug.toString v ++ " ya existe en el árbol")

            else if v < x then
                case insertar v l of
                    Ok nuevoL ->
                        Ok (Node x nuevoL r)

                    Err msg ->
                        Err msg

            else
                case insertar v r of
                    Ok nuevoR ->
                        Ok (Node x l nuevoR)

                    Err msg ->
                        Err msg

eliminar : comparable -> Tree comparable -> Result String (Tree comparable)
eliminar v tree =
    case tree of
        Empty ->
            Err ("El valor " ++ Debug.toString v ++ " no existe en el árbol")

        Node x l r ->
            if v < x then
                eliminar v l |> Result.map (\nl -> Node x nl r)
            else if v > x then
                eliminar v r |> Result.map (\nr -> Node x l nr)
            else
                case ( l, r ) of
                    ( Empty, Empty ) ->
                        Ok Empty

                    ( Empty, _ ) ->
                        Ok r

                    ( _, Empty ) ->
                        Ok l

                    ( _, _ ) ->
                        case encontrarMinimo r of
                            Nothing ->
                                Err "Error interno: no se pudo encontrar el mínimo del subárbol derecho"

                            Just minR ->
                                eliminar minR r
                                    |> Result.map (\rSinMin -> Node minR l rSinMin)

validar : Tree comparable -> Result String (Tree comparable)
validar tree =
    if esBSTValido tree then
        Ok tree
    else
        Err "El árbol no cumple la propiedad BST"

obtenerEnPosicion : Int -> Tree comparable -> Result String comparable
obtenerEnPosicion n tree =
    let
        lista = inorder tree
        len = List.length lista
    in
    if n <= 0 || n > len then
        Err ("Posición fuera de rango: " ++ Debug.toString n)
    else
        case List.drop (n - 1) lista |> List.head of
            Nothing ->
                Err "Error inesperado al obtener la posición"

            Just v ->
                Ok v

map : (a -> b) -> Tree a -> Tree b
map f tree =
    case tree of
        Empty ->
            Empty

        Node x l r ->
            Node (f x) (map f l) (map f r)

filter : (a -> Bool) -> Tree a -> Tree a
filter pred tree =
    case tree of
        Empty ->
            Empty

        Node x l r ->
            let
                l' = filter pred l
                r' = filter pred r
            in
            if pred x then
                Node x l' r'
            else if l' /= Empty then
                l'
            else
                r'

fold : (a -> b -> b) -> b -> Tree a -> b
fold f init tree =
    List.foldl (\x acc -> f x acc) init (inorder tree)

construirBalanceado : List comparable -> Tree comparable
construirBalanceado xs =
    case xs of
        [] ->
            Empty

        _ ->
            let
                len = List.length xs
                mid = len // 2
                ( left, rest ) = List.splitAt mid xs
            in
            case rest of
                [] ->
                    Empty

                ( y :: right ) ->
                    Node y (construirBalanceado left) (construirBalanceado right)

desdeListaBalanceada : List comparable -> Tree comparable
desdeListaBalanceada lista =
    construirBalanceado (List.sortWith compare lista)