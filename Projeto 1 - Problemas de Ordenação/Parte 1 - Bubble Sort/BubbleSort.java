import java.util.Scanner;

public class BubbleSort {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Quantidade de elementos: ");
        int n = sc.nextInt();
        int[] v = new int[n];

        for (int i = 0; i < n; i++) {
            System.out.print("Valor " + (i + 1) + ": ");
            v[i] = sc.nextInt();
        }

        System.out.print("Antes: ");
        for (int x : v) System.out.print(x + " ");
        System.out.println();

        int comparacoes = 0, trocas = 0;
        long inicio = System.nanoTime();

        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - 1 - i; j++) {
                comparacoes++;
                if (v[j] > v[j + 1]) {
                    int temp = v[j];
                    v[j] = v[j + 1];
                    v[j + 1] = temp;
                    trocas++;
                }
            }
        }

        long tempo = System.nanoTime() - inicio;

        System.out.print("Depois: ");
        for (int x : v) System.out.print(x + " ");
        System.out.println();

        System.out.println("Tempo: " + tempo + " ns");
        System.out.println("Comparacoes: " + comparacoes);
        System.out.println("Trocas: " + trocas);
    }
}