module Clase4 exposing (..)

import List

{-| Ejercicios de Programación Funcional - Clase 4
-}

-- ============================================================================
-- DEFINICIÓN DEL ÁRBOL BINARIO
-- ============================================================================

type Tree a
    = Empty
    | Node a (Tree a) (Tree a)


-- ============================================================================
-- HELPER FUNCTIONS (Agregadas para que compile)
-- ============================================================================

-- Simulación de Maybe.orElse (devuelve el segundo si el primero es Nothing)
orElse : Maybe a -> Maybe a -> Maybe a
orElse segundo primero =
    case primero of
        Just _ -> primero
        Nothing -> segundo

-- Simulación de List.splitAt
splitAt : Int -> List a -> (List a, List a)
splitAt n list =
    (List.take n list, List.drop n list)


-- ============================================================================
-- PARTE 0: CONSTRUCCIÓN DE ÁRBOLES
-- ============================================================================

arbolVacio : Tree Int
arbolVacio = Empty

arbolHoja : Tree Int
arbolHoja = Node 5 Empty Empty

arbolPequeno : Tree Int
arbolPequeno = Node 3 (Node 1 Empty Empty) (Node 5 Empty Empty)

arbolMediano : Tree Int
arbolMediano =
    Node 10
        (Node 5 (Node 3 Empty Empty) (Node 7 Empty Empty))
        (Node 15 (Node 12 Empty Empty) (Node 20 Empty Empty))

esVacio : Tree a -> Bool
esVacio arbol =
    case arbol of
        Empty -> True
        Node _ _ _ -> False

esHoja : Tree a -> Bool
esHoja arbol =
    case arbol of
        Node _ Empty Empty -> True
        _ -> False


-- ============================================================================
-- PARTE 1: PATTERN MATCHING CON ÁRBOLES (Lógica Corregida)
-- ============================================================================

tamano : Tree a -> Int
tamano arbol =
    case arbol of
        Empty -> 0
        Node _ izq der -> 1 + tamano izq + tamano der

altura : Tree a -> Int
altura arbol =
    case arbol of
        Empty -> 0
        Node _ izq der -> 1 + max (altura izq) (altura der)

sumarArbol : Tree Int -> Int
sumarArbol arbol =
    case arbol of
        Empty -> 0
        Node valor izq der -> valor + sumarArbol izq + sumarArbol der

contiene : comparable -> Tree comparable -> Bool
contiene valor arbol =
    case arbol of
        Empty -> False
        Node v izq der -> v == valor || contiene valor izq || contiene valor der

contarHojas : Tree a -> Int
contarHojas arbol =
    case arbol of
        Empty -> 0
        Node _ Empty Empty -> 1
        Node _ izq der -> contarHojas izq + contarHojas der

-- CORREGIDO: Ahora ignora las ramas vacías para no devolver 0 incorrectamente
minimo : Tree Int -> Int
minimo arbol =
    case arbol of
        Empty -> 0 -- Valor por defecto si el árbol principal es vacío
        Node v Empty Empty -> v
        Node v izq Empty -> min v (minimo izq)
        Node v Empty der -> min v (minimo der)
        Node v izq der -> min v (min (minimo izq) (minimo der))

-- CORREGIDO: Misma lógica para máximo
maximo : Tree Int -> Int
maximo arbol =
    case arbol of
        Empty -> 0
        Node v Empty Empty -> v
        Node v izq Empty -> max v (maximo izq)
        Node v Empty der -> max v (maximo der)
        Node v izq der -> max v (max (maximo izq) (maximo der))


-- ============================================================================
-- PARTE 2: INTRODUCCIÓN A MAYBE (Usando helper orElse)
-- ============================================================================

buscar : comparable -> Tree comparable -> Maybe comparable
buscar valor arbol =
    case arbol of
        Empty -> Nothing
        Node v izq der ->
            if v == valor then
                Just v
            else
                buscar valor izq
                    |> orElse (buscar valor der)

encontrarMinimo : Tree comparable -> Maybe comparable
encontrarMinimo arbol =
    case arbol of
        Empty -> Nothing
        Node v Empty Empty -> Just v
        Node v izq der ->
            List.filterMap identity [ encontrarMinimo izq, Just v, encontrarMinimo der ]
                |> List.minimum

encontrarMaximo : Tree comparable -> Maybe comparable
encontrarMaximo arbol =
    case arbol of
        Empty -> Nothing
        Node v izq der ->
            List.filterMap identity [ encontrarMaximo izq, Just v, encontrarMaximo der ]
                |> List.maximum

buscarPor : (a -> Bool) -> Tree a -> Maybe a
buscarPor predicado arbol =
    case arbol of
        Empty -> Nothing
        Node v izq der ->
            if predicado v then
                Just v
            else
                buscarPor predicado izq
                    |> orElse (buscarPor predicado der)

raiz : Tree a -> Maybe a
raiz arbol =
    case arbol of
        Empty -> Nothing
        Node v _ _ -> Just v

hijoIzquierdo : Tree a -> Maybe (Tree a)
hijoIzquierdo arbol =
    case arbol of
        Empty -> Nothing
        Node _ izq _ -> Just izq

hijoDerecho : Tree a -> Maybe (Tree a)
hijoDerecho arbol =
    case arbol of
        Empty -> Nothing
        Node _ _ der -> Just der

nietoIzquierdoIzquierdo : Tree a -> Maybe (Tree a)
nietoIzquierdoIzquierdo arbol =
    hijoIzquierdo arbol |> Maybe.andThen hijoIzquierdo

obtenerSubarbol : comparable -> Tree comparable -> Maybe (Tree comparable)
obtenerSubarbol valor arbol =
    case arbol of
        Empty -> Nothing
        Node v izq der ->
            if v == valor then
                Just arbol
            else
                obtenerSubarbol valor izq
                    |> orElse (obtenerSubarbol valor der)

buscarEnSubarbol : comparable -> comparable -> Tree comparable -> Maybe comparable
buscarEnSubarbol valor1 valor2 arbol =
    obtenerSubarbol valor1 arbol
        |> Maybe.andThen (buscar valor2)


-- ============================================================================
-- PARTE 3: RESULT PARA VALIDACIONES
-- ============================================================================

validarNoVacio : Tree a -> Result String (Tree a)
validarNoVacio arbol =
    case arbol of
        Empty -> Err "El árbol está vacío"
        _ -> Ok arbol

obtenerRaiz : Tree a -> Result String a
obtenerRaiz arbol =
    case arbol of
        Empty -> Err "No se puede obtener la raíz de un árbol vacío"
        Node v _ _ -> Ok v

dividir : Tree a -> Result String ( a, Tree a, Tree a )
dividir arbol =
    case arbol of
        Empty -> Err "No se puede dividir un árbol vacío"
        Node v izq der -> Ok ( v, izq, der )

obtenerMinimo : Tree comparable -> Result String comparable
obtenerMinimo arbol =
    case encontrarMinimo arbol of
        Nothing -> Err "No hay mínimo en un árbol vacío"
        Just v -> Ok v


-- ============================================================================
-- PARTE 4: COMBINANDO MAYBE Y RESULT
-- ============================================================================

maybeAResult : String -> Maybe a -> Result String a
maybeAResult mensaje maybe =
    case maybe of
        Nothing -> Err mensaje
        Just v -> Ok v

resultAMaybe : Result error value -> Maybe value
resultAMaybe resultado =
    case resultado of
        Ok v -> Just v
        Err _ -> Nothing

buscarPositivo : Int -> Tree Int -> Result String Int
buscarPositivo valor arbol =
    case buscar valor arbol of
        Nothing -> Err "El valor no se encuentra en el árbol"
        Just v ->
            if v > 0 then Ok v else Err "El valor no es positivo"

validarArbol : Tree Int -> Result String (Tree Int)
validarArbol arbol =
    validarNoVacio arbol
        |> Result.andThen
            (\a ->
                if tamano a > 0 then Ok a else Err "El árbol no tiene nodos"
            )

buscarEnDosArboles : Int -> Tree Int -> Tree Int -> Result String Int
buscarEnDosArboles valor arbol1 arbol2 =
    case buscar valor arbol1 of
        Just v -> Ok v
        Nothing ->
            case buscar valor arbol2 of
                Just v2 -> Ok v2
                Nothing -> Err "Búsqueda fallida"


-- ============================================================================
-- PARTE 5: RECORRIDOS Y FUNCIONES FUNCIONALES
-- ============================================================================

inorder : Tree a -> List a
inorder arbol =
    case arbol of
        Empty -> []
        Node v izq der -> inorder izq ++ [ v ] ++ inorder der

preorder : Tree a -> List a
preorder arbol =
    case arbol of
        Empty -> []
        Node v izq der -> [ v ] ++ preorder izq ++ preorder der

postorder : Tree a -> List a
postorder arbol =
    case arbol of
        Empty -> []
        Node v izq der -> postorder izq ++ postorder der ++ [ v ]

mapArbol : (a -> b) -> Tree a -> Tree b
mapArbol f arbol =
    case arbol of
        Empty -> Empty
        Node v izq der -> Node (f v) (mapArbol f izq) (mapArbol f der)

filterArbol : (a -> Bool) -> Tree a -> Tree a
filterArbol pred arbol =
    case arbol of
        Empty -> Empty
        Node v izq der ->
            let
                izqF = filterArbol pred izq
                derF = filterArbol pred der
            in
            if pred v then
                Node v izqF derF
            else
                -- Si el nodo actual se borra, necesitamos decidir qué hacer.
                -- En esta implementación simplificada, si borramos el nodo,
                -- perdemos sus hijos si no están conectados.
                -- Para mantener hijos, se requeriría re-insertarlos, lo cual es complejo en un árbol genérico.
                case (izqF, derF) of
                    (Empty, Empty) -> Empty
                    _ -> Node v izqF derF -- Mantenemos el nodo si tiene hijos válidos (decisión de diseño)

foldArbol : (a -> b -> b) -> b -> Tree a -> b
foldArbol f acc arbol =
    case arbol of
        Empty -> acc
        Node v izq der -> foldArbol f (f v (foldArbol f acc der)) izq


-- ============================================================================
-- PARTE 6: DESAFÍO FINAL - SISTEMA COMPLETO DE BST
-- ============================================================================

type Direccion = Izquierda | Derecha

esBST : Tree comparable -> Bool
esBST arbol =
    let lista = inorder arbol in
    lista == List.sort lista

insertarBST : comparable -> Tree comparable -> Result String (Tree comparable)
insertarBST valor arbol =
    case arbol of
        Empty -> Ok (Node valor Empty Empty)
        Node v izq der ->
            if valor == v then Err "El valor ya existe en el árbol"
            else if valor < v then insertarBST valor izq |> Result.map (\i -> Node v i der)
            else insertarBST valor der |> Result.map (\d -> Node v izq d)

buscarEnBST : comparable -> Tree comparable -> Result String comparable
buscarEnBST valor arbol =
    case arbol of
        Empty -> Err "El valor no se encuentra en el árbol"
        Node v izq der ->
            if valor == v then Ok v
            else if valor < v then buscarEnBST valor izq
            else buscarEnBST valor der

eliminarBST : comparable -> Tree comparable -> Result String (Tree comparable)
eliminarBST valor arbol =
    case arbol of
        Empty -> Err "El valor no existe en el árbol"
        Node v izq der ->
            if valor < v then eliminarBST valor izq |> Result.map (\i -> Node v i der)
            else if valor > v then eliminarBST valor der |> Result.map (\d -> Node v izq d)
            else
                case (izq, der) of
                    (Empty, Empty) -> Ok Empty
                    (Empty, _) -> Ok der
                    (_, Empty) -> Ok izq
                    _ ->
                        case encontrarMinimo der of
                            Just minVal ->
                                eliminarBST minVal der
                                    |> Result.map (\nuevoDer -> Node minVal izq nuevoDer)
                            Nothing -> Err "Error al eliminar"

desdeListaBST : List comparable -> Result String (Tree comparable)
desdeListaBST lista =
    List.foldl
        (\x acc -> case acc of
            Err e -> Err e
            Ok a -> insertarBST x a
        )
        (Ok Empty)
        lista

estaBalanceado : Tree a -> Bool
estaBalanceado arbol =
    case arbol of
        Empty -> True
        Node _ izq der ->
            abs (altura izq - altura der) <= 1 && estaBalanceado izq && estaBalanceado der

-- CORREGIDO: Usa la función auxiliar splitAt
balancear : Tree comparable -> Tree comparable
balancear arbol =
    let
        lista = inorder arbol
        construir xs =
            case xs of
                [] -> Empty
                _ ->
                    let
                        mitad = List.length xs // 2
                        (izq, resto) = splitAt mitad xs
                    in
                    case resto of
                        (v :: der) -> Node v (construir izq) (construir der)
                        [] -> Empty -- No debería ocurrir si length > 0
    in
    construir lista

encontrarCamino : comparable -> Tree comparable -> Result String (List Direccion)
encontrarCamino valor arbol =
    case arbol of
        Empty -> Err "El valor no existe en el árbol"
        Node v izq der ->
            if valor == v then Ok []
            else
                case encontrarCamino valor izq of
                    Ok camino -> Ok (Izquierda :: camino)
                    Err _ ->
                        case encontrarCamino valor der of
                            Ok camino -> Ok (Derecha :: camino)
                            Err _ -> Err "El valor no existe en el árbol"

seguirCamino : List Direccion -> Tree a -> Result String a
seguirCamino camino arbol =
    case (camino, arbol) of
        ([], Node v _ _) -> Ok v
        (Izquierda :: resto, Node _ izq _) -> seguirCamino resto izq
        (Derecha :: resto, Node _ _ der) -> seguirCamino resto der
        _ -> Err "Camino inválido"

ancestroComun : comparable -> comparable -> Tree comparable -> Result String comparable
ancestroComun val1 val2 arbol =
    case arbol of
        Empty -> Err "Uno o ambos valores no existen en el árbol"
        Node v izq der ->
            if val1 < v && val2 < v then ancestroComun val1 val2 izq
            else if val1 > v && val2 > v then ancestroComun val1 val2 der
            else Ok v