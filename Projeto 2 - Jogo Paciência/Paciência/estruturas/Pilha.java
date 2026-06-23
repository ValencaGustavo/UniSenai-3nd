package estruturas;

public class Pilha<T> extends EstruturaCartas<T> {

    private static class No<T> {
        T dado;
        No<T> abaixo;

        No(T dado) {
            this.dado = dado;
            this.abaixo = null;
        }
    }

    private No<T> topo;

    public Pilha() {
        super();
        topo = null;
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
        verificarVazia("a pilha");
        T dado = topo.dado;
        topo = topo.abaixo;
        tamanho--;
        return dado;
    }


    public T espiar() {
        verificarVazia("a pilha");
        return topo.dado;
    }


    @Override
    public boolean estaVazia() {
        return tamanho == 0;
    }

    @Override
    public int tamanho() {
        return tamanho;
    }

    @Override
    public void limpar() {
        topo = null;
        tamanho = 0;
    }

    @Override
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

    @Override
    public void imprimir() {
        System.out.println(toString());
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
