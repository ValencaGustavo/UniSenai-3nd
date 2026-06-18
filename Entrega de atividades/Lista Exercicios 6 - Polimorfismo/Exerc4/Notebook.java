package Exerc4;

public class Notebook extends Eletronico {
    private String processador;
    private int memoriaRAM;
    private String armazenamento;

    public Notebook(String nomeLoja, double preco, String marca, double consumoEnergia, String voltagem,
                     String garantia, String conectividade, String processador, int memoriaRAM,
                     String armazenamento) {
        super(nomeLoja, preco, marca, consumoEnergia, voltagem, garantia, conectividade);
        this.processador = processador;
        this.memoriaRAM = memoriaRAM;
        this.armazenamento = armazenamento;
    }

    @Override
    public String getDescricao() {
        return super.getDescricao() + " | Notebook " + processador + ", " + memoriaRAM
                + "GB RAM, " + armazenamento;
    }
}
