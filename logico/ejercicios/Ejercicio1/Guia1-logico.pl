% ------------------------------------------
% 1. Conversion de temperatura
% ------------------------------------------

celsius_to_fahrenheit(C, F) :-
    F is C * 9/5 + 32.

fahrenheit_to_celsius(F, C) :-
    C is (F - 32) * 5/9.



% ------------------------------------------
% 2. Recursion - vuelos
% ------------------------------------------

% Base de datos de ejemplo
flight(london, paris, 60).
flight(paris, rome, 120).
flight(rome, athens, 90).
flight(london, madrid, 150).
flight(madrid, athens, 180).

% vuelo directo (en cualquiera de los dos sentidos)
direct_flight(C1, C2) :-
    flight(C1, C2, _).

direct_flight(C1, C2) :-
    flight(C2, C1, _).

% reachable usando recursion
reachable(From, To) :-
    direct_flight(From, To).

reachable(From, To) :-
    direct_flight(From, X),
    reachable(X, To).



% ------------------------------------------
% 3. Piedra, papel o tijera (con corte)
% ------------------------------------------

beats(rock, scissors).
beats(scissors, paper).
beats(paper, rock).

winner(X, X, draw) :- !.

winner(P1, P2, player1) :-
    beats(P1, P2), !.

winner(_, _, player2).

play_game(Name1, Move1, Name2, Move2, WinnerName) :-
    winner(Move1, Move2, W),
    (
        W = player1 -> WinnerName = Name1 ;
        W = player2 -> WinnerName = Name2 ;
        W = draw     -> WinnerName = draw
    ).



% ------------------------------------------
% 4. Descuentos (con y sin corte)
% ------------------------------------------

% Sin corte (da varias respuestas)
discount_without_cut(Amount, 0.20) :-
    Amount >= 1000.

discount_without_cut(Amount, 0.10) :-
    Amount >= 500.

discount_without_cut(_, 0.05).

% Con corte (la correcta)
discount_with_cut(Amount, 0.20) :-
    Amount >= 1000, !.

discount_with_cut(Amount, 0.10) :-
    Amount >= 500, !.

discount_with_cut(_, 0.05).



% ------------------------------------------
% 5. Temperaturas bidireccional
% ------------------------------------------

temperature(celsius(C), fahrenheit(F)) :-
    nonvar(C), !,
    F is C * 9/5 + 32.

temperature(celsius(C), fahrenheit(F)) :-
    nonvar(F), !,
    C is (F - 32) * 5/9.
