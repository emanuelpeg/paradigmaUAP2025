class Usuario
{
    public string Nombre { get; set; }
    private string Email { get; set; }
    private ITipo tipoUsuario; // puede ser premiun, medio, gratuito

    public Usuario(int id, string nombre, string email, ITipo tipouser)
    {
        Nombre = nombre;
        Email = email;
        tipoUsuario = tipouser;
    }
    public bool UsuarioTieneAccesoIlimitado()
    {
        return tipoUsuario.TieneAccesoIlimitado();
    }
    public void UsuarioMostrarDatos()
    {
        tipoUsuario.MostrarDatos(); //polimorfismo
    }
    // getters y setters
}
interface ITipo
{
    bool TieneAccesoIlimitado();
    void MostrarDatos();
}

class UsuarioGratuito : ITipo
{
    public int HorasDisponibles { get; set; } = 5;
    public bool TieneAccesoIlimitado() => false;
    public void MostrarDatos()
    {
        Console.WriteLine($"Tipo: Gratuito - Máx {HorasDisponibles} horas/semana");
    }
}

class UsuarioEstandar : ITipo
{
    // atributos  y constructor
    public bool TieneAccesoIlimitado() => true;

    public void MostrarDatos()
    {
        Console.WriteLine("Tipo: Estándar - Acceso ilimitado en 1 dispositivo");
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
            if (u.UsuarioTieneAccesoIlimitado())
                u.UsuarioMostrarDatos();
        }
    }
}

