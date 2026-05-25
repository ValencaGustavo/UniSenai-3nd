package Heranca.Exerc2;

public class Estagiario extends Funcionario {
    
    private int horasTrabalhadas;
    private double valorHora;

    public Estagiario(String nome, String cpf, int salarioBase, int horasTrabalhadas, double valorHora) {
        super(nome, cpf, salarioBase);
        this.horasTrabalhadas = horasTrabalhadas;
        this.valorHora = valorHora;
    }

    public void calcularSalario() {
        salarioBase = horasTrabalhadas * valorHora;
        super.calcularSalario();
    }

    @Override
    public void exibirDados() {
        super.exibirDados();
        System.out.println("Horas trabalhadas: " + horasTrabalhadas);
        System.out.println("Valor da hora: " + valorHora);
    }
}
