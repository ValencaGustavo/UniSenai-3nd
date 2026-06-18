public class Professor extends Usuario {

    private static final int PRAZO_DEVOLUCAO_DIAS = 15;

    private String areaAtuacao;
    private String departamento;
    private String emailInstitucional;

    public Professor(String codigo, String nomeCompleto, String areaAtuacao, String departamento, String emailInstitucional) {
        super(codigo, nomeCompleto);
        this.areaAtuacao = areaAtuacao;
        this.departamento = departamento;
        this.emailInstitucional = emailInstitucional;
    }

    public String getAreaAtuacao() {
        return areaAtuacao;
    }

    public String getDepartamento() {
        return departamento;
    }

    public String getEmailInstitucional() {
        return emailInstitucional;
    }

    @Override
    public int getPrazoDevolucaoDias() {
        return PRAZO_DEVOLUCAO_DIAS;
    }

    @Override
    public String exibirDetalhes() {
        return "[Professor] Código: " + getCodigo() +
                " | Nome: " + getNomeCompleto() +
                " | Área: " + areaAtuacao +
                " | Departamento: " + departamento +
                " | E-mail: " + emailInstitucional;
    }
}
