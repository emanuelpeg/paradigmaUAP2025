"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Biblioteca_1 = require("./Clases/Biblioteca");
const Politicas_1 = require("./Clases/Politicas");
// Libros (uno de referencia)
Biblioteca_1.biblioteca.agregarLibro("El Principito", "Antoine de Saint-Exupéry", "987");
Biblioteca_1.biblioteca.agregarLibro("1984", "George Orwell", "654");
Biblioteca_1.biblioteca.agregarLibro("Diccionario RAE", "RAE", "REF-001", true);
// Socios
const facu = Biblioteca_1.biblioteca.registrarSocio("regular", 36482, "Facu", "Sandoval");
const juan = Biblioteca_1.biblioteca.registrarSocio("vip", 12345, "Juan", "Pérez");
const ana = Biblioteca_1.biblioteca.registrarSocio("empleado", 777, "Ana", "Biblio");
const vic = Biblioteca_1.biblioteca.registrarSocio("visitante", 999, "Vicky", "Visita");
// Política dinámica
Biblioteca_1.biblioteca.setPolitica(new Politicas_1.PoliticaFlexible());
// Préstamos polimórficos
console.log("Facu → regular:", Biblioteca_1.biblioteca.prestarLibro(facu.id, "987", "regular"));
console.log("Juan → reserva:", Biblioteca_1.biblioteca.prestarLibro(juan.id, "987", "regular"));
Biblioteca_1.biblioteca.devolverLibro(facu.id, "987"); // pasa a Juan
// Referencia: solo empleado
console.log("Empleado → referencia:", Biblioteca_1.biblioteca.prestarLibro(ana.id, "REF-001", "referencia"));
// biblioteca.prestarLibro(facu.id, "REF-001", "referencia"); // debería lanzar error
// Buscador universal
console.log("Buscar '1984':", Biblioteca_1.biblioteca.buscarEnSistemas({ titulo: "1984" }).map(l => l.obtenerInformacion()));
