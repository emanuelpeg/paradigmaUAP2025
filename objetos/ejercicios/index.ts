import { biblioteca } from "./ejercicio1/Clases/Biblioteca";
import { Socio } from "./ejercicio1/Clases/Socio";

biblioteca.agregarLibro("El Principito", "Antoine de Saint-Exupéry", '987');
biblioteca.agregarLibro("1984", "George Orwell", '654');
biblioteca.agregarLibro("Fahrenheit 451", "Bradbury", '321');

biblioteca.registrarSocio(37178, 'Amir', 'Camargo');
biblioteca.registrarSocio(12345, 'Juan', 'Pérez');
biblioteca.registrarSocio(67890, 'Ana', 'Gómez');

biblioteca["inventario"].forEach(libro => {
    console.log(`- ${libro.titulo} de ${libro.autor} (ISBN: ${libro.isbn})`);
});
