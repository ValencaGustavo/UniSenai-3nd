public class MatrizOperacoes {

    public static boolean eSimetrica(int[][] m, int i, int j, int n) {
        if (i >= n) return true;
        if (j >= n) return eSimetrica(m, i + 1, 0, n);
        if (m[i][j] != m[j][i]) return false;
        return eSimetrica(m, i, j + 1, n);
    }

    public static void transpor(int[][] m, int i, int j, int n) {
        if (i >= n - 1) return;
        if (j >= n) {
            transpor(m, i + 1, i + 2, n);
            return;
        }
        int temp = m[i][j];
        m[i][j] = m[j][i];
        m[j][i] = temp;
        transpor(m, i, j + 1, n);
    }

    public static void imprimir(int[][] m, int n) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                System.out.printf("%4d", m[i][j]);
            }
            System.out.println();
        }
    }
}
