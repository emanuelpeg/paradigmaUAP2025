-- Ejercicio 1: Función potencia
power : Int -> Int -> Int
power a b =
    if b == 0 then 
        1
    else
        a*power a (b-1)
--Ejercicio 2: Función factorial
factorial : Int -> Int
factorial n =
    if n == 0 then 
        1
    else
        n*factorial (n-1)
--Ejercicio 3: Funcion fibonacci
fibonacci : Int -> Int
fibonacci f =
    if f <= 1 then
        1
    else
        fibonacci(f-1)+fibonacci(f-2)

fibonacciLinear : Int -> Int
fibonacciLinear n =
    let
        aux n a b =
            case n of
                0 -> a
                _ -> aux (n - 1) b (a + b)
    in
    aux n 0 1
--Ejercicio 4: Triángulo de Pascal
pascalTriangle : Int -> Int -> Int
pascalTriangle x y =
    if x == 0 || x == y then
        1
    else
        pascalTriangle (x - 1) (y - 1) + pascalTriangle x (y - 1)
--Ejercicio 5: Máximo Común Divisor (MCD)
gcd : Int -> Int -> Int
gcd a b =
    if b == 0 then
        abs a
    else
        gcd b (modBy b a)
--Ejercicio 6: Función que calcula el n-ésimo número triangular
countDigits : Int -> Int
countDigits n =
    let
        num = abs n
    in
    if num < 10 then
        1
    else
        1 + countDigits (num // 10)
--Ejercicio 7: Función que cuenta el número de dígitos de un número entero
sumDigits : Int -> Int
sumDigits n =
    let
        num = abs n
    in
    if num < 10 then
        num
    else
        (modBy 10 num) + sumDigits (num // 10)
--Ejercicio 8: Función que calcula la suma de los dígitos de un número entero
reverseNumber : Int -> Int
reverseNumber n =
    let
        aux num rev =
            if num == 0 then
                rev
            else
                aux (num // 10) (rev * 10 + (modBy 10 num))
    in
    aux (abs n) 0

isPalindrome : Int -> Bool
isPalindrome n =
    let
        num = abs n
    in
    num == reverseNumber num
-