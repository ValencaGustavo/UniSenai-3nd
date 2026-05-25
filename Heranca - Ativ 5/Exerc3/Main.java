package Heranca.Exerc3;

public class Main {
    public static void main(String[] args) {

        ContaCorrente cc = new ContaCorrente("Daniel", 1000, "001-1", 20);
        ContaPoupanca cp = new ContaPoupanca("Adriano", 2000, "002-2", 0.5);
        ContaSalario cs = new ContaSalario("Gustavo", 0, "003-3", "Google");

        cc.depositar(500);
        cc.sacar(200);
        cc.descontarTaxa();

        System.out.println();

        cp.depositar(1000);
        cp.sacar(500);
        cp.aplicarRendimento();

        System.out.println();

        cs.receberSalario(5000);
        cs.sacar(1000);

        System.out.println();

        cc.exibirDados();
        System.out.println();
        cp.exibirDados();
        System.out.println();
        cs.exibirDados();
    }
}