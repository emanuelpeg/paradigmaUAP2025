/*Practica Prolog.pdf
Trabajo Práctico de Prolog. 
Fecha de entrega : 18/11
 1. Defina una función que permita saber la cantidad de elementos de una lista. 
2. Defina una función que permita saber si un elemento esta contenido en una lista. 
3. Defina una función que permita unir dos listas.
 4. Defina una función que permita retornar una lista inversa. 
5. Defina una función que permita retornar una lista que contenga n veces los elementos de una 
lista pasada por parámetros. 
6. Defina una función que determine si una lista es palindromo. 
7. Defina una función que acumele todos los elementos de una lista.
 8. Defina una función que retorne una lista con los elementos en posición par. 
9. Defina una función que retorne una lista de pares.
 10. Defina una función que una 2 lista, de forma intercalada. 
11. Defina una función que retorne una lista que sea la suma de dos lista. 
12. Defina una función que retorne una lista que sea la suma de una lista y un parámetro. 
13. Defina una función que retorne la intersección de dos listas. 
14. Defina una función que agrege un elemento a la lista. 
15. Defina una función que remueva un elemento a la lista. 
16. Defina una función que remplace un elemento por otro pasado por parametro. 
17. Defina una función que remueva todos los elementos que se encuentra en otra lista pasada 
parametro. 
18. Defina una función que dada una lista retorne otra lista con los primeros n elementos.
*/

% R = Resto


%1)
esVacia([]).

long([], 0).
long([_|R], X):-
    long(R, X1), X is X1 + 1.

%Lo probamos con: long([1,2,5], X)


%1) CON ARANDA
contar([], 0).
contar([_|Tail], N):-
    contar(Tail, N1),
    N is 1 + N1.

%Lo probamos con: contar([1,2,3], X).


%2)
exist([X|_], X).
exist([_|R], X):-
    exist(R,X).

%Lo probamos con: exist([1,2,3],5) Esto da falso
		 %exist([1,2,3],2) Esto da true


%2) CON ARANDA
contiene([Head|_], Head).
contiene([_|Tail], Valor):-
    contiene(Tail,Valor).

%Lo probamos con: contiene([1,2,3],3).


%3)
unir([], X, X). %Si viene [] y X, devuelvo X
unir(X, [], X). %Si viene X y [], devuelvo X
unir([H|R], Y, [H|Z]):-
    unir(R, Y, Z).

%Lo probamos con: unir([1,2,3], [4,5], X)


%3) CON ARANDA
igual([],[]).
igual([H|T1], [H|T2]):-
    igual(T1,T2).

union([], Lista2, Lista2).
union(Lista2, [], Lista2).
union([Head|Tail], Lista2, Resultado):-
	union(Tail,Lista2,R1),
    igual(Resultado, [Head|R1]).

%lo probamos con: union([1,2,3], [1,4,3], R).


%4)
invertir([],[]).
invertir([H|R], Z):-
    invertir(R,Y), unir(Y,[H], Z).

%Lo probamos con: invertir([1,4,5,6], X)


%4) CON ARANDA
inversa([],[]).
inversa([Head|Tail], Inversa):-
    inversa(Tail,Inversa1),
    union(Inversa1, [Head], Inversa).

%Lo probamos con: inversa([1,2,3], R).


%4) CON ARANDA 
inversa([],[]).
inversa([Head|Tail], Inversa):-
    inversa(Tail,Inversa1),
    union(Inversa1, [Head], Inversa).

inversa2([], R, R).
inversa2([Head|Tail], R, R1):-
    inversa2(Tail, [Head|R], R1).

%inversa2([1|[2,3]], [], R1):-
% 	== inversa2([2|[3]], X0 = [1|R], R1)
%   == inversa2([3|[]], X1 = [2|X0], R1)
%   == inversa2([], X2 = [3|X1], R1)  
%Entonces cuando unifica hace 3,2,1,[] que es igual a [3,2,1]

inversa2(Lista, Resultado):-
    inversa2(Lista, [], Resultado).
    

%5)
repetir(_, 0, []):-!. %Si a la lista la repetimos 0 veces []
repetir(Lista,N, Resultado):-
    N1 is N -1,
    repetir(Lista, N1, Resultado1),
    union(Lista, Resultado1, Resultado).

%lo probamos con: repetir([1,2,3],3,[1,2,3,1,2,3,1,2,3,])


%6) 
palindromo(Lista):-
    inversa2(Lista, Lista). %Que lista sea igual a su inverso de Lista

%Lo probamos con: palindromo([1,2,1,2])


%7)
acumular([], 0).
acumular([H|T], Suma) :-
    acumular(T, SumaTail),
    Suma is H + SumaTail.


%8)
%Devolvemos los numeros que estan en posicion par de la lista
soloPares([], []).
soloPares([N], [N]). %Si tenemos una lista con 1 elem. devuelvo el elem.
soloPares([Par,_|Tail], [Par, Resultado]):-
    soloPares(Tail, Resultado).

%Lo probamos con: soloPares([1,2,3,4,5], R).


%9)
soloPares([], []).
soloPares([H|T], [H|R]) :-
    H mod 2 =:= 0, !,  
    soloPares(T, R).
soloPares([_|T], R) :-
    soloPares(T, R).

%Lo probamos con: soloPares([1,2,3,4,6,8,9], X)


%10) 
intercalar([], L2, L2) :- !.
intercalar(L1, [], L1) :- !.
intercalar([H1|T1], [H2|T2], [H1, H2|Resultado]) :-
    intercalar(T1, T2, Resultado).

%Lo probamos con: intercalar([0,2,4], [1,3,5], X)


%11)
sumaListas([], Lista, Lista) :- !.
sumaListas(Lista, [], Lista) :- !.
sumaListas([H1|T1], [H2|T2], [Suma|Resultado]):-
    sumaListas(T1,T2,Resultado),
    Suma is H1 + H2.
%Lo probamos con: sumaListas([0,2,4], [1,3,5], R)


%12) 
sumaLista([], _ , []):- !.
sumaLista(Lista, 0, Lista):- !.
sumaLista([H1|T1], N, [Suma|Resultado]):-
    sumaLista(T1,N,Resultado),
    Suma is H1 + N.

%Lo probamos con: sumaLista([0,2,4], 5, R)


%13) 
interseccion([], _, []).
interseccion([Head|Tail], Lista, [Head|Resultado]):-
    member(Head, Lista), !,        
    interseccion(Tail, Lista, Resultado). 
interseccion([_|Tail], Lista, Resultado):-
    interseccion(Tail, Lista, Resultado).

%Lo probamos con: interseccion([1, 2, 3, 4], [3, 4, 5, 6], R).


%14)
agregarPrincipio(Elem, Lista, [Elem|Lista]).

%Lo probamos con: agregarPrincipio(5, [2, 3], R).

agregarFinal([], Elem, [Elem]).
agregarFinal([H|T], Elem, [H|R]) :-
    agregarFinal(T, Elem, R).

%Lo probamos con: agregarFinal([1, 2, 3], 0, R).


%15)
eliminar([], _, []).
eliminar([Head|Tail], Head, Resultado):-
    eliminar(Tail, Head, Resultado),
    !.
eliminar([Head|Tail], Elem, [Head|Resultado]):-
    eliminar(Tail, Elem, Resultado).

%Lo probamos con: eliminar([1,2,3,4,5], 4, R).


%16) 
reemplazar([], _, _, []).
reemplazar([Head|Tail], Head, Reemplazo, [Reemplazo|Resultado]):-
    reemplazar(Tail, Head, Reemplazo, Resultado),
    !.
reemplazar([Head|Tail], Elem, Reemplazo, [Head|Resultado]):-
    reemplazar(Tail, Elem, Reemplazo, Resultado).

%Lo probamos con: reemplazar([1,2,3,4,5], 4, 10, R). 


%17)
removerLista([], _, []).
removerLista([H|T], ListaARemover, Resultado) :-
    member(H, ListaARemover), !,
    removerLista(T, ListaARemover, Resultado). 
removerLista([H|T], ListaARemover, [H|Resultado]) :-
    removerLista(T, ListaARemover, Resultado). 

%Lo probamos con: removerLista([h, o, l, a, m, u, n, d, o], [a, e, i, o, u], R).


%18)
slice([], _, []).  
slice(_, 0, []). %Podemos usarlo con N>0 o con slice(_, 0, [])##:-!.## (:-!.)
slice([Head|Tail], N, [Head|Resultado]):-
    N > 0,
    N1 is N - 1,
    slice(Tail, N1, Resultado).

%Lo podemos probar: slice([1,4,2,4,5,3], 3, R)


