class Votante
{
    public void Votar(Candidato candidato)
    {
        candidato.RegistrarVoto();
    }
}
class Candidato
{
    private int CantidadVotos;
    private PartidoPolitico Partido;
    public Candidato(PartidoPolitico partido) { Partido = partido; }
    public void RegistrarVoto()
    {
        CantidadVotos += 1;
        this.Partido.RegistrarVotoPartido(); // y tambien sumamos el voto al partido que pertenece
    }
    public int GetVotosCandidato() { return CantidadVotos; }
}
class PartidoPolitico
{
    private string Nombre;
    private int CantidadVotosPartido;
    public void RegistrarVotoPartido()
    {
        CantidadVotosPartido += 1;
    }
    public int GetVotosPartido() { return CantidadVotosPartido; }
}
class MunicipioElecciones
{
    public List<PartidoPolitico> partidos = new List<PartidoPolitico>();
    public List<Candidato> candidatos = new List<Candidato>();
    public void AgregarPartido(PartidoPolitico partido) { partidos.Add(partido); }
    public void AgregarCandidato(Candidato candidato) { candidatos.Add(candidato); }
    public void VotosPorPartidos() { } // foreach de partidos
    public void VotosPorCandidato() { } // foreach candidatos
}