public abstract class Algoritmo {

    protected long comparacoes;
    protected long trocas;

    public abstract void ordenar(int[] arr);

    public abstract String getNome();

    public long getComparacoes() {
        return comparacoes;
    }

    public long getTrocas() {
        return trocas;
    }

    protected void resetar() {
        comparacoes = 0;
        trocas = 0;
    }
}
