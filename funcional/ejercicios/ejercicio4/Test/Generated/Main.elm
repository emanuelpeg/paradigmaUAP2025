module Test.Generated.Main exposing (main)

import Clase4Test

import Test.Reporter.Reporter exposing (Report(..))
import Console.Text exposing (UseColor(..))
import Test.Runner.Node
import Test

main : Test.Runner.Node.TestProgram
main =
    Test.Runner.Node.run
        { runs = 100
        , report = ConsoleReport UseColor
        , seed = 381709438093649
        , processes = 8
        , globs =
            []
        , paths =
            [ "C:\\Users\\Samu\\Documents\\2do Año\\Paradigmas de Programación\\paradigmaUAP2025\\funcional\\ejercicios\\ejercicio4\\tests\\Clase4Test.elm"
            ]
        }
        [ ( "Clase4Test"
          , [ Test.Runner.Node.check Clase4Test.suite
            ]
          )
        ]