longitud([], 0).
longitud([_|T], Resultado):-
    longitud(T, R1), Resultado is R1 + 1.

contenido([H|_], H).
contenido([_|T], X):-
    contenido(T, X).


unir([], Lista, Lista).
unir([H|T], Lista, [H|Resultado]):-
    unir(T, Lista, Resultado).

invertir([], []).
invertir([H|T], R):-
    invertir(T, R1), unir(R1, [H], R).

retornarNVeces(_, 0, []).
retornarNVeces(Lista, N, R):-
    N1 is N - 1,
    retornarNVeces(Lista, N1, P),
    unir(P, Lista, R).

palindromo(L):-
    invertir(L, L).

acumular([], Acum, Acum).
acumular([H|T], Acum, R):-
    Res is H + Acum, acumular(T, Res, R).

retornarEnPar([], []):-!.
retornarEnPar([N], [N]):-!.
retornarEnPar([N,_|T], [N|R]):-
    retornarEnPar(T, R).
    
isEven(N):- integer(N), 0 is N mod 2.
isOdd(N):- integer(N), 1 is N mod 2.

numerosPares([], []):-!.
numerosPares([H|T], [H|R]):-
    isEven(H), numerosPares(T, R), !.
numerosPares([_|T], R):-
    numerosPares(T, R).

intercalar([], Lista, Lista).
intercalar([H1|T1], [H2|T2], [H1,H2|R]):-
    intercalar(T1,T2,R).

sumaDosListas([], Lista, Lista):- !.
sumaDosListas(Lista, [], Lista):- !.
sumaDosListas([H1|T1], [H2|T2], [Suma|R]):-
    Suma is H1+H2, sumaDosListas(T1, T2, R).

sumarParametro([], _, []):- !.
sumarParametro([H|T], K, [Suma|R]):-
    Suma is K + H, sumarParametro(T, K, R).


interseccion([], _, []).
interseccion(_, [], []).
interseccion([H|T], Lista, [H|R]) :-
    contenido(Lista, H),
    interseccion(T, Lista, R), !.
interseccion([_|T], Lista, R) :-
    interseccion(T, Lista, R).

agregar([], K, [K]).
agregar(Lista, K, R):-
    unir(Lista, [K], R).

eliminar([], _, []).
eliminar([H|T], Elemento, R):-
    H == Elemento, eliminar(T, Elemento, R), !.
eliminar([H|T], Elemento, [H|R]):-
    eliminar(T, Elemento, R).

reemplazar([], _, _, []).
reemplazar([H|T], ElementoReemplazar, N, [N|R]):-
    H == ElementoReemplazar, reemplazar(T, ElementoReemplazar, N, R), !.
reemplazar([H|T], ElementoReemplazar, N, [H|R]):-
    reemplazar(T, ElementoReemplazar, N, R).

eliminarDeLista([], _, []).
eliminarDeLista([H|T], Lista, R):-
    contenido(Lista, H), eliminarDeLista(T, Lista, R), !.
eliminarDeLista([H|T], Lista, [H|R]):-
    eliminarDeLista(T, Lista, R).

primerosNElementos(_, 0, []):- !.
primerosNElementos([H|T], N, [H|R]):-
    N1 is N-1, primerosNElementos(T, N1, R).
