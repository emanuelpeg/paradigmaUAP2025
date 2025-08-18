class Contador {
  private cuenta: number = 0;

  public incrementar() {
    if (this.cuenta >= 10) {
      throw new Error("El contador no puede superar el valor de 10");
    }
    this.cuenta++;
    if (this.cuenta === 10) {
      console.log("El contador ha alcanzado el valor máximo de 10");
    }
  }
}
export const contador = new Contador();
