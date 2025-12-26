import { biblioteca } from "./Biblioteca";
import { PoliticaEstricta, PoliticaFlexible, PoliticaEstudiante, PoliticaDocente } from "./Politicas";


const cervantes = biblioteca.agregarAutor(1, "Miguel de Cervantes");
const clear     = biblioteca.agregarAutor(2, "James Clear");
const orwell    = biblioteca.agregarAutor(3, "George Orwell");


biblioteca.agregarLibro("El Quijote", cervantes, "1234");
biblioteca.agregarLibro("Hábitos Atómicos", clear, "2345");
const libro1984 = biblioteca.agregarLibro("1984", orwell, "1984");
biblioteca.agregarLibro("1984 (eBook)", orwell, "1984-DIG");

console.log(libro1984.titulo, libro1984.autor.nombre, libro1984.isbn);
console.log("Libros de Orwell:", biblioteca.librosDeAutor(orwell.id).map(l => l.titulo));

// Tipos de socios
console.log("\n—————————————— Tarea 1 – Tipos de Socio ——————————————");
const sReg = biblioteca.registrarSocio(1, "Ana", "Pérez");                   // regular
const sVip = biblioteca.registrarSocio(2, "Valen", "Ibarra", "vip");         // VIP
const sEmp = biblioteca.registrarSocio(3, "Diego", "Suarez", "empleado");    // empleado
const sVis = biblioteca.registrarSocio(4, "Luz", "Romero", "visitante");     // visitante

try { biblioteca.retirarLibro(sVis.id, "1984"); } catch (e) { console.log("Visitante:", (e as Error).message); }
try { biblioteca.prestarConTipo(sReg.id, "1234", "referencia"); } catch (e) { console.log("Referencia regular:", (e as Error).message); }
biblioteca.prestarConTipo(sEmp.id, "1234", "referencia"); 
biblioteca.devolverLibro(sEmp.id, "1234"); // liberar

//  Préstamos polimórficos 
console.log("\n—————————————— Tarea 2 – Préstamos polimórficos ——————————————");
const sSofi  = biblioteca.registrarSocio(40002, "Sofia", "Molina");
const sLuc1  = biblioteca.registrarSocio(31882, "Lucciano", "Curotto");
biblioteca.retirarLibro(sSofi.id, "1234");   
biblioteca.retirarLibro(sLuc1.id, "1234");   
biblioteca.devolverLibro(sSofi.id, "1234");  

const sCindy = biblioteca.registrarSocio(50001, "Cindy", "Molina");
const fundDemo = biblioteca.agregarLibro("Fundación (demo multas)", orwell, "F-001");
biblioteca.retirarLibro(sCindy.id, "F-001");
const tarde = new Date(); tarde.setDate(tarde.getDate() + 20);
biblioteca.devolverLibro(sCindy.id, "F-001", tarde);

try { biblioteca.retirarLibro(sCindy.id, "1984"); } catch (e) { console.log("🚫 Bloqueo:", (e as Error).message); }
biblioteca.pagarMulta(sCindy.id, 999999);
biblioteca.retirarLibro(sCindy.id, "1984");

biblioteca.prestarConTipo(sCindy.id, "2345", "corto");       
biblioteca.prestarConTipo(sEmp.id, "1234", "referencia");    
const sSam = biblioteca.registrarSocio(32451, "Samuel", "Olmos");
biblioteca.prestarConTipo(sSam.id, "1984-DIG", "digital");   

const sOscar = biblioteca.registrarSocio(60001, "Oscar", "Irias");
const ev = biblioteca.crearEvento(1, "Club de Lectura – Asimov", new Date(Date.now() + 2*86400000), "Debate sobre Fundación");
biblioteca.inscribirEnEvento(ev.id, sOscar.id);
biblioteca.enviarRecordatoriosEventos(new Date());

// Strategy (políticas) 
console.log("\n—————————————— Tarea 3 – Strategy de políticas ——————————————");
biblioteca.agregarLibro("Política Base", clear, "POL-1");
biblioteca.agregarLibro("Política Flexible", clear, "POL-2");
biblioteca.agregarLibro("Política Estudiante", clear, "POL-3");
biblioteca.agregarLibro("Política Docente", clear, "POL-4");

biblioteca.politica = new PoliticaEstricta();
biblioteca.prestarConTipo(sVip.id, "POL-1", "regular");

biblioteca.politica = new PoliticaFlexible();
biblioteca.prestarConTipo(sVip.id, "POL-2", "regular");

biblioteca.politica = new PoliticaEstudiante();
biblioteca.contexto.enExamenes = true;
biblioteca.prestarConTipo(sVip.id, "POL-3", "regular");

biblioteca.politica = new PoliticaDocente();
biblioteca.prestarConTipo(sVip.id, "POL-4", "regular");

//  Buscadores 
console.log("\n—————————————— Tarea 4 – Buscadores (IBuscable) ——————————————");
biblioteca.inicializarBuscadores();
const resultados = biblioteca.buscarEnTodo({ titulo: "1984" });
console.log("🔎 Buscar '1984' en todos los sistemas:", resultados);

//  Recordatorios y Recomendaciones 
console.log("\n—————————————— Recordatorios de vencimientos ——————————————");
biblioteca.enviarRecordatoriosVencimientos(new Date());

console.log("\n—————————————— Recomendaciones ——————————————");
const recsCindy = biblioteca.recomendarLibros(sCindy.id, 5);
console.log("💡 Recomendaciones para Cindy:", recsCindy.map(l => l.titulo));
