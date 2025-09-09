class Curso
{
    List<Alumno> alumnos = new List<Alumno>();
    void Listar()
    {
        foreach (var alumno in alumnos.where(a => a.Aprovado()))
        {
            Console.WriteLine($"{alumno.Codigo} - {alumno.Nombre} {alumno.Apellido} - Promedio: {alumno.promedio} - Aprobado: {alumno.Aprovado()} - Rol: {alumno.roll.GetType().Name}");
        }
    }

    void CambiarAMedio(Alumno alumno)
    {
        alumno.roll = new Medio();
    }
    
    void CambiarAPremium(Alumno alumno)
    {
        alumno.roll = new Premium();
    }
}