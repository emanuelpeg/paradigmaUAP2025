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

-- 6. Suma de Valores


sumarArbol : Tree Int -> Int
sumarArbol arbol =
    case arbol of
        Empty ->
            0
        Node valor izq der ->
            valor + sumarArbol izq + sumarArbol der



-- 7. Contiene Valor


contiene : a -> Tree a -> Bool
contiene valor arbol =
    case arbol of
        Empty ->
            False
        Node v izq der ->
            v == valor || contiene valor izq || contiene valor der



-- 8. Contar Hojas


contarHojas : Tree a -> Int
contarHojas arbol =
    case arbol of
        Empty ->
            0
        Node _ Empty Empty ->
            1
        Node _ izq der ->
            contarHojas izq + contarHojas der



-- 9. Valor Mínimo (sin Maybe)


minimo : Tree Int -> Int
minimo arbol =
    case arbol of
        Empty ->
            0
        Node v Empty _ ->
            v
        Node v izq _ ->
            let m = minimo izq in
            if m == 0 then
                v
            else
                Basics.min v m



-- 10. Valor Máximo (sin Maybe)


maximo : Tree Int -> Int
maximo arbol =
    case arbol of
        Empty ->
            0
        Node v _ Empty ->
            v
        Node v _ der ->
            let m = maximo der in
            if m == 0 then
                v
            else
                Basics.max v m



-- ============================================================================
-- PARTE 2: INTRODUCCIÓN A MAYBE
-- ============================================================================
-- 11. Buscar Valor


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
                    Just found ->
                        Just found
                    Nothing ->
                        buscar valor der



-- 12. Encontrar Mínimo (con Maybe)


encontrarMinimo : Tree comparable -> Maybe comparable
encontrarMinimo arbol =
    case arbol of
        Empty ->
            Nothing
        Node v Empty _ ->
            Just v
        Node _ izq _ ->
            encontrarMinimo izq



-- 13. Encontrar Máximo (con Maybe)


encontrarMaximo : Tree comparable -> Maybe comparable
encontrarMaximo arbol =
    case arbol of
        Empty ->
            Nothing
        Node v _ Empty ->
            Just v
        Node _ _ der ->
            encontrarMaximo der



-- 14. Buscar Por Predicado


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
                    Just found ->
                        Just found
                    Nothing ->
                        buscarPor predicado der



-- 15. Obtener Valor de Raíz


raiz : Tree a -> Maybe a
raiz arbol =
    case arbol of
        Empty ->
            Nothing
        Node v _ _ ->
            Just v



-- 16. Obtener Hijo Izquierdo


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



-- 17. Obtener Nieto


nietoIzquierdoIzquierdo : Tree a -> Maybe (Tree a)
nietoIzquierdoIzquierdo arbol =
    hijoIzquierdo arbol |> Maybe.andThen hijoIzquierdo



-- 18. Buscar en Profundidad


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
                    Just found ->
                        Just found
                    Nothing ->
                        obtenerSubarbol valor der


buscarEnSubarbol : a -> a -> Tree a -> Maybe a
buscarEnSubarbol valor1 valor2 arbol =
    case obtenerSubarbol valor1 arbol of
        Nothing ->
            Nothing
        Just sub ->
            buscar valor2 sub



-- ============================================================================
-- PARTE 3: RESULT PARA VALIDACIONES
-- ============================================================================
-- 19. Validar No Vacío


validarNoVacio : Tree a -> Result String (Tree a)
validarNoVacio arbol =
    case arbol of
        Empty ->
            Err "El árbol está vacío"
        _ ->
            Ok arbol



-- 20. Obtener Raíz con Error


obtenerRaiz : Tree a -> Result String a
obtenerRaiz arbol =
    case arbol of
        Empty ->
            Err "No se puede obtener la raíz de un árbol vacío"
        Node v _ _ ->
            Ok v



-- 21. Dividir en Valor Raíz y Subárboles


dividir : Tree a -> Result String ( a, Tree a, Tree a )
dividir arbol =
    case arbol of
        Empty ->
            Err "No se puede dividir un árbol vacío"
        Node v izq der ->
            Ok ( v, izq, der )



-- 22. Obtener Mínimo con Error


obtenerMinimo : Tree comparable -> Result String comparable
obtenerMinimo arbol =
    case encontrarMinimo arbol of
        Nothing ->
            Err "No hay mínimo en un árbol vacío"
        Just m ->
            Ok m



-- 23. Verificar si es BST


esBST : Tree comparable -> Bool
esBST arbol =
    let
        verificar : Maybe comparable -> Maybe comparable -> Tree comparable -> Bool
        verificar minOk maxOk tree =
            case tree of
                Empty ->
                    True
                Node v izq der ->
                    let
                        mayorQueMin =
                            case minOk of
                                Nothing -> True
                                Just m -> v > m

                        menorQueMax =
                            case maxOk of
                                Nothing -> True
                                Just m -> v < m
                    in
                    mayorQueMin && menorQueMax && verificar minOk (Just v) izq && verificar (Just v) maxOk der
    in
    verificar Nothing Nothing arbol



-- 24. Insertar en BST


insertarBST : comparable -> Tree comparable -> Result String (Tree comparable)
insertarBST valor arbol =
    case arbol of
        Empty ->
            Ok (Node valor Empty Empty)
        Node v izq der ->
            if valor == v then
                Err ("El valor " ++ (toString valor) ++ " ya existe en el árbol")
            else if valor < v then
                case insertarBST valor izq of
                    Ok nuevoIzq -> Ok (Node v nuevoIzq der)
                    Err e -> Err e
            else
                case insertarBST valor der of
                    Ok nuevoDer -> Ok (Node v izq nuevoDer)
                    Err e -> Err e



-- 25. Buscar en BST


buscarEnBST : comparable -> Tree comparable -> Result String comparable
buscarEnBST valor arbol =
    case arbol of
        Empty ->
            Err ("El valor " ++ (toString valor) ++ " no se encuentra en el árbol")
        Node v izq der ->
            if valor == v then
                Ok v
            else if valor < v then
                buscarEnBST valor izq
            else
                buscarEnBST valor der



-- 26. Validar BST con Result


validarBST : Tree comparable -> Result String (Tree comparable)
validarBST arbol =
    if esBST arbol then
        Ok arbol
    else
        Err "El árbol no es un BST válido"



-- ============================================================================
-- PARTE 4: COMBINANDO MAYBE Y RESULT
-- ============================================================================
-- 27. Maybe a Result


maybeAResult : String -> Maybe a -> Result String a
maybeAResult mensajeError maybe =
    case maybe of
        Nothing ->
            Err mensajeError
        Just v ->
            Ok v



-- 28. Result a Maybe


resultAMaybe : Result error value -> Maybe value
resultAMaybe result =
    case result of
        Ok v ->
            Just v
        Err _ ->
            Nothing



-- 29. Buscar y Validar


buscarPositivo : Int -> Tree Int -> Result String Int
buscarPositivo valor arbol =
    case buscar valor arbol of
        Nothing ->
            Err "El valor " ++ (toString valor) ++ " no se encuentra en el árbol"
        Just v ->
            if v > 0 then
                Ok v
            else
                Err ("El valor " ++ (toString v) ++ " no es positivo")



-- 30. Pipeline de Validaciones


validarArbol : Tree Int -> Result String (Tree Int)
validarArbol arbol =
    validarNoVacio arbol
        |> Result.andThen validarBST
        |> Result.andThen (\tree ->
            let
                todosPositivos = List.all (\x -> x > 0) (inorder tree)
            in
            if todosPositivos then
                Ok tree
            else
                Err "Hay valores no positivos en el árbol"
        )



-- 31. Encadenar Búsquedas


buscarEnDosArboles : Int -> Tree Int -> Tree Int -> Result String Int
buscarEnDosArboles valor arbol1 arbol2 =
    buscarEnBST valor arbol1
        |> Result.andThen (\v -> buscarEnBST v arbol2)



-- ============================================================================
-- PARTE 5: DESAFÍOS AVANZADOS
-- ============================================================================
-- 32. Recorrido Inorder


inorder : Tree a -> List a
inorder arbol =
    case arbol of
        Empty ->
            []
        Node v izq der ->
            inorder izq ++ [ v ] ++ inorder der



-- 33. Recorrido Preorder


preorder : Tree a -> List a
preorder arbol =
    case arbol of
        Empty ->
            []
        Node v izq der ->
            [ v ] ++ preorder izq ++ preorder der



-- 34. Recorrido Postorder


postorder : Tree a -> List a
postorder arbol =
    case arbol of
        Empty ->
            []
        Node v izq der ->
            postorder izq ++ postorder der ++ [ v ]



-- 35. Map sobre Árbol


mapArbol : (a -> b) -> Tree a -> Tree b
mapArbol funcion arbol =
    case arbol of
        Empty ->
            Empty
        Node v izq der ->
            Node (funcion v) (mapArbol funcion izq) (mapArbol funcion der)



-- 36. Filter sobre Árbol


filterArbol : (a -> Bool) -> Tree a -> Tree a
filterArbol predicado arbol =
    case arbol of
        Empty ->
            Empty
        Node v izq der ->
            let l = filterArbol predicado izq
                r = filterArbol predicado der
            in
            if predicado v then
                Node v l r
            else
                case (l, r) of
                    (Empty, Empty) -> Empty
                    (lOnly, Empty) -> lOnly
                    (Empty, rOnly) -> rOnly
                    (lOnly, rOnly) ->
                        -- attach rOnly as rightmost of lOnly
                        let
                            attachRightmost tree sub =
                                case tree of
                                    Empty -> sub
                                    Node x a b -> Node x a (attachRightmost b sub)
                        in
                        attachRightmost lOnly rOnly



-- 37. Fold sobre Árbol


foldArbol : (a -> b -> b) -> b -> Tree a -> b
foldArbol funcion acumulador arbol =
    List.foldl funcion acumulador (inorder arbol)



-- 38. Eliminar de BST


eliminarBST : comparable -> Tree comparable -> Result String (Tree comparable)
eliminarBST valor arbol =
    let
        eliminar tree =
            case tree of
                Empty -> Err "El valor no existe en el árbol"
                Node v izq der ->
                    if valor < v then
                        eliminar izq |> Result.map (\nuevoIzq -> Node v nuevoIzq der)
                    else if valor > v then
                        eliminar der |> Result.map (\nuevoDer -> Node v izq nuevoDer)
                    else
                        -- encontrado
                        case (izq, der) of
                            (Empty, Empty) -> Ok Empty
                            (Empty, d) -> Ok d
                            (i, Empty) -> Ok i
                            (i, d) ->
                                case encontrarMinimo d of
                                    Nothing -> Err "Error inesperado"
                                    Just succ ->
                                        eliminar succ d |> Result.map (\nuevoDer -> Node succ i nuevoDer)
    in
    eliminar arbol



-- 39. Construir BST desde Lista


desdeListaBST : List comparable -> Result String (Tree comparable)
desdeListaBST lista =
    List.foldl
        (
            x acc ->
                case acc of
                    Err e -> Err e
                    Ok tree -> insertarBST x tree
        )
        (Ok Empty)
        lista



-- 40. Verificar Balance


estaBalanceado : Tree a -> Bool
estaBalanceado arbol =
    let
        alturaYBalance tree =
            case tree of
                Empty -> ( True, 0 )
                Node _ l r ->
                    let (balL, hL) = alturaYBalance l
                        (balR, hR) = alturaYBalance r
                        bal = balL && balR && (abs (hL - hR) <= 1)
                    in (bal, 1 + max hL hR)
    in
    Tuple.first (alturaYBalance arbol)



-- 41. Balancear BST


balancear : Tree comparable -> Tree comparable
balancear arbol =
    let lista = inorder arbol

        construir l =
            case l of
                [] -> Empty
                xs ->
                    let n = List.length xs
                        m = n // 2
                        left = List.take m xs
                        rest = List.drop m xs
                        root = List.head rest |> Maybe.withDefault (List.head xs |> Maybe.withDefault 0)
                        right = List.drop 1 rest
                    in Node root (construir left) (construir right)
    in construir lista



-- 42. Camino a un Valor


type Direccion
    = Izquierda
    | Derecha


encontrarCamino : a -> Tree a -> Result String (List Direccion)
encontrarCamino valor arbol =
    let
        buscar tree camino =
            case tree of
                Empty -> Err "El valor no existe en el árbol"
                Node v l r ->
                    if v == valor then Ok (List.reverse camino)
                    else
                        case buscar l (Izquierda :: camino) of
                            Ok c -> Ok c
                            Err _ -> buscar r (Derecha :: camino)
    in buscar arbol []



-- 43. Seguir Camino


seguirCamino : List Direccion -> Tree a -> Result String a
seguirCamino camino arbol =
    case (camino, arbol) of
        ([], Empty) -> Err "Árbol vacío"
        ([], Node v _ _) -> Ok v
        (Izquierda :: rest, Node _ l _) -> seguirCamino rest l
        (Derecha :: rest, Node _ _ r) -> seguirCamino rest r
        _ -> Err "Camino inválido"



-- 44. Ancestro Común Más Cercano


ancestroComun : comparable -> comparable -> Tree comparable -> Result String comparable
ancestroComun valor1 valor2 arbol =
    let
        existe x = case buscarEnBST x arbol of Ok _ -> True; Err _ -> False
    in
    if not (existe valor1 && existe valor2) then
        Err "Uno o ambos valores no existen en el árbol"
    else
        let
            buscar node =
                case node of
                    Empty -> Err "Uno o ambos valores no existen en el árbol"
                    Node v l r ->
                        if valor1 < v && valor2 < v then buscar l
                        else if valor1 > v && valor2 > v then buscar r
                        else Ok v
        in buscar arbol



-- ============================================================================
-- PARTE 6: DESAFÍO FINAL - SISTEMA COMPLETO
-- ============================================================================
-- 45. Sistema Completo de BST
-- (Las funciones individuales ya están definidas arriba)
-- Operaciones que retornan Bool


esBSTValido : Tree comparable -> Bool
esBSTValido arbol =
    esBST arbol


estaBalanceadoCompleto : Tree comparable -> Bool
estaBalanceadoCompleto arbol =
    estaBalanceado arbol


contieneValor : comparable -> Tree comparable -> Bool
contieneValor valor arbol =
    contiene valor arbol



-- Operaciones que retornan Maybe


buscarMaybe : comparable -> Tree comparable -> Maybe comparable
buscarMaybe valor arbol =
    buscar valor arbol


encontrarMinimoMaybe : Tree comparable -> Maybe comparable
encontrarMinimoMaybe arbol =
    encontrarMinimo arbol


encontrarMaximoMaybe : Tree comparable -> Maybe comparable
encontrarMaximoMaybe arbol =
    encontrarMaximo arbol



-- Operaciones que retornan Result


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
    let lista = inorder arbol
    in if posicion < 0 || posicion >= List.length lista then
        Err "Posición inválida"
    else
        case List.head (List.drop posicion lista) of
            Nothing -> Err "Posición inválida"
            Just v -> Ok v



-- Operaciones de transformación


map : (a -> b) -> Tree a -> Tree b
map funcion arbol =
    mapArbol funcion arbol


filter : (a -> Bool) -> Tree a -> Tree a
filter predicado arbol =
    filterArbol predicado arbol


fold : (a -> b -> b) -> b -> Tree a -> b
fold funcion acumulador arbol =
    foldArbol funcion acumulador arbol



-- Conversiones


aLista : Tree a -> List a
aLista arbol =
    inorder arbol


desdeListaBalanceada : List comparable -> Tree comparable
desdeListaBalanceada lista =
    let
        construir l =
            case l of
                [] -> Empty
                xs ->
                    let n = List.length xs
                        m = n // 2
                        left = List.take m xs
                        rest = List.drop m xs
                        root = List.head rest |> Maybe.withDefault (List.head xs |> Maybe.withDefault 0)
                        right = List.drop 1 rest
                    in Node root (construir left) (construir right)
    in construir lista
