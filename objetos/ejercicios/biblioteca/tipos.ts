// Tipos y enums para el sistema de biblioteca

export enum EstadoLibro {
    DISPONIBLE = "disponible",
    PRESTADO = "prestado",
    RESERVADO = "reservado"
}

export enum TipoEvento {
    CLUB_LECTURA = "club_lectura",
    CHARLA_AUTOR = "charla_autor", 
    TALLER = "taller",
    PRESENTACION = "presentacion"
}