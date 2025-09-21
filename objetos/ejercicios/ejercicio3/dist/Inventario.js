"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventario = void 0;
class Inventario {
    constructor() {
        this.items = [];
        this.capacidad = 3;
    }
    agregarItem(item) {
        if (this.items.length >= this.capacidad)
            return false;
        this.items.push(item);
        return true;
    }
    usarItem(nombre, personaje) {
        const idx = this.items.findIndex(i => i.nombre === nombre);
        if (idx === -1)
            return false;
        const item = this.items[idx];
        item.usar(personaje);
        this.items.splice(idx, 1);
        return true;
    }
    getItems() {
        return [...this.items];
    }
}
exports.Inventario = Inventario;
