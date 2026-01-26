import { Personaje } from "../personajes/Personaje";

export interface IMejorable {
    aplicar(personaje: Personaje);
}