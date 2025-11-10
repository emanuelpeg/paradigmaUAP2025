/*
# Ejercicio 1
## Descripción del Ejercicio

El restaurante “San Martín” nos contrata para hacer un software que controle los costos de sus platos. Los platos están compuestos por ingredientes los cuales pueden ser platos o ingredientes básicos. Por ejemplo los panqueques con dulce de leche, está compuesto por panqueques (que es un plato) y dulce de leche que es un ingrediente básico. 
El software debe mantener el costo de cada uno de los platos, y el costo está dado por la suma de los costos de los ingredientes (básicos o platos). 


# Ejercicio 2
## Descripción del Ejercicio

La bicicletería Oro Verde lo contrata para diseñar y desarrollar su sistema de control de precios. Dado que la bicicletería tiene un servicio de armado de bicicletas, donde permite que dado un conjunto de partes armar una bicicleta personalizada, cuyo precio es la suma del precio de las partes. A la vez, la bicicletería vende partes, las cuales tienen un número, una descripción y un precio. Las bicicletas armadas tienen un número y una descripción y el precio está dado por la suma de las partes. 

Por último, la bicicletería tiene ofertas las cuales son un conjunto de partes y/o bicicletas y su precio está dado por la suma de los elementos que lo componen, menos un 20%. 


# Ejercicio 3
## Descripción del Ejercicio
La empresa Tarjeta Violeta lo contrata para hacer un sistema que mantenga los datos de sus clientes, los clientes pueden ser beneficiarios de la tarjeta, los cuales pueden gastar un monto de dinero por mes, que luego pueden abonar en cuotas. O afiliados, son los negocios en donde el beneficiario realiza una compra y se le debe poder abonar el monto gastado. 
Los datos de los beneficiarios son: cuit, nombre, apellido, dirección y número de cuenta donde se debitarán las cuotas. 

Los datos de los afiliados son: cuit, nombre, apellido, dirección y número de cuenta donde se depositará por mes, lo gastado por los beneficiarios.

Diseñe un software que permita listar los clientes cargados. Tenga en cuenta que un cliente puede ser beneficiario y afiliado a la vez. 

# Ejercicio 4
## Descripción del Ejercicio
La empresa CursoSys lo contrata para desarrollar un software que permita registrar el dictado de su curso. La empresa dicta un curso y tiene diferentes tipos de alumnos:
  a) Alumno invitado: es gratuito y aprueba el curso con una nota mayor a 60 en el examen.
  b) Alumno medio: el cual paga una suscripción y aprueba el curso con 3 exámenes los cuales tienen que tener un promedio mayor a 70.
  c) Alumnos premium: el cual paga una suscripción y aprueba el curso con 5 exámenes los cuales tienen que ser mayores a 70 y tener un promedio mayor a 80%

El alumno tiene un código, nombre y apellido y las notas dependientes del tipo.
  a) Realice un diseño orientado a objetos
  b) Realice una función que liste los alumnos que aprobaron el curso
  c) La empresa necesita una funcionalidad que permita al usuario invitado cambiar a usuario medio o premium.
*/

//Actividad 1
using System.Diagnostics.Metrics;

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
interface ITipo
{
    bool Aprobo(Alumno alumno);
}

class Alumno
{
    private string nombre;
    private string apellido;
    private List<double> notas;
    private ITipo tipo;
    public bool Aprobado;

    public List<double> GetNotas()
    {
        return notas;
    }

    public Alumno(string nombre, string apellido, ITipo tipo)
    {
        this.nombre = nombre;
        this.apellido = apellido;
        this.tipo = tipo;
        this.notas = new List<double>();
    }

    public void EstaAprobado()
    {
        if (tipo.Aprobo(this))
        {
            Aprobado = true;
            Console.WriteLine($"El alumno {nombre} {apellido} está aprobado");
        }
        else
        {
            Aprobado = false;
            Console.WriteLine($"El alumno {nombre} {apellido} no está aprobado");
        }
    }

    public void CambiarAMedio()
    {
        if (this.tipo is AlumnoInvitado)
        {
            this.tipo = new AlumnoMedio();
        }
    }

    public void CambiarAPremiun()
    {
        if (this.tipo is AlumnoInvitado)
        {
            this.tipo = new AlumnoPremium();
        }
    }
    public string GetNombreCompleto()
    {
        return $"{nombre} {apellido}";
    }
}

class AlumnoInvitado : ITipo
{
    public bool Aprobo(Alumno alumno)
    {
        if (alumno.GetNotas().Count != 1) return false;

        foreach (var nota in alumno.GetNotas())
        {
            if (nota >= 60)
            {
                return true;
            }
        }
        return false;
    }
}

class AlumnoMedio : ITipo
{
    public bool Aprobo(Alumno alumno)
    {
        if (alumno.GetNotas().Count != 3) return false;

        double sum = 0;
        double cant = 0;

        foreach (var nota in alumno.GetNotas())
        {
            sum += nota;
            cant++;
        }
        double promedio = sum / cant;
        if (promedio >= 70)
        {
            return true;
        }
        return false;
    }
}

class AlumnoPremium : ITipo
{
    public bool Aprobo(Alumno alumno)
    {
        if (alumno.GetNotas().Count != 5) return false;

        double sum = 0;
        double cant = 0;

        foreach (var nota in alumno.GetNotas())
        {
            if (nota >= 70)
            {
                sum += nota;
                cant++;
            }
            else
            {
                return false;
            }
        }
        double promedio = sum / cant;
        if (promedio >= 80)
        {
            return true;
        }
        return false;
    }
}

class Curso
{
    private List<Alumno> alumnos = new List<Alumno>();

    public void AgregarAlumno(Alumno a)
    {
        alumnos.Add(a);
    }

    public List<Alumno> ListarAprobados()
    {
        List<Alumno> aprobados = new List<Alumno>();
        foreach (var a in alumnos)
        {
            a.EstaAprobado();
            if (a.Aprobado) aprobados.Add(a);
        }
        return aprobados;
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

        // ----- Actividad 4 -----
        Console.WriteLine("\n=== Actividad 4 ===");

        Alumno alumno1 = new Alumno("Ana", "Gomez", new AlumnoInvitado());
        alumno1.GetNotas().Add(100);
        alumno1.EstaAprobado();

        Alumno alumno2 = new Alumno("Luis", "Martinez", new AlumnoInvitado());
        alumno2.GetNotas().Add(80);
        alumno2.GetNotas().Add(90);
        alumno2.GetNotas().Add(70);
        alumno2.EstaAprobado();

        alumno2.CambiarAMedio();
        alumno2.EstaAprobado();

        Alumno alumno3 = new Alumno("Pedro", "Lopez", new AlumnoPremium());
        alumno3.GetNotas().Add(60);
        alumno3.GetNotas().Add(70);
        alumno3.GetNotas().Add(80);
        alumno3.GetNotas().Add(90);
        alumno3.GetNotas().Add(100);
        alumno3.EstaAprobado();

        Curso curso = new Curso();
        curso.AgregarAlumno(alumno1);
        curso.AgregarAlumno(alumno2);
        curso.AgregarAlumno(alumno3);
        Console.WriteLine("\nAlumnos aprobados en el curso:");
        foreach (var alumno in curso.ListarAprobados())
        {
            Console.WriteLine($"- {alumno.GetNombreCompleto()}");
        }
    }
}