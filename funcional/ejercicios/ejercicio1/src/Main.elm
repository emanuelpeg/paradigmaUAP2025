module Main exposing (..)

import Html exposing (Html, text)


main : Html msg
main =
    text "Hello, Elm!"


add : Int -> Int -> Int
add a b =
    if b == 0 then
        a
    else
        add (a + 1) (b - 1)


multiply : Int -> Int -> Int
multiply a b =
    if b == 0 then
        0
    else
        add a (multiply a (b - 1))


-- Ejercicio 1: Función Potencia
power : Int -> Int -> Int
power a b =
    if b == 0 then 1
    else multiply a (power a (b - 1))


-- Ejercicio 2: Factorial
factorial : Int -> Int
factorial n =
    if n == 0 then 1
    else multiply n (factorial (n - 1))


-- Ejercicio 3: Fibonacci
fibonacciExponential : Int -> Int
fibonacciExponential n = if n <= 1 then 0
    else fibonacciExponential (n - 1) + fibonacciExponential (n - 2)



fibonacciLinear : Int -> Int
fibonacciLinear n = 
    fibonacciHelper n 0 1


fibonacciHelper : Int -> Int -> Int -> Int
fibonacciHelper n acc1 acc2 = if n == 0 then acc1
    else fibonacciHelper (n - 1) acc1 (acc1 + acc2)
    


-- Ejercicio 4: Triángulo de Pascal
pascalTriangle : Int -> Int -> Int
pascalTriangle x y = 
    if y == 0 || x == y then 1
    else pascalTriangle (x - 1) (y - 1) + pascalTriangle (x - 1) y


-- Ejercicio 5: Máximo Común Divisor (MCD)
gcd : Int -> Int -> Int
gcd a b =
    if b == 0 then a
    else gcd b (a % b)


-- Ejercicio 6: Contar Dígitos
countDigits : Int -> Int
countDigits n =
    if n < 10 then 1
    else 1 + countDigits (n // 10) -- los // son una división entera


-- Ejercicio 7: Suma de Dígitos
sumDigits : Int -> Int
sumDigits n =
    if n < 10 then n
    else (n % 10) + sumDigits (n // 10) -- el % es el módulo


-- Ejercicio 8: Verificar Palíndromo
isPalindrome : Int -> Bool
isPalindrome n =
    n == reverseNumber n


reverseNumber : Int -> Int
reverseNumber n =
    


reverseHelper : Int -> Int -> Int
reverseHelper n acc =
    if n == 0 then acc
    else reverseHelper (n // 10) (acc * 10 + (n % 10))


-- Ejercicio 9: Paréntesis Balanceados
isBalanced : String -> Bool
isBalanced str =
    isBalancedHelper (String.toList str) 0



isBalancedHelper : List Char -> Int -> Bool
isBalancedHelper chars counter =
    case chars of
        [] ->
            counter == 0

        c :: cs ->
            if counter < 0 then
                False
            else if c == '(' then
                isBalancedHelper cs (counter + 1) 
            else if c == ')' then
                isBalancedHelper cs (counter - 1)
            else
                isBalancedHelper cs counter