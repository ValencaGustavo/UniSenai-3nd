public class Main {

    public static void main(String[] args) {

        System.out.println("=== 1. Fatorial ===");
        System.out.println("5! = " + Fatorial.calcular(5));   // 120
        System.out.println("0! = " + Fatorial.calcular(0));   // 1

        System.out.println("\n=== 2. Soma de Naturais ===");
        System.out.println("Soma de 1 a 10 = " + SomaNaturais.calcular(10)); // 55

        System.out.println("\n=== 3. Fibonacci ===");
        System.out.print("Primeiros 10 termos: ");
        for (int i = 0; i < 10; i++) {
            System.out.print(Fibonacci.calcular(i) + " ");
        }
        System.out.println();

        System.out.println("\n=== 4. Potência ===");
        System.out.println("2^10 = " + Potencia.calcular(2, 10)); // 1024
        System.out.println("3^4  = " + Potencia.calcular(3, 4));  // 81

        System.out.println("\n=== 5. Contagem Regressiva ===");
        System.out.print("De 5 até 0: ");
        ContagemRegressiva.imprimir(5);
        System.out.println();

        System.out.println("\n=== 6. Palíndromo ===");
        String[] palavras = {"arara", "java", "racecar", "radar"};
        for (String p : palavras) {
            boolean resultado = Palindromo.verificar(p, 0, p.length() - 1);
            System.out.println("\"" + p + "\" é palíndromo? " + resultado);
        }

        System.out.println("\n=== 7. Inversão de String ===");
        System.out.println("Inverso de \"hello\" : " + InversaoString.inverter("hello"));
        System.out.println("Inverso de \"java\"  : " + InversaoString.inverter("java"));

        System.out.println("\n=== 8. Multiplicação por Soma ===");
        System.out.println("2 * 3 = " + MultiplicacaoSoma.calcular(2, 3)); // 6
        System.out.println("5 * 4 = " + MultiplicacaoSoma.calcular(5, 4)); // 20

        System.out.println("\n=== 9. Soma por Intervalo ===");
        System.out.println("Soma de 1 a 4 = " + SomaIntervalo.calcular(1, 4)); // 10
        System.out.println("Soma de 3 a 7 = " + SomaIntervalo.calcular(3, 7)); // 25

        System.out.println("\n=== 10. Ordem Crescente ===");
        System.out.print("0 até 7: ");
        OrdemCrescente.imprimir(7);
        System.out.println();

        System.out.println("\n=== 11. Operações em Vetores ===");
        int[] vetor = {3, 7, 1, 9, 4, 6, 2, 8, 5, 10};
        int ultimo = vetor.length - 1;
        System.out.print("Vetor: ");
        for (int v : vetor) System.out.print(v + " ");
        System.out.println();
        System.out.println("a) Soma    : " + OperacoesVetor.soma(vetor, ultimo));          // 55
        System.out.println("b) Máximo  : " + OperacoesVetor.maximo(vetor, ultimo));        // 10
        System.out.println("c) Mínimo  : " + OperacoesVetor.minimo(vetor, ultimo));        // 1
        System.out.printf ("d) Média   : %.1f%n", OperacoesVetor.media(vetor, ultimo));    // 5.5

        System.out.println("\n=== 12. Matrizes 3x3 ===");


        int[][] simetrica = {
            {1, 2, 3},
            {2, 5, 6},
            {3, 6, 9}
        };
        int[][] naoSimetrica = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        System.out.println("a) Matriz simétrica:");
        MatrizOperacoes.imprimir(simetrica, 3);
        System.out.println("É simétrica? " + MatrizOperacoes.eSimetrica(simetrica, 0, 0, 3));

        System.out.println("\nMatriz não simétrica:");
        MatrizOperacoes.imprimir(naoSimetrica, 3);
        System.out.println("É simétrica? " + MatrizOperacoes.eSimetrica(naoSimetrica, 0, 0, 3));

        int[][] original = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        System.out.println("\nb) Transposta:");
        System.out.println("Antes:");
        MatrizOperacoes.imprimir(original, 3);
        MatrizOperacoes.transpor(original, 0, 1, 3);
        System.out.println("Depois:");
        MatrizOperacoes.imprimir(original, 3);
    }
}
