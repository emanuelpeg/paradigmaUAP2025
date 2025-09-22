import { PoliticaEstricta } from "./clases/PoliticaPrestamo";
import { biblioteca } from "./clases/Biblioteca";
import { TipoSocio } from "./clases/Socio";
import { PrestamoRegular, PrestamoCorto, PrestamoReferencia, PrestamoDigital } from "./clases/Prestamo";
import { BuscadorUniversal } from "./clases/BuscadorUniversal";
import { CatalogoBiblioteca } from "./clases/CatalogoBiblioteca";
import { Libro } from "./clases/Libro";



biblioteca.agregarLibro("El quijote", "Cervantes", "1234");
biblioteca.agregarLibro("Hábitos Atómicos", "James Clear", "2345");
const libro1984 = biblioteca.agregarLibro("1984", "Orwell", "1984");

    const prestamoRegular = new PrestamoRegular(libro1984, new Date());
const prestamoCorto = new PrestamoCorto(libro1984, new Date());
 const prestamoReferencia = new PrestamoReferencia(libro1984, new Date());
  const prestamoDigital = new PrestamoDigital(libro1984, new Date());

const prestamos = [prestamoRegular, prestamoCorto, prestamoReferencia, prestamoDigital];
 const politica = new PoliticaEstricta();
const socio = biblioteca.buscarSocio(31882);
  const libroQuijote = biblioteca.buscarLibro("1234");
const catalogo = new CatalogoBiblioteca();


catalogo.agregarLibro(new Libro("El quijote", "Cervantes", "1234"));
catalogo.agregarLibro(new Libro("1984", "Orwell", "1984"));

const buscador = new BuscadorUniversal<Libro>(catalogo);
const resultados = buscador.buscarPor(libro => libro.autor === "Orwell");
console.log(resultados);

biblioteca.registrarSocio(TipoSocio.REGULAR, 31882, "Lucciano", "Curotto");
 biblioteca.registrarSocio(TipoSocio.VIP, 20321, "Luca", "Giordana");
  biblioteca.registrarSocio(TipoSocio.EMPLEADO, 32451, "Samuel", "Olmos");

console.log(libro1984.titulo, libro1984.autor, libro1984.isbn);


prestamos.forEach((prestamo, i) => {
     const vencimiento = prestamo.calcularVencimiento();
    const multa = prestamo.calcularMulta(new Date()); 
    console.log(`Prestamo ${i + 1}: Vencimiento = ${vencimiento}, Multa = ${multa}`);
});


if (socio && libroQuijote) {
  try {
     biblioteca.prestarLibro(socio, libroQuijote, politica);
     console.log("Préstamo realizado con política estricta");
  } catch (e) {
    console.log("No se pudo prestar:", String(e));
  }
}