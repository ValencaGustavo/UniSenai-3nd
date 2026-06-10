public class OperacoesVetor {

    public static int soma(int[] v, int n) {
        if (n == 0) return v[0];
        return v[n] + soma(v, n - 1);
    }

    public static int maximo(int[] v, int n) {
        if (n == 0) return v[0];
        int maxAnterior = maximo(v, n - 1);
        return v[n] > maxAnterior ? v[n] : maxAnterior;
    }

    public static int minimo(int[] v, int n) {
        if (n == 0) return v[0];
        int minAnterior = minimo(v, n - 1);
        return v[n] < minAnterior ? v[n] : minAnterior;
    }

    public static double media(int[] v, int n) {
        return (double) soma(v, n) / (n + 1);
    }
}
