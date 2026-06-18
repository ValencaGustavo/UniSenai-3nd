public class Estudante {

    private static final int LIMITE_CREDITOS = 30;

    private String nome;
    private int creditosMatriculados;

    public Estudante(String nome) {
        this.nome = nome;
        this.creditosMatriculados = 0; // inicialmente zero
    }

    public void matricular(int creditosDesejados) throws CreditLimitException {
        int novoTotal = this.creditosMatriculados + creditosDesejados;

        if (novoTotal > LIMITE_CREDITOS) {
            throw new CreditLimitException(LIMITE_CREDITOS, novoTotal);
        }

        this.creditosMatriculados = novoTotal;
    }

    public String getNome() {
        return nome;
    }

    public int getCreditosMatriculados() {
        return creditosMatriculados;
    }
}
