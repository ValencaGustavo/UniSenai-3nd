package estruturas;

public class TestesEstruturas {

    public static void main(String[] args) {

        testarPilha();
        testarFila();
        testarLista();
    }

    private static void testarPilha() {
        System.out.println("Stack");
        Pilha<Integer> pilha = new Pilha<>();

        System.out.println("Empilhando: 10, 20, 30, 40");
        pilha.empilhar(10);
        pilha.empilhar(20);
        pilha.empilhar(30);
        pilha.empilhar(40);

        System.out.println(pilha);
        System.out.println("Tamanho: " + pilha.tamanho());
        System.out.println("Topo (espiar): " + pilha.espiar());

        System.out.println("Desempilhando: " + pilha.desempilhar());
        System.out.println("Desempilhando: " + pilha.desempilhar());
        System.out.println(pilha);

        System.out.println("Contém 10? " + pilha.contem(10));
        System.out.println("Contém 99? " + pilha.contem(99));

        pilha.limpar();
        System.out.println("Após limpar está vazia? " + pilha.estaVazia());

        try {
            pilha.desempilhar();
        } catch (IllegalStateException e) {
            System.out.println("Exceção esperada: " + e.getMessage());
        }

        System.out.println();
    }

    private static void testarFila() {
        Fila<String> fila = new Fila<>();

        System.out.println("Enfileirando: Alpha, Beta, Gamma, Delta");
        fila.enfileirar("Alpha");
        fila.enfileirar("Beta");
        fila.enfileirar("Gamma");
        fila.enfileirar("Delta");

        System.out.println(fila);
        System.out.println("Tamanho: " + fila.tamanho());
        System.out.println("Frente: " + fila.espiar());
        System.out.println("Fim: " + fila.espiarFim());

        System.out.println("Desenfileirando: " + fila.desenfileirar());
        System.out.println("Desenfileirando: " + fila.desenfileirar());
        System.out.println(fila);

        System.out.println("Contém 'Gamma'? " + fila.contem("Gamma"));
        System.out.println("Contém 'Alpha'? " + fila.contem("Alpha"));

        fila.limpar();
        System.out.println("Após limpar — está vazia? " + fila.estaVazia());

        try {
            fila.desenfileirar();
        } catch (IllegalStateException e) {
            System.out.println("Exceção esperada: " + e.getMessage());
        }

        System.out.println();
    }

    private static void testarLista() {
        Lista<Double> lista = new Lista<>();

        System.out.println("Adicionando ao final: 1.1, 2.2, 3.3");
        lista.adicionar(1.1);
        lista.adicionar(2.2);
        lista.adicionar(3.3);

        System.out.println("Adicionando na frente: 0.0");
        lista.adicionarNaFrente(0.0);

        System.out.println("Inserindo 1.5 na posição 2:");
        lista.adicionarNaposicao(2, 1.5);

        System.out.println(lista);
        System.out.println("Tamanho: " + lista.tamanho());
        System.out.println("Primeiro: " + lista.primeiro());
        System.out.println("Último:   " + lista.ultimo());
        System.out.println("Índice [2]: " + lista.obter(2));

        System.out.println("Índice de 2.2: " + lista.indiceDe(2.2));
        System.out.println("Contém 3.3? " + lista.contem(3.3));

        System.out.println("Removendo índice 2: " + lista.remover(2));
        System.out.println("Removendo primeiro: " + lista.removerPrimeiro());
        System.out.println("Removendo último:   " + lista.removerUltimo());
        System.out.println(lista);

        System.out.println("Definindo índice 0 como 9.9:");
        lista.definir(0, 9.9);
        System.out.println(lista);

        lista.limpar();
        System.out.println("Após limpar — está vazia? " + lista.estaVazia());

        try {
            lista.obter(5);
        } catch (IndexOutOfBoundsException e) {
            System.out.println("Exceção esperada: " + e.getMessage());
        }

        System.out.println();
    }

}
