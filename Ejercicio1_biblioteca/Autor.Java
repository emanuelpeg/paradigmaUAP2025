/**
 * 
 */
/**
 * 
 */
public class Autor {
	private String nombre;
    private String biografia;
    private int añoNacimiento;

    public Autor(String nombre, String biografia, int añoNacimiento) {
        this.nombre = nombre;
        this.biografia = biografia;
        this.añoNacimiento = añoNacimiento;
    }

    public String getNombre() { return nombre; }
}