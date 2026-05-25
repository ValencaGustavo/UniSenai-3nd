package Heranca.Exerc2;

public class Desenvolvedor extends Funcionario {
    private String linguagem;

    public Desenvolvedor(String nome, String cpf, double salarioBase, String linguagem) {
        super(nome, cpf, salarioBase);
        this.linguagem = linguagem;
    }

    public void calcularSalario() {
        super.calcularSalario();
    }

    @Override
    public void exibirDados() {
        super.exibirDados();
        System.out.println("Linguagem: " + linguagem);
    }
}
