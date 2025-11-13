% 1)

celsius_to_fahrenheit(C, F) :-
    F is C * 9 / 5 + 32.

fahrenheit_to_celsius(F, C) :-
    C is (F - 32) * 5 / 9.

% 2)

flight(london, paris, 90).
flight(paris, madrid, 120).
flight(madrid, rome, 150).
flight(rome, athens, 180).
flight(london, amsterdam, 60).
flight(amsterdam, berlin, 90).
flight(berlin, prague, 60).

direct_flight(City1, City2) :-
    flight(City1, City2, _).

reachable(City1, City2) :-
    direct_flight(City1, City2).

reachable(City1, City2) :-
    direct_flight(City1, Intermediate),
    reachable(Intermediate, City2).

% 3)

beats(rock, scissors).
beats(scissors, paper).
beats(paper, rock).

winner(Choice, Choice, draw) :- !.

winner(Choice1, Choice2, player1) :-
    beats(Choice1, Choice2), !.

winner(_, _, player2).
play_game(Player1, Choice1, Player2, Choice2, Winner) :-
    winner(Choice1, Choice2, Result),
    (   Result = draw ->
        Winner = draw
    ;   Result = player1 ->
        Winner = Player1
    ;   Winner = Player2
    ).

% 4)

discount_without_cut(Amount, Discount) :-
    Amount >= 1000,
    Discount is Amount * 0.20.

discount_without_cut(Amount, Discount) :-
    Amount >= 500,
    Discount is Amount * 0.10.

discount_without_cut(Amount, Discount) :-
    Discount is Amount * 0.05.

discount_with_cut(Amount, Discount) :-
    Amount >= 1000, !,
    Discount is Amount * 0.20.

discount_with_cut(Amount, Discount) :-
    Amount >= 500, !,
    Discount is Amount * 0.10.

discount_with_cut(Amount, Discount) :-
    Discount is Amount * 0.05.

% 6)

temperature(celsius(C), fahrenheit(F)) :-
    nonvar(C), !,
    F is C * 9 / 5 + 32.

temperature(celsius(C), fahrenheit(F)) :-
    nonvar(F), !,
    C is (F - 32) * 5 / 9.
