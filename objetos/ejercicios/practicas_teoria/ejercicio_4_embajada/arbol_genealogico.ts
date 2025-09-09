import { persona } from "./persona";

export class arbol_genealogico {

    private padres: arbol_genealogico[];
    private abuelos: arbol_genealogico[];
    

    constructor(nombre: string, edad: number) {
        this.padres = [];
        this.abuelos = [];
    }

    private agregarPadre(padre: arbol_genealogico): void {
        this.padres.push(padre);
    }
    private agregarAbuelo(abuelo: arbol_genealogico): void {
        this.abuelos.push(abuelo);
    }

}


