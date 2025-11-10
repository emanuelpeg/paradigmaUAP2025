
% 1. Conversión de temperatura
celsius_to_fahrenheit(C, F) :-
    F is (C * 9 / 5) + 32.

fahrenheit_to_celsius(F, C) :-
    C is (F - 32) * 5 / 9.

% Ejemplos:
% ?- celsius_to_fahrenheit(0, F).% F = 32.0
% ?- fahrenheit_to_celsius(212, C).% C = 100.0



% 2️.Recursión - Vuelos directos y alcanzables
% Base de datos de vuelos (origen, destino, duración en minutos)
flight(londres, paris, 60).
flight(paris, roma, 120).
flight(roma, atenas, 150).
flight(atenas, estambul, 90).

% Un vuelo directo existe en ambas direcciones
direct_flight(C1, C2) :-
    flight(C1, C2, _);
    flight(C2, C1, _).

% Alcanzable con una o más conexiones
reachable(C1, C2) :-
    direct_flight(C1, C2).

reachable(C1, C2) :-
    direct_flight(C1, X),
    reachable(X, C2).

% Ejemplos:
% ?- direct_flight(londres, paris).% true.
% ?- reachable(londres, atenas).% true.



% 3️.Operador de corte - Piedra, papel o tijera
% Qué elemento le gana a cuál
beats(piedra, tijeras).
beats(tijeras, papel).
beats(papel, piedra).

% Determinar ganador entre dos jugadas
winner(J1, J2, jugador1) :- beats(J1, J2), !.
winner(J1, J2, jugador2) :- beats(J2, J1), !.
winner(_, _, empate).

% Jugar con nombres de jugadores
play_game(Nombre1, Jugada1, Nombre2, Jugada2, Ganador) :-
    winner(Jugada1, Jugada2, Resultado),
    (
        Resultado = jugador1 -> Ganador = Nombre1;
        Resultado = jugador2 -> Ganador = Nombre2;
        Ganador = empate
    ).



% 4️.Operador de corte - Descuentos
% Versión sin corte
discount_without_cut(Monto, Descuento) :-
    Monto >= 1000, Descuento is 0.20.
discount_without_cut(Monto, Descuento) :-
    Monto >= 500, Descuento is 0.10.
discount_without_cut(_, 0.05).

% Versión con corte
discount_with_cut(Monto, Descuento) :-
    Monto >= 1000, !, Descuento is 0.20.
discount_with_cut(Monto, Descuento) :-
    Monto >= 500, !, Descuento is 0.10.
discount_with_cut(_, 0.05).

% Ejemplos:
% ?- discount_without_cut(1200, D).
% D = 0.20 ; D = 0.10 ; D = 0.05.
% ?- discount_with_cut(1200, D).
% D = 0.20.



% 5️.Temperaturas bidireccionales (Celsius ↔ Fahrenheit)
temperature(celsius(C), fahrenheit(F)) :-
    nonvar(C), !,
    F is (C * 9 / 5) + 32.

temperature(celsius(C), fahrenheit(F)) :-
    nonvar(F), !,
    C is (F - 32) * 5 / 9.

% Ejemplos:
% ?- temperature(celsius(100), fahrenheit(F)).% F = 212.0
% ?- temperature(celsius(C), fahrenheit(68)).% C = 20.0.
