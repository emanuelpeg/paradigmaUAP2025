1. Conversión de temperatura

**Enunciado:** Implementá dos predicados que permitan convertir temperaturas entre grados Celsius y Fahrenheit. El predicado `celsius_to_fahrenheit/2` debe recibir una temperatura en Celsius y devolver su equivalente en Fahrenheit. El predicado `fahrenheit_to_celsius/2` debe hacer la conversión inversa.

% Queries de ejemplo:
% ?- celsius_to_fahrenheit(0, F). % F = 32.0
% ?- fahrenheit_to_celsius(212, C). % C = 100.0

2. Recursión - vuelos

**Enunciado:** Tenés una base de datos de vuelos directos entre ciudades, donde cada vuelo está representado como `flight(Ciudad1, Ciudad2, DuracionEnMinutos)`. Implementá dos predicados: `direct_flight/2` que verifique si existe un vuelo directo entre dos ciudades, y `reachable/2` que determine si es posible llegar de una ciudad a otra usando cualquier cantidad de conexiones (vuelos intermedios).

% Queries de ejemplo:
% ?- direct_flight(london, paris). % true
% ?- reachable(london, athens). % true

3. Operador de corte - Piedra papel o tijera

**Enunciado:** Implementá el juego de piedra, papel o tijera usando el operador de corte (!). Primero definí el predicado `beats/2` que especifique qué elemento le gana a cuál. Luego creá `winner/3` que determine el resultado (player1, player2 o draw) comparando dos elecciones. Finalmente, implementá `play_game/5` que reciba los nombres de dos jugadores y sus elecciones, y devuelva el nombre del ganador (o "draw" en caso de empate).

% Queries de ejemplo:
% ?- beats(rock, scissors). % true
% ?- beats(rock, paper). % false
% ?- winner(rock, scissors, W). % W = player1
% ?- winner(paper, paper, W). % W = draw
% ?- play_game(alice, rock, bob, scissors, W). % W = alice

4. Operador de corte - Descuentos

**Enunciado:** Implementá un sistema de descuentos por escala que calcule el descuento según el monto de compra: 20% para montos mayores o iguales a $1000, 10% para montos mayores o iguales a $500, y 5% para el resto. Implementá dos versiones: `discount_without_cut/2` (sin usar el operador de corte) y `discount_with_cut/2` (usando el operador de corte). Compará el comportamiento de ambas versiones al hacer consultas y entendé por qué la versión con corte es la correcta.

% Queries de ejemplo:
% ?- discount_with_cut(1200, D).
% ?- discount_without_cut(1200, D).

wtf y el 5????? 

6. Temperaturas y viceversa

**Enunciado:** Implementá un predicado bidireccional `temperature/2` que pueda convertir temperaturas entre Celsius y Fahrenheit en ambas direcciones. El predicado debe recibir dos argumentos con la forma `celsius(C)` y `fahrenheit(F)`, y debe funcionar correctamente sin importar cuál de las dos temperaturas esté instanciada. Usá `nonvar/1` y el operador de corte para determinar qué conversión realizar según qué variable esté definida.

% Queries de ejemplo:
% ?- temperature(celsius(100), fahrenheit(F)). % F = 212.0
% ?- temperature(celsius(C), fahrenheit(68)). % C = 20.0

1)
celsius_to_fahrenheit(C, F):-
    F is C * 9/5 + 32.

fahrenheit_to_celsius(F, C):-
    C is (F - 32) * 5/9.

2)
flight(london, paris, 60).
flight(london, berlin, 110).
flight(paris, rome, 135).
flight(berlin, vienna, 80).
flight(rome, athens, 120).
flight(vienna, budapest, 45).
flight(budapest, athens, 90).
flight(madrid, lisbon, 75).

direct_flight(X, Y):-
    flight(X,Y, _).
reachable(X, Y):-
    flight(X,Y, _).
reachable(X,Y):-
    direct_flight(X,Z), reachable(Z,Y).

3)
beats(rock, scissors).
beats(scissors, paper).
beats(paper, rock).

winner(P1, P1, draw) :- !.

winner(P1, P2, player1) :- beats(P1, P2), !.

winner(_, _, player2).

play_game(Name1, P1, _Name2, P2, Name1) :-
    winner(P1, P2, player1).

play_game(_Name1, P1, Name2, P2, Name2) :-
    winner(P1, P2, player2).

play_game(_Name1, P1, _Name2, P2, 'draw') :-
    winner(P1, P2, draw).

4)
discount_without_cut(Monto, 0.20) :- Monto >= 1000.
discount_without_cut(Monto, 0.10) :- Monto >= 500.
discount_without_cut(Monto, 0.05) :- Monto < 500.

discount_with_cut(Monto, 0.20) :- Monto >= 1000, !.
discount_with_cut(Monto, 0.10) :- Monto >= 500, !.
discount_with_cut(_, 0.05).
6)
temperature(celsius(C), fahrenheit(F)) :-
    nonvar(C), !, % si F esta instanciada (tiene valor), corta. 
    F is C * 9/5 + 32.

temperature(celsius(C), fahrenheit(F)) :-
    nonvar(F), !,  % si F está instanciada (tiene valor), corta.
    C is (F - 32) * 5/9.
    