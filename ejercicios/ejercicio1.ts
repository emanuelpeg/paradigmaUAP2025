class Contador{
  cuenta: number = 0;

  constructor(inicial: number = 1) {
    this.cuenta = inicial;
  }

//   incrementar(cantidad: number) {
//     this.cuenta++;
// }
}


public incrementar(){
  if(this.cuenta>=10){
    throw new Error("El contador no puede ser mayor a 10");
  }
  this.cuenta++;
  if (this.cuenta === 10){
    console.log("El contador ha llegado a 10");
  }
}


