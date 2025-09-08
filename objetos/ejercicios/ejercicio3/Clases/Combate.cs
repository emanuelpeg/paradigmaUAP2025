using System;
using System.Collections.Generic;

public class Combate
{
    public List<Personaje> Participantes { get; private set; }
    private int TurnoActual;

    public Combate(List<Personaje> participantes)
    {
        Participantes = participantes;
        TurnoActual = 0;
    }

    public void IniciarCombate()
    {
        Console.WriteLine("¡Combate iniciado!");
        while (Participantes.Count > 1)
        {
            SiguienteTurno();
        }
        Console.WriteLine($"¡{Participantes[0].Nombre} ha ganado el combate!");
    }

    public void SiguienteTurno()
    {
        var atacante = Participantes[TurnoActual];
        var objetivo = SeleccionarObjetivo(atacante);
        atacante.Atacar(objetivo);

        if (objetivo.Vida <= 0)
        {
            Console.WriteLine($"{objetivo.Nombre} ha sido derrotado!");
            Participantes.Remove(objetivo);
            if (Participantes.Count == 1) return;
        }

        TurnoActual = (TurnoActual + 1) % Participantes.Count;
    }

    private Personaje SeleccionarObjetivo(Personaje atacante)
    {
        // Elegimos primer personaje que no sea el atacante
        foreach (var p in Participantes)
            if (p != atacante)
                return p;

        return atacante; // fallback (no debería pasar)
    }
}
