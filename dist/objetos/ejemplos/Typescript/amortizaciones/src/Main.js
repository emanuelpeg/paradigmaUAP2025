"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bienes_1 = require("./Bienes");
function main() {
    let bienes = [];
    bienes.push(new Bienes_1.Rodado("Jeep", 2020, 10_000_000, 10000));
    bienes.push(new Bienes_1.Mueble("mesa ratona", 1_500_000, 15));
    for (const bien of bienes) {
        console.log(bien.getNombre() + " --- " + bien.amortizar());
    }
}
// Llamar al método main
main();
