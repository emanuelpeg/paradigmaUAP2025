esVacia([]). %Cuando una lista es vacia

% 1 Cantidad de elementos de una lista
longitud([],0).
longitud([_ | Tail], X) :-
    longitud(Tail, X1), X is X1 + 1.

% 2 Verificar si un elemento existe en una lista
existe([Head | _], Head).
existe([_ | Tail], Valor):-
    existe(Tail, Valor).

% 3 Unir dos listas
equal([],[]).
equal([H | T1], [H, T2]):-
    equal(T1, T2).

unirListas([], Lista2, Lista2).
unirListas(Lista1, [], Lista1).
unirListas([Head | Tail], Lista2, [Head | Resultado]):-
    unirListas(Tail, Lista2, Resultado).
%unirListas([1,2], [5], [1,Z])
	%unirListas([], [5], Z)
%^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
%unirListas([1,2], [5], [1,2,5])

%unirListas([], Lista2, Lista2).
%unirListas(Lista1, [], Lista1).
%unirListas([Head | Tail], Lista2, [Head | Resultado]):-
%    unirListas(Tail, Lista2, Resultado).
%Hacer con equal


% 4 Lista inversa
invertir([],[]).
invertir([H | R], Z):-
    invertir(R,Y), unirListas(Y, [H], Z).

inversa([],[]).
inversa([Head|Tail], Inversa):-
    inversa(Tail,Inv1),
    union(Inv1, [Head], Inversa).

inversa2([], R, R).
inversa2([Head|Tail], R, R1):-
    inversa2(Tail, [Head|R], R1).

%inversa2([1,2,3], R = [], R1) 
%	== inversa2([2|[3]], X0 = [1|R], R1)
%	== inversa2([3|[]], X1 = [2|X0], R1)
%	== inversa2([], X2 = [3|X1], R1)

inversa2(Lista, Resultado):-
    inversa2(Lista, [], Resultado).

% 5 Repetir una lista N veces
%repetir(Lista, Cantidad, Resultado).
repetir(_, 0, []):-!.
repetir(Lista, N, Resultado):-
    N1 is N - 1,
    repetir(Lista, N1, Resultado1),
    union(Lista, Resultado1, Resultado).

% 6 Determinar si una lista es palindromo
palindromo([H|R]):-
    invertir([H|R], X),
    [H|R] = X.

esPalindromo(Lista):-
    inversa2(Lista, Lista).

% 7 Sumar todos los elementos de una lista
sumar([],0).
sumar([Head|Tail], Resultado):-
    sumar(Tail, ResultadoParcial),
    Resultado is ResultadoParcial + Head.

% 8 Solo Pares (posiciones pares)
soloPares([],[]).
soloPares([N], [N]).
soloPares([Par,_|Tail], [Par|Resultado]):-
    soloPares(Tail, Resultado).

% 9 Filtro de pares (lista con solo pares)

even(N) :- integer(N), 0 is N mod 2.
add(N)  :- integer(N), 1 is N mod 2.

filtroPares([], []).
filtroPares([Head|Tail], [Head|Resultado]):-
    filtroPares(Tail, Resultado),
    even(Head),
    !.    
filtroPares([_|Tail], Resultado):-
    filtroPares(Tail,Resultado).

% 10 Unir 2 listas de forma intercalada
intercalar([], Lista, Lista).
intercalar(Lista, [], Lista).
intercalar([H1|T1], [H2|T2], [H1, H2 | Resultado]):-
    intercalar(T1, T2, Resultado).

% 11 Retornar una lista que sea la suma de dos listas
sumaLista([], Lista, Lista):-!.
sumaLista(Lista, [], Lista):-!.
sumaLista([H1|T1], [H2|T2], [Suma|Resultado]):-
    sumaLista(T1, T2, Resultado),
    Suma is H1 + H2.

% 12 Sumar N a cada elemento de una lista
sumaLista2([], _, []):-!.
sumaLista2(Lista, 0, Lista):-!.
sumaLista2([H1|T1], N, [Suma|Resultado]):-
    sumaLista2(T1, N, Resultado),
    Suma is H1 + N.

% 13 Intersección de una lista
interseccion([], _, []).
interseccion(_, [], []).
interseccion([H|T], Lista, [H|Resultado]):-
	interseccion(T, Lista, Resultado),
    existe(Lista, H),
    !.
interseccion([_|T], Lista, Resultado):-
    interseccion(T, Lista, Resultado).

% 14 Agregar elemento
agregarAlFinal(Lista, Elem, Resultado):-
    union(Lista, [Elem], Resultado).

agregarAlPrincipio(Lista, Elem, [Elem|Lista]).

agregarEnOrden([], Elem, [Elem]).
agregarEnOrden([Head|Tail], Elem, [Elem, Head|Tail]):-
    Head > Elem,
    !.
agregarEnOrden([Head|Tail], Elem, [Head|Resultado]):-
    agregarEnOrden(Tail, Elem, Resultado).
    
% 15 Eliminar
eliminar([], _, []).
eliminar([Head|Tail], Head, Resultado):-
    eliminar(Tail, Head, Resultado), !.
eliminar([Head|Tail], Elem, [Head|Resultado]):-
    eliminar(Tail, Elem, Resultado).

% 16 Reemplazar
reemplazar([], _, _, []).
reemplazar([Head|Tail], Head, Reemplazo, [Reemplazo|Resultado]):-
    reemplazar(Tail, Head, Reemplazo, Resultado),
    !.
reemplazar([Head|Tail], Elem, Reemplazo, [Head|Resultado]):-
    reemplazar(Tail, Elem, Reemplazo, Resultado).

% 17 XOR
xor([], _, []).
xor([Head|Tail], Lista, Resultado):-
    xor(Tail, Lista, Resultado),
    existe(Lista, Head),
    !.
xor([Head|Tail], Lista, [Head|Resultado]):-
    xor(Tail, Lista, Resultado).

% 18 Slice
slice([], _, []).
slice(_, 0, []):-!.
slice([Head|Tail], N, [Head|Resultado]):-
    N1 is N - 1,
    slice(Tail, N1, Resultado).