export class Alumno{

    private _notas: number[] = [];

    constructor(private nombre: string, private dni: number){}

    public promedio() {
        var acu = this._notas[0] + this._notas[1] + this._notas[2];
        return acu / 3;
    }

    public get nota1(): number {
        return this._notas[0];
    }

    public get nota2(): number {
        return this._notas[1];
    }

    public get nota3(): number {
        return this._notas[2];
    }

    public set nota1(value : number) {
        this._notas[0] = value;
    }

    public set nota2(value : number) {
        this._notas[1] = value;
    }

    public set nota3(value : number) {
        this._notas[2] = value;
    }
    
}

export class Curso{

    private alumnos: Alumno[] = [];

    constructor(private nombre: string){}

    public promedio() {
        var acu = 0;

        for (const alumno of this.alumnos) {
            acu += alumno.promedio();
        }
        return acu / this.alumnos.length;
    }

    public add(alumno: Alumno){
        this.alumnos.push(alumno);
    }
}


