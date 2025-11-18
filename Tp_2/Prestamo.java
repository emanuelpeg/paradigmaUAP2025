import java.util.Date;
public abstract class Prestamo {
    private Libro libro;
    private Date vencimiento;

    public Prestamo(Libro libro) {
        this.libro = libro;
        this.vencimiento = calcularVencimiento();
    }
    
    public abstract Date calcularVencimiento();
    public abstract int calcularMulta();
    
    public Libro getLibro() {
        return libro;
    }
    
    public Date getVencimiento() {
        return vencimiento;
    }
}

class PrestamoRegular extends Prestamo {
    public PrestamoRegular(Libro libro) {
        super(libro);
    }

    @Override
    public Date calcularVencimiento() {
        Date vence = new Date();
        vence.setTime(vence.getTime() + 14L * 24L * 60L * 60L * 1000L); // 14 días
        return vence;
    }

    @Override
    public int calcularMulta() {
        Date hoy = new Date();
        if (getVencimiento() == null || !hoy.after(getVencimiento())) {
            return 0;
        }
        long diferencia = hoy.getTime() - getVencimiento().getTime();
        int diasVencidos = (int) (diferencia / (24L * 60L * 60L * 1000L));
        return 50 * diasVencidos; // multa estándar
    }
}

class PrestamoCorto extends Prestamo {
    public PrestamoCorto(Libro libro) {
        super(libro);
    }

    @Override
    public Date calcularVencimiento() {
        Date vence = new Date();
        vence.setTime(vence.getTime() + 7L * 24L * 60L * 60L * 1000L); // 7 días
        return vence;
    }

    @Override
    public int calcularMulta() {
        Date hoy = new Date();
        if (getVencimiento() == null || !hoy.after(getVencimiento())) {
            return 0;
        }
        long diferencia = hoy.getTime() - getVencimiento().getTime();
        int diasVencidos = (int) (diferencia / (24L * 60L * 60L * 1000L));
        return 100 * diasVencidos; // multa doble
    }
}

class PrestamoReferencia extends Prestamo {
    public PrestamoReferencia(Libro libro) {
        super(libro);
    }

    @Override
    public Date calcularVencimiento() {
        return null; // Solo consulta en biblioteca, sin llevar
    }

    @Override
    public int calcularMulta() {
        return 0; // sin multa
    }
}

class PrestamoDigital extends Prestamo {
    public PrestamoDigital(Libro libro) {
        super(libro);
    }

    @Override
    public Date calcularVencimiento() {
        return null; // Sin límite de tiempo
    }

    @Override
    public int calcularMulta() {
        return 0; // sin multa
    }
}