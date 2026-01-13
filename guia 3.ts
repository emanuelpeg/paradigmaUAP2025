export function isEmpty<T>(list: T[]): boolean {
    return list.length === 0;
}

export function head<T>(list: T[]): T {
    if (isEmpty(list)) throw new Error("head on empty list");
    return list[0];
}

export function tail<T>(list: T[]): T[] {
    if (isEmpty(list)) return [];
    return list.slice(1);
}

export function miMap<T, U>(fn: (a: T) => U, list: T[]): U[] {
    if (isEmpty(list)) return [];
    const h = head(list);
    const t = tail(list);
    return [fn(h), ...miMap(fn, t)];
}
// console.log(miMap(x => x * 2, [1, 2, 3])); // [2, 4, 6]
export function miFiltro<T>(pred: (a: T) => boolean, list: T[]): T[] {
    if (isEmpty(list)) return [];
    const h = head(list);
    const t = tail(list);
    if (pred(h)) {
        return [h, ...miFiltro(pred, t)];
    }
    return miFiltro(pred, t);
}

export function miFoldl<T, U>(fn: (a: T, acc: U) => U, acc: U, list: T[]): U {
    if (isEmpty(list)) return acc;
    const h = head(list);
    const t = tail(list);
    const nextAcc = fn(h, acc);
    return miFoldl(fn, nextAcc, t);
}

// console.log(miFiltro((x: number) => x > 2, [1,2,3,4])); // [3,4]
// console.log(miFoldl((x: number, s: number) => s + x, 0, [1,2,3])); // 6

export function duplicar(list: number[]): number[] {
    return miMap((x: number) => x * 2, list);
}

export function longitudes(list: string[]): number[] {
    return miMap((s: string) => s.length, list);
}

export function incrementarTodos(list: number[]): number[] {
    return miMap((x: number) => x + 1, list);
}

export function todasMayusculas(list: string[]): string[] {
    return miMap((s: string) => s.toUpperCase(), list);
}

export function negarTodos(list: boolean[]): boolean[] {
    return miMap((b: boolean) => !b, list);
}

export function pares(list: number[]): number[] {
    return miFiltro((x: number) => x % 2 === 0, list);
}

export function positivos(list: number[]): number[] {
    return miFiltro((x: number) => x > 0, list);
}

export function stringsLargos(list: string[]): string[] {
    return miFiltro((s: string) => s.length > 5, list);
}

export function soloVerdaderos(list: boolean[]): boolean[] {
    return miFiltro((b: boolean) => b === true, list);
}

export function mayoresQue(n: number): (list: number[]) => number[] {
    return (list: number[]) => miFiltro((x: number) => x > n, list);
}

// console.log(pares([1,2,3,4,5])); // [2,4]
// console.log(positivos([-1,2,-3,4])); // [2,4]
// console.log(stringsLargos(["hola","buenos dias","mundo"])); // ["buenos dias"]
// console.log(soloVerdaderos([true,false,true])); // [true,true]
// console.log(mayoresQue(3)([1,2,3,4,5])); // [4,5]

// ...existing code...

export function sumaFold(list: number[]): number {
    return miFoldl((x: number, acc: number) => acc + x, 0, list);
}

export function producto(list: number[]): number {
    return miFoldl((x: number, acc: number) => acc * x, 1, list);
}

export function contarFold<T>(list: T[]): number {
    return miFoldl((_: T, acc: number) => acc + 1, 0, list);
}

export function concatenar(list: string[]): string {
    return miFoldl((s: string, acc: string) => acc + s, "", list);
}

export function maximo(list: number[]): number {
    return miFoldl((x: number, acc: number) => (x > acc ? x : acc), 0, list);
}

export function invertirFold<T>(list: T[]): T[] {
    return miFoldl((x: T, acc: T[]) => [x, ...acc], [], list);
}

export function todos<T>(pred: (a: T) => boolean, list: T[]): boolean {
    return miFoldl((x: T, acc: boolean) => acc && pred(x), true, list);
}

export function alguno<T>(pred: (a: T) => boolean, list: T[]): boolean {
    return miFoldl((x: T, acc: boolean) => acc || pred(x), false, list);
}

// Ejemplos de uso:
// console.log(sumaFold([1, 2, 3, 4])); // 10
// console.log(producto([2, 3, 4])); // 24
// console.log(contarFold([1, 2, 3])); // 3
// console.log(concatenar(["Hola", " ", "Mundo"])); // "Hola Mundo"
// console.log(maximo([3, 1, 4, 1, 5])); // 5
// console.log(invertirFold([1, 2, 3])); // [3, 2, 1]
// console.log(todos((x: number) => x > 0, [1, 2, 3])); // true
// console.log(alguno((x: number) => x > 5, [1, 2, 6])); // true
// ...existing code...

export function sumaDeCuadrados(list: number[]): number {
    // Primero map para elevar al cuadrado, luego fold para sumar
    return miFoldl((x: number, acc: number) => acc + x, 0, 
           miMap((x: number) => x * x, list));
}

export function contarPares(list: number[]): number {
    // Primero filter para obtener pares, luego fold para contar
    return contarFold(miFiltro((x: number) => x % 2 === 0, list));
}

export function promedio(list: number[]): number {
    if (isEmpty(list)) return 0;
    const suma = sumaFold(list);
    return suma / list.length;
}

export function longitudesPalabras(text: string): number[] {
    // Dividir el string en palabras y map para obtener longitudes
    return miMap((s: string) => s.length, text.split(" "));
}

export function palabrasLargas(text: string): string[] {
    // Dividir en palabras y filter las que tienen más de 3 caracteres
    return miFiltro((s: string) => s.length > 3, text.split(" "));
}

export function sumarPositivos(list: number[]): number {
    // Primero filter positivos, luego fold para sumar
    return sumaFold(miFiltro((x: number) => x > 0, list));
}

export function duplicarPares(list: number[]): number[] {
    // Map que duplica solo si es par
    return miMap((x: number) => x % 2 === 0 ? x * 2 : x, list);
}


// console.log(sumaDeCuadrados([1, 2, 3])); // 14
// console.log(contarPares([1, 2, 3, 4, 5])); // 2
// console.log(promedio([1, 2, 3])); // 2
// console.log(longitudesPalabras("hola mundo")); // [4, 5]
// console.log(palabrasLargas("Yo estoy aprendiendo Elm")); // ["estoy", "aprendiendo"]
// console.log(sumarPositivos([1, -2, 3, -4, 5])); // 9
// console.log(duplicarPares([1, 2, 3, 4])); // [1, 4, 3, 8]