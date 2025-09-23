module Recursion exposing
    ( power
    , factorial
    , fibonacciExponential
    , fibonacciLinear
    , pascalTriangle
    , gcd
    , countDigits
    , sumDigits
    , reverseNumber
    , isPalindrome
    , isBalanced
    )

{-| Ejercicios de recursión en Elm (solo funciones puras y recursión).

Notas:
- `power a b` y `factorial n` para valores negativos devuelven 0 por convención simple.
- `pascalTriangle x y` usa índices 0-based y retorna 0 si está fuera del triángulo.
- `fibonacciLinear` y `reverseNumber` usan acumuladores (tail recursion).
- Números negativos no se consideran palíndromos.
- `isBalanced` ignora caracteres que no sean paréntesis.
-}


-- Ejercicio 1: Potencia

power : Int -> Int -> Int
power a b =
    if b == 0 then
        1
    else if b < 0 then
        0
    else
        a * power a (b - 1)



-- Ejercicio 2: Factorial

factorial : Int -> Int
factorial n =
    if n < 0 then
        0
    else if n == 0 || n == 1 then
        1
    else
        n * factorial (n - 1)



-- Ejercicio 3: Fibonacci

-- Versión exponencial (ingenua)
fibonacciExponential : Int -> Int
fibonacciExponential n =
    if n <= 0 then
        0
    else if n == 1 then
        1
    else
        fibonacciExponential (n - 1) + fibonacciExponential (n - 2)


-- Versión lineal (con acumuladores)
fibonacciLinear : Int -> Int
fibonacciLinear n =
    if n <= 0 then
        0
    else
        fibAcc n 0 1


fibAcc : Int -> Int -> Int -> Int
fibAcc n a b =
    -- a = F(k), b = F(k+1)
    if n == 0 then
        a
    else
        fibAcc (n - 1) b (a + b)



-- Ejercicio 4: Triángulo de Pascal (x columna, y fila; 0-based)

pascalTriangle : Int -> Int -> Int
pascalTriangle x y =
    if x < 0 || y < 0 || x > y then
        0
    else if x == 0 || x == y then
        1
    else
        pascalTriangle (x - 1) (y - 1) + pascalTriangle x (y - 1)



-- Ejercicio 5: Máximo Común Divisor (Euclides)

gcd : Int -> Int -> Int
gcd a b =
    let
        aa = Basics.abs a
        bb = Basics.abs b
    in
    if bb == 0 then
        aa
    else
        gcd bb (Basics.modBy bb aa)



-- Ejercicio 6: Contar dígitos

countDigits : Int -> Int
countDigits n =
    let
        x = Basics.abs n
    in
    if x == 0 then
        1
    else
        countDigitsHelp x


countDigitsHelp : Int -> Int
countDigitsHelp x =
    if x < 10 then
        1
    else
        1 + countDigitsHelp (x // 10)



-- Ejercicio 7: Suma de dígitos

sumDigits : Int -> Int
sumDigits n =
    let
        x = Basics.abs n
    in
    if x == 0 then
        0
    else
        Basics.modBy 10 x + sumDigits (x // 10)



-- Ejercicio 8: Palíndromo (vía invertir el número)

reverseNumber : Int -> Int
reverseNumber n =
    let
        sign =
            if n < 0 then
                -1
            else
                1

        x = Basics.abs n
    in
    sign * reverseAcc x 0


reverseAcc : Int -> Int -> Int
reverseAcc x acc =
    if x == 0 then
        acc
    else
        reverseAcc (x // 10) (acc * 10 + Basics.modBy 10 x)


isPalindrome : Int -> Bool
isPalindrome n =
    if n < 0 then
        False
    else
        n == reverseNumber n



-- Ejercicio 9: Paréntesis balanceados

isBalanced : String -> Bool
isBalanced s =
    balanceAcc s 0


balanceAcc : String -> Int -> Bool
balanceAcc s count =
    if count < 0 then
        False
    else
        case String.uncons s of
            Nothing ->
                count == 0

            Just ( ch, rest ) ->
                if ch == '(' then
                    balanceAcc rest (count + 1)
                else if ch == ')' then
                    balanceAcc rest (count - 1)
                else
                    balanceAcc rest count
