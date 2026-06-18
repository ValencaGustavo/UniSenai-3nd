public class Audiobook extends Livro {

    private int duracaoMinutos;
    private String narrador;

    public Audiobook(String codigo, String titulo, String autor, int duracaoMinutos, String narrador) {
        super(codigo, titulo, autor);
        this.duracaoMinutos = duracaoMinutos;
        this.narrador = narrador;
    }

    public int getDuracaoMinutos() {
        return duracaoMinutos;
    }

    public String getNarrador() {
        return narrador;
    }

    @Override
    public String exibirDetalhes() {
        return "[Audiobook] Código: " + getCodigo() +
                " | Título: " + getTitulo() +
                " | Autor: " + getAutor() +
                " | Duração: " + duracaoMinutos + " min" +
                " | Narrador: " + narrador;
    }
}
