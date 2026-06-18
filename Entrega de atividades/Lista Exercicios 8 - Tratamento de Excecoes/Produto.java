public class Produto {

    private String nome;
    private int estoque;

    public Produto(String nome, int estoque) {
        this.nome = nome;
        this.estoque = estoque;
    }

    public void retirar(int quantidade) {
        if (quantidade > this.estoque) {
            throw new OutOfStockException(this.nome, this.estoque, quantidade);
        }
        this.estoque -= quantidade;
    }

    public String getNome() {
        return nome;
    }

    public int getEstoque() {
        return estoque;
    }
}
