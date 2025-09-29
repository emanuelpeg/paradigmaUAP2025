module Main exposing (..)

import Clase2
import Html exposing (Html, div, text, h1, h2, p)
import Html.Attributes exposing (style)


-- Lista de ejemplo para las pruebas
listaEjemplo : List Int
listaEjemplo = [5, 2, 8, 1, 9, 3]

listaEjemplo2 : List Int
listaEjemplo2 = [4, 7, 6]

listaVacia : List Int
listaVacia = []

-- Función auxiliar para transformar
doble : Int -> Int
doble x = x * 2

-- Función principal que muestra los resultados
main : Html msg
main =
    div [ style "padding" "20px", style "font-family" "Arial, sans-serif" ]
        [ h1 [] [ text "Pruebas de Funciones - Clase 2" ]
        , h2 [] [ text "Lista de ejemplo: [5, 2, 8, 1, 9, 3]" ]
        , h2 [] [ text "Segunda lista: [4, 7, 6]" ]
        
        -- Pruebas de concatenación
        , div []
            [ h2 [] [ text "Concatenación" ]
            , p [] [ text ("concatenar listaEjemplo listaEjemplo2 = " ++ listaToString (Clase2.concatenar listaEjemplo listaEjemplo2)) ]
            ]
            
        -- Pruebas de búsqueda de máximo y mínimo
        , div []
            [ h2 [] [ text "Máximo y Mínimo" ]
            , p [] [ text ("max listaEjemplo = " ++ String.fromInt (Clase2.max listaEjemplo)) ]
            , p [] [ text ("min listaEjemplo = " ++ String.fromInt (Clase2.min listaEjemplo)) ]
            ]
            
        -- Pruebas de filtros
        , div []
            [ h2 [] [ text "Filtros" ]
            , p [] [ text ("maximos listaEjemplo 4 = " ++ listaToString (Clase2.maximos listaEjemplo 4)) ]
            , p [] [ text ("minimos listaEjemplo 4 = " ++ listaToString (Clase2.minimos listaEjemplo 4)) ]
            , p [] [ text ("filtrarPares listaEjemplo = " ++ listaToString (Clase2.filtrarPares listaEjemplo)) ]
            , p [] [ text ("filtrarMultiplosDeTres [1,2,3,6,9,10] = " ++ listaToString (Clase2.filtrarMultiplosDeTres [1,2,3,6,9,10])) ]
            ]
            
        -- Pruebas de conteo y acumulación
        , div []
            [ h2 [] [ text "Conteo y Acumulación" ]
            , p [] [ text ("contar listaEjemplo = " ++ String.fromInt (Clase2.contar listaEjemplo)) ]
            , p [] [ text ("acc listaEjemplo = " ++ String.fromInt (Clase2.acc listaEjemplo)) ]
            , p [] [ text ("acumularDoble [1,2,3] = " ++ String.fromInt (Clase2.acumularDoble [1,2,3])) ]
            , p [] [ text ("acumularCuadrado [1,2,3] = " ++ String.fromInt (Clase2.acumularCuadrado [1,2,3])) ]
            ]
            
        -- Pruebas de transformación
        , div []
            [ h2 [] [ text "Transformación" ]
            , p [] [ text ("transformar [1,2,3] doble = " ++ listaToString (Clase2.transformar [1,2,3] doble)) ]
            ]
            
        -- Pruebas de existencia
        , div []
            [ h2 [] [ text "Existencia" ]
            , p [] [ text ("existe listaEjemplo 8 = " ++ boolToString (Clase2.existe listaEjemplo 8)) ]
            , p [] [ text ("existe listaEjemplo 10 = " ++ boolToString (Clase2.existe listaEjemplo 10)) ]
            ]
            
        -- Pruebas de unión
        , div []
            [ h2 [] [ text "Unión sin duplicados" ]
            , p [] [ text ("unirOfSet [1,2,3] [2,3,4] = " ++ listaToString (Clase2.unirOfSet [1,2,3] [2,3,4])) ]
            ]
            
        -- Pruebas con buscar usando comparadores
        , div []
            [ h2 [] [ text "Búsqueda con comparadores" ]
            , p [] [ text ("buscar listaEjemplo (>) = " ++ String.fromInt (Clase2.buscar listaEjemplo (>))) ]
            , p [] [ text ("buscar listaEjemplo (<) = " ++ String.fromInt (Clase2.buscar listaEjemplo (<))) ]
            ]
            
        -- Pruebas de QuickSort
        , div []
            [ h2 [] [ text "Ordenamiento (QuickSort)" ]
            , p [] [ text ("quickSort [3,1,4,1,5,9,2,6] = " ++ listaToString (Clase2.quickSort [3,1,4,1,5,9,2,6])) ]
            , p [] [ text ("quickSort listaEjemplo = " ++ listaToString (Clase2.quickSort listaEjemplo)) ]
            ]
            
        -- Pruebas de obtener elemento y mediana
        , div []
            [ h2 [] [ text "Acceso por posición y estadísticas" ]
            , p [] [ text ("obtenerElemento listaEjemplo 0 = " ++ String.fromInt (Clase2.obtenerElemento listaEjemplo 0)) ]
            , p [] [ text ("obtenerElemento listaEjemplo 2 = " ++ String.fromInt (Clase2.obtenerElemento listaEjemplo 2)) ]
            , p [] [ text ("mediana listaEjemplo = " ++ String.fromInt (Clase2.mediana listaEjemplo)) ]
            , p [] [ text ("mediana [1,2,3,4,5] = " ++ String.fromInt (Clase2.mediana [1,2,3,4,5])) ]
            ]
            
        -- Pruebas de funciones auxiliares
        , div []
            [ h2 [] [ text "Funciones auxiliares" ]
            , p [] [ text ("tomar 3 listaEjemplo = " ++ listaToString (Clase2.tomar 3 listaEjemplo)) ]
            , p [] [ text ("saltar 2 listaEjemplo = " ++ listaToString (Clase2.saltar 2 listaEjemplo)) ]
            , p [] [ text ("cortar [1,2,3,4,5,6,7] 3 = " ++ listaListToString (Clase2.cortar [1,2,3,4,5,6,7] 3)) ]
            ]
            
        -- Pruebas de subconjuntos (opcional)
        , div []
            [ h2 [] [ text "Subconjuntos (Opcional)" ]
            , p [] [ text ("subSets [1,2,3] = " ++ listaListToString (Clase2.subSets [1,2,3])) ]
            ]
        ]

-- Función auxiliar para convertir listas a string
listaToString : List Int -> String
listaToString lista =
    "[" ++ String.join ", " (List.map String.fromInt lista) ++ "]"

-- Función auxiliar para convertir listas de listas a string
listaListToString : List (List Int) -> String
listaListToString listaListas =
    "[" ++ String.join ", " (List.map listaToString listaListas) ++ "]"

-- Función auxiliar para convertir Bool a String
boolToString : Bool -> String
boolToString bool =
    if bool then "True" else "False"