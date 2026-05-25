package Heranca.Exerc3;

public class ContaPoupanca extends ContaBancaria {
    private double taxaRendimento;

    public ContaPoupanca(String titular, double saldo, String numeroConta, double taxaRendimento) {
        super(titular, saldo, numeroConta);
        this.taxaRendimento = taxaRendimento;
    }

    public void aplicarRendimento() {
        double rendimento = saldo * (taxaRendimento / 100);
        saldo += rendimento;
        System.out.println("Rendimento de R$" + rendimento + " aplicado.");
    }

    @Override
    public void exibirDados() {
        super.exibirDados();
        System.out.println("Taxa de rendimento: " + taxaRendimento + "%");
    }
}