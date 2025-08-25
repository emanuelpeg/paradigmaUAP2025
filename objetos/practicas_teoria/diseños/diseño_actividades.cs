//Actividad 1
interface IComponente  //cualquier cosa que pueda formar parte de un plato
{
    double getCosto(); //El objetivo de esta interfaz es que cualquier clase que implemente IComponente obligatoriamente implemente estos 2 metodos. Ademas, sirve para que la clase Plato pueda tener una lista de IComponente, ya sea de ingredientes básicos o de otros platos para poder calcular el precio final por si un plato contiene otro plato dentro (explicado debajo)
    string getNombre();
}

class IngredienteBasico : IComponente
{
    private string nombre;
    private double precioUnitario;

    public IngredienteBasico(string nombre, double precioUnitario)
    {
        this.nombre = nombre;
        this.precioUnitario = precioUnitario;
    }

    public double getCosto() => precioUnitario;
    public string getNombre() => nombre;
}

class Plato : IComponente
{
    private string nombre;
    private List<IComponente> componentes; //acá pueden ir ingredientes básicos O platos

    public Plato(string nombre)
    {
        this.nombre = nombre;
        this.componentes = new List<IComponente>(); //inicializamos la lista de componentes
    }
    public void agregarComponente(IComponente componente)
    {
        componentes.Add(componente); //agregamos un ingrediente básico o un plato
    }
    public double getCosto()
    {
        double total = 0;
        foreach (var c in componentes) //Llamada recuriva. Supongamos que tenemos un objeto Plato llamado "platoEspecial" el cual tiene como ingredientes Panqueques (que es un plato) y arandanos (que es un ingrediente básico). En ese caso el platoEspecial entrara en la funcion con el componente Plato, el cual a su vez tiene mas ingredientes dentro como harina, dulce de leche, etc. Por lo que se va a llamar a si mismo para recorrer sus ingredientes e ir sumandolos al precio final. Una vez que se termine de recorrer el plato panqueque, se pasa a arandanos que es basico y tambien se suma. 
            total += c.getCosto();
        return total;
    }

    public string getNombre() => nombre;
}

//Actividad 2
interface IElemento
{
    double getPrecio();
    string getDescripcion();
}

class Parte : IElemento
{
    private int numero;
    private string descripcion;
    private double precio;

    public Parte(int numero, string descripcion, double precio)
    {
        this.numero = numero;
        this.descripcion = descripcion;
        this.precio = precio;
    }

    public double getPrecio() => precio;
    public string getDescripcion() => descripcion;
}

// Bicicleta armada con partes
class Bicicleta : IElemento
{
    private int numero;
    private string descripcion;
    private List<IElemento> partes;

    public Bicicleta(int numero, string descripcion)
    {
        this.numero = numero;
        this.descripcion = descripcion;
        this.partes = new List<IElemento>();
    }

    public void agregarParte(IElemento p)
    {
        partes.Add(p);
    }

    public double getPrecio()
    {
        double total = 0;
        foreach (var p in partes)
            total += p.getPrecio();
        return total;
    }

    public string getDescripcion() => descripcion;
}

// Oferta que puede contener partes o bicicletas
class Oferta : IElemento
{
    private string descripcion;
    private List<IElemento> elementos;

    public Oferta(string descripcion)
    {
        this.descripcion = descripcion;
        this.elementos = new List<IElemento>();
    }

    public void agregarElemento(IElemento e)
    {
        elementos.Add(e);
    }

    public double getPrecio() //Este metodo calcula el precio total de la oferta, que puede incluir partes o bicicletas, pero no es de determinada parte o bicicleta, sino que es una oferta que puede contener varios elementos
    {
        double total = 0;
        foreach (var e in elementos)
            total += e.getPrecio(); //Si es una bici, llama a su respectivo getPrecio y asi

        return total * 0.8; //descuento del 20% a lo calculado
    }

    public string getDescripcion() => descripcion;
}

//Actividad 3
class Cliente
{
    private string cuit;
    private string nombre;
    private string apellido;
    private string direccion;
    private string nroCuenta;

    public Cliente(string cuit, string nombre, string apellido, string direccion, string nroCuenta)
    {
        this.cuit = cuit;
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
        this.nroCuenta = nroCuenta;
    }

    public void mostrarDatos()
    {
        Console.WriteLine($"Cliente: {nombre} {apellido}, CUIT: {cuit}, Cuenta: {nroCuenta}");
    }
}

class Beneficiario : Cliente
{
    public Beneficiario(string cuit, string nombre, string apellido, string direccion, string nroCuenta)
        : base(cuit, nombre, apellido, direccion, nroCuenta) { } //Al pasarle : base se le indica que se esta llamando al constructor de la clase padre Cliente, y se le pasan los parametros necesarios para inicializarlo, es decir los atributos del objeto que creamos (por lo que obligatoriamente debemos crear el objeto CON los atributos necesarios)
}

class Afiliado : Cliente
{
    public Afiliado(string cuit, string nombre, string apellido, string direccion, string nroCuenta)
        : base(cuit, nombre, apellido, direccion, nroCuenta) { }
}

//Actividad 4
class Persona
{
    private string dni;
    private string nombre;
    private string apellido;
    private string nacionalidad;

    public Persona(string dni, string nombre, string apellido, string nacionalidad)
    {
        this.dni = dni;
        this.nombre = nombre;
        this.apellido = apellido;
        this.nacionalidad = nacionalidad;
    }
}

class Program
{
    static void Main(string[] args)
    {
        // ----- Actividad 1 -----
        Console.WriteLine("=== Actividad 1 ===");
        IngredienteBasico harina = new IngredienteBasico("Harina", 10);
        IngredienteBasico huevo = new IngredienteBasico("Huevo", 5);
        IngredienteBasico leche = new IngredienteBasico("Leche", 8);
        IngredienteBasico dulce = new IngredienteBasico("Dulce de leche", 15);

        Plato panqueque = new Plato("Panqueque");
        panqueque.agregarComponente(harina);
        panqueque.agregarComponente(huevo);
        panqueque.agregarComponente(leche);

        Plato panquequeConDulce = new Plato("Panqueque con dulce de leche");
        panquequeConDulce.agregarComponente(panqueque);
        panquequeConDulce.agregarComponente(dulce);

        Console.WriteLine($"{panquequeConDulce.getNombre()} cuesta {panquequeConDulce.getCosto()}");

        // ----- Actividad 2 -----
        Console.WriteLine("\n=== Actividad 2 ===");
        Parte rueda = new Parte(1, "Rueda", 100);
        Parte asiento = new Parte(2, "Asiento", 50);
        Parte manubrio = new Parte(3, "Manubrio", 70);

        Bicicleta bici = new Bicicleta(101, "Bici de paseo");
        bici.agregarParte(rueda);
        bici.agregarParte(asiento);
        bici.agregarParte(manubrio);

        Oferta oferta = new Oferta("Oferta bici + rueda extra");
        oferta.agregarElemento(bici);
        oferta.agregarElemento(rueda);

        Console.WriteLine($"{bici.getDescripcion()} cuesta {bici.getPrecio()}");
        Console.WriteLine($"{oferta.getDescripcion()} cuesta {oferta.getPrecio()}");

        // ----- Actividad 3 -----
        Console.WriteLine("\n=== Actividad 3 ===");
        Beneficiario ben = new Beneficiario("20-12345678-9", "Juan", "Perez", "Calle Falsa 123", "1234567890");
        Afiliado afi = new Afiliado("30-98765432-1", "Comercio", "SRL", "Calle Verdadera 456", "9876543210");

        ben.mostrarDatos();
        afi.mostrarDatos();
    }
}