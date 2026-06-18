import java.time.LocalDate;

public class Emprestimo {

    private String codigoLivro;
    private String codigoUsuario;
    private LocalDate dataEmprestimo;
    private LocalDate dataPrevistaDevolucao;
    private LocalDate dataDevolucao; 
    private boolean finalizado;

    public Emprestimo(String codigoLivro, String codigoUsuario, LocalDate dataEmprestimo, LocalDate dataPrevistaDevolucao) {
        this.codigoLivro = codigoLivro;
        this.codigoUsuario = codigoUsuario;
        this.dataEmprestimo = dataEmprestimo;
        this.dataPrevistaDevolucao = dataPrevistaDevolucao;
        this.finalizado = false;
    }

    public String getCodigoLivro() {
        return codigoLivro;
    }

    public String getCodigoUsuario() {
        return codigoUsuario;
    }

    public LocalDate getDataEmprestimo() {
        return dataEmprestimo;
    }

    public LocalDate getDataPrevistaDevolucao() {
        return dataPrevistaDevolucao;
    }

    public LocalDate getDataDevolucao() {
        return dataDevolucao;
    }

    public boolean isFinalizado() {
        return finalizado;
    }

    public void finalizar(LocalDate dataDevolucao) {
        this.dataDevolucao = dataDevolucao;
        this.finalizado = true;
    }

    // está atrasado se passou do prazo e ainda não foi devolvido
    public boolean estaAtrasado(LocalDate dataReferencia) {
        if (finalizado) {
            return dataDevolucao.isAfter(dataPrevistaDevolucao);
        }
        return dataReferencia.isAfter(dataPrevistaDevolucao);
    }
}
