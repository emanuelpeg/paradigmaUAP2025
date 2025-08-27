// objetos/ejercicios/index.ts
import { biblioteca } from "./ejercicio1/Clases/Biblioteca";

biblioteca.agregarLibro("El Principito", "Antoine de Saint-Exupéry", "987");
biblioteca.agregarLibro("1984", "George Orwell", "654");
biblioteca.agregarLibro("Fahrenheit 451", "Bradbury", "321");

biblioteca.registrarSocio(36482, "Facu", "Sandoval");
biblioteca.registrarSocio(12345, "Juan", "López");
biblioteca.registrarSocio(67890, "Bruno", "Gimenez");

(biblioteca as any)["inventario"].forEach((libro: any) => {
  console.log(`- ${libro.titulo} de ${libro.autor} (ISBN: ${libro.isbn})`);
});
