public class InsertionSort extends Algoritmo {

    public String getNome() {
        return "Insertion Sort";
    }

    public void ordenar(int[] arr) {
        resetar();

        int n = arr.length;

        for (int i = 1; i < n; i++) {
            int chave = arr[i];
            int j = i - 1;

            while (j >= 0 && arr[j] > chave) {
                comparacoes++;
                arr[j + 1] = arr[j];
                trocas++;
                j--;
            }

            if (j >= 0) {
                comparacoes++;
            }

            arr[j + 1] = chave;
        }
    }
}
