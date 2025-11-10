module Arboles exposing (..)

-- Parte 0: Definición del Árbol Binario
type Tree a
    = Empty
    | Node a (Tree a) (Tree a)

-- 1. Crear Árboles de Ejemplo

-- Un árbol vacío
arbolVacio : Tree Int
arbolVacio =
    Empty

-- Un árbol con un solo nodo
arbolHoja : Tree Int
arbolHoja =
    Node 5 Empty Empty

-- Un árbol pequeño
arbolPequeno : Tree Int
arbolPequeno =
    Node 3
        (Node 1 Empty Empty)
        (Node 5 Empty Empty)

-- Un árbol mediano
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

-- 2. Es Vacío
esVacio : Tree a -> Bool
esVacio arbol =
    case arbol of
        Empty ->
            True

        Node _ _ _ ->
            False

-- 3. Es Hoja
esHoja : Tree a -> Bool
esHoja arbol =
    case arbol of
        Node _ Empty Empty ->
            True

        _ ->
            False


-- Parte 1: Pattern Matching con Árboles
-- 4. Tamaño del Árbol
tamaño : Tree a -> Int
tamaño arbol =
    case arbol of
        Empty ->
            0

        Node _ izq der ->
            1 + tamaño izq + tamaño der


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
            if v == valor then
                True
            else
                contiene valor izq || contiene valor der


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

        Node valor Empty Empty ->
            valor

        Node valor izq der ->
            let
                minIzq = minimo izq
                minDer = minimo der
                -- ignoramos los 0 de subárboles vacíos
                candidatos =
                    List.filter (\x -> x /= 0) [ valor, minIzq, minDer ]
            in
            case candidatos of
                [] ->
                    0

                _ ->
                    List.minimum candidatos |> Maybe.withDefault 0


-- 10. Valor Máximo (sin Maybe)
maximo : Tree Int -> Int
maximo arbol =
    case arbol of
        Empty ->
            0

        Node valor Empty Empty ->
            valor

        Node valor izq der ->
            let
                maxIzq = maximo izq
                maxDer = maximo der
                candidatos =
                    List.filter (\x -> x /= 0) [ valor, maxIzq, maxDer ]
            in
            case candidatos of
                [] ->
                    0

                _ ->
                    List.maximum candidatos |> Maybe.withDefault 0


-- Parte 2: Introducción a Maybe (Búsquedas que Pueden Fallar)
-- 11. Buscar Valor
buscar : a -> Tree a -> Maybe a
buscar valor arbol =
    case arbol of
        Empty ->
            Nothing

        Node x izq der ->
            if x == valor then
                Just x
            else
                case buscar valor izq of
                    Just encontrado ->
                        Just encontrado

                    Nothing ->
                        buscar valor der

-- 12. Encontrar Mínimo
encontrarMinimo : Tree comparable -> Maybe comparable
encontrarMinimo arbol =
    case arbol of
        Empty ->
            Nothing

        Node x Empty _ ->
            Just x

        Node _ izq _ ->
            encontrarMinimo izq

-- 13. Encontrar Máximo
encontrarMaximo : Tree comparable -> Maybe comparable
encontrarMaximo arbol =
    case arbol of
        Empty ->
            Nothing

        Node x _ Empty ->
            Just x

        Node _ _ der ->
            encontrarMaximo der

-- 14. Buscar por predicado
buscarPor : (a -> Bool) -> Tree a -> Maybe a
buscarPor predicado arbol =
    case arbol of
        Empty ->
            Nothing

        Node x izq der ->
            if predicado x then
                Just x
            else
                case buscarPor predicado izq of
                    Just encontrado ->
                        Just encontrado

                    Nothing ->
                        buscarPor predicado der

-- 15. Obtener valor de raíz
raiz : Tree a -> Maybe a
raiz arbol =
    case arbol of
        Empty ->
            Nothing

        Node x _ _ ->
            Just x

-- 16. Obtener Hijo Izquierdo / Derecho
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

-- 17. Obtener Nieto Izquierdo del Izquierdo
nietoIzquierdoIzquierdo : Tree a -> Maybe (Tree a)
nietoIzquierdoIzquierdo arbol =
    hijoIzquierdo arbol
        |> Maybe.andThen hijoIzquierdo

-- 18. Buscar en Profundidad
obtenerSubarbol : a -> Tree a -> Maybe (Tree a)
obtenerSubarbol valor arbol =
    case arbol of
        Empty ->
            Nothing

        Node x izq der ->
            if x == valor then
                Just arbol
            else
                case obtenerSubarbol valor izq of
                    Just sub ->
                        Just sub

                    Nothing ->
                        obtenerSubarbol valor der


-- Parte 3: Result para Validaciones con Errores Descriptivos
-- Ejercicios con Result

-- 19. Validar No Vacío
validarNoVacio : Tree a -> Result String (Tree a)
validarNoVacio arbol =
    case arbol of
        Empty ->
            Err "El árbol está vacío"

        _ ->
            Ok arbol

-- 20. Obtener Valor de Raíz con Error
obtenerRaiz : Tree a -> Result String a
obtenerRaiz arbol =
    case arbol of
        Empty ->
            Err "No se puede obtener la raíz de un árbol vacío"

        Node x _ _ ->
            Ok x

-- 21. Dividir en Valor Raíz y Subárboles
dividir : Tree a -> Result String (a, Tree a, Tree a)
dividir arbol =
    case arbol of
        Empty ->
            Err "No se puede dividir un árbol vacío"

        Node x izq der ->
            Ok (x, izq, der)

-- 22. Obtener Mínimo con Error
obtenerMinimo : Tree comparable -> Result String comparable
obtenerMinimo arbol =
    case arbol of
        Empty ->
            Err "No hay mínimo en un árbol vacío"

        Node x Empty _ ->
            Ok x

        Node _ izq _ ->
            obtenerMinimo izq

-- 23. Verificar si es BST
esBST : Tree comparable -> Bool
esBST arbol =
    let
        esBSTConRango min max arbolInterno =
            case arbolInterno of
                Empty ->
                    True

                Node x izq der ->
                    let
                        dentroDeRango =
                            case (min, max) of
                                (Just minVal, Just maxVal) -> x > minVal && x < maxVal
                                (Just minVal, Nothing) -> x > minVal
                                (Nothing, Just maxVal) -> x < maxVal
                                (Nothing, Nothing) -> True
                    in
                    dentroDeRango
                        && esBSTConRango min (Just x) izq
                        && esBSTConRango (Just x) max der
    in
    esBSTConRango Nothing Nothing arbol

-- 24. Insertar en BST (con error si ya existe)
insertarBST : comparable -> Tree comparable -> Result String (Tree comparable)
insertarBST valor arbol =
    case arbol of
        Empty ->
            Ok (Node valor Empty Empty)

        Node x izq der ->
            if valor == x then
                Err ("El valor " ++ String.fromInt valor ++ " ya existe en el árbol")

            else if valor < x then
                case insertarBST valor izq of
                    Ok nuevoIzq ->
                        Ok (Node x nuevoIzq der)

                    Err msg ->
                        Err msg

            else
                case insertarBST valor der of
                    Ok nuevoDer ->
                        Ok (Node x izq nuevoDer)

                    Err msg ->
                        Err msg

-- 25. Buscar en BST
buscarEnBST : comparable -> Tree comparable -> Result String comparable
buscarEnBST valor arbol =
    case arbol of
        Empty ->
            Err ("El valor " ++ String.fromInt valor ++ " no se encuentra en el árbol")

        Node x izq der ->
            if valor == x then
                Ok x
            else if valor < x then
                buscarEnBST valor izq
            else
                buscarEnBST valor der

-- 26. Validar BST con Result (con mensaje explicativo)
validarBST : Tree comparable -> Result String (Tree comparable)
validarBST arbol =
    let
        validarConRango min max arbolInterno =
            case arbolInterno of
                Empty ->
                    Ok arbolInterno

                Node x izq der ->
                    case (min, max) of
                        (Just minVal, Just maxVal) ->
                            if x <= minVal then
                                Err ("Nodo con valor " ++ String.fromInt x ++ " viola la propiedad BST: debe ser mayor que " ++ String.fromInt minVal)
                            else if x >= maxVal then
                                Err ("Nodo con valor " ++ String.fromInt x ++ " viola la propiedad BST: debe ser menor que " ++ String.fromInt maxVal)
                            else
                                case validarConRango min (Just x) izq of
                                    Err msg ->
                                        Err msg

                                    Ok _ ->
                                        validarConRango (Just x) max der

                        (Just minVal, Nothing) ->
                            if x <= minVal then
                                Err ("Nodo con valor " ++ String.fromInt x ++ " viola la propiedad BST: debe ser mayor que " ++ String.fromInt minVal)
                            else
                                case validarConRango min (Just x) izq of
                                    Err msg ->
                                        Err msg

                                    Ok _ ->
                                        validarConRango (Just x) max der

                        (Nothing, Just maxVal) ->
                            if x >= maxVal then
                                Err ("Nodo con valor " ++ String.fromInt x ++ " viola la propiedad BST: debe ser menor que " ++ String.fromInt maxVal)
                            else
                                case validarConRango min (Just x) izq of
                                    Err msg ->
                                        Err msg

                                    Ok _ ->
                                        validarConRango (Just x) max der

                        (Nothing, Nothing) ->
                            case validarConRango min (Just x) izq of
                                Err msg ->
                                    Err msg

                                Ok _ ->
                                    validarConRango (Just x) max der
    in
    case validarConRango Nothing Nothing arbol of
        Ok _ ->
            Ok arbol

        Err msg ->
            Err msg

-- Parte 4: Combinando Maybe y Result
-- 27. Convertir Maybe a Result
maybeAResult : String -> Maybe a -> Result String a
maybeAResult mensaje maybeValor =
    case maybeValor of
        Nothing ->
            Err mensaje

        Just valor ->
            Ok valor

-- 28. Convertir Result a Maybe
resultAMaybe : Result error value -> Maybe value
resultAMaybe resultado =
    case resultado of
        Err _ ->
            Nothing

        Ok valor ->
            Just valor

-- 29. Buscar y Validar Positivo
buscarPositivo : Int -> Tree Int -> Result String Int
buscarPositivo valor arbol =
    buscar valor arbol
        |> maybeAResult ("El valor " ++ String.fromInt valor ++ " no se encuentra en el árbol")
        |> Result.andThen
            (\x ->
                if x > 0 then
                    Ok x
                else
                    Err ("El valor " ++ String.fromInt x ++ " no es positivo")
            )

-- 30. Pipeline de Validaciones sobre un árbol
validarArbol : Tree Int -> Result String (Tree Int)
validarArbol arbol =
    validarNoVacio arbol
        |> Result.andThen validarBST
        |> Result.andThen
            (\a ->
                if todosPositivos a then
                    Ok a
                else
                    Err "El árbol contiene valores negativos"
            )

-- Función auxiliar para ver si todos los valores son positivos
todosPositivos : Tree Int -> Bool
todosPositivos arbol =
    case arbol of
        Empty ->
            True

        Node x izq der ->
            x > 0 && todosPositivos izq && todosPositivos der

-- 31. Encadenar Búsquedas entre dos árboles
buscarEnDosArboles : Int -> Tree Int -> Tree Int -> Result String Int
buscarEnDosArboles valor arbol1 arbol2 =
    buscarPositivo valor arbol1
        |> Result.andThen (\resultado -> buscarPositivo resultado arbol2)


-- Parte 5: Desafíos Avanzados
-- 32. Recorrido Inorder
inorder : Tree a -> List a
inorder arbol =
    case arbol of
        Empty ->
            []

        Node x izq der ->
            inorder izq ++ [x] ++ inorder der

-- 33. Recorrido Preorder
preorder : Tree a -> List a
preorder arbol =
    case arbol of
        Empty ->
            []

        Node x izq der ->
            [x] ++ preorder izq ++ preorder der

-- 34. Recorrido Postorder
postorder : Tree a -> List a
postorder arbol =
    case arbol of
        Empty ->
            []

        Node x izq der ->
            postorder izq ++ postorder der ++ [x]

-- 35. Map sobre el Árbol
mapArbol : (a -> b) -> Tree a -> Tree b
mapArbol f arbol =
    case arbol of
        Empty ->
            Empty

        Node x izq der ->
            Node (f x) (mapArbol f izq) (mapArbol f der)

-- 36. Filter sobre Árbol
filterArbol : (a -> Bool) -> Tree a -> Tree a
filterArbol pred arbol =
    case arbol of
        Empty ->
            Empty

        Node x izq der ->
            let
                izqFiltrado = filterArbol pred izq
                derFiltrado = filterArbol pred der
            in
            if pred x then
                Node x izqFiltrado derFiltrado
            else
                if izqFiltrado /= Empty then
                    izqFiltrado
                else
                    derFiltrado

-- 37. Fold sobre el Árbol
foldArbol : (a -> b -> b) -> b -> Tree a -> b
foldArbol f acumulador arbol =
    case arbol of
        Empty ->
            acumulador

        Node x izq der ->
            foldArbol f (f x (foldArbol f acumulador der)) izq

-- 38. Eliminar de BST
eliminarBST : comparable -> Tree comparable -> Result String (Tree comparable)
eliminarBST valor arbol =
    case arbol of
        Empty ->
            Err ("El valor " ++ String.fromInt valor ++ " no existe en el árbol")

        Node x izq der ->
            if valor < x then
                eliminarBST valor izq
                    |> Result.map (\nuevoIzq -> Node x nuevoIzq der)

            else if valor > x then
                eliminarBST valor der
                    |> Result.map (\nuevoDer -> Node x izq nuevoDer)

            else
                case (izq, der) of
                    (Empty, Empty) ->
                        Ok Empty

                    (Empty, _) ->
                        Ok der

                    (_, Empty) ->
                        Ok izq

                    _ ->
                        case encontrarMinimo der of
                            Just minVal ->
                                eliminarBST minVal der
                                    |> Result.map (\nuevoDer -> Node minVal izq nuevoDer)

                            Nothing ->
                                Err "Error interno: no se pudo encontrar el mínimo"

-- 39. Construir BST desde Lista
desdeListaBST : List comparable -> Result String (Tree comparable)
desdeListaBST lista =
    List.foldl
        (\v acc ->
            acc
                |> Result.andThen (\a -> insertarBST v a)
        )
        (Ok Empty)
        lista

-- 40. Verificar Balance
estaBalanceado : Tree a -> Bool
estaBalanceado arbol =
    case arbol of
        Empty ->
            True

        Node _ izq der ->
            let
                dif = abs (altura izq - altura der)
            in
            dif <= 1 && estaBalanceado izq && estaBalanceado der

-- 41. Balancear BST
balancear : Tree comparable -> Tree comparable
balancear arbol =
    let
        listaOrdenada = inorder arbol
    in
    construirBalanceado listaOrdenada

construirBalanceado : List comparable -> Tree comparable
construirBalanceado lista =
    case lista of
        [] ->
            Empty

        _ ->
            let
                mitad = List.length lista // 2
                (izq, resto) = List.splitAt mitad lista
            in
            case resto of
                [] ->
                    Empty

                x :: der ->
                    Node x (construirBalanceado izq) (construirBalanceado der)


-- Path Finding
-- 42. Camino a un Valor
type Direccion = Izquierda | Derecha

encontrarCamino : comparable -> Tree comparable -> Result String (List Direccion)
encontrarCamino valor arbol =
    case arbol of
        Empty ->
            Err ("El valor " ++ String.fromInt valor ++ " no existe en el árbol")

        Node x izq der ->
            if valor == x then
                Ok []

            else if valor < x then
                encontrarCamino valor izq
                    |> Result.map (\camino -> Izquierda :: camino)

            else
                encontrarCamino valor der
                    |> Result.map (\camino -> Derecha :: camino)

-- 43. Seguir Camino
seguirCamino : List Direccion -> Tree a -> Result String a
seguirCamino direcciones arbol =
    case (direcciones, arbol) of
        (_, Empty) ->
            Err "Camino inválido: árbol vacío"

        ([], Node x _ _) ->
            Ok x

        (Izquierda :: resto, Node _ izq _) ->
            seguirCamino resto izq

        (Derecha :: resto, Node _ _ der) ->
            seguirCamino resto der

-- 44. Ancestro Común Más Cercano (en BST)
ancestroComun : comparable -> comparable -> Tree comparable -> Result String comparable
ancestroComun v1 v2 arbol =
    case arbol of
        Empty ->
            Err "El árbol está vacío"

        Node x izq der ->
            if v1 < x && v2 < x then
                ancestroComun v1 v2 izq

            else if v1 > x && v2 > x then
                ancestroComun v1 v2 der

            else
                Ok x