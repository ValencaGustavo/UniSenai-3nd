public class MultiplicacaoSoma {

    public static int calcular(int a, int b) {
        if (b == 0) return 0;
        return a + calcular(a, b - 1);
    }
}
