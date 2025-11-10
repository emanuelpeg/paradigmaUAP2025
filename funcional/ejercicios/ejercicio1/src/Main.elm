module Main exposing (..)

import Html exposing (Html, a, text)


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

    else if b == 1 then
        a

    else
        a + multiply a (b - 1)


multiply2 : Int -> Int -> Int -> Int
multiply2 a b acc =
    if b == 0 then
        acc

    else
        multiply2 a (b - 1) (acc + a)



-- Ejercicio 1: Función Potencia


power : Int -> Int -> Int
power a b =
    if b == 0 then
        1

    else
        a * power a (b - 1)



-- Ejercicio 2: Factorial


factorial : Int -> Int
factorial n =
    if n <= 1 then
        1

    else
        n * factorial (n - 1)



-- Ejercicio 3: Fibonacci


fibonacciExponential : Int -> Int
fibonacciExponential n =
    if n <= 1 then
        n

    else
        fibonacciExponential (n - 1) + fibonacciExponential (n - 2)


fibonacciLinear : Int -> Int
fibonacciLinear n =
    fibonacciHelper n 0 1


fibonacciHelper : Int -> Int -> Int -> Int
fibonacciHelper n acc1 acc2 =
    if n == 0 then
        acc1

    else if n == 1 then
        acc2

    else
        fibonacciHelper (n - 1) acc2 (acc1 + acc2)



-- Ejercicio 4: Triángulo de Pascal


pascalTriangle : Int -> Int -> Int
pascalTriangle x y =
    if x == 0 || x == y then
        1

    else
        pascalTriangle (x - 1) (y - 1) + pascalTriangle x (y - 1)



-- Ejercicio 5: Máximo Común Divisor (MCD)


gcd : Int -> Int -> Int
gcd a b =
    if b == 0 then
        abs a

    else
        gcd b (modBy b a)



-- Ejercicio 6: Contar Dígitos


countDigits : Int -> Int
countDigits n =
    if n < 0 then
        countDigits (-1 * n)

    else if n < 10 then
        1

    else
        1 + countDigits (n // 10)



-- Ejercicio 7: Suma de Dígitos


sumDigits : Int -> Int
sumDigits n =
    if n < 0 then
        sumDigits (-1 * n)

    else if n < 10 then
        n

    else
        modBy 10 n + sumDigits (n // 10)



-- Ejercicio 8: Verificar Palíndromo


isPalindrome : Int -> Bool
isPalindrome n =
    n >= 0 && n == reverseNumber n


reverseNumber : Int -> Int
reverseNumber n =
    reverseHelper n 0


reverseHelper : Int -> Int -> Int
reverseHelper n acc =
    if n < 10 then
        acc * 10 + n

    else
        let
            digit =
                modBy 10 n
        in
        reverseHelper (n // 10) (acc * 10 + digit)
