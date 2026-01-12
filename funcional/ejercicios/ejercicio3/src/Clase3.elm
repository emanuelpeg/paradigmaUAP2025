module Clase3 exposing (..)
import Html exposing (li)
import Html.Attributes exposing (list)
import List exposing (sum)
import List exposing (isEmpty)
import List exposing (foldl)
import Char exposing (isOctDigit)
import Html exposing (pre)

head : List a -> a
head list =
    case List.head list of
        Just h -> 
            h

        Nothing ->
            Debug.todo "head called on empty list"


tail : List a -> List a
tail list =
    Maybe.withDefault [] (List.tail list)


isEmpty : List a -> Bool
isEmpty list =
    List.isEmpty list


{-| Ejercicios de Programación Funcional - Clase 3
Este módulo contiene ejercicios para practicar funciones de orden superior en Elm.
Cada función debe implementarse usando principios de programación funcional.

Nota: Las funciones que podrían fallar devuelven valores por defecto (0)
en lugar de usar Maybe. Trabajamos con List de Elm.

-}


-- ============================================================================
-- PARTE 0: IMPLEMENTACIONES PERSONALIZADAS
-- ============================================================================
-- Implementá tus propias versiones de map, filter y fold usando recursión


-- 1. Map Personalizado
-- Implementá tu propia versión de map usando recursión y las funciones genéricas head, tail e isEmpty


miMap : (a -> b) -> List a -> List b
miMap fx lista =
    if isEmpty lista then 
        []
    else 
        fx (head lista) :: (miMap fx (tail lista))



-- 2. Filter Personalizado
-- Implementá tu propia versión de filter usando recursión


miFiltro : (a -> Bool) -> List a -> List a
miFiltro predicado lista =
    if isEmpty lista then 
        []
    else 
        let 
            h = head lista 
    in
    if (predicado h) then 
        h :: (miFiltro  predicado (tail lista))
    else 
        miFiltro predicado (tail lista)



-- 3. Foldl Personalizado
-- Implementá tu propia versión de foldl usando recursión


miFoldl : (a -> b -> b) -> b -> List a -> b
miFoldl fx acumulador lista =
    if isEmpty lista then 
        acumulador
    else 
        miFoldl fx (fx (head lista) acumulador) (tail lista)


--miFoldl (\numero state -> ++ state (String.fromInt numero)) "" [1,2,3]

-- ============================================================================
-- PARTE 1: ENTENDIENDO MAP
-- ============================================================================


-- 4. Duplicar Números
-- Escribí una función que duplique cada número en una lista


duplicar : List Int -> List Int
duplicar lista =
    miMap (\x -> x * 2 ) lista



-- 5. Longitudes de Strings
-- Convertí una lista de strings a una lista de sus longitudes


longitudes : List String -> List Int
longitudes lista =
    miMap String.length lista --me muestra la longitud de cada string



-- 6. Incrementar Todos
-- Sumá 1 a cada número en una lista


incrementarTodos : List Int -> List Int
incrementarTodos lista =
    miMap (\x -> x + 1) lista -- se lee como "para cada x en la lista, sumale 1 y devuelve una nueva lista con esos valores"



-- 7. A Mayúsculas
-- Convertí todos los strings de una lista a mayúsculas


todasMayusculas : List String -> List String
todasMayusculas lista =
    miMap String.toUpper lista



-- 8. Negar Booleanos
-- Invertí todos los valores booleanos en una lista


negarTodos : List Bool -> List Bool
negarTodos lista =
    miMap (\x -> not x) lista
    --miMap not lista  otra forma de hacerlo
    --miMap not lista



-- ============================================================================
-- PARTE 2: ENTENDIENDO FILTER
-- ============================================================================


-- 9. Números Pares
-- Mantené solo los números pares de una lista


pares : List Int -> List Int
pares lista =
    miFiltro (\x -> modBy 2 x == 0) lista



-- 10. Números Positivos
-- Mantené solo los números positivos


positivos : List Int -> List Int
positivos lista =
    miFiltro (\x -> x > 0) lista



-- 11. Strings Largos
-- Mantené solo los strings con más de 5 caracteres


stringsLargos : List String -> List String
stringsLargos lista =
    miFiltro (\s -> String.length  s> 5) lista



-- 12. Remover Falsos
-- Remové todos los valores False de una lista de booleanos


soloVerdaderos : List Bool -> List Bool
soloVerdaderos lista =
    miFiltro (\s -> s == True) lista -- se lee como "para cada elemento s en la lista, mantenelo si es True"
    --miFiltro identity lista



-- 13. Mayor Que
-- Filtrá números mayores que un valor dado


mayoresQue : Int -> List Int -> List Int
mayoresQue valor lista =
    miFiltro (\x -> x > valor) lista



-- ============================================================================
-- PARTE 3: ENTENDIENDO FOLD
-- ============================================================================


-- 14. Suma con Fold
-- Implementá suma usando List.foldl


sumaFold : List Int -> Int
sumaFold lista =
    --miFoldl (suma) 
    miFoldl (\el acum -> acum + el) 0 lista -- el es cada elemento de la lista y acum es el acumulador que empieza en 0
    -- el es cada elemento de la lista y acum es el acumulador que empieza en 0
    -- cada vez que se llama a la función, el valor de el se suma al valor de acum y se devuelve el nuevo valor de acum para la siguiente llamada




-- 15. Producto
-- Multiplicá todos los números de una lista entre sí


producto : List Int -> Int
producto lista =
    miFoldl (\el acum -> acum * el) 1 lista -- el es cada elemento de la lista y acum es el acumulador



-- 16. Contar con Fold
-- Implementá contar usando List.foldl


contarFold : List a -> Int
contarFold lista =
    miFoldl (\_ acum -> acum + 1) 0 lista



-- 17. Concatenar Strings
-- Uní todos los strings de una lista


concatenar : List String -> String
concatenar lista =
    miFoldl (\el acum -> acum ++ el) "" lista -- (++) operador de concatenación de strings



-- 18. Valor Máximo
-- Encontrá el valor máximo en una lista de números (devolvé 0 para lista vacía)


maximo : List Int -> Int
maximo lista =
    if isEmpty lista then
        0
    else
        miFoldl (\el acum -> if el > acum then el else acum) (head lista) (tail lista)


-- 19. Invertir con Fold
-- Invertí una lista usando List.foldl


invertirFold : List a -> List a
invertirFold lista =
    miFoldl (\el acum -> el :: acum) [] lista -- ::



-- 20. Todos Verdaderos
-- Verificá si todos los elementos de una lista satisfacen una condición


todos : (a -> Bool) -> List a -> Bool
todos predicado lista =
    miFoldl (\elem acum -> acum && (predicado elem)) True lista



-- 21. Alguno Verdadero
-- Verificá si al menos un elemento satisface una condición


alguno : (a -> Bool) -> List a -> Bool
alguno predicado lista =
    miFoldl (\elem acum -> acum || (predicado elem)) False lista



-- ============================================================================
-- PARTE 4: COMBINANDO OPERACIONES
-- ============================================================================


-- 22. Suma de Cuadrados
-- Calculá la suma de los cuadrados de todos los números


sumaDeCuadrados : List Int -> Int
sumaDeCuadrados lista =
    sumaFold (miMap (\x -> x * x) lista)

-- 23. Contar Números Pares
-- Contá cuántos números pares hay en una lista


contarPares : List Int -> Int
contarPares lista =
    contarFold (miFiltro (\x -> modBy 2 x == 0) lista)



-- 24. Promedio
-- Calculá el promedio de una lista de números (devolvé 0 para lista vacía)


promedio : List Float -> Float
promedio lista =
    if isEmpty lista then
        0
    else
        (miFoldl (\el acum -> acum + el) 0 lista) / toFloat (contarFold lista)



-- 25. Palabras a Longitudes
-- Dada una oración (string), dividila en palabras y devolvé sus longitudes


longitudesPalabras : String -> List Int
longitudesPalabras oracion =
    let
        palabras = 
            String.words oracion
    in
    miMap String.length palabras
    



-- 26. Remover Palabras Cortas
-- Mantené solo las palabras con más de 3 caracteres de una oración


palabrasLargas : String -> List String
palabrasLargas oracion =
    let
        palabras = 
            String.words oracion
    in
    miFiltro (\palabra -> String.length palabra > 3) palabras


-- 27. Sumar Números Positivos
-- Sumá solo los números positivos de una lista


sumarPositivos : List Int -> Int
sumarPositivos lista =
    sumaFold (miFiltro (\x -> x > 0) lista)
    -- Para cada x en la lista, mantenelo si es mayor que 0 y luego sumalos todos



-- 28. Duplicar Pares
-- Duplicá solo los números pares de una lista, mantené los impares sin cambios


duplicarPares : List Int -> List Int
duplicarPares lista =
    miMap (\n -> if modBy 2 n == 0 then n * 2 else n) lista



-- ============================================================================
-- PARTE 5: DESAFÍOS AVANZADOS
-- ============================================================================


-- 29. Aplanar
-- Aplaná una lista de listas en una única lista


aplanar : List (List a) -> List a
aplanar lista =
    miFoldl (\sublista acum -> acum ++ sublista) [] lista
    -- miFoldl (++) [] lista otra forma de hacerlo



-- 30. Agrupar Por
-- Agrupá elementos por una función clave (devolvé lista de listas)
-- ¡Esto es desafiante! Agrupá elementos iguales consecutivos juntos


agruparPor : (a -> a -> Bool) -> List a -> List (List a)
agruparPor comparador lista =
    let
        listaInvertida = 
            invertirFold lista
        folder item acc =
            case acc of
                [] -> 
                    [ [item] ]
                (primerGrupo :: restoGrupos) ->
                    case head primerGrupo of
                        h ->
                            if comparador item h then
                                (item :: primerGrupo) :: restoGrupos
                            else
                                [item] :: acc
    in
    miFoldl folder [] listaInvertida




-- 31. Particionar
-- Separá una lista en dos listas basándote en un predicado


particionar : (a -> Bool) -> List a -> ( List a, List a )
particionar predicado lista =
    miFoldl
        (\el (listaVerdaderos, listaFalsos) -> -- Aquí separamos los elementos en dos listas según el predicado
            if (predicado el) then -- si el elemento es verdadero según el predicado
                (el::listaVerdaderos, listaFalsos) -- lo agregamos a la lista de verdaderos y dejamos la de falsos igual
            else
                (listaVerdaderos, el::listaFalsos)) -- si el elemento es falso según el predicado, lo agregamos a la lista de falsos y dejamos la de verdaderos igual
            ([], []) -- comenzamos con dos listas vacías

            lista -- la lista original que vamos a particionar


-- 32. Suma Acumulada
-- Creá una lista de sumas acumuladas


sumaAcumulada : List Int -> List Int
sumaAcumulada lista =
    let
        folder = 
            \el (sumaActual, listaResultado) ->
                let
                    nuevaSuma = el + sumaActual
                in (nuevaSuma, nuevaSuma :: listaResultado)

        resultadoEnTupla = 
            miFoldl folder (0, []) lista

        listaInvertida =
            Tuple.second resultadoEnTupla

    in
    invertirFold listaInvertida


-- ============================================================================
-- EJERCICIOS OPCIONALES
-- ============================================================================


-- Subconjuntos
-- Generá todos los posibles subconjuntos de una lista


subSets : List Int -> List (List Int)
subSets lista =
    case lista of
        [] ->
            [ [] ] -- caso base: el único subconjunto de la lista vacía es la lista vacía

        x :: xs ->
            let
                subsDeLaCola = subSets xs -- obtenemos los subconjuntos de la cola xs
                subsConLaCabeza = miMap (\set-> x :: set) subsDeLaCola -- agregamos la cabeza x a cada subconjunto de la cola xs
            in
            subsDeLaCola ++ subsConLaCabeza -- combinamos los subconjuntos sin la cabeza y con la cabeza



-- Dividir en Grupos
-- Dividí una lista en grupos de tamaño n


cortar : List Int -> Int -> List (List Int)
cortar lista n =
    if isEmpty lista then
        []

    else
        tomar n lista :: cortar (saltar n lista) n



-- Función auxiliar para tomar los primeros n elementos de una lista


tomar : Int -> List a -> List a
tomar n lista =
    if isEmpty lista then
        []

    else if n == 0 then
        []

    else
        head lista :: tomar (n - 1) (tail lista)



-- Función auxiliar para saltar los primeros n elementos de una lista


saltar : Int -> List a -> List a
saltar n lista =
    if isEmpty lista then
        []

    else if n == 0 then
        lista

    else
        saltar (n - 1) (tail lista)
