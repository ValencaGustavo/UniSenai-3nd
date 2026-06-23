package estruturas;

public class Lista<T> extends EstruturaCartas<T> {

    private static class No<T> {
        T dado;
        No<T> anterior;
        No<T> proximo;

        No(T dado) {
            this.dado = dado;
            this.anterior = null;
            this.proximo = null;
        }
    }

    private No<T> cabeca;
    private No<T> cauda;

    public Lista() {
        super();
        cabeca = null;
        cauda = null;
    }

    public void adicionar(T elemento) {
        validarElemento(elemento);
        No<T> novoNo = new No<>(elemento);
        if (estaVazia()) {
            cabeca = novoNo;
        } else {
            novoNo.anterior = cauda;
            cauda.proximo = novoNo;
        }
        cauda = novoNo;
        tamanho++;
    }

    public void adicionarNaFrente(T elemento) {
        validarElemento(elemento);
        No<T> novoNo = new No<>(elemento);
        if (estaVazia()) {
            cauda = novoNo;
        } else {
            novoNo.proximo = cabeca;
            cabeca.anterior = novoNo;
        }
        cabeca = novoNo;
        tamanho++;
    }

    public void adicionarNaposicao(int indice, T elemento) {
        if (indice < 0 || indice > tamanho) {
            throw new IndexOutOfBoundsException(
                    "Índice inválido: " + indice + ". Tamanho atual: " + tamanho);
        }
        if (indice == 0) {
            adicionarNaFrente(elemento);
            return;
        }
        if (indice == tamanho) {
            adicionar(elemento);
            return;
        }
        validarElemento(elemento);
        No<T> novoNo = new No<>(elemento);
        No<T> noAtual = obterNo(indice);
        No<T> noAnterior = noAtual.anterior;

        novoNo.proximo = noAtual;
        novoNo.anterior = noAnterior;
        noAnterior.proximo = novoNo;
        noAtual.anterior = novoNo;
        tamanho++;
    }

    public T remover(int indice) {
        validarIndice(indice);
        No<T> noRemovido = obterNo(indice);
        desconectar(noRemovido);
        tamanho--;
        return noRemovido.dado;
    }

    public boolean removerElemento(T elemento) {
        No<T> atual = cabeca;
        while (atual != null) {
            if (atual.dado.equals(elemento)) {
                desconectar(atual);
                tamanho--;
                return true;
            }
            atual = atual.proximo;
        }
        return false;
    }

    public T removerPrimeiro() {
        verificarVazia("a lista");
        return remover(0);
    }

    public T removerUltimo() {
        verificarVazia("a lista");
        return remover(tamanho - 1);
    }

    public T obter(int indice) {
        validarIndice(indice);
        return obterNo(indice).dado;
    }

    public T primeiro() {
        verificarVazia("a lista");
        return cabeca.dado;
    }
    public T ultimo() {
        verificarVazia("a lista");
        return cauda.dado;
    }

    public void definir(int indice, T elemento) {
        validarElemento(elemento);
        validarIndice(indice);
        obterNo(indice).dado = elemento;
    }

    public int indiceDe(T elemento) {
        No<T> atual = cabeca;
        int indice = 0;
        while (atual != null) {
            if (atual.dado.equals(elemento)) {
                return indice;
            }
            atual = atual.proximo;
            indice++;
        }
        return -1;
    }

    @Override
    public boolean contem(T elemento) {
        return indiceDe(elemento) != -1;
    }

    @Override
    public void imprimir() {
        System.out.println(toString());
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
        cabeca = null;
        cauda = null;
        tamanho = 0;
    }

    private No<T> obterNo(int indice) {
        No<T> atual;
        if (indice < tamanho / 2) {
            atual = cabeca;
            for (int i = 0; i < indice; i++) {
                atual = atual.proximo;
            }
        } else {
            atual = cauda;
            for (int i = tamanho - 1; i > indice; i--) {
                atual = atual.anterior;
            }
        }
        return atual;
    }

    private void desconectar(No<T> no) {
        if (no.anterior != null) {
            no.anterior.proximo = no.proximo;
        } else {
            cabeca = no.proximo;
        }
        if (no.proximo != null) {
            no.proximo.anterior = no.anterior;
        } else {
            cauda = no.anterior;
        }
        no.anterior = null;
        no.proximo = null;
    }

    private void validarElemento(T elemento) {
        if (elemento == null) {
            throw new IllegalArgumentException("Não é permitido inserir elemento nulo.");
        }
    }

    private void validarIndice(int indice) {
        if (indice < 0 || indice >= tamanho) {
            throw new IndexOutOfBoundsException(
                    "Índice inválido: " + indice + ". Tamanho atual: " + tamanho);
        }
    }

    @Override
    public String toString() {
        if (estaVazia()) {
            return "Lista[]";
        }
        StringBuilder sb = new StringBuilder("Lista[");
        No<T> atual = cabeca;
        while (atual != null) {
            sb.append(atual.dado);
            if (atual.proximo != null) {
                sb.append(" <-> ");
            }
            atual = atual.proximo;
        }
        sb.append("]");
        return sb.toString();
    }
}
