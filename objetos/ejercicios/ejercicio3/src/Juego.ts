import { Personaje } from "./Personaje";

export class Juego {
  combateSimple(p1: Personaje, p2: Personaje): string {
    let turno = 0;
    while (p1.estaVivo() && p2.estaVivo()) {
      if (turno % 2 === 0) {
        p1.atacar(p2);
      } else {
        p2.atacar(p1);
      }
      turno++;
    }
    return p1.estaVivo() ? p1.nombre : p2.nombre;
  }

  combate(personajes: Personaje[]): string {
    let vivos = personajes.filter(p => p.estaVivo());
    let turno = 0;
    while (vivos.length > 1) {
      for (let i = 0; i < vivos.length; i++) {
        if (!vivos[i].estaVivo()) continue;
        // El mago puede atacar hasta 3 enemigos
        if ((vivos[i] as any).constructor.name === "Mago") {
          const objetivos = vivos.filter((p, idx) => idx !== i && p.estaVivo()).slice(0, 3);
          if (objetivos.length > 0) vivos[i].atacar(objetivos);
        } else {
          // Ataca al siguiente vivo
          const objetivo = vivos.find((p, idx) => idx !== i && p.estaVivo());
          if (objetivo) vivos[i].atacar(objetivo);
        }
      }
      vivos = personajes.filter(p => p.estaVivo());
      turno++;
    }
    return vivos[0]?.nombre || "Nadie";
  }
}
