package Heranca.Exerc1;

public class Carro extends Veiculo {
    private int numeroPortas;

    public Carro(String marca, String modelo, int ano, int numeroPortas) {
        super(marca, modelo, ano);
        this.numeroPortas = numeroPortas;
    }

    @Override
    public void exibirDados() {
        super.exibirDados();
        System.out.println("Número de portas: " + numeroPortas);
    }
}
