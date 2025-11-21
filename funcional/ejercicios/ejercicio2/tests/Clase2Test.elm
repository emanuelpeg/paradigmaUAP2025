module Clase2Test exposing (..)

import Clase2 exposing (..)
import Expect
import Test exposing (..)


{-| Tests Unitarios para los Ejercicios de Programación Funcional - Clase 2

Para ejecutar estos tests:

1.  Instalar elm-test: npm install -g elm-test
2.  Ejecutar: elm-test

Estos tests cubren todos los ejercicios y casos borde importantes.

-}



-- TESTS PARA CONCATENAR


testsConcatenar : Test
testsConcatenar =
    describe "Tests para concatenar"
        [ test "concatenar dos listas normales" <|
            \_ ->
                concatenar [ 1, 2, 3 ] [ 4, 5, 6 ]
                    |> Expect.equal [ 1, 2, 3, 4, 5, 6 ]
        , test "concatenar lista vacía con lista normal" <|
            \_ ->
                concatenar [] [ 1, 2, 3 ]
                    |> Expect.equal [ 1, 2, 3 ]
        , test "concatenar lista normal con lista vacía" <|
            \_ ->
                concatenar [ 1, 2, 3 ] []
                    |> Expect.equal [ 1, 2, 3 ]
        , test "concatenar dos listas vacías" <|
            \_ ->
                concatenar [] []
                    |> Expect.equal []
        ]



-- TESTS PARA BUSCAR


testsBuscar : Test
testsBuscar =
    describe "Tests para buscar"
        [ test "buscar elemento que existe (mayor)" <|
            \_ ->
                buscar [ 1, 5, 3, 2, 4 ] (\a b -> a > b)
                    |> Expect.equal 5
        , test "buscar elemento que existe (menor)" <|
            \_ ->
                buscar [ 1, 5, 3, 2, 4 ] (\a b -> a < b)
                    |> Expect.equal 1
        , test "buscar en lista vacía" <|
            \_ ->
                buscar [] (\a b -> a > b)
                    |> Expect.equal 0
        , test "buscar en lista con un elemento" <|
            \_ ->
                buscar [ 42 ] (\a b -> a > b)
                    |> Expect.equal 42
        ]



-- TESTS PARA MAX Y MIN


testsMaxMin : Test
testsMaxMin =
    describe "Tests para max y min"
        [ test "max de lista normal" <|
            \_ ->
                Clase2.max [ 1, 5, 3, 2, 4 ]
                    |> Expect.equal 5
        , test "max de lista vacía" <|
            \_ ->
                Clase2.max []
                    |> Expect.equal 0
        , test "max de lista con un elemento" <|
            \_ ->
                Clase2.max [ 42 ]
                    |> Expect.equal 42
        , test "max con números negativos" <|
            \_ ->
                Clase2.max [ -5, -1, -10, -3 ]
                    |> Expect.equal -1
        , test "min de lista normal" <|
            \_ ->
                Clase2.min [ 1, 5, 3, 2, 4 ]
                    |> Expect.equal 1
        , test "min de lista vacía" <|
            \_ ->
                Clase2.min []
                    |> Expect.equal 0
        , test "min con números negativos" <|
            \_ ->
                Clase2.min [ -5, -1, -10, -3 ]
                    |> Expect.equal -10
        ]



-- TESTS PARA MAXIMOS Y MINIMOS


testsMaximosMinimos : Test
testsMaximosMinimos =
    describe "Tests para maximos y minimos"
        [ test "maximos con umbral en el medio" <|
            \_ ->
                maximos [ 1, 2, 3, 4, 5 ] 3
                    |> Expect.equal [ 4, 5 ]
        , test "maximos sin elementos que cumplan" <|
            \_ ->
                maximos [ 1, 2, 3 ] 5
                    |> Expect.equal []
        , test "maximos con todos los elementos" <|
            \_ ->
                maximos [ 5, 6, 7 ] 3
                    |> Expect.equal [ 5, 6, 7 ]
        , test "maximos lista vacía" <|
            \_ ->
                maximos [] 3
                    |> Expect.equal []
        , test "minimos con umbral en el medio" <|
            \_ ->
                minimos [ 1, 2, 3, 4, 5 ] 3
                    |> Expect.equal [ 1, 2 ]
        , test "minimos sin elementos que cumplan" <|
            \_ ->
                minimos [ 5, 6, 7 ] 3
                    |> Expect.equal []
        , test "minimos con números negativos" <|
            \_ ->
                minimos [ -5, -1, 2, 4 ] 0
                    |> Expect.equal [ -5, -1 ]
        ]



-- TESTS PARA QUICKSORT


testsQuickSort : Test
testsQuickSort =
    describe "Tests para quickSort"
        [ test "quickSort lista desordenada" <|
            \_ ->
                quickSort [ 3, 1, 4, 1, 5, 9, 2, 6 ]
                    |> Expect.equal [ 1, 1, 2, 3, 4, 5, 6, 9 ]
        , test "quickSort lista vacía" <|
            \_ ->
                quickSort []
                    |> Expect.equal []
        , test "quickSort lista con un elemento" <|
            \_ ->
                quickSort [ 42 ]
                    |> Expect.equal [ 42 ]
        , test "quickSort lista ya ordenada" <|
            \_ ->
                quickSort [ 1, 2, 3, 4, 5 ]
                    |> Expect.equal [ 1, 2, 3, 4, 5 ]
        , test "quickSort lista ordenada al revés" <|
            \_ ->
                quickSort [ 5, 4, 3, 2, 1 ]
                    |> Expect.equal [ 1, 2, 3, 4, 5 ]
        , test "quickSort con números negativos" <|
            \_ ->
                quickSort [ -3, 1, -4, 1, -5, 9, -2, 6 ]
                    |> Expect.equal [ -5, -4, -3, -2, 1, 1, 6, 9 ]
       ]



-- TESTS PARA OBTENER ELEMENTO


testsObtenerElemento : Test
testsObtenerElemento =
    describe "Tests para obtenerElemento"
        [ test "obtener primer elemento" <|
            \_ ->
                obtenerElemento [ 1, 2, 3, 4, 5 ] 0
                    |> Expect.equal 1
        , test "obtener elemento del medio" <|
            \_ ->
                obtenerElemento [ 1, 2, 3, 4, 5 ] 2
                    |> Expect.equal 3
        , test "obtener último elemento" <|
            \_ ->
                obtenerElemento [ 1, 2, 3, 4, 5 ] 4
                    |> Expect.equal 5
        , test "obtener elemento fuera de rango" <|
            \_ ->
                obtenerElemento [ 1, 2, 3 ] 5
                    |> Expect.equal 0
        , test "obtener de lista vacía" <|
            \_ ->
                obtenerElemento [] 0
                    |> Expect.equal 0
        , test "obtener con índice negativo" <|
            \_ ->
                obtenerElemento [ 1, 2, 3 ] -1
                    |> Expect.equal 0
        ]



-- TESTS PARA MEDIANA


testsMediana : Test
testsMediana =
    describe "Tests para mediana"
        [ test "mediana de lista impar" <|
            \_ ->
                mediana [ 1, 3, 5, 7, 9 ]
                    |> Expect.equal 5
        , test "mediana de lista par" <|
            \_ ->
                mediana [ 1, 2, 3, 4 ]
                    |> Expect.equal 2
        , test "mediana de lista desordenada" <|
            \_ ->
                mediana [ 3, 1, 4, 1, 5 ]
                    |> Expect.equal 3
        , test "mediana de un elemento" <|
            \_ ->
                mediana [ 42 ]
                    |> Expect.equal 42
        ]
 


-- TESTS PARA CONTAR Y ACUMULAR


testsContarAcc : Test
testsContarAcc =
    describe "Tests para contar y acc"
        [ test "contar lista normal" <|
            \_ ->
                contar [ 1, 2, 3, 4, 5 ]
                    |> Expect.equal 5
        , test "contar lista vacía" <|
            \_ ->
                contar []
                    |> Expect.equal 0
        , test "contar un elemento" <|
            \_ ->
                contar [ 42 ]
                    |> Expect.equal 1
        , test "acc suma normal" <|
            \_ ->
                acc [ 1, 2, 3, 4, 5 ]
                    |> Expect.equal 15
        , test "acc lista vacía" <|
            \_ ->
                acc []
                    |> Expect.equal 0
        , test "acc con números negativos" <|
            \_ ->
                acc [ -1, 2, -3, 4 ]
                    |> Expect.equal 2
        ]



-- TESTS PARA FILTRAR


testsFiltrar : Test
testsFiltrar =
    describe "Tests para filtrar y sus variantes"
        [ test "filtrar números pares" <|
            \_ ->
                filtrar [ 1, 2, 3, 4, 5, 6 ] (\x -> modBy 2 x == 0)
                    |> Expect.equal [ 2, 4, 6 ]
        , test "filtrar números impares" <|
            \_ ->
                filtrar [ 1, 2, 3, 4, 5, 6 ] (\x -> modBy 2 x == 1)
                    |> Expect.equal [ 1, 3, 5 ]
        , test "filtrar lista vacía" <|
            \_ ->
                filtrar [] (\x -> x > 0)
                    |> Expect.equal []
        , test "filtrar sin elementos que cumplan" <|
            \_ ->
                filtrar [ 1, 2, 3 ] (\x -> x > 10)
                    |> Expect.equal []
         , test "filtrarPares" <|
            \_ ->
                filtrarPares [ 1, 2, 3, 4, 5, 6 ]
                    |> Expect.equal [ 2, 4, 6 ]
        , test "filtrarMultiplosDeTres" <|
            \_ ->
                filtrarMultiplosDeTres [ 1, 2, 3, 6, 9, 10, 12 ]
                    |> Expect.equal [ 3, 6, 9, 12 ] 
        ]



-- TESTS PARA ACUMULAR


testsAcumular : Test
testsAcumular =
    describe "Tests para acumular y sus variantes"
        [ test "acumular con función identidad" <|
            \_ ->
                acumular [ 1, 2, 3, 4, 5 ] (\x -> x)
                    |> Expect.equal 15
        , test "acumular con función doble" <|
            \_ ->
                acumular [ 1, 2, 3 ] (\x -> x * 2)
                    |> Expect.equal 12

        -- (2 + 4 + 6)
        , test "acumular con función cuadrado" <|
            \_ ->
                acumular [ 1, 2, 3 ] (\x -> x * x)
                    |> Expect.equal 14

        -- (1 + 4 + 9)
        , test "acumularUnidad" <|
            \_ ->
                acumularUnidad [ 1, 2, 3, 4, 5 ]
                    |> Expect.equal 15
        , test "acumularDoble" <|
            \_ ->
                acumularDoble [ 1, 2, 3 ]
                    |> Expect.equal 12
        , test "acumularCuadrado" <|
            \_ ->
                acumularCuadrado [ 1, 2, 3 ]
                    |> Expect.equal 14
        , test "acumular lista vacía" <|
            \_ ->
                acumular [] (\x -> x * 2)
                    |> Expect.equal 0
        ]

 

-- TESTS PARA TRANSFORMAR


testsTransformar : Test
testsTransformar =
    describe "Tests para transformar"
        [ test "transformar a strings" <|
            \_ ->
                transformar [ 1, 2, 3 ] String.fromInt
                    |> Expect.equal [ "1", "2", "3" ]
        , test "transformar duplicando" <|
            \_ ->
                transformar [ 1, 2, 3 ] (\x -> x * 2)
                    |> Expect.equal [ 2, 4, 6 ]
        , test "transformar a booleanos (pares)" <|
            \_ ->
                transformar [ 1, 2, 3, 4 ] (\x -> modBy 2 x == 0)
                    |> Expect.equal [ False, True, False, True ]
        , test "transformar lista vacía" <|
            \_ ->
                transformar [] (\x -> x * 2)
                    |> Expect.equal []
        ]
 


-- TESTS PARA EXISTE


testsExiste : Test
testsExiste =
    describe "Tests para existe"
        [ test "existe elemento presente" <|
            \_ ->
                existe [ 1, 2, 3, 4, 5 ] 3
                    |> Expect.equal True
        , test "existe elemento ausente" <|
            \_ ->
                existe [ 1, 2, 3, 4, 5 ] 6
                    |> Expect.equal False
        , test "existe en lista vacía" <|
            \_ ->
                existe [] 1
                    |> Expect.equal False
        , test "existe primer elemento" <|
            \_ ->
                existe [ 1, 2, 3 ] 1
                    |> Expect.equal True
        , test "existe último elemento" <|
            \_ ->
                existe [ 1, 2, 3 ] 3
                    |> Expect.equal True
        ]
 


-- TESTS PARA UNIR SIN DUPLICADOS


testsUnirOfSet : Test
testsUnirOfSet =
    describe "Tests para unirOfSet"
        [ test "unir sin duplicados - caso normal" <|
            \_ ->
                unirOfSet [ 1, 2, 3 ] [ 3, 4, 5 ]
                    |> Expect.equal [ 1, 2, 3, 4, 5 ]
        , test "unir sin duplicados - muchos duplicados" <|
            \_ ->
                unirOfSet [ 1, 2, 2, 3 ] [ 2, 3, 4, 4, 5 ]
                    |> Expect.equal [ 1, 2, 3, 4, 5 ]
        , test "unir sin duplicados - listas idénticas" <|
            \_ ->
                unirOfSet [ 1, 2, 3 ] [ 1, 2, 3 ]
                    |> Expect.equal [ 1, 2, 3 ]
        , test "unir sin duplicados - sin duplicados reales" <|
            \_ ->
                unirOfSet [ 1, 2 ] [ 3, 4 ]
                    |> Expect.equal [ 1, 2, 3, 4 ]
        ]



-- TESTS PARA REMOVER DUPLICADOS


testsRemoverDuplicados : Test
testsRemoverDuplicados =
    describe "Tests para removerDuplicados"
        [ test "remover duplicados normales" <|
            \_ ->
                removerDuplicados [ 1, 2, 2, 3, 3, 3, 4 ]
                    |> Expect.equal [ 1, 2, 3, 4 ]
        , test "remover duplicados - sin duplicados" <|
            \_ ->
                removerDuplicados [ 1, 2, 3, 4 ]
                    |> Expect.equal [ 1, 2, 3, 4 ]
        , test "remover duplicados - todos iguales" <|
            \_ ->
                removerDuplicados [ 2, 2, 2, 2 ]
                    |> Expect.equal [ 2 ]
        , test "remover duplicados - lista vacía" <|
            \_ ->
                removerDuplicados []
                    |> Expect.equal []
        ]

 

-- TESTS PARA SUBSETS (OPCIONAL)

{- 
testsSubSets : Test
testsSubSets =
    describe "Tests para subSets (opcional)"
        [ test "subsets de lista vacía" <|
            \_ ->
                subSets []
                    |> Expect.equal [ [] ]
        , test "subsets de un elemento" <|
            \_ ->
                subSets [ 1 ]
                    |> List.sort
                    |> Expect.equal (List.sort [ [], [ 1 ] ])
        , test "subsets de dos elementos" <|
            \_ ->
                subSets [ 1, 2 ]
                    |> List.length
                    |> Expect.equal 4

        -- [], [1], [2], [1,2]
        , test "subsets de tres elementos - cantidad correcta" <|
            \_ ->
                subSets [ 1, 2, 3 ]
                    |> List.length
                    |> Expect.equal 8

        -- 2^3 = 8 subconjuntos
        ]

 -}

-- TESTS PARA CORTAR (OPCIONAL)

{- 
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
        , test "cortar en grupos de 1" <|
            \_ ->
                cortar [ 1, 2, 3 ] 1
                    |> Expect.equal [ [ 1 ], [ 2 ], [ 3 ] ]
        , test "cortar con n mayor que la lista" <|
            \_ ->
                cortar [ 1, 2 ] 5
                    |> Expect.equal [ [ 1, 2 ] ]
        ]

 -}

-- TESTS PARA FUNCIONES AUXILIARES
{- 

testsFuncionesAuxiliares : Test
testsFuncionesAuxiliares =
    describe "Tests para funciones auxiliares"
        [ test "tomar primeros n elementos" <|
            \_ ->
                tomar 3 [ 1, 2, 3, 4, 5 ]
                    |> Expect.equal [ 1, 2, 3 ]
        , test "tomar más elementos de los disponibles" <|
            \_ ->
                tomar 10 [ 1, 2, 3 ]
                    |> Expect.equal [ 1, 2, 3 ]
        , test "tomar 0 elementos" <|
            \_ ->
                tomar 0 [ 1, 2, 3 ]
                    |> Expect.equal []
        , test "saltar primeros n elementos" <|
            \_ ->
                saltar 2 [ 1, 2, 3, 4, 5 ]
                    |> Expect.equal [ 3, 4, 5 ]
        , test "saltar más elementos de los disponibles" <|
            \_ ->
                saltar 10 [ 1, 2, 3 ]
                    |> Expect.equal []
        , test "saltar 0 elementos" <|
            \_ ->
                saltar 0 [ 1, 2, 3 ]
                    |> Expect.equal [ 1, 2, 3 ]
        ]


 -}
-- SUITE PRINCIPAL DE TESTS

{- 
suite : Test
suite =
    describe "Suite completa de tests para Clase2"
        [ testsBuscar
        , testsConcatenar
        , testsMaxMin
        , testsMaximosMinimos
        , testsQuickSort
        , testsObtenerElemento
        , testsMediana
        , testsContarAcc
        , testsFiltrar
        , testsAcumular
        , testsTransformar
        , testsExiste
        , testsUnirOfSet
        , testsRemoverDuplicados
        , testsSubSets
        , testsCortar
        , testsFuncionesAuxiliares
        ]
 -}