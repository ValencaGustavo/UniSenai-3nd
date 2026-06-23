package estruturas;

public abstract class EstruturaCartas<T> {

    protected int tamanho;

    protected EstruturaCartas() {
        this.tamanho = 0;
    }

    public int tamanho() {
        return tamanho;
    }

    public boolean estaVazia() {
        return tamanho == 0;
    }

    public abstract void limpar();

    public abstract boolean contem(T elemento);

    public abstract void imprimir();

    protected void verificarVazia(String nomeEstrutura) {
        if (estaVazia()) {
            throw new IllegalStateException(
                    "Operação inválida: " + nomeEstrutura + " está vazia.");
        }
    }
}
