module RecursionExercises exposing
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

import String


-- Ejercicio 1: Potencia (a^b) 

power : Int -> Int -> Int
power a b =
    if b < 0 then
        0
    else if b == 0 then
        1
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
    if n < 0 then
        0
    else
        case n of
            0 ->
                0

            1 ->
                1

            _ ->
                fibonacciExponential (n - 1) + fibonacciExponential (n - 2)


-- Versión lineal (con acumuladores)
fibonacciLinear : Int -> Int
fibonacciLinear n =
    if n < 0 then
        0
    else
        fibHelp n 0 1


fibHelp : Int -> Int -> Int -> Int
fibHelp n a b =
    if n == 0 then
        a
    else
        fibHelp (n - 1) b (a + b)


-- Ejercicio 4: Triángulo de Pascal 
-- pascalTriangle x y = C(y, x) para 0 <= x <= y

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
        aa = abs a
        bb = abs b
    in
    if bb == 0 then
        aa
    else
        gcd bb (modBy bb aa)


-- Ejercicio 6: Contar Dígitos

countDigits : Int -> Int
countDigits n =
    let
        m = abs n
    in
    if m == 0 then
        1
    else
        countDigitsPos m


countDigitsPos : Int -> Int
countDigitsPos m =
    if m < 10 then
        1
    else
        1 + countDigitsPos (m // 10)


-- Ejercicio 7: Suma de Dígitos 

sumDigits : Int -> Int
sumDigits n =
    let
        m = abs n
    in
    if m == 0 then
        0
    else
        (modBy 10 m) + sumDigits (m // 10)


-- Ejercicio 8: Palíndromo 

reverseNumber : Int -> Int
reverseNumber n =
    let
        sign =
            if n < 0 then
                -1
            else
                1
    in
    sign * reversePositive (abs n) 0


reversePositive : Int -> Int -> Int
reversePositive remaining acc =
    if remaining == 0 then
        acc
    else
        let
            last = modBy 10 remaining
        in
        reversePositive (remaining // 10) (acc * 10 + last)


isPalindrome : Int -> Bool
isPalindrome n =
    let
        m = abs n
    in
    m == reverseNumber m


-- Ejercicio 9: Paréntesis Balanceados 

isBalanced : String -> Bool
isBalanced s =
    balanceHelp s 0


balanceHelp : String -> Int -> Bool
balanceHelp s count =
    if count < 0 then
        False
    else
        case String.uncons s of
            Nothing ->
                count == 0

            Just ( ch, rest ) ->
                if ch == '(' then
                    balanceHelp rest (count + 1)

                else if ch == ')' then
                    balanceHelp rest (count - 1)

                else
                    balanceHelp rest count
