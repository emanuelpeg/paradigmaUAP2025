module Main exposing (..)

<<<<<<< HEAD
import Html exposing (Html, text)
import Html exposing (b)
import Html.Attributes exposing (accept)
=======
import Html exposing (Html, a, text)
>>>>>>> dceaf4e5d25ad98a024dfa8c1781ebd0eabfcf42


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
<<<<<<< HEAD
    else
        a * multiply a (b - 1)
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

>>>>>>> dceaf4e5d25ad98a024dfa8c1781ebd0eabfcf42


-- Ejercicio 1: Función Potencia


power : Int -> Int -> Int
power a b =
    if b == 0 then
        1
<<<<<<< HEAD
    else
        a * power a (b - 1)
    
=======

    else
        a * power a (b - 1)

>>>>>>> dceaf4e5d25ad98a024dfa8c1781ebd0eabfcf42


-- Ejercicio 2: Factorial


factorial : Int -> Int
factorial n =
<<<<<<< HEAD
    if n == 0 then
        1
    else                                    
        n * factorial (n - 1)
=======
    if n <= 1 then
        1

    else
        n * factorial (n - 1)

>>>>>>> dceaf4e5d25ad98a024dfa8c1781ebd0eabfcf42


-- Ejercicio 3: Fibonacci


fibonacciExponential : Int -> Int
fibonacciExponential n =
<<<<<<< HEAD
    if n <= 0 then
        0
    else if n == 1 then
        1
=======
    if n <= 1 then
        n

>>>>>>> dceaf4e5d25ad98a024dfa8c1781ebd0eabfcf42
    else
        fibonacciExponential (n - 1) + fibonacciExponential (n - 2)


fibonacciLinear : Int -> Int
fibonacciLinear n =
<<<<<<< HEAD
    if n <= 0 then
        0
    else
        fibonacciHelper n 0 1
=======
    fibonacciHelper n 0 1
>>>>>>> dceaf4e5d25ad98a024dfa8c1781ebd0eabfcf42


fibonacciHelper : Int -> Int -> Int -> Int
fibonacciHelper n acc1 acc2 =
    if n == 0 then
        acc1
<<<<<<< HEAD
    else 
        fibonacciHelper(n - 1) acc2 (acc1 + acc2)
=======

    else if n == 1 then
        acc2

    else
        fibonacciHelper (n - 1) acc2 (acc1 + acc2)

>>>>>>> dceaf4e5d25ad98a024dfa8c1781ebd0eabfcf42


-- Ejercicio 4: Triángulo de Pascal


pascalTriangle : Int -> Int -> Int
pascalTriangle x y =
<<<<<<< HEAD
    if x == 0 || x == y then 1
    else pascalTriangle(x - 1) (y - 1) + pascalTriangle x (y - 1)
=======
    if x == 0 || x == y then
        1

    else
        pascalTriangle (x - 1) (y - 1) + pascalTriangle x (y - 1)
>>>>>>> dceaf4e5d25ad98a024dfa8c1781ebd0eabfcf42



-- Ejercicio 5: Máximo Común Divisor (MCD)


gcd : Int -> Int -> Int
gcd a b =
    if b == 0 then
<<<<<<< HEAD
        abs a 
    else
        gcd b (modBy b a) 
=======
        abs a

    else
        gcd b (modBy b a)

>>>>>>> dceaf4e5d25ad98a024dfa8c1781ebd0eabfcf42


-- Ejercicio 6: Contar Dígitos


countDigits : Int -> Int
countDigits n =
    if n < 0 then
<<<<<<< HEAD
        countDigits(abs n)
    else if n < 10 then
        1
    else
        1 + countDigits (n//10)
=======
        countDigits (-1 * n)

    else if n < 10 then
        1

    else
        1 + countDigits (n // 10)

>>>>>>> dceaf4e5d25ad98a024dfa8c1781ebd0eabfcf42


-- Ejercicio 7: Suma de Dígitos


sumDigits : Int -> Int
sumDigits n =
<<<<<<< HEAD
    if n < 10 then
        n
    else
        modBy 10 n + sumDigits(n//10)
=======
    if n < 0 then
        sumDigits (-1 * n)

    else if n < 10 then
        n

    else
        modBy 10 n + sumDigits (n // 10)

>>>>>>> dceaf4e5d25ad98a024dfa8c1781ebd0eabfcf42


-- Ejercicio 8: Verificar Palíndromo


isPalindrome : Int -> Bool
isPalindrome n =
<<<<<<< HEAD
    if n < 0 then
        False
    else
        (abs n == reverseNumber (abs n))
=======
    n >= 0 && n == reverseNumber n
>>>>>>> dceaf4e5d25ad98a024dfa8c1781ebd0eabfcf42


reverseNumber : Int -> Int
reverseNumber n =
    reverseHelper n 0


reverseHelper : Int -> Int -> Int
reverseHelper n acc =
<<<<<<< HEAD
    if n == 0 then
        acc
    else if n < 10 then
        acc*10 + n
    else reverseHelper (n//10) (acc * 10 + modBy 10 n)
=======
    if n < 10 then
        acc * 10 + n
>>>>>>> dceaf4e5d25ad98a024dfa8c1781ebd0eabfcf42

    else
        let
            digit =
                modBy 10 n
        in
        reverseHelper (n // 10) (acc * 10 + digit)
