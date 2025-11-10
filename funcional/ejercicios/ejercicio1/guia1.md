# Guía de Ejercicios - Funciones Recursivas en Elm

## Introducción

Esta guía presenta una serie de ejercicios para practicar la programación funcional y la recursión en Elm. Todos los ejercicios deben implementarse como **funciones puras** utilizando **recursión**.

### Recordatorios importantes:

- Las funciones deben ser puras (sin efectos secundarios)
- Usar solo recursión, no bucles
- Considerar casos base para evitar recursión infinita
- Manejar casos extremos (números negativos, cero, etc.)

---

## Ejercicio 1: Función Potencia

**Consigna:** Implementar una función que eleve un número `a` a la potencia `b`.

**Firma:**

```elm
power : Int -> Int -> Int
```

**Ejemplos:**

- `power 2 3` debería retornar `8`
- `power 5 0` debería retornar `1`
- `power 10 2` debería retornar `100`

**Pistas:**

- Caso base: cualquier número elevado a la potencia 0 es 1
- Caso recursivo: `a^b = a * a^(b-1)`

---

## Ejercicio 2: Factorial

**Consigna:** Implementar una función que calcule el factorial de un número.

**Firma:**

```elm
factorial : Int -> Int
```

**Ejemplos:**

- `factorial 5` debería retornar `120`
- `factorial 0` debería retornar `1`
- `factorial 1` debería retornar `1`

**Pistas:**

- Caso base: 0! = 1 y 1! = 1
- Caso recursivo: n! = n \* (n-1)!

---

## Ejercicio 3: Fibonacci

**Consigna:** Implementar dos versiones de la función de Fibonacci:

1. Versión exponencial (ingenua)
2. Versión lineal (optimizada con acumuladores)

**Firmas:**

```elm
fibonacciExponential : Int -> Int
fibonacciLinear : Int -> Int
```

**Ejemplos:**

- `fibonacci 0` debería retornar `0`
- `fibonacci 1` debería retornar `1`
- `fibonacci 10` debería retornar `55`

**Pistas:**

- Versión exponencial: F(n) = F(n-1) + F(n-2)
- Versión lineal: usar una función auxiliar con acumuladores

---

## Ejercicio 4: Triángulo de Pascal

**Consigna:** Implementar una función que calcule el valor en la posición (x, y) del triángulo de Pascal.

**Firma:**

```elm
pascalTriangle : Int -> Int -> Int
```

**Ejemplos:**

- `pascalTriangle 0 0` debería retornar `1`
- `pascalTriangle 2 4` debería retornar `6`
- `pascalTriangle 1 3` debería retornar `3`

**Pistas:**

- Los bordes del triángulo siempre valen 1
- Cada valor es la suma de los dos valores de arriba: P(x,y) = P(x-1,y-1) + P(x,y-1)

---

## Ejercicio 5: Máximo Común Divisor (MCD)

**Consigna:** Implementar el algoritmo euclidiano para calcular el máximo común divisor de dos números.

**Firma:**

```elm
gcd : Int -> Int -> Int
```

**Ejemplos:**

- `gcd 48 18` debería retornar `6`
- `gcd 17 13` debería retornar `1`
- `gcd 100 25` debería retornar `25`

**Pistas:**

- Algoritmo euclidiano: gcd(a, b) = gcd(b, a mod b)
- Caso base: cuando b = 0, el resultado es |a|

---

## Ejercicio 6: Contar Dígitos

**Consigna:** Implementar una función que cuente la cantidad de dígitos en un número.

**Firma:**

```elm
countDigits : Int -> Int
```

**Ejemplos:**

- `countDigits 12345` debería retornar `5`
- `countDigits 7` debería retornar `1`
- `countDigits -456` debería retornar `3`

**Pistas:**

- Caso base: números menores a 10 tienen 1 dígito
- Caso recursivo: dividir por 10 y sumar 1

---

## Ejercicio 7: Suma de Dígitos

**Consigna:** Implementar una función que sume todos los dígitos de un número.

**Firma:**

```elm
sumDigits : Int -> Int
```

**Ejemplos:**

- `sumDigits 123` debería retornar `6` (1+2+3)
- `sumDigits 999` debería retornar `27` (9+9+9)
- `sumDigits -456` debería retornar `15` (4+5+6)

**Pistas:**

- Usar el módulo 10 para obtener el último dígito
- Dividir por 10 para remover el último dígito

---

## Ejercicio 8: Verificar Palíndromo

**Consigna:** Implementar una función que determine si un número es palíndromo (se lee igual de izquierda a derecha que de derecha a izquierda).

**Firmas:**

```elm
isPalindrome : Int -> Bool
reverseNumber : Int -> Int
```

**Ejemplos:**

- `isPalindrome 12321` debería retornar `True`
- `isPalindrome 12345` debería retornar `False`
- `isPalindrome 7` debería retornar `True`

**Pistas:**

- Necesitás una función auxiliar para invertir el número
- Comparar el número original con su versión invertida
- Usar acumuladores para la función de inversión

---

## Ejercicio 9: Paréntesis Balanceados

**Consigna:** Implementar una función que determine si los paréntesis en un texto están balanceados.

**Firma:**

```elm
isBalanced : String -> Bool
```

**Ejemplos:**

- `isBalanced "()"` debería retornar `True`
- `isBalanced "((()))()"` debería retornar `True`
- `isBalanced "(()())"` debería retornar `True`
- `isBalanced "(()(())"` debería retornar `False`
- `isBalanced "(()(()))"` debería retornar `False`
- `isBalanced ")("` debería retornar `False`

**Pistas:**

- Usar un contador para llevar el balance de paréntesis
- Incrementar por cada '(' y decrementar por cada ')'
- Si el contador se vuelve negativo, los paréntesis están desbalanceados
- Al final, el contador debe ser exactamente 0

---

## Desafíos Adicionales

Una vez que hayas completado todos los ejercicios, probá estos desafíos:

1. **Optimización:** Compará el rendimiento entre `fibonacciExponential` y `fibonacciLinear` con números grandes
2. **Casos extremos:** Asegurate de que todas las funciones manejen correctamente números negativos y cero

---

## Consejos para Debuggear

- Usar `Debug.log` para ver los valores en cada llamada recursiva
- Empezar con casos simples y pequeños
- Verificar que los casos base sean correctos
- Asegurarse de que la recursión se acerque al caso base

¡Buena suerte con los ejercicios!
