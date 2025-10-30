
% 1. CONVERSIÓN DE TEMPERATURA             


% celsius_to_fahrenheit(+C, -F)
% Convierte de Celsius a Fahrenheit. Fórmula: F = C * 9/5 + 32
celsius_to_fahrenheit(C, F) :-
    F is C * 9/5 + 32.

% fahrenheit_to_celsius(+F, -C)
% Convierte de Fahrenheit a Celsius. Fórmula: C = (F - 32) * 5/9
fahrenheit_to_celsius(F, C) :-
    C is (F - 32) * 5/9.

% test de ejemplo:
% ?- celsius_to_fahrenheit(0, F).
% F = 32.0.
% ?- fahrenheit_to_celsius(212, C).
% C = 100.0.



% 2. RECURSIÓN - VUELOS               


% Base de datos de vuelos: flight(Origen, Destino, Duracion)
flight(london, paris, 60).
flight(paris, rome, 120).
flight(rome, athens, 90).
flight(london, madrid, 150).
flight(madrid, rome, 120).
flight(athens, cairo, 180).
flight(paris, berlin, 100).
flight(berlin, london, 90).

% direct_flight(+Origen, +Destino)
% Verifica si existe un vuelo directo.
direct_flight(Origin, Destination) :-
    flight(Origin, Destination, _).

% reachable(+Origen, +Destino)
% Verdadero si se puede llegar de Origen a Destino (con o sin conexiones).

% Caso base: Hay un vuelo directo.
reachable(Origin, Destination) :-
    direct_flight(Origin, Destination).

% Caso recursivo: Se vuela a una ciudad intermedia y desde allí se alcanza el Destino.
reachable(Origin, Destination) :-
    direct_flight(Origin, Intermediate),
    Intermediate \= Destination, % Simple control para evitar loops obvios
    reachable(Intermediate, Destination).

% Queries de ejemplo:
% ?- direct_flight(london, paris).
% true.
% ?- reachable(london, athens).
% true.

% 3. OPERADOR DE CORTE - PIEDRA, PAPEL O TIJERA 


% beats(+Elemento1, +Elemento2)
% Elemento1 le gana a Elemento2.
beats(rock, scissors).
beats(scissors, paper).
beats(paper, rock).

% winner(+Choice1, +Choice2, -Result)
% Determina el resultado (player1, player2, draw) usando corte (!).

% 1. player1 gana
winner(C1, C2, player1) :-
    beats(C1, C2),
    !.

% 2. player2 gana
winner(C1, C2, player2) :-
    beats(C2, C1),
    !.

% 3. Empate (draw)
winner(C1, C1, draw).

% play_game(+P1Name, +P1Choice, +P2Name, +P2Choice, -WinnerName)
% Devuelve el nombre del ganador o 'draw'.
play_game(P1Name, P1Choice, _P2Name, P2Choice, P1Name) :-
    winner(P1Choice, P2Choice, player1),
    !.

play_game(_P1Name, P1Choice, P2Name, P2Choice, P2Name) :-
    winner(P1Choice, P2Choice, player2),
    !.

play_game(_P1Name, P1Choice, _P2Name, P2Choice, draw) :-
    winner(P1Choice, P2Choice, draw).

% test de ejemplo:
% ?- winner(paper, paper, W).
% W = draw.
% ?- play_game(alice, rock, bob, scissors, W).
% W = alice.



% 4. OPERADOR DE CORTE - DESCUENTOS           

% --- Versión sin Corte (Incorrecta para lógica de escala) ---
% discount_without_cut(+Amount, -DiscountPercentage)
discount_without_cut(Amount, 20) :-
    Amount >= 1000.

discount_without_cut(Amount, 10) :-
    Amount >= 500.

discount_without_cut(Amount, 5) :-
    Amount < 500.

% Queries de ejemplo (Muestra respuestas múltiples/incorrectas):
% ?- discount_without_cut(1200, D).
% D = 20 ;
% D = 10 ;
% false.

% --- Versión con Corte (Correcta para lógica de escala) ---
% discount_with_cut(+Amount, -DiscountPercentage)

% 20% para >= $1000 (Más restrictiva)
discount_with_cut(Amount, 20) :-
    Amount >= 1000,
    !. % Si se aplica este descuento, no buscar más.

% 10% para >= $500
discount_with_cut(Amount, 10) :-
    Amount >= 500,
    !. % Si se aplica este, debe ser < 1000, no buscar más.

% 5% para el resto (implica Amount < $500)
discount_with_cut(_Amount, 5).

% Queries de ejemplo:
% ?- discount_with_cut(1200, D).
% D = 20.
% ?- discount_with_cut(400, D).
% D = 5.

% 5. PREDICADO BIDIRECCIONAL - TEMPERATURE   

% temperature(+Temp1, +Temp2)
% Convierte entre celsius(C) y fahrenheit(F) en ambas direcciones, usando nonvar/1.

% Caso 1: Celsius está instanciado -> Convertir C a F
temperature(celsius(C), fahrenheit(F)) :-
    nonvar(C), % La variable C tiene un valor
    !,         % Corta: Si C tiene valor, esta es la ruta de conversión.
    F is C * 9/5 + 32.

% Caso 2: Fahrenheit está instanciado -> Convertir F a C
temperature(celsius(C), fahrenheit(F)) :-
    nonvar(F), % La variable F tiene un valor
    !,         % Corta: Si F tiene valor, esta es la ruta de conversión.
    C is (F - 32) * 5/9.

% test de ejemplo:
% ?- temperature(celsius(100), fahrenheit(F)).
% F = 212.0.
% ?- temperature(celsius(C), fahrenheit(68)).
% C = 20.0.