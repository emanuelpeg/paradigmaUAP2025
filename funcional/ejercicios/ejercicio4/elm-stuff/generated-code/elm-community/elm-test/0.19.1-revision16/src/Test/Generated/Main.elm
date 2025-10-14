module Test.Generated.Main exposing (main)

import Example

import Test.Reporter.Reporter exposing (Report(..))
import Console.Text exposing (UseColor(..))
import Test.Runner.Node
import Test

main : Test.Runner.Node.TestProgram
main =
    Test.Runner.Node.run
        { runs = 100
        , report = ConsoleReport UseColor
        , seed = 202359092776883
        , processes = 8
        , globs =
            []
        , paths =
            [ "C:\\Users\\Samu\\Documents\\2do Año\\Paradigmas de Programación\\paradigmaUAP2025\\funcional\\ejercicios\\ejercicio4\\tests\\Example.elm"
            ]
        }
        [ ( "Example"
          , [ Test.Runner.Node.check Example.suite
            ]
          )
        ]