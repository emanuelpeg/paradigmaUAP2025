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

        Node _ izquierda derecha ->
            1 + tamano izquierda + tamano derecha


-- 5. Altura del Árbol


altura : Tree a -> Int
altura arbol =
    case arbol of
        Empty ->
            0

        Node _ izquierda derecha ->
            1 + max (altura izquierda) (altura derecha)


-- 6. Suma de Valores


sumarArbol : Tree Int -> Int
sumarArbol arbol =
    case arbol of
        Empty ->
            0

        Node valor izquierda derecha ->
            valor + sumarArbol izquierda + sumarArbol derecha


-- 7. Contiene Valor


contiene : a -> Tree a -> Bool
contiene valor arbol =
    case arbol of
        Empty ->
            False

        Node actual izquierda derecha ->
            if valor == actual then
                True
            else
                contiene valor izquierda || contiene valor derecha


-- 8. Contar Hojas


contarHojas : Tree a -> Int
contarHojas arbol =
    case arbol of
        Empty ->
            0

        Node _ Empty Empty ->
            1

        Node _ izquierda derecha ->
            contarHojas izquierda + contarHojas derecha


-- 9. Valor Mínimo (sin Maybe)


minimo : Tree Int -> Int
minimo arbol =
    case arbol of
        Empty ->
            0

        Node valor Empty Empty ->
            valor

        Node valor izquierda derecha ->
            let
                minIzq = minimo izquierda
                minDer = minimo derecha
            in
            List.minimum [ valor, minIzq, minDer ]
                |> Maybe.withDefault valor


-- 10. Valor Máximo (sin Maybe)


maximo : Tree Int -> Int
maximo arbol =
    case arbol of
        Empty ->
            0

        Node valor Empty Empty ->
            valor

        Node valor izquierda derecha ->
            Maybe.withDefault valor (List.maximum [ valor, maximo izquierda, maximo derecha ])


-- ============================================================================
-- PARTE 2: INTRODUCCIÓN A MAYBE
-- ============================================================================
-- 11. Buscar Valor


buscar : a -> Tree a -> Maybe a
buscar valor arbol =
    case arbol of
        Empty ->
            Nothing

        Node actual izquierda derecha ->
            if valor == actual then
                Just actual
            else
                case buscar valor izquierda of
                    Just encontrado ->
                        Just encontrado

                    Nothing ->
                        buscar valor derecha


-- 12. Encontrar Mínimo (con Maybe)


encontrarMinimo : Tree comparable -> Maybe comparable
encontrarMinimo arbol =
    case arbol of
        Empty ->
            Nothing

        Node valor Empty Empty ->
            Just valor

        Node valor izquierda derecha ->
            let
                minIzq = encontrarMinimo izquierda
                minDer = encontrarMinimo derecha

                -- función auxiliar para obtener el mínimo de dos Maybe
                minConMaybe a b =
                    case (a, b) of
                        (Just x, Just y) ->
                            Just (min x y)

                        (Just x, Nothing) ->
                            Just x

                        (Nothing, Just y) ->
                            Just y

                        (Nothing, Nothing) ->
                            Nothing
            in
            minConMaybe (Just valor) (minConMaybe minIzq minDer)


-- 13. Encontrar Máximo (con Maybe)


encontrarMaximo : Tree comparable -> Maybe comparable
encontrarMaximo arbol =
    case arbol of
        Empty ->
            Nothing

        Node valor Empty Empty ->
            Just valor

        Node valor izquierda derecha ->
            let
                maxIzq = encontrarMaximo izquierda
                maxDer = encontrarMaximo derecha

                -- función auxiliar para obtener el máximo de dos Maybe
                maxConMaybe a b =
                    case (a, b) of
                        (Just x, Just y) ->
                            Just (max x y)

                        (Just x, Nothing) ->
                            Just x

                        (Nothing, Just y) ->
                            Just y

                        (Nothing, Nothing) ->
                            Nothing
            in
            maxConMaybe (Just valor) (maxConMaybe maxIzq maxDer)


-- 14. Buscar Por Predicado


buscarPor : (a -> Bool) -> Tree a -> Maybe a
buscarPor predicado arbol =
    case arbol of
        Empty ->
            Nothing

        Node valor izquierda derecha ->
            if predicado valor then
                Just valor
            else
                case buscarPor predicado izquierda of
                    Just encontrado ->
                        Just encontrado

                    Nothing ->
                        buscarPor predicado derecha


-- 15. Obtener Valor de Raíz


raiz : Tree a -> Maybe a
raiz arbol =
    case arbol of
        Empty ->
            Nothing

        Node valor _ _ ->
            Just valor


-- 16. Obtener Hijo Izquierdo


hijoIzquierdo : Tree a -> Maybe (Tree a)
hijoIzquierdo arbol =
    case arbol of
        Empty ->
            Nothing

        Node _ izquierda _ ->
            Just izquierda


hijoDerecho : Tree a -> Maybe (Tree a)
hijoDerecho arbol =
    case arbol of
        Empty ->
            Nothing

        Node _ _ derecha ->
            Just derecha


-- 17. Obtener Nieto


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

        Node actual izquierda derecha ->
            if valor == actual then
                Just arbol
            else
                case obtenerSubarbol valor izquierda of
                    Just sub ->
                        Just sub

                    Nothing ->
                        obtenerSubarbol valor derecha


buscarEnSubarbol : a -> a -> Tree a -> Maybe a
buscarEnSubarbol valor1 valor2 arbol =
    obtenerSubarbol valor1 arbol
        |> Maybe.andThen (\subArbol -> buscar valor2 subArbol)


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

        Node valor _ _ ->
            Ok valor


-- 21. Dividir en Valor Raíz y Subárboles


dividir : Tree a -> Result String ( a, Tree a, Tree a )
dividir arbol =
    case arbol of
        Empty ->
            Err "No se puede dividir un árbol vacío"

        Node valor izquierda derecha ->
            Ok ( valor, izquierda, derecha )


-- 22. Obtener Mínimo con Error


obtenerMinimo : Tree comparable -> Result String comparable
obtenerMinimo arbol =
    case arbol of
        Empty ->
            Err "No hay mínimo en un árbol vacío"

        Node valor Empty Empty ->
            Ok valor

        Node valor izquierda derecha ->
            let
                minIzq = obtenerMinimo izquierda
                minDer = obtenerMinimo derecha
            in
            case (minIzq, minDer) of
                (Ok a, Ok b) ->
                    Ok (min valor (min a b))

                (Ok a, Err _) ->
                    Ok (min valor a)

                (Err _, Ok b) ->
                    Ok (min valor b)

                (Err _, Err _) ->
                    Ok valor

-- 23. Verificar si es BST


esBST : Tree comparable -> Bool
esBST tree =
    esBSTConLimites tree Nothing Nothing


-- Función auxiliar con límites opcionales (Nothing significa sin límite)
esBSTConLimites : Tree comparable -> Maybe comparable -> Maybe comparable -> Bool
esBSTConLimites tree min max =
    case tree of
        Empty ->
            True

        Node valor izq der ->
            let
                -- Verificamos si el valor está dentro de los límites
                dentroDeLimites =
                    case (min, max) of
                        (Just minLimit, Just maxLimit) ->
                            valor > minLimit && valor < maxLimit

                        (Just minLimit, Nothing) ->
                            valor > minLimit

                        (Nothing, Just maxLimit) ->
                            valor < maxLimit

                        (Nothing, Nothing) ->
                            True
            in
            -- El valor debe estar dentro de los límites
            -- y ambos subárboles deben ser BST válidos
            dentroDeLimites
                && esBSTConLimites izq min (Just valor)
                && esBSTConLimites der (Just valor) max

{-
ej1 = Node 5 (Node 3 Empty Empty) (Node 7 Empty Empty)
-- esBST ej1 == True

ej2 = Node 5 (Node 7 Empty Empty) (Node 3 Empty Empty)
-- esBST ej2 == False

-}


-- 24. Insertar en BST

insertarBST : comparable -> Tree comparable -> Result String (Tree comparable)
insertarBST valor tree =
    case tree of
        Empty ->
            Ok (Node valor Empty Empty)

        Node v izq der ->
            if valor == v then
                Err "El valor ya existe en el árbol"

            else if valor < v then
                case insertarBST valor izq of
                    Ok nuevoIzq ->
                        Ok (Node v nuevoIzq der)

                    Err msg ->
                        Err msg

            else
                case insertarBST valor der of
                    Ok nuevoDer ->
                        Ok (Node v izq nuevoDer)

                    Err msg ->
                        Err msg

{-
arbolPequeno =
    Node 3 (Node 1 Empty Empty) (Node 5 Empty Empty)

-- Caso exitoso
-- insertarBST 4 arbolPequeno ==
-- Ok (Node 3 (Node 1 Empty Empty) (Node 5 (Node 4 Empty Empty) Empty))

-- Caso de error
-- insertarBST 3 arbolPequeno ==
-- Err "El valor 3 ya existe en el árbol"
-}


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

{-
arbolEjemplo =
    Node 5 (Node 3 (Node 1 Empty Empty) (Node 4 Empty Empty)) (Node 7 Empty Empty)

-- buscarEnBST 4 arbolEjemplo == Ok 4
-- buscarEnBST 10 arbolEjemplo == Err "El valor no se encuentra en el árbol"

-}

-- 26. Validar BST con Result


validarBST : Tree comparable -> Result String (Tree comparable)
validarBST arbol =
    if esBSTConLimites arbol Nothing Nothing then
        Ok arbol
    else
        Err "El árbol no es un BST válido"


{-
bstValido =
    Node 5 (Node 3 Empty Empty) (Node 7 Empty Empty)

bstInvalido =
    Node 5 (Node 7 Empty Empty) (Node 3 Empty Empty)

-- validarBST bstValido == Ok bstValido
-- validarBST bstInvalido == Err "El árbol no es un BST válido"

-}


-- ============================================================================
-- PARTE 4: COMBINANDO MAYBE Y RESULT
-- ============================================================================
-- 27. Maybe a Result


maybeAResult : String -> Maybe a -> Result String a
maybeAResult mensajeError maybe =
    case maybe of
        Just valor ->
            Ok valor

        Nothing ->
            Err mensajeError

{-
maybeAResult "No existe valor" (Just 10) == Ok 10
maybeAResult "No existe valor" Nothing == Err "No existe valor"

-}


-- 28. Result a Maybe


resultAMaybe : Result error value -> Maybe value
resultAMaybe result =
    case result of
        Ok valor ->
            Just valor

        Err _ ->
            Nothing

{-
resultAMaybe (Ok 5) == Just 5
resultAMaybe (Err "falló") == Nothing

-}


-- 29. Buscar y Validar


buscarPositivo : Int -> Tree Int -> Result String Int
buscarPositivo valor arbol =
    case buscarEnBST valor arbol of
        Ok v ->
            if v > 0 then
                Ok v
            else
                Err "El valor es negativo o cero"

        Err msg ->
            Err msg



{-
arbolEjemplo =
    Node 5 (Node 2 (Node (-3) Empty Empty) (Node 4 Empty Empty)) (Node 7 Empty Empty)

-- buscarPositivo 4 arbolEjemplo == Ok 4
-- buscarPositivo (-3) arbolEjemplo == Err "El valor es negativo o cero"
-- buscarPositivo 10 arbolEjemplo == Err "El valor no se encuentra en el árbol"

-}
-- 30. Pipeline de Validaciones
validarArbol : Tree Int -> Result String (Tree Int)
validarArbol arbol =
    validarBST arbol
        |> Result.andThen (\_ -> validarPositivos arbol)



validarPositivos : Tree Int -> Result String (Tree Int)
validarPositivos arbol =
    if existePositivo arbol then
        Ok arbol
    else
        Err "El árbol no contiene valores positivos"


existePositivo : Tree Int -> Bool
existePositivo arbol =
    case arbol of
        Empty ->
            False
        Node v izq der ->
            v > 0 || existePositivo izq || existePositivo der



-- 31. Encadenar Búsquedas
buscarEnDosArboles : Int -> Tree Int -> Tree Int -> Result String Int
buscarEnDosArboles valor arbol1 arbol2 =
    case buscarEnBST valor arbol1 of
        Ok v ->
            Ok v

        Err _ ->
            buscarEnBST valor arbol2
                |> Result.mapError (\_ -> "Búsqueda fallida")


-- ============================================================================
-- PARTE 5: DESAFÍOS AVANZADOS
-- ============================================================================
-- 32. Recorrido Inorder


inorder : Tree a -> List a
inorder arbol =
    case arbol of
        Empty ->
            []

        Node valor izq der ->
            inorder izq ++ [ valor ] ++ inorder der


-- 33. Recorrido Preorder

preorder : Tree a -> List a
preorder arbol =
    case arbol of
        Empty ->
            []

        Node valor izq der ->
            [ valor ] ++ preorder izq ++ preorder der


-- 34. Recorrido Postorder


postorder : Tree a -> List a
postorder arbol =
    case arbol of
        Empty ->
            []
        Node valor izq der ->
            postorder izq ++ postorder der ++ [ valor ]



-- 35. Map sobre Árbol


mapArbol : (a -> b) -> Tree a -> Tree b
mapArbol funcion arbol =
    case arbol of
        Empty ->
            Empty
        Node valor izq der ->
            Node (funcion valor) (mapArbol funcion izq) (mapArbol funcion der)


-- 36. Filter sobre Árbol

filterArbol : (a -> Bool) -> Tree a -> Tree a
filterArbol predicado arbol =
    case arbol of
        Empty ->
            Empty
        Node valor izq der ->
            let
                izqFiltrado = filterArbol predicado izq
                derFiltrado = filterArbol predicado der
            in
            if predicado valor then
                Node valor izqFiltrado derFiltrado
            else
                -- unir subárboles filtrados para no perder sus nodos válidos
                case (izqFiltrado, derFiltrado) of
                    (Empty, Empty) ->
                        Empty
                    (izqF, Empty) ->
                        izqF
                    (Empty, derF) ->
                        derF
                    (izqF, derF) ->
                        Node valor izqF derF

-- 37. Fold sobre Árbol


foldArbol : (a -> b -> b) -> b -> Tree a -> b
foldArbol funcion acumulador arbol =
    case arbol of
        Empty ->
            acumulador
        Node valor izq der ->
            let
                acumIzq = foldArbol funcion acumulador izq
                acumDer = foldArbol funcion acumIzq der
            in
            funcion valor acumDer


-- 38. Eliminar de BST

eliminarBST : comparable -> Tree comparable -> Result String (Tree comparable)
eliminarBST valor arbol =
    case arbol of
        Empty ->
            Err "El valor no existe en el árbol"

        Node v izq der ->
            if valor < v then
                case eliminarBST valor izq of
                    Ok nuevoIzq ->
                        Ok (Node v nuevoIzq der)
                    Err msg ->
                        Err msg

            else if valor > v then
                case eliminarBST valor der of
                    Ok nuevoDer ->
                        Ok (Node v izq nuevoDer)
                    Err msg ->
                        Err msg

            else
                -- Caso encontrado: eliminar nodo
                case (izq, der) of
                    (Empty, Empty) ->
                        Ok Empty

                    (Empty, _) ->
                        Ok der

                    (_, Empty) ->
                        Ok izq

                    (_, _) ->
                        let
                            (minValor, nuevoDer) = eliminarMinimo der
                        in
                        Ok (Node minValor izq nuevoDer)


-- Función auxiliar: elimina el nodo mínimo y lo devuelve junto al nuevo árbol
eliminarMinimo : Tree comparable -> (comparable, Tree comparable)
eliminarMinimo arbol =
    case arbol of
        Node v Empty der ->
            (v, der)

        Node v izq der ->
            let
                (minValor, nuevoIzq) = eliminarMinimo izq
            in
            (minValor, Node v nuevoIzq der)

        Empty ->
            Debug.todo "No debería llamarse con árbol vacío"


-- 39. Construir BST desde Lista

desdeListaBST : List comparable -> Result String (Tree comparable)
desdeListaBST lista =
    List.foldl
        (\valor resultado ->
            case resultado of
                Err msg ->
                    Err msg

                Ok arbol ->
                    case insertarBST valor arbol of
                        Ok nuevoArbol ->
                            Ok nuevoArbol

                        Err _ ->
                            Err "Valor duplicado"
        )
        (Ok Empty)
        lista

-- 40. Verificar Balance
estaBalanceado : Tree a -> Bool
estaBalanceado arbol =
    case alturaYBalance arbol of
        Just _ ->
            True
        Nothing ->
            False


-- Devuelve Just altura si está balanceado, Nothing si no lo está
alturaYBalance : Tree a -> Maybe Int
alturaYBalance arbol =
    case arbol of
        Empty ->
            Just 0

        Node _ izq der ->
            case (alturaYBalance izq, alturaYBalance der) of
                (Just hIzq, Just hDer) ->
                    if abs (hIzq - hDer) <= 1 then
                        Just (1 + max hIzq hDer)
                    else
                        Nothing

                _ ->
                    Nothing
                    
-- 41. Balancear BST
balancear : Tree comparable -> Tree comparable
balancear arbol =
    let
        valoresOrdenados = inorder arbol
    in
    construirBalanceado valoresOrdenados


-- Función auxiliar: crea un árbol balanceado a partir de una lista ordenada
construirBalanceado : List comparable -> Tree comparable
construirBalanceado lista =
    case lista of
        [] ->
            Empty

        _ ->
            let
                len = List.length lista
                mitad = len // 2
                izq = List.take mitad lista
                resto = List.drop mitad lista
            in
            case resto of
                [] ->
                    Empty

                x :: der ->
                    Node x (construirBalanceado izq) (construirBalanceado der)



-- 42. Camino a un Valor


type Direccion
    = Izquierda
    | Derecha


encontrarCamino : comparable -> Tree comparable -> Result String (List Direccion)
encontrarCamino valor arbol =
    case arbol of
        Empty ->
            Err "El valor no existe en el árbol"

        Node v izq der ->
            if valor == v then
                Ok []
            else if valor < v then
                case encontrarCamino valor izq of
                    Ok camino ->
                        Ok (Izquierda :: camino)
                    Err _ ->
                        Err "El valor no existe en el árbol"
            else
                case encontrarCamino valor der of
                    Ok camino ->
                        Ok (Derecha :: camino)
                    Err _ ->
                        Err "El valor no existe en el árbol"

-- 43. Seguir Camino

seguirCamino : List Direccion -> Tree a -> Result String a
seguirCamino camino arbol =
    case (camino, arbol) of
        ([], Empty) ->
            Err "Camino inválido"

        ([], Node v _ _) ->
            Ok v

        (Izquierda :: resto, Node _ izq _) ->
            seguirCamino resto izq

        (Derecha :: resto, Node _ _ der) ->
            seguirCamino resto der

        (_, Empty) ->
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

esBSTValido : Tree comparable -> Bool
esBSTValido arbol =
    esBST arbol


estaBalanceadoCompleto : Tree comparable -> Bool
estaBalanceadoCompleto arbol =
    estaBalanceado arbol


contieneValor : comparable -> Tree comparable -> Bool
contieneValor valor arbol =
    case buscarEnBST valor arbol of
        Ok _ -> True
        Err _ -> False


-- Operaciones que retornan Maybe

buscarMaybe : comparable -> Tree comparable -> Maybe comparable
buscarMaybe valor arbol =
    case buscarEnBST valor arbol of
        Ok v -> Just v
        Err _ -> Nothing


encontrarMinimoMaybe : Tree comparable -> Maybe comparable
encontrarMinimoMaybe arbol =
    case arbol of
        Empty ->
            Nothing

        Node v Empty _ ->
            Just v

        Node _ izq _ ->
            encontrarMinimoMaybe izq


encontrarMaximoMaybe : Tree comparable -> Maybe comparable
encontrarMaximoMaybe arbol =
    case arbol of
        Empty ->
            Nothing

        Node v _ Empty ->
            Just v

        Node _ _ der ->
            encontrarMaximoMaybe der


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
        valor :: _ ->
            Ok valor

        [] ->
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
    construirBalanceado (List.sort lista)