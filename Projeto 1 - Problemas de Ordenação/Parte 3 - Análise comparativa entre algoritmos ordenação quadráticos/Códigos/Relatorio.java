public class Relatorio {

    public static void imprimirCabecalho() {
        System.out.println("+------------------------------+----------------+------------------+------------------+------------------+");
        System.out.printf("| %-28s | %-14s | %-16s | %-16s | %-16s |%n",
                "Arquivo", "Algoritmo", "Tempo execucao", "Comparacoes", "Trocas/Movim.");
        System.out.println("+------------------------------+----------------+------------------+------------------+------------------+");
    }

    public static void imprimirLinha(String nomeArquivo, Algoritmo alg, double tempo) {
        System.out.printf("| %-28s | %-14s | %14.6f s | %16d | %16d |%n",
                nomeArquivo,
                alg.getNome(),
                tempo,
                alg.getComparacoes(),
                alg.getTrocas());
    }

    public static void imprimirSeparador() {
        System.out.println("+------------------------------+----------------+------------------+------------------+------------------+");
    }
}
