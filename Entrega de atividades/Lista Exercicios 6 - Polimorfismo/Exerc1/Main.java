package Exerc1;

import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        Carro carro = new Carro("Volkswagen", "Fusca", 1983, 2);
        Moto moto = new Moto("Kawasaki", "Ninja", 2021, true);
        Caminhao caminhao = new Caminhao("Mercedes Benz", "Algum aí", 2011, 5);

        carro.acelerar(50);
        moto.acelerar(30);
        caminhao.acelerar(40);

        carro.frear(51);
        moto.frear(29);
        caminhao.frear(40);

        List<Veiculo> veiculos = new ArrayList<>();
        veiculos.add(carro);
        veiculos.add(moto);
        veiculos.add(caminhao);

        System.out.println("=== Frota de Veículos (polimorfismo) ===");
        System.out.println();

        for (Veiculo veiculo : veiculos) {
            System.out.println("Tipo de veículo: " + veiculo.tipoDeVeiculo());
            veiculo.exibirDados();
            System.out.println();
        }
    }
}
