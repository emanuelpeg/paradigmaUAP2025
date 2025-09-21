import { Item } from "./Item";
import type { Personaje } from "./Personaje";

export class Inventario {
  private items: Item[] = [];
  private readonly capacidad = 3;

  agregarItem(item: Item): boolean {
    if (this.items.length >= this.capacidad) return false;
    this.items.push(item);
    return true;
  }

  usarItem(nombre: string, personaje: Personaje): boolean {
    const idx = this.items.findIndex(i => i.nombre === nombre);
    if (idx === -1) return false;
    const item = this.items[idx];
    item.usar(personaje);
    this.items.splice(idx, 1);
    return true;
  }

  getItems(): Item[] {
    return [...this.items];
  }
}
