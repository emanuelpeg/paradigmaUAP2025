interface ITipo
{
    public bool Aprobo(Alumno alumno); // este metodo va a devolver un booleano si es que el alumno aprobó o no segun su promedio
}
class Alumno // El alumno usa ITipo, NO es un ITipo 
{
    public int Codigo;
    public string Nombre;
    public List<int> Notas;
    public ITipo Tipo; // composicion

    public bool Aprobo()
    {
        return Tipo.Aprobo(this); // llama al metodo del tipo especifico. Le pasamos el Alumno
    }
    public void CambiarTipo(ITipo tipo)
    {
        this.Tipo = tipo;
    }
}

class TipoInvitado : ITipo
{
    public bool Aprobo(Alumno alumno)
    {
        if (alumno.Notas.Count == 1)
        {
            if (alumno.Notas[0] > 60)
            {
                return true;
            }
            return false;
        }
        return false;
    }
}

class TipoMedio : ITipo
{
    public bool Aprobo(Alumno alumno)
    {
        if (alumno.Notas.Count == 3)
        {
            return alumno.Notas.Average() > 70;
        }
        return false;
    }
}

class TipoPremium : ITipo
{
    public bool Aprobo(Alumno alumno)
    {
        if (alumno.Notas.Count == 5)
        {
            if (alumno.Notas.All(n => n > 70))
            {
                return alumno.Notas.Average() > 80; // ojo, el enunciado decía >80%
            }
            return false;
        }
        return false;
    }
}


