import { IBuscable } from "./SistemasBusqueda";

export class BuscadorUniversal {
  private sistemas: IBuscable[] = [];

  agregarSistema(sistema: IBuscable) {
    this.sistemas.push(sistema);
  }

  buscarEnTodos(criterio: string): any[] {
    let resultados: any[] = [];
    for (const sistema of this.sistemas) {
      resultados = resultados.concat(sistema.buscarPor(criterio));
    }
    return resultados;
  }
}
