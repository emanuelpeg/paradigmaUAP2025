// Ejercicio 5 - Biblioteca digital

using System.Runtime.InteropServices;

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

