    // Ejercicio 5 - Biblioteca digital


using System.Diagnostics.CodeAnalysis;
using System.Runtime.InteropServices;

/*
interface Usuario
{
    public string _nombre { get; set; }
    public List<Prestamo> prestamos { get; set; }
    public void PedirPrestamo(int cantidad_libros, int dias_prestamo);
    public void NotificarUsuario(Usuario usuario);
}

class Profesor : Usuario
{
    public List<Prestamo> prestamos { get; set; }
    public string _nombre { get; set; }

    public Profesor(string Nombre)
    {
        _nombre = Nombre;
        prestamos = new List<Prestamo>();
    }
    public void PedirPrestamo(int cantidad_libros, int dias_prestamo)
    {
        DateTime hoy = DateTime.Now;
        DateTime limite = hoy.AddDays(dias_prestamo); // hoy + dias_prestamo
        prestamos.Add(new Prestamo(limite, hoy, cantidad_libros));
        Console.WriteLine($"El profesor {_nombre} hizo un prestamo de {cantidad_libros} libros.");
        Console.WriteLine($"Tiene {dias_prestamo} para devolver los libros.");
    }

    public void NotificarUsuario(Usuario profesor)
    {
        Console.WriteLine($"El profesor {profesor._nombre} tiene atrasado uno de sus prestamos");
    }
}

class Estudiante : Usuario
{
    public List<Prestamo> prestamos { get; set; }
    public string _nombre { get; set; }

    public Estudiante(string Nombre)
    {
        _nombre = Nombre;
        prestamos = new List<Prestamo>();
    }
    public void PedirPrestamo(int cantidad_libros, int dias_prestamo)
    {
        if (cantidad_libros > 3)
        {
            Console.WriteLine("Los estudiantes no puede retirar mas de tres libros a la vez.");
        }
        DateTime hoy = DateTime.Now;
        DateTime limite = hoy.AddDays(dias_prestamo); // hoy + dias_prestamo
        prestamos.Add(new Prestamo(limite, hoy, cantidad_libros));
        Console.WriteLine($"El estudiante {_nombre} retiró {cantidad_libros} libros.");
        Console.WriteLine($"Tiene {dias_prestamo} para devolver los libros.");
    }
    public void NotificarUsuario(Usuario estudiante)
    {
        Console.WriteLine($"El estudiante {estudiante._nombre} tiene atrasado uno de sus prestamos");
    }
}

class Notificaciones
{
    private List<Usuario> usuarios;
    public void EnviarMailAtraso()
    {
        foreach (var usuario in usuarios)
        {
            foreach (var prestamo in usuario.prestamos)
            {
                if (DateTime.Now > prestamo._fecha_limite)
                {
                    usuario.NotificarUsuario(usuario);
                }
            }
        }
    }
}

class Prestamo
{
    public DateTime _fecha_limite { get; set; }
    public DateTime _fecha_prestamo { get; set; }
    public int _cantidad_libros { get; set; }

    public Prestamo(DateTime fecha_limite, DateTime fecha_prestamo, int cantidad_libros)
    {
        _fecha_limite = fecha_limite;
        _fecha_prestamo = fecha_prestamo;
        _cantidad_libros = cantidad_libros; 
    }
}

class Biblioteca
{
    public List<object> libros = new List<object>();
    public void ConsultarCatalogo()
    {
        Console.WriteLine("Catálogo de libros: ");
        foreach (var libro in libros)
        {
            Console.WriteLine(libro);
        }
    }
}
*/

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
    public List<Persona> usuarios { get; set; } = new List<Persona>(); // la lista es de tipo IPrestable, lo que significa 
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


