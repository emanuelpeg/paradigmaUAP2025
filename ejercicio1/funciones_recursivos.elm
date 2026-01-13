-- Ejercicio N° 1: Potencia
power : Int -> Int -> Int
power base exp =
    if exp < 0 then
        0 -- no soportamos potencias negativas en enteros
    else if exp == 0 then
        1
    else
        base * power base (exp - 1)


-- Ejercicio N° 2: Factorial
factorial : Int -> Int
factorial n =
    if n < 0 then
        0 -- no existe factorial para negativos
    else if n == 0 then
        1
    else
        n * factorial (n - 1)


-- Ejercicio N° 3a (versión exponencial): Fibonacci 
fibonacciExponential : Int -> Int
fibonacciExponential n =
    if n <= 0 then
        0
    else if n == 1 then
        1
    else
        fibonacciExponential (n - 1) + fibonacciExponential (n - 2)


-- Ejercicio N° 3b (versión lineal): Fibonacci 
fibonacciLinear : Int -> Int
fibonacciLinear n =
    let
        helper k a b =
            if k == 0 then
                a
            else
                helper (k - 1) b (a + b)
    in
    if n < 0 then
        0
    else
        helper n 0 1


-- Ejercicio N° 4: Triángulo de Pascal
pascalTriangle : Int -> Int -> Int
pascalTriangle x y =
    if x == 0 || x == y then
        1
    else
        pascalTriangle (x - 1) (y - 1) + pascalTriangle x (y - 1)


-- Ejercicio N° 5: Máximo Común Divisor
gcd : Int -> Int -> Int
gcd a b =
    if b == 0 then
        abs a
    else
        gcd b (a % b)


-- Ejercicio N° 6: Contar Dígitos
countDigits : Int -> Int
countDigits n =
    let
        m = abs n
    in
    if m < 10 then
        1
    else
        1 + countDigits (m // 10)


-- Ejercicio N° 7: Suma de Dígitos
sumDigits : Int -> Int
sumDigits n =
    let
        m = abs n
    in
    if m < 10 then
        m
    else
        (m % 10) + sumDigits (m // 10)


-- Ejercicio N° 8a: Invertir número
reverseNumber : Int -> Int
reverseNumber n =
    let
        helper m acc =
            if m == 0 then
                acc
            else
                helper (m // 10) (acc * 10 + (m % 10))
    in
    helper (abs n) 0


-- Ejercicio N° 8b: Verificar Palíndromo
isPalindrome : Int -> Bool
isPalindrome n =
    abs n == reverseNumber n


-- Ejercicio N° 9: Paréntesis Balanceados
isBalanced : String -> Bool
isBalanced str =
    let
        helper chars balance =
            case chars of
                [] ->
                    balance == 0

                c :: rest ->
                    if c == '(' then
                        helper rest (balance + 1)

                    else if c == ')' then
                        if balance == 0 then
                            False
                        else
                            helper rest (balance - 1)

                    else
                        helper rest balance
    in
    helper (String.toList str) 0