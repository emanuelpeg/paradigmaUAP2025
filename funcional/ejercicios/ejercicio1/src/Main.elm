module Main exposing (..)

import Html exposing (Html, text, a)
import Basics exposing (remainderBy)
import String


main : Html msg
main =
    text "Hello, Elm!"


add : Int -> Int -> Int
add a b =
    a + b


multiply : Int -> Int -> Int
multiply a b =
    a * b


-- Ejercicio 1: Función Potencia
power : Int -> Int -> Int
power a b =
    -- TODO: Implementar función potencia
    if b == 0 then 1
    else 
        a * power a (b - 1)


-- Ejercicio 2: Factorial
factorial : Int -> Int
factorial n =
    -- TODO: Implementar factorial
    if n < 0 then
        0
    else if n <= 1 then 
        1
    else 
        n * factorial (n - 1)



-- Ejercicio 3: Fibonacci
fibonacciExponential : Int -> Int
fibonacciExponential n =
    -- TODO: Implementar fibonacci exponencial
    if n < 0 then
        0
    else if n <= 1 then
        n
    else
        fibonacciExponential (n - 1) + fibonacciExponential(n - 2)


fibonacciLinear : Int -> Int
fibonacciLinear n =
    -- TODO: Implementar fibonacci lineal con acumuladores
    if n < 0 then
        0
    else 
        fibonacciHelper n 0 1



fibonacciHelper : Int -> Int -> Int -> Int
fibonacciHelper n acc1 acc2 =
    -- TODO: Función auxiliar para fibonacci lineal
    if n == 0 then
        acc1
    else 
        fibonacciHelper(n - 1) acc2 (acc1 + acc2)


-- Ejercicio 4: Triángulo de Pascal
pascalTriangle : Int -> Int -> Int
pascalTriangle x y =
    -- TODO: Implementar triángulo de Pascal
    if x < 0 then
        0
    else if y < 0 || y > x then -- y no puede ser mayor a x porque esa posicion
        0
    else if y == 0 || y == x then -- para los bordes
        1
    else
        pascalTriangle (x - 1) (y - 1) + pascalTriangle (x - 1) y
        -- clacula las posiciones por encima del numero que se pide

-- Ejercicio 5: Máximo Común Divisor (MCD)
gcd : Int -> Int -> Int
gcd a b =
    -- TODO: Implementar algoritmo euclidiano
    if b == 0 then
        abs a -- abs es el valor absoluto
    else
        gcd b (remainderBy b a)

-- Ejercicio 6: Contar Dígitos
countDigits : Int -> Int
countDigits n =
    -- TODO: Implementar contador de dígitos
    let
        absN = abs n
    in
        if absN < 10 then
            1
        else
            1 + countDigits (truncate(toFloat absN / 10))--truncete convierte a float


-- Ejercicio 7: Suma de Dígitos
sumDigits : Int -> Int
sumDigits n =
    -- TODO: Implementar suma de dígitos
    let
        absN = abs n
    in
        if absN < 10 then
            absN
        else
            remainderBy 10 absN + sumDigits(truncate(toFloat absN / 10)) 


-- Ejercicio 8: Verificar Palíndromo
isPalindrome : Int -> Bool
isPalindrome n =
    -- TODO: Implementar verificador de palíndromo
    if n < 0 then
        False
    else
        n == reverseNumber n


reverseNumber : Int -> Int
reverseNumber n =
    -- TODO: Implementar función para invertir número
    reverseHelper n 0


reverseHelper : Int -> Int -> Int
reverseHelper n acc =
    -- TODO: Función auxiliar para invertir número
    if n == 0 then
        acc
    else
        reverseHelper (truncate (toFloat n / 10)) (acc * 10 + remainderBy 10 n)


-- Ejercicio 9: Paréntesis Balanceados
isBalanced : String -> Bool
isBalanced str =
    -- TODO: Implementar verificador de paréntesis balanceados
    isBalancedHelper (String.toList str) 0


isBalancedHelper : List Char -> Int -> Bool
isBalancedHelper chars counter =
    -- TODO: Función auxiliar para verificar paréntesis balanceados
    case chars of
        [] ->
            counter == 0
            
        '(' :: rest ->
            isBalancedHelper rest (counter + 1)

        ')' :: rest ->
            if counter <= 0 then
                False
            else
                isBalancedHelper rest (counter - 1)

        _ :: rest ->
            isBalancedHelper rest counter