/*
abstract class Vehiculo
{
    private string Patente;
    private Compañia CompañiaTercerizada;
    public abstract void MostrarDatos();
    public virtual void RegistrarCompañia(Compañia compañia)
    {
        this.CompañiaTercerizada = compañia;
    }
}

class Compañia
{
    private List<Vehiculo> vehiculos;
    private string Nombre;
}

class Camion : Vehiculo
{
    private int CantidadToneladas;
    public override void MostrarDatos()
    {
        Console.WriteLine($"Camion: Patente {Patente} - Cantidad Toneladas {CantidadToneladas}");
    }
    
}

class Colectivo : Vehiculo
{
    private int CantidadPasajeros;
    public override void MostrarDatos()
    {
        Console.WriteLine($"Colectivo: Patente {Patente} - Cantidad Pasajeros {CantidadPasajeros}");
    }
}

class Empresa
{
    private List<Vehiculo> vehiculosEmpresa;
    public void ListarVehiculos()
    {
        foreach (var vehiculo in vehiculosEmpresa)
        {
            vehiculo.MostrarDatos();
        }
    }

}
*/

