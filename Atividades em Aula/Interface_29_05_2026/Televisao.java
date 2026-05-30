package Interface_29_05_2026;

public class Televisao {
    public Tomada tomada;

    public void ligar(Tomada t) {
        this.tomada = t;
        t.fornecerEnergia();
        System.out.println("Televisão funcionando");
    }
}
