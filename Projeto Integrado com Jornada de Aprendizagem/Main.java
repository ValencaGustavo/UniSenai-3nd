public class Main {

    public static void main(String[] args) {

        Funcionario f1 = new Funcionario("Adriano", "000.000.000-01", "Analista", 3000.00);
        Gerente g1 = new Gerente("Gustavo", "000.000.000.02", 5000.00, 1500.00);
        Estagiario e1 = new Estagiario ("Daniel", "000.000.000-03", 12.50, 100);

        System.out.println("Sistema de Folha de Pagamento\n");

        Pessoa[] equipe = { f1, g1, e1 };

        for (Pessoa p : equipe) {
            p.exibirInfo();
        }

        System.out.println("\nDetalhes extras");

        System.out.println("Cargo do Adriano: " + f1.getCargo());
        System.out.println("Bônus do Gustavo:  R$ " + g1.getBonus());
        System.out.println("Horas do Daniel:  " + e1.getCargaHorariaMensal() + "h");
        
        System.out.println("\nReajuste salarial do Daniel");
        f1.setSalarioBase(3500.00);
        f1.exibirInfo();
    }
}
