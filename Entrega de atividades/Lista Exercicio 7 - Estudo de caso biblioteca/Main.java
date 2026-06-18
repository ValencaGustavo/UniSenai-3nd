import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Scanner;

public class Main {

    private static Scanner scanner = new Scanner(System.in);
    private static Biblioteca biblioteca = new Biblioteca();
    private static DateTimeFormatter formatoData = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public static void main(String[] args) {
        int opcao;
        do {
            exibirMenuPrincipal();
            opcao = lerInteiro("Escolha uma opção: ");

            switch (opcao) {
                case 1 -> menuLivros();
                case 2 -> menuUsuarios();
                case 3 -> menuEmprestimos();
                case 0 -> System.out.println("Encerrando o sistema. Até mais!");
                default -> System.out.println("Opção inválida.");
            }
        } while (opcao != 0);

        scanner.close();
    }

    // ========================= MENU PRINCIPAL =========================

    private static void exibirMenuPrincipal() {
        System.out.println("\n===== BIBLIOTECA MUNICIPAL =====");
        System.out.println("1. Gerenciar Livros (Exercício 1)");
        System.out.println("2. Gerenciar Usuários (Exercício 2)");
        System.out.println("3. Gerenciar Empréstimos (Exercício 3)");
        System.out.println("0. Sair");
    }

    // ========================= EXERCÍCIO 1: LIVROS =========================

    private static void menuLivros() {
        int opcao;
        do {
            System.out.println("\n--- Gerenciar Livros ---");
            System.out.println("1. Cadastrar livro");
            System.out.println("2. Remover livro");
            System.out.println("3. Listar livros");
            System.out.println("0. Voltar");
            opcao = lerInteiro("Escolha uma opção: ");

            switch (opcao) {
                case 1 -> cadastrarLivro();
                case 2 -> removerLivro();
                case 3 -> listarLivros();
                case 0 -> System.out.println("Voltando...");
                default -> System.out.println("Opção inválida.");
            }
        } while (opcao != 0);
    }

    private static void cadastrarLivro() {
        System.out.println("\nTipo de livro:");
        System.out.println("1. Físico");
        System.out.println("2. E-book");
        System.out.println("3. Audiobook");
        int tipo = lerInteiro("Escolha o tipo: ");

        String codigo = lerTexto("Código único: ");
        if (biblioteca.buscarLivro(codigo) != null) {
            System.out.println("Já existe um livro com este código.");
            return;
        }

        String titulo = lerTexto("Título: ");
        String autor = lerTexto("Autor: ");

        switch (tipo) {
            case 1 -> {
                int paginas = lerInteiro("Número de páginas: ");
                int estante = lerInteiro("Número da estante: ");
                biblioteca.cadastrarLivro(new LivroFisico(codigo, titulo, autor, paginas, estante));
                System.out.println("Livro físico cadastrado com sucesso!");
            }
            case 2 -> {
                int paginas = lerInteiro("Número de páginas: ");
                String link = lerTexto("Link de download: ");
                biblioteca.cadastrarLivro(new Ebook(codigo, titulo, autor, paginas, link));
                System.out.println("E-book cadastrado com sucesso!");
            }
            case 3 -> {
                int duracao = lerInteiro("Duração total (em minutos): ");
                String narrador = lerTexto("Nome do narrador: ");
                biblioteca.cadastrarLivro(new Audiobook(codigo, titulo, autor, duracao, narrador));
                System.out.println("Audiobook cadastrado com sucesso!");
            }
            default -> System.out.println("Tipo inválido. Cadastro cancelado.");
        }
    }

    private static void removerLivro() {
        String codigo = lerTexto("Código do livro a remover: ");
        boolean removido = biblioteca.removerLivro(codigo);
        System.out.println(removido ? "Livro removido com sucesso." : "Nenhum livro encontrado com este código.");
    }

    private static void listarLivros() {
        ArrayList<Livro> livros = biblioteca.getLivros();
        if (livros.isEmpty()) {
            System.out.println("Nenhum livro cadastrado.");
            return;
        }
        System.out.println("\n--- Livros Cadastrados ---");
        for (Livro l : livros) {
            System.out.println(l.exibirDetalhes());
        }
    }

    // ========================= EXERCÍCIO 2: USUÁRIOS =========================

    private static void menuUsuarios() {
        int opcao;
        do {
            System.out.println("\n--- Gerenciar Usuários ---");
            System.out.println("1. Cadastrar usuário");
            System.out.println("2. Remover usuário");
            System.out.println("3. Listar usuários");
            System.out.println("0. Voltar");
            opcao = lerInteiro("Escolha uma opção: ");

            switch (opcao) {
                case 1 -> cadastrarUsuario();
                case 2 -> removerUsuario();
                case 3 -> listarUsuarios();
                case 0 -> System.out.println("Voltando...");
                default -> System.out.println("Opção inválida.");
            }
        } while (opcao != 0);
    }

    private static void cadastrarUsuario() {
        System.out.println("\nTipo de usuário:");
        System.out.println("1. Aluno");
        System.out.println("2. Professor");
        int tipo = lerInteiro("Escolha o tipo: ");

        String codigo = lerTexto("Código único: ");
        if (biblioteca.buscarUsuario(codigo) != null) {
            System.out.println("Já existe um usuário com este código.");
            return;
        }

        String nome = lerTexto("Nome completo: ");

        switch (tipo) {
            case 1 -> {
                int idade = lerInteiro("Idade: ");
                String curso = lerTexto("Curso matriculado: ");
                String matricula = lerTexto("Número da matrícula: ");
                biblioteca.cadastrarUsuario(new Aluno(codigo, nome, idade, curso, matricula));
                System.out.println("Aluno cadastrado com sucesso!");
            }
            case 2 -> {
                String area = lerTexto("Área de atuação: ");
                String departamento = lerTexto("Departamento: ");
                String email = lerTexto("E-mail institucional: ");
                biblioteca.cadastrarUsuario(new Professor(codigo, nome, area, departamento, email));
                System.out.println("Professor cadastrado com sucesso!");
            }
            default -> System.out.println("Tipo inválido. Cadastro cancelado.");
        }
    }

    private static void removerUsuario() {
        String codigo = lerTexto("Código do usuário a remover: ");
        boolean removido = biblioteca.removerUsuario(codigo);
        System.out.println(removido ? "Usuário removido com sucesso." : "Nenhum usuário encontrado com este código.");
    }

    private static void listarUsuarios() {
        ArrayList<Usuario> usuarios = biblioteca.getUsuarios();
        if (usuarios.isEmpty()) {
            System.out.println("Nenhum usuário cadastrado.");
            return;
        }

        System.out.println("\n--- Alunos ---");
        boolean temAluno = false;
        for (Usuario u : usuarios) {
            if (u instanceof Aluno) {
                System.out.println(u.exibirDetalhes());
                temAluno = true;
            }
        }
        if (!temAluno) System.out.println("Nenhum aluno cadastrado.");

        System.out.println("\n--- Professores ---");
        boolean temProfessor = false;
        for (Usuario u : usuarios) {
            if (u instanceof Professor) {
                System.out.println(u.exibirDetalhes());
                temProfessor = true;
            }
        }
        if (!temProfessor) System.out.println("Nenhum professor cadastrado.");
    }

    // ========================= EXERCÍCIO 3: EMPRÉSTIMOS =========================

    private static void menuEmprestimos() {
        int opcao;
        do {
            System.out.println("\n--- Gerenciar Empréstimos ---");
            System.out.println("1. Realizar empréstimo");
            System.out.println("2. Registrar devolução");
            System.out.println("3. Listar empréstimos ativos");
            System.out.println("4. Consultar histórico de um usuário");
            System.out.println("0. Voltar");
            opcao = lerInteiro("Escolha uma opção: ");

            switch (opcao) {
                case 1 -> realizarEmprestimo();
                case 2 -> registrarDevolucao();
                case 3 -> listarEmprestimosAtivos();
                case 4 -> consultarHistorico();
                case 0 -> System.out.println("Voltando...");
                default -> System.out.println("Opção inválida.");
            }
        } while (opcao != 0);
    }

    private static void realizarEmprestimo() {
        String codigoLivro = lerTexto("Código do livro: ");
        String codigoUsuario = lerTexto("Código do usuário: ");

        String erro = biblioteca.realizarEmprestimo(codigoLivro, codigoUsuario);
        if (erro == null) {
            System.out.println("Empréstimo realizado com sucesso!");
        } else {
            System.out.println("Não foi possível realizar o empréstimo: " + erro);
        }
    }

    private static void registrarDevolucao() {
        String codigoLivro = lerTexto("Código do livro a devolver: ");
        String resultado = biblioteca.registrarDevolucao(codigoLivro);
        if (resultado == null) {
            System.out.println("Nenhum empréstimo ativo encontrado para este livro.");
        } else {
            System.out.println(resultado);
        }
    }

    private static void listarEmprestimosAtivos() {
        ArrayList<Emprestimo> ativos = biblioteca.listarEmprestimosAtivos();
        if (ativos.isEmpty()) {
            System.out.println("Nenhum empréstimo ativo.");
            return;
        }

        System.out.println("\n--- Empréstimos Ativos ---");
        LocalDate hoje = LocalDate.now();
        for (Emprestimo e : ativos) {
            Livro livro = biblioteca.buscarLivro(e.getCodigoLivro());
            Usuario usuario = biblioteca.buscarUsuario(e.getCodigoUsuario());
            String tituloLivro = livro != null ? livro.getTitulo() : "(livro não encontrado)";
            String nomeUsuario = usuario != null ? usuario.getNomeCompleto() : "(usuário não encontrado)";
            String status = e.estaAtrasado(hoje) ? "EM ATRASO" : "Dentro do prazo";

            System.out.println("Código livro: " + e.getCodigoLivro() +
                    " | Título: " + tituloLivro +
                    " | Usuário: " + nomeUsuario +
                    " | Empréstimo: " + e.getDataEmprestimo().format(formatoData) +
                    " | Devolução prevista: " + e.getDataPrevistaDevolucao().format(formatoData) +
                    " | Status: " + status);
        }
    }

    private static void consultarHistorico() {
        String codigoUsuario = lerTexto("Código do usuário: ");
        Usuario usuario = biblioteca.buscarUsuario(codigoUsuario);
        if (usuario == null) {
            System.out.println("Usuário não encontrado.");
            return;
        }

        ArrayList<Emprestimo> historico = biblioteca.listarHistoricoPorUsuario(codigoUsuario);
        if (historico.isEmpty()) {
            System.out.println("Este usuário ainda não pegou nenhum livro emprestado.");
            return;
        }

        System.out.println("\n--- Histórico de " + usuario.getNomeCompleto() + " ---");
        LocalDate hoje = LocalDate.now();
        for (Emprestimo e : historico) {
            Livro livro = biblioteca.buscarLivro(e.getCodigoLivro());
            String tituloLivro = livro != null ? livro.getTitulo() : "(livro não encontrado)";
            String situacao;
            if (e.isFinalizado()) {
                situacao = e.estaAtrasado(hoje) ? "Devolvido com atraso" : "Devolvido no prazo";
            } else {
                situacao = e.estaAtrasado(hoje) ? "Em aberto - EM ATRASO" : "Em aberto - dentro do prazo";
            }
            System.out.println("Livro: " + tituloLivro +
                    " | Empréstimo: " + e.getDataEmprestimo().format(formatoData) +
                    " | Situação: " + situacao);
        }
    }

    // ========================= UTILITÁRIOS DE LEITURA =========================

    private static int lerInteiro(String mensagem) {
        System.out.print(mensagem);
        while (!scanner.hasNextInt()) {
            scanner.next();
            System.out.print("Digite um número válido: ");
        }
        int valor = scanner.nextInt();
        scanner.nextLine();
        return valor;
    }

    private static String lerTexto(String mensagem) {
        System.out.print(mensagem);
        return scanner.nextLine();
    }
}
