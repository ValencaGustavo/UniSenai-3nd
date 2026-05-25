package Heranca.Exerc3;

public class ContaSalario extends ContaBancaria {
    private String empresa;

    public ContaSalario(String titular, double saldo, String numeroConta, String empresa) {
        super(titular, saldo, numeroConta);
        this.empresa = empresa;
    }

    public void receberSalario(double valor) {
        saldo += valor;
        System.out.println("Salário de R$" + valor + " recebido de " + empresa + ".");
    }

    @Override
    public void exibirDados() {
        super.exibirDados();
        System.out.println("Empresa: " + empresa);
    }
}