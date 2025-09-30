module Main exposing (..)

import Html exposing (Html, text)


main : Html msg
main =
    text "Hello, Elm!"


add : Int -> Int -> Int
add a b =
    a + b


multiply : Int -> Int -> Int
multiply a b =
    a * b


-- Ejercicio 1: Función Potencia
power : Int -> Int -> Int
power a b =
    a ^ b


-- Ejercicio 2: Factorial
factorial : Int -> Int      -- recibe un entero y devuelve un entero
factorial n =
    if n == 0 then           -- si n vale 0, el factorial es 1
        1
    else
        n * factorial (n - 1)  -- en otro caso, n! se calcula multiplicando n por el factorial de n-1


-- Ejercicio 3: Fibonacci
fibonacciExponential : Int -> Int        -- recibe un número y devuelve el n-ésimo Fibonacci
fibonacciExponential n =
    if n == 0 then                       -- primer caso: fib(0) = 0
        0
    else if n == 1 then                  -- segundo caso: fib(1) = 1
        1
    else
        fibonacciExponential (n - 1) + fibonacciExponential (n - 2) -- sumamos los dos anteriores


--Fibonacci lineal con acumuladores
fibonacciLinear : Int -> Int              -- recibe un número y devuelve el n-ésimo Fibonacci
fibonacciLinear n =
    if n == 0 then                        -- si n es 0, el resultado es 0
        0
    else
        fibonacciHelper n 0 1             -- empezamos con 0 y 1 como primeros valores de Fibonacci


-- Función auxiliar con acumuladores
fibonacciHelper : Int -> Int -> Int -> Int
fibonacciHelper n acc1 acc2 =
    if n == 1 then                        -- cuando llegamos a 1 devolvemos el acumulador acc2
        acc2
    else
        fibonacciHelper (n - 1) acc2 (acc1 + acc2)
        -- avanzamos: el segundo acumulador pasa a ser el primero
        -- y el nuevo segundo es la suma de ambos


-- Ejercicio 4: Triángulo de Pascal
pascalTriangle : Int -> Int -> Int          -- recibe la fila (x) y la columna (y)
pascalTriangle x y =
    if y == 0 || y == x then                -- si estamos en el borde devolvemos 1
        1
    else
        pascalTriangle (x - 1) (y - 1)      -- sumamos el de arriba a la izquierda
        + pascalTriangle (x - 1) y          -- y el de arriba a la derecha

-- Ejercicio 5: Máximo Común Divisor (MCD)
gcd : Int -> Int -> Int              -- recibe dos enteros y devuelve el mayor divisor común
gcd a b =
    if b == 0 then                    -- si el segundo número llega a 0, el resultado es a
        a
    else
        gcd b (modBy b a)             -- de lo contrario seguimos con b y el resto de a dividido b


-- Ejercicio 6: Contar Dígitos
countDigits : Int -> Int              -- recibe un número entero y devuelve la cantidad de dígitos
countDigits n =
    if n < 10 then                    -- si el número es menor que 10, tiene un solo dígito
        1
    else
        1 + countDigits (n // 10)     -- en otro caso, quitamos un dígito dividiendo por 10 y sumamos 1


-- Ejercicio 7: Suma de Dígitos
sumDigits : Int -> Int                -- recibe un número entero y devuelve la suma de sus dígitos
sumDigits n =
    if n < 10 then                    -- si es un número de un solo dígito, lo devolvemos tal cual
        n
    else
        (modBy 10 n) + sumDigits (n // 10) -- tomamos el último dígito y lo sumamos con el resto


-- Ejercicio 8: Verificar Palíndromo
isPalindrome : Int -> Bool            -- recibe un número y devuelve True si es palíndromo
isPalindrome n =
    n == reverseNumber n              -- un número es palíndromo si es igual a su inverso


-- Función principal para invertir un número
reverseNumber : Int -> Int
reverseNumber n =
    reverseHelper n 0                  -- empezamos con el acumulador en 0


-- Función auxiliar con acumulador
reverseHelper : Int -> Int -> Int
reverseHelper n acc =
    if n == 0 then                     -- cuando no quedan más dígitos, devolvemos el acumulador
        acc
    else
        reverseHelper (n // 10) (acc * 10 + modBy 10 n)
        -- dividimos entre 10 para avanzar y agregamos el último dígito al acumulador
        

-- Ejercicio 9: Paréntesis Balanceados
isBalanced : String -> Bool
isBalanced str =
    -- TODO: Implementar verificador de paréntesis balanceados
    False


isBalancedHelper : List Char -> Int -> Bool
isBalancedHelper chars counter =
    -- TODO: Función auxiliar para verificar paréntesis balanceados
    False