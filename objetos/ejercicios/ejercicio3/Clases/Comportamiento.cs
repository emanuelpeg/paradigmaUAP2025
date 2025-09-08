


using System;
public interface IComportamientoAtaque
{
    void Atacar(Personaje atacante, Personaje objetivo);
}


public class ComportamientoGuerrero : IComportamientoAtaque
{
    public void Atacar(Personaje atacante, Personaje objetivo)
    {
        int daño = atacante.DañoBase;
        objetivo.ModificarVida(-daño);
        Console.WriteLine($"{atacante.Nombre} golpea a {objetivo.Nombre} por {daño} de daño.");
    }
}

public class ComportamientoMago : IComportamientoAtaque
{
    private Random random = new Random();

    public void Atacar(Personaje atacante, Personaje objetivo)
    {
        int daño = random.Next(atacante.DañoBase - 5, atacante.DañoBase + 10);
        objetivo.ModificarVida(-daño);
        Console.WriteLine($"{atacante.Nombre} lanza hechizo sobre {objetivo.Nombre} causando {daño} de daño.");
    }
}

public class ComportamientoArquero : IComportamientoAtaque
{
    private Random random = new Random();

    public void Atacar(Personaje atacante, Personaje objetivo)
    {
        if (random.Next(0, 100) < 25)
        {
            Console.WriteLine($"{atacante.Nombre} falló el tiro contra {objetivo.Nombre}.");
            return;
        }
        int daño = atacante.DañoBase + 5;
        objetivo.ModificarVida(-daño);
        Console.WriteLine($"{atacante.Nombre} dispara a {objetivo.Nombre} causando {daño} de daño.");
    }
}
