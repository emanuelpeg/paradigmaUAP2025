using System;
using System.Collections.Generic;
//Actividad 1
/*
El restaurante “San Martín” nos contrata para hacer un software que controle los costos de sus platos. Los platos están compuestos 
por ingredientes los cuales pueden ser platos o ingredientes básicos. Por ejemplo los panqueques con dulce de leche, está compuesto 
por panqueques (que es un plato) y dulce de leche que es un ingrediente básico. El software debe mantener el costo de cada uno de los platos, 
y el costo está dado por la suma de los costos de los ingredientes (básicos o platos).
*/

// Este es un caso de uso del patrón de diseño Composite, que permite tratar objetos individuales y compuestos de la misma manera.
// Se aplica el polimorfismo para que tanto los ingredientes básicos como los platos puedan ser tratados como componentes de un plato.
// Evita duplicar lógica: no tenés un método especial “sumarIngredientes” para platos y otro para subplatos; 
// el mismo código sirve para ambos.

interface IComponente //cualquier cosa que pueda formar parte de un plato. Gracias a esta interfaz, podemos tener una lista de ingredientes básicos y platos dentro de un plato.
{
    double getCosto();  // No es lo mismo calclar el costo de un ingrediente básico que el de un plato. 
                        // Por eso se usa una interfaz para que cada clase implemente su propia forma de calcular el costo.
    string getNombre();
}

class IngredienteBasico : IComponente
{
    private string nombre;
    private double precioUnitario;

    public double getCosto() => precioUnitario; // el costo de un ingrediente es fijo. No hay que calcular nada.
    public string getNombre() => nombre;
}

class Plato : IComponente
{
    private string nombre;
    private List<IComponente> componentes; // Un plato puede estar compuesto por otros platos o ingredientes básicos. 
                                           // Y no tiene un costo fijo, sino que depende de los ingredientes que lo componen.

    public double getCosto() // Proceso para calcular el costo de un plato: si un elemento es un IngredienteBasico devuelve su precio; 
                             // si es otro Plato, vuelve a calcular su costo sumando sus componentes (otro plato o ingrediente básico).
    {                       // Un estilo de llamada hacia adentro, es la recursividad.
        double total = 0;
        foreach (var c in componentes) //Llamada recuriva. Supongamos que tenemos un objeto Plato llamado "platoEspecial" el cual tiene como ingredientes Panqueques (que es un plato) y arandanos (que es un ingrediente básico). En ese caso el platoEspecial entrara en la funcion con el componente Plato, el cual a su vez tiene mas ingredientes dentro como harina, dulce de leche, etc. Por lo que se va a llamar a si mismo para recorrer sus ingredientes e ir sumandolos al precio final. Una vez que se termine de recorrer el plato panqueque, se pasa a arandanos que es basico y tambien se suma. 
            total += c.getCosto();
        return total;
    }

    public string getNombre() => nombre;
}