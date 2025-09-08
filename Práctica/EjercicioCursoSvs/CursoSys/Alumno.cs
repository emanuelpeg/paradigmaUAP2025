public class Alumno
{
    public int Codigo { get; set; }
    public string Nombre { get; set; }
    public string Apellido { get; set; }
    public List<int> notas { get; set; } = new List<int>();

    public Roll roll { get; set; } = new Invitado();

    public double promedio
    {
        get
        {
            if (notas.Count == 0) return 0;
            return notas.Average();
        }
    }

    public Alumno(var codigo, string nombre, string apellido)
    {
        Codigo = codigo;
        Nombre = nombre;
        Apellido = apellido;
    }

    public bool Aprobado()
    {
        return roll.Aprobado(this);
    }
   
}