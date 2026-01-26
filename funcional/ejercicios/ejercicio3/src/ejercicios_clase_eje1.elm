module ejercicios_clase_eje1 exposing (..)


import Html

listaPrueba = [1,2,3,4,5]

cantidad: List a -> Int
cantidad lista = 
  case lista of
    [] -> 0
    head::tail ->
      1 + cantidad (tail)


sumatoria: List Int -> Int
sumatoria lista =
  case lista of
    [] -> 0
    head::tail ->
      head + sumatoria tail
      
index: List Int -> Int -> Maybe Int
index lista indice =
  case lista of 
    [] -> Nothing
    head::tail ->
      if indice == 0 then Just head
      else
        index tail (indice - 1)
        
remove: List Int -> List Int -> Int -> List Int
remove lista newList indice =
  case lista of
    [] -> lista
    head::tail ->
      if indice == 0 then
        newList ++ tail
      else
        remove tail (newList++[head]) (indice - 1)
        
existe: List Int -> Int -> Bool
existe lista numero = 
  case lista of 
    [] -> False
    head::tail ->
      if head == numero then
        True
      else existe tail numero
      
media: List Int -> Float
media lista =
  let
    suma = sumatoria lista
    length = cantidad lista
  in
    toFloat suma / toFloat length
      

agregar: List Int -> Int -> Int -> List Int -> List Int
agregar lista indice numero nuevaLista = 
  case lista of 
    [] -> nuevaLista ++ [numero]
    head::tail ->
      if indice == 0 then
        -- if tail == []
        (nuevaLista ++ [numero, head] ++ tail)
      else
        agregar tail (indice - 1) numero (nuevaLista ++ [head])
      
agregarEnLugar: List Int -> Int -> List Int -> List Int
agregarEnLugar lista numero nuevaLista = 
  case lista of 
    [] -> nuevaLista++[numero]
    head::tail ->
      if numero > head then
        agregarEnLugar tail numero (nuevaLista++[head])
      else
        nuevaLista++[numero, head]++tail

sumatoria: List Int -> Int
sumatoria lista =
  case lista of
    [] -> 0
    head::tail ->
      head + sumatoria tail
      
power: Int -> Int -> Int
power numero p =
  if p == 0 then 1
  else
    numero * power (numero) (p - 1)

sumaPotencias: Int -> Int
sumaPotencias numero =
  sumatoria [numero, power numero 2, power numero 3]
    
    
    
eliminarCadaElemento: List Int -> Int -> List Int -> List Int
eliminarCadaElemento lista numeroEliminar nuevaLista =
  case lista of
    [] -> nuevaLista
    head::tail ->
      if head == numeroEliminar then
        eliminarCadaElemento tail numeroEliminar nuevaLista
      else
        eliminarCadaElemento tail numeroEliminar (nuevaLista ++ [head])

reemplazar: List Int -> Int -> Int -> List Int -> List Int
reemplazar lista numeroEliminar numeroCambio nuevaLista =
  case lista of
    [] -> nuevaLista
    head::tail ->
      if head == numeroEliminar then
        reemplazar tail numeroEliminar numeroCambio (nuevaLista ++ [numeroCambio])
      else
        reemplazar tail numeroEliminar numeroCambio (nuevaLista ++ [head])
     
maximo: List Int -> Int
maximo lista =
  case lista of
    [] -> 0
    head::tail ->
      if head > maximo tail then head
      else maximo tail
      
minimo: List Int -> Int
minimo lista =
  case lista of
    [] -> 0
    head::tail ->
      if head < maximo tail then head
      else maximo tail
main = 
  -- media listaPrueba
  -- |> String.fromFloat
  -- |> Html.text
  remove listaPrueba [] 3
        |> List.map String.fromInt       -- convert each Int to String
        |> String.join ", "  
        |> Html.text
