-- 1 y 2 hechas.

--3. Escriba una función llamada "Cantidad-de" que toma como argumentos una lista y una condición (función), y  devuelve la cantidad de elementos de la lista que cumplen con dicha condición.
cantidadDe : List Int -> (Int -> Bool) -> Int --Recibe una funcion que a su vez la funcion recibe un entero y devuelve un booleano
cantidadDe lista fx =
    case lista of
        [] ->
            0
        x :: xs ->
            if fx x then --con fx ya estoy llamando la funcion fx y pasandole x como parametro
                1 + cantidadDe xs fx
            else 
                cantidadDe xs fx

cantidadDe [1,2,3,4,5] (\x -> x > 3) --ejemplo, la condicion es que el elemento sea menor a 3, \ significa funcion anonima y x el parametro.

--4. Defina una función que tome una lista de números y una condición (función) como parámetros y devuelva la sumatoria de los elementos que cumplen dicha condición.
cantidadDe : List Int -> (Int -> Bool) -> Int
cantidadDe lista fx =
    case lista of
        [] ->
            0
        x :: xs ->
            if fx x then --con fx ya estoy llamando la funcion fx y pasandole x como parametro
                x + cantidadDe xs fx
            else 
                cantidadDe xs fx

--5. Escriba una función llamada “intercalar-según” que tome dos listas y una función como entrada, y construya una nueva lista resultado de intercalar las dos primeras en el orden establecido por la función (es decir, que la función se aplica a los dos elementos que se comparan en cada momento para determinar cuál es el mayor).
intercalarSegun : List Int -> List Int -> (Int -> Int -> Bool) -> List Int
intercalarSegun lista1 lista2 fx =
    case (lisa1, lista2) of 
        ([], ys) ->
            ys --Si la primera esta vacia, devolvemos la segunda
        (xs, []) ->
            xs
        (x :: xs, y :: ys) ->
            if fx x y then --Si la funcion dice que x va antes que y, osea que es mayor
                x :: intercalarSegun xs (y :: ys) fx
            else
                y :: intercalarSegun (x:: xs) ys fx

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 6.Considere que cada conjunto se representa mediante una lista. Defina funciones para simular:

-- a. Unión de conjuntos: todos los elementos de la primera lista, y después los de la segunda que no estén la en la primera
union : List comparable -> List comparable -> List comparable
union lista1 lista2 =
    lista1 ++ List.filter (\x -> not (List.member x lista1)) lista2
    --Basicamente quiere decir “Uní lista1 con los elementos de lista2 que no estén ya en lista1.”

-- b. Intersección de conjuntos: solo los elementos comunes entre los dos conjuntos.
interseccion : List Int -> List Int -> List Int -- recibe dos listas y devuelve una sola
interseccion lista1 lista2 =
        List.filter (\x -> List.member x lista2) lista1

-- c. Diferencia de conjuntos: La diferencia A − B contiene los elementos que están en A pero no en B.
diferencia : List Int -> List Int -> List Int
diferencia lista1 lista2 =
    List.filter(\x -> not (List.member x lista2)) lista1

-- d. Diferencia simétrica de conjuntos: contiene los elementos que están en A o en B, pero no en ambos.
diferenciaSimetrica : List Int -> List Int -> List Int
diferenciaSimetrica lista1 lista2 =
    (diferencia lista1 lista2) ++ (diferencia lista2 lista1)

{-
--Forma recursiva

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
    
-}      