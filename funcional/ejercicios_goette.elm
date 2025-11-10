
type Tree
  = EmptyTree
  | TreeImpl Int Tree Tree
-- Define un **tipo algebraico** (suma de variantes) llamado `Tree`.
-- Tiene dos "constructores":
--   1) EmptyTree          → representa el árbol vacío (no hay nodo).
--   2) TreeImpl v l r     → un nodo con:
--        v : Int          → el valor almacenado en ese nodo
--        l : Tree         → subárbol izquierdo
--        r : Tree         → subárbol derecho
-- Este tipo es recursivo porque se define en términos de sí mismo (Tree contiene Tree).

add : Tree -> Int -> Tree -- recibe un árbol y un entero, y devuelve un árbol (el nuevo árbol con el valor insertado).
add tree value =
  case tree of
    EmptyTree -> -- Si el árbol estaba vacío, crear un nodo hoja con ese valor.
      TreeImpl value EmptyTree EmptyTree

    TreeImpl v left right -> -- Si el árbol NO está vacío, comparamos para decidir por dónde bajar.
      if value < v then -- Si el valor es menor que el del nodo actual, insertamos en el subárbol izquierdo.
        TreeImpl v (add left value) right
      else
        -- Si es mayor o igual, insertamos en el subárbol derecho.
        -- (Con esto, los duplicados se van a la derecha.)
        TreeImpl v left (add right value)


add (add (add EmptyTree 4) 2) 7
-- Construye el árbol insertando 4, luego 2, luego 7 sobre el resultado anterior.
-- Queda un árbol con 4 como raíz, 2 a la izquierda, 7 a la derecha.

{-

1️⃣ add EmptyTree 4
    - tree = EmptyTree
    - value = 4
    → caso EmptyTree → TreeImpl 4 EmptyTree EmptyTree

    Resultado parcial:
        4
       / \
      Ø   Ø

-----------------------------------------

2️⃣ add (TreeImpl 4 EmptyTree EmptyTree) 2
    - tree = TreeImpl 4 EmptyTree EmptyTree
    - value = 2
    - 2 < 4 → True → inserta en el subárbol izquierdo
    → TreeImpl 4 (add EmptyTree 2) EmptyTree

    Subllamada: add EmptyTree 2 → TreeImpl 2 EmptyTree EmptyTree

    Resultado parcial:
          4
         /
        2
       / \
      Ø   Ø

-----------------------------------------

3️⃣ add (TreeImpl 4 (TreeImpl 2 EmptyTree EmptyTree) EmptyTree) 7
    - tree = TreeImpl 4 (TreeImpl 2 …) EmptyTree
    - value = 7
    - 7 < 4 → False → inserta en el subárbol derecho
    → TreeImpl 4 (TreeImpl 2 EmptyTree EmptyTree) (add EmptyTree 7)

    Subllamada: add EmptyTree 7 → TreeImpl 7 EmptyTree EmptyTree

    Resultado final:
           4
          / \
         2   7
        / \ / \
       Ø  ØØ  Ø

-----------------------------------------

✅ Resultado final del árbol:
TreeImpl 4
   (TreeImpl 2 EmptyTree EmptyTree)
   (TreeImpl 7 EmptyTree EmptyTree)

Visualmente:
       4
      / \
     2   7
-}