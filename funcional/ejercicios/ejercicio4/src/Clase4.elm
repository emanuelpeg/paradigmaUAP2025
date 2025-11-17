module Clase4 exposing (..)

{-| Ejercicios de Programación Funcional - Clase 4
Árboles binarios, pattern matching, Maybe, Result, y BST.
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

contiene : a -> Tree a -> Bool
contiene valor arbol =
    case arbol of
        Empty ->
            False

        Node v l r ->
            v == valor || contiene valor l || contiene valor r


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
    case arbol of
        Empty ->
            0

        Node v Empty _ ->
            v

        Node _ l _ ->
            minimo l


-- 10. Valor Máximo (sin Maybe)

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

-- 11. Buscar Valor

buscar : a -> Tree a -> Maybe a
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

        Node v Empty _ ->
            Just v

        Node _ l _ ->
            encontrarMinimo l


-- 13. Encontrar Máximo (con Maybe)

encontrarMaximo : Tree comparable -> Maybe comparable
encontrarMaximo arbol =
    case arbol of
        Empty ->
            Nothing

        Node v _ Empty ->
            Just v

        Node _ _ r ->
            encontrarMaximo r


-- 14. Buscar Por Predicado

buscarPor : (a -> Bool) -> Tree a -> Maybe a
buscarPor p arbol =
    case arbol of
        Empty ->
            Nothing

        Node v l r ->
            if p v then
                Just v
            else
                case buscarPor p l of
                    Just x ->
                        Just x

                    Nothing ->
                        buscarPor p r


-- 15. Obtener Valor de Raíz

raiz : Tree a -> Maybe a
raiz arbol =
    case arbol of
        Empty ->
            Nothing

        Node v _ _ ->
            Just v


-- 16. Obtener Hijo Izquierdo/Derecho

hijoIzquierdo : Tree a -> Maybe (Tree a)
hijoIzquierdo arbol =
    case arbol of
        Empty ->
            Nothing

        Node _ l _ ->
            Just l


hijoDerecho : Tree a -> Maybe (Tree a)
hijoDerecho arbol =
    case arbol of
        Empty ->
            Nothing

        Node _ _ r ->
            Just r


-- 17. Obtener Nieto (izq-izq)

nietoIzquierdoIzquierdo : Tree a -> Maybe (Tree a)
nietoIzquierdoIzquierdo arbol =
    hijoIzquierdo arbol
        |> Maybe.andThen hijoIzquierdo


-- 18. Buscar en Profundidad (subárbol que tiene cierto valor; luego buscar otro valor ahí)

obtenerSubarbol : a -> Tree a -> Maybe (Tree a)
obtenerSubarbol valor arbol =
    case arbol of
        Empty ->
            Nothing

        Node v l r ->
            if v == valor then
                Just arbol
            else
                obtenerSubarbol valor l
                    |> Maybe.orElse (obtenerSubarbol valor r)


buscarEnSubarbol : a -> a -> Tree a -> Maybe a
buscarEnSubarbol valor1 valor2 arbol =
    obtenerSubarbol valor1 arbol
        |> Maybe.andThen (\sub -> buscar valor2 sub)



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

        Just m ->
            Ok m


-- 23. Verificar si es BST (con límites)

esBST : Tree comparable -> Bool
esBST arbol =
    let
        dentro : Maybe comparable -> Maybe comparable -> Tree comparable -> Bool
        dentro lo hi t =
            case t of
                Empty ->
                    True

                Node v l r ->
                    (case lo of
                        Nothing -> True
                        Just a -> a < v
                    )
                        && (case hi of
                                Nothing -> True
                                Just b -> v < b
                           )
                        && dentro lo (Just v) l
                        && dentro (Just v) hi r
    in
    dentro Nothing Nothing arbol


-- 24. Insertar en BST (error si ya existe)

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


-- 25. Buscar en BST

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

        Just x ->
            Ok x


-- 28. Result a Maybe

resultAMaybe : Result error value -> Maybe value
resultAMaybe result =
    case result of
        Ok v ->
            Just v

        Err _ ->
            Nothing


-- 29. Buscar y Validar (solo positivos)

buscarPositivo : Int -> Tree Int -> Result String Int
buscarPositivo valor arbol =
    case buscar valor arbol of
        Nothing ->
            Err "El valor no se encuentra en el árbol"

        Just v ->
            if v > 0 then
                Ok v
            else
                Err "El valor no es positivo"


-- 30. Pipeline de Validaciones

validarArbol : Tree Int -> Result String (Tree Int)
validarArbol arbol =
    validarNoVacio arbol
        |> Result.andThen validarBST


-- 31. Encadenar Búsquedas (buscar en el primero; si no, en el segundo)

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

-- 32. Recorrido Inorder

inorder : Tree a -> List a
inorder arbol =
    case arbol of
        Empty ->
            []

        Node v l r ->
            inorder l ++ (v :: inorder r)


-- 33. Recorrido Preorder

preorder : Tree a -> List a
preorder arbol =
    case arbol of
        Empty ->
            []

        Node v l r ->
            v :: (preorder l ++ preorder r)


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
mapArbol f arbol =
    case arbol of
        Empty ->
            Empty

        Node v l r ->
            Node (f v) (mapArbol f l) (mapArbol f r)


-- 36. Filter sobre Árbol
-- Estrategia: si el nodo NO cumple, "combinamos" sus subárboles filtrados.
-- (Sin requerir 'comparable'.)

filterArbol : (a -> Bool) -> Tree a -> Tree a
filterArbol p arbol =
    let
        combinar : Tree a -> Tree a -> Tree a
        combinar t1 t2 =
            case t1 of
                Empty ->
                    t2

                Node v l r ->
                    Node v l (combinar r t2)
    in
    case arbol of
        Empty ->
            Empty

        Node v l r ->
            let
                l2 = filterArbol p l
                r2 = filterArbol p r
            in
            if p v then
                Node v l2 r2
            else
                combinar l2 r2


-- 37. Fold sobre Árbol (inorder)

foldArbol : (a -> b -> b) -> b -> Tree a -> b
foldArbol f acc arbol =
    case arbol of
        Empty ->
            acc

        Node v l r ->
            let
                acc1 = foldArbol f acc l
                acc2 = f v acc1
            in
            foldArbol f acc2 r


-- 38. Eliminar de BST

eliminarBST : comparable -> Tree comparable -> Result String (Tree comparable)
eliminarBST x arbol =
    case arbol of
        Empty ->
            Err "El valor no existe en el árbol"

        Node v l r ->
            if x < v then
                eliminarBST x l |> Result.map (\nl -> Node v nl r)
            else if x > v then
                eliminarBST x r |> Result.map (\nr -> Node v l nr)
            else
                -- x == v, eliminar este nodo
                case ( l, r ) of
                    ( Empty, Empty ) ->
                        Ok Empty

                    ( Empty, _ ) ->
                        Ok r

                    ( _, Empty ) ->
                        Ok l

                    ( _, _ ) ->
                        -- Reemplazar por sucesor (mínimo del derecho)
                        case encontrarMinimo r of
                            Nothing ->
                                Ok l

                            Just suc ->
                                eliminarBST suc r
                                    |> Result.map (\nr -> Node suc l nr)


-- 39. Construir BST desde Lista (error en duplicado)

desdeListaBST : List comparable -> Result String (Tree comparable)
desdeListaBST lista =
    List.foldl
        (\v acc ->
            acc |> Result.andThen (\t -> insertarBST v t)
        )
        (Ok Empty)
        lista


-- 40. Verificar Balance (diferencia de alturas <= 1 en todos los nodos)

estaBalanceado : Tree a -> Bool
estaBalanceado arbol =
    let
        okAltura : Tree a -> ( Bool, Int )
        okAltura t =
            case t of
                Empty ->
                    ( True, 0 )

                Node _ l r ->
                    let
                        ( ol, hl ) = okAltura l
                        ( or_, hr ) = okAltura r
                        dif = abs (hl - hr) <= 1
                    in
                    ( ol && or_ && dif, 1 + max hl hr )
    in
    okAltura arbol |> Tuple.first


-- 41. Balancear BST (ordenar inorder y construir árbol balanceado)

balancear : Tree comparable -> Tree comparable
balancear arbol =
    let
        xs = inorder arbol
        unico xs_ =
            case xs_ of
                [] ->
                    []

                y :: ys ->
                    y :: List.filter ((/=) y) ys

        ordenadosUnicos =
            xs |> List.sort |> unico

        construir : List comparable -> Tree comparable
        construir lista =
            case lista of
                [] ->
                    Empty

                _ ->
                    let
                        n = List.length lista
                        i = n // 2
                        ( izq, resto ) = ( List.take i lista, List.drop i lista )
                    in
                    case resto of
                        [] ->
                            construir izq

                        m :: der ->
                            Node m (construir izq) (construir der)
    in
    construir ordenadosUnicos


-- 42. Camino a un Valor (general, no asume BST)

type Direccion
    = Izquierda
    | Derecha


encontrarCamino : a -> Tree a -> Result String (List Direccion)
encontrarCamino valor arbol =
    let
        go t =
            case t of
                Empty ->
                    Nothing

                Node v l r ->
                    if v == valor then
                        Just []
                    else
                        case go l of
                            Just camino ->
                                Just (Izquierda :: camino)

                            Nothing ->
                                go r |> Maybe.map (\c -> Derecha :: c)
    in
    case go arbol of
        Just camino ->
            Ok camino

        Nothing ->
            Err "El valor no existe en el árbol"


-- 43. Seguir Camino

seguirCamino : List Direccion -> Tree a -> Result String a
seguirCamino camino arbol =
    case ( camino, arbol ) of
        ( [], Empty ) ->
            Err "Camino inválido"

        ( [], Node v _ _ ) ->
            Ok v

        ( Izquierda :: cs, Node _ l _ ) ->
            seguirCamino cs l

        ( Derecha :: cs, Node _ _ r ) ->
            seguirCamino cs r

        ( _, Empty ) ->
            Err "Camino inválido"


-- 44. Ancestro Común Más Cercano (asumiendo BST para eficiencia)

ancestroComun : comparable -> comparable -> Tree comparable -> Result String comparable
ancestroComun a b arbol =
    let
        ambosExisten =
            contiene a arbol && contiene b arbol

        lca t =
            case t of
                Empty ->
                    Err "Uno o ambos valores no existen en el árbol"

                Node v l r ->
                    if a < v && b < v then
                        lca l
                    else if a > v && b > v then
                        lca r
                    else
                        Ok v
    in
    if ambosExisten then
        lca arbol
    else
        Err "Uno o ambos valores no existen en el árbol"



-- ============================================================================
-- PARTE 6: DESAFÍO FINAL - SISTEMA COMPLETO
-- ============================================================================

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
        xs = inorder arbol

        nth : Int -> List a -> Maybe a
        nth i lista =
            if i < 0 then
                Nothing
            else
                case ( i, lista ) of
                    ( 0, x :: _ ) ->
                        Just x

                    ( n, _ :: ys ) ->
                        nth (n - 1) ys

                    ( _, [] ) ->
                        Nothing
    in
    nth posicion xs
        |> maybeAResult "Posición inválida"


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
        ordenada = List.sort lista

        construir : List comparable -> Tree comparable
        construir xs =
            case xs of
                [] ->
                    Empty

                _ ->
                    let
                        n = List.length xs
                        i = n // 2
                        ( izq, resto ) = ( List.take i xs, List.drop i xs )
                    in
                    case resto of
                        [] ->
                            construir izq

                        m :: der ->
                            Node m (construir izq) (construir der)
    in
    construir ordenada
