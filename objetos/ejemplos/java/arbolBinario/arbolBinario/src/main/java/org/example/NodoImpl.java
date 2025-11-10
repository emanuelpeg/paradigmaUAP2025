package org.example;

public class NodoImpl implements Nodo {

    private int valor;
    private Nodo izq = new NodoVacio();
    private Nodo der = new NodoVacio();

    public NodoImpl(int valor) {
        this.valor = valor;
    }

    public boolean esVacio() {
        return false;
    }

    public void add(int valor) {
        if (valor < this.valor) {
            if (this.izq.esVacio()) {
                this.izq = new NodoImpl(valor);
            } else {
                this.izq.add(valor);
            }
        } else if (valor > this.valor) {
            if (this.der.esVacio()) {
                this.der = new NodoImpl(valor);
            } else {
                this.der.add(valor);
            }
        }
    }

    public boolean existe(int valor) {
        if (this.valor == valor) {
            return true;
        }
        if (valor < this.valor) {
            return this.izq.existe(valor);
        } else {
            return this.der.existe(valor);
        }
    }

    @Override
    public String toString() {
        var str = "";
        str += this.izq.toString();
        str += this.valor;
        str += this.der.toString();
        return str;
    }

    public int getValor() {
        return valor;
    }
}
