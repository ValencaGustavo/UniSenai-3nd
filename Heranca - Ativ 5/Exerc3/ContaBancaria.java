package Heranca.Exerc3;

public class ContaBancaria {
    private String titular;
    protected double saldo;
    private String numeroConta;

    public ContaBancaria(String titular, double saldo, String numeroConta) {
        this.titular = titular;
        this.saldo = saldo;
        this.numeroConta = numeroConta;
    }

    public void depositar(double valor) {
        saldo += valor;
        System.out.println("Depósito de R$" + valor + " realizado.");
    }

    public void sacar(double valor) {
        if (saldo - valor < 0) {
            System.out.println("Saldo insuficiente.");
        } else {
            saldo -= valor;
            System.out.println("Saque de R$" + valor + " realizado.");
        }
    }

    public void exibirDados() {
        System.out.println("Titular: " + titular);
        System.out.println("Número da conta: " + numeroConta);
        System.out.println("Saldo: R$" + saldo);
    }
}