interface Validacion {
    validar(): void;
    mostrar(): string;
}

class Texto implements Validacion {
    private cuerpo: string;

    constructor (cuerpo: string){
        this.cuerpo = cuerpo;
    }

    validar(): void {
        if (!this.cuerpo.trim()){
            throw new Error ("Tiene que tener algun contenido")
        }
    }

    mostrar(): string {
        return `Texto: ${this.cuerpo}`;
    }
}

class Imagen implements Validacion {
    private URL: string;
    private extension = [".jpg", ".png", ".gif"];

    constructor (URL: string){
        this.URL = URL;
    }

    validar(): void {
        
    }
}