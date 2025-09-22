module Main exposing (..)

import Html exposing (Html, text)
import Html exposing (a)
import List exposing (isEmpty)
import Fuzz exposing (char)
import List exposing (filter)


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
    if b == 0 then 0
    else if b == 1 then
        a
    else
        a + multiply a (b - 1)


-- Ejercicio 1: Función Potencia
power : Int -> Int -> Int
power a b =
    -- TODO: Implementar función potencia
    if b == 0 then
        1
    else if b == 1 then
        a
    else
        a * power a (b - 1)
        -- power (multiply a a) (b - 1)


-- Ejercicio 2: Factorial
factorial : Int -> Int
factorial n =
    if n == 0 then 1
    else if n == 1 then 1
    else
        n * factorial (n - 1)
    -- TODO: Implementar factorial


-- Ejercicio 3: Fibonacci
fibonacciExponential : Int -> Int
fibonacciExponential n =
    if n == 0 then 0
    else if n == 1 then 1
    else fibonacciExponential(n - 1) + fibonacciExponential(n - 2)


fibonacciLinear : Int -> Int
fibonacciLinear n =
    fibonacciHelper n 0 1


fibonacciHelper : Int -> Int -> Int -> Int
fibonacciHelper n anteriorAnterior anterior =
    if n == 0 then anteriorAnterior
    -- se baja el numero que buscamos
    -- restamos uno a n, que usamos como contador
    -- en en el que esta dos posiciones antes pasamos el que esta a una posicion antes
    -- en la posicion anterior ponemos la suma (en estos parametros basicamente se incrementa por uno la posicion)
    
    else fibonacciHelper (n - 1) anterior (anteriorAnterior + anterior)


-- Ejercicio 4: Triángulo de Pascal
pascalTriangle : Int -> Int -> Int
pascalTriangle x y =
    -- TODO: Implementar triángulo de Pascal
    if x == 0 || x == y then 1
    else pascalTriangle (x - 1) (y - 1) + pascalTriangle x (y - 1)


-- Ejercicio 5: Máximo Común Divisor (MCD)
gcd : Int -> Int -> Int
gcd a b = 
    -- TODO: Implementar algoritmo euclidiano
    if b == 0 then a
    else 
        gcd b (remainderBy b a)


-- Ejercicio 6: Contar Dígitos
countDigits : Int -> Int
countDigits n =
    -- TODO: Implementar contador de dígitos
    if n < 10 && n > -10 then 1
    else 
        1 + countDigits (n // 10)



-- Ejercicio 7: Suma de Dígitos
sumDigits : Int -> Int
sumDigits n =
    -- TODO: Implementar suma de dígitos
    if n < 10 && n > -10 then abs n
    else
        abs (remainderBy 10 n) + sumDigits (n // 10) 

-- Ejercicio 8: Verificar Palíndromo
isPalindrome : Int -> Bool
isPalindrome n =
    -- TODO: Implementar verificador de palíndromo
    if n < 0 then False
    -- else if n < 10 then True
    else if n // 10^(countDigits n - 1) == remainderBy 10 n then
        if countDigits n > 2 then
            -- se le saca el primer y ultimo numero
            isPalindrome ((remainderBy (10^(countDigits n - 1)) n) // 10)
        else
            True 
    else
        False 


reverseNumber : Int -> Int
reverseNumber n =
    -- TODO: Implementar función para invertir número
    reverseHelper n 0


reverseHelper : Int -> Int -> Int
reverseHelper n acc =
    -- TODO: Función auxiliar para invertir número
    if n == 0 then acc
    else
        reverseHelper (n // 10) (acc * 10 + remainderBy 10 n)


-- Ejercicio 9: Paréntesis Balanceados
isBalanced : String -> Bool
isBalanced str =
    -- TODO: Implementar verificador de paréntesis balanceados
    -- contar (
    isBalancedHelper (String.toList str) 0


isBalancedHelper : List Char -> Int -> Bool
isBalancedHelper chars counter =
    -- TODO: Función auxiliar para verificar paréntesis balanceados
    case chars of
        [] -> counter == 0
        c :: rest ->
            if counter < 0 then False
            else if c == '(' then isBalancedHelper rest (counter + 1)
            else if c == ')' then isBalancedHelper rest (counter - 1)
            else isBalancedHelper rest counter










