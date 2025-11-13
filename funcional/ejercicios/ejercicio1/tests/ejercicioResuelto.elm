module ejercicioResuelto exposing (..)module EjerciciosRecursivos exposing (..)

{-| 
  Guía de Ejercicios - Funciones Recursivas en Elm
  Todas las funciones son puras y usan recursión.
-}


-- EJERCICIO 1: Potencia
power : Int -> Int -> Int
power basePotencia exponente =
    if exponente == 0 then
        1
    else
        basePotencia * power basePotencia (exponente - 1)



-- EJERCICIO 2: Factorial
factorial : Int -> Int
factorial numeroFactorial =
    if numeroFactorial <= 1 then
        1
    else
        numeroFactorial * factorial (numeroFactorial - 1)



-- EJERCICIO 3: Fibonacci (Exponencial)
fibonacciExponential : Int -> Int
fibonacciExponential indiceFibo =
    if indiceFibo <= 0 then
        0
    else if indiceFibo == 1 then
        1
    else
        fibonacciExponential (indiceFibo - 1) + fibonacciExponential (indiceFibo - 2)


-- EJERCICIO 3: Fibonacci (Lineal con acumuladores)
fibonacciLinear : Int -> Int
fibonacciLinear indiceFibo =
    let
        auxiliar n acumulador1 acumulador2 =
            if n == 0 then
                acumulador1
            else
                auxiliar (n - 1) acumulador2 (acumulador1 + acumulador2)
    in
    auxiliar indiceFibo 0 1



-- EJERCICIO 4: Triángulo de Pascal
pascalTriangle : Int -> Int -> Int
pascalTriangle columna fila =
    if columna == 0 || columna == fila then
        1
    else
        pascalTriangle (columna - 1) (fila - 1) + pascalTriangle columna (fila - 1)



-- EJERCICIO 5: Máximo Común Divisor (Euclides)
gcd : Int -> Int -> Int
gcd numeroA numeroB =
    if numeroB == 0 then
        abs numeroA
    else
        gcd numeroB (numeroA % numeroB)



-- EJERCICIO 6: Contar Dígitos
countDigits : Int -> Int
countDigits numero =
    let
        valor = abs numero
    in
    if valor < 10 then
        1
    else
        1 + countDigits (valor // 10)



-- EJERCICIO 7: Suma de Dígitos
sumDigits : Int -> Int
sumDigits numero =
    let
        valor = abs numero
    in
    if valor < 10 then
        valor
    else
        (valor % 10) + sumDigits (valor // 10)



-- EJERCICIO 8: Número Palíndromo
reverseNumber : Int -> Int
reverseNumber numero =
    let
        auxiliar resto acumulador =
            if resto == 0 then
                acumulador
            else
                auxiliar (resto // 10) (acumulador * 10 + (resto % 10))
    in
    auxiliar (abs numero) 0


isPalindrome : Int -> Bool
isPalindrome numero =
    abs numero == reverseNumber numero



-- EJERCICIO 9: Paréntesis Balanceados
isBalanced : String -> Bool
isBalanced texto =
    let
        recorrer listaCaracteres contador =
            case listaCaracteres of
                [] ->
                    contador == 0

                caracter :: resto ->
                    if caracter == '(' then
                        recorrer resto (contador + 1)

                    else if caracter == ')' then
                        if contador == 0 then
                            False
                        else
                            recorrer resto (contador - 1)

                    else
                        recorrer resto contador
    in
    recorrer (String.toList texto) 0
