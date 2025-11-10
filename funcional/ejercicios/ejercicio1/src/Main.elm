module Main exposing (..)

import Html exposing (Html, a, text)


main : Html msg
main =
    text "Hello, Elm!"


add : Int -> Int -> Int
add a b =
    if b == 0 then
        a

    else
        add (a + 1) (b - 1)
--lógica del else:
{-
add 2 3
add 3 2
add 4 1
add 5 0  ← b llegó a 0, frenamos
-}


multiply : Int -> Int -> Int
multiply a b =
    if b == 0 then
        0

    else if b == 1 then
        a

    else
        a + multiply a (b - 1)
--lógica del Elm:
{-
3 + multiply 3 3
      3 + multiply 3 2
            3 + multiply 3 1
                  3  (porque b == 1)

3 + 3 + 3 + 3 = 12

-}

multiply2 : Int -> Int -> Int -> Int
multiply2 a b acc =
    if b == 0 then
        acc

    else
        multiply2 a (b - 1) (acc + a)--b sería las veces q voy a sumar eso al acumulador, entonces cada vez es una vez menos



-- Ejercicio 1: Función Potencia


power : Int -> Int -> Int
power a b =
    if b == 0 then
        1 --caso base

    else
        a * power a (b - 1)
--2^3 = 2*2*2 , pero le vas restando b hasta llegar al caso base, xq son las veces q ya multiplicastes


-- Ejercicio 2: Factorial


factorial : Int -> Int
factorial n =
    if n <= 1 then
        1 --el caso base es que llege a 1

    else
        n * factorial (n - 1)--aca no es q n va cambiando, sino que llamamos a la función con un n mas chiquito

--Recursión: Recursividad:
--“No lo quiero resolver yo, que lo resuelva mi versión del futuro (pero con un número más chico), y yo después uso el resultado”

{-
La función se llama a sí misma, pero no es que termina y después se vuelve a llamar sola, sino:

1- Llega al else
2- Se vuelve a llamar ahí mismo, ANTES de terminar
3- Esa nueva llamada hace lo mismo…
4- Hasta que alguna llega al caso base
5- Recién ahí empieza a desarmarse todo y devolver resultados
-}
-- Ejercicio 3: Fibonacci


--la fibonacciExponencial exponencial es la manera más lenta que hay
fibonacciExponential : Int -> Int
fibonacciExponential n =
    if n <= 1 then
        n

    else
        fibonacciExponential (n - 1) + fibonacciExponential (n - 2)
--explicación del else, fijate cuanto vale el anterior y el anterior

-- la fibonacciLinear y FibonacciHelper es como la versión good!
fibonacciLinear : Int -> Int
fibonacciLinear n =
    fibonacciHelper n 0 1


fibonacciHelper : Int -> Int -> Int -> Int
fibonacciHelper n acc1 acc2 =
    if n == 0 then
        acc1 --n° de la izq

    else if n == 1 then -- esta es la condición que se tiene que llegar al final
        acc2 --n° de la der

    else
        fibonacciHelper (n - 1) acc2 (acc1 + acc2)
--aclaración: n es el puesto de secuencia que quiero calcular:
{-
Posición (n):  0 1 2 3 4 5 6 7
Fibonacci:    0 1 1 2 3 5 8 13

-}


-- Ejercicio 4: Triángulo de Pascal


pascalTriangle : Int -> Int -> Int
pascalTriangle x y =
    if x == 0 || x == y then
        1

    else
        pascalTriangle (x - 1) (y - 1) + pascalTriangle x (y - 1)
--          mira el n° de la izq        + mira el n° de arriba tamb pero a la derecha y sumalos


-- Ejercicio 5: Máximo Común Divisor (MCD)


gcd : Int -> Int -> Int
gcd a b =
    if b == 0 then
        abs a

    else
        gcd b (modBy b a) -- rota los numeros y mete el resto
-- esto por la relación de parámetro:
--gcd a b =
{-
MCD de 48 y 18
48 ÷ 18 = resto 12
18 ÷ 12 = resto 6
12 ÷ 6  = resto 0  -> frena
GANADOR: 6
-}

-- Ejercicio 6: Contar Dígitos


countDigits : Int -> Int
countDigits n =
    if n < 0 then
        countDigits (-1 * n) -- si es negativo lo volves positivo 

    else if n < 10 then
        1 -- si es del 0 al 9 es que tiene un solo digito

    else
        1 + countDigits (n // 10) --tomamos como ejemplo el 472
        {-
472 >= 10 → 1 + countDigits(47)
47  >= 10 → 1 + countDigits(4)
4   < 10  → 1 (se frena acá)
1 + 1 + 1 = 3
        -}



-- Ejercicio 7: Suma de Dígitos
--438 → 4 + 3 + 8 = 15

sumDigits : Int -> Int
sumDigits n =
    if n < 0 then
        sumDigits (-1 * n) --si es negativo lo hacemos positivo

    else if n < 10 then
        n -- si es del 0 al 9 nomás devolves ese número

    else
        modBy 10 n + sumDigits (n // 10)

--ejemplo: sumDigits 582
{-
582 >= 10 → 2 + sumDigits(58)
58  >= 10 → 8 + sumDigits(5)
5   < 10  → 5 (freno)

-}

-- Ejercicio 8: Verificar Palíndromo
--polindromo: Es algo que se lee igual al derecho y al revés
--ej: 121, 1331

--3
isPalindrome : Int -> Bool
isPalindrome n =
    n >= 0 && n == reverseNumber n

--2
reverseNumber : Int -> Int
reverseNumber n =
    reverseHelper n 0

--1
reverseHelper : Int -> Int -> Int
reverseHelper n acc =
    if n < 10 then
        acc * 10 + n

    else
        let
            digit =
                modBy 10 n
        in
        reverseHelper (n // 10) (acc * 10 + digit)
