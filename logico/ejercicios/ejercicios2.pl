% ----------------------------------------------------
% 1. Contar elementos de una lista

contar([], 0).
contar([_|T], N) :-
    contar(T, N1),
    N is N1 + 1.

% ----------------------------------------------------
% 2. Verificar si un elemento está contenido en una lista

contiene([H|_], H).
contiene([_|T], X) :-
    contiene(T, X).

% ----------------------------------------------------
% 3. Unir dos listas

union([], L, L).
union([H|T], L2, [H|R]) :-
    union(T, L2, R).

% ----------------------------------------------------
% 4. Invertir una lista

inversa([], []).
inversa([H|T], Inv) :-
    inversa(T, InvT),
    union(InvT, [H], Inv).

% ----------------------------------------------------
% XOR de listas (elementos que NO pertenecen a la otra)

xor([], _, []).
xor([H|T], L, R) :-
    contiene(L, H),
    xor(T, L, R).
xor([H|T], L, [H|R]) :-
    xor(T, L, R).

% ----------------------------------------------------
% 5. Repetir cada elemento N veces

repetirElemento(_, 0, []).
repetirElemento(X, N, [X|R]) :-
    N1 is N - 1,
    repetirElemento(X, N1, R).

repetir([], _, []).
repetir([H|T], N, Resultado) :-
    repetirElemento(H, N, Repetidos),
    repetir(T, N, Resto),
    union(Repetidos, Resto, Resultado).

% ----------------------------------------------------
% 6. Verificar si una lista es palíndromo

sonIguales([], []).
sonIguales([H|T1], [H|T2]) :-
    sonIguales(T1, T2).

palindromo(L) :-
    inversa(L, LI),
    sonIguales(L, LI).

% ----------------------------------------------------
% 7. Acumular (sumar todos los elementos)

acumular([], 0).
acumular([H|T], Total) :-
    acumular(T, R),
    Total is H + R.

% ----------------------------------------------------
% 8. Retornar elementos en posición par (0,2,4,...)

parAux([], _, []).
parAux([H|T], 0, [H|R]) :-
    parAux(T, 1, R).
parAux([_|T], 1, R) :-
    parAux(T, 0, R).

listaPar(L, R) :-
    parAux(L, 0, R).

% ----------------------------------------------------
% 9. Retornar una lista con los elementos pares

elementospares([], []).
elementospares([H|T], [H|R]) :-
    H mod 2 =:= 0,
    elementospares(T, R).
elementospares([_|T], R) :-
    elementospares(T, R).

% ----------------------------------------------------
% 10. Intercalar dos listas

intercalar([], L2, L2).
intercalar(L1, [], L1).
intercalar([A|As], [B|Bs], [A, B | R]) :-
    intercalar(As, Bs, R).

% ----------------------------------------------------
% 11. Sumar dos listas elemento a elemento

sumarListas([], [], []).
sumarListas([H1|T1], [H2|T2], [S|R]) :-
    S is H1 + H2,
    sumarListas(T1, T2, R).

% ----------------------------------------------------
% 12. Sumar un parámetro a cada elemento

sumarParametro([], _, []).
sumarParametro([H|T], P, [S|R]) :-
    S is H + P,
    sumarParametro(T, P, R).

% ----------------------------------------------------
% 13. Intersección de dos listas

interseccion([], _, []).
interseccion([H|T], L2, [H|R]) :-
    contiene(L2, H),
    interseccion(T, L2, R).
interseccion([_|T], L2, R) :-
    interseccion(T, L2, R).

% ----------------------------------------------------
% 14. Agregar elemento en orden

agregarAlPrincipio(L, X, [X|L]).

agregarEnOrden([], X, [X]).
agregarEnOrden([H|T], X, [X, H|T]) :-
    H > X.
agregarEnOrden([H|T], X, [H|R]) :-
    agregarEnOrden(T, X, R).

% ----------------------------------------------------
% 15. Eliminar un elemento (todas las apariciones)

eliminar([], _, []).
eliminar([X|T], X, R) :-
    eliminar(T, X, R).
eliminar([H|T], X, [H|R]) :-
    eliminar(T, X, R).

% Eliminar por posición
eliminarPosicion([], _, []).
eliminarPosicion([_|T], 0, T).
eliminarPosicion([H|T], Pos, [H|R]) :-
    Pos > 0,
    P1 is Pos - 1,
    eliminarPosicion(T, P1, R).

% ----------------------------------------------------
% 16. Reemplazar un elemento por otro

reemplazar([], _, _, []).
reemplazar([X|T], X, Nuevo, [Nuevo|R]) :-
    reemplazar(T, X, Nuevo, R).
reemplazar([H|T], X, Nuevo, [H|R]) :-
    reemplazar(T, X, Nuevo, R).

% ----------------------------------------------------
% 17. Eliminar elementos que aparecen en otra lista

eliminar2([], _, []).
eliminar2([H|T], L, R) :-
    member(H, L),
    eliminar2(T, L, R).
eliminar2([H|T], L, [H|R]) :-
    eliminar2(T, L, R).

% ----------------------------------------------------
% 18. Slice: primeros N elementos de una lista

slice([], _, []).
slice(_, 0, []).
slice([H|T], N, [H|R]) :-
    N > 0,
    N1 is N - 1,
    slice(T, N1, R).
