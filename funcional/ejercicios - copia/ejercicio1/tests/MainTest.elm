module Main exposing (..)

import String
import Char
import Debug


-- Ejercicio 1: Función Potencia
-- Eleva un número 'a' a la potencia 'b' usando recursión.
power : Int -> Int -> Int
power a b =
    if b == 0 then
        1
    else
        a * (power a (b - 1))


-- Ejercicio 2: Factorial
-- Calcula el factorial de un número 'n'.
factorial : Int -> Int
factorial n =
    if n <= 1 then
        1
    else
        n * (factorial (n - 1))


-- Ejercicio 3: Fibonacci
-- Versión exponencial (ingenua)
fibonacciExponential : Int -> Int
fibonacciExponential n =
    if n == 0 then
        0
    else if n == 1 then
        1
    else
        fibonacciExponential (n - 1) + fibonacciExponential (n - 2)


-- Versión lineal (optimizada con acumuladores)
fibonacciLinear : Int -> Int
fibonacciLinear n =
    let
        fibonacciHelper actual anterior n_restante =
            if n_restante == 0 then
                actual
            else
                fibonacciHelper (actual + anterior) actual (n_restante - 1)
    in
    if n == 0 then
        0
    else
        fibonacciHelper 1 0 (n - 1)


-- Ejercicio 4: Triángulo de Pascal
-- Calcula el valor en la posición (x, y) del triángulo de Pascal.
pascalTriangle : Int -> Int -> Int
pascalTriangle x y =
    if x == 0 || x == y then
        1
    else
        pascalTriangle (x - 1) (y - 1) + pascalTriangle x (y - 1)


-- Ejercicio 5: Máximo Común Divisor (MCD)
-- Implementa el algoritmo euclidiano para calcular el MCD de dos números.
gcd : Int -> Int -> Int
gcd a b =
    if b == 0 then
        abs a
    else
        gcd b (modBy b a)


-- Ejercicio 6: Contar Dígitos
-- Cuenta la cantidad de dígitos en un número.
countDigits : Int -> Int
countDigits n =
    let
        absN =
            abs n
    in
    if absN < 10 then
        1
    else
        1 + countDigits (absN // 10)


-- Ejercicio 7: Suma de Dígitos
-- Suma todos los dígitos de un número.
sumDigits : Int -> Int
sumDigits n =
    let
        absN =
            abs n
    in
    if absN < 10 then
        absN
    else
        (absN % 10) + sumDigits (absN // 10)


-- Ejercicio 8: Verificar Palíndromo
-- Verifica si un número es palíndromo usando una función auxiliar para invertirlo.
isPalindrome : Int -> Bool
isPalindrome n =
    let
        reverseNumberHelper num acc =
            if num == 0 then
                acc
            else
                reverseNumberHelper (num // 10) (acc * 10 + (num % 10))
    in
    n == reverseNumberHelper n 0


-- Función auxiliar para invertir el número (ejemplo aparte)
reverseNumber : Int -> Int
reverseNumber n =
    let
        reverseHelper num acc =
            if num == 0 then
                acc
            else
                reverseHelper (num // 10) (acc * 10 + (num % 10))
    in
    reverseHelper n 0


-- Ejercicio 9: Paréntesis Balanceados
-- Determina si los paréntesis en un texto están balanceados.
isBalanced : String -> Bool
isBalanced s =
    let
        isBalancedHelper chars balance =
            case chars of
                [] ->
                    balance == 0

                '(' :: tail ->
                    if balance < 0 then
                        False
                    else
                        isBalancedHelper tail (balance + 1)

                ')' :: tail ->
                    if balance <= 0 then
                        False
                    else
                        isBalancedHelper tail (balance - 1)

                _ :: tail ->
                    isBalancedHelper tail balance
    in
    isBalancedHelper (String.toList s) 0


-- Esta es la función principal que se ejecutará.
-- No muestra nada en la pantalla, pero enviará los resultados a la consola del navegador.
main =
    let
        -- Llama a tus funciones aquí para ver los resultados
        _ = Debug.log "power 2 3" (power 2 3)
        _ = Debug.log "factorial 5" (factorial 5)
        _ = Debug.log "fibonacciLinear 10" (fibonacciLinear 10)
        _ = Debug.log "pascalTriangle 2 4" (pascalTriangle 2 4)
        _ = Debug.log "gcd 48 18" (gcd 48 18)
        _ = Debug.log "countDigits 12345" (countDigits 12345)
        _ = Debug.log "sumDigits 123" (sumDigits 123)
        _ = Debug.log "isPalindrome 12321" (isPalindrome 12321)
        _ = Debug.log "isBalanced \"(()())()\"" (isBalanced "(()())()")
    in
    Html.text "Revisa la consola de tu navegador (F12) para ver los resultados."