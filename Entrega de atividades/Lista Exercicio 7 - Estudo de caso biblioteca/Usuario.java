public abstract class Usuario {

    private String codigo;
    private String nomeCompleto;

    public Usuario(String codigo, String nomeCompleto) {
        this.codigo = codigo;
        this.nomeCompleto = nomeCompleto;
    }

    public String getCodigo() {
        return codigo;
    }

    public String getNomeCompleto() {
        return nomeCompleto;
    }

    public abstract int getPrazoDevolucaoDias();

    public abstract String exibirDetalhes();
}
