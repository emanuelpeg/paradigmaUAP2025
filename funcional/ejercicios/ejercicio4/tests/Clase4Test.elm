module Clase4Test exposing (..)

import Clase4 exposing (..)
import Expect
import Test exposing (..)


suite : Test
suite =
    describe "Clase 4: Pattern Matching y Mónadas con Árboles Binarios"
        [ describe "Parte 0: Construcción de Árboles"
            [ test "2. Es Vacío - árbol vacío" <|
                \_ ->
                    Expect.equal True (esVacio Empty)
            , test "2. Es Vacío - árbol con nodo" <|
                \_ ->
                    Expect.equal False (esVacio (Node 5 Empty Empty))
            , test "3. Es Hoja - nodo sin hijos" <|
                \_ ->
                    Expect.equal True (esHoja (Node 5 Empty Empty))
            , test "3. Es Hoja - nodo con hijo izquierdo" <|
                \_ ->
                    Expect.equal False (esHoja (Node 5 (Node 3 Empty Empty) Empty))
            , test "3. Es Hoja - árbol vacío no es hoja" <|
                \_ ->
                    Expect.equal False (esHoja Empty)
            ]
        , describe "Parte 1: Pattern Matching con Árboles"
            [ test "4. Tamaño - árbol vacío" <|
                \_ ->
                    Expect.equal 0 (tamano Empty)
            , test "4. Tamaño - hoja" <|
                \_ ->
                    Expect.equal 1 (tamano (Node 5 Empty Empty))
            , test "4. Tamaño - árbol pequeño" <|
                \_ ->
                    Expect.equal 3 (tamano arbolPequeno)
            , test "5. Altura - árbol vacío" <|
                \_ ->
                    Expect.equal 0 (altura Empty)
            , test "5. Altura - hoja" <|
                \_ ->
                    Expect.equal 1 (altura (Node 5 Empty Empty))
            , test "5. Altura - árbol pequeño" <|
                \_ ->
                    Expect.equal 2 (altura arbolPequeno)
            , test "6. Suma de Valores - árbol vacío" <|
                \_ ->
                    Expect.equal 0 (sumarArbol Empty)
            , test "6. Suma de Valores - árbol con valores" <|
                \_ ->
                    Expect.equal 15 (sumarArbol (Node 5 (Node 3 Empty Empty) (Node 7 Empty Empty)))
            , test "7. Contiene Valor - valor presente" <|
                \_ ->
                    Expect.equal True (contiene 5 arbolPequeno)
            , test "7. Contiene Valor - valor ausente" <|
                \_ ->
                    Expect.equal False (contiene 10 arbolPequeno)
            , test "8. Contar Hojas - árbol vacío" <|
                \_ ->
                    Expect.equal 0 (contarHojas Empty)
            , test "8. Contar Hojas - una hoja" <|
                \_ ->
                    Expect.equal 1 (contarHojas (Node 5 Empty Empty))
            , test "8. Contar Hojas - árbol pequeño" <|
                \_ ->
                    Expect.equal 2 (contarHojas arbolPequeno)
            , test "9. Mínimo sin Maybe - árbol vacío" <|
                \_ ->
                    Expect.equal 0 (minimo Empty)
            , test "9. Mínimo sin Maybe - árbol pequeño" <|
                \_ ->
                    Expect.equal 1 (minimo arbolPequeno)
            , test "10. Máximo sin Maybe - árbol vacío" <|
                \_ ->
                    Expect.equal 0 (maximo Empty)
            , test "10. Máximo sin Maybe - árbol pequeño" <|
                \_ ->
                    Expect.equal 5 (maximo arbolPequeno)
            ]
        , describe "Parte 2: Introducción a Maybe"
            [ test "11. Buscar - valor presente" <|
                \_ ->
                    Expect.equal (Just 5) (buscar 5 arbolPequeno)
            , test "11. Buscar - valor ausente" <|
                \_ ->
                    Expect.equal Nothing (buscar 10 arbolPequeno)
            , test "12. Encontrar Mínimo - árbol vacío" <|
                \_ ->
                    Expect.equal Nothing (encontrarMinimo Empty)
            , test "12. Encontrar Mínimo - árbol pequeño" <|
                \_ ->
                    Expect.equal (Just 1) (encontrarMinimo arbolPequeno)
            , test "13. Encontrar Máximo - árbol vacío" <|
                \_ ->
                    Expect.equal Nothing (encontrarMaximo Empty)
            , test "13. Encontrar Máximo - árbol pequeño" <|
                \_ ->
                    Expect.equal (Just 5) (encontrarMaximo arbolPequeno)
            , test "14. Buscar Por Predicado - encuentra valor" <|
                \_ ->
                    Expect.equal (Just 5) (buscarPor (\x -> x > 3) arbolPequeno)
            , test "14. Buscar Por Predicado - no encuentra" <|
                \_ ->
                    Expect.equal Nothing (buscarPor (\x -> x > 10) arbolPequeno)
            , test "15. Raíz - árbol vacío" <|
                \_ ->
                    Expect.equal Nothing (raiz Empty)
            , test "15. Raíz - árbol con nodo" <|
                \_ ->
                    Expect.equal (Just 5) (raiz (Node 5 Empty Empty))
            , test "16. Hijo Izquierdo - árbol vacío" <|
                \_ ->
                    Expect.equal Nothing (hijoIzquierdo Empty)
            , test "16. Hijo Izquierdo - con hijo" <|
                \_ ->
                    Expect.equal (Just (Node 3 Empty Empty)) (hijoIzquierdo (Node 5 (Node 3 Empty Empty) Empty))
            , test "17. Nieto Izquierdo Izquierdo" <|
                \_ ->
                    Expect.equal (Just (Node 3 Empty Empty)) (nietoIzquierdoIzquierdo arbolMediano)
            , test "18. Obtener Subárbol - árbol vacío" <|
                \_ ->
                    Expect.equal Nothing (obtenerSubarbol 5 Empty)
            , test "18. Obtener Subárbol - valor en raíz" <|
                \_ ->
                    Expect.equal (Just arbolPequeno) (obtenerSubarbol 3 arbolPequeno)
            , test "18. Obtener Subárbol - valor en hijo izquierdo" <|
                \_ ->
                    Expect.equal (Just (Node 1 Empty Empty)) (obtenerSubarbol 1 arbolPequeno)
            , test "18. Obtener Subárbol - valor en hijo derecho" <|
                \_ ->
                    Expect.equal (Just (Node 5 Empty Empty)) (obtenerSubarbol 5 arbolPequeno)
            , test "18. Obtener Subárbol - valor no existe" <|
                \_ ->
                    Expect.equal Nothing (obtenerSubarbol 10 arbolPequeno)
            , test "18. Obtener Subárbol - en árbol mediano" <|
                \_ ->
                    Expect.equal (Just (Node 5 (Node 3 Empty Empty) (Node 7 Empty Empty)))
                        (obtenerSubarbol 5 arbolMediano)
            , test "18. Buscar en Subárbol - encuentra valor en subárbol" <|
                \_ ->
                    Expect.equal (Just 3) (buscarEnSubarbol 5 3 arbolMediano)
            , test "18. Buscar en Subárbol - primer valor no existe" <|
                \_ ->
                    Expect.equal Nothing (buscarEnSubarbol 100 3 arbolMediano)
            , test "18. Buscar en Subárbol - segundo valor no existe en subárbol" <|
                \_ ->
                    Expect.equal Nothing (buscarEnSubarbol 5 100 arbolMediano)
            , test "18. Buscar en Subárbol - árbol vacío" <|
                \_ ->
                    Expect.equal Nothing (buscarEnSubarbol 5 3 Empty)
            ]
        , describe "Parte 3: Result para Validaciones"
            [ test "19. Validar No Vacío - árbol vacío" <|
                \_ ->
                    Expect.equal (Err "El árbol está vacío") (validarNoVacio Empty)
            , test "19. Validar No Vacío - árbol con nodo" <|
                \_ ->
                    Expect.equal (Ok (Node 5 Empty Empty)) (validarNoVacio (Node 5 Empty Empty))
            , test "20. Obtener Raíz - árbol vacío" <|
                \_ ->
                    Expect.equal (Err "No se puede obtener la raíz de un árbol vacío") (obtenerRaiz Empty)
            , test "20. Obtener Raíz - árbol con nodo" <|
                \_ ->
                    Expect.equal (Ok 5) (obtenerRaiz (Node 5 Empty Empty))
            , test "21. Dividir - árbol vacío" <|
                \_ ->
                    Expect.equal (Err "No se puede dividir un árbol vacío") (dividir Empty)
            , test "21. Dividir - árbol con nodos" <|
                \_ ->
                    Expect.equal (Ok ( 5, Node 3 Empty Empty, Node 7 Empty Empty ))
                        (dividir (Node 5 (Node 3 Empty Empty) (Node 7 Empty Empty)))
            , test "22. Obtener Mínimo - árbol vacío" <|
                \_ ->
                    Expect.equal (Err "No hay mínimo en un árbol vacío") (obtenerMinimo Empty)
            , test "22. Obtener Mínimo - árbol pequeño" <|
                \_ ->
                    Expect.equal (Ok 1) (obtenerMinimo arbolPequeno)
            , test "23. Es BST - BST válido" <|
                \_ ->
                    Expect.equal True (esBST (Node 5 (Node 3 Empty Empty) (Node 7 Empty Empty)))
            , test "23. Es BST - no es BST" <|
                \_ ->
                    Expect.equal False (esBST (Node 5 (Node 7 Empty Empty) (Node 3 Empty Empty)))
            ]
        , describe "Parte 4: Combinando Maybe y Result"
            [ test "27. Maybe a Result - Nothing" <|
                \_ ->
                    Expect.equal (Err "Error personalizado") (maybeAResult "Error personalizado" Nothing)
            , test "27. Maybe a Result - Just" <|
                \_ ->
                    Expect.equal (Ok 5) (maybeAResult "Error" (Just 5))
            , test "28. Result a Maybe - Err" <|
                \_ ->
                    Expect.equal Nothing (resultAMaybe (Err "algo"))
            , test "28. Result a Maybe - Ok" <|
                \_ ->
                    Expect.equal (Just 5) (resultAMaybe (Ok 5))
            ]
        , describe "Parte 5: Desafíos Avanzados"
            [ test "32. Inorder - árbol pequeño" <|
                \_ ->
                    Expect.equal [ 1, 3, 5 ] (inorder arbolPequeno)
            , test "33. Preorder - árbol pequeño" <|
                \_ ->
                    Expect.equal [ 3, 1, 5 ] (preorder arbolPequeno)
            , test "34. Postorder - árbol pequeño" <|
                \_ ->
                    Expect.equal [ 1, 5, 3 ] (postorder arbolPequeno)
            , test "35. Map sobre Árbol" <|
                \_ ->
                    Expect.equal (Node 6 (Node 2 Empty Empty) (Node 10 Empty Empty))
                        (mapArbol (\x -> x * 2) arbolPequeno)
            , test "37. Fold sobre Árbol" <|
                \_ ->
                    Expect.equal 9 (foldArbol (+) 0 arbolPequeno)
            , test "40. Está Balanceado - árbol balanceado" <|
                \_ ->
                    Expect.equal True (estaBalanceado arbolPequeno)
            , test "42. Encontrar Camino - hijo izquierdo" <|
                \_ ->
                    Expect.equal (Ok [ Izquierda ]) (encontrarCamino 1 arbolPequeno)
            , test "42. Encontrar Camino - hijo derecho" <|
                \_ ->
                    Expect.equal (Ok [ Derecha ]) (encontrarCamino 5 arbolPequeno)
            , test "42. Encontrar Camino - valor no existe" <|
                \_ ->
                    Expect.equal (Err "El valor no existe en el árbol") (encontrarCamino 10 arbolPequeno)
            , test "43. Seguir Camino - izquierda" <|
                \_ ->
                    Expect.equal (Ok 1) (seguirCamino [ Izquierda ] arbolPequeno)
            , test "43. Seguir Camino - camino inválido" <|
                \_ ->
                    Expect.equal (Err "Camino inválido") (seguirCamino [ Izquierda, Izquierda ] arbolPequeno)
            ]
        ]
