package Heranca.Exerc3;

public class ContaCorrente extends ContaBancaria {
    private double taxaManutencao;

    public ContaCorrente(String titular, double saldo, String numeroConta, double taxaManutencao) {
        super(titular, saldo, numeroConta);
        this.taxaManutencao = taxaManutencao;
    }

    public void descontarTaxa() {
        saldo -= taxaManutencao;
        System.out.println("Taxa de manutenção de R$" + taxaManutencao + " descontada");
    }

    @Override
    public void exibirDados() {
        super.exibirDados();
        System.out.println("Taxa de manutenção: R$" + taxaManutencao);
    }
}