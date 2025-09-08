public class Plato : IValorable
{
    private int _id;
    private string _nombre;
    private List<IValorable> _ingredientes; // Puede tener platos o ingredientes

    public Plato(int id, string nombre)
    {
        _id = id;
        _nombre = nombre;
        _ingredientes = new List<IValorable>();
    }

    // Propiedades públicas encapsuladas
    public int Id => _id;
    public string Nombre => _nombre;
    public IReadOnlyList<IValorable> Ingredientes => _ingredientes.AsReadOnly();

    // Método para agregar ingredientes o subplatos
    public void AgregarIngrediente(IValorable ingrediente)
    {
        _ingredientes.Add(ingrediente);
    }

    // Implementación de IValorable
    public decimal GetPrecio()
    {
        decimal precioTotal = 0;
        foreach (IValorable item in _ingredientes)
        {
            precioTotal += item.GetPrecio();
        }
        return precioTotal;
    }
}

