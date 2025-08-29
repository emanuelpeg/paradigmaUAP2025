
# Ejercicio 1

## Descripción del Ejercicio

El restaurante “San Martín” nos contrata para hacer un software que controle los costos de sus platos. Los platos están compuestos por ingredientes los cuales pueden ser platos o ingredientes básicos. Por ejemplo los panqueques con dulce de leche, está compuesto por panqueques (que es un plato) y dulce de leche que es un ingrediente básico. 
El software debe mantener el costo de cada uno de los platos, y el costo está dado por la suma de los costos de los ingredientes (básicos o platos). 


# Ejercicio 2

## Descripción del Ejercicio

La bicicletería Oro Verde lo contrata para diseñar y desarrollar su sistema de control de precios. Dado que la bicicletería tiene un servicio de armado de bicicletas, donde permite que dado un conjunto de partes armar una bicicleta personalizada, cuyo precio es la suma del precio de las partes. A la vez, la bicicletería vende partes, las cuales tienen un número, una descripción y un precio. Las bicicletas armadas tienen un número y una descripción y el precio está dado por la suma de las partes. 

Por último, la bicicletería tiene ofertas las cuales son un conjunto de partes y/o bicicletas y su precio está dado por la suma de los elementos que lo componen, menos un 20%. 


# Ejercicio 3

## Descripción del Ejercicio

La empresa Tarjeta Violeta lo contrata para hacer un sistema que mantenga los datos de sus clientes, los clientes pueden ser beneficiarios de la tarjeta, los cuales pueden gastar un monto de dinero por mes, que luego pueden abonar en cuotas. O afiliados, son los negocios en donde el beneficiario realiza una compra y se le debe poder abonar el monto gastado. 

Los datos de los beneficiarios son: cuit, nombre, apellido, dirección y número de cuenta donde se debitarán las cuotas. 

Los datos de los afiliados son: cuit, nombre, apellido, dirección y número de cuenta donde se depositará por mes, lo gastado por los beneficiarios.

Diseñe un software que permita listar los clientes cargados. Tenga en cuenta que un cliente puede ser beneficiario y afiliado a la vez. 


# Ejercicio 4

## Descripción del Ejercicio

La embajada de Italia lo contrata para que diseñe un software que permita saber si una persona es apta para recibir la ciudadanía Italiana. Para dicho proceso se cargan los datos de la persona (dni, nombre, apellido y nacionalidad) y los datos de su padre, madre, abuelo, bisabuelo y antepasados que también son personas por lo tanto los datos son los mismos (dni, nombre, apellido y nacionalidad).

El objetivo es cargar el árbol genealógico de la persona de tal manera de poder analizar si es válido darle la nacionalidad. Los datos del árbol genealógico se cargan hasta encontrarnos con un desconocido, en este caso se detiene la carga de esa rama del árbol.

Una persona es considerada para el proceso de nacionalidad Italiana, si es Italiana o si al menos el número de sus antepasados Italianos son igual al nivel de antepasados . Por ejemplo si su padre o madre o ambos son italianos (dado que el nivel es 1)  o si tiene 2 o más abuelos italianos o 3 o más bisabuelos, etc.

Realice un diseño que permita resolver dicho problema y permita saber si una persona es apta para el proceso de ciudadanía.

# Ejercicio 5
<<<<<<< HEAD

## Descripción del Ejercicio
La empresa CursoSys lo contrata para desarrollar un software que permita registrar el dictado de su curso. La empresa dicta un curso y tiene diferentes tipos de alumnos:
  a) Alumno invitado: es gratuito y aprueba el curso con una nota mayor a 60 en el examen.
  b) Alumno medio: el cual paga una suscripción y aprueba el curso con 3 exámenes los cuales tienen que tener un promedio mayor a 70.
  c) Alumnos premium: el cual paga una suscripción y aprueba el curso con 5 exámenes los cuales tienen que ser mayores a 70 y tener un promedio mayor a 80%

El alumno tiene un código, nombre y apellido y las notas dependientes del tipo.
  a) Realice un diseño orientado a objetos
  b) Realice una función que liste los alumnos que aprobaron el curso
  c) La empresa necesita una funcionalidad que permita al usuario invitado cambiar a usuario medio o premium.
=======
## Descripción del Ejercicio
La empresa CursoSys lo contrata para desarrollar un software que permita registrar el dictado de su curso. La empresa dicta un curso y tiene diferentes tipos de alumnos: 
a) Alumno invitado: es gratuito y aprueba el curso con una nota mayor a 60 en el examen. 
b) Alumno medio: el cual paga una suscripción y aprueba el curso con 3 exámenes los cuales tienen que tener un promedio mayor a 70. 
c) Alumnos premium: el cual paga una suscripción y aprueba el curso con 5 exámenes los cuales tienen que ser mayores a 70 y tener un promedio mayor a 80%

El alumno tiene un código, nombre y apellido y las notas dependientes del tipo. 
a) Realice un diseño orientado a objetos
b) Realice una función que liste los alumnos que aprobaron el curso 
c) La empresa necesita una funcionalidad que permita al usuario invitado cambiar a usuario medio o premium.
>>>>>>> 45beffd (Cambios locales)


# CHAT GPT
# Ejercicio 5 - Biblioteca digital
La Biblioteca Digital UAP desea un software para gestionar préstamos y notificaciones. Los usuarios de la biblioteca pueden ser estudiantes o profesores. Ambos comparten datos comunes como nombre y apellido. Los estudiantes pueden retirar hasta 3 libros y tienen un máximo de 15 días de préstamo. Los profesores pueden retirar hasta 10 libros y tienen un máximo de 30 días de préstamo. Además, existe una entidad llamada Jefe de Biblioteca, que no es un usuario (no pide préstamos ni pertenece al grupo de estudiantes/profesores). Sin embargo, el jefe debe ser notificado cuando hay atrasos en devoluciones, al igual que los usuarios que tienen préstamos pendientes.

El sistema debe: Permitir que estudiantes y profesores soliciten préstamos según sus reglas. Guardar la información de cada préstamo (fecha de inicio, fecha límite, cantidad de libros). Revisar si existen préstamos vencidos. Notificar a los estudiantes, profesores y también al jefe de biblioteca en caso de atrasos.

# Ejercicio 6: Empresa de transporte

Una empresa tiene Vehículos (autos, colectivos y camiones).Cada vehículo tiene patente, marca, modelo.
Los colectivos tienen una cantidad de asientos. Los camiones tienen una capacidad de carga.
Los autos tienen un número de puertas. Todos los vehículos comparten el método CalcularCostoViaje(), pero la lógica depende del tipo de vehículo (polimorfismo). Además, algunos vehículos pueden tener un GPS instalado, otros no.

# Ejercicio 7: Sistema de pedidos de comida

Una app de delivery gestiona Pedidos que pueden contener Platos o Combos. Un Plato tiene nombre y precio fijo.
Un Combo está compuesto por varios Platos y tiene un descuento del 15%. Los pedidos calculan el total sumando Platos y Combos (polimorfismo). Además, los Pedidos pueden pagarse con diferentes métodos de pago: tarjeta, efectivo, billetera virtual. Cada uno procesa el pago de manera distinta.





