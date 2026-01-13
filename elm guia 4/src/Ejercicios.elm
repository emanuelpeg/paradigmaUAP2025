module Ejercicios exposing 
    ( Tree(..), ArbolError(..)
    , arbolVacio, arbolPequeno, arbolMediano
    , esVacio, tamaño, sumarArbol, contiene, contarHojas
    , primerValor, minimoMaybe, maximoMaybe
    , minimoResult, maximoResult, contieneValidado
    , pipeline
    -- Nuevas funciones
    , obtenerSubarbol, buscarEnSubarbol
    , validarNoVacio, obtenerRaiz, dividir, obtenerMinimo
    , esBST, insertarBST, buscarEnBST, validarBST
    , maybeAResult, resultAMaybe
    , buscarPositivo, validarArbol, buscarEnDosArboles
    , inorder, preorder, postorder
    , mapArbol, filterArbol, foldArbol
    , eliminarBST, desdeListaBST, estaBalanceado, balancear
    , Direccion(..), encontrarCamino, seguirCamino, ancestroComun
    -- Módulo completo
    , esBSTValido
    , buscar, encontrarMinimo, encontrarMaximo
    , insertar, eliminar, validar, obtenerEnPosicion
    , map, filter, fold
    , aLista, desdeListaBalanceada
    )

import Html exposing (Html)
import Html.Attributes
import Browser
import Debug
import List


-- =================================================================
-- FUNCIONES AUXILIARES
-- =================================================================

takeWhile : (a -> Bool) -> List a -> List a
takeWhile pred list =
    case list of
        [] -> []
        x :: xs ->
            if pred x then
                x :: takeWhile pred xs
            else
                []

orElse : Result e a -> Result e a -> Result e a
orElse fallback result =
    case result of
        Ok v -> Ok v
        Err _ -> fallback


-- =================================================================
-- DEFINICIÓN Y CONSTRUCCIÓN
-- =================================================================

type Tree a = Empty | Node a (Tree a) (Tree a)

arbolVacio : Tree Int
arbolVacio = Empty

arbolPequeno : Tree Int
arbolPequeno =
    Node 3
        (Node 1 Empty Empty)
        (Node 5 Empty Empty)

arbolMediano : Tree Int
arbolMediano =
    Node 10
        (Node 5
            (Node 3 Empty Empty)
            (Node 7 Empty Empty)
        )
        (Node 15
            (Node 12 Empty Empty)
            (Node 20 Empty Empty)
        )

esVacio : Tree a -> Bool
esVacio tree =
    case tree of
        Empty -> True
        Node _ _ _ -> False

tamaño : Tree a -> Int
tamaño tree =
    case tree of
        Empty -> 0
        Node _ left right -> 1 + tamaño left + tamaño right

sumarArbol : Tree Int -> Int
sumarArbol tree =
    case tree of
        Empty -> 0
        Node value left right -> value + sumarArbol left + sumarArbol right

contiene : comparable -> Tree comparable -> Bool
contiene target tree =
    case tree of
        Empty -> False
        Node value left right ->
            if value == target then True
            else contiene target left || contiene target right

contarHojas : Tree a -> Int
contarHojas tree =
    case tree of
        Empty -> 0
        Node _ Empty Empty -> 1
        Node _ left right -> contarHojas left + contarHojas right

primerValor : Tree a -> Maybe a
primerValor tree =
    case tree of
        Empty -> Nothing
        Node value _ _ -> Just value


-- =================================================================
-- FUNCIONES CON INT (no comparable)
-- =================================================================

minimoMaybe : Tree Int -> Maybe Int
minimoMaybe tree =
    case tree of
        Empty -> Nothing
        Node value left right ->
            let
                minL = minimoMaybe left
                minR = minimoMaybe right
                minimoDeHijos =
                    case (minL, minR) of
                        (Just l, Just r) -> Just (min l r)
                        (Just l, Nothing) -> Just l
                        (Nothing, Just r) -> Just r
                        (Nothing, Nothing) -> Nothing
            in
            case minimoDeHijos of
                Just childMin -> Just (min value childMin)
                Nothing -> Just value

maximoMaybe : Tree Int -> Maybe Int
maximoMaybe tree =
    case tree of
        Empty -> Nothing
        Node value left right ->
            let
                maxL = maximoMaybe left
                maxR = maximoMaybe right
                maximoDeHijos =
                    case (maxL, maxR) of
                        (Just l, Just r) -> Just (max l r)
                        (Just l, Nothing) -> Just l
                        (Nothing, Just r) -> Just r
                        (Nothing, Nothing) -> Nothing
            in
            case maximoDeHijos of
                Just childMax -> Just (max value childMax)
                Nothing -> Just value


-- =================================================================
-- PARTE 3: Result
-- =================================================================

type ArbolError = ArbolVacio | ValorNoEncontrado Int

minimoResult : Tree Int -> Result ArbolError Int
minimoResult tree =
    case minimoMaybe tree of
        Just val -> Ok val
        Nothing -> Err ArbolVacio

maximoResult : Tree Int -> Result ArbolError Int
maximoResult tree =
    case maximoMaybe tree of
        Just val -> Ok val
        Nothing -> Err ArbolVacio

contieneValidado : Int -> Tree Int -> Result ArbolError Int
contieneValidado target tree =
    case esVacio tree of
        True -> Err ArbolVacio
        False ->
            if contiene target tree then Ok target
            else Err (ValorNoEncontrado target)

sumarDiez : Int -> Result ArbolError Int
sumarDiez n = Ok (n + 10)

pipeline : Tree Int -> Result ArbolError Int
pipeline tree =
    minimoResult tree
        |> Result.andThen (\minVal -> contieneValidado minVal tree)
        |> Result.andThen sumarDiez


-- =================================================================
-- 18. Buscar en Profundidad
-- =================================================================

obtenerSubarbol : comparable -> Tree comparable -> Maybe (Tree comparable)
obtenerSubarbol target tree =
    case tree of
        Empty -> Nothing
        Node value left right ->
            if value == target then
                Just tree
            else
                case obtenerSubarbol target left of
                    Just sub -> Just sub
                    Nothing -> obtenerSubarbol target right

buscarEnSubarbol : comparable -> comparable -> Tree comparable -> Maybe comparable
buscarEnSubarbol valor1 valor2 arbol =
    obtenerSubarbol valor1 arbol
        |> Maybe.andThen (\sub ->
            if contiene valor2 sub then
                Just valor2
            else
                Nothing
        )


-- =================================================================
-- 19-22. Validaciones con Result
-- =================================================================

validarNoVacio : Tree a -> Result String (Tree a)
validarNoVacio tree =
    case tree of
        Empty -> Err "El árbol está vacío"
        node -> Ok node

obtenerRaiz : Tree a -> Result String a
obtenerRaiz tree =
    case tree of
        Empty -> Err "No se puede obtener la raíz de un árbol vacío"
        Node value _ _ -> Ok value

dividir : Tree a -> Result String (a, Tree a, Tree a)
dividir tree =
    case tree of
        Empty -> Err "No se puede dividir un árbol vacío"
        Node value left right -> Ok (value, left, right)

obtenerMinimo : Tree Int -> Result String Int
obtenerMinimo tree =
    case minimoMaybe tree of
        Just val -> Ok val
        Nothing -> Err "No hay mínimo en un árbol vacío"


-- =================================================================
-- 23-26. BST (solo con Int para simplicidad)
-- =================================================================

esBST : Tree Int -> Bool
esBST tree =
    case Result.toMaybe (validarBST tree) of
        Just _ -> True
        Nothing -> False

insertarBST : Int -> Tree Int -> Result String (Tree Int)
insertarBST valor tree =
    case tree of
        Empty -> Ok (Node valor Empty Empty)
        Node root left right ->
            if valor == root then
                Err ("El valor " ++ String.fromInt valor ++ " ya existe en el árbol")
            else if valor < root then
                Result.map (\nuevoIzq -> Node root nuevoIzq right) (insertarBST valor left)
            else
                Result.map (\nuevoDer -> Node root left nuevoDer) (insertarBST valor right)

buscarEnBST : Int -> Tree Int -> Result String Int
buscarEnBST target tree =
    case tree of
        Empty -> Err ("El valor " ++ String.fromInt target ++ " no se encuentra en el árbol")
        Node value left right ->
            if value == target then Ok value
            else if target < value then buscarEnBST target left
            else buscarEnBST target right

validarBST : Tree Int -> Result String (Tree Int)
validarBST tree =
    let
        check minBound maxBound t =
            case t of
                Empty -> Ok Empty
                Node value left right ->
                    if (Maybe.withDefault True (Maybe.map (\m -> value > m) minBound)) &&
                       (Maybe.withDefault True (Maybe.map (\m -> value < m) maxBound)) then
                        Result.andThen (\l -> Result.map (\r -> Node value l r) (check (Just value) maxBound right)) (check minBound (Just value) left)
                    else
                        Err ("Nodo con valor " ++ String.fromInt value ++ " viola la propiedad BST")
    in
    check Nothing Nothing tree


-- =================================================================
-- 27-28. Conversiones
-- =================================================================

maybeAResult : String -> Maybe a -> Result String a
maybeAResult msg maybe =
    case maybe of
        Just val -> Ok val
        Nothing -> Err msg

resultAMaybe : Result error value -> Maybe value
resultAMaybe result =
    case result of
        Ok val -> Just val
        Err _ -> Nothing


-- =================================================================
-- 29-31. Pipelines
-- =================================================================

buscarPositivo : Int -> Tree Int -> Result String Int
buscarPositivo valor tree =
    buscarEnBST valor tree
        |> Result.andThen (\v ->
            if v > 0 then Ok v
            else Err ("El valor " ++ String.fromInt v ++ " no es positivo")
           )

validarArbol : Tree Int -> Result String (Tree Int)
validarArbol tree =
    validarNoVacio tree
        |> Result.andThen (\t ->
            if esBST t then
                if List.all ((>) 0) (inorder t) then
                    Ok t
                else
                    Err "Hay valores no positivos"
            else
                Err "El árbol no es un BST válido"
           )

buscarEnDosArboles : Int -> Tree Int -> Tree Int -> Result String Int
buscarEnDosArboles valor arbol1 arbol2 =
    buscarEnBST valor arbol1
        |> Result.andThen (\v -> buscarEnBST v arbol2)


-- =================================================================
-- 32-37. Recorridos y Transformaciones
-- =================================================================

inorder : Tree a -> List a
inorder tree =
    case tree of
        Empty -> []
        Node value left right -> inorder left ++ [value] ++ inorder right

preorder : Tree a -> List a
preorder tree =
    case tree of
        Empty -> []
        Node value left right -> [value] ++ preorder left ++ preorder right

postorder : Tree a -> List a
postorder tree =
    case tree of
        Empty -> []
        Node value left right -> postorder left ++ postorder right ++ [value]

mapArbol : (a -> b) -> Tree a -> Tree b
mapArbol f tree =
    case tree of
        Empty -> Empty
        Node value left right -> Node (f value) (mapArbol f left) (mapArbol f right)

filterArbol : (a -> Bool) -> Tree a -> Tree a
filterArbol pred tree =
    case tree of
        Empty -> Empty
        Node value left right ->
            let
                filteredLeft = filterArbol pred left
                filteredRight = filterArbol pred right
            in
            if pred value then
                Node value filteredLeft filteredRight
            else
                case (filteredLeft, filteredRight) of
                    (Empty, Empty) -> Empty
                    (Empty, r) -> r
                    (l, Empty) -> l
                    (l, r) -> Node value l r

foldArbol : (a -> b -> b) -> b -> Tree a -> b
foldArbol f acc tree =
    case tree of
        Empty -> acc
        Node value left right ->
            let
                accLeft = foldArbol f acc left
                accValue = f value accLeft
            in
            foldArbol f accValue right


-- =================================================================
-- 38-41. BST Avanzado (solo Int)
-- =================================================================

eliminarBST : Int -> Tree Int -> Result String (Tree Int)
eliminarBST target tree =
    case tree of
        Empty -> Err ("El valor " ++ String.fromInt target ++ " no existe en el árbol")
        Node value left right ->
            if target < value then
                Result.map (\l -> Node value l right) (eliminarBST target left)
            else if target > value then
                Result.map (\r -> Node value left r) (eliminarBST target right)
            else
                case (left, right) of
                    (Empty, Empty) -> Ok Empty
                    (Empty, r) -> Ok r
                    (l, Empty) -> Ok l
                    (l, r) ->
                        case minimoMaybe r of
                            Just minRight -> Result.map (\newR -> Node minRight l newR) (eliminarBST minRight r)
                            Nothing -> Err "Error interno al eliminar"

desdeListaBST : List Int -> Result String (Tree Int)
desdeListaBST list =
    List.foldl (\val acc ->
        acc |> Result.andThen (insertarBST val)
    ) (Ok Empty) list

estaBalanceado : Tree a -> Bool
estaBalanceado tree =
    let
        altura t =
            case t of
                Empty -> 0
                Node _ left right -> 1 + max (altura left) (altura right)
        diff t =
            case t of
                Empty -> 0
                Node _ left right -> abs (altura left - altura right)
    in
    case tree of
        Empty -> True
        Node _ left right -> (diff tree <= 1) && estaBalanceado left && estaBalanceado right

balancear : Tree Int -> Tree Int
balancear tree =
    let
        sorted = inorder tree
        build low high =
            if low > high then Empty
            else
                let
                    mid = (low + high) // 2
                    value = List.drop low sorted |> List.head |> Maybe.withDefault 0
                in
                Node value
                    (build low (mid - 1))
                    (build (mid + 1) high)
    in
    build 0 (List.length sorted - 1)


-- =================================================================
-- 42-44. Path Finding
-- =================================================================

type Direccion = Izquierda | Derecha

encontrarCamino : Int -> Tree Int -> Result String (List Direccion)
encontrarCamino target tree =
    let
        go path t =
            case t of
                Empty -> Err ("El valor " ++ String.fromInt target ++ " no existe en el árbol")
                Node value left right ->
                    if value == target then
                        Ok (List.reverse path)
                    else
                        go (Izquierda :: path) left
                            |> orElse (go (Derecha :: path) right)
    in
    go [] tree

seguirCamino : List Direccion -> Tree a -> Result String a
seguirCamino path tree =
    case path of
        [] ->
            case tree of
                Node value _ _ -> Ok value
                Empty -> Err "Camino inválido: árbol vacío"
        Izquierda :: rest ->
            case tree of
                Node _ left _ -> seguirCamino rest left
                Empty -> Err "Camino inválido: no hay hijo izquierdo"
        Derecha :: rest ->
            case tree of
                Node _ _ right -> seguirCamino rest right
                Empty -> Err "Camino inválido: no hay hijo derecho"

ancestroComun : Int -> Int -> Tree Int -> Result String Int
ancestroComun v1 v2 tree =
    case (encontrarCamino v1 tree, encontrarCamino v2 tree) of
        (Ok p1, Ok p2) ->
            let
                indexedP1 = List.indexedMap Tuple.pair p1
                commonLength =
                    indexedP1
                        |> takeWhile (\(i, dir) -> List.drop i p2 |> List.head |> (==) (Just dir))
                        |> List.length
            in
            seguirCamino (List.take commonLength p1) tree

        _ ->
            Err "Uno o ambos valores no existen"


-- =================================================================
-- 45. Módulo Completo
-- =================================================================

esBSTValido = esBST

buscar : Int -> Tree Int -> Maybe Int
buscar target tree = if contiene target tree then Just target else Nothing

encontrarMinimo = minimoMaybe
encontrarMaximo = maximoMaybe

insertar = insertarBST
eliminar = eliminarBST
validar = validarBST
obtenerEnPosicion : Int -> Tree Int -> Result String Int
obtenerEnPosicion n tree =
    inorder tree
        |> List.drop n
        |> List.head
        |> maybeAResult ("Índice " ++ String.fromInt n ++ " fuera de rango")

map = mapArbol
filter = filterArbol
fold = foldArbol

aLista = inorder

desdeListaBalanceada : List Int -> Tree Int
desdeListaBalanceada list =
    let
        sorted = List.sort list
        build low high =
            if low > high then Empty
            else
                let
                    mid = (low + high) // 2
                    value = List.drop low sorted |> List.head |> Maybe.withDefault 0
                in
                Node value
                    (build low (mid - 1))
                    (build (mid + 1) high)
    in
    build 0 (List.length sorted - 1)


-- =================================================================
-- VISTA
-- =================================================================

type alias Model = Tree Int
type Msg = NoOp

initialModel : Model
initialModel = arbolMediano

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model = ( model, Cmd.none )

display : String -> String -> Html msg
display label value =
    Html.div [ Html.Attributes.style "margin" "5px 0" ]
        [ Html.strong [] [ Html.text label ]
        , Html.text (": " ++ value)
        ]

view : Model -> Html Msg
view model =
    Html.div [ Html.Attributes.style "padding" "20px" ]
        [ Html.h1 [] [ Html.text "Guía Completa de Árboles Binarios en Elm" ]
        , Html.h2 [] [ Html.text "Árbol de Prueba: arbolMediano" ]
        , display "Inorder" (Debug.toString (inorder model))
        , display "Preorder" (Debug.toString (preorder model))
        , display "Postorder" (Debug.toString (postorder model))
        , display "Es BST" (Debug.toString (esBST model))
        , display "Está balanceado" (Debug.toString (estaBalanceado model))
        , display "Mínimo" (Debug.toString (obtenerMinimo model))
        , display "Camino a 7" (Debug.toString (encontrarCamino 7 model))
        , display "Ancestro común (3,7)" (Debug.toString (ancestroComun 3 7 model))
        , display "Validar árbol" (Debug.toString (validarArbol model))
        ]

main : Program () Model Msg
main =
    Browser.element
        { init = \_ -> (initialModel, Cmd.none)
        , update = update
        , view = view
        , subscriptions = \_ -> Sub.none
        }