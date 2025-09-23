// objetos/ejercicios/index.ts
import { biblioteca, type Libro } from "./ejercicio1/Clases/Biblioteca";
import { PoliticaFlexible } from "./ejercicio1/Clases/Politicas";

// Libros (uno de referencia)
biblioteca.agregarLibro("El Principito", "Antoine de Saint-Exupéry", "987");
biblioteca.agregarLibro("1984", "George Orwell", "654");
biblioteca.agregarLibro("Diccionario RAE", "RAE", "REF-001", true);

// Socios
const facu = biblioteca.registrarSocio("regular", 36482, "Facu", "Sandoval");
const juan = biblioteca.registrarSocio("vip", 12345, "Juan", "Pérez");
const ana  = biblioteca.registrarSocio("empleado", 777, "Ana", "Biblio");
const vic  = biblioteca.registrarSocio("visitante", 999, "Vicky", "Visita");

// Política dinámica
biblioteca.setPolitica(new PoliticaFlexible());

// Préstamos polimórficos
console.log("Facu → regular:", biblioteca.prestarLibro(facu.id, "987", "regular"));
console.log("Juan → reserva:", biblioteca.prestarLibro(juan.id, "987", "regular"));
console.log("Devolver:", biblioteca.devolverLibro(facu.id, "987")); // pasa a Juan

// Referencia: solo empleado
console.log("Empleado → referencia:", biblioteca.prestarLibro(ana.id, "REF-001", "referencia"));

// Buscador universal
console.log(
  "Buscar '1984':",
  biblioteca.buscarEnSistemas({ titulo: "1984" }).map((l: Libro) => l.obtenerInformacion())
);
