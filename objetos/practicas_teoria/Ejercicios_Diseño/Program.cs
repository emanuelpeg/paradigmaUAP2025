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

        /*

        Biblioteca biblio = new Biblioteca();

        biblio.libros.Add("Harry Potter");
        biblio.libros.Add("El principito");
        biblio.libros.Add("Mi vida, soy yo");

        Estudiante estu1 = new Estudiante("Gianna");
        Profesor profe1 = new Profesor("Malena");

        estu1.PedirPrestamo(5, 2);
        estu1.PedirPrestamo(2, 3);

        profe1.PedirPrestamo(7, 3);
        */

        /*
        Plato tacos = new Plato("Tacos de pollo"); // es el plato principal.
        Plato pollo_saborizado = new Plato("Pollo Saborizado"); // el plato secundario dentro del plato principal.
        tacos.items.Add(pollo_saborizado); // los tacos están compuestos por pollo Saborizado
        Ingrediente finas_hiebras = new Ingrediente("Finas Hierbas", 1300);
        Ingrediente pechuga_pollo = new Ingrediente("Pechuga de pollo", 9000);
        pollo_saborizado.items.Add(finas_hiebras); // el pollo saborizado (plato secundario) está compuesto por ingredientes.
        pollo_saborizado.items.Add(pechuga_pollo);

        double costo = tacos.CalcularCosto();
        Console.WriteLine($"El costo del plato {tacos.Nombre} es de {costo}");
        Console.ReadKey();
        */

        /*

        Biblioteca_digital biblio = new Biblioteca_digital();
        Profesor profe1 = new Profesor("Ana", "García", 12345678);
        Estudiante est1 = new Estudiante("Juan", "Pérez", 45678901);
        Jefe jefe = new Jefe("Carlos", "López", 11223344); // no tiene utilizad el jefe. Xq no pude hacer los notificaciones.

        profe1.PedirPrestamo(6); // pide 6 libros
        est1.PedirPrestamo(5);
        est1.PedirPrestamo(2);
        biblio.ObtenerPrestamosAtrasados();
        Console.ReadKey();
        */

        /*
        // Creamos Tipos
        ITipo invitado = new TipoInvitado();
        ITipo medio = new TipoMedio();
        ITipo premium = new TipoPremium();

        // Creamos alumnos
        Alumno alumno1 = new Alumno
        {
            Codigo = 1,
            Nombre = "Juan Pérez",
            Tipo = invitado,
            Notas = new List<int> { 90 }  // Invitado aprueba si tiene una nota > 60
        };

        Alumno alumno2 = new Alumno
        {
            Codigo = 2,
            Nombre = "María López",
            Tipo = medio,
            Notas = new List<int> { 70, 65, 80 }  // Media: 3 notas, promedio > 70
        };

        Alumno alumno3 = new Alumno
        {
            Codigo = 3,
            Nombre = "Pedro Gómez",
            Tipo = premium,
            Notas = new List<int> { 90, 85, 88, 92, 95 }  // Premium: todas > 70 y promedio > 80
        };

        Alumno alumno4 = new Alumno
        {
            Codigo = 4,
            Nombre = "Ana Torres",
            Tipo = premium,
            Notas = new List<int> { 70, 60, 65, 80, 90 }  // Premium: falla porque no todas son > 70
        };

        Console.WriteLine($"{alumno4.Tipo}");
        alumno4.CambiarTipo(medio);
        Console.WriteLine($"{alumno4.Tipo}");
      
        Console.WriteLine($"{alumno1.Nombre} aprobó? {alumno1.Aprobo()}");
        Console.WriteLine($"{alumno2.Nombre} aprobó? {alumno2.Aprobo()}");
        Console.WriteLine($"{alumno3.Nombre} aprobó? {alumno3.Aprobo()}");
        Console.WriteLine($"{alumno4.Nombre} aprobó? {alumno4.Aprobo()}");

        */

        /*
        Parte ram = new Parte(342, "32 GB", 5000);
        Parte disco = new Parte(55, "144 HZ", 15000);

        PC pc1 = new PC();
        pc1.AgregarParte(ram);
        pc1.AgregarParte(disco);

        Promocion promo = new Promocion();
        promo.AgregarProducto(pc1);
        promo.AgregarProducto(disco);

        promo.CalcularPrecio();
        disco.CalcularPrecio();
        pc1.CalcularPrecio();
        */

        /*
        UsuarioGratis gianna = new UsuarioGratis("Gianna", "gianna@gmail", "caso2802");
        UsuarioPremium male = new UsuarioPremium("Male", "Male@gmail", "4565htg");
        UsuarioFamiliar dani = new UsuarioFamiliar("Dani", "dani@gmail", "dkmofd 34");

        Cancion can1 = new Cancion(3.25, "7 Vidas", "Corazon Roto");
        Podcast pod1 = new Podcast(26.23, "El terror de la IA", "Miedos");

        gianna.Escuchar(can1);
        male.Escuchar(pod1);
        dani.Escuchar(can1);
        */
    }
}
