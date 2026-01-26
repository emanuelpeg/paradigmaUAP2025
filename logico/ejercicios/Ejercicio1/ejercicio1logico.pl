% Ejercicio 1: Conversión de temperatura
% Formula: F = C * 9/5 + 32

celsius_to_fahrenheit(C, F) :-
    F is C * 9 / 5 + 32.

fahrenheit_to_celsius(F, C) :-
    C is (F - 32) * 5 / 9.


% Ejercicio 2

flight(london, paris, 80).
flight(paris, athens, 180).
flight(london, berlin, 90).
flight(berlin, athens, 150).
flight(madrid, barcelona, 75).

% Veo si hay vuelos directos entre 2 ciudades
direct_flight(City1, City2) :-
    flight(City1, City2, _).

% Veo si se puede llegar de una ciudad a otra (con o sin conexiones)
reachable(City1, City2) :-
    flight(City1, City2, _).

reachable(City1, City2) :-
    flight(City1, CityIntermedia, _),
    reachable(CityIntermedia, City2).


% Ejercicio 3

% Defino qué le gana a qué
beats(rock, scissors).
beats(scissors, paper).
beats(paper, rock).

winner(Choice1, Choice2, player1) :-
    beats(Choice1, Choice2), !.

winner(Choice1, Choice2, player2) :-
    beats(Choice2, Choice1), !.

winner(_, _, draw).


play_game(Name1, Choice1, Name2, Choice2, Name1) :-
    beats(Choice1, Choice2), !.

play_game(Name1, Choice1, Name2, Choice2, Name2) :-
    beats(Choice2, Choice1), !.

play_game(_, _, _, _, draw).


% Ejercicio 4

% Version sin corte
discount_without_cut(Amount, 0.20) :-
    Amount >= 1000.

discount_without_cut(Amount, 0.10) :-
    Amount >= 500.

discount_without_cut(_, 0.05).

% Version con corte
discount_with_cut(Amount, 0.20) :-
    Amount >= 1000, !.

discount_with_cut(Amount, 0.10) :-
    Amount >= 500, !.

discount_with_cut(_, 0.05).


% Ejercicio 6

temperature(celsius(C), fahrenheit(F)) :-
    nonvar(C), !,
    F is C * 9 / 5 + 32.

temperature(celsius(C), fahrenheit(F)) :-
    nonvar(F), !,
    C is (F - 32) * 5 / 9.
