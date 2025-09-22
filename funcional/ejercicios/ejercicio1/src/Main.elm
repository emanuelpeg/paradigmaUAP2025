module Main exposing (..)


import Html exposing (Html, div, text, br)

main : Html msg
main =
    div []
        [ text ("power 2 3 = " ++ String.fromInt (power 2 3))
        , br []
        , text ("factorial 5 = " ++ String.fromInt (factorial 5))
        , br []
        , text ("fibonacciExponential 10 = " ++ String.fromInt (fibonacciExponential 10))
        , br []
        , text ("fibonacciLinear 10 = " ++ String.fromInt (fibonacciLinear 10))
        , br []
        , text ("pascalTriangle 2 4 = " ++ String.fromInt (pascalTriangle 2 4))
        , br []
        , text ("gcd 48 18 = " ++ String.fromInt (gcd 48 18))
        , br []
        , text ("countDigits 12345 = " ++ String.fromInt (countDigits 12345))
        , br []
        , text ("sumDigits 123 = " ++ String.fromInt (sumDigits 123))
        , br []
        , text ("isPalindrome 12321 = " ++ String.fromBool (isPalindrome 12321))
        , br []
        , text ("reverseNumber 12345 = " ++ String.fromInt (reverseNumber 12345))
        , br []
        , text ("isBalanced \"((()))()\" = " ++ String.fromBool (isBalanced "((()))()"))
        ]


add : Int -> Int -> Int
add a b =
    a + b


multiply : Int -> Int -> Int
multiply a b =
    a * b


-- Ejercicio 1: Función Potencia
power : Int -> Int -> Int
power a b =
    if b == 0 then 1
    else a * power a (b - 1)


-- Ejercicio 2: Factorial
factorial : Int -> Int
factorial n =
    if n <= 1 then 1 else n * factorial (n - 1)


-- Ejercicio 3: Fibonacci
fibonacciExponential : Int -> Int
fibonacciExponential n =
    if n == 0 then 0
    else if n == 1 then 1
    else fibonacciExponential (n - 1) + fibonacciExponential (n - 2)


fibonacciLinear : Int -> Int
fibonacciLinear n =
    fibonacciHelper n 0 1


fibonacciHelper : Int -> Int -> Int -> Int
fibonacciHelper n acc1 acc2 =
    if n == 0 then acc1
    else fibonacciHelper (n - 1) acc2 (acc1 + acc2)


-- Ejercicio 4: Triángulo de Pascal
pascalTriangle : Int -> Int -> Int
pascalTriangle x y =
    if x == 0 || x == y then 1
    else pascalTriangle (x - 1) (y - 1) + pascalTriangle x (y - 1)


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
        m = abs n
    in
    if m < 10 then 1 else 1 + countDigits (m // 10)


-- Ejercicio 7: Suma de Dígitos
sumDigits : Int -> Int
sumDigits n =
    let
        m = abs n
    in
    if m < 10 then m else (m % 10) + sumDigits (m // 10)


-- Ejercicio 8: Verificar Palíndromo
isPalindrome : Int -> Bool
isPalindrome n =
    let m = abs n in m == reverseNumber m


reverseNumber : Int -> Int
reverseNumber n =
    reverseHelper (abs n) 0


reverseHelper : Int -> Int -> Int
reverseHelper n acc =
    if n == 0 then acc else reverseHelper (n // 10) (acc * 10 + (n % 10))


-- Ejercicio 9: Paréntesis Balanceados
isBalanced : String -> Bool
isBalanced str =
    isBalancedHelper (String.toList str) 0


isBalancedHelper : List Char -> Int -> Bool
isBalancedHelper chars counter =
    case chars of
        [] -> counter == 0
        c :: cs ->
            if counter < 0 then False
            else if c == '(' then isBalancedHelper cs (counter + 1)
            else if c == ')' then isBalancedHelper cs (counter - 1)
            else isBalancedHelper cs counter