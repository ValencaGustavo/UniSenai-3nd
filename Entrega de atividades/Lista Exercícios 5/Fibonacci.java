public class Fibonacci {

    public static int calcular(int n) {
        if (n <= 1) return n;
        return calcular(n - 1) + calcular(n - 2);
    }
}
