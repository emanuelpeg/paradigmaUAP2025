%1. Conversión de temperatura
ctf(C, F) :-
    F is C *9/5 + 32.

ftc(F, C) :-
    C is (F - 32) * 5/9.

%2. Recursión - vuelos
flight(neuquen, bsas, 100).
flight(bsas, parana, 70).
flight(bsas, rosario, 55).
flight(paris, madrid, 120).
flight(madrid, athens, 180).

direct_flight(A, B) :-
    flight(A, B, _). 

reachable(A, B) :-
    reachable(A, B, []).
       
reachable(A, B, _) :-
    direct_flight(A, B), !.

reachable(A, B, V) :-
    direct_flight(A, C),
    \+ member(C, V),
    reachable(C, B, [A|V]).

%3. Operador de corte - Piedra papel o tijera
beats(rock, scissors).
beats(scissors, paper).
beats(paper, rock).

winner(X, X, empate) :- !.
winner(A, B, player1) :- beats(A, B), !.
winner(_, _, player2).

play_game(_Name1, Pick1, _Name2, Pick2, empate) :-
    Pick1 == Pick2, !.

play_game(Name1, Pick1, _Name2, Pick2, Name1) :-
    beats(Pick1, Pick2), !.

play_game(_Name1, _Pick1, Name2, _Pick2, Name2).

%4. Operador de corte - Descuentos 
%Sin operador de corte
discount_without_cut(Amount, 0.20) :-
    Amount >= 1000.

discount_without_cut(Amount, 0.10) :-
    Amount >= 500.

discount_without_cut(_, 0.05).

%Con operador de corte
discount_with_cut(Amount, 0.20) :-
    Amount >= 1000, !.

discount_with_cut(Amount, 0.10) :-
    Amount >= 500, !.

discount_with_cut(_, 0.05).

%6. Temperaturas y viceversa -revisar
temperature(celsius(C), fahrenheit(F)) :-
    nonvar(C), !,
    F is C * 9/5 + 32.

temperature(celsius(C), fahrenheit(F)) :-
    nonvar(F), !,
    C is (F - 32) * 5/9.










