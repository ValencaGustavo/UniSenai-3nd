public class SomaIntervalo {

    public static int calcular(int n, int m) {
        if (n == m) return m;
        return n + calcular(n + 1, m);
    }
}
