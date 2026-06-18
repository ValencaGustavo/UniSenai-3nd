package Heranca.Exerc3;

import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {

        ContaCorrente cc = new ContaCorrente("Daniel", 1000, "001-1", 20);
        ContaPoupanca cp = new ContaPoupanca("Adriano", 2000, "002-2", 0.5);
        ContaSalario cs = new ContaSalario("Gustavo", 0, "003-3", "Google");

        // Exercício 3 - Tarefa 4: lista polimórfica de contas
        List<ContaBancaria> contas = new ArrayList<>();
        contas.add(cc);
        contas.add(cp);
        contas.add(cs);

        System.out.println("=== Movimentação das Contas (polimorfismo) ===");
        System.out.println();

        for (ContaBancaria conta : contas) {
            System.out.println("Tipo de conta: " + conta.tipoDeConta());
            conta.depositar(1000);
            conta.exibirDados();

            // Comportamentos específicos de cada subtipo de conta
            if (conta instanceof ContaPoupanca) {
                ((ContaPoupanca) conta).aplicarRendimento();
            } else if (conta instanceof ContaCorrente) {
                ((ContaCorrente) conta).descontarTaxa();
            }

            System.out.println();
        }
    }
}
