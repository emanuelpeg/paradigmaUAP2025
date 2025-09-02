
/*
abstract class Usuario
{
    private string Nombre;
    private string Email;
    private string Contraseña;
    private List<Reproduccion> reproduccions = new List<Reproduccion>();
    public Usuario(string nombre, string email, string contra)
    {
        Nombre = nombre;
        Email = email;
        Contraseña = contra;
    }
    // getters
    //setters
    public virtual void Escuchar(Reproduccion reproduccion)
    {
        reproduccions.Add(reproduccion);
        Console.WriteLine($"{this.Nombre}:");
        reproduccion.Reproducir(); // llamamos a la funcion que reproduce a cancion o podcast solicitado
    }
}

class UsuarioGratis : Usuario
{
    public UsuarioGratis(string nombre, string email, string contra) : base(nombre, email, contra) { }
}
class UsuarioPremium : Usuario
{
    public UsuarioPremium(string nombre, string email, string contra) : base(nombre, email, contra) { }
}

class UsuarioFamiliar : Usuario
{
    public UsuarioFamiliar(string nombre, string email, string contra) : base(nombre, email, contra) { }
}

abstract class Reproduccion
{
    protected double Duracion; // proected para las hijas
    protected string Nombre;
    public Reproduccion(double duracion, string nombre)
    {
        Duracion = duracion;
        Nombre = nombre;
    }
    //getter
    //setter
    public abstract void Reproducir(); // solo declaracion. Si fuera virtual si irían los {} con codigo
}

class Cancion : Reproduccion
{
    private string Album;
    public Cancion(double duracion, string nombre, string album) : base (duracion, nombre)
    {
        Album = album;
    }
    // getter y setter
    public override void Reproducir()
    {
        Console.WriteLine($"Estas escuchando la canción {this.Nombre}");
    }
}

class Podcast : Reproduccion
{
    private string Episodio;
    public Podcast(double duracion, string nombre, string episodio) : base (duracion, nombre)
    {
        Episodio = episodio;
    }
    // getter y setter
        public override void Reproducir()
    {
        Console.WriteLine($"Estas escuchando el Podcast {this.Nombre}");
    }
}
*/



