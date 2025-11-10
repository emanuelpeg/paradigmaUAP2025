
{-
Sección Lógica
Regla 1: Escriba una regla que, dadas dos listas determine cuantos elementos iguales tienen.
Regla 2: Defina una regla que remplace un elemento por otro pasado por parámetro.
Regla 3: Defina una regla que dada una lista retorne otra lista con los primeros n elementos.

Sección funcional
Realice las siguientes funciones para list:
1) getIndex: que retorne un Maybe (tipo opcional), si encuentra el elemento en la posición dada retorna el elemento y si no Nothing.
2) foldR: que, dada una función y el valor inicial del acumulador, permita acumular todos los valores en una variable por la izquierda
3) map: que permita aplicar una función a cada elemento.
4) sort: Permite ordenar por medio de una función pasada por parámetros con el algoritmo Quicksort.
5) andThen o flatMap: implementa el operador monádico (andThen o flatMap).
6) Escriba una función que tome una lista de números y un número N, y devuelva la lista resultado de eliminar los N números mayores de la lista de entrada.
-}

-- 1) getIndex: que retorne un Maybe (tipo opcional), si encuentra el elemento en la posición dada retorna el elemento y si no Nothing.

getIndex : List a -> Int -> Maybe a
getIndex lista indice =
    case lista of
        [] ->
            Nothing -- Si la lista está vacía, no hay elemento que devolver

        x :: xs ->
            if indice == 0 then
                Just x -- Si llegamos al índice buscado, devolvemos el elemento
            else
                getIndex xs (indice - 1) -- Recorremos el resto de la lista


-- 2) foldR: que, dada una función y el valor inicial del acumulador, permita acumular todos los valores en una variable por la izquierda
existeFoldR :q