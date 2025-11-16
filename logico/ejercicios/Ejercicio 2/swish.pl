%1.
cantidad([], 0).
cantidad([_|T], N) :-
    cantidad(T, M),
    N is M + 1.

%2. 
estar(X, [X|_]).
estar(X, [_|T]) :-
    estar(X, T).

%3. 
unirListas(X, [], X).
unirListas([], X, X).
unirListas([E|R],X,[E|J]) :- 
    unirListas(R,X,J).

%4.
inversa([], []).
inversa([H|T], R) :-
    inversa(T, RT),
    unirListas(RT, [H], R).

%5. 
repetir(_, 0, []).
repetir(L, N, R) :-
    N > 0,
    N1 is N - 1,
    repetir(L, N1, R1),
    unirListas(L, R1, R).


%6.
palindromo(L) :-
    inversa(L, L).

%7
acumular([],0).
acumular([H|T],N) :- 
    acumular(T,R), N is R + H.

%8. 
pospar([],[]).
pospar([_],[]).
pospar([_,H2|R], [H2|Z]) :- 
    pospar(R, Z).

%9.
listaPares([], []).
listaPares([H|T], [H|R]) :- 
    H mod 2 =:= 0, 
    listaPares(T, R).

listaPares([_|T], R) :- 
    listaPares(T, R).

%10.
intercalado([], L, L).
intercalado(L, [], L).
intercalado([A|TA], [B|TB], [A,B|R]) :-
    intercalado(TA, TB, R).

%11. 
sumaListas([], [], []).
sumaListas([A|TA], [B|TB], [C|R]) :-
    C is A + B,
    sumaListas(TA, TB, R).

%12.
añadirPorParametros([], _, []).
añadirPorParametros([H|T], X, [R|RT]) :-
    R is H + X,
    añadirPorParametros(T, X, RT).

%13.
interseccion([], _, []).
interseccion([H|T], L2, [H|R]) :-
    estar(H, L2),
    interseccion(T, L2, R).
interseccion([_|T], L2, R) :-
    interseccion(T, L2, R).

%14.
add(L, X, R) :-
    unirListas(L, [X], R).

%15. 
remover(X, [X|T], T).
remover(X, [H|T], [H|R]) :-
    remover(X, T, R).

%16.
reemplazar(_, _, [], []).
reemplazar(A, B, [A|T], [B|R]) :-
    reemplazar(A, B, T, R).
reemplazar(A, B, [H|T], [H|R]) :-
    H \= A,
    reemplazar(A, B, T, R).

%17.
removerLista([], _, []).
removerLista([H|T], L2, R) :-
    estar(H, L2),
    removerLista(T, L2, R).
removerLista([H|T], L2, [H|R]) :-
    \+ estar(H, L2),
    removerLista(T, L2, R).

%18.
primeros(_, 0, []) :- !.
primeros([], _, []) :- !.
primeros([H|T], N, [H|R]) :-
    N > 0,
    N1 is N - 1,
    primeros(T, N1, R).

