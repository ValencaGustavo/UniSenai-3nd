package Heranca.Exerc1;

public class Main {
    
    public static void main(String[] args) {
        
        Carro carro = new Carro("Volkswagen", "Fusca", 1983, 2);
        Moto moto = new Moto("Kawasaki", "Ninja", 2021, true);
        Caminhao caminhao = new Caminhao("Mercedes Benz", "Algum aí", 2011, 5);

        // TESTE: carro.setMarca("Fiat");

        carro.acelerar(50);
        moto.acelerar(30);
        caminhao.acelerar(40);

        carro.frear(51);
        moto.frear(29);
        caminhao.frear(40);


        carro.exibirDados();
        System.out.println("");
        moto.exibirDados();
        System.out.println("");
        caminhao.exibirDados();
        System.out.println("");
    }
}
