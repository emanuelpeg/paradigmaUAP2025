progenitor(clara,jose).
progenitor(tomas, jose).
progenitor(tomas,isabel).
progenitor(jose, ana).
progenitor(jose, patricia).
progenitor(patricia,jaime).
progenitor(bob,patricio).
progenitor(isabel,rocio).
progenitor(javier, abril).
progenitor(abril,maria).
progenitor(maria,mateo).
progenitor(mateo,segundo).
progenitor(mario,lucas).
progenitor(lucas,miguel).
progenitor(carlos,ivan).
progenitor(abril,luigi).
progenitor(luigi,carlos).
progenitor(carlos,ivan).

abuelo(X,Y):-
    progenitor(X,Z), progenitor(Z,Y).

nieto(X,Y):-
    abuelo(Y,X).

hermano(X,Y):-
    progenitor(Z,X), progenitor(Z,Y), X\==Y.

tio(X,Y):-
    hermano(X,Z), progenitor(Z,Y).

ancestro(X,Y):-
    progenitor(X,Y). %CASO BASE: X es el padre de Y, no se puede buscar mas
ancestro(X,Y):-
    progenitor(X,Z), ancestro(Z,Y). 

/*
progenitor(ana, juan).
progenitor(juan, maria).
progenitor(maria, sofia).
progenitor(sofia, lucas).
progenitor(lucas, tomas).

ITERACIONES INTERNAS (cómo razona Prolog)

¿ana es progenitor directo de tomas? → ❌ NO

Entonces busca alguien Z tal que progenitor(ana, Z) → ✅ Z = juan
→ ahora pregunta: ancestro(juan, tomas)?

¿juan es progenitor directo de tomas? → ❌ NO
→ busca Z tal que progenitor(juan, Z) → ✅ Z = maria
→ ahora pregunta: ancestro(maria, tomas)?

¿maria es progenitor directo de tomas? → ❌ NO
→ busca Z tal que progenitor(maria, Z) → ✅ Z = sofia
→ ahora pregunta: ancestro(sofia, tomas)?

¿sofia es progenitor directo de tomas? → ❌ NO
→ busca Z tal que progenitor(sofia, Z) → ✅ Z = lucas
→ ahora pregunta: ancestro(lucas, tomas)?

¡CASO BASE!
¿lucas es progenitor directo de tomas? → ✅ SÍ
→ true.
*/

esHijo(X):-
    progenitor(_,X).

miembro(X,[X|_]).
miembro(X,[_|R]):-miembro(X,R).

longitud([],0).
longitud([_|Resto],N):-
longitud(Resto,N1), N is N1+1.


