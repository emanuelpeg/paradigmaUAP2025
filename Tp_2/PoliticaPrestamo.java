public interface PoliticaPrestamo {
    public boolean puedeRetirar(Socio socio, Libro libro);
}

class PoliticaEstricta implements PoliticaPrestamo {
    @Override
    public boolean puedeRetirar(Socio socio, Libro libro) {
        // No permite préstamos si hay libros vencidos
        if (socio.tieneLibrosVencidos()) {
            return false;
        }
        return socio.puedeRetirar(libro);
    }
}

class PoliticaFlexible implements PoliticaPrestamo {
    @Override
    public boolean puedeRetirar(Socio socio, Libro libro) {
        // Permite préstamos pero con período reducido si hay vencidos
        return socio.puedeRetirar(libro);
    }
}

class PoliticaEstudiante implements PoliticaPrestamo {
    private boolean epocaExamenes;
    
    public PoliticaEstudiante(boolean epocaExamenes) {
        this.epocaExamenes = epocaExamenes;
    }
    
    @Override
    public boolean puedeRetirar(Socio socio, Libro libro) {
        return socio.puedeRetirar(libro);
    }
    
    public void setEpocaExamenes(boolean epocaExamenes) {
        this.epocaExamenes = epocaExamenes;
    }
    
    public boolean isEpocaExamenes() {
        return epocaExamenes;
    }
}

class PoliticaDocente implements PoliticaPrestamo {
    @Override
    public boolean puedeRetirar(Socio socio, Libro libro) {
        return socio.puedeRetirar(libro);
    }
}
