module TestREPL exposing (..)

{-| Módulo simplificado para probar las funciones en el REPL de Elm
    
    Para usar este módulo en el REPL:
    
    1. Abre el terminal en el directorio del proyecto
    2. Ejecuta: elm repl
    3. Importa las funciones: import Clase2 exposing (..)
    4. Prueba las funciones directamente
    
-}

-- Listas de ejemplo para usar en el REPL
lista1 = [5, 2, 8, 1, 9, 3]
lista2 = [4, 7, 6]
lista3 = [1, 2, 3, 4, 5, 6]
listaVacia = []

-- Funciones auxiliares
toString : List Int -> String
toString lista =
    "[" ++ String.join "," (List.map String.fromInt lista) ++ "]"

boolToString : Bool -> String
boolToString bool =
    if bool then "True" else "False"