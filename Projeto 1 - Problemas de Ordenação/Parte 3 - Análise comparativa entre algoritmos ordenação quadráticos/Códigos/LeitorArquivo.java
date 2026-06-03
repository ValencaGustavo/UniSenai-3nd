import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

public class LeitorArquivo {

    public static int[] ler(String caminho) throws IOException {
        BufferedReader br = new BufferedReader(new FileReader(caminho));
        String linha = br.readLine();
        br.close();

        if (linha == null || linha.trim().isEmpty()) {
            return new int[0];
        }

        String[] partes = linha.split(",");
        ArrayList<Integer> lista = new ArrayList<Integer>();

        for (int i = 0; i < partes.length; i++) {
            lista.add(Integer.parseInt(partes[i].trim()));
        }

        int[] arr = new int[lista.size()];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = lista.get(i);
        }

        return arr;
    }

    public static int extrairNumero(String nome) {
        try {
            return Integer.parseInt(nome.split("_")[0]);
        } catch (Exception e) {
            return 0;
        }
    }
}
