export class Autor {
  constructor(
    public nombre: string,
    public biografia: string = "",
    public anioNacimiento?: number
  ) {}
}