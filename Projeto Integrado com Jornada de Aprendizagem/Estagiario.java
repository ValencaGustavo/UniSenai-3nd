public class Estagiario extends Funcionario {

    private int cargaHorariaMensal;

    public Estagiario(String nome, String cpf, double valorHora, int cargaHorariaMensal) {
        super(nome, cpf, "Estagiário", valorHora);
        this.cargaHorariaMensal = cargaHorariaMensal;
    }

    public int getCargaHorariaMensal() {
        return cargaHorariaMensal;
    }
    
    @Override
    public double calcularSalario() {
        return getSalarioBase() * cargaHorariaMensal;
    }
}
