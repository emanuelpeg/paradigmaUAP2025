module Main exposing (..)

import Html exposing (Html, a, text)
import Fuzz exposing (int)


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
        a*power a (b-1)



-- Ejercicio 2: Factorial


factorial : Int -> Int
factorial n =
    if n == 0 then 
        1
    else
        n*factorial (n-1)



-- Ejercicio 3: Fibonacci


fibonacciExponential : Int -> Int
fibonacciExponential f =
    if f <= 1 then
        1
    else
        fibonacciExponential(f-1)+fibonacciExponential(f-2)


fibonacciLinear : Int -> Int
fibonacciLinear n =
    let
        aux n a b =
            case n of
                0 -> a
                _ -> aux (n - 1) b (a + b)
    in
    aux n 0 1



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
    let
        num = abs n
    in
    if num < 10 then
        1
    else
        1 + countDigits (num // 10)
-- Ejercicio 7: Suma de Dígitos


sumDigits : Int -> Int
sumDigits n =
    let
        num = abs n
    in
    if num < 10 then
        num
    else
        (modBy 10 num) + sumDigits (num // 10)


-- Ejercicio 8: Verificar Palíndromo

isPalindrome : Int -> Bool
isPalindrome n =
    n==reserverNumber n
reverseNumber: Int -> Int
reverseNumber n=
    reverseHelper n 0
reverseHelper : Int -> Int -> Int
reverseHelper a acc=
    if a <10 then
        acc*10+a
    else
        let
            accum=
                modBy 10 a
        in
        reverseHelper(a//10) (acc*10+accum) 

