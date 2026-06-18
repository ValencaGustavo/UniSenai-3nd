public class LivroFisico extends Livro {

    private int numeroPaginas;
    private int numeroEstante;

    public LivroFisico(String codigo, String titulo, String autor, int numeroPaginas, int numeroEstante) {
        super(codigo, titulo, autor);
        this.numeroPaginas = numeroPaginas;
        this.numeroEstante = numeroEstante;
    }

    public int getNumeroPaginas() {
        return numeroPaginas;
    }

    public int getNumeroEstante() {
        return numeroEstante;
    }

    @Override
    public String exibirDetalhes() {
        return "[Físico] Código: " + getCodigo() +
                " | Título: " + getTitulo() +
                " | Autor: " + getAutor() +
                " | Páginas: " + numeroPaginas +
                " | Estante: " + numeroEstante +
                " | Disponível: " + (isDisponivel() ? "Sim" : "Não");
    }
}
