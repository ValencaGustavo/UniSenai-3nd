package Polimorfismo.Exerc4;

public class Mouse extends Acessorio {
    private String tipoSensor;
    private boolean semFio;

    public Mouse(String nomeLoja, double preco, String marca, String material, String compatibilidade,
                 double peso, String portabilidade, String tipoSensor, boolean semFio) {
        super(nomeLoja, preco, marca, material, compatibilidade, peso, portabilidade);
        this.tipoSensor = tipoSensor;
        this.semFio = semFio;
    }

    @Override
    public String getDescricao() {
        return super.getDescricao() + " | Mouse sensor " + tipoSensor
                + (semFio ? ", sem fio" : ", com fio");
    }
}
