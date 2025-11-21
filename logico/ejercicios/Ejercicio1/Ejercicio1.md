1. Conversión de temperatura

**Enunciado:** Implementá dos predicados que permitan convertir temperaturas entre grados Celsius y Fahrenheit. El predicado `celsius_to_fahrenheit/2` debe recibir una temperatura en Celsius y devolver su equivalente en Fahrenheit. El predicado `fahrenheit_to_celsius/2` debe hacer la conversión inversa.

% Queries de ejemplo:
% ?- celsius_to_fahrenheit(0, F). % F = 32.0
% ?- fahrenheit_to_celsius(212, C). % C = 100.0

```prolog
celsius_to_fahrenheit(C, F) :-
    F is C * 9/5 + 32.

fahrenheit_to_celsius(F, C) :-
    C is (F - 32) * 5/9.
```


2. Recursión - vuelos


**Enunciado:** Tenés una base de datos de vuelos directos entre ciudades, donde cada vuelo está representado como `flight(Ciudad1, Ciudad2, DuracionEnMinutos)`. Implementá dos predicados: `direct_flight/2` que verifique si existe un vuelo directo entre dos ciudades, y `reachable/2` que determine si es posible llegar de una ciudad a otra usando cualquier cantidad de conexiones (vuelos intermedios).

% Queries de ejemplo:
% ?- direct_flight(london, paris). % true
% ?- reachable(london, athens). % true

```prolog
% Base de datos de vuelos
flight(london, paris, 80).
flight(paris, rome, 120).
flight(rome, athens, 150).
flight(london, madrid, 100).
flight(madrid, rome, 140).

% Vuelo directo
direct_flight(A, B) :-
    flight(A, B, _).

% Se puede llegar desde A hasta B (con o sin conexiones)
reachable(A, B) :-
    reachable(A, B, []).

% Caso base: vuelo directo
reachable(A, B, _) :-
    direct_flight(A, B), !.

% Caso recursivo: buscar conexiones evitando ciclos
reachable(A, B, Visitados) :-
    direct_flight(A, X),
    \+ member(X, Visitados),
    reachable(X, B, [A | Visitados]).
```

3. Operador de corte - Piedra papel o tijera

**Enunciado:** Implementá el juego de piedra, papel o tijera usando el operador de corte (!). Primero definí el predicado `beats/2` que especifique qué elemento le gana a cuál. Luego creá `winner/3` que determine el resultado (player1, player2 o draw) comparando dos elecciones. Finalmente, implementá `play_game/5` que reciba los nombres de dos jugadores y sus elecciones, y devuelva el nombre del ganador (o "draw" en caso de empate).

% Queries de ejemplo:
% ?- beats(rock, scissors). % true
% ?- beats(rock, paper). % false
% ?- winner(rock, scissors, W). % W = player1
% ?- winner(paper, paper, W). % W = draw
% ?- play_game(alice, rock, bob, scissors, W). % W = alice

```prolog
% Qué le gana a qué
beats(rock, scissors).
beats(paper, rock).
beats(scissors, paper).

% Determina el ganador entre dos jugadas
winner(X, X, draw) :- !.
winner(P1, P2, player1) :- beats(P1, P2), !.
winner(_, _, player2).

% Devuelve el nombre del ganador
play_game(Name1, Move1, Name2, Move2, WinnerName) :-
    winner(Move1, Move2, Result),
    (
        Result = player1 -> WinnerName = Name1 ;
        Result = player2 -> WinnerName = Name2 ;
        WinnerName = draw
    ).
```

4. Operador de corte - Descuentos

**Enunciado:** Implementá un sistema de descuentos por escala que calcule el descuento según el monto de compra: 20% para montos mayores o iguales a $1000, 10% para montos mayores o iguales a $500, y 5% para el resto. Implementá dos versiones: `discount_without_cut/2` (sin usar el operador de corte) y `discount_with_cut/2` (usando el operador de corte). Compará el comportamiento de ambas versiones al hacer consultas y entendé por qué la versión con corte es la correcta.

% Queries de ejemplo:
% ?- discount_with_cut(1200, D).
% ?- discount_without_cut(1200, D).

```prolog
discount_with_cut(Monto, 0.20) :-
    Monto >= 1000, !.

discount_with_cut(Monto, 0.10) :-
    Monto >= 500, !.

discount_with_cut(_, 0.05).
```

6. Temperaturas y viceversa

**Enunciado:** Implementá un predicado bidireccional `temperature/2` que pueda convertir temperaturas entre Celsius y Fahrenheit en ambas direcciones. El predicado debe recibir dos argumentos con la forma `celsius(C)` y `fahrenheit(F)`, y debe funcionar correctamente sin importar cuál de las dos temperaturas esté instanciada. Usá `nonvar/1` y el operador de corte para determinar qué conversión realizar según qué variable esté definida.

% Queries de ejemplo:
% ?- temperature(celsius(100), fahrenheit(F)). % F = 212.0
% ?- temperature(celsius(C), fahrenheit(68)). % C = 20.0

```prolog
% temperature(+celsius(C), -fahrenheit(F))
% temperature(-celsius(C), +fahrenheit(F))

temperature(celsius(C), fahrenheit(F)) :-
    nonvar(C), !,
    F is C * 9/5 + 32.

temperature(celsius(C), fahrenheit(F)) :-
    C is (F - 32) * 5/9.
```