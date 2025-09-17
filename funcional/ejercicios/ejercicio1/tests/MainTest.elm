module MainTest exposing (..)

import Expect exposing (Expectation)
import Test exposing (..)
import Main


suite : Test
suite =
    describe "Main module - Comprehensive Test Suite"
        [ describe "Basic functions"
            [ describe "add function"
                [ test "adds two positive numbers" <|
                    \_ ->
                        Main.add 2 3
                            |> Expect.equal 5
                , test "adds negative and positive numbers" <|
                    \_ ->
                        Main.add (-5) 3
                            |> Expect.equal (-2)
                , test "adds zero" <|
                    \_ ->
                        Main.add 0 5
                            |> Expect.equal 5
                ]
            , describe "multiply function"
                [ test "multiplies two positive numbers" <|
                    \_ ->
                        Main.multiply 3 4
                            |> Expect.equal 12
                , test "multiplies by zero" <|
                    \_ ->
                        Main.multiply 5 0
                            |> Expect.equal 0
                , test "multiplies negative numbers" <|
                    \_ ->
                        Main.multiply (-2) 3
                            |> Expect.equal (-6)
                ]
            ]
        , describe "Ejercicio 1: Función Potencia"
            [ test "power of zero" <|
                \_ ->
                    Main.power 5 0
                        |> Expect.equal 1
            , test "power example from guide" <|
                \_ ->
                    Main.power 2 3
                        |> Expect.equal 8
            , test "another power example" <|
                \_ ->
                    Main.power 10 2
                        |> Expect.equal 100
            , test "power of one" <|
                \_ ->
                    Main.power 7 1
                        |> Expect.equal 7
            , test "negative base" <|
                \_ ->
                    Main.power (-2) 3
                        |> Expect.equal (-8)
            ]
        , describe "Ejercicio 2: Factorial"
            [ test "factorial of 0" <|
                \_ ->
                    Main.factorial 0
                        |> Expect.equal 1
            , test "factorial of 1" <|
                \_ ->
                    Main.factorial 1
                        |> Expect.equal 1
            , test "factorial of 5" <|
                \_ ->
                    Main.factorial 5
                        |> Expect.equal 120
            , test "factorial of 4" <|
                \_ ->
                    Main.factorial 4
                        |> Expect.equal 24
            , test "factorial of 6" <|
                \_ ->
                    Main.factorial 6
                        |> Expect.equal 720
            ]
        , describe "Ejercicio 3: Fibonacci"
            [ describe "Fibonacci Exponential"
                [ test "fibonacci of 0" <|
                    \_ ->
                        Main.fibonacciExponential 0
                            |> Expect.equal 0
                , test "fibonacci of 1" <|
                    \_ ->
                        Main.fibonacciExponential 1
                            |> Expect.equal 1
                , test "fibonacci of 10" <|
                    \_ ->
                        Main.fibonacciExponential 10
                            |> Expect.equal 55
                , test "fibonacci of 7" <|
                    \_ ->
                        Main.fibonacciExponential 7
                            |> Expect.equal 13
                ]
            , describe "Fibonacci Linear"
                [ test "fibonacci linear of 0" <|
                    \_ ->
                        Main.fibonacciLinear 0
                            |> Expect.equal 0
                , test "fibonacci linear of 1" <|
                    \_ ->
                        Main.fibonacciLinear 1
                            |> Expect.equal 1
                , test "fibonacci linear of 10" <|
                    \_ ->
                        Main.fibonacciLinear 10
                            |> Expect.equal 55
                , test "fibonacci linear of 15" <|
                    \_ ->
                        Main.fibonacciLinear 15
                            |> Expect.equal 610
                , test "both implementations match" <|
                    \_ ->
                        Main.fibonacciLinear 12
                            |> Expect.equal (Main.fibonacciExponential 12)
                ]
            ]
        , describe "Ejercicio 4: Triángulo de Pascal"
            [ test "corner case (0,0)" <|
                \_ ->
                    Main.pascalTriangle 0 0
                        |> Expect.equal 1
            , test "edge cases" <|
                \_ ->
                    Main.pascalTriangle 0 5
                        |> Expect.equal 1
            , test "example from guide (2,4)" <|
                \_ ->
                    Main.pascalTriangle 2 4
                        |> Expect.equal 6
            , test "example from guide (1,3)" <|
                \_ ->
                    Main.pascalTriangle 1 3
                        |> Expect.equal 3
            , test "middle value" <|
                \_ ->
                    Main.pascalTriangle 3 5
                        |> Expect.equal 10
            ]
        , describe "Ejercicio 5: Máximo Común Divisor"
            [ test "gcd example from guide (48, 18)" <|
                \_ ->
                    Main.gcd 48 18
                        |> Expect.equal 6
            , test "gcd of coprime numbers (17, 13)" <|
                \_ ->
                    Main.gcd 17 13
                        |> Expect.equal 1
            , test "gcd example from guide (100, 25)" <|
                \_ ->
                    Main.gcd 100 25
                        |> Expect.equal 25
            , test "gcd with zero" <|
                \_ ->
                    Main.gcd 15 0
                        |> Expect.equal 15
            , test "gcd is commutative" <|
                \_ ->
                    Main.gcd 24 18
                        |> Expect.equal (Main.gcd 18 24)
            , test "gcd with negative numbers" <|
                \_ ->
                    Main.gcd (-48) 18
                        |> Expect.equal 6
            ]
        , describe "Ejercicio 6: Contar Dígitos"
            [ test "single digit" <|
                \_ ->
                    Main.countDigits 7
                        |> Expect.equal 1
            , test "example from guide" <|
                \_ ->
                    Main.countDigits 12345
                        |> Expect.equal 5
            , test "negative number" <|
                \_ ->
                    Main.countDigits (-456)
                        |> Expect.equal 3
            , test "zero" <|
                \_ ->
                    Main.countDigits 0
                        |> Expect.equal 1
            , test "large number" <|
                \_ ->
                    Main.countDigits 999999
                        |> Expect.equal 6
            ]
        , describe "Ejercicio 7: Suma de Dígitos"
            [ test "example from guide (123)" <|
                \_ ->
                    Main.sumDigits 123
                        |> Expect.equal 6
            , test "example from guide (999)" <|
                \_ ->
                    Main.sumDigits 999
                        |> Expect.equal 27
            , test "negative number" <|
                \_ ->
                    Main.sumDigits (-456)
                        |> Expect.equal 15
            , test "single digit" <|
                \_ ->
                    Main.sumDigits 9
                        |> Expect.equal 9
            , test "zero" <|
                \_ ->
                    Main.sumDigits 0
                        |> Expect.equal 0
            ]
        , describe "Ejercicio 8: Verificar Palíndromo"
            [ describe "reverseNumber function"
                [ test "reverse single digit" <|
                    \_ ->
                        Main.reverseNumber 7
                            |> Expect.equal 7
                , test "reverse multi digit" <|
                    \_ ->
                        Main.reverseNumber 123
                            |> Expect.equal 321
                , test "reverse with zeros" <|
                    \_ ->
                        Main.reverseNumber 1200
                            |> Expect.equal 21
                ]
            , describe "isPalindrome function"
                [ test "single digit palindrome" <|
                    \_ ->
                        Main.isPalindrome 7
                            |> Expect.equal True
                , test "multi digit palindrome" <|
                    \_ ->
                        Main.isPalindrome 12321
                            |> Expect.equal True
                , test "not a palindrome" <|
                    \_ ->
                        Main.isPalindrome 12345
                            |> Expect.equal False
                , test "even length palindrome" <|
                    \_ ->
                        Main.isPalindrome 1221
                            |> Expect.equal True
                , test "negative palindrome" <|
                    \_ ->
                        Main.isPalindrome (-121)
                            |> Expect.equal False
                ]
            ]
        , describe "Ejercicio 9: Paréntesis Balanceados"
            [ test "simple balanced" <|
                \_ ->
                    Main.isBalanced "()"
                        |> Expect.equal True
            , test "nested balanced" <|
                \_ ->
                    Main.isBalanced "((()))()"
                        |> Expect.equal True
            , test "mixed balanced" <|
                \_ ->
                    Main.isBalanced "(()())"
                        |> Expect.equal True
            , test "unbalanced - missing opening" <|
                \_ ->
                    Main.isBalanced "(()(())"
                        |> Expect.equal False
            , test "unbalanced - extra closing" <|
                \_ ->
                    Main.isBalanced "(()(()))"
                        |> Expect.equal True
            , test "wrong order" <|
                \_ ->
                    Main.isBalanced ")("
                        |> Expect.equal False
            , test "empty string" <|
                \_ ->
                    Main.isBalanced ""
                        |> Expect.equal True
            , test "only opening" <|
                \_ ->
                    Main.isBalanced "((("
                        |> Expect.equal False
            , test "only closing" <|
                \_ ->
                    Main.isBalanced ")))"
                        |> Expect.equal False
            , test "with other characters" <|
                \_ ->
                    Main.isBalanced "a(b)c"
                        |> Expect.equal True
            ]
        ]