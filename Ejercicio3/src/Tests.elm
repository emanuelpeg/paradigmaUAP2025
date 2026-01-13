module Tests exposing (runAll)

import RecursionExercises exposing (..)

boolToString : Bool -> String
boolToString b =
    if b then "True" else "False"

runAll : List String
runAll =
    [ "power 2 3 = " ++ String.fromInt (power 2 3)
    , "power 10 2 = " ++ String.fromInt (power 10 2)
    , "factorial 5 = " ++ String.fromInt (factorial 5)
    , "factorial 0 = " ++ String.fromInt (factorial 0)
    , "fibonacciLinear 10 = " ++ String.fromInt (fibonacciLinear 10)
    , "fibonacciExponential 10 = " ++ String.fromInt (fibonacciExponential 10)
    , "pascalTriangle 2 4 = " ++ String.fromInt (pascalTriangle 2 4)
    , "pascalTriangle 1 3 = " ++ String.fromInt (pascalTriangle 1 3)
    , "gcd 48 18 = " ++ String.fromInt (gcd 48 18)
    , "gcd 100 25 = " ++ String.fromInt (gcd 100 25)
    , "countDigits -456 = " ++ String.fromInt (countDigits -456)
    , "sumDigits 999 = " ++ String.fromInt (sumDigits 999)
    , "reverseNumber 12345 = " ++ String.fromInt (reverseNumber 12345)
    , "isPalindrome 12321 = " ++ boolToString (isPalindrome 12321)
    , "isPalindrome 12345 = " ++ boolToString (isPalindrome 12345)
    , "isBalanced \"((()))()\" = " ++ boolToString (isBalanced "((()))()")
    , "isBalanced \"(()(())\" = " ++ boolToString (isBalanced "(()(())")
    , "isBalanced \")(\" = " ++ boolToString (isBalanced ")(")
    ]
