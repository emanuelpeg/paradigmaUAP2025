par(0).
par(N) :- N > 0, M is N - 2, par(M).

impar(1).
impar(N) :- N > 1, M is N - 2, impar(M).


suma([1,2,3,4,5], sum).
