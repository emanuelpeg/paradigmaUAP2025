%1. Defina una regla que permita saber la cantidad de elementos de una lista.
contar([], 0).
contar([_ | Tail], N) :-
    contar(Tail, N1),
    N is 1 + N1.

%2. Defina una regla que permita saber si un elemento esta contenido en una lista.
contiene([Head|_], Head).
contiene([_ | Tail], Valor) :-
    contiene(Tail, Valor).
    
    
%3. Defina una regla que permita unir dos listas.
union([], Lista2, Lista2).
union([Head | Tail], Lista2, [Head | R1]) :-
    union(Tail, Lista2, R1).
      
    

%4. Defina una regla que permita retornar una lista inversa.
inversa([], []).
inversa([Head|Tail], Inversa):-
    inversa(Tail, Inv1),
    union(Inv1, [Head], Inversa).








    
 xor([], _, []).
xor([Head | Tail], Lista, Resultado) :-
    contiene(Lista, Head),        
    !,                            
    xor(Tail, Lista, Resultado).  
xor([Head | Tail], Lista, [Head | Resultado]) :-
    xor(Tail, Lista, Resultado).  




%5. Defina una regla que permita retornar una lista que contenga n veces los elementos 
% de una lista pasada por parámetros.

repetirElemento(_, 0, []) :- !.
repetirElemento(Head, N, [Head | Resto]) :-
    N1 is N - 1,
    repetirElemento(Head, N1, Resto).

repetir([], _, []).
repetir(_, 0, []) :- !.

repetir(Lista, 1, Lista) :- !.

% Caso recursivo: repetir cada elemento N veces
repetir([Head | Tail], N, Resultado) :-
    repetirElemento(Head, N, Repetidos),
    repetir(Tail, N, Resto),
    union(Repetidos, Resto, Resultado).



%6. Defina una regla que determine si una lista es palindromo.
sonIguales([], []).
sonIguales([H1 | T1], [H1 | T2]) :-
    sonIguales(T1, T2).


palindromo(Lista) :-
    inversa(Lista, ListaInv),
    sonIguales(Lista, ListaInv).

    

%7. Defina una regla que acumule todos los elementos de una lista.
acumular([], 0).
acumular([Head | Tail], Total) :-
    acumular(Tail, Resto),
    Total is Head + Resto.

%8. Defina una regla que retorne una lista con los elementos en posición par.
%lista, si, no, lidsta

parAux([], _, []).

parAux([Head | Tail], 0, [Head | Resto]) :-
    parAux(Tail, 1, Resto).

parAux([_ | Tail], 1, Resto) :-
    parAux(Tail, 0, Resto).

listaPar(Lista, Resultado) :-
    parAux(Lista, 0, Resultado).


%9. Defina una regla que retorne una lista de pares.

elementospares([], []).

elementospares([Head | Tail], [Head | Resto]) :-
    Head mod 2 =:= 0,
    elementospares(Tail, Resto),
    !.

elementospares([_ | Tail], Resto) :-
    elementospares(Tail, Resto).


%10. Defina una regla que una 2 lista, de forma intercalada.
intercalar([], Lista2, Lista2).
intercalar(Lista1, [], Lista1).

intercalar([H1 | T1], [H2 | T2], [H1, H2 | Resto]) :-
    intercalar(T1, T2, Resto).


intercalados([], List2, List2).
intercalados(List1, [], List1).

intercalados([Head | Tail], List2, [Head | ListFinal]) :-
    intercalados(List2, Tail, ListFinal).


%11. Defina una regla que retorne una lista que sea la suma de dos lista.

sumarListas([], [], []).
sumarListas([H1 | T1], [H2 | T2], [S | Resto]) :-
    S is H1 + H2,
    sumarListas(T1, T2, Resto).


%12. Defina una regla que retorne una lista que sea la suma de una lista y un parámetro.

sumarParametro([], _, []).
sumarParametro(Lista, 0, Lista) :- !.

sumarParametro([Head | Tail], Parametro, [Suma | Resto]) :-
    Suma is Head + Parametro,
    sumarParametro(Tail, Parametro, Resto).


%13. Defina una regla que retorne la intersección de dos listas.


interseccion([], _, []).

interseccion([Head | Tail], Lista2, [Head | Resto]) :-
    contiene(Lista2, Head),
    interseccion(Tail, Lista2, Resto),
    !.

interseccion([_ | Tail], Lista2, Resto) :-
    interseccion(Tail, Lista2, Resto).



%14. Defina una regla que agregue un elemento a la lista.
agregarAlPrincipio(Lista, Elem, [Elem | Lista]).

agregarEnOrden([], Elem, [Elem]).

agregarEnOrden([], Elem, [Elem]).

agregarEnOrden([Head|Tail], Elem, [Elem, Head | Tail]):-
    Head > Elem,
    !.
agregarEnOrden([Head|Tail], Elem, [Head|Resultado]):-
    agregarEnOrden(Tail, Elem, Resultado).


%15. Defina una regla que remueva un elemento a la lista.

eliminarPosicion([], _, []).
eliminarPosicion([_ | Tail], 0, Tail) :- 
    !.
eliminarPosicion([Head | Tail], Pos, [Head | Resto]) :-
    Pos > 0,
    Pos1 is Pos - 1,
    eliminarPosicion(Tail, Pos1, Resto).

eliminar([],_, []). 
eliminar([Head|Tail], Head, Resultado):- 
    eliminar(Tail, Head, Resultado), 
    !. 

eliminar([Head|Tail], Elem, [Head|Resultado]):- 
    eliminar(Tail, Elem, Resultado).


%16. Defina una regla que remplace un elemento por otro pasado por parámetro.
reemplazar([], _, _, []).
reemplazar([Head|Tail], Head, Reemplazo, [Reemplazo|Resultado]):-
    reemplazar(Tail, Head, Reemplazo, Resultado),
    !.
reemplazar([Head|Tail], Elem, Reemplazo, [Head|Resultado]):-
    reemplazar(Tail, Elem, Reemplazo, Resultado).



%17. Defina una regla que remueva todos los elementos que se encuentra en otra lista pasada parámetro.

eliminar2([], _, []).
eliminar2([H|T], ListaEliminar, Resultado) :-
    member(H, ListaEliminar),
    !,
    eliminar2(T, ListaEliminar, Resultado).
eliminar2([H|T], ListaEliminar, [H|Resultado]) :-
    eliminar2(T, ListaEliminar, Resultado).



%18. Defina una regla que dada una lista retorne otra lista con los primeros n elementos.
slice([], _, []).  
slice(_, 0, []). 
slice([Head|Tail], N, [Head|Resultado]):-
    N > 0,
    N1 is N - 1,
    slice(Tail, N1, Resultado).
