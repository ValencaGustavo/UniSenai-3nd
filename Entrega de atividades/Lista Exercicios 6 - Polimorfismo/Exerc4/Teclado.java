package Exerc4;

public class Teclado extends Acessorio {
    private String layout;
    private boolean mecanico;
    private boolean iluminacaoRGB;

    public Teclado(String nomeLoja, double preco, String marca, String material, String compatibilidade,
                    double peso, String portabilidade, String layout, boolean mecanico,
                    boolean iluminacaoRGB) {
        super(nomeLoja, preco, marca, material, compatibilidade, peso, portabilidade);
        this.layout = layout;
        this.mecanico = mecanico;
        this.iluminacaoRGB = iluminacaoRGB;
    }

    @Override
    public String getDescricao() {
        return super.getDescricao() + " | Teclado " + layout
                + (mecanico ? ", mecânico" : ", membrana")
                + (iluminacaoRGB ? ", com iluminação RGB" : ", sem iluminação RGB");
    }
}
