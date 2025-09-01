# Diagrama de Clases UML

```mermaid
classDiagram
    class RolCliente {
      <<interface>>
      +transferirDinero(monto: number) void
    }

    class Cliente {
      -cuit: string
      -nombre: string
      -apellido: string
      -direccion: string
      -roles: RolCliente[]
      +agregarRol(rol: RolCliente) void
      +mostrarDatos() void
      +getRoles() RolCliente[]
    }

    class Beneficiario {
      -cuenta: string
      +transferirDinero(monto: number) void
    }

    class Afiliado {
      -cuenta: string
      +transferirDinero(monto: number) void
    }

    class Empresa {
      -clientes: Cliente[]
      +agregarCliente(cliente: Cliente) void
      +listarClientes() void
      +transferirDinero(cliente: Cliente, monto: number) void
    }

    RolCliente <|.. Beneficiario
    RolCliente <|.. Afiliado
    Cliente "1" o-- "many" RolCliente
    Empresa "1" o-- "many" Cliente
