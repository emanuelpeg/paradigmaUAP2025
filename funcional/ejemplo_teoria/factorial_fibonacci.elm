import Html

factorial : Int -> Int
factorial n = if n == 0 then 1 else n * factorial (n - 1)

fibonacci : Int -> Int
fibonacci n = if n < 2 then 1 
  else fibonacci (n - 1) + fibonacci (n - 2) 
  
fibonacciAux : Int -> Int -> Int -> Int
fibonacciAux fa faa n = 
  if (n == 0) then fa 
  else fibonacciAux (fa + faa) fa (n - 1)

fibonacci2 : Int -> Int
fibonacci2 n = fibonacciAux 1 0 n

main =
  Html.text (String.fromInt (fibonacci2 5))
