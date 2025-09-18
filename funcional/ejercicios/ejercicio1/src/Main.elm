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

-- Ejercicio 1: Función Potencia. Usando operador (^)
power : Int -> Int -> Int  
power a b =
        a ^ b      

-- Ejercicio 1: Función Potencia. Recursivo.
power2 : Int -> Int -> Int  -- la función recibe dos enteros (base y exponente) y devuelve un entero
power2 a b =
    if b == 0 then          -- caso base: si el exponente es 0 devuelve 1, xq cualquier número elevado a 0 es 1
        1                    
    else
        a * power2 a (b - 1) -- caso recursivo: a^b = a * a^(b-1)


-- Ejercicio 2: Factorial
factorial : Int -> Int      -- recibe un entero y devuelve un entero
factorial n =
    if n == 0 then           -- caso base: si n es 0, devuelve 1 xq 0! = 1
        1
    else
        n * factorial (n - 1)  -- caso recursivo: n! = n * (n-1)!



-- Ejercicio 3: Fibonacci
fibonacciExponential : Int -> Int        -- recibe un entero y devuelve un entero
fibonacciExponential n =
    if n == 0 then                       -- caso base 1: si n es 0, el resultado es 0
        0
    else if n == 1 then                  -- caso base 2: si n es 1, el resultado es 1
        1
    else
        fibonacciExponential (n - 1) + fibonacciExponential (n - 2) -- caso recursivo: suma de los dos anteriores



-- Ejercicio 4: Fibonacci lineal con acumuladores
fibonacciLinear : Int -> Int              -- recibe un entero y devuelve un entero
fibonacciLinear n =
    if n == 0 then                        -- caso base: fib(0) = 0
        0
    else
        fibonacciHelper n 0 1             -- arranca con fib(0)=0 (acc1) y fib(1)=1 (acc2)


-- Función auxiliar que usa acumuladores
fibonacciHelper : Int -> Int -> Int -> Int
fibonacciHelper n acc1 acc2 =
    if n == 1 then                        -- si llega a fib(1), devuelve acc2
        acc2
    else
        fibonacciHelper (n - 1) acc2 (acc1 + acc2)
        -- avanzamos un paso:
        --   acc2 pasa a ser el nuevo fib(i-1)
        --   acc1+acc2 pasa a ser el nuevo fib(i)


-- Ejercicio 4: Triángulo de Pascal
pascalTriangle : Int -> Int -> Int          -- recibe dos números: x es la fila, y es la columna
pascalTriangle x y =
    if y == 0 || y == x then                -- si estoy en la primera posición de la fila (columna 0)
                                            -- o en la última posición de la fila (columna = fila)
                                            -- siempre devuelvo 1 porque en los bordes del triángulo de Pascal siempre hay 1
        1
    else
        pascalTriangle (x - 1) (y - 1)      -- si no estoy en el borde, me fijo en el número de arriba a la izquierda
        + pascalTriangle (x - 1) y          -- y también en el número de arriba a la derecha, y los sumo
                                            -- esa suma me da el valor que va en la posición (x,y)


-- Ejercicio 5: Máximo Común Divisor (MCD)
gcd : Int -> Int -> Int              -- la función recibe dos enteros y devuelve otro entero
gcd a b =
    if b == 0 then                    -- si b es 0, significa que ya encontramos el divisor común más grande
        a                             -- devolvemos a, porque ese es el MCD
    else
        gcd b (modBy b a)
                                     -- si no, volvemos a llamar a la función:
                                      -- el primer número pasa a ser b y el segundo número es el resto de a dividido b
                                      -- este paso se repite hasta que b se haga 0

-- Ejercicio 6: Contar Dígitos
countDigits : Int -> Int              -- la función recibe un número entero y devuelve cuántos dígitos tiene
countDigits n =
    if n < 10 then                    -- caso base: si el número es menor a 10, tiene un solo dígito
        1
    else
        1 + countDigits (n // 10)     -- caso recursivo: saco el último dígito dividiendo por 10
                                      -- y sumo 1 al contador


-- Ejercicio 7: Suma de Dígitos
sumDigits : Int -> Int                -- la función recibe un número entero y devuelve la suma de sus dígitos
sumDigits n =
    if n < 10 then                    -- caso base: si el número es menor a 10, ya es un solo dígito
        n                             -- devolvemos ese mismo número
    else
        (modBy 10 n) + sumDigits (n // 10) -- caso recursivo: tomo el último dígito con (modBy 10 n)
                                           -- y lo sumo con la suma de los demás dígitos (n // 10)


-- Ejercicio 8: Verificar Palíndromo
isPalindrome : Int -> Bool                  -- recibe un entero y devuelve True o False
isPalindrome n =
    n == reverseNumber n                    -- comparamos el número con su inverso


-- Función principal para invertir un número
reverseNumber : Int -> Int
reverseNumber n =
    reverseHelper n 0                        -- arrancamos con el número original y acumulador en 0


-- Función auxiliar con acumulador
reverseHelper : Int -> Int -> Int
reverseHelper n acc =
    if n == 0 then                           -- caso base: cuando ya no quedan dígitos
        acc                                  -- devolvemos el acumulador (que es el número invertido)
    else
        reverseHelper (n // 10)              -- dividimos entre 10 para sacar el último dígito
                      (acc * 10 + modBy 10 n)
                                             -- agregamos ese último dígito al acumulador:
                                             -- acc * 10 corre los dígitos a la izquierda
                                             -- modBy 10 n nos da el último dígito


-- Ejercicio 9: Paréntesis Balanceados
isBalanced : String -> Bool
isBalanced str =
    -- TODO: Implementar verificador de paréntesis balanceados
    False


isBalancedHelper : List Char -> Int -> Bool
isBalancedHelper chars counter =
    -- TODO: Función auxiliar para verificar paréntesis balanceados
    False