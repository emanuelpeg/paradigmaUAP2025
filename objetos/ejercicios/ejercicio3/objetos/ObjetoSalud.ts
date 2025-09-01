import { IMejorable } from "../interfaces/IMejorable";
import { Personaje } from "../personajes/Personaje";

export class ObjetoSalud implements IMejorable {
    private _statBoost = 40;

    constructor() { }

    aplicar(personaje: Personaje) {
        personaje.sumarVida(this._statBoost);
    }
}