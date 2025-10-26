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
import Array exposing (empty)


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
        Node _ _ _ -> False
        Empty -> True
    


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


tamaño : Tree a -> Int
tamaño arbol =
    case arbol of
        Empty ->
            0
    
        Node _ left right ->
            1 + (tamaño left) + (tamaño right)


-- 5. Altura del Árbol


altura : Tree a -> Int
altura arbol =
    case arbol of
        Empty ->
            0

        Node _ left right ->
            1 + max (altura left) (altura right)


-- 6. Suma de Valores


sumarArbol : Tree Int -> Int
sumarArbol arbol =
    case arbol of
        Empty ->
            0

        Node valor left right ->
            valor + (sumarArbol left) + (sumarArbol right)


-- 7. Contiene Valor


contiene : a -> Tree a -> Bool
contiene valor arbol =
    case arbol of 
        Empty ->
            False

        Node v left right ->
            if v == valor || (contiene valor left) || (contiene valor right) then
                True
            else
                False


-- 8. Contar Hojas


contarHojas : Tree a -> Int
contarHojas arbol =
    case arbol of 
        Empty -> 0
        Node _ Empty Empty -> 1
        Node _ izq der -> (contarHojas izq) + (contarHojas der)


-- 9. Valor Mínimo (sin Maybe)


minimo : Tree Int -> Int
minimo arbol =
    case arbol of
        Empty -> 0
        Node v Empty Empty -> v
        Node v Empty der -> (min v (minimo der))
        Node v izq Empty -> (min v (minimo izq))
        Node v izq der -> (min v (min (minimo izq) (minimo der)))


-- 10. Valor Máximo (sin Maybe)


maximo : Tree Int -> Int
maximo arbol =
    case arbol of
        Empty -> 0
        Node v Empty Empty -> v
        Node v Empty der -> (max v (maximo der))
        Node v izq Empty -> (max v (maximo izq))
        Node v izq der -> (max v (max (maximo izq) (maximo der)))


-- ============================================================================
-- PARTE 2: INTRODUCCIÓN A MAYBE
-- ============================================================================


-- 11. Buscar Valor


buscar : a -> Tree a -> Maybe a
buscar valor arbol =
    case arbol of
        Empty -> Nothing
        Node v izq der -> 
            if v == valor 
                then Just v
            else 
                case buscar valor izq of 
                    Just encontrado -> Just encontrado
                    Nothing -> buscar valor der


-- 12. Encontrar Mínimo (con Maybe)


encontrarMinimo : Tree comparable -> Maybe comparable
encontrarMinimo arbol =
    case arbol of
        Empty -> Nothing
        Node v Empty Empty -> Just v
        Node v izq der -> 
            let
                minIzq = encontrarMinimo izq
                minDer = encontrarMinimo der
            in
            case (minIzq, minDer) of
                (Nothing, Nothing) ->
                    Just v

                (Just valIzq, Nothing) ->
                    Just (min v valIzq)

                (Nothing, Just valDer) ->
                    Just (min v valDer)

                (Just valIzq, Just valDer) ->
                    Just (min v (min valIzq valDer))


-- 13. Encontrar Máximo (con Maybe)


encontrarMaximo : Tree comparable -> Maybe comparable
encontrarMaximo arbol =
    case arbol of
        Empty ->
            Nothing

        Node v izq der ->
            let
                maxIzq = encontrarMaximo izq
                maxDer = encontrarMaximo der
            in
            case (maxIzq, maxDer) of
                (Nothing, Nothing) ->
                    Just v

                (Just valIzq, Nothing) ->
                    Just (max v valIzq)

                (Nothing, Just valDer) ->
                    Just (max v valDer)

                (Just valIzq, Just valDer) ->
                    Just (max v (max valIzq valDer))


-- 14. Buscar Por Predicado


buscarPor : (a -> Bool) -> Tree a -> Maybe a
buscarPor predicado arbol =
    case arbol of
        Empty -> Nothing
        Node v izq der ->
            if predicado v then
                Just v
            else
                case buscarPor predicado izq of
                    Just x -> Just x
                    Nothing -> buscarPor predicado der


-- 15. Obtener Valor de Raíz


raiz : Tree a -> Maybe a
raiz arbol =
    case arbol of
        Empty -> Nothing
        
        Node v _ _ -> Just v



-- 16. Obtener Hijo Izquierdo


hijoIzquierdo : Tree a -> Maybe (Tree a)
hijoIzquierdo arbol =
    case arbol of 
        Empty -> Nothing
        Node _ Empty _ -> Nothing
        Node _ izq _  -> Just izq


hijoDerecho : Tree a -> Maybe (Tree a)
hijoDerecho arbol =
    case arbol of 
        Empty -> Nothing
        Node _ _ Empty -> Nothing
        Node _ _ der  -> Just der


-- 17. Obtener Nieto


nietoIzquierdoIzquierdo : Tree a -> Maybe (Tree a)
nietoIzquierdoIzquierdo arbol =
    Maybe.andThen hijoIzquierdo (hijoIzquierdo arbol)



-- 18. Buscar en Profundidad


obtenerSubarbol : a -> Tree a -> Maybe (Tree a)
obtenerSubarbol valor arbol =
    case arbol of
        Empty -> Nothing
        Node v izq der ->
            if v == valor then
                Just arbol
            else
                case obtenerSubarbol valor izq of
                    Just x -> Just x
                    Nothing -> obtenerSubarbol valor der


buscarEnSubarbol : a -> a -> Tree a -> Maybe a
buscarEnSubarbol valor1 valor2 arbol =
    obtenerSubarbol valor1 arbol
        |> Maybe.andThen (buscar valor2)


-- ============================================================================
-- PARTE 3: RESULT PARA VALIDACIONES
-- ============================================================================


-- 19. Validar No Vacío


validarNoVacio : Tree a -> Result String (Tree a)
validarNoVacio arbol =
    if esVacio arbol then
        Err "El árbol está vacío"
    else
        Ok arbol


-- 20. Obtener Raíz con Error


obtenerRaiz : Tree a -> Result String a
obtenerRaiz arbol =
    case arbol of
        Empty -> Err "No se puede obtener la raíz de un árbol vacío"
        Node v _ _ -> Ok v


-- 21. Dividir en Valor Raíz y Subárboles


dividir : Tree a -> Result String ( a, Tree a, Tree a )
dividir arbol =
    case arbol of
        Empty -> Err "No se puede dividir un árbol vacío"
        Node v izq der -> Ok (v, izq, der)



-- 22. Obtener Mínimo con Error


obtenerMinimo : Tree comparable -> Result String comparable
obtenerMinimo arbol =
    case arbol of
        Empty ->
            Err "No hay mínimo en un árbol vacío"

        Node valor Empty _ ->
            Ok valor

        Node _ izquierdo _ ->
            obtenerMinimo izquierdo


-- 23. Verificar si es BST


esBST : Tree comparable -> Bool
esBST arbol =
    let
        dentroDeRango minVal maxVal tree =
            case tree of
                Empty ->
                    True

                Node valor izq der ->
                    let
                        cumpleRango =
                            case ( minVal, maxVal ) of
                                ( Just minV, Just maxV ) ->
                                    valor > minV && valor < maxV

                                ( Just minV, Nothing ) ->
                                    valor > minV

                                ( Nothing, Just maxV ) ->
                                    valor < maxV

                                _ ->
                                    True
                    in
                    cumpleRango
                        && dentroDeRango minVal (Just valor) izq
                        && dentroDeRango (Just valor) maxVal der
    in
    dentroDeRango Nothing Nothing arbol


-- 24. Insertar en BST


insertarBST : comparable -> Tree comparable -> Result String (Tree comparable)
insertarBST valor arbol =
    case arbol of
        Empty ->
            Ok (Node valor Empty Empty)

        Node v izq der ->
            if valor == v then
                Err "El valor ya existe en el árbol"

            else if valor < v then
                case insertarBST valor izq of
                    Err mensaje -> Err mensaje
                    Ok nuevoIzq -> Ok (Node v nuevoIzq der)

            else
                case insertarBST valor der of
                    Err mensaje -> Err mensaje
                    Ok nuevoDer -> Ok (Node v izq nuevoDer)


-- 25. Buscar en BST


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
        Just x -> Ok x
        Nothing -> Err mensajeError


-- 28. Result a Maybe


resultAMaybe : Result error value -> Maybe value
resultAMaybe result =
    case result of
        Ok x -> Just x
        Err _ -> Nothing


-- 29. Buscar y Validar


buscarPositivo : Int -> Tree Int -> Result String Int
buscarPositivo valor arbol =
    case buscarEnBST valor arbol of
        Err mensaje -> Err mensaje
        Ok encontrado ->
            if encontrado > 0 then
                Ok encontrado
            else
                Err "El valor encontrado no es positivo"


-- 30. Pipeline de Validaciones


validarArbol : Tree Int -> Result String (Tree Int)
validarArbol arbol =
    case validarNoVacio arbol of
        Err mensaje -> Err mensaje
        Ok arbolNoVacio ->
            case validarBST arbolNoVacio of
                Err mensaje -> Err mensaje
                Ok arbolValido ->
                    Ok arbolValido


-- 31. Encadenar Búsquedas


buscarEnDosArboles : Int -> Tree Int -> Tree Int -> Result String Int
buscarEnDosArboles valor arbol1 arbol2 =
    case buscarEnBST valor arbol1 of
        Err mensaje -> Err mensaje
        Ok encontrado1 ->
            case buscarEnBST encontrado1 arbol2 of
                Err mensaje -> Err mensaje
                Ok encontrado2 ->
                    Ok encontrado2

-- ============================================================================
-- PARTE 5: DESAFÍOS AVANZADOS
-- ============================================================================


-- 32. Recorrido Inorder


inorder : Tree a -> List a
inorder arbol =
    case arbol of
        Empty -> []
        Node v izq der -> inorder izq ++ v :: inorder der  


-- 33. Recorrido Preorder


preorder : Tree a -> List a
preorder arbol =
    case arbol of
        Empty -> []
        Node v izq der -> v :: preorder izq ++ preorder der 


-- 34. Recorrido Postorder


postorder : Tree a -> List a
postorder arbol =
    case arbol of
        Empty -> []
        Node v izq der -> postorder izq ++ postorder der ++ [v] 


-- 35. Map sobre Árbol


mapArbol : (a -> b) -> Tree a -> Tree b
mapArbol funcion arbol =
    case arbol of
        Empty -> Empty
        Node v izq der -> Node (funcion v) (mapArbol funcion izq) (mapArbol funcion der)


-- 36. Filter sobre Árbol


filterArbol : (a -> Bool) -> Tree a -> Tree a
filterArbol predicado arbol =
    case arbol of
        Empty -> 
            Empty
        Node v izq der ->
            if predicado v then
                Node v (filterArbol predicado izq) (filterArbol predicado der)
            else
                let
                    izqFiltrado = filterArbol predicado izq
                    derFiltrado = filterArbol predicado der
                in
                case (izqFiltrado, derFiltrado) of
                    (Empty, Empty) ->
                        Empty

                    (Empty, _) ->
                        derFiltrado

                    (_, Empty) ->
                        izqFiltrado

                    _ ->
                        Node v izqFiltrado derFiltrado



-- 37. Fold sobre Árbol


foldArbol : (a -> b -> b) -> b -> Tree a -> b
foldArbol funcion acumulador arbol =
    case arbol of
        Empty -> acumulador
        Node v izq der ->
            let
                acumuladorIzq = foldArbol funcion acumulador izq
                acumuladorDer = foldArbol funcion acumuladorIzq der
            in
            funcion v acumuladorDer


-- 38. Eliminar de BST


eliminarBST : comparable -> Tree comparable -> Result String (Tree comparable)
eliminarBST valor arbol =
    case arbol of
        Empty ->
            Err "El valor no se encuentra en el árbol"

        Node v izq der ->
            if valor < v then
                case eliminarBST valor izq of
                    Err msg -> Err msg
                    Ok nuevoIzq -> Ok (Node v nuevoIzq der)

            else if valor > v then
                case eliminarBST valor der of
                    Err msg -> Err msg
                    Ok nuevoDer -> Ok (Node v izq nuevoDer)

            else
                case ( izq, der ) of
                    ( Empty, Empty ) ->
                        Ok Empty

                    ( Empty, _ ) ->
                        Ok der

                    ( _, Empty ) ->
                        Ok izq

                    ( _, _ ) ->
                        case encontrarMinimo der of
                            Nothing ->
                                Err "Error interno: no se pudo encontrar el mínimo en el subárbol derecho"

                            Just minDer ->
                                case eliminarBST minDer der of
                                    Err msg -> Err msg
                                    Ok derSinMin ->
                                        Ok (Node minDer izq derSinMin)

-- 39. Construir BST desde Lista


desdeListaBST : List comparable -> Result String (Tree comparable)
desdeListaBST lista =
    List.foldl
        (\x acc ->
            case acc of
                Err msg -> 
                    Err msg
                Ok arbol ->
                    insertarBST x arbol
        )
        (Ok Empty)
        lista


-- 40. Verificar Balance


estaBalanceado : Tree a -> Bool
estaBalanceado arbol =
    case arbol of
        Empty -> True
        Node _ izq der ->
            let
                alturaIzq = altura izq
                alturaDer = altura der
            in
            abs (alturaIzq - alturaDer) <= 1
                && estaBalanceado izq
                && estaBalanceado der


-- 41. Balancear BST


balancear : Tree comparable -> Tree comparable
balancear arbol =
    let
        lista = inorder arbol
        build xs =
            case xs of
                [] ->
                    Empty

                _ ->
                    let
                        len = List.length xs
                        mid = len // 2
                        leftList = List.take mid xs
                        rest = List.drop mid xs
                    in
                    case rest of
                        [] ->
                            Empty

                        y :: ys ->
                            Node y (build leftList) (build ys)
    in 
    build lista


-- 42. Camino a un Valor


type Direccion
    = Izquierda
    | Derecha


encontrarCamino : a -> Tree a -> Result String (List Direccion)
encontrarCamino valor arbol =
    case arbol of
        Empty ->
            Err "El valor no existe en el árbol"
        
        Node v izq der ->
            if v == valor then
                Ok []
            else 
                case encontrarCamino valor izq of
                    Ok camino -> Ok (Izquierda :: camino)
                    Err _ ->
                        case encontrarCamino valor der of
                            Ok camino -> Ok (Derecha :: camino)
                            Err _ -> Err "El valor no existe en el árbol"


-- 43. Seguir Camino


seguirCamino : List Direccion -> Tree a -> Result String a
seguirCamino camino arbol =
    case (camino, arbol) of
        ( [], Empty ) ->
            Err "El árbol está vacío"

        ( [], Node v _ _ ) ->
            Ok v

        ( Izquierda :: rest, Node _ izq _ ) ->
            seguirCamino rest izq

        ( Derecha :: rest, Node _ _ der ) ->
            seguirCamino rest der

        ( _, Empty ) ->
            Err "Camino inválido"


-- 44. Ancestro Común Más Cercano


ancestroComun : comparable -> comparable -> Tree comparable -> Result String comparable
ancestroComun valor1 valor2 arbol =
    case arbol of
        Empty ->
            Err "Uno o ambos valores no existen en el árbol"
        
        Node v izq der ->
            if valor1 < v && valor2 < v then
                ancestroComun valor1 valor2 izq
            else if valor1 > v && valor2 > v then
                ancestroComun valor1 valor2 der
            else
                Ok v


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
    let
        lista = inorder arbol
    in
    case List.drop posicion lista of
        valor :: _ -> Ok valor
        [] -> Err "Posición inválida"


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
        build xs =
            case xs of
                [] ->
                    Empty

                _ ->
                    let
                        len = List.length xs
                        mid = len // 2
                        leftList = List.take mid xs
                        rest = List.drop mid xs
                    in
                    case rest of
                        [] ->
                            Empty

                        y :: ys ->
                            Node y (build leftList) (build ys)
    in
    build lista
    
