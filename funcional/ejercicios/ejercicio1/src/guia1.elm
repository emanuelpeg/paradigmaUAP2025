module Guia1 exposing (..)

--Sumar y Multiplicar Basicos
add : Int -> Int -> Int
add a b =
    if b == 0 then
        a
    else
        add (a+1) (b-1)

multiply :  Int -> Int -> Int
multiply a b =
    if b == 0 then
        0
    else if b == 1 then -- Este caso base ahorra 1 paso de compilado.
        a
    else
        a + multiply a (b - 1)


-- Funcion Potencia 1
power : Int -> Int -> Int
power a b =
    if b == 0 then
        1

    else
        a * power a (b - 1)

--Factorial 2
factorial : Int -> Int
factorial a = 
    if a <= 1 then
        1
    else
        a * factorial (a - 1)

--Fibbonachi 3 (Exponencial y Lineal)
fibonacciExponential : Int -> Int
fibonacciExponential a =
    if a <= 1 then
        a
    else
        fibonacciExponential(a-1) + fibonacciExponential(a-2)

fibonacciLinear : Int -> Int
fibonacciLinear a =
    fHelper a 0 1

fHelper : Int -> Int -> Int -> Int
fHelper a acu1 acu2 =
    if a == 0 then
        acu1
    else if a == 1 then
        acu2
    else
        fHelper (a-1) acu2 (acu1 + acu2)

-- Pascal 4

pascalTriangle : Int -> Int -> Int
pascalTriangle x y =
    if x == 0 || y == x then
        1
    else
        pascalTriangle (x-1) (y-1) + pascalTriangle x (y-1)

-- Maximo Comun Divisor 5
gcd : Int -> Int -> Int
gcd a b =
    if b == 0 then
    a
    else
    gcd b (modBy b a)

--  Contar Digitos 6
countDigits : Int -> Int
countDigits a =
    if abs a < 10 then
        1

    else
        1 + countDigits (abs a // 10)

-- Suma de Digitos 7
sumDigits : Int -> Int
sumDigits a =
    if a < 0 then
        sumDigits (-1 * a)

    else if a < 10 then
        a

    else
        modBy 10 a + sumDigits (a // 10)

-- Verificar Palindromo 8
isPalindrome : Int -> Bool
isPalindrome n =
    n >= 0 && n == reverseNumber n


reverseNumber : Int -> Int
reverseNumber n =
    reverseHelper n 0


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

-- Balance Parentesis 9
isBalanced : String -> Bool
isBalanced str =
    let
        balanceHelper : String -> Int -> Bool
        balanceHelper remaining count =
            if count < 0 then
                False

            else if String.isEmpty remaining then
                count == 0

            else
                let
                    char = String.left 1 remaining
                    rest = String.dropLeft 1 remaining
                in
                if char == "(" then
                    balanceHelper rest (count + 1)

                else if char == ")" then
                    balanceHelper rest (count - 1)

                else
                    balanceHelper rest count
    in
    balanceHelper str 0