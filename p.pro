% 1. Intercalar dos listas
intercalar([], L, L).
intercalar(L, [], L).
intercalar([X|Xs], [Y|Ys], [X, Y | Zs]) :-
    intercalar(Xs, Ys, Zs).

% 2. Máximo común divisor
mcd(A, 0, A) :- A > 0.
mcd(A, B, R) :-
    B > 0,
    C is A mod B,
    mcd(B, C, R).
