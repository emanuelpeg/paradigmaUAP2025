%Ejercicio 1
% 1. Conversion de temperatura

% Predicado para convertir Celsius a Fahrenheit
% F = (C * 9/5) + 32
celsius_to_fahrenheit(C, F) :-
    F is (C * 9 / 5) + 32.

% Predicado para convertir Fahrenheit a Celsius
% C = (F - 32) * 5/9
fahrenheit_to_celsius(F, C) :-
    C is (F - 32) * 5 / 9.

% Ejercicio 2 "Recursion - Vuelos"

% --- Base de Hechos (la "base de datos" de vuelos) ---
% (londres -> paris)
flight(londres, paris, 60).
% (paris -> atenas)
flight(paris, atenas, 180).
% (londres -> roma)
flight(londres, roma, 120).
% (roma -> atenas)
flight(roma, atenas, 90).


direct_flight(Ciudad1, Ciudad2, Minutos) :-
    flight(Ciudad1, Ciudad2, Minutos).


vuelo_directo(Origen, Destino) :-
    flight(Origen, Destino, _). 

% Caso Base: Es alcanzable A desde B si hay un vuelo directo.
alcanzable(Origen, Destino) :-
    vuelo_directo(Origen, Destino).

% Caso Recursivo: Es alcanzable A desde B si
alcanzable(Origen, Destino) :-
    vuelo_directo(Origen, PuntoIntermedio), 
    alcanzable(PuntoIntermedio, Destino).  


% Ejecicio 3 "Piedra papel o tijera"

beats(piedra, tijeras).
beats(tijeras, papel).
beats(papel, piedra).

% Caso 1: Gana el jugador 1
ganador(Eleccion1, Eleccion2, jugador1) :-
    beats(Eleccion1, Eleccion2),
!.
% Caso 2: Gana el jugador 2
% (Esta regla solo se intenta si el Caso 1 falló)
ganador(Eleccion1, Eleccion2, jugador2) :-
    beats(Eleccion2, Eleccion1), 
!.
% Caso 3: Empate
% Si no ganó el 1 y no ganó el 2, es un empate.
ganador(_, _, empate).



jugar_juego(Nombre1, Eleccion1, Nombre2, Eleccion2, GanadorNombre) :-
    ganador(Eleccion1, Eleccion2, Resultado), 
    determinar_nombre(Resultado, Nombre1, Nombre2, GanadorNombre). 

determinar_nombre(jugador1, Nombre1, _, Nombre1) :- !. % Si el resultado es 'jugador1', el ganador es Nombre1.
determinar_nombre(jugador2, _, Nombre2, Nombre2) :- !. % Si el resultado es 'jugador2', el ganador es Nombre2.
determinar_nombre(empate, _, _, empate).           % Si el resultado es 'empate', el ganador es 'empate'.



% Ejercicio 4 "Operador de corte - Descuentos"

% Versión 1: sin corte 
discount_without_cut(Monto, 20) :- Monto >= 1000.
discount_without_cut(Monto, 10) :- Monto >= 500.
discount_without_cut(Monto, 5)  :- Monto > 0.    % "El resto"


% Versión 2: con corte

discount_with_cut(Monto, 20) :- 
    Monto >= 1000, 
    !.  % Si el monto es >= 1000, da 20% Y CORTA.

discount_with_cut(Monto, 10) :- 
    Monto >= 500, 
    !.  % Si el monto es >= 500, da 10% Y CORTA.

discount_with_cut(_, 5). % "El resto". Si no entró en las de arriba, da 5%.
                        




% ejercicio 5 "Temperaturas y viceversa (Bidireccional)"

temperature(C, F) :-
    nonvar(C),  % (1) VERIFICA: ¿C tiene un valor?
    !,          % (2) CORTA: Si C tiene valor, nos comprometemos a esta regla.
    F is (C * 9 / 5) + 32. % (3) CALCULA: F

temperature(C, F) :-
    nonvar(F),  % (1) VERIFICA: ¿F tiene un valor?
    !,          % (2) CORTA: Si F tiene valor, nos comprometemos a esta regla.
    C is (F - 32) * 5 / 9. % (3) CALCULA: C