/*
Actividad 3:  
La empresa Tarjeta Violeta lo contrata para hacer un sistema que mantenga los datos de sus clientes, 
los clientes pueden ser beneficiarios de la tarjeta, los cuales pueden gastar un monto de dinero por mes, 
que luego pueden abonar en cuotas. O afiliados, son los negocios en donde el beneficiario realiza una compra 
y se le debe poder abonar el monto gastado.

Los datos de los beneficiarios son: cuit, nombre, apellido, dirección y número de cuenta donde se debitarán las cuotas.

Los datos de los afiliados son: cuit, nombre, apellido, dirección y número de cuenta donde se depositará por mes, 
lo gastado por los beneficiarios.

Diseñe un software que permita listar los clientes cargados. Tenga en cuenta que un cliente puede ser beneficiario 
y afiliado a la vez.
*/

/*


public class Cliente
{
    private string Cuit;
    private string Nombre;
    private string Apellido;
    private string Direccion;
    private string NumeroCuenta;

    // aplicamos composicion para que un cliente pueda tener uno o varios roles
    public IList<IRol> Roles = new List<IRol>(); // cada cliente ya sea beneficiario o afiliado, va a tener una lista de roles. 
                                                 // ya que un beneficiario puede ser afiliado y viceversa 
    public Cliente(string cuit, string nombre, string apellido,
                   string direccion, string cuenta)
    {
        Cuit = cuit; Nombre = nombre; Apellido = apellido;
        Direccion = direccion; NumeroCuenta = cuenta;
    }

    public string getNombre() => $"{Nombre} {Apellido}";
}

public interface IRol
{
    void Transferir(double monto, Cliente otro); // Transferir representa "mover/registrar dinero" según el rol.
                                                  // En Beneficiario: registrar un gasto (compra) en un Afiliado.
                                                  // En Afiliado: registrar que recibe/acepta el dinero por ventas.
}

public class Beneficiario : IRol
{
    private Cliente cliente; // referencia al cliente que tiene este rol. Sirve para luego mostrar su nombre en el mensaje.
                             // yo me había preguntado cómo o en qué momento se instanciada el Cliente en este rol.
                             // Y era obvio, se lo pasamos por el constructor al crearlo en el program.
    private double monto_total; // monto total que puede gastar el beneficiario en el mes
    private int cuenta; // numero de cuenta desde donde se debita el dinero


    public Beneficiario(double monto_total, Cliente cliente, int cuenta)
    {
        this.cuenta = cuenta;
        this.cliente = cliente;
        this.monto_total = monto_total;
    }

    public void Transferir(double monto, Cliente afiliado)
    {
        if (monto > monto_total)
            throw new Exception("No tiene saldo suficiente"); // throw new Exception es una forma de manejar errores en C#. 
        monto_total -= monto;
        Console.WriteLine($"{cliente.getNombre} transfirió {monto} en el afiliado {afiliado.getNombre}"); // aqui hacemos uso de la referencia al cliente para mostrar su nombre.
    }
}

public class Afiliado : IRol
{
    private Cliente cliente; // referencia al cliente que tiene este rol. Sirve para luego mostrar su nombre en el mensaje.
    private double monto_total;
    private int cuenta; // numero de cuenta donde se deposita el dinero

    public Afiliado(double monto_total, Cliente cliente, int cuenta)
    {
        this.monto_total = monto_total;
        this.cliente = cliente;
        this.cuenta = cuenta;
    }

    public void Transferir(double monto, Cliente beneficiario) // en el caso del afiliado, no usamos el parametro "otro", pero lo dejamos para mantener la firma del metodo igual en ambas clases.
    {
        monto_total += monto;
        Console.WriteLine($"{cliente.getNombre} recibió {monto} del beneficiario {beneficiario.getNombre}"); // aqui hacemos uso de la referencia al cliente para mostrar su nombre.
    }
}

public class Empresa
{
    private List<Cliente> clientes = new List<Cliente>(); // se crea la lista al crear la empresa.

    public void ListarRoles(Cliente cliente)
    {
        foreach (var rol in cliente.Roles)
        {
            Console.WriteLine(rol);
        }

    }
    public void ListarClientes()
    {
        foreach (var cliente in clientes) // recorro los clientes
        {
            foreach (var rol in cliente.Roles)
            {
                if (rol is Beneficiario) // compara con el tipo de objeto que es el rol
                {
                    Console.WriteLine($"El cliente {cliente.getNombre()} es beneficiario.");
                }
                else if (rol is Afiliado)
                {
                    
                }
            }
        }
    }
}

*/
