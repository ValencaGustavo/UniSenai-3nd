public class Ebook extends Livro {

    private int numeroPaginas;
    private String linkDownload;

    public Ebook(String codigo, String titulo, String autor, int numeroPaginas, String linkDownload) {
        super(codigo, titulo, autor);
        this.numeroPaginas = numeroPaginas;
        this.linkDownload = linkDownload;
    }

    public int getNumeroPaginas() {
        return numeroPaginas;
    }

    public String getLinkDownload() {
        return linkDownload;
    }

    @Override
    public String exibirDetalhes() {
        return "[E-book] Código: " + getCodigo() +
                " | Título: " + getTitulo() +
                " | Autor: " + getAutor() +
                " | Páginas: " + numeroPaginas +
                " | Link: " + linkDownload;
    }
}
