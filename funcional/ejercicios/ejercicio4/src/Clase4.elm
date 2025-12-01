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

        Node valor Empty Empty ->
            valor

        Node valor izq der ->
            min valor (min (minimo izq) (minimo der))



-- 10. Valor Máximo (sin Maybe)


maximo : Tree Int -> Int
maximo arbol =
    case arbol of
        Empty ->
            0

        Node valor Empty Empty ->
            valor

        Node valor izq der ->
            max valor (max (maximo izq) (maximo der))



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

        Node valor Empty Empty ->
            Just valor

        Node valor izq der ->
            case ( encontrarMinimo izq, encontrarMinimo der ) of
                ( Nothing, Nothing ) ->
                    Just valor

                ( Just minIzq, Nothing ) ->
                    Just (min valor minIzq)

                ( Nothing, Just minDer ) ->
                    Just (min valor minDer)

                ( Just minIzq, Just minDer ) ->
                    Just (min valor (min minIzq minDer))



-- 13. Encontrar Máximo (con Maybe)


encontrarMaximo : Tree comparable -> Maybe comparable
encontrarMaximo arbol =
    case arbol of
        Empty ->
            Nothing

        Node valor Empty Empty ->
            Just valor

        Node valor izq der ->
            case ( encontrarMaximo izq, encontrarMaximo der ) of
                ( Nothing, Nothing ) ->
                    Just valor

                ( Just maxIzq, Nothing ) ->
                    Just (max valor maxIzq)

                ( Nothing, Just maxDer ) ->
                    Just (max valor maxDer)

                ( Just maxIzq, Just maxDer ) ->
                    Just (max valor (max maxIzq maxDer))



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

        Node valor _ _ ->
            Just valor



-- 16. Obtener Hijo Izquierdo


hijoIzquierdo : Tree a -> Maybe (Tree a)
hijoIzquierdo arbol =
    case arbol of
        Empty ->
            Nothing

        Node _ Empty _ ->
            Nothing

        Node _ izq _ ->
            Just izq


hijoDerecho : Tree a -> Maybe (Tree a)
hijoDerecho arbol =
    case arbol of
        Empty ->
            Nothing

        Node _ _ Empty ->
            Nothing

        Node _ _ der ->
            Just der



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

        Node valor _ _ ->
            Ok valor



-- 21. Dividir en Valor Raíz y Subárboles


dividir : Tree a -> Result String ( a, Tree a, Tree a )
dividir arbol =
    case arbol of
        Empty ->
            Err "No se puede dividir un árbol vacío"

        Node valor izq der ->
            Ok ( valor, izq, der )



-- 22. Obtener Mínimo con Error


obtenerMinimo : Tree comparable -> Result String comparable
obtenerMinimo arbol =
    case encontrarMinimo arbol of
        Nothing ->
            Err "No hay mínimo en un árbol vacío"

        Just minVal ->
            Ok minVal



-- 23. Verificar si es BST


esBST : Tree comparable -> Bool
esBST arbol =
    esBSTHelper Nothing Nothing arbol


esBSTHelper : Maybe comparable -> Maybe comparable -> Tree comparable -> Bool
esBSTHelper minVal maxVal arbol =
    case arbol of
        Empty ->
            True

        Node valor izq der ->
            let
                validoMin =
                    case minVal of
                        Nothing ->
                            True

                        Just valorMinimo ->
                            valor > valorMinimo

                validoMax =
                    case maxVal of
                        Nothing ->
                            True

                        Just valorMaximo ->
                            valor < valorMaximo
            in
            validoMin
                && validoMax
                && esBSTHelper minVal (Just valor) izq
                && esBSTHelper (Just valor) maxVal der



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
                insertarBST valor izq
                    |> Result.map (\nuevoIzq -> Node v nuevoIzq der)

            else
                insertarBST valor der
                    |> Result.map (\nuevoDer -> Node v izq nuevoDer)



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
        Nothing ->
            Err mensajeError

        Just valor ->
            Ok valor



-- 28. Result a Maybe


resultAMaybe : Result error value -> Maybe value
resultAMaybe result =
    case result of
        Err _ ->
            Nothing

        Ok valor ->
            Just valor



-- 29. Buscar y Validar


buscarPositivo : Int -> Tree Int -> Result String Int
buscarPositivo valor arbol =
    buscar valor arbol
        |> maybeAResult "El valor no se encuentra en el árbol"
        |> Result.andThen
            (\v ->
                if v > 0 then
                    Ok v

                else
                    Err "El valor no es positivo"
            )



-- 30. Pipeline de Validaciones


validarArbol : Tree Int -> Result String (Tree Int)
validarArbol arbol =
    validarNoVacio arbol
        |> Result.andThen validarBST
        |> Result.andThen
            (\a ->
                if tamano a >= 3 then
                    Ok a

                else
                    Err "El árbol debe tener al menos 3 elementos"
            )



-- 31. Encadenar Búsquedas


buscarEnDosArboles : Int -> Tree Int -> Tree Int -> Result String Int
buscarEnDosArboles valor arbol1 arbol2 =
    case buscar valor arbol1 of
        Just v ->
            Ok v

        Nothing ->
            buscar valor arbol2
                |> maybeAResult "El valor no se encuentra en ninguno de los árboles"



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
                izqFiltrado =
                    filterArbol predicado izq

                derFiltrado =
                    filterArbol predicado der
            in
            if predicado valor then
                Node valor izqFiltrado derFiltrado

            else
                combinarArboles izqFiltrado derFiltrado


combinarArboles : Tree a -> Tree a -> Tree a
combinarArboles izq der =
    case ( izq, der ) of
        ( Empty, _ ) ->
            der

        ( _, Empty ) ->
            izq

        ( Node vIzq izqIzq derIzq, _ ) ->
            Node vIzq izqIzq (combinarArboles derIzq der)



-- 37. Fold sobre Árbol


foldArbol : (a -> b -> b) -> b -> Tree a -> b
foldArbol funcion acumulador arbol =
    case arbol of
        Empty ->
            acumulador

        Node valor izq der ->
            let
                acumIzq =
                    foldArbol funcion acumulador izq

                acumValor =
                    funcion valor acumIzq
            in
            foldArbol funcion acumValor der



-- 38. Eliminar de BST


eliminarBST : comparable -> Tree comparable -> Result String (Tree comparable)
eliminarBST valor arbol =
    case arbol of
        Empty ->
            Err "El valor no existe en el árbol"

        Node v izq der ->
            if valor < v then
                eliminarBST valor izq
                    |> Result.map (\nuevoIzq -> Node v nuevoIzq der)

            else if valor > v then
                eliminarBST valor der
                    |> Result.map (\nuevoDer -> Node v izq nuevoDer)

            else
                -- Encontramos el nodo a eliminar
                case ( izq, der ) of
                    ( Empty, Empty ) ->
                        Ok Empty

                    ( Empty, _ ) ->
                        Ok der

                    ( _, Empty ) ->
                        Ok izq

                    ( _, _ ) ->
                        -- Tiene dos hijos: reemplazar con el mínimo del subárbol derecho
                        case encontrarMinimo der of
                            Nothing ->
                                Err "Error interno"

                            Just minDer ->
                                eliminarBST minDer der
                                    |> Result.map (\nuevoDer -> Node minDer izq nuevoDer)



-- 39. Construir BST desde Lista


desdeListaBST : List comparable -> Result String (Tree comparable)
desdeListaBST lista =
    desdeListaBSTHelper lista Empty


desdeListaBSTHelper : List comparable -> Tree comparable -> Result String (Tree comparable)
desdeListaBSTHelper lista arbol =
    case lista of
        [] ->
            Ok arbol

        x :: xs ->
            insertarBST x arbol
                |> Result.andThen (desdeListaBSTHelper xs)



-- 40. Verificar Balance


estaBalanceado : Tree a -> Bool
estaBalanceado arbol =
    case arbol of
        Empty ->
            True

        Node _ izq der ->
            let
                alturaIzq =
                    altura izq

                alturaDer =
                    altura der

                diferencia =
                    abs (alturaIzq - alturaDer)
            in
            diferencia <= 1 && estaBalanceado izq && estaBalanceado der



-- 41. Balancear BST


balancear : Tree comparable -> Tree comparable
balancear arbol =
    let
        lista =
            inorder arbol
                |> List.sort
    in
    desdeListaOrdenada lista


desdeListaOrdenada : List comparable -> Tree comparable
desdeListaOrdenada lista =
    case lista of
        [] ->
            Empty

        _ ->
            let
                medio =
                    List.length lista // 2

                elementoMedio =
                    case List.drop medio lista |> List.head of
                        Just elem ->
                            elem

                        Nothing ->
                            case List.head lista of
                                Just primero ->
                                    primero

                                Nothing ->
                                    Debug.todo "Lista vacía inesperada"

                izquierda =
                    List.take medio lista

                derecha =
                    List.drop (medio + 1) lista
            in
            Node elementoMedio (desdeListaOrdenada izquierda) (desdeListaOrdenada derecha)



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
                    Ok caminoIzq ->
                        Ok (Izquierda :: caminoIzq)

                    Err _ ->
                        case encontrarCamino valor der of
                            Ok caminoDer ->
                                Ok (Derecha :: caminoDer)

                            Err _ ->
                                Err "El valor no existe en el árbol"



-- 43. Seguir Camino


seguirCamino : List Direccion -> Tree a -> Result String a
seguirCamino camino arbol =
    case camino of
        [] ->
            case arbol of
                Empty ->
                    Err "Camino inválido"

                Node valor _ _ ->
                    Ok valor

        dir :: resto ->
            case arbol of
                Empty ->
                    Err "Camino inválido"

                Node _ izq der ->
                    case dir of
                        Izquierda ->
                            seguirCamino resto izq

                        Derecha ->
                            seguirCamino resto der



-- 44. Ancestro Común Más Cercano


ancestroComun : comparable -> comparable -> Tree comparable -> Result String comparable
ancestroComun valor1 valor2 arbol =
    if not (contiene valor1 arbol && contiene valor2 arbol) then
        Err "Uno o ambos valores no existen en el árbol"

    else
        case ancestroComunHelper valor1 valor2 arbol of
            Nothing ->
                Err "No se encontró ancestro común"

            Just anc ->
                Ok anc


ancestroComunHelper : comparable -> comparable -> Tree comparable -> Maybe comparable
ancestroComunHelper valor1 valor2 arbol =
    case arbol of
        Empty ->
            Nothing

        Node v izq der ->
            let
                izqContiene1 =
                    contiene valor1 izq

                izqContiene2 =
                    contiene valor2 izq

                derContiene1 =
                    contiene valor1 der

                derContiene2 =
                    contiene valor2 der
            in
            if (izqContiene1 && derContiene2) || (izqContiene2 && derContiene1) || (v == valor1 && (izqContiene2 || derContiene2)) || (v == valor2 && (izqContiene1 || derContiene1)) then
                Just v

            else if izqContiene1 && izqContiene2 then
                ancestroComunHelper valor1 valor2 izq

            else
                ancestroComunHelper valor1 valor2 der



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
        lista =
            inorder arbol
    in
    if posicion < 0 || posicion >= List.length lista then
        Err "Posición inválida"

    else
        List.drop posicion lista
            |> List.head
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
    desdeListaOrdenada (List.sort lista)
