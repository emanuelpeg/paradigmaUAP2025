module Clase3Test exposing (..)

import Clase3 exposing (..)
import Expect
import Test exposing (..)


{-| Tests Unitarios para los Ejercicios de Programación Funcional - Clase 3

Para ejecutar estos tests:

1.  Instalar elm-test: npm install -g elm-test
2.  Ejecutar: elm-test

Estos tests cubren todos los ejercicios y casos borde importantes.

-}



-- ============================================================================
-- PARTE 0: IMPLEMENTACIONES PERSONALIZADAS
-- ============================================================================


testsMiMap : Test
testsMiMap =
    describe "Tests para miMap"
        [ test "miMap duplicar números" <|
            \_ ->
                miMap (\x -> x * 2) [ 1, 2, 3 ]
                    |> Expect.equal [ 2, 4, 6 ]
        , test "miMap con lista vacía" <|
            \_ ->
                miMap (\x -> x * 2) []
                    |> Expect.equal []
        , test "miMap convertir a strings" <|
            \_ ->
                miMap String.fromInt [ 1, 2, 3 ]
                    |> Expect.equal [ "1", "2", "3" ]
        ]


testsMiFiltro : Test
testsMiFiltro =
    describe "Tests para miFiltro"
        [ test "miFiltro números pares" <|
            \_ ->
                miFiltro (\x -> modBy 2 x == 0) [ 1, 2, 3, 4, 5 ]
                    |> Expect.equal [ 2, 4 ]
        , test "miFiltro con lista vacía" <|
            \_ ->
                miFiltro (\x -> x > 0) []
                    |> Expect.equal []
        , test "miFiltro sin coincidencias" <|
            \_ ->
                miFiltro (\x -> x > 10) [ 1, 2, 3 ]
                    |> Expect.equal []
        ]


testsMiFoldl : Test
testsMiFoldl =
    describe "Tests para miFoldl"
        [ test "miFoldl suma" <|
            \_ ->
                miFoldl (+) 0 [ 1, 2, 3, 4 ]
                    |> Expect.equal 10
        , test "miFoldl con lista vacía" <|
            \_ ->
                miFoldl (+) 0 []
                    |> Expect.equal 0
        , test "miFoldl multiplicación" <|
            \_ ->
                miFoldl (*) 1 [ 2, 3, 4 ]
                    |> Expect.equal 24
        ]



-- ============================================================================
-- PARTE 1: ENTENDIENDO MAP
-- ============================================================================


testsDuplicar : Test
testsDuplicar =
    describe "Tests para duplicar"
        [ test "duplicar lista normal" <|
            \_ ->
                duplicar [ 1, 2, 3 ]
                    |> Expect.equal [ 2, 4, 6 ]
        , test "duplicar lista vacía" <|
            \_ ->
                duplicar []
                    |> Expect.equal []
        , test "duplicar con negativos" <|
            \_ ->
                duplicar [ -1, 0, 1 ]
                    |> Expect.equal [ -2, 0, 2 ]
        ]


testsLongitudes : Test
testsLongitudes =
    describe "Tests para longitudes"
        [ test "longitudes lista normal" <|
            \_ ->
                longitudes [ "hola", "chau" ]
                    |> Expect.equal [ 4, 4 ]
        , test "longitudes lista vacía" <|
            \_ ->
                longitudes []
                    |> Expect.equal []
        , test "longitudes strings vacíos" <|
            \_ ->
                longitudes [ "", "a", "" ]
                    |> Expect.equal [ 0, 1, 0 ]
        ]


testsIncrementarTodos : Test
testsIncrementarTodos =
    describe "Tests para incrementarTodos"
        [ test "incrementar lista normal" <|
            \_ ->
                incrementarTodos [ 1, 2, 3 ]
                    |> Expect.equal [ 2, 3, 4 ]
        , test "incrementar lista vacía" <|
            \_ ->
                incrementarTodos []
                    |> Expect.equal []
        , test "incrementar con negativos" <|
            \_ ->
                incrementarTodos [ -1, 0, 1 ]
                    |> Expect.equal [ 0, 1, 2 ]
        ]


testsTodasMayusculas : Test
testsTodasMayusculas =
    describe "Tests para todasMayusculas"
        [ test "todas mayúsculas lista normal" <|
            \_ ->
                todasMayusculas [ "hola", "chau" ]
                    |> Expect.equal [ "HOLA", "CHAU" ]
        , test "todas mayúsculas lista vacía" <|
            \_ ->
                todasMayusculas []
                    |> Expect.equal []
        ]


testsNegarTodos : Test
testsNegarTodos =
    describe "Tests para negarTodos"
        [ test "negar lista normal" <|
            \_ ->
                negarTodos [ True, False, True ]
                    |> Expect.equal [ False, True, False ]
        , test "negar lista vacía" <|
            \_ ->
                negarTodos []
                    |> Expect.equal []
        ]



-- ============================================================================
-- PARTE 2: ENTENDIENDO FILTER
-- ============================================================================


testsPares : Test
testsPares =
    describe "Tests para pares"
        [ test "pares lista normal" <|
            \_ ->
                pares [ 1, 2, 3, 4, 5 ]
                    |> Expect.equal [ 2, 4 ]
        , test "pares lista vacía" <|
            \_ ->
                pares []
                    |> Expect.equal []
        , test "pares sin elementos" <|
            \_ ->
                pares [ 1, 3, 5 ]
                    |> Expect.equal []
        ]


testsPositivos : Test
testsPositivos =
    describe "Tests para positivos"
        [ test "positivos lista normal" <|
            \_ ->
                positivos [ -1, 2, -3, 4 ]
                    |> Expect.equal [ 2, 4 ]
        , test "positivos lista vacía" <|
            \_ ->
                positivos []
                    |> Expect.equal []
        , test "positivos todos negativos" <|
            \_ ->
                positivos [ -1, -2, -3 ]
                    |> Expect.equal []
        ]


testsStringsLargos : Test
testsStringsLargos =
    describe "Tests para stringsLargos"
        [ test "strings largos lista normal" <|
            \_ ->
                stringsLargos [ "hola", "buenos dias", "mundo" ]
                    |> Expect.equal [ "buenos dias", "mundo" ]
        , test "strings largos lista vacía" <|
            \_ ->
                stringsLargos []
                    |> Expect.equal []
        ]


testsSoloVerdaderos : Test
testsSoloVerdaderos =
    describe "Tests para soloVerdaderos"
        [ test "solo verdaderos lista normal" <|
            \_ ->
                soloVerdaderos [ True, False, True ]
                    |> Expect.equal [ True, True ]
        , test "solo verdaderos lista vacía" <|
            \_ ->
                soloVerdaderos []
                    |> Expect.equal []
        ]


testsMayoresQue : Test
testsMayoresQue =
    describe "Tests para mayoresQue"
        [ test "mayores que 3" <|
            \_ ->
                mayoresQue 3 [ 1, 2, 3, 4, 5 ]
                    |> Expect.equal [ 4, 5 ]
        , test "mayores que con lista vacía" <|
            \_ ->
                mayoresQue 3 []
                    |> Expect.equal []
        ]



-- ============================================================================
-- PARTE 3: ENTENDIENDO FOLD
-- ============================================================================


testsSumaFold : Test
testsSumaFold =
    describe "Tests para sumaFold"
        [ test "suma lista normal" <|
            \_ ->
                sumaFold [ 1, 2, 3, 4 ]
                    |> Expect.equal 10
        , test "suma lista vacía" <|
            \_ ->
                sumaFold []
                    |> Expect.equal 0
        ]


testsProducto : Test
testsProducto =
    describe "Tests para producto"
        [ test "producto lista normal" <|
            \_ ->
                producto [ 2, 3, 4 ]
                    |> Expect.equal 24
        , test "producto con cero" <|
            \_ ->
                producto [ 2, 0, 4 ]
                    |> Expect.equal 0
        ]


testsContarFold : Test
testsContarFold =
    describe "Tests para contarFold"
        [ test "contar lista normal" <|
            \_ ->
                contarFold [ 1, 2, 3 ]
                    |> Expect.equal 3
        , test "contar lista vacía" <|
            \_ ->
                contarFold []
                    |> Expect.equal 0
        ]


testsConcatenar : Test
testsConcatenar =
    describe "Tests para concatenar"
        [ test "concatenar strings" <|
            \_ ->
                concatenar [ "Hola", " ", "Mundo" ]
                    |> Expect.equal "Hola Mundo"
        , test "concatenar lista vacía" <|
            \_ ->
                concatenar []
                    |> Expect.equal ""
        ]


testsMaximo : Test
testsMaximo =
    describe "Tests para maximo"
        [ test "maximo lista normal" <|
            \_ ->
                maximo [ 3, 1, 4, 1, 5 ]
                    |> Expect.equal 5
        , test "maximo lista vacía" <|
            \_ ->
                maximo []
                    |> Expect.equal 0
        ]


testsInvertirFold : Test
testsInvertirFold =
    describe "Tests para invertirFold"
        [ test "invertir lista normal" <|
            \_ ->
                invertirFold [ 1, 2, 3 ]
                    |> Expect.equal [ 3, 2, 1 ]
        , test "invertir lista vacía" <|
            \_ ->
                invertirFold []
                    |> Expect.equal []
        ]


testsTodos : Test
testsTodos =
    describe "Tests para todos"
        [ test "todos positivos - True" <|
            \_ ->
                todos (\x -> x > 0) [ 1, 2, 3 ]
                    |> Expect.equal True
        , test "todos positivos - False" <|
            \_ ->
                todos (\x -> x > 0) [ 1, -2, 3 ]
                    |> Expect.equal False
        , test "todos lista vacía" <|
            \_ ->
                todos (\x -> x > 0) []
                    |> Expect.equal True
        ]


testsAlguno : Test
testsAlguno =
    describe "Tests para alguno"
        [ test "alguno mayor que 5 - True" <|
            \_ ->
                alguno (\x -> x > 5) [ 1, 2, 6 ]
                    |> Expect.equal True
        , test "alguno mayor que 5 - False" <|
            \_ ->
                alguno (\x -> x > 5) [ 1, 2, 3 ]
                    |> Expect.equal False
        , test "alguno lista vacía" <|
            \_ ->
                alguno (\x -> x > 5) []
                    |> Expect.equal False
        ]



-- ============================================================================
-- PARTE 4: COMBINANDO OPERACIONES
-- ============================================================================


testsSumaDeCuadrados : Test
testsSumaDeCuadrados =
    describe "Tests para sumaDeCuadrados"
        [ test "suma de cuadrados [1,2,3]" <|
            \_ ->
                sumaDeCuadrados [ 1, 2, 3 ]
                    |> Expect.equal 14
        , test "suma de cuadrados lista vacía" <|
            \_ ->
                sumaDeCuadrados []
                    |> Expect.equal 0
        ]


testsContarPares : Test
testsContarPares =
    describe "Tests para contarPares"
        [ test "contar pares lista normal" <|
            \_ ->
                contarPares [ 1, 2, 3, 4, 5 ]
                    |> Expect.equal 2
        , test "contar pares lista vacía" <|
            \_ ->
                contarPares []
                    |> Expect.equal 0
        ]


testsPromedio : Test
testsPromedio =
    describe "Tests para promedio"
        [ test "promedio lista normal" <|
            \_ ->
                promedio [ 1.0, 2.0, 3.0 ]
                    |> Expect.within (Expect.Absolute 0.01) 2.0
        , test "promedio lista vacía" <|
            \_ ->
                promedio []
                    |> Expect.equal 0
        ]


testsLongitudesPalabras : Test
testsLongitudesPalabras =
    describe "Tests para longitudesPalabras"
        [ test "longitudes de palabras normal" <|
            \_ ->
                longitudesPalabras "hola mundo"
                    |> Expect.equal [ 4, 5 ]
        , test "longitudes de palabras vacío" <|
            \_ ->
                longitudesPalabras ""
                    |> Expect.equal [ 0 ]
        ]


testsPalabrasLargas : Test
testsPalabrasLargas =
    describe "Tests para palabrasLargas"
        [ test "palabras largas normal" <|
            \_ ->
                palabrasLargas "Yo estoy aprendiendo Elm"
                    |> Expect.equal [ "estoy", "aprendiendo" ]
        , test "palabras largas sin coincidencias" <|
            \_ ->
                palabrasLargas "Yo soy un"
                    |> Expect.equal []
        ]


testsSumarPositivos : Test
testsSumarPositivos =
    describe "Tests para sumarPositivos"
        [ test "sumar positivos lista normal" <|
            \_ ->
                sumarPositivos [ 1, -2, 3, -4, 5 ]
                    |> Expect.equal 9
        , test "sumar positivos lista vacía" <|
            \_ ->
                sumarPositivos []
                    |> Expect.equal 0
        ]


testsDuplicarPares : Test
testsDuplicarPares =
    describe "Tests para duplicarPares"
        [ test "duplicar pares lista normal" <|
            \_ ->
                duplicarPares [ 1, 2, 3, 4 ]
                    |> Expect.equal [ 1, 4, 3, 8 ]
        , test "duplicar pares lista vacía" <|
            \_ ->
                duplicarPares []
                    |> Expect.equal []
        ]



-- ============================================================================
-- PARTE 5: DESAFÍOS AVANZADOS
-- ============================================================================


testsAplanar : Test
testsAplanar =
    describe "Tests para aplanar"
        [ test "aplanar lista normal" <|
            \_ ->
                aplanar [ [ 1, 2 ], [ 3, 4 ], [ 5 ] ]
                    |> Expect.equal [ 1, 2, 3, 4, 5 ]
        , test "aplanar lista vacía" <|
            \_ ->
                aplanar []
                    |> Expect.equal []
        ]


testsAgruparPor : Test
testsAgruparPor =
    describe "Tests para agruparPor"
        [ test "agrupar por igualdad" <|
            \_ ->
                agruparPor (==) [ 1, 1, 2, 2, 3, 1 ]
                    |> Expect.equal [ [ 1, 1 ], [ 2, 2 ], [ 3 ], [ 1 ] ]
        , test "agrupar lista vacía" <|
            \_ ->
                agruparPor (==) []
                    |> Expect.equal []
        ]


testsParticionar : Test
testsParticionar =
    describe "Tests para particionar"
        [ test "particionar mayores que 3" <|
            \_ ->
                particionar (\x -> x > 3) [ 1, 2, 3, 4, 5 ]
                    |> Expect.equal ( [ 4, 5 ], [ 1, 2, 3 ] )
        , test "particionar lista vacía" <|
            \_ ->
                particionar (\x -> x > 3) []
                    |> Expect.equal ( [], [] )
        ]


testsSumaAcumulada : Test
testsSumaAcumulada =
    describe "Tests para sumaAcumulada"
        [ test "suma acumulada lista normal" <|
            \_ ->
                sumaAcumulada [ 1, 2, 3, 4 ]
                    |> Expect.equal [ 1, 3, 6, 10 ]
        , test "suma acumulada lista vacía" <|
            \_ ->
                sumaAcumulada []
                    |> Expect.equal []
        ]



-- ============================================================================
-- EJERCICIOS OPCIONALES
-- ============================================================================


testsSubSets : Test
testsSubSets =
    describe "Tests para subSets (opcional)"
        [ test "subsets de lista vacía" <|
            \_ ->
                subSets []
                    |> Expect.equal [ [] ]
        , test "subsets de un elemento - cantidad" <|
            \_ ->
                subSets [ 1 ]
                    |> List.length
                    |> Expect.equal 2
        , test "subsets de dos elementos - cantidad" <|
            \_ ->
                subSets [ 1, 2 ]
                    |> List.length
                    |> Expect.equal 4
        , test "subsets de tres elementos - cantidad" <|
            \_ ->
                subSets [ 1, 2, 3 ]
                    |> List.length
                    |> Expect.equal 8
        ]


testsCortar : Test
testsCortar =
    describe "Tests para cortar (opcional)"
        [ test "cortar en grupos de 2" <|
            \_ ->
                cortar [ 1, 2, 3, 4, 5, 6 ] 2
                    |> Expect.equal [ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ] ]
        , test "cortar con resto" <|
            \_ ->
                cortar [ 1, 2, 3, 4, 5 ] 2
                    |> Expect.equal [ [ 1, 2 ], [ 3, 4 ], [ 5 ] ]
        , test "cortar lista vacía" <|
            \_ ->
                cortar [] 2
                    |> Expect.equal []
        ]



-- ============================================================================
-- SUITE PRINCIPAL DE TESTS
-- ============================================================================


suite : Test
suite =
    describe "Suite completa de tests para Clase3"
        [ -- Parte 0: Implementaciones Personalizadas
          testsMiMap
        , testsMiFiltro
        , testsMiFoldl

        -- Parte 1: Entendiendo Map
        , testsDuplicar
        , testsLongitudes
        , testsIncrementarTodos
        , testsTodasMayusculas
        , testsNegarTodos

        -- Parte 2: Entendiendo Filter
        , testsPares
        , testsPositivos
        , testsStringsLargos
        , testsSoloVerdaderos
        , testsMayoresQue

        -- Parte 3: Entendiendo Fold
        , testsSumaFold
        , testsProducto
        , testsContarFold
        , testsConcatenar
        , testsMaximo
        , testsInvertirFold
        , testsTodos
        , testsAlguno

        -- Parte 4: Combinando Operaciones
        , testsSumaDeCuadrados
        , testsContarPares
        , testsPromedio
        , testsLongitudesPalabras
        , testsPalabrasLargas
        , testsSumarPositivos
        , testsDuplicarPares

        -- Parte 5: Desafíos Avanzados
        , testsAplanar
        , testsAgruparPor
        , testsParticionar
        , testsSumaAcumulada

        -- Ejercicios Opcionales
        , testsSubSets
        , testsCortar
        ]
