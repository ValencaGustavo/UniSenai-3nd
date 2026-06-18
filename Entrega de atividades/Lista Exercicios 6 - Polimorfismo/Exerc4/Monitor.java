package Exerc4;

public class Monitor extends Eletronico {
    private double tamanhoTela;
    private String resolucao;
    private int taxaAtualizacao;

    public Monitor(String nomeLoja, double preco, String marca, double consumoEnergia, String voltagem,
                    String garantia, String conectividade, double tamanhoTela, String resolucao,
                    int taxaAtualizacao) {
        super(nomeLoja, preco, marca, consumoEnergia, voltagem, garantia, conectividade);
        this.tamanhoTela = tamanhoTela;
        this.resolucao = resolucao;
        this.taxaAtualizacao = taxaAtualizacao;
    }

    @Override
    public String getDescricao() {
        return super.getDescricao() + " | Monitor " + tamanhoTela + "\" " + resolucao
                + " " + taxaAtualizacao + "Hz";
    }
}
