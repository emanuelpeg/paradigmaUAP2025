celsius_to_fahrenheit(C, F) :- F is C * 9/5 + 32.
fahrenheit_to_celsius(F, C) :- C is (F - 32) * 5/9.

flight(london, paris, 75).
flight(paris, moscow, 120).
flight(moscow, istanbul, 90).

direct_flight(A, B) :- flight(A, B, _).

reachable(A, B) :- 
    direct_flight(A, B).
reachable(A, B) :- 
    direct_flight(A, X), reachable(X, B).

beats(rock, scissors).
beats(scissors, paper).
beats(paper, rock).

winner(P1, P2, player1) :- 
    beats(P1, P2), !.
winner(P1, P2, player2) :- 
    beats(P2, P1), !.
winner(_, _, draw).

play_game(Name1, Move1, Name2, Move2, Name1) :- 
    winner(Move1, Move2, player1), !.
play_game(Name1, Move1, Name2, Move2, Name2) :- 
    winner(Move1, Move2, player2), !.
play_game(_, _, _, _, draw).

discount_without_cut(Cut, R) :- 
    Cut >= 1000, R is Cut * 0.80.
discount_without_cut(Cut, R) :- 
    Cut >= 500, R is Cut * 0.90.
discount_without_cut(Cut, R) :- 
    R is Cut * 0.95.

discount_with_cut(Cut, R) :- 
    Cut >= 1000, R is Cut * 0.80, !.
discount_with_cut(Cut, R) :- 
    Cut >= 500, R is Cut * 0.90, !.
discount_with_cut(Cut, R) :- 
    R is Cut * 0.95.

temperature(celsius(C), fahrenheit(F)) :- nonvar(C), !, F is C * 9/5 + 32.
temperature(celsius(C), fahrenheit(F)) :- nonvar(F), !, C is (F - 32) * 5/9.
