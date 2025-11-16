% 1. Conversión de temperatura

% Pasa de Celsius a Fahrenheit
celsius_to_fahrenheit(C, F) :-
    F is C * 9 / 5 + 32.

% Pasa de Fahrenheit a Celsius
fahrenheit_to_celsius(F, C) :-
    C is (F - 32) * 5 / 9.


% 2. Recursión - vuelos

% Base de datos simple para probar
flight(london, paris, 80).
flight(paris, rome, 120).
flight(rome, athens, 150).
flight(london, madrid, 140).
flight(madrid, rome, 150).

% Vuelo directo en un solo tramo
direct_flight(A, B) :-
    flight(A, B, _);
    flight(B, A, _).

% Llegar de una ciudad a otra (conexiones permitidas)
reachable(A, B) :-
    direct_flight(A, B).

reachable(A, B) :-
    direct_flight(A, X),
    reachable(X, B).


% 3. Piedra - papel - tijera (con corte)

% Qué le gana a qué
beats(rock, scissors).
beats(scissors, paper).
beats(paper, rock).

% Determina el ganador entre dos elecciones
winner(X, Y, player1) :-
    beats(X, Y), !.

winner(X, Y, player2) :-
    beats(Y, X), !.

winner(_, _, draw).

% Jugar con nombres reales
play_game(Player1, Choice1, Player2, Choice2, Winner) :-
    winner(Choice1, Choice2, Res),
    (
        Res = player1 -> Winner = Player1 ;
        Res = player2 -> Winner = Player2 ;
        Winner = draw
    ).


% 4. Descuentos: con corte y sin corte


% Versión sin corte (puede dar varias respuestas)
discount_without_cut(Monto, 0.20) :-
    Monto >= 1000.

discount_without_cut(Monto, 0.10) :-
    Monto >= 500.

discount_without_cut(_, 0.05).

% Versión correcta con corte
discount_with_cut(Monto, 0.20) :-
    Monto >= 1000, !.

discount_with_cut(Monto, 0.10) :-
    Monto >= 500, !.

discount_with_cut(_, 0.05).



% 6. Predicado bidireccional temperature/2

temperature(celsius(C), fahrenheit(F)) :-
    nonvar(C), !,
    F is C * 9 / 5 + 32.

temperature(celsius(C), fahrenheit(F)) :-
    nonvar(F), !,
    C is (F - 32) * 5 / 9.
