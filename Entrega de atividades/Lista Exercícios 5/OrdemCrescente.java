public class OrdemCrescente {

    public static void imprimir(int n) {
        if (n < 0) return;
        imprimir(n - 1);
        System.out.print(n + " ");
    }
}
