import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

public class OrdenacaoQuadratica {

    public static void main(String[] args) throws IOException {

        File dir = new File("listas");
        File[] todos = dir.listFiles();

        if (todos == null || todos.length == 0) {
            System.out.println("Nenhum arquivo encontrado em: " + dir.getAbsolutePath());
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
                int na = LeitorArquivo.extrairNumero(arquivos.get(j).getName());
                int nb = LeitorArquivo.extrairNumero(arquivos.get(j + 1).getName());
                if (na > nb) {
                    File tmp = arquivos.get(j);
                    arquivos.set(j, arquivos.get(j + 1));
                    arquivos.set(j + 1, tmp);
                }
            }
        }

        ArrayList<Algoritmo> algoritmos = new ArrayList<Algoritmo>();
        algoritmos.add(new BubbleSort());
        algoritmos.add(new SelectionSort());
        algoritmos.add(new InsertionSort());

        Relatorio.imprimirCabecalho();

        for (int a = 0; a < arquivos.size(); a++) {
            File arquivo = arquivos.get(a);
            int[] dados = LeitorArquivo.ler(arquivo.getPath());

            for (int i = 0; i < algoritmos.size(); i++) {
                Algoritmo alg = algoritmos.get(i);

                int[] copia = new int[dados.length];
                for (int j = 0; j < dados.length; j++) {
                    copia[j] = dados[j];
                }

                long inicio = System.nanoTime();
                alg.ordenar(copia);
                double tempo = (System.nanoTime() - inicio) / 1000000000.0;

                Relatorio.imprimirLinha(arquivo.getName(), alg, tempo);
            }

            Relatorio.imprimirSeparador();
        }
    }
}
