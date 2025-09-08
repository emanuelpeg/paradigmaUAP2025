package org.example;

public class NodoVacio implements Nodo {

    public boolean esVacio() {
        return true;
    }

    public void add(int valor) {
    }

    public boolean existe(int valor) {
        return false;
    }

    @Override
    public String toString() {
        return "";
    }

}
