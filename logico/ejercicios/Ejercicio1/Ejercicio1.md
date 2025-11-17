% ================================================================
% 1. CONVERSIÓN DE TEMPERATURA
% ================================================================

% Celsius a Fahrenheit
celsius_to_fahrenheit(C, F) :-
    F is C * 9 / 5 + 32.

% Fahrenheit a Celsius
fahrenheit_to_celsius(F, C) :-
    C is (F - 32) * 5 / 9.



% ================================================================
% 2. RECURSIÓN – VUELOS
% ================================================================

% Ejemplos de vuelos (podés agregar más si el profe lo pide)
flight(london, paris, 60).
flight(paris, rome, 120).
flight(rome, athens, 90).
flight(london, madrid, 140).
flight(madrid, rome, 150).

% Vuelo directo en cualquier sentido
direct_flight(A, B) :-
    flight(A, B, _).
direct_flight(A, B) :-
    flight(B, A, _).

% Una ciudad es alcanzable si:
% - hay vuelo directo, o
% - hay vuelo a una ciudad intermedia y desde ahí se puede llegar
reachable(A, B) :-
    direct_flight(A, B).
reachable(A, B) :-
    direct_flight(A, C),
    reachable(C, B).



% ================================================================
% 3. PIEDRA – PAPEL – TIJERA (con corte)


% Qué le gana a qué
beats(rock, scissors).
beats(scissors, paper).
beats(paper, rock).

% Determinar ganador usando corte
winner(X, X, draw) :- !.
winner(P1, P2, player1) :-
    beats(P1, P2), !.
winner(_, _, player2).

% Juego completo
play_game(Name1, Move1, Name2, Move2, WinnerName) :-
    winner(Move1, Move2, draw), !,
    WinnerName = draw.

play_game(Name1, Move1, Name2, Move2, WinnerName) :-
    winner(Move1, Move2, player1), !,
    WinnerName = Name1.

play_game(Name1, _, Name2, _, WinnerName) :-
    WinnerName = Name2.



% ================================================================
% 4. DESCUENTOS (con y sin corte)
% ================================================================

% Sin usar corte (backtracking incorrecto)
discount_without_cut(Amount, 0.20) :-
    Amount >= 1000.
discount_without_cut(Amount, 0.10) :-
    Amount >= 500.
discount_without_cut(_, 0.05).

% Usando corte (correcto)
discount_with_cut(Amount, 0.20) :-
    Amount >= 1000, !.
discount_with_cut(Amount, 0.10) :-
    Amount >= 500, !.
discount_with_cut(_, 0.05).



% ================================================================
% 6. TEMPERATURAS BIDIRECCIONAL – CON CORTE Y NONVAR
% ================================================================

% Si la temperatura en Celsius está instanciada, convierto a Fahrenheit
temperature(celsius(C), fahrenheit(F)) :-
    nonvar(C), !,
    F is C * 9 / 5 + 32.

% Si la de Fahrenheit está instanciada, convierto a Celsius
temperature(celsius(C), fahrenheit(F)) :-
    nonvar(F), !,
    C is (F - 32) * 5 / 9.
