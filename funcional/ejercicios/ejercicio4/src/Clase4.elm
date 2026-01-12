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

        Node _ _ _ ->
            False



-- 3. Es Hoja


esHoja : Tree a -> Bool
esHoja arbol =
    case arbol of
        Empty ->
            False

        Node _ izquierdo derecho ->
            esVacio izquierdo && esVacio derecho



-- ============================================================================
-- PARTE 1: PATTERN MATCHING CON ÁRBOLES
-- ============================================================================
-- 4. Tamaño del Árbol


tamano : Tree a -> Int
tamano arbol =
    case arbol of
        Empty ->
            0

        Node _ izquierdo derecho ->
            1 + tamano izquierdo + tamano derecho



-- 5. Altura del Árbol


altura : Tree a -> Int
altura arbol =
    case arbol of
        Empty ->
            0

        Node _ izquierdo derecho ->
            1 + max (altura izquierdo) (altura derecho)



-- 6. Suma de Valores


sumarArbol : Tree Int -> Int
sumarArbol arbol =
    case arbol of
        Empty ->
            0

        Node valor izquierdo derecho ->
            valor + sumarArbol izquierdo + sumarArbol derecho



-- 7. Contiene Valor


contiene : a -> Tree a -> Bool
contiene valor arbol =
    case arbol of
        Empty ->
            False

        Node v izquierdo derecho ->
            v == valor || contiene valor izquierdo || contiene valor derecho



-- 8. Contar Hojas


contarHojas : Tree a -> Int
contarHojas arbol =
    case arbol of
        Empty ->
            0

        Node _ izquierdo derecho ->
            if esHoja arbol then
                1

            else
                contarHojas izquierdo + contarHojas derecho



-- 9. Valor Mínimo (sin Maybe)


minimo : Tree Int -> Int
minimo arbol =
    case arbol of
        Empty ->
            0

        Node valor Empty Empty ->
            valor

        Node valor izquierdo Empty ->
            min valor (minimo izquierdo)

        Node valor Empty derecho ->
            min valor (minimo derecho)

        Node valor izquierdo derecho ->
            min valor (min (minimo izquierdo) (minimo derecho))



-- 10. Valor Máximo (sin Maybe)


maximo : Tree Int -> Int
maximo arbol =
    case arbol of
        Empty ->
            0

        Node valor Empty Empty ->
            valor

        Node valor izquierdo Empty ->
            max valor (maximo izquierdo)

        Node valor Empty derecho ->
            max valor (maximo derecho)

        Node valor izquierdo derecho ->
            max valor (max (maximo izquierdo) (maximo derecho))



-- ============================================================================
-- PARTE 2: INTRODUCCIÓN A MAYBE
-- ============================================================================
-- 11. Buscar Valor


buscar : a -> Tree a -> Maybe a
buscar valor arbol =
    case arbol of
        Empty ->
            Nothing

        Node v izquierdo derecho ->
            if v == valor then
                Just v

            else
                case buscar valor izquierdo of
                    Just encontrado ->
                        Just encontrado

                    Nothing ->
                        buscar valor derecho



-- 12. Encontrar Mínimo (con Maybe)


encontrarMinimo : Tree comparable -> Maybe comparable
encontrarMinimo arbol =
    case arbol of
        Empty ->
            Nothing

        Node valor Empty Empty ->
            Just valor

        Node valor izquierdo Empty ->
            Maybe.map (min valor) (encontrarMinimo izquierdo)

        Node valor Empty derecho ->
            Maybe.map (min valor) (encontrarMinimo derecho)

        Node valor izquierdo derecho ->
            case ( encontrarMinimo izquierdo, encontrarMinimo derecho ) of
                ( Nothing, Nothing ) ->
                    Just valor

                ( Just izqM, Nothing ) ->
                    Just (min valor izqM)

                ( Nothing, Just derM ) ->
                    Just (min valor derM)

                ( Just izqM, Just derM ) ->
                    Just (min valor (min izqM derM))



-- 13. Encontrar Máximo (con Maybe)


encontrarMaximo : Tree comparable -> Maybe comparable
encontrarMaximo arbol =
    case arbol of
        Empty ->
            Nothing

        Node valor Empty Empty ->
            Just valor

        Node valor izquierdo Empty ->
            Maybe.map (max valor) (encontrarMaximo izquierdo)

        Node valor Empty derecho ->
            Maybe.map (max valor) (encontrarMaximo derecho)

        Node valor izquierdo derecho ->
            case ( encontrarMaximo izquierdo, encontrarMaximo derecho ) of
                ( Nothing, Nothing ) ->
                    Just valor

                ( Just izqM, Nothing ) ->
                    Just (max valor izqM)

                ( Nothing, Just derM ) ->
                    Just (max valor derM)

                ( Just izqM, Just derM ) ->
                    Just (max valor (max izqM derM))



-- 14. Buscar Por Predicado


buscarPor : (a -> Bool) -> Tree a -> Maybe a
buscarPor predicado arbol =
    case arbol of
        Empty ->
            Nothing

        Node valor izquierdo derecho ->
            if predicado valor then
                Just valor

            else
                case buscarPor predicado izquierdo of
                    Just encontrado ->
                        Just encontrado

                    Nothing ->
                        buscarPor predicado derecho



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

        Node _ izquierdo _ ->
            Just izquierdo


hijoDerecho : Tree a -> Maybe (Tree a)
hijoDerecho arbol =
    case arbol of
        Empty ->
            Nothing

        Node _ _ derecho ->
            Just derecho



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

        Node v izquierdo derecho ->
            if v == valor then
                Just arbol

            else
                case obtenerSubarbol valor izquierdo of
                    Just subarbol ->
                        Just subarbol

                    Nothing ->
                        obtenerSubarbol valor derecho


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

        Node valor izquierdo derecho ->
            Ok ( valor, izquierdo, derecho )



-- 22. Obtener Mínimo con Error


obtenerMinimo : Tree comparable -> Result String comparable
obtenerMinimo arbol =
    case encontrarMinimo arbol of
        Just minimoValor ->
            Ok minimoValor

        Nothing ->
            Err "No hay mínimo en un árbol vacío"



-- 23. Verificar si es BST


esBST : Tree comparable -> Bool
esBST arbol =
    case arbol of
        Empty ->
            True

        Node valor izquierdo derecho ->
            let
                todosMenores subarbol =
                    case subarbol of
                        Empty ->
                            True

                        Node v _ _ ->
                            v < valor && todosMenores (hijoIzquierdo subarbol |> Maybe.withDefault Empty) && todosMenores (hijoDerecho subarbol |> Maybe.withDefault Empty)

                todosMayores subarbol =
                    case subarbol of
                        Empty ->
                            True

                        Node v _ _ ->
                            v > valor && todosMayores (hijoIzquierdo subarbol |> Maybe.withDefault Empty) && todosMayores (hijoDerecho subarbol |> Maybe.withDefault Empty)
            in
            todosMenores izquierdo && todosMayores derecho && esBST izquierdo && esBST derecho



-- 24. Insertar en BST


insertarBST : comparable -> Tree comparable -> Result String (Tree comparable)
insertarBST valor arbol =
    if contiene valor arbol then
        Err "El valor ya existe en el árbol"

    else
        Ok (insertarBSTHelper valor arbol)


insertarBSTHelper : comparable -> Tree comparable -> Tree comparable
insertarBSTHelper valor arbol =
    case arbol of
        Empty ->
            Node valor Empty Empty

        Node v izquierdo derecho ->
            if valor < v then
                Node v (insertarBSTHelper valor izquierdo) derecho

            else
                Node v izquierdo (insertarBSTHelper valor derecho)



-- 25. Buscar en BST


buscarEnBST : comparable -> Tree comparable -> Result String comparable
buscarEnBST valor arbol =
    case arbol of
        Empty ->
            Err "El valor no se encuentra en el árbol"

        Node v izquierdo derecho ->
            if valor == v then
                Ok v

            else if valor < v then
                buscarEnBST valor izquierdo

            else
                buscarEnBST valor derecho



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
        Just valor ->
            Ok valor

        Nothing ->
            Err mensajeError



-- 28. Result a Maybe


resultAMaybe : Result error value -> Maybe value
resultAMaybe result =
    case result of
        Ok valor ->
            Just valor

        Err _ ->
            Nothing



-- 29. Buscar y Validar


buscarPositivo : Int -> Tree Int -> Result String Int
buscarPositivo valor arbol =
    buscar valor arbol
        |> maybeAResult "El valor no se encuentra en el árbol"
        |> Result.andThen
            (\encontrado ->
                if encontrado > 0 then
                    Ok encontrado

                else
                    Err "El valor encontrado no es positivo"
            )



-- 30. Pipeline de Validaciones


validarArbol : Tree Int -> Result String (Tree Int)
validarArbol arbol =
    validarNoVacio arbol
        |> Result.andThen validarBST
        |> Result.andThen
            (\arbolValidado ->
                if todosPositivos arbolValidado then
                    Ok arbolValidado

                else
                    Err "El árbol contiene valores no positivos"
            )


todosPositivos : Tree Int -> Bool
todosPositivos arbol =
    case arbol of
        Empty ->
            True

        Node valor izquierdo derecho ->
            valor > 0 && todosPositivos izquierdo && todosPositivos derecho



-- 31. Encadenar Búsquedas


buscarEnDosArboles : Int -> Tree Int -> Tree Int -> Result String Int
buscarEnDosArboles valor arbol1 arbol2 =
    buscar valor arbol1
        |> maybeAResult "Valor no encontrado en el primer árbol"
        |> Result.andThen
            (\resultado ->
                buscar resultado arbol2
                    |> maybeAResult "Valor no encontrado en el segundo árbol"
            )



-- ============================================================================
-- PARTE 5: DESAFÍOS AVANZADOS
-- ============================================================================
-- 32. Recorrido Inorder


inorder : Tree a -> List a
inorder arbol =
    case arbol of
        Empty ->
            []

        Node valor izquierdo derecho ->
            inorder izquierdo ++ ( valor :: inorder derecho )



-- 33. Recorrido Preorder


preorder : Tree a -> List a
preorder arbol =
    case arbol of
        Empty ->
            []

        Node valor izquierdo derecho ->
            valor :: ( preorder izquierdo ++ preorder derecho )



-- 34. Recorrido Postorder


postorder : Tree a -> List a
postorder arbol =
    case arbol of
        Empty ->
            []

        Node valor izquierdo derecho ->
            postorder izquierdo ++ postorder derecho ++ [ valor ]



-- 35. Map sobre Árbol


mapArbol : (a -> b) -> Tree a -> Tree b
mapArbol funcion arbol =
    case arbol of
        Empty ->
            Empty

        Node valor izquierdo derecho ->
            Node (funcion valor) (mapArbol funcion izquierdo) (mapArbol funcion derecho)



-- 36. Filter sobre Árbol


filterArbol : (a -> Bool) -> Tree a -> Tree a
filterArbol predicado arbol =
    case arbol of
        Empty ->
            Empty

        Node valor izquierdo derecho ->
            if predicado valor then
                Node valor (filterArbol predicado izquierdo) (filterArbol predicado derecho)

            else
                Empty



-- 37. Fold sobre Árbol


foldArbol : (a -> b -> b) -> b -> Tree a -> b
foldArbol funcion acumulador arbol =
    case arbol of
        Empty ->
            acumulador

        Node valor izquierdo derecho ->
            let
                acumIzquierdo = foldArbol funcion acumulador izquierdo
                acumConValor = funcion valor acumIzquierdo
            in
            foldArbol funcion acumConValor derecho



-- 38. Eliminar de BST


eliminarBST : comparable -> Tree comparable -> Result String (Tree comparable)
eliminarBST valor arbol =
    if not (contiene valor arbol) then
        Err "El valor no existe en el árbol"

    else
        Ok (eliminarBSTHelper valor arbol)


eliminarBSTHelper : comparable -> Tree comparable -> Tree comparable
eliminarBSTHelper valor arbol =
    case arbol of
        Empty ->
            Empty

        Node v izquierdo derecho ->
            if valor < v then
                Node v (eliminarBSTHelper valor izquierdo) derecho

            else if valor > v then
                Node v izquierdo (eliminarBSTHelper valor derecho)

            else
                -- Encontramos el nodo a eliminar
                case ( izquierdo, derecho ) of
                    ( Empty, Empty ) ->
                        Empty

                    ( _, Empty ) ->
                        izquierdo

                    ( Empty, _ ) ->
                        derecho

                    ( _, _ ) ->
                        let
                            minimoDerecho =
                                encontrarMinimo derecho |> Maybe.withDefault v
                        in
                        Node minimoDerecho izquierdo (eliminarBSTHelper minimoDerecho derecho)



-- 39. Construir BST desde Lista


desdeListaBST : List comparable -> Result String (Tree comparable)
desdeListaBST lista =
    let
        insertarTodos elementos arbolActual =
            case elementos of
                [] ->
                    Ok arbolActual

                x :: xs ->
                    if contiene x arbolActual then
                        Err ("Valor duplicado: " ++ Debug.toString x)

                    else
                        insertarTodos xs (insertarBSTHelper x arbolActual)
    in
    insertarTodos lista Empty



-- 40. Verificar Balance


estaBalanceado : Tree a -> Bool
estaBalanceado arbol =
    let
        alturaBalanceada arbolActual =
            case arbolActual of
                Empty ->
                    ( True, 0 )

                Node _ izquierdo derecho ->
                    let
                        ( balanceIzq, alturaIzq ) = alturaBalanceada izquierdo
                        ( balanceDer, alturaDer ) = alturaBalanceada derecho
                    in
                    ( balanceIzq && balanceDer && abs (alturaIzq - alturaDer) <= 1
                    , 1 + max alturaIzq alturaDer
                    )
    in
    Tuple.first (alturaBalanceada arbol)



-- 41. Balancear BST


balancear : Tree comparable -> Tree comparable
balancear arbol =
    let
        elementos = inorder arbol
    in
    construirBalanceado elementos


construirBalanceado : List comparable -> Tree comparable
construirBalanceado lista =
    case lista of
        [] ->
            Empty

        _ ->
            let
                medio = List.length lista // 2
                ( izquierda, valorMedio :: derecha ) = List.splitAt medio lista
            in
            Node valorMedio (construirBalanceado izquierda) (construirBalanceado derecha)



-- 42. Camino a un Valor


type Direccion
    = Izquierda
    | Derecha


encontrarCamino : a -> Tree a -> Result String (List Direccion)
encontrarCamino valor arbol =
    case arbol of
        Empty ->
            Err "El valor no existe en el árbol"

        Node v izquierdo derecho ->
            if v == valor then
                Ok []

            else
                case encontrarCamino valor izquierdo of
                    Ok camino ->
                        Ok (Izquierda :: camino)

                    Err _ ->
                        case encontrarCamino valor derecho of
                            Ok camino ->
                                Ok (Derecha :: camino)

                            Err _ ->
                                Err "El valor no existe en el árbol"



-- 43. Seguir Camino


seguirCamino : List Direccion -> Tree a -> Result String a
seguirCamino camino arbol =
    case ( camino, arbol ) of
        ( [], Node valor _ _ ) ->
            Ok valor

        ( Izquierda :: resto, Node _ izquierdo _ ) ->
            seguirCamino resto izquierdo

        ( Derecha :: resto, Node _ _ derecho ) ->
            seguirCamino resto derecho

        _ ->
            Err "Camino inválido"



-- 44. Ancestro Común Más Cercano


ancestroComun : comparable -> comparable -> Tree comparable -> Result String comparable
ancestroComun valor1 valor2 arbol =
    if not (contiene valor1 arbol) then
        Err "El primer valor no existe en el árbol"

    else if not (contiene valor2 arbol) then
        Err "El segundo valor no existe en el árbol"

    else
        Ok (ancestroComunHelper valor1 valor2 arbol)


ancestroComunHelper : comparable -> comparable -> Tree comparable -> comparable
ancestroComunHelper valor1 valor2 arbol =
    case arbol of
        Empty ->
            -- Este caso nunca ocurre porque verificamos la existencia antes
            -- pero necesitamos un valor por defecto para el tipo
            valor1

        Node v izquierdo derecho ->
            if valor1 < v && valor2 < v then
                ancestroComunHelper valor1 valor2 izquierdo

            else if valor1 > v && valor2 > v then
                ancestroComunHelper valor1 valor2 derecho

            else
                v



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
        elementos = inorder arbol
    in
    case List.head (List.drop posicion elementos) of
        Just valor ->
            Ok valor

        Nothing ->
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
    balancear (List.foldl insertarBSTHelper Empty lista)