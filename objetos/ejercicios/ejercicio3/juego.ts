abstract class Personaje {
  constructor(
    public _nombre: string,
    private _vida: number  = 100,
    public _ataque: number = 10, 
  ) { }

  get vida(){
    return this._vida;
  }

  abstract atacar(): void;
  abstract recibirDanio(): void;
  abstract estaVivo(): boolean;
}

class Item{
  constructor(
    public nombre: string,
    public efecto: (personaje: Personaje) => void
  ){}
}