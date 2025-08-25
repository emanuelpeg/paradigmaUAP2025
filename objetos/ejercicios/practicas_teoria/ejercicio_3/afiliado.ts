import { beneficiario } from "./beneficiario";
import { cliente } from "./cliente";
export class afiliados extends cliente {
    private _cliente: cliente;
    private _beneficiario: beneficiario;

    constructor(cliente: cliente, beneficiario: beneficiario) {
        super(cliente.nombre, cliente.cuit, cliente.apellido, cliente.direccion);
        this._cliente = cliente;
        this._beneficiario = beneficiario;
    }

    get cliente(): cliente {
        return this._cliente;
    }

    get beneficiario(): beneficiario {
        return this._beneficiario;
    }
}