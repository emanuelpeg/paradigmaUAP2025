%--1

celsius_to_fahrenheit(Celsius, Fahrenheit) :-
    Fahrenheit is (Celsius * 9 / 5) + 32.


fahrenheit_to_celsius(Fahrenheit, Celsius) :-
    Celsius is (Fahrenheit - 32) * 5 / 9.

%----------------------------------------------
%--2
flight(arg, francia, 180).
flight(francia, italia, 30).
flight(italia, arg, 150).
flight(arg, alemania, 190).
flight(alemania, lsm, 180).
flight(esp, francia, 110).
flight(arg, esp, 160).

direct_flight(Ciudad1, Ciudad2) :-
    flight(Ciudad1, Ciudad2, _).

reachable(Ciudad1, Ciudad2) :-
    flight(Ciudad1, Ciudad2, _).
reachable(Ciudad1, Ciudad2) :-
    flight(Ciudad1, CiudadIntermedia, _),
    reachable(CiudadIntermedia, Ciudad2).

%----------------------------------------------
%--3
beats(rock, scissors).
beats(scissors, paper).
beats(paper, rock).

winner(Choice, Choice, draw) :- !.
winner(Choice1, Choice2, player1) :-
    beats(Choice1, Choice2), !.
winner(_, _, player2).


play_game(_, Choice, _, Choice, draw) :- !.

%gana Jugador 1
play_game(Name1, Choice1, _, Choice2, Name1) :-
    beats(Choice1, Choice2), !.
play_game(_, _, Name2, _, Name2). %gana Jugador 2

%----------------------------------------------
%--4


discount_without_cut(Amount, 20) :-
    Amount >= 1000.
discount_without_cut(Amount, 10) :-
    Amount >= 500.
discount_without_cut(_, 5).


discount_with_cut(Amount, 20) :-
    Amount >= 1000, !.
discount_with_cut(Amount, 10) :-
    Amount >= 500, !.
discount_with_cut(_, 5).


%----------------------------------------------
%--5

temperature(celsius(C), fahrenheit(F)) :-
    nonvar(C),
    !,
    F is (C * 9 / 5) + 32.

temperature(celsius(C), fahrenheit(F)) :-
    nonvar(F),
    !,
    C is (F - 32) * 5 / 9.

