// objetos/ejercicios/ejercicio1/Clases/Socio.ts
export type TipoSocio = "regular" | "vip" | "empleado" | "visitante";

export class Socio {
  constructor(
    public id: number,
    public nombre: string,
    public apellido: string,
    public tipo: TipoSocio
  ) {}
}