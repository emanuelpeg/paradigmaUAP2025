--Ejercicio 1:
existe : Int -> List Int -> Bool -- funcion de tipo a "generico" recibe una lista y devuelve un booleano
existe elemento lista = 
    case lista of
        [] ->
            False --si esta vacia es falsa
        x :: xs ->
            if x == elemento then
                True
            else
                existe elemento xs
--Ejercicio 2:
insertarOrdenado : comparable -> List comparable -> List comparable -- se define los tipos de la función
insertarOrdenado n lista =
    List.sort (n :: lista)

--Ejercicio 3:
cantidadDe : (a -> Bool) -> List a -> Int
cantidadDe condicion lista =
    List.length (List.filter condicion lista)

--Ejercicio 4:
sumatoriaDe : (number -> Bool) -> List number -> number
sumatoriaDe condicion lista =
    List.sum (List.filter condicion lista)


--Ejercicio 4:
intercalarSegun : (a -> comparable) -> List a -> List a -> List a
intercalarSegun criterio lista1 lista2 =
    List.sortBy criterio (List.append lista1 lista2)



--Ejercicio 5:
--A 
intercalarSegun: List a -> List a -> (a -> a -> Bool) -> List a
intercalarSegun la lb fx =
    case la of
        [] -> lb
