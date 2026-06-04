public class BubbleSort extends Algoritmo {

    public String getNome() {
        return "Bubble Sort";
    }

    public void ordenar(int[] arr) {
        resetar();

        int n = arr.length;

        for (int i = 0; i < n - 1; i++) {
            boolean trocou = false;

            for (int j = 0; j < n - 1 - i; j++) {
                comparacoes++;

                if (arr[j] > arr[j + 1]) {
                    int tmp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = tmp;
                    trocas++;
                    trocou = true;
                }
            }

            if (!trocou) {
                break;
            }
        }
    }
}
