class Autor{
    private idAutor: number;
    private nombre:string;
    private apellido:string;
    private descripcion:string;

    

    constructor(_idAutor: number, _nombre:string, _apellido:string){
        this.idAutor = _idAutor;
        this.nombre = _nombre;
        this.apellido = _apellido;
    }   

    public getNombre(): string {
        return this.nombre;
    }
    public getApellido(): string {
        return this.apellido;
    }
    public getIdAutor(): number {
        return this.idAutor;
    }
    public getDescripcion(): string{
        return this.descripcion;
    }




}

/*


*/ 