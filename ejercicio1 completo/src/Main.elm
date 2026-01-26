module Main exposing (..)

import Html exposing (Html, text)
import Bitwise exposing (or)
import Html exposing (q)
import Html exposing (th)
import List exposing (length)
import Fuzz exposing (char)


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
    else if b == 1 then 
      a
    else
      a + (multiply a (b - 1))


multiply2: Int -> Int -> Int -> Int
multiply2 a b acc=
    if b == 1 then
      acc + a
    else
      multiply2 a (b - 1) (acc + a)


-- Ejercicio 1: Función Potencia
power : Int -> Int -> Int
power a b =
    -- TODO: Implementar función potencia
    if b == 0 then 
    b + 1
    else 
    a * power a (b - 1)



-- Ejercicio 2: Factorial
factorial : Int -> Int
factorial n =
    -- TODO: Implementar factorial
    if n < 2 then
      1
    else factorial (n - 1) * n


-- Ejercicio 3: Fibonacci
fibonacciExponential : Int -> Int
fibonacciExponential n =
    -- TODO: Implementar fibonacci exponencial
    if (n == 0 ) then 0
    else if (n == 1) then 1

    else fibonacciExponential (n - 1) + fibonacciExponential (n - 2)



fibonacciLinear : Int -> Int
fibonacciLinear n =
    -- TODO: Implementar fibonacci lineal con acumuladores
    fibonacciHelper n 0 1



fibonacciHelper : Int -> Int -> Int -> Int
fibonacciHelper n acc1 acc2 =
    -- TODO: Función auxiliar para fibonacci lineal
    if n == 0 then acc2
    else if n == 1 then acc1
    else fibonacciHelper (n - 1) (acc1) (acc1 + acc2)


-- Ejercicio 4: Triángulo de Pascal
pascalTriangle : Int -> Int -> Int
pascalTriangle x y =
    -- TODO: Implementar triángulo de Pascal
    if y < x || y < 0 then 
      0
    else if x == y || x == 0 then 
      1
    else pascalTriangle (y - 1) x + pascalTriangle (y - 1) (x - 1)


-- Ejercicio 5: Máximo Común Divisor (MCD)
gcd : Int -> Int -> Int
gcd a b =
    -- TODO: Implementar algoritmo euclidiano
    if b == 0 then 
      abs a
    else gcd b (modBy b a)--modulo de a entre b


-- Ejercicio 6: Contar Dígitos
countDigits : Int -> Int
countDigits n =
    -- TODO: Implementar contador de dígitos
    if n < 0 then
      countDigits( -1 * n)
    else if n < 10 then 
      1
    else
      countDigits(n // 10 ) + 1 -- // Para cal. divicion enetero.


-- Ejercicio 7: Suma de Dígitos
sumDigits : Int -> Int
sumDigits n =
    -- TODO: Implementar suma de dígitos
    if n < 10 then
    n
    else
      sumDigits (n // 10) + (modBy 10 n)

-- Ejercicio 8: Verificar Palíndromo
isPalindrome : Int -> Bool
isPalindrome n =
    -- TODO: Implementar verificador de palíndromo
    n >= 0 && n == reverseNumber n


reverseNumber : Int -> Int
reverseNumber n =
    -- TODO: Implementar función para invertir número
    reverseHelper n 0



reverseHelper : Int -> Int -> Int
reverseHelper n acc =
    -- TODO: Función auxiliar para invertir número
    if n < 10 then
      acc * 10 + n
    else
      reverseHelper (n // 10) (acc * 10 +  modBy 10 n) -- para obtener el numero


-- Ejercicio 9: Paréntesis Balanceados
-- isBalanced : String -> Bool
-- isBalanced str =
--     -- TODO: Implementar verificador de paréntesis balanceados
--     False


-- isBalancedHelper : List Char -> Int -> Bool
-- isBalancedHelper chars counter = 
    -- TODO: Función auxiliar para verificar paréntesis balanceados
    -- if List.isEmpty chars then True
    -- else let
    -- current = List.head chars
    -- in 
    --   if current == Just '('then isBalancedHelpder (Maybe.withDefault [] List.tail) (counter + 1))
  