package Heranca.Exerc1;

public class Caminhao extends Veiculo{
    private double capacidadeCarga;

    public Caminhao(String marca, String modelo, int ano, double capacidadeCarga) {
        super(marca, modelo, ano);
        this.capacidadeCarga = capacidadeCarga;
    }

    @Override
    public void exibirDados() {
        super.exibirDados();
        System.out.println("Capacidade de Carga: " + capacidadeCarga + " toneladas");
    }
}
