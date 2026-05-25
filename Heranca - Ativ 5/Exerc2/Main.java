package Heranca.Exerc2;

public class Main {
    
    public static void main(String[] args) {
        
        Gerente gerente = new Gerente("Heloisa", "XXX-XXX-XXX-XX", 3799, 291);
        Desenvolvedor dev = new Desenvolvedor("Gustavo", "XXX-XXX-XXX-XX", 3500, "JAVA");
        Estagiario estagiario = new Estagiario("João", "XXX-XXX-XXX-XX", 0, 120, 10);

        gerente.calcularSalario();
        dev.calcularSalario();
        estagiario.calcularSalario();

        gerente.exibirDados();
        System.out.println();
        dev.exibirDados();
        System.out.println();
        estagiario.exibirDados();
    }
}
