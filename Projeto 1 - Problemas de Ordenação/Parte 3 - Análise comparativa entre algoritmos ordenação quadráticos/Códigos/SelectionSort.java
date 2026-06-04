public class SelectionSort extends Algoritmo {

    public String getNome() {
        return "Selection Sort";
    }

    public void ordenar(int[] arr) {
        resetar();

        int n = arr.length;

        for (int i = 0; i < n - 1; i++) {
            int idxMin = i;

            for (int j = i + 1; j < n; j++) {
                comparacoes++;

                if (arr[j] < arr[idxMin]) {
                    idxMin = j;
                }
            }

            if (idxMin != i) {
                int tmp = arr[i];
                arr[i] = arr[idxMin];
                arr[idxMin] = tmp;
                trocas++;
            }
        }
    }
}
