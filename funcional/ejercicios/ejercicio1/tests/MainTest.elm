module MainTest exposing (..)

import Expect exposing (Expectation)
import Guia1
import Test exposing (..)


suite : Test
suite =
    describe "Main module - Comprehensive Test Suite"
        [ describe "Basic functions"
            [ describe "add function"
                [ test "adds two positive numbers" <|
                    \_ ->
                        Guia1.add 2 3
                            |> Expect.equal 5
                , test "adds negative and positive numbers" <|
                    \_ ->
                        Guia1.add (-5) 3
                            |> Expect.equal (-2)
                , test "adds zero" <|
                    \_ ->
                        Guia1.add 0 5
                            |> Expect.equal 5
                ]
            , describe "multiply function"
                [ test "multiplies two positive numbers" <|
                    \_ ->
                        Guia1.multiply 3 4
                            |> Expect.equal 12
                , test "multiplies by zero" <|
                    \_ ->
                        Guia1.multiply 5 0
                            |> Expect.equal 0
                , test "multiplies negative numbers" <|
                    \_ ->
                        Guia1.multiply (-2) 3
                            |> Expect.equal (-6)
                ]
            ]
        , describe "Ejercicio 1: Función Potencia"
            [ test "power of zero" <|
                \_ ->
                    Guia1.power 5 0
                        |> Expect.equal 1
            , test "power example from guide" <|
                \_ ->
                    Guia1.power 2 3
                        |> Expect.equal 8
            , test "another power example" <|
                \_ ->
                    Guia1.power 10 2
                        |> Expect.equal 100
            , test "power of one" <|
                \_ ->
                    Guia1.power 7 1
                        |> Expect.equal 7
            , test "negative base" <|
                \_ ->
                    Guia1.power (-2) 3
                        |> Expect.equal (-8)
            ]
        , describe "Ejercicio 2: Factorial"
            [ test "factorial of 0" <|
                \_ ->
                    Guia1.factorial 0
                        |> Expect.equal 1
            , test "factorial of 1" <|
                \_ ->
                    Guia1.factorial 1
                        |> Expect.equal 1
            , test "factorial of 5" <|
                \_ ->
                    Guia1.factorial 5
                        |> Expect.equal 120
            , test "factorial of 4" <|
                \_ ->
                    Guia1.factorial 4
                        |> Expect.equal 24
            , test "factorial of 6" <|
                \_ ->
                    Guia1.factorial 6
                        |> Expect.equal 720
            ]
        , describe "Ejercicio 3: Fibonacci"
            [ describe "Fibonacci Exponential"
                [ test "fibonacci of 0" <|
                    \_ ->
                        Guia1.fibonacciExponential 0
                            |> Expect.equal 0
                , test "fibonacci of 1" <|
                    \_ ->
                        Guia1.fibonacciExponential 1
                            |> Expect.equal 1
                , test "fibonacci of 10" <|
                    \_ ->
                        Guia1.fibonacciExponential 10
                            |> Expect.equal 55
                , test "fibonacci exponential of 50" <|
                    \_ ->
                        Guia1.fibonacciExponential 10
                            |> Expect.equal 55
                , test "fibonacci of 7" <|
                    \_ ->
                        Guia1.fibonacciExponential 7
                            |> Expect.equal 13
                ]
            , describe "Fibonacci Linear"
                [ test "fibonacci linear of 0" <|
                    \_ ->
                        Guia1.fibonacciLinear 0
                            |> Expect.equal 0
                , test "fibonacci linear of 1" <|
                    \_ ->
                        Guia1.fibonacciLinear 6
                            |> Expect.equal 8
                , test "fibonacci linear of 10" <|
                    \_ ->
                        Guia1.fibonacciLinear 10
                            |> Expect.equal 55
                , test "fibonacci linear of 15" <|
                    \_ ->
                        Guia1.fibonacciLinear 15
                            |> Expect.equal 610
                , test "fibonacci linear of 50" <|
                    \_ ->
                        Guia1.fibonacciLinear 50
                            |> Expect.equal 12586269025
                , test "both implementations match" <|
                    \_ ->
                        Guia1.fibonacciLinear 12
                            |> Expect.equal (Guia1.fibonacciExponential 12)
                ]
            , describe "Ejercicio 4: Triángulo de Pascal"
                [ test "corner case (0,0)" <|
                    \_ ->
                        Guia1.pascalTriangle 0 0
                            |> Expect.equal 1
                , test "edge cases" <|
                    \_ ->
                        Guia1.pascalTriangle 0 5
                            |> Expect.equal 1
                , test "example from guide (2,4)" <|
                    \_ ->
                        Guia1.pascalTriangle 2 4
                            |> Expect.equal 6
                , test "example from guide (1,3)" <|
                    \_ ->
                        Guia1.pascalTriangle 1 3
                            |> Expect.equal 3
                , test "middle value" <|
                    \_ ->
                        Guia1.pascalTriangle 3 5
                            |> Expect.equal 10
                ]
            , describe "Ejercicio 5: Máximo Común Divisor"
                [ test "gcd example from guide (48, 18)" <|
                    \_ ->
                        Guia1.gcd 48 18
                            |> Expect.equal 6
                , test "gcd of coprime numbers (17, 13)" <|
                    \_ ->
                        Guia1.gcd 17 13
                            |> Expect.equal 1
                , test "gcd example from guide (100, 25)" <|
                    \_ ->
                        Guia1.gcd 100 25
                            |> Expect.equal 25
                , test "gcd with zero" <|
                    \_ ->
                        Guia1.gcd 15 0
                            |> Expect.equal 15
                , test "gcd is commutative" <|
                    \_ ->
                        Guia1.gcd 24 18
                            |> Expect.equal (Guia1.gcd 18 24)
                , test "gcd with negative numbers" <|
                    \_ ->
                        Guia1.gcd -48 18
                            |> Expect.equal 6
                ]
            , describe "Ejercicio 6: Contar Dígitos"
                [ test "single digit" <|
                    \_ ->
                        Guia1.countDigits 7
                            |> Expect.equal 1
                , test "example from guide" <|
                    \_ ->
                        Guia1.countDigits 12345
                            |> Expect.equal 5
                , test "negative number" <|
                    \_ ->
                        Guia1.countDigits -456
                            |> Expect.equal 3
                , test "zero" <|
                    \_ ->
                        Guia1.countDigits 0
                            |> Expect.equal 1
                , test "large number" <|
                    \_ ->
                        Guia1.countDigits 999999
                            |> Expect.equal 6
                ]
            , describe "Ejercicio 7: Suma de Dígitos"
                [ test "example from guide (123)" <|
                    \_ ->
                        Guia1.sumDigits 123
                            |> Expect.equal 6
                , test "example from guide (999)" <|
                    \_ ->
                        Guia1.sumDigits 999
                            |> Expect.equal 27
                , test "negative number" <|
                    \_ ->
                        Guia1.sumDigits -456
                            |> Expect.equal 15
                , test "single digit" <|
                    \_ ->
                        Guia1.sumDigits 9
                            |> Expect.equal 9
                , test "zero" <|
                    \_ ->
                        Guia1.sumDigits 0
                            |> Expect.equal 0
                ]
            , describe "Ejercicio 8: Verificar Palíndromo"
                [ describe "reverseNumber function"
                    [ test "reverse single digit" <|
                        \_ ->
                            Guia1.reverseNumber 7
                                |> Expect.equal 7
                    , test "reverse multi digit" <|
                        \_ ->
                            Guia1.reverseNumber 123
                                |> Expect.equal 321
                    , test "reverse with zeros" <|
                        \_ ->
                            Guia1.reverseNumber 1200
                                |> Expect.equal 21
                    ]
                , describe "isPalindrome function"
                    [ test "single digit palindrome" <|
                        \_ ->
                            Guia1.isPalindrome 7
                                |> Expect.equal True
                    , test "multi digit palindrome" <|
                        \_ ->
                            Guia1.isPalindrome 12321
                                |> Expect.equal True
                    , test "not a palindrome" <|
                        \_ ->
                            Guia1.isPalindrome 12345
                                |> Expect.equal False
                    , test "even length palindrome" <|
                        \_ ->
                            Guia1.isPalindrome 1221
                                |> Expect.equal True
                    , test "negative palindrome" <|
                        \_ ->
                            Guia1.isPalindrome -121
                                |> Expect.equal False
                    ]
                ]

            , describe "Ejercicio 9: Paréntesis Balanceados"
                [ test "simple balanced" <|
                    \_ ->
                        Guia1.isBalanced "()"
                            |> Expect.equal True
                , test "nested balanced" <|
                    \_ ->
                        Guia1.isBalanced "((()))()"
                            |> Expect.equal True
                , test "mixed balanced" <|
                    \_ ->
                        Guia1.isBalanced "(()())"
                            |> Expect.equal True
                , test "unbalanced - missing opening" <|
                    \_ ->
                        Guia1.isBalanced "(()(())"
                            |> Expect.equal False
                , test "unbalanced - extra closing" <|
                    \_ ->
                        Guia1.isBalanced "(()(()))"
                            |> Expect.equal True
                , test "wrong order" <|
                    \_ ->
                        Guia1.isBalanced ")("
                            |> Expect.equal False
                , test "empty string" <|
                    \_ ->
                        Guia1.isBalanced ""
                            |> Expect.equal True
                , test "only opening" <|
                    \_ ->
                        Guia1.isBalanced "((("
                            |> Expect.equal False
                , test "only closing" <|
                    \_ ->
                        Guia1.isBalanced ")))"
                            |> Expect.equal False
                , test "with other characters" <|
                    \_ ->
                        Guia1.isBalanced "a(b)c"
                            |> Expect.equal True
                ]
        ]
    ]
    
