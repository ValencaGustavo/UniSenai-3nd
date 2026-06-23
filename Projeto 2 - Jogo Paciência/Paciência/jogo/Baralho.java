package jogo;

import estruturas.Lista;
import java.util.Random;

public class Baralho {

    private static final String[] NAIPES = {"Copas", "Ouros", "Espadas", "Paus"};
    private final Lista<Carta> cartas;

    public Baralho() {
        this.cartas = new Lista<>();
        gerarCartas();
    }

    private void gerarCartas() {
        for (String naipe : NAIPES) {
            for (int numero = 1; numero <= 13; numero++) {
                cartas.adicionar(new Carta(numero, naipe));
            }
        }
    }

    public void embaralhar() {
        int n = cartas.tamanho();
        Random random = new Random();
        for (int i = n - 1; i > 0; i--) {
            int j = random.nextInt(i + 1);
            Carta cartaI = cartas.obter(i);
            Carta cartaJ = cartas.obter(j);
            cartas.definir(i, cartaJ);
            cartas.definir(j, cartaI);
        }
    }

    public boolean estaVazio() {
        return cartas.estaVazia();
    }

    public int tamanho() {
        return cartas.tamanho();
    }

    public Carta retirarCarta() {
        return cartas.removerPrimeiro();
    }

    @Override
    public String toString() {
        return "Baralho com " + cartas.tamanho() + " cartas restantes";
    }
}
