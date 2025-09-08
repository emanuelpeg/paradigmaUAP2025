using System.Net.Mime;

class Mascota
{
    private string Nombre;
    public List<Contenido> ContenidoMascota = new List<Contenido>();
    private bool PerfilPremium;
    public void Publicar(Contenido contenido)
    {
        if (contenido is Video video && !this.PerfilPremium && video.GetDuracion() > 50)
        {
            Console.WriteLine($"La mascota no puede public el video de {video.GetDuracion} porque no tiene perfil premium");
            return;
        }
        ContenidoMascota.Add(contenido);
        contenido.PublicarContendio();
    }

    public Mascota(string nombre, string especie, int edad, bool perfil)
    {
        Nombre = nombre;
        PerfilPremium = perfil;
    }
    public string GetNombre()
    {
        return Nombre;
    }
    // constructor, getter y setter
}
abstract class Contenido
{
    private int Likes;
    public Contenido(int likes)
    {
        Likes = likes;
    }
    public abstract void PublicarContendio();
    public int GetLikes()
    {
        return Likes;
    }
    public abstract void MostrarDatos();
}

class Video : Contenido
{
    private int Duracion;
    public Video(int likes, int duracion) : base(likes)
    {
        Duracion = duracion;
    }
    public override void PublicarContendio()
    {
        Console.Write("Publicando contenido...");
    }
    public override void MostrarDatos() { }
    public int GetDuracion()
    {
        return Duracion;
    }
}
class Mensaje : Contenido
{
    public Mensaje(int likes) : base(likes) { }

    public override void PublicarContendio()
    {
        Console.Write("Publicando mensaje...");
    }
    public override void MostrarDatos() { }
}

class SistemaMascotas
{
    List<Contenido> contenidos = new List<Contenido>();
    public void ListarPublicacionesMascota(Mascota mascota)
    {
        int TotalLikes = 0;
        foreach (var contenido in mascota.ContenidoMascota)
        {
            contenido.MostrarDatos();
            TotalLikes += contenido.GetLikes();
        }
        Console.WriteLine($"EL total de likes en las publicaciones de la mascota {mascota.GetNombre()} es de {TotalLikes}");
    }
}



 
 