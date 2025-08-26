import { biblioteca } from "./clases/Biblioteca";
biblioteca.agregarSocio(1, "Juan", "Pérez");
biblioteca.agregarSocio(2, "María", "Gómez");
biblioteca.agregarSocio(3, "Luis", "Rodríguez");
biblioteca.agregarSocio(4, "Ana", "López");

biblioteca.agregarLibro("1984", 0, "1234567890");
biblioteca.agregarLibro("Cien Años de Soledad", 1, "0987654321");
biblioteca.agregarLibro("Don Quijote de la Mancha", 2, "1122334455");
biblioteca.agregarLibro("La Sombra del Viento", 3, "6677889900");
biblioteca.agregarLibro("El Amor en los Tiempos del Cólera", 1, "5544332211");
biblioteca.agregarLibro("La Casa de los Espíritus", 4, "2233445566");
biblioteca.agregarLibro("Ficciones", 5, "3344556677");

biblioteca.agregarAutor(0, "George", "Orwell", "Británica", new Date("1903-06-25"));
biblioteca.agregarAutor(1, "Gabriel", "García Márquez", "Colombiana", new Date("1927-03-06"));
biblioteca.agregarAutor(2, "Miguel", "de Cervantes", "Española", new Date("1547-09-29"));
biblioteca.agregarAutor(3, "Carlos", "Ruiz Zafón", "Española", new Date("1964-09-25"));
biblioteca.agregarAutor(4, "Isabel", "Allende", "Chilena", new Date("1942-08-02"));
biblioteca.agregarAutor(5, "Jorge Luis", "Borges", "Argentina", new Date("1899-08-24"));