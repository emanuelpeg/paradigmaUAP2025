# Diseño de Sistemas - Análisis de Clases y Relaciones

## Ejercicio 1: Restaurante "San Martín"

### Diagrama de Clases
IValorable (Interface)
├── getPrecio(): double
└── getNombre(): string

Plato (Implementa IValorable)
├── nombre: string
├── ingredientes: IValorable[]
├── agregarIngrediente(ingrediente: IValorable): void
├── getPrecio(): double
└── getNombre(): string

Ingrediente (Implementa IValorable)
├── nombre: string
├── precio: double
├── getPrecio(): double
└── getNombre(): string

Menu
├── platos: Plato[]
├── agregarPlato(plato: Plato): void
└── listarPlatos(): void


### Relaciones
- **Composición**: `Plato` contiene `IValorable[]` (ingredientes)
- **Agregación**: `Menu` contiene `Plato[]`
- **Implementación**: `Plato` e `Ingrediente` implementan `IValorable`
- **Recursividad**: Un `Plato` puede contener otros `Plato` como ingredientes

---

## Ejercicio 2: Bicicletería Oro Verde

### Diagrama de Clases
Producto (Interface)
├── getPrecio(): double
└── getDescripcion(): string

BicicletaArmada (Implementa Producto)
├── numero: string
├── descripcion: string
├── partes: Parte[]
├── agregarParte(parte: Parte): void
├── getPrecio(): double
└── getDescripcion(): string

Parte (Implementa Producto)
├── numero: string
├── descripcion: string
├── precio: double
├── getPrecio(): double
└── getDescripcion(): string

Oferta (Implementa Producto)
├── productos: Producto[]
├── agregarProducto(producto: Producto): void
├── getPrecio(): double
└── getDescripcion(): string

Bicicleteria
├── productos: Producto[]
├── ofertas: Oferta[]
├── agregarProducto(producto: Producto): void
├── agregarOferta(oferta: Oferta): void
└── listarBicicletasArmadas(): void


### Relaciones
- **Composición**: `BicicletaArmada` contiene `Parte[]`
- **Agregación**: `Oferta` contiene `Producto[]`
- **Agregación**: `Bicicleteria` contiene `Producto[]` y `Oferta[]`
- **Implementación**: Múltiples clases implementan `Producto`
- **Polimorfismo**: `Oferta` trata uniformemente a `BicicletaArmada` y `Parte`

---

## Ejercicio 3: Tarjeta Violeta

### Diagrama de Clases
RolCliente (Interface)
└── transferirDinero(monto: double): void

Cliente
├── cuit: string
├── nombre: string
├── apellido: string
├── direccion: string
├── roles: RolCliente[]
├── agregarRol(rol: RolCliente): void
├── mostrarDatos(): void
└── getRoles(): RolCliente[]

Beneficiario (Implementa RolCliente)
├── cuenta: string
└── transferirDinero(monto: double): void

Afiliado (Implementa RolCliente)
├── cuenta: string
└── transferirDinero(monto: double): void

Empresa
├── clientes: Cliente[]
├── agregarCliente(cliente: Cliente): void
├── listarClientes(): void
└── transferirDinero(cliente: Cliente, monto: double): void


### Relaciones
- **Agregación**: `Cliente` contiene `RolCliente[]` (múltiples roles)
- **Composición**: `Empresa` contiene `Cliente[]`
- **Implementación**: `Beneficiario` y `Afiliado` implementan `RolCliente`
- **Multiplicidad**: Un `Cliente` puede tener 0..* roles
- **Doble rol**: Un cliente puede ser `Beneficiario` y `Afiliado` simultáneamente

---

## Ejercicio 4: Embajada de Italia

### Diagrama de Clases

Persona
├── dni: string
├── nombre: string
├── apellido: string
├── nacionalidad: string
├── padre: Persona
├── madre: Persona
├── setPadre(padre: Persona): void
├── setMadre(madre: Persona): void
├── esItaliana(): boolean
├── contarAntepasadosItalianos(nivel: int): int
├── esAptaParaCiudadania(): boolean
└── contarAntepasadosConocidos(nivel: int): int

SistemaCiudadania
├── personas: Persona[]
├── agregarPersona(persona: Persona): void
└── verificarAptitud(dni: string): boolean



### Relaciones
- **Auto-relación**: `Persona` referencia a `Persona` (padre y madre)
- **Agregación**: `SistemaCiudadania` contiene `Persona[]`
- **Árbol genealógico**: Estructura jerárquica recursiva
- **Navegabilidad**: Bidireccional (padre/hijo)
- **Composición débil**: Las personas pueden existir independientemente del sistema

---

## Patrones Comunes Identificados

### 1. **Patrón Composite**
- **Ejercicio 1**: `IValorable` permite tratar `Plato` e `Ingrediente` de manera uniforme
- **Ejercicio 2**: `Producto` permite tratar `BicicletaArmada`, `Parte` y `Oferta` uniformemente

### 2. **Patrón Strategy**
- **Ejercicio 3**: `RolCliente` permite diferentes comportamientos de transferencia

### 3. **Recursividad Estructural**
- **Ejercicio 1**: Plato de platos
- **Ejercicio 4**: Árbol genealógico recursivo

### 4. **Separación de Concerns**
- **Ejercicio 3**: Separación de datos del cliente de sus roles funcionales

### 5. **Polimorfismo**
- Todos los ejercicios utilizan interfaces para comportamiento polimórfico

