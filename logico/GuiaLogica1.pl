% Conversión de temperatura

celsius_to_fahrenheit(C, F) :-
    F is C * 9/5 + 32.

fahrenheit_to_celsius(F, C) :-
    C is (F - 32) * 5/9.

% Recursión - vuelos
flight(london, paris, 75).
flight(paris, rome, 120).
flight(rome, athens, 90).
flight(london, madrid, 140).
flight(madrid, rome, 150).

direct_flight(C1, C2) :-
    flight(C1, C2, _).

reachable(From, To) :-
    direct_flight(From, To).

reachable(From, To) :-
    direct_flight(From, Intermediate),
    reachable(Intermediate, To).

reachable(From, To) :-
    reachable_helper(From, To, []).

reachable_helper(From, To, _) :-
    direct_flight(From, To).

reachable_helper(From, To, Visited) :-
    direct_flight(From, Intermediate),
    \+ member(Intermediate, Visited),
    reachable_helper(Intermediate, To, [Intermediate | Visited]).

% Operador de corte - Piedra papel o tijera
beats(piedra, tijera).
beats(papel, piedra).
beats(tijera, papel).

winner(E, E, draw) :- 
    !.

winner(E1, E2, player1) :-
    beats(E1, E2),
    !.

winner(_, _, player2).

play_game(Nombre1, Eleccion1, Nombre2, Eleccion2, GanadorFinal).

play_game(Name1, E1, Name2, E2, WinnerName) :-
    winner(E1, E2, Resultado),
    decide_name(Resultado, Name1, Name2, WinnerName).

decide_name(draw, _, _, draw).
decide_name(player1, Name1, _, Name1).
decide_name(player2, _, Name2, Name2).

% Operador de corte - Descuentos
discount_without_cut(Monto, 0.20) :-
    Monto >= 1000.

discount_without_cut(Monto, 0.10) :-
    Monto >= 500.

discount_without_cut(_, 0.05).

discount_with_cut(Monto, 0.20) :-
    Monto >= 1000,
    !.

discount_with_cut(Monto, 0.10) :-
    Monto >= 500,
    !.

discount_with_cut(_, 0.05).

% Temperaturas y viceversa
temperature(celsius(C), fahrenheit(F)) :-
    nonvar(C),
    !,
    F is C * 9/5 + 32.

temperature(celsius(C), fahrenheit(F)) :-
    nonvar(F),
    !,
    C is (F - 32) * 5/9.
