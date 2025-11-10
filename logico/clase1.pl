% ==== HECHOS ====

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

% ==== REGLAS ====

% hijo(H, P): H es hijo de P
hijo(H, P) :- progenitor(P, H).

% abuelo(A, N): A es abuelo de N
abuelo(A, N) :- progenitor(A, P), progenitor(P, N).

% nieto(N, A): N es nieto de A
nieto(N, A) :- abuelo(A, N).

% hermano(H1, H2): H1 y H2 son hermanos si comparten un mismo progenitor y no son la misma persona
hermano(H1, H2) :-
    progenitor(P, H1),
    progenitor(P, H2),
    H1 \= H2.

% tio(T, S): T es tio de S si T es hermano del padre o madre de S
tio(T, S) :-
    progenitor(P, S),
    hermano(T, P).

% sobrino(S, T): S es sobrino de T
sobrino(S, T) :- tio(T, S).

% ancestro(A, D): A es ancestro de D (padre, abuelo, bisabuelo, etc.)
ancestro(A, D) :- progenitor(A, D).
ancestro(A, D) :- progenitor(A, X), ancestro(X, D).

% pariente(P1, P2): P1 y P2 son parientes si uno es ancestro del otro o comparten un ancestro común
pariente(P1, P2) :- ancestro(P1, P2).
pariente(P1, P2) :- ancestro(P2, P1).
pariente(P1, P2) :-
    ancestro(A, P1),
    ancestro(A, P2),
    P1 \= P2.

% bisabuelo(B, N): B es bisabuelo si hay tres generaciones entre ellos
bisabuelo(B, N) :- progenitor(B, A), progenitor(A, P), progenitor(P, N).

% tio_abuelo(TA, S): TA es tio del abuelo o abuela de S
tio_abuelo(TA, S) :-
    abuelo(A, S),
    hermano(TA, A).

% primo(P1, P2): P1 y P2 son primos si sus padres son hermanos
primo(P1, P2) :-
    progenitor(PA1, P1),
    progenitor(PA2, P2),
    hermano(PA1, PA2),
    P1 \= P2.

% primo_segundo(P1, P2): si sus abuelos son hermanos
primo_segundo(P1, P2) :-
    progenitor(PA1, P1),
    progenitor(PA2, P2),
    abuelo(A1, PA1),
    abuelo(A2, PA2),
    hermano(A1, A2),
    P1 \= P2.

% ==== CONSULTAS EJEMPLO ====

% ¿Quién es el hermano de clara?
% ?- hermano(X, clara).

% ¿Quiénes son los tíos de ana?
% ?- tio(X, ana).

% ¿Quiénes son los ancestros de jaime?
% ?- ancestro(X, jaime).

% ¿Quiénes son los nietos de jose?
% ?- nieto(X, jose).

% ¿Quién es el bisabuelo de ana?
% ?- bisabuelo(X, ana).

% ¿Quién es el primo de ana?
% ?- primo(X, ana).

% ¿Quiénes son los ancestros de ivan?
% ?- ancestro(X, ivan).

% ¿Quiénes son los nietos de abril?
% ?- nieto(X, abril).

% ¿Quiénes son los primos segundos de carlos?
% ?- primo_segundo(X, carlos).
