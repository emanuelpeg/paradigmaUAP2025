public interface Roll
{
    public bool Aprobado(Alumno alumno);

}
public class Invitado : Roll
{
   public bool Aprobado(Alumno alumno)
    {
        return alumno.promedio >= 60;
    }
}

public class Medio : Roll
{
    public bool Aprobado(Alumno alumno)
    { 
        return alumno.promedio >= 70;
    }
   
}

public class Premium : Roll
{
   public bool Aprobado(Alumno alumno)
    {
        foreach (var nota in alumno.notas)
        {
            if (nota.valor < 70)
            {
                return false;
            }
        }
        return alumno.promedio >= 80;
    }
}
