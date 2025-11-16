cantidad([],0).
cantidad([_|T],Z):-
    cantidad(T,Z1),Z is Z1+1.

contenido([],_,_):- fail.
contenido([H|_],H,_).
contenido([_|T],V,Z):-
    contenido(T,V,Z).

unir([],[],[]).
unir(A,[],A).
unir([],A,A).
unir([H|T],A,[H|Z]):-
    unir(T,A,Z).

inversa([],[]).
inversa([H|T],Z1):-
    inversa(T,Z),unir(Z,[H],Z1).

nveces([],_,_,[]).
nveces([H|T],C,N,[H|Z]):-
    N=\=C, nveces([H|T],C+1,N,Z).
nveces([_|T],_,N,Z):-
   nveces(T,0,N,Z).

palindromo([],_).
palindromo(T,_):-
    inversa(T,Z1), Z1==T.
accu([],0).
accu([H|T],Z):-
    accu(T,Z1), Z is H+Z1.

indexPar([],_,[]).
indexPar([H|T],C,[H|Z]):-
    indexPar(T,C+1,Z),C mod 2=:=0.
indexPar([_|T],C,Z):-
     indexPar(T,C+1,Z).

par([],[]).
par([H|T],[H|Z]):-
    H mod 2=:=0, par(T,Z).
par([_|T],Z):-
     par(T,Z).

intercalarL([],[],[]).
intercalarL(A,[],A).
intercalarL([],A,A).
intercalarL([H|T],[H1|T1],[H|[H1|Z]]):-
    intercalarL(T,T1,Z).
   
intercalar([],[],[]).
intercalar(A,[],A).
intercalar([],A,A).
intercalar([H|T],[H1|T1],[Z1|Z]):-
    intercalar(T,T1,Z), Z1 is H+H1.

intercalarP([],_,[]).
intercalarP([H|T],L,[Z1|Z]):-
    intercalarP(T,L,Z), Z1 is H+L.

inter([],[],[]).
inter(_,[],[]).
inter([],_,[]).
inter([H|T],[H1|T1],[H|Z]):-
     H==H1,inter(T,T1,Z).
inter([_|T],[_|T1],Z):-
     inter(T,T1,Z).


app(H,G,[G|H]).

in([],_,[]).
in([H|T],L,Z):-
     H==L,in(T,L,Z).
in([H|T],L,[H|Z]):-
     in(T,L,Z).

inA([],_,_,[]).
inA([H|T],F,L,[L|Z]):-
     H==F,inA(T,F,L,Z).
inA([H|T],F,L,[H|Z]):-
     inA(T,F,L,Z).

inR([],_,[]).
inR([H|T],F,Z):-
    contenido(F,H,_),inR(T,F,Z).
inR([H|T],F,[H|Z]):-
     inR(T,F,Z).

nelementos([],_,_[]).
nelementos([H|A],V,C,[H|Z]):-
    V>C, nelementos(A,V,C+1,Z).
nelementos(_,_,_,[]).