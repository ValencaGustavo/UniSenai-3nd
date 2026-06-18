package estruturas;

public class Pilha<T> {

    private static class No<T> {
        T dado;
        No<T> abaixo;

        No(T dado) {
            this.dado = dado;
            this.abaixo = null;
        }
    }

    private int tamanho;

    public Pilha() {
        this.topo = null;
        this.tamanho = 0;
    }

    public void empilhar(T elemento) {
        if (elemento == null) {
            throw new IllegalArgumentException("Não é permitido empilhar elemento nulo.");
        }
        No<T> novoNo = new No<>(elemento);
        novoNo.abaixo = topo;
        topo = novoNo;
        tamanho++;
    }

    public T desempilhar() {
        verificarVazia();
        T dado = topo.dado;
        topo = topo.abaixo;
        tamanho--;
        return dado;
    }


    public T espiar() {
        verificarVazia();
        return topo.dado;
    }


    public boolean estaVazia() {
        return tamanho == 0;
    }

    public int tamanho() {
        return tamanho;
    }

    public void limpar() {
        topo = null;
        tamanho = 0;
    }

    public boolean contem(T elemento) {
        No<T> atual = topo;
        while (atual != null) {
            if (atual.dado.equals(elemento)) {
                return true;
            }
            atual = atual.abaixo;
        }
        return false;
    }

    private void verificarVazia() {
        if (estaVazia()) {
            throw new IllegalStateException("Operação inválida: a pilha está vazia.");
        }
    }

    @Override
    public String toString() {
        if (estaVazia()) {
            return "Pilha[]";
        }
        StringBuilder sb = new StringBuilder("Pilha[topo -> ");
        No<T> atual = topo;
        while (atual != null) {
            sb.append(atual.dado);
            if (atual.abaixo != null) {
                sb.append(" -> ");
            }
            atual = atual.abaixo;
        }
        sb.append(" <- base]");
        return sb.toString();
    }
}
