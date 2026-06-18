package Polimorfismo.Exerc4;

public class Acessorio extends Produto {
    protected String material;
    protected String compatibilidade;
    protected double peso;
    protected String portabilidade;

    public Acessorio(String nomeLoja, double preco, String marca, String material,
                      String compatibilidade, double peso, String portabilidade) {
        super(nomeLoja, preco, marca);
        this.material = material;
        this.compatibilidade = compatibilidade;
        this.peso = peso;
        this.portabilidade = portabilidade;
    }

    @Override
    public String getDescricao() {
        return "Acessório " + marca + " | Material: " + material + " | Compatível com: " + compatibilidade
                + " | Peso: " + peso + "g | Portabilidade: " + portabilidade
                + " | Loja: " + nomeLoja + " | Preço: R$" + preco;
    }
}
