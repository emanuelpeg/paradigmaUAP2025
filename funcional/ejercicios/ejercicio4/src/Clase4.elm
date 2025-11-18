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

        Node _ l r ->
            1 + tamano l + tamano r



-- 5. Altura del Árbol


altura : Tree a -> Int
altura arbol =
    case arbol of
        Empty ->
            0

        Node _ l r ->
            1 + max (altura l) (altura r)



-- 6. Suma de Valores


sumarArbol : Tree Int -> Int
sumarArbol arbol =
    case arbol of
        Empty ->
            0

        Node v l r ->
            v + sumarArbol l + sumarArbol r



-- 7. Contiene Valor


contiene : comparable -> Tree comparable -> Bool
contiene valor arbol =
    case arbol of
        Empty ->
            False

        Node v l r ->
            if v == valor then
                True
            else
                contiene valor l || contiene valor r



-- 8. Contar Hojas


contarHojas : Tree a -> Int
contarHojas arbol =
    case arbol of
        Empty ->
            0

        Node _ Empty Empty ->
            1

        Node _ l r ->
            contarHojas l + contarHojas r



-- 9. Valor Mínimo (sin Maybe)


minimo : Tree Int -> Int
minimo arbol =
    case encontrarMinimo arbol of
        Just v ->
            v

        Nothing ->
            0



-- 10. Valor Máximo (sin Maybe)


maximo : Tree Int -> Int
maximo arbol =
    case encontrarMaximo arbol of
        Just v ->
            v

        Nothing ->
            0



-- ============================================================================
-- PARTE 2: INTRODUCCIÓN A MAYBE
-- ============================================================================
-- 11. Buscar Valor


buscar : comparable -> Tree comparable -> Maybe comparable
buscar valor arbol =
    case arbol of
        Empty ->
            Nothing

        Node v l r ->
            if v == valor then
                Just v
            else
                case buscar valor l of
                    Just x ->
                        Just x

                    Nothing ->
                        buscar valor r



-- 12. Encontrar Mínimo (con Maybe)


encontrarMinimo : Tree comparable -> Maybe comparable
encontrarMinimo arbol =
    case arbol of
        Empty ->
            Nothing

        Node v l r ->
            let
                leftMin = encontrarMinimo l
                rightMin = encontrarMinimo r
                choose a b =
                    case ( a, b ) of
                        ( Nothing, Nothing ) ->
                            Just v

                        ( Just x, Nothing ) ->
                            if x < v then
                                Just x
                            else
                                Just v

                        ( Nothing, Just y ) ->
                            if y < v then
                                Just y
                            else
                                Just v

                        ( Just x, Just y ) ->
                            Just (min x (min y v))
            in
            choose leftMin rightMin



-- 13. Encontrar Máximo (con Maybe)


encontrarMaximo : Tree comparable -> Maybe comparable
encontrarMaximo arbol =
    case arbol of
        Empty ->
            Nothing

        Node v l r ->
            let
                leftMax = encontrarMaximo l
                rightMax = encontrarMaximo r
                choose a b =
                    case ( a, b ) of
                        ( Nothing, Nothing ) ->
                            Just v

                        ( Just x, Nothing ) ->
                            if x > v then
                                Just x
                            else
                                Just v

                        ( Nothing, Just y ) ->
                            if y > v then
                                Just y
                            else
                                Just v

                        ( Just x, Just y ) ->
                            Just (max x (max y v))
            in
            choose leftMax rightMax



-- 14. Buscar Por Predicado


buscarPor : (a -> Bool) -> Tree a -> Maybe a
buscarPor predicado arbol =
    case arbol of
        Empty ->
            Nothing

        Node v l r ->
            if predicado v then
                Just v
            else
                case buscarPor predicado l of
                    Just x ->
                        Just x

                    Nothing ->
                        buscarPor predicado r



-- 15. Obtener Valor de Raíz


raiz : Tree a -> Maybe a
raiz arbol =
    case arbol of
        Empty ->
            Nothing

        Node v _ _ ->
            Just v



-- 16. Obtener Hijo Izquierdo


hijoDerecho : Tree a -> Maybe (Tree a)
hijoIzquierdo : Tree a -> Maybe (Tree a)
hijoIzquierdo arbol =
    case arbol of
        Empty ->
            Nothing

        Node _ Empty _ ->
            Nothing

        Node _ l _ ->
            Just l


hijoDerecho : Tree a -> Maybe (Tree a)
hijoDerecho arbol =
    case arbol of
        Empty ->
            Nothing

        Node _ _ Empty ->
            Nothing

        Node _ _ r ->
            Just r



-- 17. Obtener Nieto


nietoIzquierdoIzquierdo : Tree a -> Maybe (Tree a)
nietoIzquierdoIzquierdo arbol =
    hijoIzquierdo arbol
        |> Maybe.andThen hijoIzquierdo



-- 18. Buscar en Profundidad


buscarEnSubarbol : a -> a -> Tree a -> Maybe a
obtenerSubarbol : comparable -> Tree comparable -> Maybe (Tree comparable)
obtenerSubarbol valor arbol =
    case arbol of
        Empty ->
            Nothing

        Node v l r ->
            if v == valor then
                Just arbol
            else
                case obtenerSubarbol valor l of
                    Just t ->
                        Just t

                    Nothing ->
                        obtenerSubarbol valor r


buscarEnSubarbol : comparable -> comparable -> Tree comparable -> Maybe comparable
buscarEnSubarbol valor1 valor2 arbol =
    obtenerSubarbol valor1 arbol
        |> Maybe.andThen (buscar valor2)



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

        Node v l r ->
            Ok ( v, l, r )



-- 22. Obtener Mínimo con Error


obtenerMinimo : Tree comparable -> Result String comparable
obtenerMinimo arbol =
    case encontrarMinimo arbol of
        Nothing ->
            Err "No hay mínimo en un árbol vacío"

        Just v ->
            Ok v



-- 23. Verificar si es BST


esBST : Tree comparable -> Bool
esBST arbol =
    let
        xs = inorder arbol
        isStrictInc list =
            case list of
                [] ->
                    True

                _ :: [] ->
                    True

                a :: b :: rest ->
                    if a < b then
                        isStrictInc (b :: rest)
                    else
                        False
    in
    isStrictInc xs



-- 24. Insertar en BST


insertarBST : comparable -> Tree comparable -> Result String (Tree comparable)
insertarBST valor arbol =
    Err "El valor ya existe en el árbol"



-- 25. Buscar en BST


buscarEnBST : comparable -> Tree comparable -> Result String comparable
buscarEnBST valor arbol =
    Err "El valor no se encuentra en el árbol"



-- 26. Validar BST con Result


validarBST : Tree comparable -> Result String (Tree comparable)
validarBST arbol =
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
        Err _ ->
            Nothing

        Ok v ->
            Just v



-- 29. Buscar y Validar


buscarPositivo : Int -> Tree Int -> Result String Int
buscarPositivo valor arbol =
    case buscar valor arbol of
        Nothing ->
            Err ("El valor " ++ String.fromInt valor ++ " no se encuentra en el árbol")

        Just v ->
            if v > 0 then
                Ok v
            else
                Err ("El valor " ++ String.fromInt v ++ " no es positivo")



-- 30. Pipeline de Validaciones


validarArbol : Tree Int -> Result String (Tree Int)
validarArbol arbol =
    validarNoVacio arbol
        |> Result.andThen (	 ->
            if esBST t then
                Ok t
            else
                Err "El árbol no es un BST válido"
           )
        |> Result.andThen (	 ->
            let
                positives = List.all ((>) 0) (inorder t)
            in
            if positives then
                Ok t
            else
                Err "No todos los valores son positivos"
           )



-- 31. Encadenar Búsquedas


buscarEnDosArboles : Int -> Tree Int -> Tree Int -> Result String Int
buscarEnDosArboles valor arbol1 arbol2 =
    case buscar valor arbol1 of
        Nothing ->
            Err ("El valor " ++ String.fromInt valor ++ " no se encuentra en el árbol")

        Just v ->
            case buscarEnBST v arbol2 of
                Ok x ->
                    Ok x

                Err _ ->
                    Err ("El valor " ++ String.fromInt v ++ " no se encuentra en el segundo árbol")



-- ============================================================================
-- PARTE 5: DESAFÍOS AVANZADOS
-- ============================================================================
-- 32. Recorrido Inorder


inorder : Tree a -> List a
inorder arbol =
    case arbol of
        Empty ->
            []

        Node v l r ->
            inorder l ++ [ v ] ++ inorder r



-- 33. Recorrido Preorder


preorder : Tree a -> List a
preorder arbol =
    case arbol of
        Empty ->
            []

        Node v l r ->
            [ v ] ++ preorder l ++ preorder r



-- 34. Recorrido Postorder


postorder : Tree a -> List a
postorder arbol =
    case arbol of
        Empty ->
            []

        Node v l r ->
            postorder l ++ postorder r ++ [ v ]



-- 35. Map sobre Árbol


mapArbol : (a -> b) -> Tree a -> Tree b
mapArbol funcion arbol =
    case arbol of
        Empty ->
            Empty

        Node v l r ->
            Node (funcion v) (mapArbol funcion l) (mapArbol funcion r)



-- 36. Filter sobre Árbol


filterArbol : (a -> Bool) -> Tree a -> Tree a
filterArbol predicado arbol =
    case arbol of
        Empty ->
            Empty

        Node v l r ->
            let
                l' = filterArbol predicado l
                r' = filterArbol predicado r
            in
            if predicado v then
                Node v l' r'
            else
                -- If node removed, prefer left subtree, otherwise right
                case l' of
                    Empty ->
                        r'

                    _ ->
                        l'



-- 37. Fold sobre Árbol


foldArbol : (a -> b -> b) -> b -> Tree a -> b
foldArbol funcion acumulador arbol =
    case arbol of
        Empty ->
            acumulador

        Node v l r ->
            let
                accL = foldArbol funcion acumulador l
                accRoot = funcion v accL
            in
            foldArbol funcion accRoot r



-- 38. Eliminar de BST


eliminarBST : comparable -> Tree comparable -> Result String (Tree comparable)
eliminarBST valor arbol =
    Err "El valor no existe en el árbol"



-- 39. Construir BST desde Lista


desdeListaBST : List comparable -> Result String (Tree comparable)
desdeListaBST lista =
    Err "Valor duplicado"



-- 40. Verificar Balance


estaBalanceado : Tree a -> Bool
estaBalanceado arbol =
    let
        helper t =
            case t of
                Empty ->
                    ( 0, True )

                Node _ l r ->
                    let
                        ( hl, bl ) = helper l
                        ( hr, br ) = helper r
                        h = 1 + max hl hr
                        b = bl && br && (abs (hl - hr) <= 1)
                    in
                    ( h, b )

        ( _, balanced ) = helper arbol
    in
    balanced



-- 41. Balancear BST


balancear : Tree comparable -> Tree comparable
balancear arbol =
    Empty



-- 42. Camino a un Valor


type Direccion
    = Izquierda
    | Derecha


encontrarCamino : comparable -> Tree comparable -> Result String (List Direccion)
encontrarCamino valor arbol =
    let
        helper t =
            case t of
                Empty ->
                    Nothing

                Node v l r ->
                    if v == valor then
                        Just []
                    else
                        case helper l of
                            Just path ->
                                Just (Izquierda :: path)

                            Nothing ->
                                case helper r of
                                    Just path2 ->
                                        Just (Derecha :: path2)

                                    Nothing ->
                                        Nothing
    in
    case helper arbol of
        Just p ->
            Ok p

        Nothing ->
            Err "El valor no existe en el árbol"



-- 43. Seguir Camino


seguirCamino : List Direccion -> Tree a -> Result String a
seguirCamino camino arbol =
    let
        helper dirs t =
            case ( dirs, t ) of
                ( [], Empty ) ->
                    Err "Camino inválido"

                ( [], Node v _ _ ) ->
                    Ok v

                ( Izquierda :: ds, Node _ l _ ) ->
                    case l of
                        Empty ->
                            Err "Camino inválido"

                        _ ->
                            helper ds l

                ( Derecha :: ds, Node _ _ r ) ->
                    case r of
                        Empty ->
                            Err "Camino inválido"

                        _ ->
                            helper ds r

                ( _, Empty ) ->
                    Err "Camino inválido"
    in
    helper camino arbol



-- 44. Ancestro Común Más Cercano


ancestroComun : comparable -> comparable -> Tree comparable -> Result String comparable
ancestroComun valor1 valor2 arbol =
    Err "Uno o ambos valores no existen en el árbol"



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
    Err "Posición inválida"



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
    Empty
