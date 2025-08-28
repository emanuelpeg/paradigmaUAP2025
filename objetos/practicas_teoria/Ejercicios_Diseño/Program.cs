using System;
class Program
{
    static void Main()
    {
        /*
        // Ingredientes básicos
        var harina = new IngredienteBasico("Harina", 120);
        var huevo = new IngredienteBasico("Huevo", 90);
        var leche = new IngredienteBasico("Leche", 150);
        var ddl = new IngredienteBasico("Dulce de leche", 300);
        var arandanos = new IngredienteBasico("Arándanos", 200);

        // Plato: Panqueque
        var panqueque = new Plato("Panqueque");
        panqueque.AgregarComponente(harina);
        panqueque.AgregarComponente(huevo);
        panqueque.AgregarComponente(leche);

        // Plato: Panqueques con dulce de leche
        var panquequesConDdl = new Plato("Panqueques con dulce de leche");
        panquequesConDdl.AgregarComponente(panqueque); // un plato dentro de otro
        panquequesConDdl.AgregarComponente(ddl);

        // Plato: Panqueques con dulce de leche y arándanos
        var panquequesConTodo = new Plato("Panqueques con ddl y arándanos");
        panquequesConTodo.AgregarComponente(panquequesConDdl); // ya armado
        panquequesConTodo.AgregarComponente(arandanos);

        // Mostrar resultados
        Console.WriteLine($"{panqueque.GetNombre()} cuesta ${panqueque.GetCosto()}");
        Console.WriteLine($"{panquequesConDdl.GetNombre()} cuesta ${panquequesConDdl.GetCosto()}");
        Console.WriteLine($"{panquequesConTodo.GetNombre()} cuesta ${panquequesConTodo.GetCosto()}");

        Console.ReadKey(); // para que no se cierre la consola enseguida}
        */

        /*

        Empresa empresa = new Empresa();

        // Kiosco (solo afiliado)
        ClienteConcreto kiosco = new ClienteConcreto("30-111", "Kiosco", "Viale", "Calle 9", "CBU-KIOSCO");
        kiosco.Roles.Add(new Afiliado(kiosco)); // se asigna el rol de afiliado
        empresa.Clientes.Add(kiosco);

        // Ana (beneficiario y afiliado)
        ClienteConcreto ana = new ClienteConcreto("20-222", "Ana", "Perez", "Av. 123", "CBU-ANA");
        ana.Roles.Add(new Beneficiario(ana, 20000));
        ana.Roles.Add(new Afiliado(ana));
        empresa.Clientes.Add(ana);

        empresa.ListarClientes();

        Console.WriteLine("\n--- Flujo ---");

        // Ana compra en el Kiosco
        empresa.RegistrarCompra(ana, kiosco, 5000);

        // Empresa liquida al Kiosco
        empresa.LiquidarAfiliado(kiosco, 5000);

        // Empresa liquida al comercio de Ana
        empresa.LiquidarAfiliado(ana, 3000);
        */

        /*
        Bicicleta bici1 = new Bicicleta(1, "Bicicleta de montaña");
        Bicicleta bici2 = new Bicicleta(2, "Bicicleta de ruta");

        Parte ruedaDelantera = new Parte(101, "Rueda Delantera", 1500);
        Parte ruedaTrasera = new Parte(102, "Rueda Trasera", 1500);
        Parte cuadro = new Parte(201, "Cuadro", 5000);
        Parte asiento = new Parte(301, "Asiento", 800);
        Parte manubrio = new Parte(401, "Manubrio", 600);
        Parte pedal = new Parte(501, "Pedal", 400);
        Parte cadena = new Parte(601, "Cadena", 300);

        bici1.AgregarParte(ruedaDelantera); // le mandamos la parte a agregar
        bici1.AgregarParte(ruedaTrasera);
        bici1.AgregarParte(cuadro);

        bici2.AgregarParte(ruedaDelantera);
        bici2.AgregarParte(asiento);
        bici2.AgregarParte(manubrio);

        // Las ofertas pueden tener bicicletas y/o partes.
        Oferta oferta1 = new Oferta(1, "Oferta Verano");
        Oferta oferta2 = new Oferta(2, "Oferta Invierno");

        oferta1.AgregarItem(bici1); // le mandamos el item a agregar
        oferta1.AgregarItem(pedal);
        oferta1.AgregarItem(cadena);

        oferta2.AgregarItem(bici2);
        oferta2.AgregarItem(cadena);
        oferta2.AgregarItem(pedal);
        */

        Biblioteca biblio = new Biblioteca();

        biblio.libros.Add("Harry Potter");
        biblio.libros.Add("El principito");
        biblio.libros.Add("Mi vida, soy yo");

        Estudiante estu1 = new Estudiante("Gianna");
        Profesor profe1 = new Profesor("Malena");

        estu1.PedirPrestamo(5, 2);
        estu1.PedirPrestamo(2, 3);

        profe1.PedirPrestamo(7, 3);
        


    }
}
