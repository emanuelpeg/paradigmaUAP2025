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
import Bitwise exposing (or)
import Html exposing (th)
import Html exposing (node)
import Html exposing (pre)

-- ============================================================================
-- DEFINICIÓN DEL ÁRBOL BINARIO
-- ============================================================================


type Tree a
    = Empty
    | Node a (Tree a) (Tree a) -- Nodo con valor y dos subarboles



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
            True -- si el árbol es vacío, retorna True
        Node _ _ _ ->
            False -- si el árbol tiene nodos, retorna False
        



-- 3. Es Hoja


esHoja : Tree a -> Bool
esHoja arbol =
    case arbol of
        Empty ->
            False
        Node _ Empty Empty -> -- si el nodo es hoja, true
            True
        Node _ _ _ -> -- si el nodo tiene hijos, false
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
        Node valorNodo izquierdo derecho ->
            if valor == valorNodo then 
                True
            else
                contiene valor izquierdo || contiene valor derecho



-- 8. Contar Hojas


contarHojas : Tree a -> Int
contarHojas arbol =
    case arbol of 
        Empty ->
            0
        Node _ Empty Empty -> 
            1
        Node _ izquierdo derecho ->
            contarHojas izquierdo + contarHojas derecho




-- 9. Valor Mínimo (sin Maybe)


minimo : Tree Int -> Int
minimo arbol =
    case arbol of 
        Empty -> 0

        Node valor Empty Empty ->
            valor

        Node valor izquierdo derecho ->
            min valor (min (minimo izquierdo) (minimo derecho))



-- 10. Valor Máximo (sin Maybe)


maximo : Tree Int -> Int
maximo arbol =
    case arbol of 
        Empty -> 0

        Node valor Empty Empty ->
            valor

        Node valor izquierdo derecho ->
            max valor (max (maximo izquierdo) (maximo derecho))



-- ============================================================================
-- PARTE 2: INTRODUCCIÓN A MAYBE
-- ============================================================================
-- 11. Buscar Valor


buscar : a -> Tree a -> Maybe a
buscar valor arbol =
    case arbol of 
    Empty -> Nothing

    Node valorNodo izquierdo derecho ->
        if valor == valorNodo then
            Just valor
        else
            case buscar valor izquierdo of
                Just valorEncontrado ->
                    Just valorEncontrado
                Nothing ->
                    buscar valor derecho




-- 12. Encontrar Mínimo (con Maybe)


encontrarMinimo : Tree comparable -> Maybe comparable
encontrarMinimo arbol =
    case arbol of 
        Empty -> Nothing

        Node valor Empty Empty ->
            Just valor

        Node valor Empty derecho -> 
            case encontrarMinimo derecho of
                Nothing ->
                    Just valor

                Just minDerecho ->
                    Just (min valor minDerecho)
        
        Node valor izquierdo Empty ->
            case encontrarMinimo izquierdo of
                Nothing ->
                    Just valor

                Just minIzquierdo ->
                    Just (min valor minIzquierdo)   

        Node valor izquierdo derecho ->
            case (encontrarMinimo izquierdo, encontrarMinimo derecho) of
                (Just minIzq, Just minDer) ->
                    -- Ambos tienen mínimo. Comparamos los 3.
                    Just (min valor (min minIzq minDer))
                
                (Just minIzq, Nothing) ->
                    Just (min valor minIzq)

                (Nothing, Just minDer) ->
                    Just (min valor minDer)
                
                (Nothing, Nothing) ->
                    Just valor



-- 13. Encontrar Máximo (con Maybe)


encontrarMaximo : Tree comparable -> Maybe comparable
encontrarMaximo arbol =
    case arbol of 
        Empty -> Nothing

        Node valor Empty Empty ->
            Just valor

        Node valor Empty derecho -> 
            case encontrarMaximo derecho of
                Nothing ->
                    Just valor

                Just maxDerecho ->
                    Just (max valor maxDerecho)
        
        Node valor izquierdo Empty ->
            case encontrarMaximo izquierdo of
                Nothing ->
                    Just valor

                Just maxIzquierdo ->
                    Just (max valor maxIzquierdo)   

        Node valor izquierdo derecho ->
            case (encontrarMaximo izquierdo, encontrarMaximo derecho) of
                (Just maxIzq, Just maxDer) ->
                    -- Ambos tienen máximo. Comparamos los 3.
                    Just (max valor (max maxIzq maxDer))
                
                (Just maxIzq, Nothing) ->
                    Just (max valor maxIzq)

                (Nothing, Just maxDer) ->
                    Just (max valor maxDer)
                
                (Nothing, Nothing) ->
                    Just valor



-- 14. Buscar Por Predicado


buscarPor : (a -> Bool) -> Tree a -> Maybe a
buscarPor predicado arbol =
    case arbol of 
        Empty -> Nothing

        Node valor izquierdo derecho ->
            if predicado valor then
                Just valor
            else
                case buscarPor predicado izquierdo of
                    Just valorEncontrado ->
                        Just valorEncontrado
                    Nothing ->
                        buscarPor predicado derecho



-- 15. Obtener Valor de Raíz


raiz : Tree a -> Maybe a
raiz arbol =
    case arbol of 
        Empty -> Nothing

        Node valor _ _ ->
            Just valor



-- 16. Obtener Hijo Izquierdo


hijoIzquierdo : Tree a -> Maybe (Tree a)
hijoIzquierdo arbol =
    case arbol of 
        Empty -> Nothing

        Node _ izquierdo _ ->
            Just izquierdo


hijoDerecho : Tree a -> Maybe (Tree a)
hijoDerecho arbol =
    case arbol of
        Empty -> Nothing
        Node _ _ derecho ->
            Just derecho



-- 17. Obtener Nieto


nietoIzquierdoIzquierdo : Tree a -> Maybe (Tree a)
nietoIzquierdoIzquierdo arbol =
    case hijoIzquierdo arbol of
        Nothing ->
            Nothing
        Just hijoIzq ->
            hijoIzquierdo hijoIzq



-- 18. Buscar en Profundidad


obtenerSubarbol : a -> Tree a -> Maybe (Tree a)
obtenerSubarbol valor arbol =
    case arbol of
        Empty ->
            Nothing

        Node valorNodo izquierdo derecho ->
            if valor == valorNodo then
                Just arbol
            else
                case obtenerSubarbol valor izquierdo of
                    Just subarbolEncontrado ->
                        Just subarbolEncontrado
                    Nothing ->
                        obtenerSubarbol valor derecho


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
        Empty ->
            Err "El árbol está vacío"
        Node _ _ _ ->
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
        Nothing ->
            Err "No hay mínimo en un árbol vacío"

        Just minimo_ ->
            Ok minimo_  



-- 23. Verificar si es BST


esBST : Tree comparable -> Bool
esBST arbol =
    case arbol of
        Empty ->
            True
        Node valor izquierdo derecho ->
            let
                esIzquierdoValido =
                    case encontrarMaximo izquierdo of
                        Nothing ->
                            True
                        Just maxIzq ->
                            maxIzq < valor

                esDerechoValido =
                    case encontrarMinimo derecho of
                        Nothing ->
                            True
                        Just minDer ->
                            minDer > valor
            in
            esIzquierdoValido && esDerechoValido && esBST izquierdo && esBST derecho



-- 24. Insertar en BST


insertarBST : comparable -> Tree comparable -> Result String (Tree comparable)
insertarBST valor arbol =
    case arbol of
        Empty ->
            Ok (Node valor Empty Empty)

        Node valorNodo izquierdo derecho ->
            if valor < valorNodo then
                case insertarBST valor izquierdo of
                    Err mensajeError ->
                        Err mensajeError
                    Ok nuevoIzquierdo ->
                        Ok (Node valorNodo nuevoIzquierdo derecho)
            else if valor > valorNodo then
                case insertarBST valor derecho of
                    Err mensajeError ->
                        Err mensajeError
                    Ok nuevoDerecho ->
                        Ok (Node valorNodo izquierdo nuevoDerecho)
            else
                Err "El valor ya existe en el árbol"



-- 25. Buscar en BST


buscarEnBST : comparable -> Tree comparable -> Result String comparable
buscarEnBST valor arbol =
    case arbol of
        Empty ->
            Err "El valor no se encuentra en el árbol"

        Node valorNodo izquierdo derecho ->
            if valor == valorNodo then
                Ok valorNodo
            else if valor < valorNodo then
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
    case buscar valor arbol of
        Nothing ->
            Err "El valor no se encuentra en el árbol"
        Just valorEncontrado ->
            if valorEncontrado > 0 then
                Ok valorEncontrado
            else
                Err "El valor no se encuentra en el árbol"



-- 30. Pipeline de Validaciones


validarArbol : Tree Int -> Result String (Tree Int)
validarArbol arbol =
    case validarNoVacio arbol of
        Err mensajeError ->
            Err mensajeError
        Ok arbolNoVacio ->
            if esBST arbolNoVacio then
                Ok arbolNoVacio
            else
                Err "Validación fallida"



-- 31. Encadenar Búsquedas


buscarEnDosArboles : Int -> Tree Int -> Tree Int -> Result String Int
buscarEnDosArboles valor arbol1 arbol2 =
    case buscar valor arbol1 of
        Nothing ->
            Err "Búsqueda fallida"
        Just valorEncontrado1 ->
            case buscar valor arbol2 of
                Nothing ->
                    Err "Búsqueda fallida"
                Just valorEncontrado2 ->
                    Ok (valorEncontrado1 + valorEncontrado2)



-- ============================================================================
-- PARTE 5: DESAFÍOS AVANZADOS
-- ============================================================================
-- 32. Recorrido Inorder


inorder : Tree a -> List a
inorder arbol =
    case arbol of
        Empty ->
            [] --Retorno una lista vacía
    
        Node valor izquierdo derecho ->
            inorder izquierdo ++ [valor] ++ inorder derecho -- Concateno las listas



-- 33. Recorrido Preorder


preorder : Tree a -> List a
preorder arbol =
    case arbol of
        Empty ->
            []

        Node valor izquierda derecha ->
            [valor] ++ preorder izquierda ++ preorder derecha



-- 34. Recorrido Postorder


postorder : Tree a -> List a
postorder arbol =
    case arbol of
        Empty -> []

        Node valor izquierda derecha ->
            postorder izquierda ++ postorder derecha ++ [valor]



-- 35. Map sobre Árbol


mapArbol : (a -> b) -> Tree a -> Tree b
mapArbol funcion arbol =
    case arbol of
        Empty -> Empty

        Node valor izquierdo derecho ->
            Node (funcion valor) (mapArbol funcion izquierdo) (mapArbol funcion derecho)



-- 36. Filter sobre Árbol


filterArbol : (a -> Bool) -> Tree a -> Tree a
filterArbol predicado arbol =
    case arbol of
        Empty ->
            Empty

        Node valor izquierda derecha ->
            if predicado valor then
                Node valor (filterArbol predicado izquierda) (filterArbol predicado derecha)
            else
                Empty



-- 37. Fold sobre Árbol


foldArbol : (a -> b -> b) -> b -> Tree a -> b
foldArbol funcion acumulador arbol =
    case arbol of 
        Empty ->
            acumulador

        Node valor izquierdo derecho ->
            foldArbol funcion (funcion valor (foldArbol funcion acumulador izquierdo)) derecho



-- 38. Eliminar de BST


eliminarBST : comparable -> Tree comparable -> Result String (Tree comparable)
eliminarBST valor arbol =
    case arbol of
        Empty ->
            Err "El valor no existe en el árbol"

        Node valorNodo izquierdo derecho ->
            if valor < valorNodo then
                case eliminarBST valor izquierdo of
                    Err mensajeError ->
                        Err mensajeError
                    Ok nuevoIzquierdo ->
                        Ok (Node valorNodo nuevoIzquierdo derecho)
            else if valor > valorNodo then
                case eliminarBST valor derecho of
                    Err mensajeError ->
                        Err mensajeError
                    Ok nuevoDerecho ->
                        Ok (Node valorNodo izquierdo nuevoDerecho)
            else
                -- Nodo encontrado, proceder a eliminar
                case (izquierdo, derecho) of
                    (Empty, Empty) ->
                        Ok Empty
                    (Empty, _) ->
                        Ok derecho
                    (_, Empty) ->
                        Ok izquierdo
                    _ ->
                        case encontrarMinimo derecho of
                            Nothing ->
                                Err "Error al encontrar el mínimo del subárbol derecho"
                            Just minDerecho ->
                                case eliminarBST minDerecho derecho of
                                    Err mensajeError ->
                                        Err mensajeError
                                    Ok nuevoDerecho ->
                                        Ok (Node minDerecho izquierdo nuevoDerecho)



-- 39. Construir BST desde Lista


desdeListaBST : List comparable -> Result String (Tree comparable)
desdeListaBST lista =
    case lista of
        [] -> 
            Ok Empty
        x :: xs ->
            case desdeListaBST xs of
                Err mensajeError ->
                    Err "Valor duplicado"
                Ok arbolParcial ->
                    insertarBST x arbolParcial



-- 40. Verificar Balance


estaBalanceado : Tree a -> Bool
estaBalanceado arbol =
    case arbol of
        Empty ->
            True

        Node _ izquierdo derecho ->
            let
                alturaIzquierdo =
                    altura izquierdo

                alturaDerecho =
                    altura derecho

                diferencia =
                    abs (alturaIzquierdo - alturaDerecho)
            in
            diferencia <= 1 && estaBalanceado izquierdo && estaBalanceado derecho



-- 41. Balancear BST


balancear : Tree comparable -> Tree comparable
balancear arbol =
    case arbol of
        Empty ->
            Empty

        _ ->
            let
                listaOrdenada =
                    inorder arbol

                construirArbolBalanceado lista =
                    case lista of
                        [] ->
                            Empty
                        _ ->
                            let
                                mid =
                                    List.length lista // 2

                                valorMedio =
                                    List.drop mid lista |> List.head |> Maybe.withDefault (List.head lista |> Maybe.withDefault (Debug.todo "Lista vacía"))

                                izquierda =
                                    List.take mid lista

                                derecha =
                                    List.drop (mid + 1) lista
                            in
                            Node valorMedio (construirArbolBalanceado izquierda) (construirArbolBalanceado derecha)
            in
            construirArbolBalanceado listaOrdenada



-- 42. Camino a un Valor


type Direccion
    = Izquierda
    | Derecha


encontrarCamino : a -> Tree a -> Result String (List Direccion)
encontrarCamino valor arbol =
    case arbol of
        Empty ->
            Err "El valor no existe en el árbol"

        Node valorNodo izquierdo derecho ->
            if valor == valorNodo then
                Ok []
            else
                case encontrarCamino valor izquierdo of
                    Ok caminoIzquierdo ->
                        Ok (Izquierda :: caminoIzquierdo)
                    Err _ ->
                        case encontrarCamino valor derecho of
                            Ok caminoDerecho ->
                                Ok (Derecha :: caminoDerecho)
                            Err _ ->
                                Err "El valor no existe en el árbol"


-- 43. Seguir Camino


seguirCamino : List Direccion -> Tree a -> Result String a
seguirCamino camino arbol =
    case arbol of
        Empty ->
            Err "Camino inválido"
        Node valor izquierdo derecho ->
            case camino of
                [] ->
                    Ok valor
                direccion :: restoCamino ->
                    case direccion of
                        Izquierda ->
                            seguirCamino restoCamino izquierdo
                        Derecha ->
                            seguirCamino restoCamino derecho



-- 44. Ancestro Común Más Cercano


ancestroComun : comparable -> comparable -> Tree comparable -> Result String comparable
ancestroComun valor1 valor2 arbol =
    case arbol of
        Empty ->
            Err "Uno o ambos valores no existen en el árbol"

        Node valorNodo izquierdo derecho ->
            if valor1 < valorNodo && valor2 < valorNodo then
                ancestroComun valor1 valor2 izquierdo
            else if valor1 > valorNodo && valor2 > valorNodo then
                ancestroComun valor1 valor2 derecho
            else if (valor1 == valorNodo) || (valor2 == valorNodo) || (valor1 < valorNodo && valor2 > valorNodo) || (valor1 > valorNodo && valor2 < valorNodo) then
                Ok valorNodo
            else
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
