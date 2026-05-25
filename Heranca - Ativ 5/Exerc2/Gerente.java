package Heranca.Exerc2;

public class Gerente extends Funcionario {
    private double bonus;

    public Gerente(String nome, String cpf, double salarioBase, double bonus) {
        super(nome, cpf, salarioBase);
        this.bonus = bonus;
    }

    @Override
    public void calcularSalario() {
        salarioBase += bonus;
        super.calcularSalario();
    }

    @Override
    public void exibirDados() {
        super.exibirDados();
        System.out.println("Bonus: " + bonus);
    }
}
