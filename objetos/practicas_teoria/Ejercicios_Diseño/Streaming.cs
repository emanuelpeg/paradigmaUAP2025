abstract class Usuario
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public string Email { get; set; }

    public Usuario(int id, string nombre, string email)
    {
        Id = id;
        Nombre = nombre;
        Email = email;
    }

    public abstract bool TieneAccesoIlimitado();

    public virtual void MostrarDatos()
    {
        Console.WriteLine($"{Id} - {Nombre} ({Email})");
    }
}

class UsuarioGratuito : Usuario
{
    public int HorasDisponibles { get; set; } = 5;

    public UsuarioGratuito(int id, string nombre, string email)
        : base(id, nombre, email) { }

    public override bool TieneAccesoIlimitado() => false;

    public override void MostrarDatos()
    {
        base.MostrarDatos();
        Console.WriteLine($"Tipo: Gratuito - Máx {HorasDisponibles} horas/semana");
    }
}

class UsuarioEstandar : Usuario
{
    public UsuarioEstandar(int id, string nombre, string email)
        : base(id, nombre, email) { }

    public override bool TieneAccesoIlimitado() => true;

    public override void MostrarDatos()
    {
        base.MostrarDatos();
        Console.WriteLine("Tipo: Estándar - Acceso ilimitado en 1 dispositivo");
    }
}

class UsuarioPremium : Usuario
{
    public UsuarioPremium(int id, string nombre, string email)
        : base(id, nombre, email) { }

    public override bool TieneAccesoIlimitado() => true;

    public override void MostrarDatos()
    {
        base.MostrarDatos();
        Console.WriteLine("Tipo: Premium - Acceso ilimitado en hasta 4 dispositivos + descargas");
    }
}

class PlataformaStreaming
{
    private List<Usuario> usuarios = new List<Usuario>();

    public void AgregarUsuario(Usuario usuario)
    {
        usuarios.Add(usuario);
    }

    public void ListarUsuariosIlimitados()
    {
        Console.WriteLine("\nUsuarios con acceso ILIMITADO:");
        foreach (var u in usuarios)
        {
            if (u.TieneAccesoIlimitado())
                u.MostrarDatos();
        }
    }

    public void ListarUsuariosLimitados()
    {
        Console.WriteLine("\nUsuarios con acceso LIMITADO:");
        foreach (var u in usuarios)
        {
            if (!u.TieneAccesoIlimitado())
                u.MostrarDatos();
        }
    }
}
