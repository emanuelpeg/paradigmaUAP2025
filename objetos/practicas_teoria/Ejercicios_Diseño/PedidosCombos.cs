/*

abstract class Comida // O puede llamarse ItemPedido
{
    private string Nombre;
    public Comida(string nombre)
    {
        Nombre = nombre;
    }
    public abstract double CalcularPrecioItem();
}

class Plato : Comida
{
    private double Precio;
    public Plato(string nombre, int precio) : base(nombre)
    {
        Precio = precio;
    }
    public override double CalcularPrecioItem()
    {
        return Precio; // retorna su propio precio
    }
}

class Combo : Comida
{
    public List<Plato> platos = new List<Plato>(); // ya la inicializo
    public Combo(string nombre) : base(nombre) { }
    public override double CalcularPrecioItem()
    {
        double total = 0;
        foreach (var plato in platos)
        {
            total += plato.CalcularPrecioItem();
        }
        return total * 0.85;
    }
}

class Pedido
{
    public List<Comida> comidas = new List<Comida>();
    public double CalcularPrecioTotal()
    {
        double total = 0;
        foreach (var item in comidas)
        {
            total += item.CalcularPrecioItem(); // ya sea plato o combo
        }
        return total;
    }

    public void Pagar(ICobrable metodoPago)
    {
        metodoPago.RealizarPago();
    }
}

interface ICobrable // o puede llamar IPagable
{
    public void RealizarPago();
}

class MercadoPago : ICobrable
{
    public void RealizarPago()
    {
        Console.WriteLine("Pagando con mercado..");
    }
}
class Efectivo : ICobrable
{
    public void RealizarPago()
    {
        Console.WriteLine("Pagando con efectivo..");
    }
}
*/




