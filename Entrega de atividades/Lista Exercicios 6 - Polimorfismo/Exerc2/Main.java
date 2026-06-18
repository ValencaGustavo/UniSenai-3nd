package Exerc2;

import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        Gerente gerente = new Gerente("Heloisa", "XXX-XXX-XXX-XX", 3799, 291);
        Desenvolvedor dev = new Desenvolvedor("Gustavo", "XXX-XXX-XXX-XX", 3500, "JAVA");
        Estagiario estagiario = new Estagiario("João", "XXX-XXX-XXX-XX", 0, 120, 10);

        List<Funcionario> funcionarios = new ArrayList<>();
        funcionarios.add(gerente);
        funcionarios.add(dev);
        funcionarios.add(estagiario);

        System.out.println("=== Folha de Pagamento (polimorfismo) ===");
        System.out.println();

        for (Funcionario funcionario : funcionarios) {
            funcionario.calcularSalario();
            funcionario.exibirDados();
            System.out.println();
        }
    }
}
