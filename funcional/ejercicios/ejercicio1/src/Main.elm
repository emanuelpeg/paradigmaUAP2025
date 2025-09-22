module Main exposing (..)

import Html exposing (Html, text)


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
    case compare b 0 of
        LT ->
            -- potencia con exponente negativo: devolver 0 (enteros)
            0
        EQ ->
            1
        GT ->
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
    if n <= 0 then
        0
    else if n == 1 then
        1
    else
        fibonacciExponential (n - 1) + fibonacciExponential (n - 2)


fibonacciLinear : Int -> Int
fibonacciLinear n =
    if n <= 0 then
        0
    else
        fibonacciHelper n 0 1


fibonacciHelper : Int -> Int -> Int -> Int
fibonacciHelper n acc1 acc2 =
    case n of
        0 ->
            acc1
        _ ->
            fibonacciHelper (n - 1) acc2 (acc1 + acc2)


-- Ejercicio 4: Triángulo de Pascal
pascalTriangle : Int -> Int -> Int
pascalTriangle x y =
    -- x es la columna y es la fila (asumimos 0-indexed)
    if x < 0 || y < 0 then
        0
    else if x == 0 || x == y then
        1
    else
        pascalTriangle (x - 1) (y - 1) + pascalTriangle x (y - 1)


-- Ejercicio 5: Máximo Común Divisor (MCD)
gcd : Int -> Int -> Int
gcd a b =
    let
        absA = if a < 0 then -a else a
        absB = if b < 0 then -b else b
    in
    if absB == 0 then
        absA
    else
        gcd absB (modBy absB absA)


-- Ejercicio 6: Contar Dígitos
countDigits : Int -> Int
countDigits n =
    let
        m = if n < 0 then -n else n
    in
    if m < 10 then
        1
    else
        1 + countDigits (m // 10)


-- Ejercicio 7: Suma de Dígitos
sumDigits : Int -> Int
sumDigits n =
    let
        m = if n < 0 then -n else n
    in
    if m < 10 then
        m
    else
        (modBy 10 m) + sumDigits (m // 10)


-- Ejercicio 8: Verificar Palíndromo
isPalindrome : Int -> Bool
isPalindrome n =
    if n < 0 then
        False
    else
        n == reverseNumber n


reverseNumber : Int -> Int
reverseNumber n =
    let
        m = if n < 0 then -n else n
    in
    reverseHelper m 0


reverseHelper : Int -> Int -> Int
reverseHelper n acc =
    if n == 0 then
        acc
    else
        let
            digit = modBy 10 n
            rest = n // 10
        in
        reverseHelper rest (acc * 10 + digit)

