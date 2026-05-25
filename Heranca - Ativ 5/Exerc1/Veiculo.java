package Heranca.Exerc1;

public class Veiculo {
    private String marca;
    private String modelo;
    private int ano;
    private int velocidadeAtual;
    
    public Veiculo(String marca, String modelo, int ano) {
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
    }

    public void acelerar(int velocidade) {
        velocidadeAtual+=velocidade;
    }

    public void frear(int velocidade) {
        if (velocidadeAtual - velocidade < 0) {
            velocidadeAtual = 0;
        } else {
            velocidadeAtual -= velocidade;
        }
    }

    
    public void exibirDados() {
        System.out.println("Marca: " + marca);
        System.out.println("Modelo: " + modelo);
        System.out.println("Ano modelo: " + ano);
        System.out.println("Velocidade atual: " + velocidadeAtual);
    }
    
    public String getMarca() {
        return this.marca;
    }

    public String getModelo() {
        return this.modelo;
    }

    public int getAno() {
        return this.ano;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }
}

