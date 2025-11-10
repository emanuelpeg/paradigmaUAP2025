module Main exposing (..)
tail lista = Maybe.withDefault [] (List.tail lista) --Definimos el resto de la lista, Maybe.withDefault [], devuelve lista vacia si no hay tail, sino devuelve el tail.
head lista = Maybe.withDefault 0 (List.head lista) --Definimos la cabeza de la lista, Maybe.withDefault 0, devuelve 0 si no hay head, sino devuelve el head.
--Nos conviene siempre hacer estas dos variables, ya que cuando usás directamente funciones como List.head o List.tail, Elm te devuelve un Maybe, porque no puede garantizar que la lista tenga elementos.


-- 1) Escriba una función llamada “Cantidad” que devuelva la cantidad de elementos de una lista.

cantidad : List a -> Int -- la funcion cantidad recibe una lista de cualquier tipo (List a) donde a es un tipo generico (como Int, String, etc) y devuelve un entero (Int)
cantidad lista =         -- definimos la funcion cantidad que recibe una lista como parametro
    if lista == [] then  -- si la lista está vacía, su cantidad de elementos es 0
        0
    else                 -- si la lista no está vacía, contamos 1 por el primer elemento y sumamos la cantidad de elementos del resto de la lista
        1 + cantidad (tail lista)

--Variante usando pattern matching
--El pattern matching se basa en que en vez de hacer case of, if else, escribimos directamente como patrones los casos posibles de la entrada.
cantidadPM : List a -> Int -- toma una lista de cualquier tipo y devuelve un entero
cantidadPM [] = 0 -- Patron [] = lista vacía (la forma minima de la lista). Caso base
cantidadPM (_ :: xs) = 1 + cantidadPM xs -- Caso recursivo. El patron (_ :: xs) descompone la lista en: 
                                                      -- _ = la cabeza (primer elemento) que no nos importa (por eso el comodín _).
                                                      -- xs = la cola (resto de la lista).
                                                      --llama recursivamente a cantidadPM con la cola xs y suma 1 por la cabeza hasta que no haya más elementos.

--Por qué usar pattern matching es mas funcional que usar if-then-else?
--Porque el if preguntaba “¿está vacía?”; aquí no preguntamos: desempaquetamos la lista según su forma.
--El pattern matching declara cómo se compone la respuesta desde la estructura de los datos.

--Otra variante de patteron marching, usando case of
cantidadCase : List a -> Int
cantidadCase lista =
    case lista of -- analiza la forma de lista y actúa según su estructura. Es similar al pattern matching, pero usando la expresión case.
        [] ->     -- caso base
            0

        _ :: xs ->                          --Si la lista tiene al menos un elemento (_), lo ignoramos.
            1 + cantidadCase xs             -- Tomamos la cola (xs) y llamamos recursivamente a la función.
                                            -- Sumamos 1 por cada elemento.
-- lists [4,5,6]
-- → 1 + cantidadCase [5,6]
-- → 1 + (1 + cantidadCase [6])
-- → 1 + (1 + (1 + cantidadCase []))
-- → 1 + (1 + (1 + 0))
-- → 3


-- otra variante usando pliegue de listas (fold)
cantidadFold : List a -> Int  -- recordar que es polimórfica, o sea, puede trabajar con cualquier tipo de lista.
cantidadFold lista =
    List.foldl (\_ acc -> acc + 1) 0 lista

-- List.foldl significa fold (pliegue) por la izquierda.
-- Esta funcion tiene 3 argumentos:
-- 1) una función anónima (\_ acc -> acc + 1) que toma dos argumentos (\ indica funcion anonima o lamda). Una funcion anonima significa que no tiene nombre pero hace algo específico.
--    - el primer argumento (_) representa cada elemento de la lista (no nos importa su valor, por eso usamos el comodín _)
--    - el segundo argumento (acc) es el acumulador que lleva la cuenta de la cantidad de elementos.
-- 2) el valor inicial del acumulador (0)
-- 3) la lista sobre la que se aplica el fold (lista)
-- La función foldl recorre la lista de izquierda a derecha, aplicando la función anónima a cada elemento y al acumulador. 
-- Cada vez que el fold pasa por un elemento, le suma 1 al acumulador.

------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 2)  Escriba una función llamada “Sumatoria” que devuelva la suma de elementos de una lista. 

sumatoria : List Int -> Int -- Recibe una lista de enteros y devuelve un entero, que es la suma total. No usamos a genérico porque solo podemos sumar numeros.“Cuando la operación es específica (como la suma), el tipo debe restringirse.”
sumatoria lista =
    if lista == [] then -- Si la lista está vacía, la suma total es 0.
        0
    else
        head lista + sumatoria (tail lista) -- Caso recursivo: La suma total es la cabeza + sumatoria de la cola.
{- 
sumatoria [4,7,2]
→ 4 + sumatoria [7,2]
→ 4 + (7 + sumatoria [2])
→ 4 + (7 + (2 + sumatoria []))
→ 4 + (7 + (2 + 0))
→ 13
-}

-- otra variante usando pattern matching
sumatoriaPM : List Int -> Int
sumatoriaPM [] =
    0

sumatoriaPM (x :: xs) = -- descompone la lista en la cabeza x y la cola xs. 
    x + sumatoriaPM xs  -- La suma total es la cabeza x + sumatoria de la cola xs.

-- otra variante usando fold
sumatoriaFold : List Int -> Int
sumatoriaFold lista =
    List.foldl (\x acc -> x + acc) 0 lista -- La función anónima (\x acc -> x + acc) toma cada elemento x de la lista y lo suma al acumulador acc.
                                           -- aqui no usamos el comodín _ porque necesitamos el valor de cada elemento para sumarlo.

-- otra variante usando case of
sumatoriaCaseOf : List Int -> Int
sumatoriaCasumatoriaCaseOfse lista =
    case lista of
        [] ->
            0

        x :: xs ->
            x + sumatoriaCaseOf xs
------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 3)  Realice una función que devuelva el i-ésimo elemento de una lista. 
-- “i-ésimo” significa “el elemento que está en la posición i de una lista”.
-- El primer elemento comienza con el indice 0.

iesimo : List a -> Int -> a -- Recibe una lista de cualquier tipo y un entero i, y devuelve el elemento (tmb generico) en la posición i.
iesimo lista i =
    if i == 0 then -- Caso base: Si el índice es 0, devolvemos la cabeza de la lista: el primer elemento.
        head lista
    else             -- Caso recursivo: Si el índice es mayor que 0, llamamos recursivamente a iesimo con la cola de la lista y el índice decrementado en 1.
        iesimo (tail lista) (i - 1)

{-
iesimo [4,7,9,12] 2
→ iesimo [7,9,12] 1
→ iesimo [9,12] 0
→ 9
-}

-- otra variante usando Maybe
iesimoSeguro : List a -> Int -> Maybe a -- recibe una lista de cualquier tipo (a) y un indice (int). Devuelve un Maybe a: Just valor si existe, Nothing si la lista está vacía o el indice es invalido.
iesimoSeguro lista i =
    if i < 0  || i >= cantidad lista then -- Si el índice es negativo, devolvemos Nothing.
        Nothing
    else
        case lista of -- validamos la estructura de la lista
            [] -> -- Si la lista está vacía, devolvemos Nothing.
                Nothing

            x :: xs -> -- Si la lista no está vacía, descomponemos en cabeza x y cola xs.
                if i == 0 then -- comparaciones logicas con if
                    Just x
                else
                    iesimoSeguro xs (i - 1)

{-
En este ejercico usamos if para comparar valores numericos (i == 0) 
y case of para analizar la estructura de la lista (vacia o no vacia).
-}

{-
Maybe es una “caja” que puede contener un valor o estar vacía.
En lugar de lanzar errores, devuelve Nothing.
-}

{-
Uso del if else y case of en Elm:
✔ if ... then ... else
Solo funciona con condiciones booleanas (True / False).
Sirve para decisiones simples y rápidas.
Siempre debe tener un else (Elm no permite un “if sin else”).

✔ case ... of
Se usa para estructuras con varias formas posibles, como:
Listas ([] / x :: xs)
Tipos algebraicos (Just x / Nothing)
-}

-- otra variante usando pattern matching
iesimoPM : List a -> Int -> Maybe a -- no se por qué pero no se usa "iesimoPM lista i".
iesimoPM [] _ = -- analizamos el caso de lista vacía, sin importar el indice
    Nothing

iesimoPM (x :: xs) 0 = -- analizamos el caso de indice 0, devolviendo la cabeza envuelta en Just
    Just x

iesimoPM (x :: xs) i = -- caso recursivo: lista no vacía y indice mayor que 0
    if i < 0 || i >= cantidad lista then
        Nothing
    else
        iesimoPM xs (i - 1)

------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 4) Definir una función eliminarIesimo que elimine el elemento ubicado en la posición i de una lista.
-- Si el índice está fuera de rango (negativo o mayor que la longitud de la lista), la función debe devolver la lista original.

eliminarIesimo : Int -> List a -> List a -- recibe un indice (Int) y una lista de cualquier tipo (List a), devuelve una lista del mismo tipo (List a)
eliminarIesimo i lista =
    case lista of
        [] ->
            []     -- caso base: lista vacía → no hay nada que eliminar

        x :: xs -> -- caso recursivo: lista no vacía
            if i < 0 then -- si el indice es negativo, devolvemos la lista original
                lista
            else if i == 0 then -- si el indice es 0, eliminamos la cabeza y devolvemos la cola
                xs -- eliminamos la cabeza
            else -- si el indice es mayor que 0, llamamos recursivamente a eliminarIesimo con el indice decrementado y la cola de la lista
                x :: eliminarIesimo (i - 1) xs -- reconstruimos la lista con la cabeza x y el resultado de eliminarIesimo en la cola xs

{-
eliminarIesimo 2 [10,20,30,40]
Paso 1: x=10, xs=[20,30,40], i=2 → 10 :: eliminarIesimo 1 [20,30,40]
Paso 2: x=20, xs=[30,40], i=1 → 20 :: eliminarIesimo 0 [30,40]
Paso 3: x=30, xs=[40], i=0 → [40] (saltamos el 30)
Resultado final: 10 :: (20 :: [40]) → [10,20,40]
-}

-- otra variante usando Maybe 

eliminarIesimoSeguro : Int -> List a -> Maybe (List a) -- tipo de retorno Maybe (List a) porque puede devolver Nothing si el indice es invalido o Just lista si se elimina correctamente
eliminarIesimoSeguro i lista =
    case lista of -- case lista of: analiza la estructura de la lista (vacía vs. cabeza/cola).
        [] ->
            Nothing -- devolvemos Nothing en vez de la lista vacía.

        x :: xs ->
            if i < 0 then
                Nothing
            else if i == 0 then
                Just xs
            else -- Caso recursivo: llamamos a la función con el índice decrementado
                eliminarIesimoSeguro (i - 1) xs |> Maybe.map (\resto -> x :: resto)

{-|
Función: eliminarIesimoSeguro

Elimina el elemento en la posición i de una lista de forma segura.
Devuelve un valor de tipo `Maybe (List a)`:
- `Just listaNueva` si la eliminación se pudo hacer.
- `Nothing` si el índice es inválido (negativo o fuera de rango) o la lista está vacía.

───────────────────────────────
Explicación general:
───────────────────────────────

1️⃣ La función recorre la lista de manera recursiva, restando 1 al índice en cada paso,
   hasta que `i` sea igual a 0.
   En ese momento, significa que llegamos al elemento a eliminar,
   por lo tanto devolvemos `Just xs` (la cola), es decir la lista sin su primer elemento.

2️⃣ Si el índice es menor que 0 o la lista está vacía, se devuelve `Nothing`.

3️⃣ En cada paso recursivo, usamos esta parte clave:
       eliminarIesimoSeguro (i - 1) xs
           |> Maybe.map (\resto -> x :: resto)

   Aquí ocurre lo siguiente:

   - `eliminarIesimoSeguro (i - 1) xs` llama recursivamente a la función
     para intentar eliminar el elemento en la cola (`xs`), con un índice reducido.
     Puede devolver:
       ▪ `Just resto` si logró eliminar el elemento,
       ▪ `Nothing` si no pudo (por ejemplo, índice fuera de rango).

   - El operador `|>` (pipe) se lee como “pasale el resultado a...”.
     Es decir, el resultado de la izquierda (el `Maybe`) se pasa como argumento
     a la función de la derecha (`Maybe.map ...`).
     Esto hace que el código se lea más naturalmente de izquierda a derecha.

   - `Maybe.map (\resto -> x :: resto)` significa:
       ▪ Si la llamada recursiva devolvió `Just resto`, entonces agrega la cabeza actual `x`
         al principio de esa lista → `Just (x :: resto)`.
       ▪ Si devolvió `Nothing`, entonces `Maybe.map` no aplica la función
         y deja el `Nothing` igual (se propaga hacia arriba).

4️⃣ Gracias a `Maybe.map`, el “éxito” o “fracaso” de la eliminación
   se transmite automáticamente hacia arriba:
   - Si en algún punto hubo `Nothing`, todo el resultado final será `Nothing`.
   - Si todo salió bien, cada nivel reconstruye la lista agregando de nuevo su cabeza `x`.

───────────────────────────────
Ejemplo:
───────────────────────────────
eliminarIesimoSeguro 2 [10,20,30,40]

Paso 1 → recorre 10 y llama eliminarIesimoSeguro 1 [20,30,40]
Paso 2 → recorre 20 y llama eliminarIesimoSeguro 0 [30,40]
Paso 3 → i == 0, devuelve Just [40]

Ahora se reconstruye:
- Paso 2:  Just [40] |> Maybe.map (\resto -> 20 :: resto)  → Just [20,40]
- Paso 1:  Just [20,40] |> Maybe.map (\resto -> 10 :: resto) → Just [10,20,40]

Resultado final: Just [10,20,40]

───────────────────────────────
En resumen:
───────────────────────────────
- `|>` hace que el código se lea naturalmente (“tomo esto y lo paso a...”)
- `Maybe.map` aplica una función dentro de un `Just` o ignora un `Nothing`
- `(\resto -> x :: resto)` reconstruye la lista agregando nuevamente la cabeza `x`
- Toda la función es pura, inmutable y segura: nunca falla con listas vacías
-}

-- Version sin utilizar Maybe.map. Es más larga pero más explícita. Funciona exactamente igual.
eliminarIesimoSeguro : Int -> List a -> Maybe (List a)
eliminarIesimoSeguro i lista =
    if i < 0 || i >= cantidad lista then
        Just lista
    else
        case lista of
            [] ->
                Nothing

            x :: xs ->
                if i == 0 then
                    Just xs
                else
                -- Volvemos a usar case of para manejar la estructura de la lista resultante que devuelve un Maybe (List a)
                    case eliminarIesimoSeguro (i - 1) xs of
                        Nothing -> Nothing -- Si es Nothing, significa que no se eliminó nada, así que devolvemos Nothing

                        Just nuevaCola -> -- si es Just nuevaCola, significa que se eliminó algo, así que reconstruimos la lista
                            Just (x :: nuevaCola) -- volver a agregar la cabeza original (x) al frente de la nueva cola (nuevaCola), y envolver todo en Just.

------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 5) Escriba una función llamada “Existe” que indique si un objeto se encuentra dentro de una lista determinada. 

existe : a -> List a -> Bool -- recibe un elemento de cualquier tipo (a) y una lista del mismo tipo (List a), devuelve un booleano (Bool)
existe elemento lista =
    case lista of
        [] -> --Caso base
            False

        x :: xs ->
            if x == elemento then --Si la cabeza es igual al elemento que buscás (x == elem), devolvés True.
                True
            else
                existe elemento xs -- Si no, seguís buscando en la cola.

{-
existe 9 [1,2,3]
→ 1 ≠ 9 → existe 9 [2,3]
→ 2 ≠ 9 → existe 9 [3]
→ 3 ≠ 9 → existe 9 []
→ False
-}

-- otra variante usando fold
existeFold : a -> List a -> Bool
existeFold elemento lista =
    List.foldl (\x acc -> (x == elemento) || acc) False lista 
--recorre cada elemento x de la lista desde la izquierda, y verifica si x es igual al elemento buscado.
-- Si encuentra una coincidencia, devuelve True; si no, continúa con el siguiente elemento.
-- El acumulador (acc) comienza en False y se actualiza a True si se encuentra
-- el || acc sirve para mantener el valor True si es que ya se encontró el elemento en alguna iteración anterior o false si no se ha encontrado aún.

-- usando List.any
existeAny : a -> List a -> Bool
existeAny elemento lista =
    List.any (\x -> x == elemento) lista -- List.any devuelve True si al menos un elemento de la lista cumple la condición dada por la función anónima.

------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 6) Escriba una función llamada media que determine la media aritmética (promedio) de una lista de números.
-- Si la lista está vacía, devolver 0 o Nothing (según cómo queramos manejar el caso).

media : List Float -> Float
media lista =
    if lista == [] then
        0
    else
        sumatoriaCaseOf lista /  cantidadCase lista -- La media es la suma total dividida por la cantidad de elementos.
                                                  -- usamos las funciones definidas anteriormente

-- otra variante usando Maybe
mediaSeguro : List Float -> Maybe Float
mediaSeguro lista =
    if lista == [] then
        Nothing
    else
        Just (sumatoriaCaseOf lista / cantidadCase lista)

-- otra variante usando Maybe y case of
mediaFold : List Float -> Maybe Float
mediaFold lista =
    case lista of
        [] ->
            Nothing

        _ -> -- Si la lista no es vacía (_), no me importa su contenido, solo quiero ejecutar lo siguiente...
            Just (sumatoriaFold lista / cantidadFold lista)

------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 7) Escriba una función insertarEn que agregue un elemento en una posición determinada de una lista.
-- Si la posición es menor que 0 o mayor que la longitud de la lista, la función debe devolver la lista original.

--version simple sin manejo de errores
insertarEn : Int -> a -> List a -> List a -- recibe un indice (Int), un elemento de cualquier tipo (a) y una lista del mismo tipo (List a), devuelve una lista del mismo tipo (List a)
insertarEn pos elem lista =
    case lista of
        [] ->                 -- Si la lista está vacía, no hay dónde insertar,
            if pos == 0 then  -- pero si la posición es 0, insertamos el elemento como único elemento de la lista.
                [elem]
            else              -- Sino, 0, devolvemos la lista original (vacia).
                []
        x :: xs ->            -- Caso recursivo: lista no vacía
            if pos == 0 then  -- ya llegamos a la posición indicada, 
                elem :: lista --inserto el elemento deseado (elem) al frente de la lista sin importar el valor de x.
            else              -- Si pos > 0, todavía no llegamos, entonces: sacamos el primer elemento (x), llamamos recusivamente sobre la cola (xs) y restamos 1 a la posicion (pos -1).
                x :: insertarEn (pos - 1) elem xs --con x:: voy reconstruyendo la lista original. (se ve mejor en el ejemplo de abajo)

{-
Ejemplo de flujo: insertarEn 2 99 [10,20,30,40]

Llamada inicial: pos=2 → no es 0, guarda 10 y llama a insertarEn 1 99 [20,30,40].
Segunda llamada: pos=1 → no es 0, guarda 20 y llama a insertarEn 0 99 [30,40].
Tercera llamada: pos=0 → inserta 99 antes de [30,40] → [99,30,40].
Se reconstruye hacia atrás:
    20 :: [99,30,40] → [20,99,30,40]
    10 :: [20,99,30,40] → [10,20,99,30,40]

Resultado final: [10,20,99,30,40]
-}

-- otra variante usando Maybe
insertarEnSeguro : Int -> a -> List a -> Maybe (List a)
insertarEnSeguro pos elem lista =
    if pos < 0 then
        Nothing
    else
        case lista of
            [] ->
                if pos == 0 then
                    Just [elem]
                else
                    Nothing

            x :: xs ->
                if pos == 0 then
                    Just (elem :: lista)
                else
                    case insertarEnSeguro (pos - 1) elem xs of
                        Nothing ->
                            Nothing
                        Just nuevaCola -> --nuevaCola = insertarEnSeguro (pos - 1) elem xs dio un Just lista
                            Just (x :: nuevaCola)
                            
----------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 8) Agregue un elemento a una lista ordenada, en el lugar que le corresponda. 

agregarElmentoOrdenado : List Int -> Int -> List Int
agregarElmentoOrdenado lista elem = 
    case lista of 
        [] -> [elem]

        head :: tail -> 
            if elem <= head then
                elem :: lista
            else -- si es mayor, sigo recorriendo la lista
                head :: agregarElmentoOrdenado tail elem

----------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 9) Escriba una función que tome una lista y un elemento como argumentos, y devuelva la lista original con todas las ocurrencias de dicho elemento eliminadas. 
eliminarElementoDado : List a -> a -> List a
eliminarElementoDado lista elem = 
    case lista of 
        [] -> []

        head :: tail ->
            if head == elem then    
                tail
                -- Si el elemento actual es igual al que quiero eliminar,
                -- sigo con la cola, pero sin incluir este head.
                eliminarElementoDado tail elem
            else    
                head :: eliminarElementoDado tail elem

----------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 10)  Escriba una función llamada "reemplazo", que tome una lista y dos elementos como argumentos, y devuelva la lista original con todas las instancias del primer elemento reemplazadas por el segundo.

reemplazo : List a -> a -> a -> List a 
reemplazo lista elem1 elem2 =
    case lista of   
        [] -> []

        head :: tail ->
            if head == elem1 then    
                elem2 :: reemplazo tail elem1 elem2
            else    
                head :: reemplazo tail elem1 elem2
{- 
Prueba de escritorio:
lista = [5,3,1,5], elem1 = 5, elem2 = 9

head = 5, tail = [3,1,5]
→ entra al if (5 == 5)
→ 9 :: reemplazo [3,1,5] 5 9

head = 3, tail = [1,5]
→ entra al else (3 /= 5)
→ 3 :: reemplazo [1,5] 5 9

head = 1, tail = [5]
→ entra al else (1 /= 5)
→ 1 :: reemplazo [5] 5 9

head = 5, tail = []
→ entra al if (5 == 5)
→ 9 :: reemplazo [] 5 9

reemplazo [] 5 9 = []

Retorno:
9 : []
1 :: [9]
3 :: [1,9]
9 :: [3,1,9]

✅ Resultado final: [9,3,1,9]
-}

--------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 11) Escriba funciones que devuelvan el máximo y el mínimo de una lista de números.

contar: List Int -> Int
contar lista = 
    if (lista == []) then 0
    else 1 + contar (tail lista)
  
max : List Int -> Int
max lista = 
    -- Paso 1: verifico si la lista tiene un solo elemento.
    -- Si es así, no hay nada más que comparar, ese es el máximo.
    if (contar lista) == 1 then
        head lista

    -- Paso 2: si la lista tiene más de un elemento,
    -- comparo el primer elemento (head lista) con el máximo del resto de la lista (max (tail lista)).
    else if (head lista) > (max (tail lista)) then  
        -- Si el primer elemento es mayor que el máximo del resto, entonces este primer elemento es el nuevo máximo.
        head lista

    else
        -- Caso contrario: el máximo está en el resto de la lista,
        -- por lo que devuelvo el resultado de (max (tail lista)).
        max (tail lista)

    -- 🔁 La recursión continúa hasta que quede una lista de un solo elemento.
    -- En ese momento se devuelve ese valor, y se van resolviendo
    -- todas las comparaciones hacia arriba, devolviendo finalmente el mayor.

{- PRUEBA DE ESCRITORIO
   max [3, 7, 2, 9]

   Llamada A: max [3,7,2,9]
     contar = 4 > 1  → voy al caso recursivo
     head = 3
     necesito max [7,2,9] para comparar 3 > (max [7,2,9])

   Llamada B: max [7,2,9]
     contar = 3 > 1
     head = 7
     necesito max [2,9] para comparar 7 > (max [2,9])

   Llamada C: max [2,9]
     contar = 2 > 1
     head = 2
     necesito max [9] para comparar 2 > (max [9])

   Llamada D (base): max [9]
     contar = 1 → caso base → devuelve 9

   ⤴ Retorno D → C recibe 9 como resultado de max [9]
   C: comparo 2 > 9 → False → entra al "else" → devuelve (max (tail lista)) = 9

   ⤴ Retorno C → B recibe 9 como resultado de max [2,9]
   B: comparo 7 > 9 → False → entra al "else" → devuelve (max (tail lista)) = 9

   ⤴ Retorno B → A recibe 9 como resultado de max [7,2,9]
   A: comparo 3 > 9 → False → entra al "else" → devuelve (max (tail lista)) = 9

   ✅ Resultado final: 9
-}

min: List Int -> Int
min lista = 
    if (contar lista) == 1 then 
        head lista
    else if (head lista) < (min (tail lista)) then 
        head lista
    else min (tail lista)

{- PRUEBA DE ESCRITORIO (versión correcta)
   Evaluamos: min [8,3,5]

   Llamada A: min [8,3,5]
     head = 8
     → necesito min [3,5]

   Llamada B: min [3,5]
     head = 3
     → necesito min [5]

   Llamada C (base): min [5] → devuelve 5

   ⤴ B: compara 3 < 5 → True → devuelve 3
   ⤴ A: compara 8 < 3 → False → devuelve 3

   ✅ Resultado final: 3
-}

-- Usando Maybe. Puede devolver Just valor si encontró el maximo, o Nothing si la lista está vacía.
-- Función que devuelve el máximo de una lista usando Maybe.
-- Usa Maybe.map para aplicar la función solo si max tail devuelve un valor (Just).
-- Si max tail devuelve Nothing, Maybe.map no ejecuta nada y simplemente devuelve Nothing.

max : List Int -> Maybe Int
max lista =
    case lista of
        [] ->
            Nothing  -- caso base: lista vacía → no hay máximo.

        head :: tail ->
            -- Llamamos recursivamente a max tail y usamos Maybe.map para aplicar la función
            -- solo si max tail devuelve un valor (Just x). Si es Nothing, lo ignora.
            case (max tail) |> Maybe.map (\x -> x < head) of -- cuando las llamadas suben, va verificando --> ej. 7 > 3 
                Nothing ->
                    Just head

                Just True ->
                    Just head

                Just False ->
                    max tail


{- 
Entrada: max [3,7,2]

Llamada 1: max [3,7,2]
  head = 3
  tail = [7,2]
  → (max [7,2]) |> Maybe.map (\x -> x < 3)
  
  Llamada 2: max [7,2]
    head = 7
    tail = [2]
    → (max [2]) |> Maybe.map (\x -> x < 7)

    Llamada 3: max [2]
      head = 2
      tail = []
      → (max []) |> Maybe.map (\x -> x < 2)

      Llamada 4: max []
        → Nothing  -- caso base

      Vuelve a Llamada 3:
      (max []) |> Maybe.map (\x -> x < 2)
      = Nothing |> Maybe.map (\x -> x < 2)
      → resultado: Nothing
      → entra en "Nothing -> Just head"
      → Just 2
    ✅ max [2] = Just 2

    Vuelve a Llamada 2:
    (max [2]) |> Maybe.map (\x -> x < 7)
    = Just 2 |> Maybe.map (\x -> x < 7)
    → aplica la función: 2 < 7 → True
    → resultado: Just True
    → entra en "Just True -> Just head"
    → Just 7
  ✅ max [7,2] = Just 7

  Vuelve a Llamada 1:
  (max [7,2]) |> Maybe.map (\x -> x < 3)
  = Just 7 |> Maybe.map (\x -> x < 3)
  → aplica la función: 7 < 3 → False
  → resultado: Just False
  → entra en "Just False -> max tail"
  → max tail = Just 7
✅ Resultado final: Just 7
-}


-- otra version mas simplemax : List Int -> Maybe Int
max lista =
    case lista of

        [] ->
            Nothing

        h :: tail ->
            case (max tail) of

                Nothing ->
                    Just h
                    
                Just v ->
                    if h > v then
                        Just h
                    else
                         Just v
 
--------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 12)  Realice una función que devuelva la lista invertida.

invertir : List a -> List a
invertir lista =
    case lista of
        [] ->
            []                                -- Caso base: lista vacía → devolvemos []

        head :: tail ->
            (invertir tail) ++ [ head ]     -- Paso recursivo: invertimos la cola y agregamos la cabeza al final
                                            -- el ++ es para concatenar listas. En esta caso el head se convierte en una lista de un elemento
                                            -- que se une luego con las demas cabezas que se formen.

--------------------------------------------------------------------------------------------------------------------------------------------------------------