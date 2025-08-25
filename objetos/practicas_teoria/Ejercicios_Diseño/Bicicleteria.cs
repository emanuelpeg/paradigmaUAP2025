/*
Descripción del Ejercicio

La bicicletería Oro Verde lo contrata para diseñar y desarrollar su sistema de control de precios. 
Dado que la bicicletería tiene un servicio de armado de bicicletas, donde permite que dado un conjunto 
de partes armar una bicicleta personalizada, cuyo precio es la suma del precio de las partes. 
A la vez, la bicicletería vende partes, las cuales tienen un número, una descripción y un precio. 
Las bicicletas armadas tienen un número y una descripción y el precio está dado por la suma de las partes. 

Por último, la bicicletería tiene ofertas las cuales son un conjunto de partes y/o bicicletas y su precio está dado 
por la suma de los elementos que lo componen, menos un 20%. }
*/

/*
Mi opicion de las elecciones es la siguiente:
1) Una interfasz que tenga los metodos de obtener precio y te calcular precio. Y que cada clase (parte, bicicleta y oferta) 
implemente los meotodos de la interfaz segun corresponda.

*/
using System.Numerics;

interface Item  // Una lista de Items puede contener partes, bicicletas y ofertas.
{
    double CalcularPrecio();  // No es lo mismo calcular el precio de una parte que el de una bicicleta o una oferta. 
                         // Por eso se usa una interfaz para que cada clase implemente su propia forma de calcular el precio.
}

class Parte : Item
{
    private int numero;
    private string descripcion;
    private double precio;

    public double CalcularPrecio() => precio; // El precio de una parte es fijo. No hay que calcular nada.
    public string getDescripcion() => descripcion;

    public Parte(int numero, string descripcion, double precio) // Constructor para facilitar la creacion de partes.
    {
        this.numero = numero;
        this.descripcion = descripcion;
        this.precio = precio;
    }

    // no voy a hacer un setter para el precio, porque no quiero que se pueda cambiar el precio de una parte una vez creada.
    // Y si el enunciado no lo pide, no lo hago.
}

class Bicicleta : Item
{
    private int numero;
    private string descripcion;
    private List<Parte> partes; // Composicion: una bicicleta está compuesta por partes. 

    public Bicicleta(int numero, string descripcion) // Constructor para facilitar la creacion de bicicletas.
    {
        this.numero = numero;
        this.descripcion = descripcion;
    }
    // El precio de una bici no se guarda como atributo, sino que se calcula dinámicamente sumando los precios de todas sus partes.
    // Es un precio derivado. Ya que en el enunciado dice "el precio está dado por la suma de las partes."
    public double CalcularPrecio()
    {
        double total = 0;
        foreach (var p in partes)
        {
            total += p.CalcularPrecio();
        }
        return total;
    }

    // Debo hacer un getter para agregar partes a la bicicleta (porque la lista es provada).
    public void AgregarParte(Parte parte) // recibe la parte a agregar
    {
        partes.Add(parte);
    }
}

class Oferta : Item
{
    private int numero;
    private string descripcion;
    private List<Item> items; // Una oferta puede estar compuesta por partes y/o bicicletas.

    public double CalcularPrecio()
    {
        double total = 0;
        foreach (var i in items)
        {
            total += i.CalcularPrecio(); // si es una bicicleta, se calcula su precio sumando sus partes.
        }
        return total * 0.8; // Aplica un descuento del 20%
    }

    public Oferta(int numero, string descripcion) // Constructor para facilitar la creacion de ofertas.
    {
        this.numero = numero;
        this.descripcion = descripcion;
    }
    
    public void AgregarItem(Item item) // recibe el item (parte o bicicleta) a agregar
    {
        items.Add(item);
    }
}