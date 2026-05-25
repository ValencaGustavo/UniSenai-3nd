package Heranca.Exerc2;

public class Funcionario {
    private String nome;
    private String cpf;
    protected double salarioBase;

    public Funcionario(String nome, String cpf, double salarioBase) {
        this.nome = nome;
        this.cpf = cpf;
        this.salarioBase = salarioBase;
    }

    public void calcularSalario() {
        System.out.println(salarioBase);
    }

    public void exibirDados() {
        System.out.println("Nome do funcionário: " + nome);
        System.out.println("CPF: " + cpf);
        System.out.println("Salário: " + salarioBase);
    }
}
