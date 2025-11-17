abstract class Pedido
{
    protected int Id;
    public Cliente clientePedido;
    List<Plato> platos = new List<Plato>();

    // constructor
    // getters
    // setters

    public virtual int CalcularTotal()
    {
        int total = 0;
        foreach (var plato in platos)
        {
            total += plato.precio;
        }
        return total;
    }
    public virtual void MostrarDetalle()
    {
        Console.WriteLine($"Pedido Id {Id} - Cliente {clientePedido.Nombre} - Cantidad Platos {platos.Count}");
    }
}

class Plato
{
    public int precio;
    // constructor
}
interface IDelivery
{
    void AsignarRepartidor();
}

class PedidoDelivery : Pedido, IDelivery
{
    private string Direccion;
    private int Telefono;
    public void AsignarRepartidor()
    {

    }
}
class PedidoTakeAway : Pedido
{
    private string Horario;

}

class PedidoLocal : Pedido
{
    private int NumeroMesa;
}

class Cliente
{
    public string Nombre;
}

class Restuarante
{
    List<Pedido> pedidos = new List<Pedido>();
    public void ListarPedidosCliente(Cliente cliente)
    {
        foreach (var pedido in pedidos)
        {
            if (pedido.clientePedido == cliente)
            {
                pedido.MostrarDetalle();
            }
        }
    }

    public void TotalVentas()
    {
        int total = 0;
        foreach (var pedido in pedidos)
        {
            total += pedido.CalcularTotal();
        }
        Console.WriteLine($"El precio total de todos los pedidos es de ${total}");
    } 
}

