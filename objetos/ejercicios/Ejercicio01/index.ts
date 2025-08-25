import { Biblioteca, bibliotecaInstance } from "./Clases/Biblioteca";

const biblioteca = new Biblioteca();
//generar libros
// Libros clásicos
biblioteca.agregarLibro("1984", "George Orwell", "9780451524935");
biblioteca.agregarLibro("Cien años de soledad", "Gabriel García Márquez", "9780307474728");
biblioteca.agregarLibro("Don Quijote de la Mancha", "Miguel de Cervantes", "9788467033758");
biblioteca.agregarLibro("Orgullo y prejuicio", "Jane Austen", "9780141439518");
biblioteca.agregarLibro("Matar a un ruiseñor", "Harper Lee", "9780061120084");
biblioteca.agregarLibro("El gran Gatsby", "F. Scott Fitzgerald", "9780743273565");
biblioteca.agregarLibro("Crimen y castigo", "Fiódor Dostoyevski", "9780140449136");

// Literatura contemporánea
biblioteca.agregarLibro("Harry Potter y la piedra filosofal", "J.K. Rowling", "9788478884452");
biblioteca.agregarLibro("El código Da Vinci", "Dan Brown", "9780307474278");
biblioteca.agregarLibro("Juego de tronos", "George R.R. Martin", "9780553103540");
biblioteca.agregarLibro("Los juegos del hambre", "Suzanne Collins", "9780439023481");
biblioteca.agregarLibro("El alquimista", "Paulo Coelho", "9780061122415");
biblioteca.agregarLibro("La sombra del viento", "Carlos Ruiz Zafón", "9788408079545");

// Ciencia ficción y fantasía
biblioteca.agregarLibro("Dune", "Frank Herbert", "9780441172719");
biblioteca.agregarLibro("Fundación", "Isaac Asimov", "9780553293357");
biblioteca.agregarLibro("El señor de los anillos", "J.R.R. Tolkien", "9788445071405");
biblioteca.agregarLibro("Un mundo feliz", "Aldous Huxley", "9780060850524");
biblioteca.agregarLibro("Fahrenheit 451", "Ray Bradbury", "9781451673319");

// No ficción y desarrollo personal
biblioteca.agregarLibro("El poder del ahora", "Eckhart Tolle", "9781577314806");
biblioteca.agregarLibro("Hábitos atómicos", "James Clear", "9781847941831");
biblioteca.agregarLibro("Padre rico, padre pobre", "Robert Kiyosaki", "9780446677455");
biblioteca.agregarLibro("Sapiens", "Yuval Noah Harari", "9780062316097");

// Literatura latinoamericana
biblioteca.agregarLibro("Rayuela", "Julio Cortázar", "9788437604572");
biblioteca.agregarLibro("La ciudad y los perros", "Mario Vargas Llosa", "9788420471839");
biblioteca.agregarLibro("Ficciones", "Jorge Luis Borges", "9788437604916");
biblioteca.agregarLibro("Pedro Páramo", "Juan Rulfo", "9788420471877");

// Thriller y misterio
biblioteca.agregarLibro("El silencio de los corderos", "Thomas Harris", "9780312924584");
biblioteca.agregarLibro("La chica del tren", "Paula Hawkins", "9780552779777");
biblioteca.agregarLibro("It", "Stephen King", "9781501142970");
biblioteca.agregarLibro("El psicoanalista", "John Katzenbach", "9788497931345");


//generar socios



biblioteca.agregarSocio(1, "Juan", "Pérez");
biblioteca.agregarSocio(2, "María", "Gómez");
biblioteca.agregarSocio(3, "Carlos", "López");
biblioteca.agregarSocio(4, "Ana", "Martínez");
biblioteca.agregarSocio(5, "Laura", "Sánchez");
biblioteca.agregarSocio(6, "Pedro", "García");
biblioteca.agregarSocio(7, "Lucía", "Fernández");
biblioteca.agregarSocio(8, "Javier", "Ramírez");
biblioteca.agregarSocio(9, "Sofía", "Torres");
biblioteca.agregarSocio(10, "Diego", "Hernández");

