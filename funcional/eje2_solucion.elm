-- 1) Escriba una función llamada "Cantidad-de" que toma como argumentos una lista y una condición (función), y  devuelve la cantidad de elementos de la lista que cumplen con dicha condición.

CantidadDe : List a -> (a -> Bool) -> Int -- (a -> Bool) describe el tipo de la función condicional que vas a pasar como segundo argumento.
                                          -- en este caso es una función que toma un valor del tipo a y responde True o False según una condición
CantidadDe lista condicion =
    case lista of
        [] ->
            0  -- si la lista está vacía, no hay elementos que contar

        head :: tail ->
            if condicion head then -- si el primer elemento cumple la condicion (True), suma uno y llama a la funcion con el resto de la lista
                1 + CantidadDe tail condicion
            else -- si no cumple, no suma nada pero sigue buscando en el resto de la lista.
                CantidadDe tail condicion

esPar : Int -> Bool -- recibe un int y devuelve True si es par y False si no lo es
esPar n = n % 2 == 0

-- Para que la funcion CantidadDe utilice la funcion esPar, la debe llamar asi: CantidadDe [1,2,3,4,5,6] esPar.

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 2) Defina una función que tome una lista de números y una condición (función) como parámetros y devuelva la sumatoria de los elementos que cumplen dicha condición.

sumatoriaCondicion : List Int -> (Int -> Bool) -> Int
sumatoriaCondicion lista condicion = 
    case lista of   
        [] -> 0

        head :: tail ->
            if condicion head then  
                head + sumatoriaCondicion tail condicion -- No usar el :: ya que ese es para construir una lista.
            else
                sumatoriaCondicion tail condicion


----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 3) Escriba una función llamada “intercalar-según” que tome dos listas y una función como entrada, y construya una nueva lista resultado de intercalar las dos primeras en el orden establecido por la función (es decir, que la función se aplica a los dos elementos que se comparan en cada momento para determinar cuál es el mayor).

-- intercalarSegun : combina dos listas usando una función de comparación.
intercalarSegun : List Int -> List Int -> (Int -> Int -> Bool) -> List Int
intercalarSegun lista1 lista2 fx =
    case (lista1, lista2) of
        ([], _) ->
            lista2  -- si la primera está vacía, devuelvo la segunda

        (_, []) ->
            lista1  -- si la segunda está vacía, devuelvo la primera

        (x :: xs, y :: ys) ->
            if fx x y then
                -- si la función dice que x va antes que y, pongo x y sigo con xs
                x :: intercalarSegun xs (y :: ys) fx
            else
                -- si no, pongo y y sigo con ys
                y :: intercalarSegun (x :: xs) ys fx

menor : Int -> Int -> Bool
menor a b = a < b
 

{-
-- Ejemplo: intercalarSegun [1,3,5] [2,4,6] menor

1. Compara 1 y 2 → 1 < 2 → True
→ [1 | intercalarSegun [3,5] [2,4,6] menor]

2. Compara 3 y 2 → 3 < 2 → False
→ [1,2 | intercalarSegun [3,5] [4,6] menor]

3. Compara 3 y 4 → 3 < 4 → True
→ [1,2,3 | intercalarSegun [5] [4,6] menor]

4. Compara 5 y 4 → False
→ [1,2,3,4 | intercalarSegun [5] [6] menor]

5. Compara 5 y 6 → True
→ [1,2,3,4,5 | intercalarSegun [] [6] menor]

6. La primera lista vacía → devuelve [6]

✅ Resultado final: [1,2,3,4,5,6]
-}

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 5.Considere que cada conjunto se representa mediante una lista. Defina funciones para simular:
-- a. Unión de conjuntos: todos los elementos de la primera lista, y después los de la segunda que no estén la en la primera

union : List Int -> List Int -> List Int -- recibe dos listas y devuelve una sola
union a b =
    case b of -- vamos a evaluar b.
        [] -> a -- si b es una lista vacía, devolvemos solo la lista a

        head :: tail ->
            if List.member head a then -- si el elemento head (de la lista b) se encuentra dentro de la lista a
                union a tail -- llama a la funcion de nuevo con solo el tail de b (evita repetidos)
            else
                union (a ++ [head]) tail -- si no lo contiene, la lista a ahora se compone del head de b 
                                         -- y llama recursivamente a union con la tail de b 
{-
union [1,2,3] [3,4,5]
→ (3 está en a) → no agrega → union [1,2,3] [4,5]
→ (4 no está)  → agrega → union [1,2,3,4] [5]
→ (5 no está)  → agrega → union [1,2,3,4,5] []
→ b vacía → devuelve [1,2,3,4,5]
-}

-- b. Intersección de conjuntos: una lista con los elementos que a y b tengan en comun.

interseccion : List Int -> List Int -> List Int -- recibe dos listas y devuelve una sola
interseccion a b =
    case a of -- vamos a evaluar a.
        [] -> [] -- si a está vacío, no hay elementos en comun. 

    head :: tail    
        if List.member head b then -- si el head de a está en la lista b (ambos tiene el mismo elemento), lo incluimos en la lista final
            head :: interseccion tail b -- incuilos el head de a, y le mandamos el tail de a y la lista b
        else 
            interseccion tail b -- si no está, simplemente sigo con el resto de a


-- c. Diferencia de conjuntos: La diferencia entre dos conjuntos A - B contiene los elementos que están en A pero no están en B.

diferenciaConjuntos : List Int -> List Int -> List Int
diferenciaConjuntos a b =
    case a of 
        [] ->
            []  -- si A está vacío, no hay diferencia

        head :: tail ->
            if List.member head b then -- si head de A está en B, lo excluyo
                diferenciaConjuntos tail b
            else -- si NO está en B, lo agrego al resultado
                head :: diferenciaConjuntos tail b

{-
diferenciaConjuntos [1,2,3,4] [3,4,5,6]
1️⃣ head = 1, List.member 1 [3,4,5,6] = False → [1 | diferenciaConjuntos [2,3,4] [3,4,5,6]]
2️⃣ head = 2, List.member 2 [3,4,5,6] = False → [2 | diferenciaConjuntos [3,4] [3,4,5,6]]
3️⃣ head = 3, List.member 3 [3,4,5,6] = True → salta
4️⃣ head = 4, List.member 4 [3,4,5,6] = True → salta
✅ Resultado final: [1,2]
-}

-- d. Diferencia simétrica de conjuntos: La diferencia simétrica entre dos conjuntos A y B contiene los elementos 
-- que están en uno o en el otro, pero no en ambos.

diferenciaSimetrica : List Int -> List Int -> List Int
diferenciaSimetrica a b =
    union (diferenciaConjuntos a b) (diferenciaConjuntos b a)

{-
diferenciaSimetrica [1,2,3,4] [3,4,5,6]

Paso 1️⃣: diferenciaConjuntos [1,2,3,4] [3,4,5,6]
→ [1,2]

Paso 2️⃣: diferenciaConjuntos [3,4,5,6] [1,2,3,4]
→ [5,6]

Paso 3️⃣: union [1,2] [5,6]
→ [1,2,5,6]

✅ Resultado final: [1,2,5,6]
-}

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 4) Escriba una función aplanarLista que reciba una lista de listas y devuelva una sola lista con todos los elementos concatenados.

aplanarLista : List (List a) -> List a -- singifica que recibe una lista cuyo tipo o contenido son listas
aplanarLista lista =
    case lista of
        [] ->
            []  -- Si está vacía, no hay nada que aplanar

        head :: tail ->
            -- Concateno la primera sublista (head)
            -- con el resultado de aplanar el resto (tail)
            head ++ (aplanarLista tail)

{-
Lista: [[1,2],[3,4],[5]]

Llamada 1: aplanarLista [[1,2],[3,4],[5]]
  head = [1,2]
  tail = [[3,4],[5]]
  → [1,2] ++ aplanarLista [[3,4],[5]]

Llamada 2: aplanarLista [[3,4],[5]]
  head = [3,4]
  tail = [[5]]
  → [3,4] ++ aplanarLista [[5]]

Llamada 3: aplanarLista [[5]]
  head = [5]
  tail = []
  → [5] ++ aplanarLista []

Llamada 4: aplanarLista []
  → []

Desenrollando los resultados:
  Llamada 4: [] 
  Llamada 3: [5] ++ [] = [5]
  Llamada 2: [3,4] ++ [5] = [3,4,5]
  Llamada 1: [1,2] ++ [3,4,5] = [1,2,3,4,5]

✅ Resultado final: [1,2,3,4,5]
-}