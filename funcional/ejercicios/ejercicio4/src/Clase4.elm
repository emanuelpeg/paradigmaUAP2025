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
import List exposing (map)
import List exposing (filter)


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


tamano : Tree a -> Int
tamano arbol =
    case arbol of
        Empty ->
            0

        Node _ left right ->
            1 + (tamano left) + (tamano right)


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
        Node v Empty der -> (max v (minimo der))
        Node v izq Empty -> (max v (minimo izq))
        Node v izq der -> (max v (max (minimo izq) (minimo der)))


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
        Empty ->
            Nothing

        Node v Empty Empty ->
            Just v

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
            if predicado v 
                then Just v
            else 
                case buscarPor predicado izq of 
                    Just encontrado -> Just encontrado
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
        Node _ _ der -> Just der

-- 17. Obtener Nieto


nietoIzquierdoIzquierdo : Tree a -> Maybe (Tree a)
nietoIzquierdoIzquierdo arbol =
     case hijoIzquierdo arbol of
        Nothing ->
            Nothing

        Just hijo ->
            hijoIzquierdo hijo
 

-- 18. Buscar en Profundidad


obtenerSubarbol : a -> Tree a -> Maybe (Tree a)
obtenerSubarbol buscado arbol =
    case arbol of
        Empty ->
            Nothing

        Node valor izq der ->
            if valor == buscado then
                Just arbol
            else
                case obtenerSubarbol buscado izq of
                    Just subarbol ->
                        Just subarbol

                    Nothing ->
                        obtenerSubarbol buscado der

buscarEnSubarbol : a -> a -> Tree a -> Maybe a
buscarEnSubarbol valor1 valor2 arbol =
    case obtenerSubarbol valor1 arbol of
        Nothing ->
            Nothing

        Just subarbol ->
            buscar valor2 subarbol


-- ============================================================================
-- PARTE 3: RESULT PARA VALIDACIONES
-- ============================================================================
-- 19. Validar No Vacío


validarNoVacio : Tree a -> Result String (Tree a)
validarNoVacio arbol =
    case arbol of
        Node _ _ _ -> Ok arbol

        Empty -> Err "El árbol está vacío"


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
        Empty ->
            Err "No se puede dividir un árbol vacío"

        Node valor izq der ->
            Ok (valor, izq, der)


-- 22. Obtener Mínimo con Error


obtenerMinimo : Tree comparable -> Result String comparable
obtenerMinimo arbol =
    case arbol of
        Empty ->
            Err "No hay mínimo en un árbol vacío"

        Node v Empty Empty ->
            Ok v

        Node v izq der ->
            let
                minIzq = obtenerMinimo izq
                minDer = obtenerMinimo der
            in
            case (minIzq, minDer) of
                (Err _, Err _) ->
                    Ok v

                (Ok valIzq, Err _) ->
                    Ok (min v valIzq)

                (Err _, Ok valDer) ->
                    Ok (min v valDer)

                (Ok valIzq, Ok valDer) ->
                    Ok (min v (min valIzq valDer))
   

-- 23. Verificar si es BST


esBST : Tree comparable -> Bool
esBST arbol =
    esBSTConRango arbol Nothing Nothing


esBSTConRango : Tree comparable -> Maybe comparable -> Maybe comparable -> Bool
esBSTConRango arbol minVal maxVal =
    case arbol of
        Empty ->
            True

        Node valor izq der ->
            let
                dentroDeRango =
                    case minVal of
                        Nothing ->
                            True
                        Just minLimite ->
                            minLimite < valor

                dentroDeRango2 =
                    case maxVal of
                        Nothing ->
                            True
                        Just maxLimite ->
                            valor < maxLimite
            in
            dentroDeRango
                && dentroDeRango2
                && esBSTConRango izq minVal (Just valor)
                && esBSTConRango der (Just valor) maxVal


-- 24. Insertar en BST


insertarBST : comparable -> Tree comparable -> Result String (Tree comparable)
insertarBST valor arbol =
    
    case arbol of
        Empty ->
            Ok (Node valor Empty Empty)

        Node v izq der ->
            case compare valor v of
                EQ ->
                    Err "El valor ya existe en el árbol"

                LT ->
                    case insertarBST valor izq of
                        Err msg ->
                            Err msg

                        Ok nuevoIzq ->
                            Ok (Node v nuevoIzq der)

                GT ->
                    case insertarBST valor der of
                        Err msg ->
                            Err msg

                        Ok nuevoDer ->
                            Ok (Node v izq nuevoDer)


-- 25. Buscar en BST


buscarEnBST : comparable -> Tree comparable -> Result String comparable
buscarEnBST valor arbol =
    case arbol of
        Empty ->
            Err "El valor no se encuentra en el árbol"

        Node v izq der ->
            case compare valor v of
                EQ ->
                    Ok v

                LT ->
                    buscarEnBST valor izq

                GT ->
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
    case arbol of
        Empty ->
            Err "El valor no se encuentra en el árbol"

        Node v izq der ->
            if v == valor then
                Ok v
            else
                case buscarPositivo valor izq of
                    Ok encontrado ->
                        Ok encontrado

                    Err _ ->
                        buscarPositivo valor der


-- 30. Pipeline de Validaciones


validarArbol : Tree Int -> Result String (Tree Int)
validarArbol arbol =
    if esVacio arbol then
        Err "Validación fallida"
    else if not (esBST arbol) then
        Err "Validación fallida"
    else
        Ok arbol


-- 31. Encadenar Búsquedas


buscarEnDosArboles : Int -> Tree Int -> Tree Int -> Result String Int
buscarEnDosArboles valor arbol1 arbol2 =
    case buscarPositivo valor arbol1 of
        Ok encontrado ->
            Ok encontrado

        Err _ ->
            buscarPositivo valor arbol2


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
            inorder izq ++ [v] ++ inorder der    
-- 33. Recorrido Preorder


preorder : Tree a -> List a
preorder arbol =
    case arbol of 
        Empty ->
            []
        Node v izq der ->
            [v] ++ preorder izq ++ preorder der


-- 34. Recorrido Postorder


postorder : Tree a -> List a
postorder arbol =
    case arbol of 
        Empty -> []

        Node v izq der ->
            postorder izq ++ postorder der ++ [v]


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
        Empty -> Empty

        Node v izq der -> 
            if predicado v then
                Node v (filterArbol predicado izq) (filterArbol predicado der)
            else
                Empty



-- 37. Fold sobre Árbol


foldArbol : (a -> b -> b) -> b -> Tree a -> b
foldArbol funcion acumulador arbol =
    case arbol of
            Empty ->
                acumulador

            Node valor izq der ->
                let
                    acumDespuesIzq = foldArbol funcion acumulador izq
                    acumDespuesRaiz = funcion valor acumDespuesIzq
                in
                foldArbol funcion acumDespuesRaiz der


-- 38. Eliminar de BST


eliminarBST : comparable -> Tree comparable -> Result String (Tree comparable)
eliminarBST valor arbol =
    case arbol of
        Empty ->
            Err "El valor no existe en el árbol"

        Node v izq der ->
            case compare valor v of
                EQ ->
                    -- ¡Encontramos el nodo a eliminar!
                    case (izq, der) of
                        (Empty, Empty) ->
                            -- Caso 1: hoja
                            Ok Empty

                        (Empty, _) ->
                            -- Caso 2: solo hijo derecho
                            Ok der

                        (_, Empty) ->
                            -- Caso 2: solo hijo izquierdo
                            Ok izq

                        (_, _) ->
                            -- Caso 3: dos hijos → reemplazar con mínimo del subárbol derecho
                            case encontrarMinimoYResto der of
                                (minVal, nuevoDer) ->
                                    Ok (Node minVal izq nuevoDer)

                LT ->
                    -- Buscar en subárbol izquierdo
                    case eliminarBST valor izq of
                        Err msg ->
                            Err msg

                        Ok nuevoIzq ->
                            Ok (Node v nuevoIzq der)

                GT ->
                    -- Buscar en subárbol derecho
                    case eliminarBST valor der of
                        Err msg ->
                            Err msg

                        Ok nuevoDer ->
                            Ok (Node v izq nuevoDer)


-- Función auxiliar: encuentra el mínimo y elimina su nodo hoja
encontrarMinimoYResto : Tree comparable -> ( comparable, Tree comparable )
encontrarMinimoYResto arbol =
    case arbol of
        Node val Empty der ->
            -- Este es el mínimo (no tiene hijo izquierdo)
            (val, der)

        Node val izq der ->
            let
                (minVal, nuevoIzq) = encontrarMinimoYResto izq
            in
            (minVal, Node val nuevoIzq der)

        Empty ->
            -- Esto nunca debería ocurrir si se llama solo desde eliminarBST
            Debug.todo "encontrarMinimoYResto llamado con Empty"



-- 39. Construir BST desde Lista


desdeListaBST : List comparable -> Result String (Tree comparable)
desdeListaBST lista =
    construirDesdeLista lista Empty

construirDesdeLista : List comparable -> Tree comparable -> Result String (Tree comparable)
construirDesdeLista lista arbol =
    case lista of
        [] ->
            Ok arbol

        valor :: resto ->
            case insertarBST valor arbol of
                Err _ ->
                    Err "Valor duplicado"

                Ok nuevoArbol ->
                    construirDesdeLista resto nuevoArbol


-- 40. Verificar Balance


estaBalanceado : Tree a -> Bool
estaBalanceado arbol =
    case arbol of
        Empty ->
            True

        Node _ izq der ->
            let
                hIzq = altura izq
                hDer = altura der
                balanceadoRaiz = abs (hIzq - hDer) <= 1
            in
            balanceadoRaiz
                && estaBalanceado izq
                && estaBalanceado der



-- 41. Balancear BST


balancear : Tree comparable -> Tree comparable
balancear arbol =
    balancearDesdeLista (inorder arbol)


balancearDesdeLista : List comparable -> Tree comparable
balancearDesdeLista lista =
    case lista of
        [] ->
            Empty

        _ ->
            let
                len = List.length lista
                mitad = len // 2
                izquierda = List.take mitad lista
                resto = List.drop mitad lista
                valorRaiz =
                    case resto of
                        [] ->
                            Debug.todo "imposible"

                        x :: _ ->
                            x

                derecha = List.drop 1 resto
            in
            Node valorRaiz
                (balancearDesdeLista izquierda)
                (balancearDesdeLista derecha)
        



-- 42. Camino a un Valor


type Direccion
    = Izquierda
    | Derecha


encontrarCamino : a -> Tree a -> Result String (List Direccion)
encontrarCamino valor arbol =
    case encontrarCaminoAux valor arbol [] of
    Just camino ->
        Ok (List.reverse camino)

    Nothing ->
        Err "El valor no existe en el árbol"


encontrarCaminoAux : a -> Tree a -> List Direccion -> Maybe (List Direccion)
encontrarCaminoAux valor arbol caminoAcumulado =
    case arbol of
        Empty ->
            Nothing

        Node v izq der ->
            if v == valor then
                Just caminoAcumulado
            else
                case encontrarCaminoAux valor izq (Izquierda :: caminoAcumulado) of
                    Just camino ->
                        Just camino

                    Nothing ->
                        encontrarCaminoAux valor der (Derecha :: caminoAcumulado)


-- 43. Seguir Camino


seguirCamino : List Direccion -> Tree a -> Result String a
seguirCamino camino arbol =
    case camino of
        [] ->
            case arbol of
                Empty ->
                    Err "Camino inválido"
                Node v _ _ ->
                    Ok v

        Izquierda :: resto ->
            case arbol of
                Empty ->
                    Err "Camino inválido"
                Node _ Empty _ ->
                    Err "Camino inválido"
                Node _ izq _ ->
                    seguirCamino resto izq

        Derecha :: resto ->
            case arbol of
                Empty ->
                    Err "Camino inválido"
                Node _ _ Empty ->
                    Err "Camino inválido"
                Node _ _ der ->
                    seguirCamino resto der



-- 44. Ancestro Común Más Cercano


ancestroComun : comparable -> comparable -> Tree comparable -> Result String comparable
ancestroComun valor1 valor2 arbol =
    if not (contiene valor1 arbol) || not (contiene valor2 arbol) then
        Err "Uno o ambos valores no existen en el árbol"
    else
        case buscarLCA valor1 valor2 arbol of
            Just v ->
                Ok v

            Nothing ->
                Err "Uno o ambos valores no existen en el árbol"


buscarLCA : comparable -> comparable -> Tree comparable -> Maybe comparable
buscarLCA v1 v2 arbol =
    let
        (minV, maxV) =
            if v1 <= v2 then (v1, v2) else (v2, v1)
    in
    case arbol of
        Empty ->
            Nothing

        Node v izq der ->
            if minV <= v && v <= maxV then
                Just v
            else if v < minV then
                buscarLCA v1 v2 der
            else
                buscarLCA v1 v2 izq



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
    if posicion < 0 then
        Err "Posición inválida"
    else
        let
            lista = inorder arbol
            len = List.length lista
        in
        if posicion >= len then
            Err "Posición inválida"
        else
            case List.drop posicion lista of
                [] ->
                    Err "Posición inválida"

                x :: _ ->
                    Ok x



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
    lista
        |> List.sort
        |> eliminarDuplicados
        |> balancearDesdeLista


eliminarDuplicados : List comparable -> List comparable
eliminarDuplicados lista =
    case lista of
        [] ->
            []

        x :: resto ->
            x :: eliminarDuplicados (List.filter (\y -> y /= x) resto)