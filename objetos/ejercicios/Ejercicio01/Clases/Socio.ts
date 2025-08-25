export class Socio {
    
    private id: number;
    private nombre: string;
    private apellido: string;

    constructor(    
        protected _id: number,
        protected _nombre: string,
        protected _apellido: string
    ) {}

    public getId(): number { return this._id; }
    public getNombre(): string { return this._nombre;}
    public getApellido(): string { return this._apellido; }
    public gitNombreCompleto(): string {
        return `${this._nombre} ${this._apellido}`;
    }
}