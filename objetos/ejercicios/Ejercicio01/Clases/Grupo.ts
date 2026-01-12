import { Socio } from "./Socio";

export class Grupo{
    private listaSocio: Socio[];
    private listaAutores: Autor[];

    constructor(_listaSocio: Socio[],_listaAutores: Autor[]){
        this.listaSocio = _listaSocio;
        this.listaAutores = _listaAutores;
    }

    getListaSocio(): Socio[]{
        return this.listaSocio;
    }

    getListaAutores(): Autor[]{
        return this.listaAutores;
    }

    addSocio(socio: Socio): void{
        this.listaSocio.push(socio);
    }

    addAutor(autor: Autor): void{
        this.listaAutores.push(autor);
    }

    removeSocio(socio: Socio): void{
        this.listaSocio = this.listaSocio.filter(s => s.getId() !== socio.getId());
    }
    removeAutor(autor: Autor): void{
        this.listaAutores = this.listaAutores.filter(a => a.getIdAutor() !== autor.getIdAutor());
    }

}