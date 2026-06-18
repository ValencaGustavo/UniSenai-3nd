package Exerc4;

import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {

        Monitor monitor = new Monitor("Loja TechMix", 1200.00, "LG", 35, "Bivolt",
                "12 meses", "HDMI", 27, "4K", 144);

        Notebook notebook = new Notebook("Loja TechMix", 4500.00, "Dell", 65, "Bivolt",
                "24 meses", "Wi-Fi", "Intel i7", 16, "SSD 512GB");

        Teclado teclado = new Teclado("Loja TechMix", 250.00, "Logitech", "Plástico", "PC/Mac",
                900, "Compacto", "ABNT2", true, true);

        Mouse mouse = new Mouse("Loja TechMix", 150.00, "Razer", "Plástico", "PC/Console",
                90, "Compacto", "Óptico", true);

        List<Produto> carrinho = new ArrayList<>();
        carrinho.add(monitor);
        carrinho.add(notebook);
        carrinho.add(teclado);
        carrinho.add(mouse);

        double precoTotal = 0;

        System.out.println("=== Carrinho de Compras ===");
        System.out.println();

        for (Produto produto : carrinho) {
            System.out.println(produto.getDescricao());
            precoTotal += produto.getPreco();
            System.out.println();
        }

        System.out.println("Preço total da compra: R$" + precoTotal);
    }
}
