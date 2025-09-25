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
        , seed = 325145855876890
        , processes = 16
        , globs =
            []
        , paths =
            [ "C:\\Users\\JEAN\\OneDrive\\Escritorio\\Jean\\UAP\\paradigmas_de_programacion\\paradigmaUAP2025\\tests\\Example.elm"
            ]
        }
        [ ( "Example"
          , [ Test.Runner.Node.check Example.suite
            ]
          )
        ]