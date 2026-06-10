public class Potencia {

    public static int calcular(int x, int y) {
        if (y == 0) return 1;
        return x * calcular(x, y - 1);
    }
}
