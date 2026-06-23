package estruturas;

public class Fila<T> extends EstruturaCartas<T> {

    private static class No<T> {
        T dado;
        No<T> proximo;

        No(T dado) {
            this.dado = dado;
            this.proximo = null;
        }
    }

    private No<T> frente;

    private No<T> fim;

    public Fila() {
        super();
        frente = null;
        fim = null;
    }

    public void enfileirar(T elemento) {
        if (elemento == null) {
            throw new IllegalArgumentException("Não é permitido enfileirar elemento nulo.");
        }
        No<T> novoNo = new No<>(elemento);
        if (estaVazia()) {
            frente = novoNo;
        } else {
            fim.proximo = novoNo;
        }
        fim = novoNo;
        tamanho++;
    }

    public T desenfileirar() {
        verificarVazia("a fila");
        T dado = frente.dado;
        frente = frente.proximo;
        if (frente == null) {
            fim = null;
        }
        tamanho--;
        return dado;
    }

    public T espiar() {
        verificarVazia("a fila");
        return frente.dado;
    }

    public T espiarFim() {
        verificarVazia("a fila");
        return fim.dado;
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
        frente = null;
        fim = null;
        tamanho = 0;
    }

    @Override
    public boolean contem(T elemento) {
        No<T> atual = frente;
        while (atual != null) {
            if (atual.dado.equals(elemento)) {
                return true;
            }
            atual = atual.proximo;
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
            return "Fila[]";
        }
        StringBuilder sb = new StringBuilder("Fila[frente -> ");
        No<T> atual = frente;
        while (atual != null) {
            sb.append(atual.dado);
            if (atual.proximo != null) {
                sb.append(" -> ");
            }
            atual = atual.proximo;
        }
        sb.append(" <- fim]");
        return sb.toString();
    }
}
