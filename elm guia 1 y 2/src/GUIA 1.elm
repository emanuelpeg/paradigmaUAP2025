module Main exposing (..)

import Browser
import Html exposing (Html, div, text, pre)
import Html.Attributes exposing (style)


-- ========================
-- EJERCICIO 1: Potencia
-- ========================
power : Int -> Int -> Int
power a b =
    if b == 0 then
        1
    else
        a * power a (b - 1)


-- ========================
-- EJERCICIO 2: Factorial
-- ========================
factorial : Int -> Int
factorial n =
    if n <= 1 then
        1
    else
        n * factorial (n - 1)


-- ========================
-- EJERCICIO 3: Fibonacci
-- ========================

-- Versión exponencial (ingenua)
fibonacciExponential : Int -> Int
fibonacciExponential n =
    case n of
        0 -> 0
        1 -> 1
        _ -> fibonacciExponential (n - 1) + fibonacciExponential (n - 2)


-- Versión lineal (con acumuladores)
fibonacciLinear : Int -> Int
fibonacciLinear n =
    fibHelper n 0 1


fibHelper : Int -> Int -> Int -> Int
fibHelper n a b =
    if n == 0 then
        a
    else
        fibHelper (n - 1) b (a + b)


-- ========================
-- EJERCICIO 4: Triángulo de Pascal
-- ========================
pascalTriangle : Int -> Int -> Int
pascalTriangle row col =
    if col == 0 || col == row then
        1
    else if col > row || col < 0 || row < 0 then
        0
    else
        pascalTriangle (row - 1) (col - 1) + pascalTriangle (row - 1) col


-- ========================
-- EJERCICIO 5: MCD (Euclides)
-- ========================
gcd : Int -> Int -> Int
gcd a b =
    let
        absA = abs a
        absB = abs b
    in
    if absB == 0 then
        absA
    else
        gcd absB (absA |> modBy absB)


-- ========================
-- EJERCICIO 6: Contar Dígitos
-- ========================
countDigits : Int -> Int
countDigits n =
    let
        absN = abs n
    in
    if absN < 10 then
        1
    else
        1 + countDigits (absN // 10)


-- ========================
-- EJERCICIO 7: Suma de Dígitos
-- ========================
sumDigits : Int -> Int
sumDigits n =
    let
        absN = abs n
    in
    if absN < 10 then
        absN
    else
        (absN |> modBy 10) + sumDigits (absN // 10)


-- ========================
-- EJERCICIO 8: Palíndromo
-- ========================

isPalindrome : Int -> Bool
isPalindrome n =
    let
        absN = abs n
    in
    absN == reverseNumber absN


reverseNumber : Int -> Int
reverseNumber n =
    reverseHelper n 0


reverseHelper : Int -> Int -> Int
reverseHelper n acc =
    if n == 0 then
        acc
    else
        reverseHelper (n // 10) (acc * 10 + (n |> modBy 10))


-- ========================
-- EJERCICIO 9: Paréntesis Balanceados
-- ========================
isBalanced : String -> Bool
isBalanced str =
    let
        chars = String.toList str
    in
    balanceHelper chars 0


balanceHelper : List Char -> Int -> Bool
balanceHelper chars count =
    case chars of
        [] ->
            count == 0

        '(' :: rest ->
            balanceHelper rest (count + 1)

        ')' :: rest ->
            if count <= 0 then
                False
            else
                balanceHelper rest (count - 1)

        _ :: rest ->
            balanceHelper rest count


-- ========================
-- MAIN (para probar)
-- ========================
main : Html msg
main =
    div [ style "font-family" "monospace", style "padding" "20px" ]
        [ pre []
            [ text <|
                String.join "\n" [
                    "=== PRUEBAS ===",
                    "",
                    "power 2 3 = " ++ String.fromInt (power 2 3),
                    "power 5 0 = " ++ String.fromInt (power 5 0),
                    "power 10 2 = " ++ String.fromInt (power 10 2),
                    "",
                    "factorial 5 = " ++ String.fromInt (factorial 5),
                    "factorial 0 = " ++ String.fromInt (factorial 0),
                    "",
                    "fibonacciExponential 10 = " ++ String.fromInt (fibonacciExponential 10),
                    "fibonacciLinear 10 = " ++ String.fromInt (fibonacciLinear 10),
                    "",
                    "pascalTriangle 0 0 = " ++ String.fromInt (pascalTriangle 0 0),
                    "pascalTriangle 2 4 = " ++ String.fromInt (pascalTriangle 2 4),
                    "pascalTriangle 1 3 = " ++ String.fromInt (pascalTriangle 1 3),
                    "",
                    "gcd 48 18 = " ++ String.fromInt (gcd 48 18),
                    "gcd 17 13 = " ++ String.fromInt (gcd 17 13),
                    "",
                    "countDigits 12345 = " ++ String.fromInt (countDigits 12345),
                    "countDigits -456 = " ++ String.fromInt (countDigits -456),
                    "",
                    "sumDigits 123 = " ++ String.fromInt (sumDigits 123),
                    "sumDigits -456 = " ++ String.fromInt (sumDigits -456),
                    "",
                    "isPalindrome 12321 = " ++ Debug.toString (isPalindrome 12321),
                    "isPalindrome 12345 = " ++ Debug.toString (isPalindrome 12345),
                    "",
                    "isBalanced \"((()))()\" = " ++ Debug.toString (isBalanced "((()))()"),
                    "isBalanced \"(()(())\" = " ++ Debug.toString (isBalanced "(()(())"),
                    "isBalanced \")(\" = " ++ Debug.toString (isBalanced ")(")
                ]
            ]
        ]