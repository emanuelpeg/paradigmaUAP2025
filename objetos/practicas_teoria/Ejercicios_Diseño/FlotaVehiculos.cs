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
    private IEnergia energia;

    public Auto(string codigo, string marca, int capacidad, IEnergia energia) 
        : base(codigo, marca, capacidad)
    {
        this.energia = energia;
    }

    public void SetEnergia(IEnergia nuevaEstrategia)
    {
        energia = nuevaEstrategia;
    }

    public void Cargar()
    {
        energia.CargarEnergia();
    }

    public override void IniciarViaje()
    {
        Console.WriteLine($"Auto {Marca} inicia viaje");
        Disponible = false;
    }

    public override void FinalizarViaje()
    {
        Console.WriteLine($"Auto {Marca} finaliza viaje");
        Disponible = true;
    }
}
