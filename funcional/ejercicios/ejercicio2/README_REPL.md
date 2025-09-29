# Instrucciones para usar el REPL de Elm

## ✅ ACTUALIZADO: Ahora usando Clase2.elm

El Main.elm ha sido actualizado para usar todas las funciones implementadas en `Clase2.elm`, incluyendo las nuevas funciones como `quickSort`, `mediana`, `obtenerElemento`, y `subSets`.

## Opciones para probar las funciones:

### Opción 1: Usar el navegador (MÁS FÁCIL) 🌐
1. Abre terminal en: `c:\Users\saids\Desktop\Paradigmas_Objeto\paradigmaUAP2025\funcional\ejercicios\ejercicio2\`
2. Ejecuta: `elm reactor`
3. Ve a: `http://localhost:8000`
4. Abre: `src/Main.elm`
5. ✨ Verás todas las pruebas de las funciones con sus resultados

### Opción 2: Usar el REPL de Elm 💻
1. Abre terminal en el directorio del proyecto
2. Ejecuta: `elm repl`
3. Importa las funciones: `import Clase2 exposing (..)`
4. Importa las listas de ejemplo: `import TestREPL exposing (..)`
5. Prueba ejemplos:

```elm
-- Importar todo
> import Clase2 exposing (..)
> import TestREPL exposing (..)

-- Usar las listas predefinidas
> lista1
[5,2,8,1,9,3] : List Int

-- Probar funciones básicas
> concatenar lista1 lista2
[5,2,8,1,9,3,4,7,6] : List Int

> max lista1
9 : Int

> filtrarPares lista3
[2,4,6] : List Int

-- Probar funciones nuevas
> quickSort [3,1,4,1,5,9,2,6]
[1,1,2,3,4,5,6,9] : List Int

> mediana [1,2,3,4,5]
3 : Int

> obtenerElemento lista1 2
8 : Int

> subSets [1,2]
[[],[2],[1],[1,2]] : List (List Int)
```

### Opción 3: Compilar a HTML 📄
1. Ejecuta: `elm make src/Main.elm --output=main.html`
2. Abre `main.html` en tu navegador

## 🎯 Ejemplos rápidos para el REPL:

```elm
-- Funciones básicas
> concatenar [1,2] [3,4]
[1,2,3,4] : List Int

> max [5,2,8,1,9,3]
9 : Int

> quickSort [5,2,8,1,9,3]
[1,2,3,5,8,9] : List Int

-- Estadísticas
> mediana [1,2,3,4,5]
3 : Int

> obtenerElemento [1,2,3,4,5] 2
3 : Int

-- Filtros avanzados
> maximos [5,2,8,1,9,3] 4
[5,8,9] : List Int

> filtrarPares [1,2,3,4,5,6]
[2,4,6] : List Int

-- Funciones de orden superior
> acumularCuadrado [1,2,3]
14 : Int

> transformar [1,2,3] (\x -> x * 2)
[2,4,6] : List Int

-- Subconjuntos
> subSets [1,2,3]
[[],[3],[2],[2,3],[1],[1,3],[1,2],[1,2,3]] : List (List Int)

-- Funciones auxiliares
> tomar 3 [1,2,3,4,5]
[1,2,3] : List Int

> cortar [1,2,3,4,5,6] 2
[[1,2],[3,4],[5,6]] : List (List Int)
```

## 📝 Funciones disponibles ahora:

### Básicas:
- `concatenar`, `max`, `min`, `buscar`
- `contar`, `acc`, `existe`

### Filtros:
- `maximos`, `minimos`, `filtrarPares`, `filtrarMultiplosDeTres`
- `filtrar` (función genérica)

### Acumuladores:
- `acumular`, `acumularDoble`, `acumularCuadrado`, `acumularUnidad`

### Transformación:
- `transformar` (equivalente a map)

### Ordenamiento y estadísticas:
- `quickSort`, `mediana`, `obtenerElemento`

### Conjuntos:
- `unirOfSet`, `removerDuplicados`

### Auxiliares:
- `tomar`, `saltar`, `cortar`

### Avanzadas (opcionales):
- `subSets` (todos los subconjuntos)

## 📝 Listas de ejemplo disponibles:
- `lista1 = [5, 2, 8, 1, 9, 3]`
- `lista2 = [4, 7, 6]`
- `lista3 = [1, 2, 3, 4, 5, 6]`
- `listaVacia = []`

## ⚡ RECOMENDACIÓN:
**Usa la Opción 1 (navegador)** para ver todos los resultados de una vez, incluyendo las nuevas funciones implementadas.