module Main exposing (..)

import Html exposing (Html, text)


-- Ejercicio 1: Función Potencia
power : Int -> Int -> Int
power a b =
    if b == 0 then
        1
    else if b < 0 then
        -- No se manejan potencias negativas en Int, retorna 0 por convención
        0
    else
        a * power a (b - 1)


-- Ejercicio 2: Factorial
factorial : Int -> Int
factorial n =
    if n == 0 || n == 1 then
        1
    else if n < 0 then
        0
    else
        n * factorial (n - 1)


-- Ejercicio 3: Fibonacci
fibonacciExponential : Int -> Int
fibonacciExponential n =
    if n == 0 then 0
    else if n == 1 then 1
    else if n < 0 then 0
    else fibonacciExponential (n - 1) + fibonacciExponential (n - 2)


fibonacciLinear : Int -> Int
fibonacciLinear n =
    if n < 0 then 0
    else fibonacciHelper n 0 1


fibonacciHelper : Int -> Int -> Int -> Int
fibonacciHelper n acc1 acc2 =
    if n == 0 then acc1
    else if n == 1 then acc2
    else fibonacciHelper (n - 1) acc2 (acc1 + acc2)


-- Ejercicio 4: Triángulo de Pascal
pascalTriangle : Int -> Int -> Int
pascalTriangle x y =
    if x == 0 || x == y then
        1
    else if x < 0 || y < 0 || x > y then
        0
    else
        pascalTriangle (x - 1) (y - 1) + pascalTriangle x (y - 1)


-- Ejercicio 5: Máximo Común Divisor (MCD)
gcd : Int -> Int -> Int
gcd a b =
    if b == 0 then
        abs a
    else
        gcd b (a % b)


-- Ejercicio 6: Contar Dígitos
countDigits : Int -> Int
countDigits n =
    if abs n < 10 then 1
    else 1 + countDigits ((abs n) // 10)


-- Ejercicio 7: Suma de Dígitos
sumDigits : Int -> Int
sumDigits n =
    if abs n < 10 then abs n
    else modBy 10 (abs n) + sumDigits ((abs n) // 10)


-- Ejercicio 8: Verificar Palíndromo
isPalindrome : Int -> Bool
isPalindrome n =
    abs n == reverseNumber n


reverseNumber : Int -> Int
reverseNumber n =
    reverseHelper (abs n) 0


reverseHelper : Int -> Int -> Int
reverseHelper n acc =
    if n == 0 then acc
    else reverseHelper (n // 10) (acc * 10 + modBy 10 n)


-- Ejercicio 9: Paréntesis Balanceados
isBalanced : String -> Bool
isBalanced str =
    isBalancedHelper (toList str) 0


isBalancedHelper : List Char -> Int -> Bool
isBalancedHelper chars counter =
    case chars of
        [] -> counter == 0
        '(' :: rest -> isBalancedHelper rest (counter + 1)
        ')' :: rest -> if counter > 0 then isBalancedHelper rest (counter - 1) else False
        _ :: rest -> isBalancedHelper rest counter -- Ignora otros caracteres


-- Funciones auxiliares utilizadas

-- Modulo, similar a % en otros lenguajes
modBy : Int -> Int -> Int
modBy a b = a `mod` b

-- División entera, similar a // en Python
(//) : Int -> Int -> Int
a // b = a `div` b

-- Convierte un String a una lista de Chars
toList : String -> List Char
toList = String.toList

-- Función principal de la aplicación
main : Html msg
main =
    text "¡Hola desde Elm!"

