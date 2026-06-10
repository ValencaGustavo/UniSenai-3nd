public class ContagemRegressiva {

    public static void imprimir(int n) {
        if (n < 0) return;
        System.out.print(n + " ");
        imprimir(n - 1);
    }
}
