using System.Runtime.CompilerServices;
using System.Security.Cryptography;


abstract class Cuenta
{
    public string Nombre;
    public string Direccion;
    public int Cuit;

    public Cuenta(string nombre, string direccion, int cuit)
    {
        Nombre = nombre;
        Direccion = direccion;
        Cuit = cuit;
    }

    public abstract void MostrarDatosCuenta();

    // Getters
    // Setters
}

class CajaAhorro : Cuenta
{
    public int InteresMensualAsociado;
    public CajaAhorro(string nombre, string direccion, int cuit, int interesMensual) : base(nombre, direccion, cuit)
    {
        InteresMensualAsociado = interesMensual;
    }

    public override void MostrarDatosCuenta()
    {
        Console.WriteLine($"{Nombre} - {Direccion} - {Cuit} - {InteresMensualAsociado}");
    }

    // Getters
    // Setters
}

class CuentaCorriente : Cuenta
{
    public int LimiteDescubierto;
    public CuentaCorriente(string nombre, string direccion, int cuit, int limiteDesc) : base(nombre, direccion, cuit)
    {
        LimiteDescubierto = limiteDesc;
    }

    public override void MostrarDatosCuenta()
    {
        Console.WriteLine($"{Nombre} - {Direccion} - {Cuit} - {LimiteDescubierto}");      
    }

    // Getters
    // Setters
}

class Cliente
{
    public List<Cuenta> cuentas = new List<Cuenta>();
    public void AgregarCuenta(Cuenta cuenta)
    {
        cuentas.Add(cuenta);
    }

    public void ListarCuentas()
    {
        foreach (var cuenta in cuentas)
        {
            cuenta.MostrarDatosCuenta();
        }
    }
}
class Banco
{
    public List<Cliente> clientes = new List<Cliente>();
    public void ListarClientes()
    {
        foreach (var cliente in clientes)
        {
            cliente.ListarCuentas();
        }
    }
}
*/