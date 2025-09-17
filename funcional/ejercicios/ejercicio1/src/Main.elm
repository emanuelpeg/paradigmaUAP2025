module Main exposing (..)

import Html exposing (Html, text)
import Html exposing (b)
import Html.Attributes exposing (accept)


main : Html msg
main =
    text "Hello, Elm!"


add : Int -> Int -> Int
add a b =
    a + b


multiply : Int -> Int -> Int
multiply a b =
    if b == 0 then
        0
    else
        a * multiply a (b - 1)


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
    if n == 0 then
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
    if n == 0 then
        acc1
    else 
        fibonacciHelper(n - 1) acc2 (acc1 + acc2)


-- Ejercicio 4: Triángulo de Pascal
pascalTriangle : Int -> Int -> Int
pascalTriangle x y =
    if x == 0 || x == y then 1
    else pascalTriangle(x - 1) (y - 1) + pascalTriangle x (y - 1)



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
        countDigits(abs n)
    else if n < 10 then
        1
    else
        1 + countDigits (n//10)


-- Ejercicio 7: Suma de Dígitos
sumDigits : Int -> Int
sumDigits n =
    if n < 10 then
        n
    else
        modBy 10 n + sumDigits(n//10)


-- Ejercicio 8: Verificar Palíndromo
isPalindrome : Int -> Bool
isPalindrome n =
    if n < 0 then
        False
    else
        (abs n == reverseNumber (abs n))


reverseNumber : Int -> Int
reverseNumber n =
    reverseHelper n 0


reverseHelper : Int -> Int -> Int
reverseHelper n acc =
    if n == 0 then
        acc
    else if n < 10 then
        acc*10 + n
    else reverseHelper (n//10) (acc * 10 + modBy 10 n)


-- Ejercicio 9: Paréntesis Balanceados
isBalanced : String -> Bool
isBalanced str =
    -- TODO: Implementar verificador de paréntesis balanceados
    False


isBalancedHelper : List Char -> Int -> Bool
isBalancedHelper chars counter =
    -- TODO: Función auxiliar para verificar paréntesis balanceados
    False