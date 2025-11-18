--1
cantidad([], 0).
cantidad([_|T], N) :-
    cantidad(T, N1),
    N is N1 + 1.

--2
pertenece(X, [X|_]).
pertenece(X, [_|T]) :-
    pertenece(X, T).

--3
unir([], L, L).
unir([H|T], L2, [H|R]) :-
    unir(T, L2, R).

--4
inversa(L, R) :-
    inv_aux(L, [], R).

inv_aux([], Acc, Acc).
inv_aux([H|T], Acc, R) :-
    inv_aux(T, [H|Acc], R).

--5
repetir(_, 0, []) :- !.
repetir(L, N, R) :-
    N > 0,
    N1 is N - 1,
    repetir(L, N1, R1),
    unir(L, R1, R).

--6
palindromo(L) :-
    inversa(L, L).

--7
acumular([], 0).
acumular([H|T], S) :-
    acumular(T, S1),
    S is S1 + H.


--8
parespos(L, R) :-
    parespos(L, 1, R).

parespos([], _, []).
parespos([H|T], P, [H|R]) :-
    0 is P mod 2, !,
    P1 is P + 1,
    parespos(T, P1, R).
parespos([_|T], P, R) :-
    P1 is P + 1,
    parespos(T, P1, R).

--9
pares([], []).
pares([H|T], [H|R]) :-
    0 is H mod 2, !,
    pares(T, R).
pares([_|T], R) :-
    pares(T, R).


--10
intercalar([], L, L).
intercalar(L, [], L).
intercalar([A|TA], [B|TB], [A,B|R]) :-
    intercalar(TA, TB, R).

--11
sumarlistas([], [], []).
sumarlistas([A|TA], [B|TB], [C|TC]) :-
    C is A + B,
    sumarlistas(TA, TB, TC).

--12
sumar([], _, []).
sumar([H|T], X, [R|RT]) :-
    R is H + X,
    sumar(T, X, RT).


--13
interseccion([], _, []).
interseccion([H|T], L2, [H|R]) :-
    pertenece(H, L2), !,
    interseccion(T, L2, R).
interseccion([_|T], L2, R) :-
    interseccion(T, L2, R).

-14
agregar(E, L, R) :-
    unir(L, [E], R).

-15
remover(_, [], []).
remover(E, [E|T], T) :- !.
remover(E, [H|T], [H|R]) :-
    remover(E, T, R).

--16
reemplazar(_, _, [], []).
reemplazar(A, B, [A|T], [B|R]) :- !,
    reemplazar(A, B, T, R).
reemplazar(A, B, [H|T], [H|R]) :-
    reemplazar(A, B, T, R).

--17
removerlista(_, [], []).
removerlista(L2, [H|T], R) :-
    pertenece(H, L2), !,
    removerlista(L2, T, R).
removerlista(L2, [H|T], [H|R]) :-
    removerlista(L2, T, R).

--18
tomar(_, [], []).
tomar(0, _, []) :- !.
tomar(N, [H|T], [H|R]) :-
    N > 0,
    N1 is N - 1,
    tomar(N1, T, R).
