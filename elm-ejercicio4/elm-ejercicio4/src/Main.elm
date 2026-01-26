module Main exposing (main)

import Browser
import Guia
import Html exposing (Html, div, h1, pre, text)
import String

main : Program () () Msg
main =
    Browser.sandbox { init = (), update = \_ m -> m, view = view }

type Msg
    = NoOp

view : () -> Html Msg
view _ =
    let
        lista = [ 3, 1, 4, 1, 5, 9, 2, 6 ]
        ordenada = Guia.quickSort lista

        toStr xs =
            "[" ++ String.join ", " (List.map String.fromInt xs) ++ "]"
    in
    div []
        [ h1 [] [ text "Guía Elm – Demo" ]
        , pre [] [ text ("quickSort " ++ toStr lista ++ " = " ++ toStr ordenada) ]
        , pre [] [ text ("mediana [1,2,3,4] = " ++ String.fromInt (Guia.mediana [ 1, 2, 3, 4 ])) ]
        , pre [] [ text ("unirOfSet [1,2,3] [2,3,4] = " ++ toStr (Guia.unirOfSet [1,2,3] [2,3,4])) ]
        , pre [] [ text ("filtrarPares [1..10] = " ++ toStr (Guia.filtrarPares (List.range 1 10))) ]
        ]
