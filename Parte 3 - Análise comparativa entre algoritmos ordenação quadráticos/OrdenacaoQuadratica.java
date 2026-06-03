import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

public class OrdenacaoQuadratica {

    static long comparacoes;
    static long trocas;

    // Bubble sorting
    static void bubbleSort(int[] arr) {
        int n = arr.length;

        for (int i = 0; i < n - 1; i++) {
            boolean houveTroca = false;

            for (int j = 0; j < n - 1 - i; j++) {
                comparacoes++;

                if (arr[j] > arr[j + 1]) {
                    int tmp    = arr[j];
                    arr[j]     = arr[j + 1];
                    arr[j + 1] = tmp;
                    trocas++;
                    houveTroca = true;
                }
            }

            if (!houveTroca) {
                break;
            }
        }
    }

    // Selection sorting
    static void selectionSort(int[] arr) {
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
                int tmp     = arr[i];
                arr[i]      = arr[idxMin];
                arr[idxMin] = tmp;
                trocas++;
            }
        }
    }

    static void insertionSort(int[] arr) {
        int n = arr.length;

        for (int i = 1; i < n; i++) {
            int chave = arr[i];
            int j = i - 1;

            while (j >= 0) {
                comparacoes++;

                if (arr[j] > chave) {
                    arr[j + 1] = arr[j];
                    trocas++;
                    j--;
                } else {
                    break;
                }
            }

            arr[j + 1] = chave;
        }
    }

    static int[] lerArquivo(String caminho) throws IOException {
        ArrayList<Integer> lista = new ArrayList<Integer>();

        BufferedReader br = new BufferedReader(new FileReader(caminho));
        String linha = br.readLine();
        br.close();

        if (linha == null || linha.trim().isEmpty()) {
            return new int[0];
        }

        String[] partes = linha.split(",");
        for (int i = 0; i < partes.length; i++) {
            lista.add(Integer.parseInt(partes[i].trim()));
        }

        int[] arr = new int[lista.size()];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = lista.get(i);
        }

        return arr;
    }

    public static void main(String[] args) throws IOException {

        String pasta = "listas";

        File dir = new File(pasta);
        File[] todos = dir.listFiles();

        if (todos == null || todos.length == 0) {
            System.out.println("Nenhum arquivo encontrado na pasta: " + dir.getAbsolutePath());
            return;
        }

        ArrayList<File> arquivos = new ArrayList<File>();
        for (int i = 0; i < todos.length; i++) {
            if (todos[i].getName().endsWith(".txt")) {
                arquivos.add(todos[i]);
            }
        }

        for (int i = 0; i < arquivos.size() - 1; i++) {
            for (int j = 0; j < arquivos.size() - 1 - i; j++) {
                int na = extrairNumero(arquivos.get(j).getName());
                int nb = extrairNumero(arquivos.get(j + 1).getName());
                if (na > nb) {
                    File tmp = arquivos.get(j);
                    arquivos.set(j, arquivos.get(j + 1));
                    arquivos.set(j + 1, tmp);
                }
            }
        }

        String sep = "+------------------------------+----------------+------------------+------------------+------------------+";
        System.out.println(sep);
        System.out.printf("| %-28s | %-14s | %-16s | %-16s | %-16s |%n",
                "Arquivo", "Algoritmo", "Tempo execucao", "Comparacoes", "Trocas/Movim.");
        System.out.println(sep);

        String[] nomeAlgs = {"Bubble Sort", "Selection Sort", "Insertion Sort"};

        for (int a = 0; a < arquivos.size(); a++) {
            File arquivo = arquivos.get(a);
            int[] dados = lerArquivo(arquivo.getPath());

            for (int alg = 0; alg < 3; alg++) {

                // Copia os dados para nao alterar o original
                int[] copia = new int[dados.length];
                for (int i = 0; i < dados.length; i++) {
                    copia[i] = dados[i];
                }
                
                comparacoes = 0;
                trocas      = 0;

                long inicio = System.nanoTime();

                if (alg == 0) {
                    bubbleSort(copia);
                } else if (alg == 1) {
                    selectionSort(copia);
                } else {
                    insertionSort(copia);
                }

                long tempoNs = System.nanoTime() - inicio;
                double tempoS = tempoNs / 1000000000.0;

                System.out.printf("| %-28s | %-14s | %14.6f s | %16d | %16d |%n",
                        arquivo.getName(),
                        nomeAlgs[alg],
                        tempoS,
                        comparacoes,
                        trocas);
            }

            System.out.println(sep);
        }

        System.out.println("Obs: Insertion Sort - coluna Trocas/Movim. representa movimentacoes de elementos.");
    }

    // Extrai o numero do inicio do nome do arquivo
    static int extrairNumero(String nome) {
        try {
            return Integer.parseInt(nome.split("_")[0]);
        } catch (Exception e) {
            return 0;
        }
    }
}
