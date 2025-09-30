using System.Diagnostics;

/*
interface IProducto
{
    double ObtenerPrecioProducto();
    void MostrarDatos();
}

class Vuelo : Producto
{
    private int NuemeroVuelo;
    private string Destino;
    private double Precio;

    // Constructor
    //Getters
    //Setters
    public double ObtenerPrecioProducto()
    {
        return Precio;
    }
    public void MostrarDatos()
    {
        Console.WriteLine($"Vuelo {NuemeroVuelo} - Destino {Destino} - Precio {Precio}");
    }
}

class Hotel : IProducto
{
    private string Nombre;
    private string Ciudad;
    private double PrecioNoche;
    private int CantidadNoches;

    // Constructor
    //Getters
    //Setters

    public double ObtenerPrecioProducto()
    {
        return PrecioNoche * CantidadNoches;
    }

    public void MostrarDatos()
    {
        Console.WriteLine($"Hotel {Nombre} - Ciudad {Ciudad} - Precio por noche {PrecioNoche}");
    }
}
class Oferta
{
    public List<IProducto> productosOferta = new List<Producto>();

    public double ObtenerPrecio()
    {
        double total = 0;
        foreach (var producto in productosOferta)
        {
            double precio = producto.ObtenerPrecioProducto(); // obtenemos el precio de cada producto
            total += precio;
        }
        return total * 0.90;
    }
}

class Agencia {

    public List<Producto> productos = new List<Producto>();
    public void PrecioOferta(Oferta oferta)
    {
        double precioOferta = oferta.ObtenerPrecio(); // obtenemos el precio y lo mostramos
        Console.WriteLine($"El precio de la oferta es de {precioOferta}");
    }
    public void ListarProductos()
    {
        foreach (var producto in productos)
        {
            producto.MostrarDatos();
        }
    }
}
*/
