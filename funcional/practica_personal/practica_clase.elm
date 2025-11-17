--Estas 3 lineas aplican para cada ejercicio
import Html
tail lista = Maybe.withDefault [] (List.tail lista) --Definimos el resto de la lista, Maybe.withDefault [], devuelve lista vacia si no hay tail, sino devuelve el tail.
head lista = Maybe.withDefault 0 (List.head lista) --Definimos la cabeza de la lista, Maybe.withDefault 0, devuelve 0 si no hay head, sino devuelve el head.

--1) contar la cantidad de elementos de una lista
contar: List Int -> Int --Definimos que recibe y que devuelve la funcion contar.
contar lista = if (lista == []) then 0 --Si la lista es vacia, devuelve 0. Caso base para detener la recursividad.
  else 1 + contar (tail lista) --Si no es vacia, devuelve 1 (head) + el tail, llamando recursivamente a contar y sumando 1 por cada elemento hasta que el tail sea [].
  

--2) maximo de una lista
maximo: List Int -> Int
maximo lista =
  if (contar lista) == 1 --Si la lista tiene un solo elemento, 
    then head lista --ese elemento es el maximo.
    else if (head lista) > (maximo (tail lista)) --Comparamos 
    then head lista
    else maximo (tail lista)

{-
Trazado de ejecución (ejemplo):
Queremos calcular: maximo [5, 3, 9, 2]

1) maximo [5,3,9,2]
   - contar = 4 → no es 1
   - compara: head = 5  vs  maximo [3,9,2]
     (queda pendiente esta comparación hasta saber el máximo del resto)

2) maximo [3,9,2]
   - contar = 3 → no es 1
   - compara: head = 3  vs  maximo [9,2]

3) maximo [9,2]
   - contar = 2 → no es 1
   - compara: head = 9  vs  maximo [2]

4) maximo [2]
   - contar = 1 → CASO BASE
   - devuelve head [2] = 2
   - (no hay más llamadas recursivas)

“Desapilando” (resolviendo comparaciones pendientes):
- En (3): comparamos 9 vs 2 → devuelve 9
- En (2): comparamos 3 vs 9 → devuelve 9
- En (1): comparamos 5 vs 9 → devuelve 9
-}

--3) buscar maximo y minimo de una lista (hecho de otra forma)
buscar: List Int -> (Int -> Int -> Bool) -> Int --Recibe una lista de enteros y una funcion que recibe dos enteros y devuelve un booleano. Devuelve un entero.
buscar lista fx = --lista es la lista de enteros, fx es la funcion que compara dos enteros.
  if (contar lista) == 1 --caso base: si la lista tiene un solo elemento,
    then head lista --ese elemento es el maximo/minimo.
    else if fx (head lista) (buscar (tail lista) fx) --Primero pasamos la funcion, puede ser mayot o menor. Luego comparamos el head de la lista con el resultado de llamar recursivamente a buscar con el tail de la lista y la funcion fx.
      then head lista
      else buscar (tail lista) fx
      
mayor: Int -> Int > Bool
mayor a b = a > b

menor: Int -> Int -> Bool
menor a b = a < b
  
max: List Int -> Int
max lista = 
  buscar lista mayor
    
min: List Int -> Int
min lista = 
  buscar lista menor


--4) otra forma mas
contar: List Int -> Int
contar lista = if (lista == []) then 0
  else 1 + contar (tail lista)
  
buscar: List Int -> (Int -> Int -> Bool) -> Int
buscar lista fx =
  if (contar lista) == 1
    then head lista
    else if fx (head lista) (buscar (tail lista) fx)
      then head lista
      else buscar (tail lista) fx
  
max: List Int -> Int
max lista = 
  buscar lista (\ a b -> a > b)
    
min: List Int -> Int
min lista = 
  buscar (\ a b -> a < b)
    
main =
  Html.text (String.fromInt (max [5, 3, 4, 8]))


--arbol binario de busqueda
type Tree
  = EmptyTree
  | TreeImpl Int Tree Tree
-- Define un *tipo algebraico* (suma de variantes) llamado Tree.
-- Tiene dos "constructores":
--   1) EmptyTree          → representa el árbol vacío (no hay nodo).
--   2) TreeImpl v l r     → un nodo con:
--        v : Int          → el valor almacenado en ese nodo
--        l : Tree         → subárbol izquierdo
--        r : Tree         → subárbol derecho
-- Este tipo es recursivo porque se define en términos de sí mismo (Tree contiene Tree).

add : Tree -> Int -> Tree -- recibe un árbol y un entero, y devuelve un árbol (el nuevo árbol con el valor insertado).
add tree value =
  case tree of
    EmptyTree -> -- Si el árbol estaba vacío, crear un nodo hoja con ese valor.
      TreeImpl value EmptyTree EmptyTree

    TreeImpl v left right -> -- Si el árbol NO está vacío, comparamos para decidir por dónde bajar.
      if value < v then -- Si el valor es menor que el del nodo actual, insertamos en el subárbol izquierdo.
        TreeImpl v (add left value) right
      else
        -- Si es mayor o igual, insertamos en el subárbol derecho.
        -- (Con esto, los duplicados se van a la derecha.)
        TreeImpl v left (add right value)


add (add (add EmptyTree 4) 2) 7
-- Construye el árbol insertando 4, luego 2, luego 7 sobre el resultado anterior.
-- Queda un árbol con 4 como raíz, 2 a la izquierda, 7 a la derecha.

{-

1️⃣ add EmptyTree 4
    - tree = EmptyTree
    - value = 4
    → caso EmptyTree → TreeImpl 4 EmptyTree EmptyTree

    Resultado parcial:
        4
       / \
      Ø   Ø

-----------------------------------------

2️⃣ add (TreeImpl 4 EmptyTree EmptyTree) 2
    - tree = TreeImpl 4 EmptyTree EmptyTree
    - value = 2
    - 2 < 4 → True → inserta en el subárbol izquierdo
    → TreeImpl 4 (add EmptyTree 2) EmptyTree

    Subllamada: add EmptyTree 2 → TreeImpl 2 EmptyTree EmptyTree

    Resultado parcial:
          4
         /
        2
       / \
      Ø   Ø

-----------------------------------------

3️⃣ add (TreeImpl 4 (TreeImpl 2 EmptyTree EmptyTree) EmptyTree) 7
    - tree = TreeImpl 4 (TreeImpl 2 …) EmptyTree
    - value = 7
    - 7 < 4 → False → inserta en el subárbol derecho
    → TreeImpl 4 (TreeImpl 2 EmptyTree EmptyTree) (add EmptyTree 7)

    Subllamada: add EmptyTree 7 → TreeImpl 7 EmptyTree EmptyTree

    Resultado final:
           4
          / \
         2   7
        / \ / \
       Ø  ØØ  Ø

-----------------------------------------

✅ Resultado final del árbol:
TreeImpl 4
   (TreeImpl 2 EmptyTree EmptyTree)
   (TreeImpl 7 EmptyTree EmptyTree)

Visualmente:
       4
      / \
     2   7
-}

--MAX hecho de otra forma
import Html

listaMain = [0, 3, 4, 88, 5, 1, 2]

max: List Int -> Maybe Int
max lista = 
  case lista of
  [] -> Nothing
  h :: tail -> case (max tail) of
    Nothing -> Just h --si al llamarse la funcion con el tail devolvio nothing, la lista solo tiene un elemento que es la cabeza y es el maximo
    Just v -> if h > v then Just h --si devolvio un maximo,
      else Just v
  
main =
  Maybe.map (\ x -> String.fromInt x) (max listaMain) --mapeamos (si no devolvio nothing) el resultado de max (Maybe 88 por ejemplo) a un string
  |> Maybe.withDefauly "Es vacia" -- si era vacia devuelve es vacia
  |> Htmml.text

{- 
===========================
 TRAZA RECURSIVA (PASO A PASO)
===========================

Ejemplo con [3, 5, 1]

Llamada 1: max [3,5,1]
  h = 3, tail = [5,1]
  → necesito max [5,1]

  Llamada 2: max [5,1]
    h = 5, tail = [1]
    → necesito max [1]

    Llamada 3: max [1]
      h = 1, tail = []
      → necesito max []
      
      Llamada 4: max []
        = Nothing
      ← vuelve Nothing

    Retorno de Llamada 3:
      case max [] of
        Nothing -> Just 1
      = Just 1
    ← vuelve Just 1

  Retorno de Llamada 2:
    case max [1] of
      Just v  (v = 1)
      if 5 > 1 then Just 5 else Just 1
      → Just 5
    ← vuelve Just 5

Retorno de Llamada 1:
  case max [5,1] of
    Just v  (v = 5)
    if 3 > 5 then Just 3 else Just 5
    → Just 5
← Resultado final: Just 5


===========================
 ¿POR QUÉ FUNCIONA?
===========================
1) La recursión baja hasta el caso base (lista vacía → Nothing).
2) Al volver, cada nivel compara su primer elemento (h)
   con el máximo ya calculado del resto (v).
3) En cada paso se elige el mayor (h o v) y se “propaga” hacia arriba,
   terminando en el máximo de toda la lista.
-}

import Html

listaMain = [[0,3], [4,8], [5,1,2]] --lista de listas
 
aplanarLista. List (List a) -> List a --Recibe una lista de listas y devuelve una lista aplanada
aplanarLista lista = 
  case lista of
    [] -> []
    h::t -> h ++ (aplanarLista t)  --h es la primera sublista [0,3], a esta se le suma las demas sublistas que seran cabezas en las proximas vueltas

main =
  List.map (\ x -> String.fromInt x) (aplancarLista listaMain) --convierte cada numero a texto
  |> List.foldl (\ a x -> x ++ " " ++ a) ""
  |> Html.text

{-
=============================
EXPLICACIÓN DEL FOLD PASO A PASO
=============================

Usamos:
List.foldl (\a x -> x ++ " " ++ a) "" ["0","3","4","8", ...]

Recordá:
- `a` es el acumulado (lo que llevamos construido hasta ahora)
- `x` es el elemento actual de la lista

Se evalúa de izquierda a derecha, pero como concatenamos `x` antes de `a`,
el resultado queda en orden invertido.

-------------------------------------------
| Paso | a (acumulado) | x (actual) | Resultado       |
|------|----------------|-------------|-----------------|
| 1    | ""             | "0"         | "0 "            |
| 2    | "0 "           | "3"         | "3 0 "          |
| 3    | "3 0 "         | "4"         | "4 3 0 "        |
| 4    | "4 3 0 "       | "8"         | "8 4 3 0 "      |
| ...  | ...             | ...          | ...             |
-------------------------------------------

🧠 Resultado final:
"2 1 5 8 4 3 0 "

El orden queda invertido porque `foldl` va acumulando desde la izquierda,
pero la función concatena el elemento actual (`x`) antes del acumulado (`a`).

Si quisiéramos el orden normal (de izquierda a derecha), podríamos usar:
List.foldr (\x a -> x ++ " " ++ a) ""
o poner primero el acumulador
-}

--PLIEGUES
--contar, acumular y promedio de una lista con foldl
import Html exposing (text)

listaMain = [0, 3, 4, 88, 5, 1, 2]

-- Cuenta la cantidad de elementos de la lista
contar : List Int -> Int
contar lista =
    List.foldl (\_ acumulador -> acumulador + 1) 0 lista

-- Suma todos los elementos de la lista
acumular : List Int -> Int
acumular lista =
    List.foldl (\elem acumulador -> acumulador + elem) 0 lista --sumo el siguiente elemento con lo que tenia acumulado

-- Calcula el promedio entero (división entera //)
promedio : List Int -> Int
promedio lista =
    (acumular lista) // (contar lista)

-- Muestra el resultado
main =
    promedio listaMain
        |> String.fromInt
        |> Html.text


import Html

trasnf: List a -> (a -> b) -> List b
trasnf xs fx = 
  List.foldl (\x acc-> acc ++ (fx x)::[]) [] xs --A cada elemento de una lista, se lo pasa como parametro a una 
  --funcion que transforma el elemento en otro y lo agrega a una lista en la cual se iran acumulando los resultados
  --de cada elemento

pasarAStr: List Int -> List String
pasarAStr xs = trasnf xs String.fromInt 

reduceStr: List String -> String
reduceStr xs = List.foldl (\x acc-> acc ++ x) "" xs

lista = [1,2,3,4,5,6,7,8]

main =
  Html.text (reduceStr (pasarAStr lista))
  

