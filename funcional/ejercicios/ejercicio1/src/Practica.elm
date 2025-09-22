module Practica exposing (..)
import Html

fibo : Int -> Int
fibo n = if n < 2 then 1 
    else fibo (n - 1) + fibo (n - 2)

main =
    Html.text (String.fromInt (fibo 50))