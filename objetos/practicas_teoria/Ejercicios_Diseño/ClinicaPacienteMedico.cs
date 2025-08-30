class Persona
{
    private int DNI;
    private string Nombre;
    private string Apellido;
    public List<IRoll> roles = new List<IRoll>();

    //Constructor
    public void ListarRoles()
    {
        foreach (var rol in roles)
        {
            rol.RevelarRol();
        }
    }
}

interface IRoll
{
    public void RevelarRol();
}

class Medico : IRoll
{
    private string Especialidad;
    private int Matricula;
    // Constructor
    //getters
    //setters
    public void RevelarRol()
    {
        Console.WriteLine("Medico");
    }
}

class Paciente : IRoll
{
    private string HistoriaClinica;
    private string ObraSocial;

    // Constructor
    //getters
    //setters
    public void RevelarRol()
    {
        Console.WriteLine("Paciente");
    }
}

class Clinica
{
    public void MostrarRol(Persona persona)
    {
        persona.ListarRoles();
    }
}

