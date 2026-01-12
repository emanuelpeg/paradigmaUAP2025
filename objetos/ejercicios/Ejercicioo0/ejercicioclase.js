//Clase contador que solo tenga incrementar, cada vez que se le llama 1,1,1,1 y cuando llega a 10 un mensaje
var Contador = /** @class */ (function () {
    function Contador() {
        this.cuenta = 0;
    }
    Contador.prototype.incrementar = function () {
        this.cuenta++;
        console.log(this.cuenta); // Muestra el valor actual cada vez
        if (this.cuenta === 10) {
            console.log("La cuenta ha llegado a 10");
        }
    };
    return Contador;
}());
var contador = new Contador();
for (var i = 0; i < 12; i++) {
    contador.incrementar();
}
