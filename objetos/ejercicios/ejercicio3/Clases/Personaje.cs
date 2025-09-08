using System;
using System.Collections.Generic;

public class Personaje
{
    public int Id { get; private set; }
    public string Nombre { get; private set; }
    public int Vida { get; private set; }
    public int DañoBase { get; private set; }
    public List<Objeto> Inventario { get; private set; }
    public IComportamientoAtaque Comportamiento { get; private set; }

    public Personaje(int id, string nombre, int vida, int daño, IComportamientoAtaque comportamiento)
    {
        Id = id;
        Nombre = nombre;
        Vida = vida;
        DañoBase = daño;
        Comportamiento = comportamiento;
        Inventario = new List<Objeto>();
    }

    public void Atacar(Personaje objetivo)
    {
        Comportamiento.Atacar(this, objetivo);
    }

    public void ModificarVida(int cantidad)
    {
        Vida = Math.Max(0, Vida + cantidad);
    }

    public void CambiarComportamiento(IComportamientoAtaque nuevoComportamiento)
    {
        Comportamiento = nuevoComportamiento;
    }

    public void UsarObjeto(Objeto objeto)
    {
        objeto.FuncionObjeto(this);
        Inventario.Remove(objeto);
    }
}
