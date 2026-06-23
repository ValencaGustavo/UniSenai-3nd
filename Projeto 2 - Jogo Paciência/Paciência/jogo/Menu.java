package jogo;

import java.util.Scanner;

public class Menu {

    private final Scanner scanner;
    private JogoPaciencia jogo;

    public Menu() {
        this.scanner = new Scanner(System.in);
    }

    public void iniciar() {
        boolean continuar = true;
        System.out.println("  JOGO DE PACIÊNCIA  ");

        while (continuar) {
            exibirMenuPrincipal();
            int opcao = lerInteiro("Escolha uma opção: ");
            switch (opcao) {
                case 1:
                    jogo = new JogoPaciencia();
                    System.out.println("Baralho embaralhado e novo jogo preparado!");
                    break;
                case 2:
                    if (jogo == null) {
                        jogo = new JogoPaciencia();
                        System.out.println("Nenhum baralho embaralhado ainda — um novo jogo foi criado automaticamente.");
                    }
                    jogarPartida();
                    break;
                case 3:
                    continuar = false;
                    System.out.println("Saindo do jogo. Até a próxima!");
                    break;
                default:
                    System.out.println("Opção inválida. Tente novamente.");
            }
        }
        scanner.close();
    }

    private void exibirMenuPrincipal() {
        System.out.println();
        System.out.println("----- MENU PRINCIPAL -----");
        System.out.println("1. Embaralhar / Novo jogo");
        System.out.println("2. Iniciar Jogo");
        System.out.println("3. Sair");
    }

    private void jogarPartida() {
        boolean emPartida = true;
        while (emPartida) {
            exibirMenuJogo();
            int opcao = lerInteiro("Escolha uma opção: ");
            switch (opcao) {
                case 1:
                    moverFilaParaPilha();
                    break;
                case 2:
                    moverFilaParaFila();
                    break;
                case 3:
                    moverFilaParaColuna();
                    break;
                case 4:
                    moverColunaParaPilha();
                    break;
                case 5:
                    moverColunaParaColuna();
                    break;
                case 6:
                    jogo.reiniciar();
                    System.out.println("Jogo reiniciado.");
                    break;
                case 7:
                    jogo.imprimirEstado();
                    break;
                case 8:
                    emPartida = false;
                    break;
                default:
                    System.out.println("Opção inválida. Tente novamente.");
            }
            if (emPartida && jogo.jogoFoiVencido()) {
                System.out.println();
                System.out.println("Omedetou! Você não fez mais do que sua obrigação!");
                emPartida = false;
            }
        }
    }

    private void exibirMenuJogo() {
        System.out.println();
        System.out.println("----- MENU DO JOGO -----");
        System.out.println("a) 1. Mover carta da fila (descarte) para a pilha (fundação)");
        System.out.println("b) 2. Mover carta do monte para a fila (comprar carta)");
        System.out.println("c) 3. Mover carta da fila (descarte) para uma coluna");
        System.out.println("d) 4. Mover carta de uma coluna para uma fundação");
        System.out.println("e) 5. Mover carta(s) de uma coluna para outra coluna");
        System.out.println("f) 6. Reiniciar o jogo");
        System.out.println("g) 7. Ver estado atual do jogo");
        System.out.println("   8. Voltar ao menu principal");
    }

    private void moverFilaParaPilha() {
        if (jogo.filaParaFundacao()) {
            System.out.println("Carta movida para a fundação com sucesso.");
        } else {
            System.out.println("Movimento inválido: a carta da fila não pode ir para a fundação agora.");
        }
    }

    private void moverFilaParaFila() {
        Carta comprada = jogo.comprarCarta();
        if (comprada != null) {
            System.out.println("Carta comprada do monte: " + comprada);
        } else {
            System.out.println("O monte está vazio. Devolvendo cartas não usadas da fila de descarte ao monte...");
            boolean devolveu = jogo.devolverCartaAoMonte();
            if (!devolveu) {
                System.out.println("Não há cartas para devolver. Monte e fila de descarte estão vazios.");
            }
        }
    }

    private void moverFilaParaColuna() {
        int coluna = lerInteiro("Para qual coluna (1 a " + jogo.getNumColunas() + ")? ") - 1;
        if (jogo.filaParaColuna(coluna)) {
            System.out.println("Carta movida da fila para a coluna " + (coluna + 1) + ".");
        } else {
            System.out.println("Movimento inválido.");
        }
    }

    private void moverColunaParaPilha() {
        int coluna = lerInteiro("De qual coluna (1 a " + jogo.getNumColunas() + ")? ") - 1;
        if (jogo.colunaParaFundacao(coluna)) {
            System.out.println("Carta movida da coluna " + (coluna + 1) + " para a fundação.");
        } else {
            System.out.println("Movimento inválido.");
        }
    }

    private void moverColunaParaColuna() {
        int origem = lerInteiro("Coluna de origem (1 a " + jogo.getNumColunas() + ")? ") - 1;
        if (origem < 0 || origem >= jogo.getNumColunas()) {
            System.out.println("Coluna de origem inválida.");
            return;
        }
        int posicao = lerInteiro("Posição da carta na coluna de origem (1 = base, "
                + jogo.getColuna(origem).tamanho() + " = topo)? ") - 1;
        int destino = lerInteiro("Coluna de destino (1 a " + jogo.getNumColunas() + ")? ") - 1;
        if (jogo.colunaParaColuna(origem, posicao, destino)) {
            System.out.println("Carta(s) movida(s) da coluna " + (origem + 1) + " para a coluna " + (destino + 1) + ".");
        } else {
            System.out.println("Movimento inválido.");
        }
    }

    private int lerInteiro(String mensagem) {
        while (true) {
            System.out.print(mensagem);
            String entrada = scanner.nextLine().trim();
            try {
                return Integer.parseInt(entrada);
            } catch (NumberFormatException e) {
                System.out.println("Por favor, digite um número válido.");
            }
        }
    }
}
