public class Aluno extends Usuario {

    private static final int PRAZO_DEVOLUCAO_DIAS = 7;

    private int idade;
    private String cursoMatriculado;
    private String numeroMatricula;

    public Aluno(String codigo, String nomeCompleto, int idade, String cursoMatriculado, String numeroMatricula) {
        super(codigo, nomeCompleto);
        this.idade = idade;
        this.cursoMatriculado = cursoMatriculado;
        this.numeroMatricula = numeroMatricula;
    }

    public int getIdade() {
        return idade;
    }

    public String getCursoMatriculado() {
        return cursoMatriculado;
    }

    public String getNumeroMatricula() {
        return numeroMatricula;
    }

    @Override
    public int getPrazoDevolucaoDias() {
        return PRAZO_DEVOLUCAO_DIAS;
    }

    @Override
    public String exibirDetalhes() {
        return "[Aluno] Código: " + getCodigo() +
                " | Nome: " + getNomeCompleto() +
                " | Idade: " + idade +
                " | Curso: " + cursoMatriculado +
                " | Matrícula: " + numeroMatricula;
    }
}
