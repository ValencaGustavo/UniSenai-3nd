public class TesteEstoque {

    public static void main(String[] args) {
        Produto produto = new Produto("Mouse sem fio", 20);

        System.out.println("Produto: " + produto.getNome() + " | Estoque inicial: " + produto.getEstoque());

        produto.retirar(7);
        System.out.println("Retirou 7 unidades. Estoque atual: " + produto.getEstoque());

        produto.retirar(8);
        System.out.println("Retirou 8 unidades. Estoque atual: " + produto.getEstoque());

        produto.retirar(10);

        System.out.println("Retirou 10 unidades. Estoque atual: " + produto.getEstoque());
    }
}
