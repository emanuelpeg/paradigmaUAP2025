Abstract class Usuario
{
    private List<Reproduccion> reproduccions = new List<Reproduccion>();
    // atributos, constructor, getters y setters
    public abstract void Escuchar(Reproduccion reproduccion){}
}
class UsuarioGratis : Usuario
{
    public UsuarioGratis(string nombre, string email, string contra) : base(nombre, email, contra) { }
    public override void Escuchar(Reproduccion reproduccion)
    {
        reproduccions.Add(reproduccion);
        Console.WriteLine($"Usuario Gratis {this.Nombre}");
        reproduccion.Reproducir(); // llamamos a la funcion que reproduce a cancion o podcast solicitado
    }
}
class UsuarioPremium : Usuario
{
    public UsuarioPremium(string nombre, string email, string contra) : base(nombre, email, contra) { }
     public override void Escuchar(Reproduccion reproduccion)
    {
        reproduccions.Add(reproduccion);
        Console.WriteLine($"Usuario Premium {this.Nombre}");
        reproduccion.Reproducir();
    }
}
abstract class Reproduccion
{    // atributos, constructor, getters y setters
    public abstract void Reproducir(); // solo declaración. Si fuera virtual si irían los {} con código
}
class Cancion : Reproduccion
{
    private string Album;
    public Cancion(double duracion, string nombre, string album) : base (duracion, nombre)	{ 	Album = album;	}
    // getter y setter
    public override void Reproducir()
    {
        Console.WriteLine($"Estas escuchando la canción {this.Nombre}");
    }
}
class Podcast : Reproduccion
{
    private string Episodio;
    // constructor, getter y setter
    public override void Reproducir()
    {
        Console.WriteLine($"Estas escuchando el Podcast {this.Nombre}");
    }
}
