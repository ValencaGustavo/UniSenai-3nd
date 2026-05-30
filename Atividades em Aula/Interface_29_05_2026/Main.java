package Interface_29_05_2026;

public class Main {
    
    public static void main(String[] args) {
        
        Televisao tv = new Televisao();
        Tomada tomada = new RedeEletrica();
        //Tomada tomada = new PainelSolar();
        tv.ligar(tomada);
    }
}

