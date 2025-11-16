module Clase3 exposing (..)


head : List a -> a
head list =
    case List.head list of
        Just h -> h
        Nothing -> Debug.todo "head called on empty list"


tail : List a -> List a
tail list =
    Maybe.withDefault [] (List.tail list)


isEmpty : List a -> Bool
isEmpty list =
    List.isEmpty list



-- UTILS PROPIAS (sin usar length ni toUpper)
strLen : String -> Int
strLen str =
    case String.uncons str of
        Nothing -> 0
        Just (_, r) -> 1 + strLen r

upperChar : Char -> Char
upperChar c =
    if c >= 'a' && c <= 'z' then Char.fromCode (Char.toCode c - 32)
    else c

strMayus : String -> String
strMayus s =
    case String.uncons s of
        Nothing -> ""
        Just (c, r) -> String.fromChar (upperChar c) ++ strMayus r



-- =======================================================
-- PARTE 0: IMPLEMENTACIONES PERSONALIZADAS
-- =======================================================

-- 1. Map Personalizado
-- Implementá tu propia versión de map usando recursión y las funciones genéricas head, tail e isEmpty

miMap : (a -> b) -> List a -> List b
miMap fx lista =
    if isEmpty lista then []
    else fx (head lista) :: miMap fx (tail lista)


-- 2. Filter Personalizado
-- Implementá tu propia versión de filter usando recursión

miFiltro : (a -> Bool) -> List a -> List a
miFiltro pred l =
    if isEmpty l then []
    else if pred (head l) then
        head l :: miFiltro pred (tail l)
    else
        miFiltro pred (tail l)


-- 3. Foldl Personalizado
-- Implementá tu propia versión de foldl usando recursión

miFoldl : (a -> b -> b) -> b -> List a -> b
miFoldl f acc l =
    if isEmpty l then acc
    else miFoldl f (f (head l) acc) (tail l)



-- =======================================================
-- PARTE 1: ENTENDIENDO MAP
-- =======================================================

-- 4  Duplicar Números
-- Escribí una función que duplique cada número en una lista

duplicar : List Int -> List Int
duplicar l =
    miMap (\x -> x*2) l


-- 5 Longitudes de Strings
-- Convertí una lista de strings a una lista de sus longitudes

longitudes : List String -> List Int
longitudes l =
    miMap strLen l


-- 6 Incrementar Todos
-- Sumá 1 a cada número en una lista

incrementarTodos : List Int -> List Int
incrementarTodos l =
    miMap (\x -> x+1) l


-- 7 A Mayúsculas
-- Convertí todos los strings de una lista a mayúsculas

todasMayusculas : List String -> List String
todasMayusculas l =
    miMap strMayus l


-- 8
negarTodos : List Bool -> List Bool
negarTodos l =
    miMap (\b -> not b) l



-- =======================================================
-- PARTE 2: ENTENDIENDO FILTER
-- =======================================================

-- 9 Números Pares
-- Mantené solo los números pares de una lista

pares : List Int -> List Int
pares l =
    miFiltro (\x -> modBy 2 x == 0) l


-- 10 Números Positivos
-- Mantené solo los números positivos

positivos : List Int -> List Int
positivos l =
    miFiltro (\x -> x > 0) l


-- 11 Strings Largos
-- Mantené solo los strings con más de 5 caracteres

stringsLargos : List String -> List String
stringsLargos l =
    miFiltro (\s -> strLen s > 5) l


-- 12 Remover Falsos
-- Remové todos los valores False de una lista de booleanos

soloVerdaderos : List Bool -> List Bool
soloVerdaderos l =
    miFiltro (\b -> b == True) l


-- 13 Mayor Que
-- Filtrá números mayores que un valor dado

mayoresQue : Int -> List Int -> List Int
mayoresQue v l =
    miFiltro (\x -> x > v) l



-- =======================================================
-- PARTE 3: ENTENDIENDO FOLD
-- =======================================================

-- 14 Suma con Fold
-- Implementá suma usando List.foldl

sumaFold : List Int -> Int
sumaFold l =
    miFoldl (\x acc -> x + acc) 0 l


-- 15 Producto
-- Multiplicá todos los números de una lista entre sí

producto : List Int -> Int
producto l =
    miFoldl (\x acc -> x * acc) 1 l


-- 16 Contar con Fold
-- Implementá contar usando List.foldl

contarFold : List a -> Int
contarFold l =
    miFoldl (\_ acc -> acc + 1) 0 l


-- 17 Concatenar Strings
-- Uní todos los strings de una lista

concatenar : List String -> String
concatenar l =
    miFoldl (\s acc -> acc ++ s) "" l


-- 18 Valor Máximo
-- Encontrá el valor máximo en una lista de números (devolvé 0 para lista vacía)

maximo : List Int -> Int
maximo l =
    if isEmpty l then 0
    else miFoldl (\x acc -> if x > acc then x else acc) (head l) l


-- 19  Invertir con Fold
-- Invertí una lista usando List.foldl

invertirFold : List a -> List a
invertirFold l =
    miFoldl (\x acc -> x :: acc) [] l


-- 20 Todos Verdaderos
-- Verificá si todos los elementos de una lista satisfacen una condición

todos : (a -> Bool) -> List a -> Bool
todos p l =
    miFoldl (\x acc -> p x && acc) True l


-- 21 Alguno Verdadero
-- Verificá si al menos un elemento satisface una condición

alguno : (a -> Bool) -> List a -> Bool
alguno p l =
    miFoldl (\x acc -> p x || acc) False l



-- =======================================================
-- PARTE 4: COMBINANDO OPERACIONES
-- =======================================================

-- 22 Suma de Cuadrados
-- Calculá la suma de los cuadrados de todos los números

sumaDeCuadrados : List Int -> Int
sumaDeCuadrados l =
    sumaFold (miMap (\x -> x*x) l)


-- 23 Contar Números Pares
-- Contá cuántos números pares hay en una lista

contarPares : List Int -> Int
contarPares l =
    contarFold (pares l)


-- 24 Promedio
-- Calculá el promedio de una lista de números (devolvé 0 para lista vacía)

promedio : List Float -> Float
promedio l =
    let total = miFoldl (\x acc -> x + acc) 0 l
        cant  = miFoldl (\_ acc -> acc + 1) 0 l
    in if cant == 0 then 0 else total / cant


-- 25 Palabras a Longitudes
-- Dada una oración (string), dividila en palabras y devolvé sus longitudes

longitudesPalabras : String -> List Int
longitudesPalabras o =
    longitudes (String.words o)


-- 26 Remover Palabras Cortas
-- Mantené solo las palabras con más de 3 caracteres de una oración


palabrasLargas : String -> List String
palabrasLargas o =
    stringsLargos (String.words o)


-- 27 Sumar Números Positivos
-- Sumá solo los números positivos de una lista

sumarPositivos : List Int -> Int
sumarPositivos l =
    sumaFold (positivos l)


-- 28 Duplicar Pares
-- Duplicá solo los números pares de una lista, mantené los impares sin cambios

duplicarPares : List Int -> List Int
duplicarPares l =
    miMap (\x -> if modBy 2 x == 0 then x*2 else x) l



-- =======================================================
-- PARTE 5: DESAFÍOS AVANZADOS
-- =======================================================

-- 29  Aplanar
-- Aplaná una lista de listas en una única lista

aplanar : List (List a) -> List a
aplanar l =
    miFoldl (\sub acc -> acc ++ sub) [] l


-- 30  Agrupar Por
-- Agrupá elementos por una función clave (devolvé lista de listas)
-- ¡Esto es desafiante! Agrupá elementos iguales consecutivos juntos

agruparPor : (a -> a -> Bool) -> List a -> List (List a)
agruparPor comp l =
    case l of
        [] -> []
        x::xs ->
            let grupo = miFiltro (comp x) l
                resto = miFiltro (\y -> not (comp x y)) l
            in grupo :: agruparPor comp resto


-- 31 Particionar
-- Separá una lista en dos listas basándote en un predicado

particionar : (a -> Bool) -> List a -> (List a, List a)
particionar p l =
    ( miFiltro p l, miFiltro (\x -> not (p x)) l )


-- 32 Suma Acumulada
-- Creá una lista de sumas acumuladas

sumaAcumulada : List Int -> List Int
sumaAcumulada l =
    let rec acc s xs =
        if isEmpty xs then []
        else
            let n = s + head xs
            in n :: acc n (tail xs)
    in acc 0 l



-- =======================================================
-- EJERCICIOS OPCIONALES
-- =======================================================

-- Subconjuntos
-- Generá todos los posibles subconjuntos de una lista

subSets : List Int -> List (List Int)
subSets lista =
    case lista of
        [] -> [ [] ]
        x :: xs -> []

-- Dividir en Grupos
-- Dividí una lista en grupos de tamaño n

cortar : List Int -> Int -> List (List Int)
cortar l n =
    if isEmpty l then []
    else tomar n l :: cortar (saltar n l) n

-- Función auxiliar para tomar los primeros n elementos de una lista
tomar : Int -> List a -> List a
tomar n l =
    if isEmpty l then []
    else if n == 0 then []
    else head l :: tomar (n-1) (tail l)

-- Función auxiliar para saltar los primeros n elementos de una lista

saltar : Int -> List a -> List a
saltar n l =
    if isEmpty l then []
    else if n == 0 then l
    else saltar (n-1) (tail l)
