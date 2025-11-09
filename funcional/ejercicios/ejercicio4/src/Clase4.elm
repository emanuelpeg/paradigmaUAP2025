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
import Html exposing (a)


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
        Node _ _ _ -> -- No importa lo que tiene adentro, no esta vacio
            
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


contiene : comparable -> Tree comparable -> Bool
contiene valorBuscado arbol =
    case arbol of
        Empty ->
            False

        Node valorNodo izq der ->
            valorBuscado == valorNodo
                || contiene valorBuscado izq
                || contiene valorBuscado der

-- 8. Contar Hojas


contarHojas : Tree a -> Int
contarHojas arbol =
    case arbol of
        Empty ->
            0 -- Un árbol vacío no tiene hojas.

        Node _ Empty Empty ->
            1 -- Se encontró una hoja, caso base.

        Node _ izq der ->
            -- Este nodo no es una hoja, seguimos buscando en los hijos.
            contarHojas izq + contarHojas der



-- 9. Valor Mínimo (sin Maybe)


minimo : Tree Int -> Int
minimo arbol =
    case arbol of
        Empty ->
            0 -- Valor por defecto si el árbol está vacío.

        Node valor Empty _ ->
            valor -- Si no hay hijo izquierdo, este es el mínimo.

        Node _ izq _ ->  
            minimo izq -- Si hay hijo izquierdo, seguimos buscando a la izquierda.



-- 10. Valor Máximo (sin Maybe)


maximo : Tree Int -> Int
maximo arbol =
    case arbol of
        Empty ->
            0 
--Lo mismo que el de arriba pero al reves
        Node valor _ Empty ->
            valor

        Node _ _ der ->
            maximo der 



-- ============================================================================
-- PARTE 2: INTRODUCCIÓN A MAYBE
-- ============================================================================
-- 11. Buscar Valor


buscar : comparable -> Tree comparable -> Maybe comparable
buscar valor arbol =
    case arbol of
        Empty ->
            Nothing

        Node valorNodo izq der ->
            if valor == valorNodo then
                Just valorNodo
            else if valor < valorNodo then
                buscar valor izq
            else
                buscar valor der

-- 12. Encontrar Mínimo (con Maybe)


encontrarMinimo : Tree comparable -> Maybe comparable
encontrarMinimo arbol =
    case arbol of
        Empty ->
            Nothing

        Node valor Empty _ ->
            Just valor -- No hay más izquierda, este es el mínimo.

        Node _ izq _ ->
            encontrarMinimo izq -- Sigue yendo a la izquierda.



-- 13. Encontrar Máximo (con Maybe)


encontrarMaximo : Tree comparable -> Maybe comparable
encontrarMaximo arbol =
    case arbol of
        Empty ->
            Nothing

        Node valor _ Empty ->
            Just valor -- No hay más derecha, este es el máximo.

        Node _ _ der ->
            encontrarMaximo der -- Sigue yendo a la derecha.



-- 14. Buscar Por Predicado


buscarPor : (a -> Bool) -> Tree a -> Maybe a
buscarPor predicado arbol =
    case arbol of
        Empty ->
            Nothing

        Node valor izq der ->
            if predicado valor then
                Just valor -- 1. Comprueba el nodo actual
            else
                -- 2. Si no, busca a la izquierda
                case buscarPor predicado izq of
                    Just resultado ->
                        Just resultado

                    Nothing ->
                        -- 3. Si no, busca a la derecha
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
    hijoIzquierdo arbol
        |> Maybe.andThen hijoIzquierdo



-- 18. Buscar en Profundidad


obtenerSubarbol : comparable -> Tree comparable -> Maybe (Tree comparable)
obtenerSubarbol valor arbol =
    case arbol of
        Empty ->
            Nothing

        Node valorNodo izq der as nodoActual ->
            if valor == valorNodo then
                Just nodoActual
            
            else if valor < valorNodo then
                obtenerSubarbol valor izq
            
            else
                obtenerSubarbol valor der

buscarEnSubarbol : comparable -> comparable -> Tree comparable -> Maybe comparable
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

        Node valor izq der ->
            Ok ( valor, izq, der )



-- 22. Obtener Mínimo con Error


obtenerMinimo : Tree comparable -> Result String comparable
obtenerMinimo arbol =
    case arbol of
        Empty ->
            Err "No hay mínimo en un árbol vacío"

        Node valor Empty _ ->
            Ok valor

        Node _ izq _ ->
            obtenerMinimo izq



-- 23. Verificar si es BST


esBST : Tree comparable -> Bool
esBST arbol =
    let
        esBSTAux : Maybe comparable -> Maybe comparable -> Tree comparable -> Bool
        esBSTAux minVal maxVal arbol_aux =
            case arbol_aux of
                Empty ->
                    True

                Node valor izq der ->
                    let
                        esMayorQueMin =
                            case minVal of
                                Nothing -> True
                                Just min -> valor > min

                        esMenorQueMax =
                            case maxVal of
                                Nothing -> True
                                Just max -> valor < max
                    in
                    esMayorQueMin
                        && esMenorQueMax
                        && esBSTAux minVal (Just valor) izq
                        && esBSTAux (Just valor) maxVal der
    in
        esBSTAux Nothing Nothing arbol



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

        Node valorNodo izq der ->
            
            if valor == valorNodo then
                Ok valorNodo
            
            else if valor < valorNodo then
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
            (\val ->
                if val >= 0 then
                    Ok val
                else
                    Err "El valor no es positivo"
            )



-- 30. Pipeline de Validaciones


validarArbol : Tree Int -> Result String (Tree Int)
validarArbol arbol =
    validarNoVacio arbol
        |> Result.andThen validarBST



-- 31. Encadenar Búsquedas


buscarEnDosArboles : Int -> Tree Int -> Tree Int -> Result String Int
buscarEnDosArboles valor arbol1 arbol2 =
    case buscarEnBST valor arbol1 of
        Ok val ->
            Ok val

        Err _ ->
            buscarEnBST valor arbol2



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
                nuevoIzq =
                    filterArbol predicado izq

                nuevoDer =
                    filterArbol predicado der
            in
            if predicado valor then
                Node valor nuevoIzq nuevoDer
            else
                -- Nota: Esta es una interpretación. Un "filter" de árbol
                -- es ambiguo. Aquí, si un nodo falla, se reemplaza por
                -- Empty, perdiendo sus hijos filtrados.
                Empty



-- 37. Fold sobre Árbol


foldArbol : (a -> b -> b) -> b -> Tree a -> b
foldArbol funcion acumulador arbol =
    case arbol of
        Empty ->
            acumulador

        Node valor izq der ->
            -- Usamos un fold in-order:
            let
                accIzq =
                    foldArbol funcion acumulador izq

                accVal =
                    funcion valor accIzq
            in
            foldArbol funcion accVal der



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
                case ( izq, der ) of
                    ( Empty, Empty ) ->
                        Ok Empty

                    ( subArbol, Empty ) ->
                        Ok subArbol
                    ( Empty, subArbol ) ->
                        Ok subArbol

                    ( subIzq, subDer ) ->
                        case obtenerMinimo subDer of
                            Err msg ->
                                Err msg

                            Ok sucesor ->

                                eliminarBST sucesor subDer
                                    |> Result.map (\nuevoDer -> Node sucesor subIzq nuevoDer)



-- 39. Construir BST desde Lista


desdeListaBST : List comparable -> Result String (Tree comparable)
desdeListaBST lista =
    List.foldl
        (\val resTree ->
            resTree
                |> Result.andThen (\tree -> insertarBST val tree)
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
            (abs (altura izq - altura der) <= 1)
                && estaBalanceado izq
                && estaBalanceado der



-- 41. Balancear BST

balancear : Tree comparable -> Tree comparable
balancear arbol =
   let
        miUncons : List a -> Maybe ( a, List a )
        miUncons lista =
            case lista of
                [] ->
                    Nothing

                h :: t ->
                    Just ( h, t )

        miSplitAt : Int -> List a -> ( List a, List a )
        miSplitAt n lista =
            if n <= 0 then
                ( [], lista )
            else
                case lista of
                    [] ->
                        ( [], [] )

                    h :: t ->
                        let
                            ( izq, der ) =
                                miSplitAt (n - 1) t
                        in
                        ( h :: izq, der )

        construirDesdeListaOrdenada : List comparable -> Tree comparable
        construirDesdeListaOrdenada lista =
            case List.length lista of
                0 ->
                    Empty

                len ->
                    let
                        medioIndice =
                            len // 2

                        ( izqLista, raizYDerLista ) =
                            miSplitAt medioIndice lista
                    in
                    case miUncons raizYDerLista of
                        Nothing ->
                            Empty

                        Just ( raizValor, derLista ) ->
                            Node raizValor
                                (construirDesdeListaOrdenada izqLista)
                                (construirDesdeListaOrdenada derLista)
    in
        inorder arbol
            |> construirDesdeListaOrdenada



-- 42. Camino a un Valor


type Direccion
    = Izquierda
    | Derecha


encontrarCamino : comparable -> Tree comparable -> Result String (List Direccion)
encontrarCamino valorBuscado arbol =
    case arbol of
        Empty ->
            Err "El valor no existe en el árbol"

        Node valor izq der ->
            if valorBuscado == valor then
                Ok []
            else if valorBuscado < valor then
                encontrarCamino valorBuscado izq
                    |> Result.map (\camino -> Izquierda :: camino)
            else
                encontrarCamino valorBuscado der
                    |> Result.map (\camino -> Derecha :: camino)



-- 43. Seguir Camino

seguirCamino : List Direccion -> Tree a -> Result String a
seguirCamino camino arbol =
    List.foldl
        (\dir resArbol ->
            resArbol
                |> Result.andThen
                    (\subArbol ->
                        case ( dir, subArbol ) of
                            ( Izquierda, Node _ izq _ ) ->
                                Ok izq

                            ( Derecha, Node _ _ der ) ->
                                Ok der

                            ( _, Empty ) ->
                                Err "Camino inválido"
                    )
        )
        (Ok arbol)
        camino
        |> Result.andThen
            (\finalArbol ->
                case finalArbol of
                    Empty ->
                        Err "Camino inválido"

                    Node valor _ _ ->
                        Ok valor
            )


-- 44. Ancestro Común Más Cercano


ancestroComun : comparable -> comparable -> Tree comparable -> Result String comparable
ancestroComun valor1 valor2 arbol =
    case ( buscarEnBST valor1 arbol, buscarEnBST valor2 arbol ) of
        ( Ok _, Ok _ ) ->
            -- 2. Si ambos existen, encontrar el ancestro
            encontrarAncestroAux valor1 valor2 arbol
        _ ->
            Err "Uno o ambos valores no existen en el árbol"


encontrarAncestroAux : comparable -> comparable -> Tree comparable -> Result String comparable
encontrarAncestroAux valor1 valor2 arbol =
    case arbol of
        Empty ->
            Err "Error lógico: No se encontró el ancestro"

        Node v izq der ->
            if valor1 < v && valor2 < v then
                encontrarAncestroAux valor1 valor2 izq
            else if valor1 > v && valor2 > v then
                encontrarAncestroAux valor1 valor2 der
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
        miGetAt : Int -> List comparable -> Maybe comparable
        miGetAt n lista =
            if n < 0 then
                Nothing
            else
                case lista of
                    [] ->
                        Nothing

                    h :: t ->
                        if n == 0 then
                            Just h
                        else
                            miGetAt (n - 1) t
    in
        inorder arbol
            |> miGetAt posicion
            |> maybeAResult "Posición inválida o fuera de rango"

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
        miUncons : List a -> Maybe ( a, List a )
        miUncons lista_aux =
            case lista_aux of
                [] ->
                    Nothing

                h :: t ->
                    Just ( h, t )

        miSplitAt : Int -> List a -> ( List a, List a )
        miSplitAt n lista_aux =
            if n <= 0 then
                ( [], lista_aux )
            else
                case lista_aux of
                    [] ->
                        ( [], [] )

                    h :: t ->
                        let
                            ( izq, der ) =
                                miSplitAt (n - 1) t
                        in
                        ( h :: izq, der )
        
        construirDesdeListaOrdenada : List comparable -> Tree comparable
        construirDesdeListaOrdenada lista_interna =
            case List.length lista_interna of
                0 ->
                    Empty

                len ->
                    let
                        medioIndice =
                            len // 2

                        ( izqLista, raizYDerLista ) =
                            miSplitAt medioIndice lista_interna
                    in
                    case miUncons raizYDerLista of
                        Nothing ->
                            Empty

                        Just ( raizValor, derLista ) ->
                            Node raizValor
                                (construirDesdeListaOrdenada izqLista)
                                (construirDesdeListaOrdenada derLista)

    in
        List.sort lista
            |> construirDesdeListaOrdenada
