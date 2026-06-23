package jogo;

import estruturas.Lista;

public class ColunaTableau {

    private final Lista<Carta> cartas;

    public ColunaTableau() {
        this.cartas = new Lista<>();
    }

    public void forcarAdicionar(Carta carta) {
        cartas.adicionar(carta);
    }

    public boolean adicionarCarta(Carta carta) {
        Carta topoAtual = estaVazia() ? null : topo();
        if (!carta.podeEmpilharSobreNoTableau(topoAtual)) {
            return false;
        }
        cartas.adicionar(carta);
        return true;
    }

    public Carta removerTopo() {
        Carta carta = cartas.removerUltimo();
        if (!cartas.estaVazia()) {
            cartas.ultimo().virarParaCima();
        }
        return carta;
    }

    public Carta topo() {
        return cartas.ultimo();
    }

    public boolean estaVazia() {
        return cartas.estaVazia();
    }

    public int tamanho() {
        return cartas.tamanho();
    }

    public boolean moverSequenciaPara(int indiceInicio, ColunaTableau destino) {
        if (indiceInicio < 0 || indiceInicio >= cartas.tamanho()) {
            return false;
        }
        if (!sequenciaValidaApartirDe(indiceInicio)) {
            return false;
        }
        Carta primeiraDaSequencia = cartas.obter(indiceInicio);
        Carta topoDestino = destino.estaVazia() ? null : destino.topo();
        if (!primeiraDaSequencia.podeEmpilharSobreNoTableau(topoDestino)) {
            return false;
        }

        int quantidade = cartas.tamanho() - indiceInicio;
        Carta[] sequencia = new Carta[quantidade];
        for (int i = 0; i < quantidade; i++) {
            sequencia[i] = cartas.obter(indiceInicio + i);
        }
        for (int i = 0; i < quantidade; i++) {
            cartas.removerUltimo();
        }
        if (!cartas.estaVazia()) {
            cartas.ultimo().virarParaCima();
        }
        for (Carta carta : sequencia) {
            destino.cartas.adicionar(carta);
        }
        return true;
    }

    private boolean sequenciaValidaApartirDe(int indiceInicio) {
        for (int i = indiceInicio; i < cartas.tamanho() - 1; i++) {
            Carta atual = cartas.obter(i);
            Carta proxima = cartas.obter(i + 1);
            if (!atual.isVisivel() || !proxima.isVisivel()) {
                return false;
            }
            if (!proxima.podeEmpilharSobreNoTableau(atual)) {
                return false;
            }
        }
        return true;
    }

    public Carta obter(int indice) {
        return cartas.obter(indice);
    }

    public void imprimir() {
        cartas.imprimir();
    }

    @Override
    public String toString() {
        return cartas.toString();
    }
}
