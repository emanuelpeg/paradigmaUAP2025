using System;
using System.Collections.Generic;

public class Juego
{
    public List<Personaje> Personajes { get; private set; }
    public List<Combate> Combates { get; private set; }

    public Juego()
    {
        Personajes = new List<Personaje>();
        Combates = new List<Combate>();
    }

    public void CrearPersonaje(Personaje personaje)
    {
        Personajes.Add(personaje);
        Console.WriteLine($"Personaje {personaje.Nombre} creado.");
    }

    public void IniciarCombate(List<Personaje> seleccionados)
    {
        Combate combate = new Combate(seleccionados);
        Combates.Add(combate);
        combate.IniciarCombate();
    }

    public void SiguienteTurno()
    {
        foreach (var combate in Combates)
        {
            combate.SiguienteTurno();
        }
    }
}
