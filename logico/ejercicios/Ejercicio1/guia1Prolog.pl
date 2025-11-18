celsius_to_fahrenheit(C,F):-
    F is C*9/5+32.

fahrenheit_to_celsius(F,C):-
    C is (F-32)*5/9.

flight(london,paris,124).
flight(paris,athens,456).

direct_flight(X,Y):-
    flight(X,Y,_Z).
reachable(X,Y):- 
	flight(X,Y,_).
reachable(X,Y):-
   	flight(X,Z,_),reachable(Z,Y).

wins(piedra,tijeras).
wins(tijeras,papel).
wins(papel,piedra).

beats(X,Y):-
    wins(X,Y),!.

winner(X, Y, player1) :- 
    beats(X, Y), !.
winner(X, Y, player2) :- 
    beats(Y, X), !.
winner(X, X, empate).

play_game(P1,X,_,Y,Z):-
    beats(X,Y),!,Z = P1.
play_game(_,X,P2,Y,Z):-
    beats(Y,X),!,Z = P2.
play_game(P1,X,P2,Y,Z):-
    X==Y,Z = empate.

discount_without_cut(X,Y):-
    X<500,Y is X*0.95.
discount_without_cut(X,Y):-
    X<1000,Y is X*0.95.
discount_without_cut(X,Y):-
    X>=1000,Y is X*0.95.

discount_with_cut(X,Y):-
    X<500,!,Y is X*0.95.
discount_with_cut(X,Y):-
    X<1000,!,Y is X*0.90.
discount_with_cut(X,Y):-
    X>=1000,!,Y is X*0.80.

temperature(celsius(C),fahrenheit(F)):-
    nonvar(F),!,C is (F-32)*5/9.
temperature(celsius(C),fahrenheit(F)):-
    nonvar(C),F is C*9/5+32.