import Html

-- Cuenta elementos usando foldl
cantidad : List Int -> Int
cantidad lista =
    List.foldl (\elem acum -> acum + 1) 0 lista

-- Cuenta elementos usando recursión (versión genérica)
cantidad2 : List a -> Int -> Int
cantidad2 l acu =
    case l of
        [] ->
            acu

        primero :: resto ->
            cantidad2 resto (acu + 1)

-- Suma todos los elementos
sumatoria : List Int -> Int
sumatoria lista =
    List.foldl (\elem acum -> acum + elem) 0 lista

-- Devuelve el i-ésimo elemento (0-indexed), o Nothing si no existe
enecimo_elemento : Int -> List a -> Maybe a
enecimo_elemento i lista =
    case lista of
        [] ->
            Nothing

        h :: t ->
            if i == 0 then
                Just h
            else
                enecimo_elemento (i - 1) t

-- Elimina el i-ésimo elemento de una lista
eliminarEn : Int -> List a -> List a
eliminarEn i lista =
    case lista of
        [] ->
            []

        h :: t ->
            if i == 0 then
                t
            else
                h :: eliminarEn (i - 1) t

-- Punto de entrada
main : Html.Html msg
main =
    let
        lista = [6, 5, 2, 4, 43, 3, 1, 8, 7, 6, 5, 76, 5]
        resultado = cantidad2 lista 0
        sum = sumatoria lista
        elem = enecimo_elemento 10 lista
        resultadop = eliminarEn 10 lista
    in
    Html.pre []
        [ Html.text <|
            String.join "\n"
                [ "el pepe dio " ++ String.fromInt resultado ++ " porque es boludo"
                , "el pepe sumo todo y le dio " ++ String.fromInt sum ++ " en total"
                , "el elemento en la posición 10 es: " ++ (Maybe.map String.fromInt elem |> Maybe.withDefault "no existe")
                , "Lista original: " ++ Debug.toString lista
                , "Sin el elemento en posición 10: " ++ Debug.toString resultadop
                ]
        ]