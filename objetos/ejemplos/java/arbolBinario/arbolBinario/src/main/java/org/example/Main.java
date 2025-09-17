package org.example;

public class Main {
    public static void main(String[] args) {
        var raiz = new NodoImpl(5);
        raiz.add(3);
        raiz.add(2);
        raiz.add(1);
        raiz.add(7);
        raiz.add(9);
        raiz.add(6);
        System.out.println(raiz.existe(1));
        System.out.println(raiz.existe(4));
        System.out.println(raiz);
    }
}