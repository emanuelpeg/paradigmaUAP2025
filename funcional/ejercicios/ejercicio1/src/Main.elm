module Main exposing (..)

import Html exposing (Html, text)
import Html exposing (a)


main : Html msg
main =
    text (Debug.toString (pascalTriangle 5 2))  --text "Hello, Elm!"


add : Int -> Int -> Int
add a b =
    if b == 0 then
        a
    else a+b 


multiply : Int -> Int -> Int
multiply a b =
    if b == 0 then
        0
    else if b == 1 then
        a
    else  
    add(a) (multiply a(b - 1)) 


-- Ejercicio 1: Función Potencia
power : Int -> Int -> Int
power a b =
    -- TODO: Implementar función potencia
    --Una potencia es la multiplicacion de a*a tantas veces como b
    if b == 0 then
        1
    else if b == 1 then
        a
    else
        multiply(a)(power a (b - 1))


-- Ejercicio 2: Factorial
factorial : Int -> Int
factorial n =
    if n == 0 then
        1
    else if n == 1 then
        n
    else 
        multiply(n)(factorial(n - 1))

--0 1 2 3 5 8 13 21 34 55
-- Ejercicio 3: Fibonacci
fibonacciExponential : Int -> Int
fibonacciExponential n = 
    if n <=1 then
    1
    else 
        add (fibonacciExponential (n - 1)) (fibonacciExponential(n - 2))
--6 -> 5+4 -> (4+3) + (3+2)-> ((3+2)+(2+1))+((2+1)+(1+0)) Esto se continua haciendo hasta que todos sean uno y se suman

fibonacciLinear : Int -> Int
fibonacciLinear n =
    fibonacciHelper n 1 0
    


fibonacciHelper : Int -> Int -> Int -> Int
fibonacciHelper n acc1 acc2 =
    if n == 0 then acc2
    else if n == 1 then acc1 --5 1 0 -> 4 1 1 ->3 2 1 ->2 3 2 ->1 5 3 ->5
    else fibonacciHelper (n - 1)(acc1+acc2) (acc1)


-- Ejercicio 4: Triángulo de Pascal
pascalTriangle : Int -> Int -> Int
pascalTriangle x y =
    if y == 0 then
    1
    else if x == 0 then
    1
    else if x == y then 
    1
    else 
        --2 4 -> 
    add (pascalTriangle((x) - 1)((y) - 1)) (pascalTriangle(x)((y) - 1))
     -- 
        --TERMINAR BIEN 
        --Es extremadamente parecido a fibonacci y se podria usar la parte de fibonacci helper 
--1         0  0
--11        1  01
--121       2  012
--1331      3  0123
--14641     4  01234
--15101051  5  012345

-- Ejercicio 5: Máximo Común Divisor (MCD)
gcd : Int -> Int -> Int
gcd a b =
    if b == 0 then
            abs a --abs funcion que devuelve el valor absoluto
    else    
        gcd b(modBy b a) --da el valor absoluto del resto al dividir por un entero


-- Ejercicio 6: Contar Dígitos
countDigits : Int -> Int
countDigits n =
    if n < 0 then
        countDigits (abs n)
    else if n < 10 then
        1
    else
        1 + countDigits (n // 10) -- "//" division entera


-- Ejercicio 7: Suma de Dígitos
sumDigits : Int -> Int
sumDigits n =

    if n < 10 then
        n
    else
        modBy 10 n + sumDigits (n // 10)



-- Ejercicio 8: Verificar Palíndromo
isPalindrome : Int -> Bool
isPalindrome n =
    if n<0 then 
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
        acc * 10 + n
    else reverseHelper (n//10) ( acc * 10 + modBy 10 n) --(obtengo el siguiente y primer digito)


--No se hace (eso dijeron en el grupo)
-- Ejercicio 9: Paréntesis Balanceados
isBalanced : String -> Bool
isBalanced str =
    -- TODO: Implementar verificador de paréntesis balanceados
    False


isBalancedHelper : List Char -> Int -> Bool
isBalancedHelper chars counter =
    -- TODO: Función auxiliar para verificar paréntesis balanceados
    False