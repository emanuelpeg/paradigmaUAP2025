## Explicación breve de conceptos:
**Mónada:** Es un modelos para ecadenar operaciones con contexto de error o falta de valor

**Maybe:** Es una mónada que representa un valor que puede estar presente (Just value) o ausente (Nothing) un valor. Se utiliza para manejar operaciones que pueden fallar o no devolver un valor.

**Result:** Es una mónada que representa el resultado de una operación que puede ser exitosa (Ok value) o fallida (Err error). Se utiliza para manejar operaciones que pueden tener éxito o fallar, proporcionando información sobre el error en caso de fallo.

**and_then:** Es una función que permite encadenar operaciones en una mónada. Toma una mónada y una función que devuelve otra mónada, aplicando la función al valor contenido en la primera mónada si está presente.

### Los comentarios en Elm:
```elm
-- Esto es un comentario de una sola línea

{- Esto es un comentario
   de múltiples líneas -}

{-| Esto es un comentario
   de documentación -} la q uso el profe
```
### Principios clave de la programación funcional en Elm:
1. **Inmutabilidad:** Los datos no pueden cambiar una vez creados. En lugar de modificar datos, se crean nuevos datos basados en los existentes.
2. **Funciones puras:** Las funciones siempre producen el mismo resultado para los mismos argumentos y no tienen efectos secundarios.
3. **Funciones de orden superior:** Las funciones pueden tomar otras funciones como argumentos y devolver funciones como resultados.
4. **Expresiones en lugar de declaraciones:** El código se compone de expresiones que devuelven valores, en lugar de declaraciones que cambian el estado.
5. **Recursión:** La recursión se utiliza en lugar de bucles para repetir operaciones.
6. **Tipado estático:** Elm utiliza un sistema de tipos estático que ayuda a detectar errores en tiempo de compilación.


### Como diferenciar cuando es una variable o función en Elm: 
> En Elm no tenemos funciones tipicas como en poo con los { } o parentesis  ( ) como parametro, asi que la forma correcta en Elm es:

> Cuando se pone **: (dos puntos)** es para un "Tipo" (ya sea variable o funcion) y si se pone ** = (signo igual)** es para "Asignar un valor" (ya sea variable o funcion) 

```elm
--------------------------------- Variable--------------------------------
edad : Int -- definimo tipo de variable (es una buena prctica)
edad = 19 -- asignamos valor a la variable

nombre : String
nombre = "messii"

activo : Bool
activo = True
```

```elm
-----------------------------------Funcion 1-------------------------------
-- se llama 'firma de tipo de la funcion' Int -> Int -> Int

-- Ej 1.
--nuestra funcion se llama 'suma' y recibe dos parametros de tipo Int (o sea le vamos a pasar 2 n° enteros) y nos devolvería un Int
suma : Int -> Int -> Int -- definimos tipo de funcion (buena practica)
suma x y = x + y -- definimos la funcion con sus parametros y su operacion (suma de x e y serian los 2 pparametros Int -> Int q recibe la funcion)

-- Uso de la funcion
resultadoSuma : Int
resultadoSuma = suma 3 5 -- llamamos a la funcion con sus argumentos
```

```elm
-----------------------------------Funcion 2-------------------------------

--Ej 2.
-- Funcion con una sola variable
incrementar : Int -> Int -- aca recibe un entero y devuelve un entero
incrementar x = x + 1

-- Uso de la funcion
resultadoIncremento : Int
resultadoIncremento = incrementar 10

```
### Ahora si, explicacipon de ej 4:

>Primero en un archivo elm, se sule poner el modulo con sus exportanciones, el módulo vendris a ser el archivo q estamos creando, y q lo podemos usar en los archivos q queramos luego:
```elm
module Clase4 exposing (..)
```
>Luego se importan los modulos q serian las librerias q vamos a usar, en casi tds los lenguajes se suele hacer esto

```elm
import Html exposing (a) -- html es importante xq ahi es donde vemos lo q programamos
import List exposing (head) --es para devolver el primer elemento de una lista
import List exposing (tail) -- es para devolver todos los elementos de una lista menos el primero (o sea la cola)
import Test.Runner.Failure exposing (InvalidReason(..)) -- es para manejar errores en los test
import Html exposing (video) -- es para crear un elemento de video en html (no lo usamos en el ej)
import Html exposing (node) -- es para crear un nodo html 
```

>Ahora se hace algo raro, q es hacer un "tipo genérico" solo se suele hacer en lenguajes viejos como elm o haskell no es comun....
```elm
type Tree a
    = Empty
    | Node a (Tree a) (Tree a)
```
>Acá estamos definiendo un tipo de dato llamado Tree (árbol) que puede contener valores de cualquier tipo (**a** *es un tipo genérico*). Un árbol puede ser vacío (Empty) o otra opcion ( | ) puede ser un nodo (Node) que contiene un valor de tipo a y dos subárboles (izquierdo y derecho).

```elm
--ejemplo 
type Tree 5 
    = vacio
    | nodo 5 (izq vacio) (der vacio)
```
### EJERCICIO 1: Ahora vamos a crear distintos tipos de arboles:
>Estructura de un arbol:
```
        (raiz)
        Node 
       /    \
   (hijo izq) (hijo der)


arbol : [tipo q yo hice] [Tipo real]
      Node (raiz) (hijo izq) (hijo der)
      Node a (Node n° izq izq) (Node n° der der)
```

### Árbol vacío:
```elm
arbolVacio : Tree Int -- aca definimos el tipo de variable (q es un arbol q contiene Int, el int se lo asignamos xq antes pusimos "a" que era de tipo generico)
arbolVacio = -- aca ya le asignamos el valor a la variable de arbolds
    Empty -- es vacio

```
### Arbol hoja (un solo nodo, en este caso la raiz noma):
```elm
arbolHoja : Tree Int -- lo mismo q antes, definimos el tipo de variable arbol q contiene Int
arbolHoja = --le damos un valor pero en este caso ya le ponemos una raiz
    Node 5 Empty Empty -- la raiz es 5 y no tiene hijos (xq es hoja) (empity = vacio)

```

### Arbol pequeño:
```elm
arbolPequeno : Tree Int -- lo mismo q antes, definimos el tipo de variable arbol q contiene Int
arbolPequeno = --le damos valor pero en este caso ya le ponemos una raiz y 2 hijos
    Node 3 (Node 1 Empty Empty) (Node 5 Empty Empty) -- la raiz es 3, el hijo izq es 1 y el hijo der es 5 (ambos hijos son hojas xq no tienen hijos (eso se lo ponemos con el Empity))


-- Ejemplo:
--      3
--     / \
--    1   5
```
### Atbol mediano:
```elm
arbolMediano : Tree Int -- definimos tipo
arbolMediano = -- le damos valor
    Node 10 -- raiz
        -- izq   hijo de 5 izq         hijo de 5 der 1       
        (Node 5 (Node 3 Empty Empty) (Node 7 Empty Empty))
         --der   hijo de 15 izq       hijo de 15 der 20
        (Node 15 (Node 12 Empty Empty) (Node 20 Empty Empty))

-- Ejemplo:
--        10
--       /  \
--      5    15
--     / \   / \
--    3  7 12  20
```
### Verificación de si un árbol es vacío:

>Se sigue una **"expresión de pattern matching"** (o en español: **“expresión de coincidencia de patrones”**) esto funcionaria como un "if" pero de condiciones, donde se comparan valores y si no es pasamos al siguiente pero SIEMPRE nos devuedlve un "resultao"

```
case valor of
   patrón1 -> resultado1
   patrón2 -> resultado2
```
### EJERCICIO 2: Arbol es vacio??
```elm
--definimos tipo de funcion
esVacio : Tree a -> Bool --es una función q recibe un Tree de tipo generico y devuelve un Bool (True o False)
esVacio arbol = -- le pasamos valor
    case arbol of --si el arbol es vacio o no y comparamos)?
            Empty -> True -- esta vacio
            Node _ _ _ -> False --no esta vacio
-- los _ _ _ son comodines, xq no nos importa el valor de la raiz ni de los hijos, solo nos importa si es vacio o no
```
### EJERCICIO 3: Árbol es hoja??
```elm

esHoja : Tree a -> Bool  --definimos tipo de funcion, recibe un tipo generico y nos devuelve un booleano
esHoja arbol = --aca ya le damos valor
    case arbol of
        Empty ->
            False -- si esta vacio obvio q no es hoja

        Node _ Empty Empty -> 
            True --si tiene un valor (comodin de valores q no nos importa) y sus dos hijos son vacios entonces si es hoja 

        Node _ _ _ -> 
            False --si tiene raiz e hijos (con comodines q no nos importa su valor) entonces no es hoja
```

## PARTE 1: PATTERN MATCHING CON ÁRBOLES (compara y separa)
### EJERCICIO 4: Tamaño del árbol (número de nodos):
>En  **PATTERN MATCHING**, la **recursión** van tomandos de la mano xq es super fundamenteal
```elm
tamano : Tree a -> Int --definirmos tipo de funcion, recibe un tipo generico y nos devuelve un Int 
tamano arbol = --le damos valor
    case arbol of
        Empty -> 0 --si esta vacio el tamaño es 0
        Node _ der izq -> (tamano izq) + (tamano der) + 1 --pero si al menos tiene raiz, entonces el tamaño es la suma del tamaño de los hijos mas 1 (q seria la raiz osea nodo actual en el q estoy pisando)
```

### EJERCICIO 5: Altura del árbol (longitud del camino más largo desde la raíz hasta una hoja):
```
Ejemplo de una altura X de un arbol:
      10        ← nivel 1 (raiz)
     /  \
    5    15     ← nivel 2 (hijos)
         /
        12      ← nivel 3 (nietos)

```

```elm
altura : Tree a -> Int --definimos tipo de funcion, recibe un tipo generico y nos devuelve un Int
altura arbol =
    case arbol of 
        Empty -> 0 -- si esta vacio la altura es 0
        Node _ izq der -> (max (altura izq) (altura der)) + 1 --calculá la altura del lado der y del izq yde eso quedate con el maximo (max es una funcion propia de elm) y a eso le sumas 1 xq es el nodo actual q estoy pisando osea la raiz. 

```

### EJERCICIO 6: Suma de valores:
```elm
sumarArbol : Tree Int -> Int -- definimos tipo (esto lit q c repite en todo arboles pero podria cambiar lo q va despues del -> ...a str o bool etc)
sumarArbol arbol = --asignamos valor
    case arbol of
        Empty -> 0 --si esta vacio no sumes nd
        Node valor izq der -> (sumarArbol izq) + (sumarArbol der) + valor -- si tiene raiz, e hijos, etnoces suma el lado izq y der usando recursión y le sumamos el "valor" de la raiz (no es lo mismo a sumarle el +1 de antes)

```

### EJERCICIO 7: Contiene valor?
>Todo esto se basa en tiene q ser un Node... osea raiz + der + izq
```elm
contiene : a -> Tree a -> Bool --firma: Recibo un valor (a), un árbol de ese mismo tipo (Tree a) y devuelvo un booleano (Bool)
contiene valor arbol =
    case arbol of
        Empty -> False
        Node v izq der -> if v == valor || (contiene valor izq) || (contiene valor der) -- primero, si ese Nodo tiene v entonces le mandamos un codicional if
        --if v es igual al valor entonces dame eso, y sino compara con los ihijos izq o der 
```

### EJERCICIO 8: Contar hojas 
```
Esto seria contar hojas: 
      10
     /  \
    5    15
5 y 15 son hojas → hay 2 hojas
```

```elm
contarHojas : Tree a -> Int --definimos tipo, recibe un tipo generico y devuelve un Int
contarHojas arbol =
    case arbol of
        Empty -> 0 
        Node _ Empty Empty -> 1 -- no nos importa el valor de la raiz (comodin _) pero si no tiene hijos (vacios) entonces obvio q solo es 1 hoja
        Node _ izq der  -> (contarHojas izq) + (contarHojas der)-- si tiene hijos, entonces contamos las hojas de cada hijo usando recursión y las sumamos

```
### EJERCICIO 9
