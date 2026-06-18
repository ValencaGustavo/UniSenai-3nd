package Exerc4;

public class Eletronico extends Produto {
    protected double consumoEnergia;
    protected String voltagem;
    protected String garantia;
    protected String conectividade;

    public Eletronico(String nomeLoja, double preco, String marca, double consumoEnergia,
                       String voltagem, String garantia, String conectividade) {
        super(nomeLoja, preco, marca);
        this.consumoEnergia = consumoEnergia;
        this.voltagem = voltagem;
        this.garantia = garantia;
        this.conectividade = conectividade;
    }

    @Override
    public String getDescricao() {
        return "Eletrônico " + marca + " | Consumo: " + consumoEnergia + "W | Voltagem: " + voltagem
                + " | Garantia: " + garantia + " | Conectividade: " + conectividade
                + " | Loja: " + nomeLoja + " | Preço: R$" + preco;
    }
}
