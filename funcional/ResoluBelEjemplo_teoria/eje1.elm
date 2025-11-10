-- Ejercicio 1: Escriba una función llamada “Cantidad” que devuelva la cantidad de elementos de una lista.
--Estructura general de una función con case

nombreFuncion : tipoEntrada -> tipoSalida
nombreFuncion parametro =
    case parametro of
        opcion1 -> resultado1 --caso base
        opcion2 -> resultado2 --caso recursivo
main =
    nombreFuncion [lista o valor]

--Estructura general de Elm en condicionales:
if condicion then --then: entonces
    algo
else
    otraCosa
--como se recorre una lista en Elm


--ejemplo de condicional:

if x > 5 then
    "Grande"
else
    "Chico"

--1. Definimos el tipo de la función
cantidad : List a -> int
cantidad lista =
    case lista of
        [] -> 0 -- si esta vacia tiene cero elementos
        _ :: cola -> 1 + cantidad cola


--3. main
main =
    cantidad [10,20,30]

--Ejercicio 2:  Escriba una función llamada “Sumatoria” que devuelva la suma de elementos de una lista. 

sumatoria : List int -> int
sumatoria listaSumados =
    case listaSumados of
        [] -> 0
        x :: cola -> x + sumatoria cola

main =
    sumatoria [10, 20, 30, 40]

--Ejercicio 3: Realice una función que devuelva el i-ésimo elemento de una lista.
--en Elm no hay como q indices definidos, asi que por lo general el primer elemento suele ser = 1

funcionI_esimo : Int -> List Int -> Int
funcionI_esimo i listaElementos =
    case listaElementos of
        [] -> 0
        x :: cola -> 

            if i == 1 then 
                x
            else 
                funcionI_esimo (i-1) cola
main =
    funcionI_esimo 3 [10, 20, 30, 40, 50]


--Ejercicio 4:  Elimine el i-ésimo elemento de una lista.
funcionEliminar : int -> List int -> List int
funcionEliminar i listaElementos =
    case listaElementos of
        [] -> []
        x :: cola ->
            if i == 1 then
                cola
            else
                x :: funcionEliminar (i - 1) cola
main =
funcionEliminar 2 [10, 20, 30, 40, 50]

--Ejercicio 5:  Escriba una función llamada “Existe” que indique si un objeto se encuentra dentro de una lista determinada. 
existe : a -> List a -> Bool
existe obj listaObjetos =
    case listaObjetos of
        [] -> false
        x :: cola ->
            if obj == x then
                True
            else
                existe obj cola

--Ejercicio 6:  Escriba una función que determine la Media de una lista de números. 
promedio : List Int -> Float
promedio lista =
    let
        aux lista suma cant =
            case lista of
                [] ->
                    (suma, cant)

                x :: cola ->
                    aux cola (suma + x) (cant + 1)

        (sumaTotal, cantTotal) = aux lista 0 0
    in
    if cantTotal == 0 then
        0
    else
        toFloat sumaTotal / toFloat cantTotal

main = promedio [9,8,7,6,10]

--Ejercicio 7:  Agregue un elemento a una lista en una posición dada. 
agregarElemento : int -> int -> List int -> List int
agregarElemento p n listaElementos =
    case listaElementos of
        [] -> [n]
        x :: cola -> 
            if x == p then
                cola + x

--Ejercicio 8:  Agregue un elemento a una lista ordenada, en el lugar que le corresponda. 
{-
    numero a agregar: 4
    lista [2,3,5,6]
CASO BASE: si la lista es vacia le inserto el nuevo numero
CASO RECURSIVO: Si la lista tiene cabeza y tiene cola entonces entonces
vemos dos condiciones: 
si la cabeza = numero a agregar entonces entonces devolveme la cabeza
si no es asi, recorre la lista y si la cabeza actual < elemento a agregar
-}