using System.Diagnostics;

abstract public class Personaje
{
  public string nombre;
  private int vida = 100;
  private int ataque = 10;
  //Los personas tienen un inventario de objetos
  abstract public void Atacar();
  abstract public void RecibirDanio();
  abstract public bool EstaVivo();

  //getters y setters para vida
  public int GetVida()
  {
    return vida;
  }

  public void SetVida(int vida)
  {
    this.vida = vida;
  }
}

abstract public class Item
{
  public string nombre;
  public int efecto; // (número que representa cuánto cura o daño hace)

  //Método abstracto: usar(personaje) - cada subclase lo implementará diferente
  abstract public void Usar();
}


//composicion inventario
public class Inventario
{
  private List<Item> items;

  public Inventario()
  {
    items = new List<Item>();
  }

  public void AgregarItem(Item item)
  {
    items.Add(item);
  }

  public void RemoverItem(Item item)
  {
    items.Remove(item);
  }

  public List<Item> GetItems()
  {
    return items;
  }
}