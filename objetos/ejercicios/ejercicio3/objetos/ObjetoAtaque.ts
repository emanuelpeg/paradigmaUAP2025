import { IMejorable } from "../interfaces/IMejorable";
import { Personaje } from "../personajes/Personaje";

export class ObjetoAtaque implements IMejorable {
    private _statBoost = 10;

    constructor() {}

    aplicar(personaje: Personaje) {
        personaje.sumarAtaque(this._statBoost);
    }
}
