package jogo;

public class Carta {

    private final int numero;
    private final String naipe;
    private final String cor;
    private boolean visivel;

    public Carta(int numero, String naipe) {
        if (numero < 1 || numero > 13) {
            throw new IllegalArgumentException(
                    "Número inválido para carta: " + numero + ". Deve estar entre 1 e 13.");
        }
        if (!naipe.equals("Copas") && !naipe.equals("Ouros")
                && !naipe.equals("Espadas") && !naipe.equals("Paus")) {
            throw new IllegalArgumentException("Naipe inválido: " + naipe);
        }
        this.numero = numero;
        this.naipe = naipe;
        this.cor = (naipe.equals("Copas") || naipe.equals("Ouros")) ? "Vermelha" : "Preta";
        this.visivel = false;
    }

    public int getNumero() {
        return numero;
    }

    public String getNaipe() {
        return naipe;
    }

    public String getCor() {
        return cor;
    }

    public boolean isVisivel() {
        return visivel;
    }

    public void virarParaCima() {
        this.visivel = true;
    }

    public void virarParaBaixo() {
        this.visivel = false;
    }

    public String getSimboloNumero() {
        switch (numero) {
            case 1: return "A";
            case 11: return "J";
            case 12: return "Q";
            case 13: return "K";
            default: return String.valueOf(numero);
        }
    }

    public String getSimboloNaipe() {
        switch (naipe) {
            case "Copas": return " Copas";
            case "Ouros": return " Ouros";
            case "Espadas": return " Espadas";
            case "Paus": return " Paus";
            default: return "?";
        }
    }
    public boolean podeEmpilharSobreNoTableau(Carta topoAtualDaColuna) {
        if (topoAtualDaColuna == null) {
            return this.numero == 13;
        }
        boolean ordemCorreta = this.numero == topoAtualDaColuna.numero - 1;
        boolean corAlternada = !topoAtualDaColuna.cor.equals(this.cor);
        return ordemCorreta && corAlternada;
    }

    public boolean podeEmpilharSobreNaFundacao(Carta topoFundacao) {
        if (topoFundacao == null) {
            return this.numero == 1;
        }
        return topoFundacao.naipe.equals(this.naipe) && this.numero == topoFundacao.numero + 1;
    }

    @Override
    public String toString() {
        if (!visivel) {
            return "[?]";
        }
        return "[" + getSimboloNumero() + getSimboloNaipe() + "]";
    }
}
