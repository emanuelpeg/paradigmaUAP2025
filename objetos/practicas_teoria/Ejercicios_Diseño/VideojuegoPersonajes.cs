
// Este diseño lo pensé asi: cada pessonaje vuelva, o camina o nada a su manera. Con su propia implementacion:
// Un Mago vuela con escoba ✨
//Un Guerrero vuela en dragón 🐉
// Un Arquero planea con alas 🪽

// Abajo voy a hacer otro diseño pensando que todos implementan algunos movimientos pero todos son genéricos.
/*
interface IVolar
{
    public void Volar();
}

abstract class Personaje
{
    protected string Nombre;
    protected int Nivel;
    public Personaje(string nombre, int nivel)
    {
        Nombre = nombre;
        Nivel = nivel;
    }
    public abstract void Atacar(); // cada uno ataca a su manera.
}
interface ICaminar
{
    public void Caminar();
}

interface INadar
{
    public void Nadar();
}

class Guerrero : Personaje, ICaminar, IVolar
{
    public Guerrero(string nombre, int nivel) : base(nombre, nivel) { }
    public override void Atacar(){}
    public void AtacarEspada()
    {

    }
    public void Caminar()
    {

    }
    public void Volar()
    {
        
    }
}
class Mago : Personaje, INadar, IVolar, ICaminar
{
    public Mago(string nombre, int nivel) : base(nombre, nivel) { }
    public override void Atacar(){}
    public void LanzarHechizo()
    {

    }
    public void Caminar()
    {

    }
    public void Volar()
    {

    }
    public void Nadar()
    {
        
    }
}
class Arquero : Personaje, INadar, IVolar
{
    public Arquero(string nombre, int nivel) : base(nombre, nivel) { }

    public override void Atacar() { }
    public void DispararFlecha()
    {

    }
    public void Volar()
    {

    }
    public void Nadar()
    {

    }
}
*/


// ======================================================================================================================
// ======================================================================================================================
// ======================================================================================================================


class Mago : Personaje
{
    public Mago(string nombre, int nivel) : base(nombre, nivel) { }

}
class Guerrero : Personaje
{
    public Guerrero(string nombre, int nivel) : base(nombre, nivel) { }
}
class Arquero : Personaje
{
    public Arquero(string nombre, int nivel) : base(nombre, nivel) { }
}
interface IHabilidad
{
     void Ejecutar();

}

class Volador : IHabilidad
{
    public void Ejecutar()
    {
        Console.WriteLine("Estoy volando");
    }
}

class Nadador : IHabilidad
{
    public void Ejecutar()
    {
        Console.WriteLine("Estoy nadando");
    }
}
class Caminador : IHabilidad
{
    public void Ejecutar()
    {
        Console.WriteLine("Estoy caminando");
    }
}

abstract class Personaje
{
    protected string Nombre;
    protected int Nivel;
    public List<IHabilidad> habilidades = new List<IHabilidad>();
    public Personaje(string nombre, int nivel)
    {
        Nombre = nombre;
        Nivel = nivel;
    }
    public void AgregarHabilidad(IHabilidad habilidad)
    {
        habilidades.Add(habilidad);
    }
    public void EjecutarHabilidad(IHabilidad habilidad)
    {
        if (habilidades.Contains(habilidad))
        {
            habilidad.Ejecutar();
        }
        Console.WriteLine("El personaje no posee esa habilidad...");
    }
}

