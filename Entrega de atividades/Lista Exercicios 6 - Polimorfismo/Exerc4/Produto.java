package Polimorfismo.Exerc4;

public class Produto {
    protected String nomeLoja;
    protected double preco;
    protected String marca;

    public Produto(String nomeLoja, double preco, String marca) {
        this.nomeLoja = nomeLoja;
        this.preco = preco;
        this.marca = marca;
    }

    public String getDescricao() {
        return "Produto de tecnologia disponível na loja.";
    }

    public double getPreco() {
        return preco;
    }

    public String getNomeLoja() {
        return nomeLoja;
    }

    public String getMarca() {
        return marca;
    }
}
