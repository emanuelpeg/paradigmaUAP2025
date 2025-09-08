abstract class Vehiculo
{
    public string Codigo { get; set; }
    public string Marca { get; set; }
    public int Capacidad { get; set; }
    public bool Disponible { get; set; } = true;

    public Vehiculo(string codigo, string marca, int capacidad)
    {
        Codigo = codigo;
        Marca = marca;
        Capacidad = capacidad;
    }

    public abstract void IniciarViaje();
    public abstract void FinalizarViaje();
}

// Estrategia para energía
interface IEnergia
{
    void CargarEnergia();
}

class Combustible : IEnergia
{
    public void CargarEnergia() => Console.WriteLine("Cargando combustible...");
}

class Bateria : IEnergia
{
    public void CargarEnergia() => Console.WriteLine("Recargando batería...");
}

class Auto : Vehiculo
{
    private IEnergia Energia;
    public void AsignarEnergia(IEnergia energia) // el setter
    {
        Energia = energia;
    }
    public void Cargar()
    {
        Energia.CargarEnergia();
    }
    public override void IniciarViaje() { }
    public override void FinalizarViaje() { }
}
