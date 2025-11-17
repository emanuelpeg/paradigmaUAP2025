module Main exposing (..)

import Html exposing (Html, a, text)


main : Html msg
main =
    text "Hello, Elm!"


add : Int -> Int -> Int
add a b =
    if b == 0 then
        a
<<<<<<< HEAD
=======

>>>>>>> uptream/main
    else
        add (a + 1) (b - 1)


multiply : Int -> Int -> Int
multiply a b =
    if b == 0 then
        0
<<<<<<< HEAD
    else
        add a (multiply a (b - 1))
=======

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

>>>>>>> uptream/main


-- Ejercicio 1: Función Potencia


power : Int -> Int -> Int
power a b =
<<<<<<< HEAD
    if b == 0 then 1
    else multiply a (power a (b - 1))
=======
    if b == 0 then
        1

    else
        a * power a (b - 1)

>>>>>>> uptream/main


-- Ejercicio 2: Factorial


factorial : Int -> Int
factorial n =
<<<<<<< HEAD
    if n == 0 then 1
    else multiply n (factorial (n - 1))
=======
    if n <= 1 then
        1

    else
        n * factorial (n - 1)

>>>>>>> uptream/main


-- Ejercicio 3: Fibonacci


fibonacciExponential : Int -> Int
<<<<<<< HEAD
fibonacciExponential n = if n <= 1 then 0
    else fibonacciExponential (n - 1) + fibonacciExponential (n - 2)



fibonacciLinear : Int -> Int
fibonacciLinear n = 
=======
fibonacciExponential n =
    if n <= 1 then
        n

    else
        fibonacciExponential (n - 1) + fibonacciExponential (n - 2)


fibonacciLinear : Int -> Int
fibonacciLinear n =
>>>>>>> uptream/main
    fibonacciHelper n 0 1


fibonacciHelper : Int -> Int -> Int -> Int
<<<<<<< HEAD
fibonacciHelper n acc1 acc2 = if n == 0 then acc1
    else fibonacciHelper (n - 1) acc1 (acc1 + acc2)
    
=======
fibonacciHelper n acc1 acc2 =
    if n == 0 then
        acc1

    else if n == 1 then
        acc2

    else
        fibonacciHelper (n - 1) acc2 (acc1 + acc2)

>>>>>>> uptream/main


-- Ejercicio 4: Triángulo de Pascal


pascalTriangle : Int -> Int -> Int
<<<<<<< HEAD
pascalTriangle x y = 
    if y == 0 || x == y then 1
    else pascalTriangle (x - 1) (y - 1) + pascalTriangle (x - 1) y
=======
pascalTriangle x y =
    if x == 0 || x == y then
        1

    else
        pascalTriangle (x - 1) (y - 1) + pascalTriangle x (y - 1)

>>>>>>> uptream/main


-- Ejercicio 5: Máximo Común Divisor (MCD)


gcd : Int -> Int -> Int
gcd a b =
<<<<<<< HEAD
    if b == 0 then a
    else gcd b (a % b)
=======
    if b == 0 then
        abs a

    else
        gcd b (modBy b a)

>>>>>>> uptream/main


-- Ejercicio 6: Contar Dígitos


countDigits : Int -> Int
countDigits n =
<<<<<<< HEAD
    if n < 10 then 1
    else 1 + countDigits (n // 10) -- los // son una división entera
=======
    if n < 0 then
        countDigits (-1 * n)

    else if n < 10 then
        1

    else
        1 + countDigits (n // 10)

>>>>>>> uptream/main


-- Ejercicio 7: Suma de Dígitos


sumDigits : Int -> Int
sumDigits n =
<<<<<<< HEAD
    if n < 10 then n
    else (n % 10) + sumDigits (n // 10) -- el % es el módulo
=======
    if n < 0 then
        sumDigits (-1 * n)

    else if n < 10 then
        n

    else
        modBy 10 n + sumDigits (n // 10)

>>>>>>> uptream/main


-- Ejercicio 8: Verificar Palíndromo


isPalindrome : Int -> Bool
isPalindrome n =
<<<<<<< HEAD
    n == reverseNumber n
=======
    n >= 0 && n == reverseNumber n
>>>>>>> uptream/main


reverseNumber : Int -> Int
reverseNumber n =
<<<<<<< HEAD
    
=======
    reverseHelper n 0
>>>>>>> uptream/main


reverseHelper : Int -> Int -> Int
reverseHelper n acc =
<<<<<<< HEAD
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
=======
    if n < 10 then
        acc * 10 + n

    else
        let
            digit =
                modBy 10 n
        in
        reverseHelper (n // 10) (acc * 10 + digit)
>>>>>>> uptream/main
