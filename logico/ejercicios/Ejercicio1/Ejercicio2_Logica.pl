
% 1) Cantidad de elementos de una lista
length_of_list([], 0).
length_of_list([_H|T], N) :-
    length_of_list(T, N1),
    N is N1 + 1.

% 2) Si un elemento está contenido en una lista
member_in_list(X, [X|_]).
member_in_list(X, [_|T]) :-
    member_in_list(X, T).

% 3) Unir (append) dos listas
append_lists([], L, L).
append_lists([H|T], L, [H|R]) :-
    append_lists(T, L, R).

% 4) Lista inversa (reverse)
reverse_list(L, R) :-
    reverse_acc(L, [], R).
reverse_acc([], Acc, Acc).
reverse_acc([H|T], Acc, R) :-
    reverse_acc(T, [H|Acc], R).

% 5) Repetir (concatenar) una lista N veces
replicate_list(_, N, []) :-
    N =< 0, !.
replicate_list(L, N, R) :-
    N > 0,
    N1 is N - 1,
    replicate_list(L, N1, R1),
    append_lists(R1, L, R).

% 6) Palíndromo (la lista es igual a su inversa)
palindrome_list(L) :-
    reverse_list(L, L).

% 7) Acumular (sumar) todos los elementos de una lista
sum_list([], 0).
sum_list([H|T], Sum) :-
    sum_list(T, S1),
    Sum is S1 + H.

% 8) Elementos en posición par (2,4,6,...). Índices empiezan en 1.
even_positions(L, R) :-
    even_pos(L, 1, R).
even_pos([], _Idx, []).
even_pos([H|T], Idx, R) :-
    Idx mod 2 =:= 0,
    !,
    Idx1 is Idx + 1,
    even_pos(T, Idx1, R1),
    R = [H|R1].
even_pos([_H|T], Idx, R) :-
    Idx1 is Idx + 1,
    even_pos(T, Idx1, R).

% 9) Lista de pares (números pares)
even_numbers([], []).
even_numbers([H|T], [H|R]) :-
    integer(H),
    0 is H mod 2,
    !,
    even_numbers(T, R).
even_numbers([_H|T], R) :-
    even_numbers(T, R).

% 10) Intercalar dos listas (alternar elementos)
interleave([], L, L).
interleave(L, [], L).
interleave([A|TA], [B|TB], [A,B|TR]) :-
    interleave(TA, TB, TR).

% 11) Suma elemento a elemento de dos listas (si una es más corta, se copia el resto)
sum_lists([], [], []).
sum_lists([A|TA], [B|TB], [C|TR]) :-
    C is A + B,
    sum_lists(TA, TB, TR).
sum_lists([], [B|TB], [B|TR]) :-
    sum_lists([], TB, TR).
sum_lists([A|TA], [], [A|TR]) :-
    sum_lists(TA, [], TR).

% 12) Sumar un parámetro a cada elemento de una lista
add_to_each([], _V, []).
add_to_each([H|T], V, [R|RT]) :-
    R is H + V,
    add_to_each(T, V, RT).

% 13) Intersección de dos listas (sin duplicados en resultado, respetando orden de la primera)
intersection(L1, L2, Res) :-
    intersection_acc(L1, L2, [], ResRev),
    reverse_list(ResRev, Res).

intersection_acc([], _L2, Acc, Acc).
intersection_acc([H|T], L2, Acc, Res) :-
    member_in_list(H, L2),
    member_in_list(H, Acc),
    !,
    intersection_acc(T, L2, Acc, Res).
intersection_acc([H|T], L2, Acc, Res) :-
    member_in_list(H, L2),
    !,
    intersection_acc(T, L2, [H|Acc], Res).
intersection_acc([_H|T], L2, Acc, Res) :-
    intersection_acc(T, L2, Acc, Res).

% 14) Agregar un elemento al final de la lista
add_element(List, Elem, Result) :-
    append_lists(List, [Elem], Result).

% 15) Remover la primera ocurrencia de un elemento
remove_element([], _E, []).
remove_element([E|T], E, T) :- !.
remove_element([H|T], E, [H|R]) :-
    remove_element(T, E, R).

% 16) Reemplazar todos los elementos iguales a Old por New
replace_all([], _Old, _New, []).
replace_all([Old|T], Old, New, [New|R]) :-
    !,
    replace_all(T, Old, New, R).
replace_all([H|T], Old, New, [H|R]) :-
    replace_all(T, Old, New, R).

% 17) Remover todos los elementos que se encuentran en otra lista
remove_all_in_list([], _Rem, []).
remove_all_in_list([H|T], Rem, R) :-
    member_in_list(H, Rem),
    !,
    remove_all_in_list(T, Rem, R).
remove_all_in_list([H|T], Rem, [H|R]) :-
    remove_all_in_list(T, Rem, R).

% 18) Primeros N elementos (take)
take(_, N, []) :-
    N =< 0, !.
take([], _N, []).
take([H|T], N, [H|R]) :-
    N1 is N - 1,
    take(T, N1, R).

% Ejemplos rápidos para probar (usar en consulta):
% ?- length_of_list([a,b,c], N).
% ?- member_in_list(b, [a,b,c]).
% ?- append_lists([1,2],[3,4],R).
% ?- reverse_list([1,2,3],R).
% ?- replicate_list([a,b],3,R).
% ?- palindrome_list([r,a,c,e,c,a,r]).
% ?- sum_list([1,2,3],S).
% ?- even_positions([a,b,c,d,e],R).
% ?- even_numbers([1,2,3,4],R).
% ?- interleave([1,3,5],[2,4,6],R).
% ?- sum_lists([1,2,3],[4,5],R).
% ?- add_to_each([1,2,3],5,R).
% ?- intersection([1,2,3,2],[2,3,4],R).
% ?- add_element([a,b],c,R).
% ?- remove_element([a,b,c],b,R).
% ?- replace_all([a,b,a], a, x, R).
% ?- remove_all_in_list([1,2,3,4],[2,4],R).
% ?- take([1,2,3,4],2,R).
