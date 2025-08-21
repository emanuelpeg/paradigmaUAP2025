/*
clase contador en ts con una sola instancia q solo tenga incrementar, 
cda vez q se llama se incrementa en 1 y cdo llega a 10 muestra un mensaje, 
y no se puede incrementar mas de 10
*/

class Contador {
  private static instancia: Contador; // Propiedad estática para almacenar la única instancia -- Singleton
  private contador: number; //Propiedad privada

  // Método estático para obtener la instancia única -- Singleton
  private constructor() {
    this.contador = 0; // Inicializa el contador en 0
  }

  incrementar() {
    if (this.contador < 10) {
      this.contador++; // Incrementa el contador en 1
    }
    if (this.contador === 10) {
      console.log("El contador no puede ser mayor a 10");
    }
  }

  public static getInstancia(): Contador{
    if(!Contador.instancia){ //Si esto es falso, entonces creamos un nuevo objeto Contador
      Contador.instancia = new Contador();
    }
    return Contador.instancia;
  }

  getValor() {
    return this.contador; // Devuelve el valor actual del contador
  }

}

// Uso de la clase Contador
const c1 = Contador.getInstancia(); // Crea un objeto o instancia del tipo Contador
const c2 = Contador.getInstancia();

c1.incrementar();
c2.incrementar();

console.log(c1.getValor());
console.log(c2.getValor());

console.log(typeof c1);
console.log(typeof Contador);

console.log();
console.log(typeof c1.incrementar());