% 1
celsiusFahrenheit(X, Y):-
    Y is X * (9 / 5) + 32.

fahrenheitCelsius(X,Y):-
    Y is (X - 32) * (5 / 9).

% 2
flight(cordoba, buenos_aires, 120).
flight(buenos_aires, mendoza, 360).
flight(mendoza, cordoba, 60).
flight(santa_fe, cordoba, 60).
flight(buenos_aires, santa_fe, 120).

direct_flight(Ciudad1, Ciudad2):-
    flight(Ciudad1, Ciudad2, _).
    
reachable(Ciudad1, Ciudad2):-
    direct_flight(Ciudad1, Ciudad2).
reachable(Ciudad1, Ciudad2):-
    direct_flight(Ciudad1, CiudadX),
    direct_flight(CiudadX, Ciudad2).

% 3
beats(papel, piedra).
beats(piedra, tijeras).
beats(tijeras, papel).

winner(Eleccion, Eleccion, draw):-
    !.
winner(Eleccion1, Eleccion2, player1):-
    beats(Eleccion1, Eleccion2),
    !.
winner(Eleccion1, Eleccion2, player2):-
    beats(Eleccion2, Eleccion1),
    !.

play_game(_, Eleccion, _, Eleccion, draw).
play_game(Player1, Eleccion1, _, Eleccion2, Player1):-
    beats(Eleccion1, Eleccion2),
    !.
play_game(_, Eleccion1, Player2, Eleccion2, Player2):-
    beats(Eleccion2, Eleccion1),
    !.

% 4
discount_without_cut(Monto, Monto_descuento):-
    Monto >= 1000,
    Monto_descuento is Monto * 0.8.
discount_without_cut(Monto, Monto_descuento):-
    Monto >= 500,
    Monto_descuento is Monto * 0.9.
discount_without_cut(Monto, Monto_descuento):-
    Monto < 500,
    Monto_descuento is Monto * 0.95.
% Devuelve más soluciones de las que debería, y encima son incorrectas

discount_with_cut(Monto, Monto_descuento):-
    Monto >= 1000,
    Monto_descuento is Monto * 0.8,
    !.
discount_with_cut(Monto, Monto_descuento):-
    Monto >= 500,
    Monto_descuento is Monto * 0.9,
    !.
discount_with_cut(Monto, Monto_descuento):-
    Monto < 500,
    Monto_descuento is Monto * 0.95,
    !.
% Con el operador de corte se evitan calculos innecesarios e incorrectos

% 6
temperature(celsius(C), fahrenheit(F)):-
    nonvar(C),
    F is (C * 9/5) + 32,
    !.
temperature(celsius(C), fahrenheit(F)):-
    nonvar(F),
    C is (F - 32) * 5/9,
    !.