interface IProducto
{
    public double CalcularPrecio();
}

class PC : IProducto
{
    public List<Parte> partes = new List<Parte>(); // composicion
    public double CalcularPrecio()
    {
        double total = 0;
        foreach (var parte in partes)
        {
            total += parte.CalcularPrecio();
        }
        return total;
    }
    public void AgregarParte(Parte parte)
    {
        partes.Add(parte);
    }
}

class Parte : IProducto
{
    private int Codigo;
    private string Descripcion;
    private double Precio;

    public Parte(int codigo, string descripcion, double precio)
    {
        Codigo = codigo;
        Descripcion = descripcion;
        Precio = precio;
    }
    public double CalcularPrecio()
    {
        return Precio;
    }
}

class Promocion : IProducto
{
    public List<IProducto> productos = new List<IProducto>();
    public double CalcularPrecio()
    {
        double total = 0;
        foreach (var producto in productos)
        {
            total += producto.CalcularPrecio();
        }
        return total * 0.85;
    }

    public void AgregarProducto(IProducto producto)
    {
        productos.Add(producto);
    }
}

