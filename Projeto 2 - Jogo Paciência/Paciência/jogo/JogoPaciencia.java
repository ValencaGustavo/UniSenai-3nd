package jogo;

import estruturas.Fila;

public class JogoPaciencia {

    private static final String[] NAIPES = {"Copas", "Ouros", "Espadas", "Paus"};
    private static final int NUM_COLUNAS = 7;
    private Fila<Carta> monte;
    private Fila<Carta> filaDescarte;
    private ColunaTableau[] colunas;
    private PilhaFundacao[] fundacoes;
    private int cartasNoMonteOriginal;

    public JogoPaciencia() {
        iniciarNovoJogo();
    }

    public void iniciarNovoJogo() {
        Baralho baralho = new Baralho();
        baralho.embaralhar();

        colunas = new ColunaTableau[NUM_COLUNAS];
        for (int i = 0; i < NUM_COLUNAS; i++) {
            colunas[i] = new ColunaTableau();
        }

        fundacoes = new PilhaFundacao[NAIPES.length];
        for (int i = 0; i < NAIPES.length; i++) {
            fundacoes[i] = new PilhaFundacao(NAIPES[i]);
        }

        for (int i = 0; i < NUM_COLUNAS; i++) {
            for (int j = 0; j <= i; j++) {
                Carta carta = baralho.retirarCarta();
                if (j == i) {
                    carta.virarParaCima();
                }
                colunas[i].forcarAdicionar(carta);
            }
        }

        monte = new Fila<>();
        while (!baralho.estaVazio()) {
            Carta carta = baralho.retirarCarta();
            carta.virarParaCima();
            monte.enfileirar(carta);
        }
        cartasNoMonteOriginal = monte.tamanho();

        filaDescarte = new Fila<>();
    }

    public boolean filaParaFundacao() {
        if (filaDescarte.estaVazia()) {
            return false;
        }
        Carta carta = filaDescarte.espiar();
        PilhaFundacao fundacao = obterFundacao(carta.getNaipe());
        if (fundacao.adicionarCarta(carta)) {
            filaDescarte.desenfileirar();
            return true;
        }
        return false;
    }

    public Carta comprarCarta() {
        if (monte.estaVazia()) {
            return null;
        }
        Carta carta = monte.desenfileirar();
        carta.virarParaCima();
        filaDescarte.enfileirar(carta);
        return carta;
    }

    public boolean devolverCartaAoMonte() {
        if (filaDescarte.estaVazia()) {
            return false;
        }
        Carta carta = filaDescarte.desenfileirar();
        monte.enfileirar(carta);
        return true;
    }

    public boolean filaParaColuna(int indiceColuna) {
        if (!indiceColunaValido(indiceColuna) || filaDescarte.estaVazia()) {
            return false;
        }
        Carta carta = filaDescarte.espiar();
        if (colunas[indiceColuna].adicionarCarta(carta)) {
            filaDescarte.desenfileirar();
            return true;
        }
        return false;
    }

    public boolean colunaParaFundacao(int indiceColuna) {
        if (!indiceColunaValido(indiceColuna) || colunas[indiceColuna].estaVazia()) {
            return false;
        }
        Carta carta = colunas[indiceColuna].topo();
        if (!carta.isVisivel()) {
            return false;
        }
        PilhaFundacao fundacao = obterFundacao(carta.getNaipe());
        Carta topoFundacao = fundacao.estaVazia() ? null : fundacao.topo();
        if (!carta.podeEmpilharSobreNaFundacao(topoFundacao)) {
            return false;
        }
        colunas[indiceColuna].removerTopo();
        fundacao.adicionarCarta(carta);
        return true;
    }

    public boolean colunaParaColuna(int indiceOrigem, int indiceCartaNaColuna, int indiceDestino) {
        if (!indiceColunaValido(indiceOrigem) || !indiceColunaValido(indiceDestino)) {
            return false;
        }
        if (indiceOrigem == indiceDestino) {
            return false;
        }
        return colunas[indiceOrigem].moverSequenciaPara(indiceCartaNaColuna, colunas[indiceDestino]);
    }

    public void reiniciar() {
        iniciarNovoJogo();
    }

    public void imprimirEstado() {
        System.out.println();
        System.out.println("================= ESTADO DA PARTIDA =================");

        System.out.print("Monte (compra): ");
        if (monte.estaVazia()) {
            System.out.println("[vazio]");
        } else {
            System.out.println(monte.tamanho() + " carta(s) — próxima: [??]");
        }

        System.out.print("Fila de descarte (topo visível): ");
        if (filaDescarte.estaVazia()) {
            System.out.println("[vazia]");
        } else {
            System.out.println(filaDescarte.espiarFim());
        }

        System.out.println();
        System.out.println("Fundações:");
        for (PilhaFundacao fundacao : fundacoes) {
            String topo = fundacao.estaVazia() ? "[vazia]" : fundacao.topo().toString();
            System.out.println("  " + fundacao.getNaipe() + ": " + topo
                    + " (" + fundacao.tamanho() + "/13)");
        }

        System.out.println();
        System.out.println("Colunas do tableau:");
        for (int i = 0; i < colunas.length; i++) {
            System.out.print("  Coluna " + (i + 1) + ": ");
            colunas[i].imprimir();
        }
        System.out.println("=======================================================");
    }

    public boolean jogoFoiVencido() {
        for (PilhaFundacao fundacao : fundacoes) {
            if (!fundacao.estaCompleta()) {
                return false;
            }
        }
        return true;
    }

    private PilhaFundacao obterFundacao(String naipe) {
        for (PilhaFundacao fundacao : fundacoes) {
            if (fundacao.getNaipe().equals(naipe)) {
                return fundacao;
            }
        }
        throw new IllegalArgumentException("Naipe desconhecido: " + naipe);
    }

    private boolean indiceColunaValido(int indice) {
        return indice >= 0 && indice < colunas.length;
    }

    public int getNumColunas() {
        return NUM_COLUNAS;
    }

    public ColunaTableau getColuna(int indice) {
        return colunas[indice];
    }
}
