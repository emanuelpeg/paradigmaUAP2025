% === 1. Conversión de temperatura ===
celsius_to_fahrenheit(C, F) :-
    F is (C * 9/5) + 32.

fahrenheit_to_celsius(F, C) :-
    C is (F - 32) * 5/9.

% === 2. Vuelos ===
flight(london, paris, 70).
flight(paris, athens, 180).
flight(london, madrid, 150).
flight(madrid, athens, 200).
flight(berlin, paris, 100).

direct_flight(C1, C2) :-
    flight(C1, C2, _).

reachable(C1, C2) :-
    direct_flight(C1, C2).
reachable(C1, C2) :-
    flight(C1, X, _),
    reachable(X, C2).

% === 3. Piedra, papel, tijera ===
beats(rock, scissors).
beats(scissors, paper).
beats(paper, rock).

winner(M1, M2, player1) :- beats(M1, M2), !.
winner(M1, M2, player2) :- beats(M2, M1), !.
winner(M, M, draw) :- !.

play_game(P1, M1, P2, M2, Winner) :-
    winner(M1, M2, R),
    ( R = player1 -> Winner = P1
    ; R = player2 -> Winner = P2
    ; Winner = draw ).
?- play_game(ana, rock, luis, scissors, Winner).
Winner = ana.

?- play_game(ana, paper, luis, paper, Winner).
Winner = draw.



% === 4. Descuentos ===
discount_without_cut(M, 20) :- M >= 1000.
discount_without_cut(M, 10) :- M >= 500.
discount_without_cut(M, 5)  :- M >= 0.

discount_with_cut(M, 20) :- M >= 1000, !.
discount_with_cut(M, 10) :- M >= 500, !.
discount_with_cut(M, 5)  :- M >= 0, !.



total_con_descuento(Monto, Total) :-
    discount_with_cut(Monto, Porcentaje),
    Descuento is Monto * Porcentaje / 100,
    Total is Monto - Descuento.
?- total_con_descuento(1200, T).
T = 960.0.

% === 5. Temperatura bidireccional ===
temperature(celsius(C), fahrenheit(F)) :-
    nonvar(C), !, F is (C * 9/5) + 32.
temperature(celsius(C), fahrenheit(F)) :-
    nonvar(F), C is (F - 32) * 5/9.