public class Funcionario extends Pessoa {

    private String cargo;
    private double salarioBase;

    public Funcionario(String nome, String cpf, String cargo, double salarioBase) {
        super(nome, cpf);
        this.cargo = cargo;
        this.salarioBase = salarioBase;
    }

    public String getCargo() {
        return cargo;
    }

    public double getSalarioBase() {
        return salarioBase;
    }

    public void setSalarioBase(double salarioBase) {
        this.salarioBase = salarioBase;
    }

    @Override
    public double calcularSalario() {
        return salarioBase;
    }
}
