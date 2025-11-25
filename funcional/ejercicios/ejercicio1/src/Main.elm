module Main exposing (..)

import Html exposing (Html, text)
import Html exposing (a)
import Html.Attributes exposing (list)


main : Html msg

main = text <|
    "multiply 4 3 = " ++ String.fromInt (multiply 4 3) ++ "\n" ++
    "add 3 2 = " ++ String.fromInt (add 3 2) ++ "\n" ++
    "potencia 5 2 = " ++ String.fromInt (power 5 2) ++ "\n"

add : Int -> Int -> Int
add a b =
    if b == 0 then
        a

    else
        add (a + 1) (b - 1)


--multiply : Int -> Int -> Int
--multiply a b =
--    if b== 0 then
  --  0
   -- else if b == 1 then
   -- a 
   -- else
   -- a * b
multiply : Int -> Int -> Int
multiply a b =
    if b == 0 then
        0
    else if b > 0 then
        a + multiply a (b - 1)
    else
        -- manejar negativos: opcional
        -(multiply a (negate b))
   


-- Ejercicio 1: Función Potencia


power : Int -> Int -> Int
power a b =
    if b == 0 then
        1
    else
        a * power a (b - 1)
    -- TODO: Implementar función potencia
    


-- Ejercicio 2: Factorial


factorial : Int -> Int
factorial n = 
    if n <= 1 && n > -1 then
        1
    else
        n * factorial (n - 1)

    -- TODO: Implementar factorial
    


-- Ejercicio 3: Fibonacci


fibonacciExponential : Int -> Int
fibonacciExponential n = 
    if n <= 0 then
    0
    else if n == 1 then
    1
    else
    fibonacciExponential(n - 1)+fibonacciExponential(n - 2)
    -- TODO: Implementar fibonacci exponencial
    


-- Ejercicio 3: Fibonacci lineal con acumuladores
fibonacciLinear : Int -> Int
fibonacciLinear n =
    if n < 0 then
        0
    else
        fibonacciHelper n 0 1


-- Función auxiliar con acumuladores
fibonacciHelper : Int -> Int -> Int -> Int
fibonacciHelper n acc1 acc2 =
    if n == 0 then
        acc1
    else
        fibonacciHelper(n - 1) acc2 (acc1 + acc2) -- se llama a fibonacci helper pero ahora dandole a acc 1 el valor viejo de acc 2 y acc2 toma el valor de la suma de acc2 y 1


-- Ejercicio 4: Triángulo de Pascal


pascalTriangle : Int -> Int -> Int
pascalTriangle x y =
    if x < 0 || y < 0 then
        0
    else if x == 0 || x == y then -- lo que hace es verificar si se llego a la ultima linea del triangulo de pascal
        1
    else
        pascalTriangle (x - 1) (y - 1) + pascalTriangle x (y - 1) -- devuelve la suma del triangulo de pascal de arriba a la izquierda con el de arriba directo, dando asi a la coordenada de abajo inmediata
    -- TODO: Implementar triángulo de Pascal
    


-- Ejercicio 5: Máximo Común Divisor (MCD)


gcd : Int -> Int -> Int
gcd a b =
    if b == 0 then
        abs a
    else
        gcd b (remainderBy b a)
    -- TODO: Implementar algoritmo euclidiano
    


 

-- Ejercicio 6: Contar Dígitos


countDigits : Int -> Int
countDigits n =
    let
        nAbs = abs n
    in
    if nAbs < 10 then
        1
    else
        1 + countDigits (toFloat nAbs / 10 |> floor)


-- Ejercicio 7: Suma de Dígitos


sumDigits : Int -> Int
sumDigits n =
    let
        nAbs = abs n
    in
    if nAbs < 10 then
        nAbs
    else
        remainderBy 10 nAbs + sumDigits (toFloat nAbs / 10 |> floor)

-- Ejercicio 8: Verificar Palíndromo
-- Ejercicio 8: Verificar Palíndromo
isPalindrome : Int -> Bool
isPalindrome n =
    if n < 0 then -- teoricamente no haria falta debido a que reverse number usa el absoluto, en dado caso, seria tan facil como comparar con el absoluto y asi.
        False
    else
        n == reverseNumber n -- llama a reverse number para que le devuelva el numero inverso y si es igual a n, devuelve true


-- Función para invertir los dígitos de un número
reverseNumber : Int -> Int
reverseNumber n =
    reverseHelper (abs n) 0 -- ingresa el absoluto de n con el inicio del acumulador en 0


-- Función auxiliar recursiva
reverseHelper : Int -> Int -> Int
reverseHelper n acc =
    if n == 0 then --verifica si ya termino de hacer el reverso del numero ingresado en el primer n
        acc
    else
        reverseHelper (toFloat n / 10 |> floor)-- quita el ultimo digito para seguir el ciclo y volverse el nuevo n, ejemplo empieza 121, pasara a ser n = 12
        (acc * 10 + remainderBy 10 n)-- agrega ese digito al acumulador, ejemplo de 121, acc = 1, luego sera 1*10+2 (10+2) acc = 12

--no se hace
-- Ejercicio 9: Paréntesis Balanceados
isBalanced : String -> Bool
isBalanced str =
    -- TODO: Implementar verificador de paréntesis balanceados
    False


--isBalancedHelper : List Char -> Int -> Bool
--isBalancedHelper chars counter =
    -- TODO: Función auxiliar para verificar paréntesis balanceados
--    if List.isEmpty chars then True
--    else let
--        current= List.head Chars 
--    in  
--        if current == Just                         then is BalancedHelper (Maybe.withDefault [] List.tail)
--    False

