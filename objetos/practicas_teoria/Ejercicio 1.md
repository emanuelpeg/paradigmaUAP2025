
# Ejercicio 1

## Descripción del Ejercicio

El restaurante “San Martín” nos contrata para hacer un software que controle los costos de sus platos. Los platos están compuestos por ingredientes los cuales pueden ser platos o ingredientes básicos. Por ejemplo los panqueques con dulce de leche, está compuesto por panqueques (que es un plato) y dulce de leche que es un ingrediente básico. 
El software debe mantener el costo de cada uno de los platos, y el costo está dado por la suma de los costos de los ingredientes (básicos o platos). 

Plato, Ingredientes, Carta(clase general que tiene una lista de platos)
Ingredientes compone Plato
Atributos ingredientes 
Id
Nombre
Costo

Metodos
Get Id/Nombre/Costo
Set Nombre/Costo

Atributos Plato
Id
Nombre
Descripcion
Lista <Ingredientes>
Lista <Plato>

Metodos
Get Id/Nombre/Descripcion/Ingredientes/Precio
Set Nombre/Descripcion/

//Esta bastante bien en general este ejercicio pero Plato tiene problemas de escalabilidad
//Se podria usar interfaz Valorable con GetPrecio y aplicarla a ambas clases. En plato tendria un array de Valorable y puedo meter tantas clases como necesite a futuro

# Ejercicio 2

## Descripción del Ejercicio

La bicicletería Oro Verde lo contrata para diseñar y desarrollar su sistema de control de precios. Dado que la bicicletería tiene un servicio de armado de bicicletas, donde permite que dado un conjunto de partes armar una bicicleta personalizada, cuyo precio es la suma del precio de las partes. A la vez, la bicicletería vende partes, las cuales tienen un número, una descripción y un precio. Las bicicletas armadas tienen un número y una descripción y el precio está dado por la suma de las partes. 

Por último, la bicicletería tiene ofertas las cuales son un conjunto de partes y/o bicicletas y su precio está dado por la suma de los elementos que lo componen, menos un 20%. 

Clases
Bicicleta,Parte, Bicicleteria, Oferta, Carrito
Clase Abstracta Articulo(numero,descripcion)

Parte: Articulo

Numero
Descripcion
Precio

Metodos()

Bicicleta: Articulo

Numero
Descripcion
Lista <Parte>partes

Metodos()

Oferta
Lista <Articulos> partes

Bicicleteria
Lista <Oferta>
Lista <Articulo> articulos

//Bueno, fue un ejercicio hecho decentemente casi bien, Le acerte a alguna cosas y le erre a otras. Es importante tener en cuenta que si oferta es articulo, oferta podria estar dentro de oferta, y eso estaria mal. Tener en cuenta que antes de este ejercicio hicimos el tercer ejercicio

# Ejercicio 3

## Descripción del Ejercicio

La empresa Tarjeta Violeta lo contrata para hacer un sistema que mantenga los datos de sus clientes, los clientes pueden ser beneficiarios de la tarjeta, los cuales pueden gastar un monto de dinero por mes, que luego pueden abonar en cuotas. O afiliados, son los negocios en donde el beneficiario realiza una compra y se le debe poder abonar el monto gastado. 

Los datos de los beneficiarios son: cuit, nombre, apellido, dirección y número de cuenta donde se debitarán las cuotas. 

Los datos de los afiliados son: cuit, nombre, apellido, dirección y número de cuenta donde se depositará por mes, lo gastado por los beneficiarios.

Diseñe un software que permita listar los clientes cargados. Tenga en cuenta que un cliente puede ser beneficiario y afiliado a la vez. 
//No pude resolverlo, tuve que pedirle ayuda a Mai, y aun asi no pude hacer nada. De cierta manera siento que no puedo terminar de obtener el pensamiento necesario en esta carrera. Tal vez me hubiera ido mejor si hubiera elegido otra cosa(aunque no lo creo, pero por lo menos entenderia mas qsy).
Beneficiario, Afiliado, Rol, Cliente, Empresa

Cliente
Cuit
Nombre
Apellido 
Direccion
Lista <Rol> roles

Interfaz Rol(void transferir())

Beneficiario: Rol 
Cuenta

Afiliado:Rol
Cuenta

Empresa
Lista <Cliente> clientes
# Ejercicio 4

## Descripción del Ejercicio

La embajada de Italia lo contrata para que diseñe un software que permita saber si una persona es apta para recibir la ciudadanía Italiana. Para dicho proceso se cargan los datos de la persona (dni, nombre, apellido y nacionalidad) y los datos de su padre, madre, abuelo, bisabuelo y antepasados que también son personas por lo tanto los datos son los mismos (dni, nombre, apellido y nacionalidad).

El objetivo es cargar el árbol genealógico de la persona de tal manera de poder analizar si es válido darle la nacionalidad. Los datos del árbol genealógico se cargan hasta encontrarnos con un desconocido, en este caso se detiene la carga de esa rama del árbol.

Una persona es considerada para el proceso de nacionalidad Italiana, si es Italiana o si al menos el número de sus antepasados Italianos son igual al nivel de antepasados . Por ejemplo si su padre o madre o ambos son italianos (dado que el nivel es 1)  o si tiene 2 o más abuelos italianos o 3 o más bisabuelos, etc.

Realice un diseño que permita resolver dicho problema y permita saber si una persona es apta para el proceso de ciudadanía.

Persona (que tiene hijos padre,madre,etc), Antepasados(lista persona) 
A su vez, cada Persona tiene una lista de antepasados, lo que estaria mal

Clase general(embajada)
Lista<Persona> personas

abstract class Pariente
nivel

Persona:nivel

Dni
Nombre
Apellido
Nacionalidad
Padre: Persona
Madre: Persona

Ejercicio 5: 

Superclase Alumno//mala idea en este caso, pq el alumno no va a poder cambiar de tipo :(

interfaz tipo
Validar(alumno)
isOK(alumno)

Alumno:tipo
resto atributos
Tipo tipo;
int[]notas
validar()
promedio()
is Ok()//Se auto pregunta si aprobo?
add(int nota)

Clase Curso
Lista <Alumno> alumnos
ListarAlumnosAprobados
CambiarTipoAlumno();

