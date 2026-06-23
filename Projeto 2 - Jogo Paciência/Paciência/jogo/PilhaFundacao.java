package jogo;

import estruturas.Pilha;

public class PilhaFundacao {

    private final String naipe;
    private final Pilha<Carta> cartas;

    public PilhaFundacao(String naipe) {
        this.naipe = naipe;
        this.cartas = new Pilha<>();
    }

    public String getNaipe() {
        return naipe;
    }

    public boolean adicionarCarta(Carta carta) {
        if (!carta.getNaipe().equals(naipe)) {
            return false;
        }
        Carta topoAtual = cartas.estaVazia() ? null : cartas.espiar();
        if (!carta.podeEmpilharSobreNaFundacao(topoAtual)) {
            return false;
        }
        carta.virarParaCima();
        cartas.empilhar(carta);
        return true;
    }

    public boolean estaVazia() {
        return cartas.estaVazia();
    }

    public int tamanho() {
        return cartas.tamanho();
    }

    public Carta topo() {
        return cartas.espiar();
    }

    public boolean estaCompleta() {
        return cartas.tamanho() == 13;
    }

    public void imprimir() {
        cartas.imprimir();
    }

    @Override
    public String toString() {
        return cartas.toString();
    }
}
