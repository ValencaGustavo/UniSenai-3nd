package Heranca.Exerc2;

import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        Gerente gerente = new Gerente("Heloisa", "XXX-XXX-XXX-XX", 3799, 291);
        Desenvolvedor dev = new Desenvolvedor("Gustavo", "XXX-XXX-XXX-XX", 3500, "JAVA");
        Estagiario estagiario = new Estagiario("João", "XXX-XXX-XXX-XX", 0, 120, 10);

        // Exercício 2 - Tarefa 3: lista heterogênea de funcionários
        List<Funcionario> funcionarios = new ArrayList<>();
        funcionarios.add(gerente);
        funcionarios.add(dev);
        funcionarios.add(estagiario);

        System.out.println("=== Folha de Pagamento (polimorfismo) ===");
        System.out.println();

        for (Funcionario funcionario : funcionarios) {
            // calcularSalario() executa de forma diferente dependendo do tipo real do objeto
            funcionario.calcularSalario();
            funcionario.exibirDados();
            System.out.println();
        }
    }
}
