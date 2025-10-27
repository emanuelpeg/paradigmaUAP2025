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

6. Temperaturas y viceversa

**Enunciado:** Implementá un predicado bidireccional `temperature/2` que pueda convertir temperaturas entre Celsius y Fahrenheit en ambas direcciones. El predicado debe recibir dos argumentos con la forma `celsius(C)` y `fahrenheit(F)`, y debe funcionar correctamente sin importar cuál de las dos temperaturas esté instanciada. Usá `nonvar/1` y el operador de corte para determinar qué conversión realizar según qué variable esté definida.

% Queries de ejemplo:
% ?- temperature(celsius(100), fahrenheit(F)). % F = 212.0
% ?- temperature(celsius(C), fahrenheit(68)). % C = 20.0
