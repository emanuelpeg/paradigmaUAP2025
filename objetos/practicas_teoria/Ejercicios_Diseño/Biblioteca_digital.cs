// Ejercicio 5 - Biblioteca digital


abstract class Persona // clas abstracta porque comparten los mismos datos y metodos
{
    private string Nombre;
    private string Apellido;
    public virtual string NombreCompleto => $"{Nombre} {Apellido}";
    private int DNI;

    public Persona(string nombre, string apellido, int dni)
    {
        Nombre = nombre;
        Apellido = apellido;
        DNI = dni;
    }

    public virtual void Notificar() // un metodo que puede o no ser sibreescrito por otra clase. Profesor y Estudiante la dejarán asi,
                                    // pero Jefe la va a cambiar, porque el quiere recibir notificaciones DE los usuarios atrsados.
    {
        Console.WriteLine("Tiene atrasado sus prestamos. Por favor, devuelva los libros");
    }
}

interface IPrestable
{
    public List<Prestamo> prestamos { get; set; } // creamos la lista, pero la volvemos a crear e inicializar en las hijas
    public void PedirPrestamo(int cantidad_libros);
}

class Profesor : Persona, IPrestable
{
    public List<Prestamo> prestamos { get; set; } = new List<Prestamo>(); // inicializar la lista
    public Profesor(string nombre, string apellido, int dni) : base(nombre, apellido, dni) { }

    public void PedirPrestamo(int cantidad_libros) // un profesor no tiene limite de libros para llevar
    {
        DateTime hoy = DateTime.Now;
        DateTime limite = hoy.AddDays(2); // 20 dias fijo
        prestamos.Add(new Prestamo(cantidad_libros, hoy, limite));
    }
}

class Estudiante : Persona, IPrestable
{
    public List<Prestamo> prestamos { get; set; } = new List<Prestamo>(); // inicializar la lista
    public Estudiante(string nombre, string apellido, int dni) : base(nombre, apellido, dni) { }

    public void PedirPrestamo(int cantidad_libros) // un profesor no tiene limite de libros para llevar
    {
        if (cantidad_libros > 3)
        {
            Console.WriteLine("El máximo de libros por prestamo es de 3");
            return;
        }
        DateTime hoy = DateTime.Now;
        DateTime limite = hoy.AddDays(2); // 20 dias fijo
        prestamos.Add(new Prestamo(cantidad_libros, hoy, limite));
    }
}

class Jefe : Persona
{
    public Jefe(string nombre, string apellido, int dni) : base(nombre, apellido, dni) { }

    public override void Notificar()
    {
        Console.WriteLine($"Hay prestamos atrasados");
    }
}

class Biblioteca_digital
{
    public List<IPrestable> usuarios { get; set; } = new List<IPrestable>(); // la lista es de tipo IPrestable, lo que significa 
                                                                       // que solo va a almcaenar objetos que la implementen
                                                                       // O sea, Profesor y Estudiante.
    public void ObtenerPrestamosAtrasados()
    {
        foreach (var usuario in usuarios) // usuario es de tipo Persona. El tiene Notificar()
        {
            if (usuario is IPrestable prestatario)
            {          
                foreach (var prestamo in prestatario.prestamos) // recorre los prestamos de cada estudiante o profesor
                {
                    DateTime hoy = DateTime.Now;
                    //if (hoy > prestamo.GetFechaLimite()) // si se pasó la fecha limite de devolver los libros.. se notifica
                    {
                        usuario.Notificar(); // quise poner "prestatario.prestamos" pero da error xq prestatario no tiene 
                                            // un metodo Notificar(). Lo tiene Persona
                    }
                } 
            }
        }
    }
}

class Prestamo
{
    private int cantidad_libros;
    private DateTime fecha_inicio;
    private DateTime fecha_limite;
    public Prestamo(int libros, DateTime incio, DateTime limite)
    {
        cantidad_libros = libros;
        fecha_inicio = incio;
        fecha_limite = limite;
    }
    public int GetCantidadLibros()
    {
        return cantidad_libros;
    }
    public DateTime GetFechaInicio()
    {
        return fecha_inicio;
    }
    public DateTime GetFechaLimite()
    {
        return fecha_limite;
    }
}
*/

