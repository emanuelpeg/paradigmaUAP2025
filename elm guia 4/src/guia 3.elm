-- Guía de Ejercicios de Programación Funcional en Elm
-- Implementaciones y Uso de Map, Filter y Fold

-- IMPORTACIONES NECESARIAS
import String
import Char
import List
import Basics exposing ((<<), (|>), never)


-- PARTE 0: IMPLEMENTACIONES PERSONALIZADAS (Usando Recursión)

-- 1. Map Personalizado
miMap : (a -> b) -> List a -> List b
miMap funcion lista =
    case lista of
        [] ->
            []

        head :: tail ->
            (funcion head) :: (miMap funcion tail)


-- 2. Filter Personalizado
miFiltro : (a -> Bool) -> List a -> List a
miFiltro predicado lista =
    case lista of
        [] ->
            []

        head :: tail ->
            if predicado head then
                head :: (miFiltro predicado tail)

            else
                miFiltro predicado tail


-- 3. Foldl Personalizado
miFoldl : (a -> b -> b) -> b -> List a -> b
miFoldl funcion acumulador lista =
    case lista of
        [] ->
            acumulador

        head :: tail ->
            -- Aplica la función y actualiza el acumulador (de izquierda a derecha)
            let
                nuevoAcumulador =
                    funcion head acumulador
            in
            miFoldl funcion nuevoAcumulador tail


-- PARTE 1: ENTENDIENDO MAP (Usando List.map)

-- 4. Duplicar Números
duplicar : List Int -> List Int
duplicar lista =
    List.map (\x -> x * 2) lista


-- 5. Longitudes de Strings
longitudes : List String -> List Int
longitudes lista =
    List.map String.length lista


-- 6. Incrementar Todos
incrementarTodos : List Int -> List Int
incrementarTodos lista =
    List.map (\x -> x + 1) lista


-- 7. A Mayúsculas
todasMayusculas : List String -> List String
todasMayusculas lista =
    List.map String.toUpper lista


-- 8. Negar Booleanos
negarTodos : List Bool -> List Bool
negarTodos lista =
    List.map not lista


-- PARTE 2: ENTENDIENDO FILTER (Usando List.filter)

-- 9. Números Pares
pares : List Int -> List Int
pares lista =
    List.filter (\x -> modBy 2 x == 0) lista


-- 10. Números Positivos
positivos : List Int -> List Int
positivos lista =
    List.filter (\x -> x > 0) lista


-- 11. Strings Largos
stringsLargos : List String -> List String
stringsLargos lista =
    List.filter (\s -> String.length s > 5) lista


-- 12. Remover Falsos (solo Verdaderos)
soloVerdaderos : List Bool -> List Bool
soloVerdaderos lista =
    List.filter identity lista


-- 13. Mayor Que (Función de orden superior que devuelve un predicado)
mayoresQue : Int -> List Int -> List Int
mayoresQue limite lista =
    List.filter (\x -> x > limite) lista


-- PARTE 3: ENTENDIENDO FOLD (Usando List.foldl)

-- 14. Suma con Fold
sumaFold : List Int -> Int
sumaFold lista =
    -- (a -> b -> b) = (\elemento acumulador -> nuevoAcumulador)
    List.foldl (+) 0 lista


-- 15. Producto (Multiplicar todos los números)
producto : List Int -> Int
producto lista =
    -- El valor inicial debe ser 1 para que la multiplicación funcione
    List.foldl (*) 1 lista


-- 16. Contar con Fold (Contar elementos)
contarFold : List a -> Int
contarFold lista =
    -- Para cada elemento, suma 1 al acumulador
    List.foldl (\_ acumulador -> acumulador + 1) 0 lista


-- 17. Concatenar Strings
concatenar : List String -> String
concatenar lista =
    -- La función (++) es el operador de concatenación de Strings
    List.foldl (++) "" lista


-- 18. Valor Máximo (devolver 0 para lista vacía)
maximo : List Int -> Int
maximo lista =
    -- La función 'max' compara el elemento actual con el máximo encontrado hasta ahora
    List.foldl max 0 lista


-- 19. Invertir con Fold (List.foldl)
invertirFold : List a -> List a
invertirFold lista =
    -- La función (::) es el operador de "cons" (agregar a la cabeza).
    -- foldl agrega cada elemento (el head) al principio del acumulador, invirtiendo la lista.
    List.foldl (::) [] lista


-- 20. Todos Verdaderos (Verificar si todos satisfacen la condición)
todos : (a -> Bool) -> List a -> Bool
todos predicado lista =
    -- Usamos el operador lógico '&&' (AND) para combinar los resultados.
    -- El valor inicial es True. Si alguna vez se encuentra un False, el resultado se vuelve False permanentemente.
    List.foldl (\elem acumulado -> acumulado && (predicado elem)) True lista


-- 21. Alguno Verdadero (Verificar si al menos uno satisface la condición)
alguno : (a -> Bool) -> List a -> Bool
alguno predicado lista =
    -- Usamos el operador lógico '||' (OR) para combinar los resultados.
    -- El valor inicial es False. Si alguna vez se encuentra un True, el resultado se vuelve True permanentemente.
    List.foldl (\elem acumulado -> acumulado || (predicado elem)) False lista


-- PARTE 4: COMBINANDO OPERACIONES (Map, Filter, Fold)

-- 22. Suma de Cuadrados
sumaDeCuadrados : List Int -> Int
sumaDeCuadrados lista =
    lista
        -- 1. Map: Eleva al cuadrado cada elemento
        |> List.map (\x -> x * x)
        -- 2. Foldl: Suma todos los resultados
        |> List.foldl (+) 0


-- 23. Contar Números Pares
contarPares : List Int -> Int
contarPares lista =
    lista
        -- 1. Filter: Mantiene solo los números pares
        |> List.filter (\x -> modBy 2 x == 0)
        -- 2. Contar: Cuenta cuántos elementos quedaron
        |> List.length


-- 24. Promedio (Devolver 0.0 para lista vacía)
promedio : List Float -> Float
promedio lista =
    let
        total =
            List.foldl (+) 0.0 lista

        conteo =
            List.length lista
    in
    if conteo == 0 then
        0.0
    else
        total / (toFloat conteo)


-- 25. Palabras a Longitudes
longitudesPalabras : String -> List Int
longitudesPalabras oracion =
    oracion
        -- 1. String.words: Convierte la oración en una lista de palabras
        |> String.words
        -- 2. List.map: Obtiene la longitud de cada palabra
        |> List.map String.length


-- 26. Remover Palabras Cortas
palabrasLargas : String -> List String
palabrasLargas oracion =
    oracion
        -- 1. String.words: Divide la oración
        |> String.words
        -- 2. List.filter: Mantiene solo palabras con longitud > 3
        |> List.filter (\s -> String.length s > 3)


-- 27. Sumar Números Positivos
sumarPositivos : List Int -> Int
sumarPositivos lista =
    lista
        -- 1. Filter: Mantiene solo los positivos
        |> List.filter (\x -> x > 0)
        -- 2. Foldl: Suma el resultado
        |> List.foldl (+) 0


-- 28. Duplicar Pares (Mapeo condicional, requiere patrón recursivo o List.map)
duplicarPares : List Int -> List Int
duplicarPares lista =
    List.map
        (\x ->
            if modBy 2 x == 0 then
                x * 2
            else
                x
        )
        lista


-- PARTE 5: DESAFÍOS AVANZADOS

-- 29. Aplanar (Usando List.foldr o List.concat)
aplanar : List (List a) -> List a
aplanar listaDeListas =
    -- List.foldr (++) [] es una implementación común de List.concat
    List.concat listaDeListas


-- 30. Agrupar Por (Desafío de recursión)
-- Esta es una solución recursiva clásica para la agrupación consecutiva.
agruparPor : (a -> a -> Bool) -> List a -> List (List a)
agruparPor _ [] =
    []

agruparPor predicado (h :: t) =
    let
        -- Separa la cola (t) en dos partes:
        -- 1. 'grupo': elementos consecutivos que satisfacen el predicado con 'h'
        -- 2. 'resto': el resto de la lista
        grupo =
            List.takeWhile (\e -> predicado h e) t

        resto =
            List.dropWhile (\e -> predicado h e) t

        -- El grupo actual incluye la cabeza (h)
        grupoActual =
            h :: grupo
    in
    -- El resultado es el grupo actual seguido de la recursión sobre el resto
    grupoActual :: agruparPor predicado resto


-- 31. Particionar (Usando List.partition)
particionar : (a -> Bool) -> List a -> ( List a, List a )
particionar predicado lista =
    -- List.partition devuelve una tupla (listaQueCumple, listaQueNoCumple)
    List.partition predicado lista


-- 32. Suma Acumulada (Utilizando foldl para rastrear el estado)
sumaAcumulada : List Int -> List Int
sumaAcumulada lista =
    -- foldl y foldr solo devuelven un valor final, no una lista.
    -- Para devolver una lista de resultados intermedios, usamos un fold especial.
    let
        -- La función auxiliar foldl mantiene el estado (acumulador) y la lista de resultados (resultado)
        foldFuncion elem ( acumulado, resultado ) =
            let
                nuevoAcumulado =
                    acumulado + elem
            in
            ( nuevoAcumulado, resultado ++ [ nuevoAcumulado ] )

        -- List.foldl devuelve la tupla final (acumulador_final, resultado_final)
        finalTuple =
            List.foldl foldFuncion ( 0, [] ) lista
    in
    -- Extraemos la lista de resultados (el segundo elemento de la tupla)
    Tuple.second finalTuple


-- Subconjuntos (Desafío)
-- Se resuelve con recursión: cada elemento 'e' puede estar o no en los subconjuntos.
subSets : List a -> List (List a)
subSets lista =
    case lista of
        [] ->
            [ [] ]

        head :: tail ->
            let
                -- 1. Subconjuntos de la Cola (recursión)
                subsetsOfTail =
                    subSets tail

                -- 2. Subconjuntos de la Cola CON el elemento actual (head)
                subsetsWithHead =
                    List.map (\s -> head :: s) subsetsOfTail
            in
            -- 3. Combina los dos resultados: Sin head y Con head
            subsetsOfTail ++ subsetsWithHead


-- Dividir en Grupos (Cortar)
-- Implementación de funciones auxiliares List.take y List.drop para un entorno sin ellas (aunque están en List).
-- Usaremos las reales de List para mayor claridad y eficiencia.

cortar : List a -> Int -> List (List a)
cortar lista n =
    if List.isEmpty lista then
        []
    else
        let
            -- 1. Tomar los primeros n elementos (el grupo actual)
            grupoActual =
                List.take n lista

            -- 2. Omitir los primeros n elementos (el resto)
            resto =
                List.drop n lista
        in
        -- 3. Concatenar el grupo actual con la llamada recursiva sobre el resto
        grupoActual :: cortar resto n


-- BONUS: Entendiendo Fold Izquierdo vs Derecho

-- Pregunta: ¿Cuál es la diferencia entre foldl y foldr?
-- Respuesta: List.foldl evalúa de izquierda a derecha; List.foldr de derecha a izquierda.

-- Usando foldl (Resultado es la lista invertida)
-- La función (::) es 'cons' (agregar a la cabeza).
-- foldl aplica (::) como: (3 :: (2 :: (1 :: []))) que es [3, 2, 1]
ejemploFoldl : List Int
ejemploFoldl =
    List.foldl (::) [] [ 1, 2, 3 ]
-- Resultado: [3, 2, 1]

-- Usando foldr (Resultado es la lista original)
-- foldr aplica (::) como: (1 :: (2 :: (3 :: []))) que es [1, 2, 3]
ejemploFoldr : List Int
ejemploFoldr =
    List.foldr (::) [] [ 1, 2, 3 ]
-- Resultado: [1, 2, 3]