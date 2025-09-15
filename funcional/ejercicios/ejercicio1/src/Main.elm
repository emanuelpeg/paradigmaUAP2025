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
-- Descripción: Calcula 'a' elevado a la potencia 'b'.
-- Razonamiento: Si el exponente 'b' es 0, el resultado es 1 (caso base).
-- De lo contrario, multiplicamos 'a' por el resultado de 'a' elevado a 'b-1'.
power : Int -> Int -> Int
power a b =
    if b == 0 then
        1
    else
        a * power a (b - 1)


-- Ejercicio 2: Factorial
-- Descripción: Calcula el factorial de 'n'.
-- Razonamiento: Si 'n' es 0, el resultado es 1 (caso base).
-- De lo contrario, multiplicamos 'n' por el factorial de 'n-1'.
factorial : Int -> Int
factorial n =
    if n <= 1 then
        1
    else
        n * factorial (n - 1)


-- Ejercicio 3: Fibonacci
-- Descripción: Implementa la secuencia de Fibonacci.
-- Razonamiento: 
-- 1. `fibonacciExponential`: Si 'n' es 0 o 1, el resultado es 'n' (caso base).
--    De lo contrario, sumamos el resultado de los dos números anteriores.
--    Este método es menos eficiente porque repite muchos cálculos.
-- 2. `fibonacciLinear`: Usa la función auxiliar `fibonacciHelper` para pasar acumuladores.
--    Es más eficiente y no tiene problemas con desbordamiento de la pila para números grandes.
fibonacciExponential : Int -> Int
fibonacciExponential n =
    if n <= 1 then
        n
    else
        fibonacciExponential (n - 1) + fibonacciExponential (n - 2)


fibonacciLinear : Int -> Int
fibonacciLinear n =
    fibonacciHelper n 0 1


fibonacciHelper : Int -> Int -> Int -> Int
fibonacciHelper n acc1 acc2 =
    if n == 0 then
        acc1
    else
        fibonacciHelper (n - 1) acc2 (acc1 + acc2)


-- Ejercicio 4: Triángulo de Pascal
-- Descripción: Calcula el valor en la posición (x, y) del Triángulo de Pascal.
-- Razonamiento: Si 'y' es 0 o 'x' es igual a 'y', el valor es 1 (bordes del triángulo).
-- De lo contrario, el valor es la suma de los dos valores de arriba: (x-1, y-1) y (x-1, y).
pascalTriangle : Int -> Int -> Int
pascalTriangle x y =
    if y == 0 || x == y then
        1
    else
        pascalTriangle (x - 1) (y - 1) + pascalTriangle (x - 1) y


-- Ejercicio 5: Máximo Común Divisor (MCD)
-- Descripción: Implementa el algoritmo euclidiano para encontrar el MCD.
-- Razonamiento: Si 'b' es 0, el MCD es 'a' (caso base).
-- De lo contrario, el MCD de (a, b) es el mismo que el MCD de (b, a % b).
gcd : Int -> Int -> Int
gcd a b =
    if b == 0 then
        a
    else
        gcd b (remainderBy b a)


-- Ejercicio 6: Contar Dígitos
-- Descripción: Cuenta la cantidad de dígitos en un número.
-- Razonamiento: Si 'n' es 0, hay 0 dígitos (caso base).
-- De lo contrario, es 1 más el número de dígitos en 'n' dividido por 10 (sin el último dígito).
countDigits : Int -> Int
countDigits n =
    if n == 0 then
        0
    else
        1 + countDigits (n // 10)


-- Ejercicio 7: Suma de Dígitos
-- Descripción: Suma todos los dígitos de un número.
-- Razonamiento: Si 'n' es 0, la suma es 0 (caso base).
-- De lo contrario, sumamos el último dígito ('n % 10') más la suma de los demás dígitos ('n // 10').
sumDigits : Int -> Int
sumDigits n =
    if n == 0 then
        0
    else
        (remainderBy 10 n) + sumDigits (n // 10)


-- Ejercicio 8: Verificar Palíndromo
-- Descripción: Determina si un número es un palíndromo (se lee igual al revés).
-- Razonamiento: Primero invertimos el número original y luego lo comparamos con el número original.
isPalindrome : Int -> Bool
isPalindrome n =
    n == reverseNumber n


reverseNumber : Int -> Int
reverseNumber n =
    reverseHelper n 0


reverseHelper : Int -> Int -> Int
reverseHelper n acc =
    if n == 0 then
        acc
    else
        let
            lastDigit =
                remainderBy 10 n

            remainingNumber =
                n // 10
        in
        reverseHelper remainingNumber (acc * 10 + lastDigit)


-- Ejercicio 9: Paréntesis Balanceados
-- Descripción: Verifica si una cadena de paréntesis está balanceada.
-- Razonamiento: Usamos un contador. Al encontrar '(', lo incrementamos. Al encontrar ')', lo decrementamos.
-- El contador nunca debe ser negativo y al final debe ser 0.
isBalanced : String -> Bool
isBalanced str =
    let
        chars =
            String.toList str
    in
    isBalancedHelper chars 0


isBalancedHelper : List Char -> Int -> Bool
isBalancedHelper chars counter =
    case chars of
        [] ->
            -- La lista está vacía, el contador debe ser 0 para que esté balanceado.
            counter == 0

        '(' :: rest ->
            -- Incrementamos el contador para un paréntesis de apertura.
            isBalancedHelper rest (counter + 1)

        ')' :: rest ->
            -- Si el contador es 0, tenemos un paréntesis de cierre sin uno de apertura, es inválido.
            if counter == 0 then
                False
            else
                isBalancedHelper rest (counter - 1)

        _ :: rest ->
            -- Ignoramos cualquier otro carácter y continuamos con el resto de la lista.
            isBalancedHelper rest counter