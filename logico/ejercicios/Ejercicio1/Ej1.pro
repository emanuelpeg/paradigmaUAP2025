celsius_to_fahrenheit(C, F) :-
    number(C),
    F is C * 9.0 / 5.0 + 32.0.

celsius_to_fahrenheit(C, F) :-
    number(F),
    C is (F - 32.0) * 5.0 / 9.0.

temperatura(C, F) :-
    celsius_to_fahrenheit(C, F).

vuelo(london, paris, 60).
vuelo(paris, athens, 180).
vuelo(london, berlin, 120).
vuelo(berlin, athens, 150).

direct_flight(A, B) :-
    vuelo(A, B, _).

reachable(A, B) :-
    vuelo(A, B, _).

reachable(A, B) :-
    vuelo(A, C, _),
    A \= B,
    reachable(C, B).

gana_a(piedra, tijera).
gana_a(tijera, papel).
gana_a(papel, piedra).

jugada_valida(piedra).
jugada_valida(papel).
jugada_valida(tijera).

winner(Choice, Choice, empate) :-
    jugada_valida(Choice).

winner(Choice1, Choice2, jugador1) :-
    gana_a(Choice1, Choice2).

winner(Choice1, Choice2, jugador2) :-
    gana_a(Choice2, Choice1).

winner(Choice1, Choice2, invalido) :-
    \+ jugada_valida(Choice1) ; \+ jugada_valida(Choice2).

play_game(Player1, Choice1, _, Choice2, Player1) :-
    winner(Choice1, Choice2, jugador1).

play_game(_, Choice1, Player2, Choice2, Player2) :-
    winner(Choice1, Choice2, jugador2).

play_game(_, Choice1, _, Choice2, empate) :-
    winner(Choice1, Choice2, empate).

play_game(_, Choice1, _, Choice2, invalido) :-
    winner(Choice1, Choice2, invalido).

discount_without_cut(Amount, 0.20) :-
    Amount >= 1000.

discount_without_cut(Amount, 0.10) :-
    Amount >= 500.

discount_without_cut(Amount, 0.05) :-
    Amount < 500.

discount_with_cut(Amount, 0.20) :-
    Amount >= 1000,
    !.

discount_with_cut(Amount, 0.10) :-
    Amount >= 500,
    !.

discount_with_cut(_, 0.05).

epsilon(1e-9).

temperatura_verificar(C, F) :-
    nonvar(C), nonvar(F),
    celsius_to_fahrenheit(C, ExpectedF),
    epsilon(E),
    AbsDiff is abs(ExpectedF - F),
    AbsDiff < E,
    !.

temperatura_verificar(C, F) :-
    nonvar(C), var(F),
    celsius_to_fahrenheit(C, F),
    !.

temperatura_verificar(C, F) :-
    var(C), nonvar(F),
    celsius_to_fahrenheit(C, F),
    !.

temperatura_verificar(_, _) :-
    throw(error(value_error(inconsistent_or_missing_temperature), _)).