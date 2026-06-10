public class SomaNaturais {

    public static int calcular(int n) {
        if (n == 0) return 0;
        return n + calcular(n - 1);
    }
}
