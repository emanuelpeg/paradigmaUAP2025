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
<<<<<<< HEAD
    -- TODO: Implementar función potencia
    if b == 0 then
        1
    else
        a * power a (b - 1)
=======
    if b == 0 then
        1

    else
        a * power a (b - 1)

>>>>>>> 6503c16d93fb26819380dafdb0211797af43c0f8


-- Ejercicio 2: Factorial


factorial : Int -> Int
factorial n =
<<<<<<< HEAD
    -- TODO: Implementar factorial
    0
     if n == 0 then
        1
    else
        n * factorial (n - 1)
=======
    if n <= 1 then
        1

    else
        n * factorial (n - 1)


>>>>>>> 6503c16d93fb26819380dafdb0211797af43c0f8

-- Ejercicio 3: Fibonacci


fibonacciExponential : Int -> Int
fibonacciExponential n =
<<<<<<< HEAD
    -- TODO: Implementar fibonacci exponencial
    0
    if n == 0 then
        0
    else if n == 1 then
        1
    else
        fibonacciExponential (n - 1) + fibonacciExponential (n - 2)

fibonacciLinear : Int -> Int
fibonacciLinear n =
    -- TODO: Implementar fibonacci lineal con acumuladores
    0
    if n == 0 then
        acc1
    else if n == 1 then
    else
        fibonacciHelper (n - 1) acc2 (acc1 + acc2)
=======
    if n <= 1 then
        n

    else
        fibonacciExponential (n - 1) + fibonacciExponential (n - 2)


fibonacciLinear : Int -> Int
fibonacciLinear n =
    fibonacciHelper n 0 1
>>>>>>> 6503c16d93fb26819380dafdb0211797af43c0f8


fibonacciHelper : Int -> Int -> Int -> Int
fibonacciHelper n acc1 acc2 =
<<<<<<< HEAD
    -- TODO: Función auxiliar para fibonacci lineal
    0
    if n == 0 then
        acc1
    else
        fibonacciHelper (n - 1) acc2 (acc1 + acc2)

-- Ejercicio 4: Triángulo de Pascal 
pascalTriangle : Int -> Int -> Int
pascalTriangle x y =
    -- TODO: Implementar triángulo de Pascal
    0
    f y == 0 || y == x then
        1
    else
        pascalTriangle (x - 1) (y - 1) + pascalTriangle (x - 1) y
=======
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

>>>>>>> 6503c16d93fb26819380dafdb0211797af43c0f8


-- Ejercicio 5: Máximo Común Divisor (MCD)


gcd : Int -> Int -> Int
gcd a b =
<<<<<<< HEAD
    -- TODO: Implementar algoritmo euclidiano
    0
    gcd : Int -> Int -> Int
gcd a b =
    if b == 0 then
        a
    else
        gcd b (modBy b a)
=======
    if b == 0 then
        abs a

    else
        gcd b (modBy b a)

>>>>>>> 6503c16d93fb26819380dafdb0211797af43c0f8


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
<<<<<<< HEAD
    -- TODO: Implementar verificador de palíndromo
 
=======
    n >= 0 && n == reverseNumber n

>>>>>>> 6503c16d93fb26819380dafdb0211797af43c0f8

reverseNumber : Int -> Int
reverseNumber n =
    reverseHelper n 0


reverseHelper : Int -> Int -> Int
reverseHelper n acc =
<<<<<<< HEAD
    -- TODO: Función auxiliar para invertir número
    0
    if n < 10 then 
        acc * 10 + n
    else 
        reverseHelper (n // 10) (acc * 10 + modBy 10 n)

-- Ejercicio 9: Paréntesis Balanceados
isBalanced : String -> Bool
isBalanced str =
    -- TODO: Implementar verificador de paréntesis balanceados
    False


isBalancedHelper : List Char -> Int -> Bool
isBalancedHelper chars counter =
    -- TODO: Función auxiliar para verificar paréntesis balanceados
    Falsen
=======
    if n < 10 then
        acc * 10 + n

    else
        let
            digit =
                modBy 10 n
        in
        reverseHelper (n // 10) (acc * 10 + digit)
>>>>>>> 6503c16d93fb26819380dafdb0211797af43c0f8
