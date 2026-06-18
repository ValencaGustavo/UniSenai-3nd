import java.time.LocalDate;
import java.util.ArrayList;

public class Biblioteca {

    private static final int LIMITE_LIVROS_POR_USUARIO = 3;

    private ArrayList<Livro> livros = new ArrayList<>();
    private ArrayList<Usuario> usuarios = new ArrayList<>();
    private ArrayList<Emprestimo> emprestimos = new ArrayList<>();

    public void cadastrarLivro(Livro livro) {
        livros.add(livro);
    }

    public boolean removerLivro(String codigo) {
        return livros.removeIf(l -> l.getCodigo().equals(codigo));
    }

    public Livro buscarLivro(String codigo) {
        for (Livro l : livros) {
            if (l.getCodigo().equals(codigo)) {
                return l;
            }
        }
        return null;
    }

    public ArrayList<Livro> getLivros() {
        return livros;
    }

    public void cadastrarUsuario(Usuario usuario) {
        usuarios.add(usuario);
    }

    public boolean removerUsuario(String codigo) {
        return usuarios.removeIf(u -> u.getCodigo().equals(codigo));
    }

    public Usuario buscarUsuario(String codigo) {
        for (Usuario u : usuarios) {
            if (u.getCodigo().equals(codigo)) {
                return u;
            }
        }
        return null;
    }

    public ArrayList<Usuario> getUsuarios() {
        return usuarios;
    }

    public String realizarEmprestimo(String codigoLivro, String codigoUsuario) {
        Usuario usuario = buscarUsuario(codigoUsuario);
        if (usuario == null) {
            return "Usuário não cadastrado.";
        }

        Livro livro = buscarLivro(codigoLivro);
        if (livro == null) {
            return "Livro não cadastrado.";
        }

        if (!(livro instanceof LivroFisico)) {
            return "Apenas livros físicos podem ser emprestados (e-books e audiobooks já são digitais).";
        }

        if (possuiEmprestimoAtrasado(codigoUsuario)) {
            return "Usuário possui empréstimo em atraso e não pode pegar outro livro até regularizar.";
        }

        if (contarEmprestimosAtivos(codigoUsuario) >= LIMITE_LIVROS_POR_USUARIO) {
            return "Usuário já atingiu o limite de " + LIMITE_LIVROS_POR_USUARIO + " livros emprestados.";
        }

        if (!livro.isDisponivel()) {
            return "Livro não está disponível (já emprestado a outra pessoa).";
        }

        LocalDate hoje = LocalDate.now();
        LocalDate dataPrevista = hoje.plusDays(usuario.getPrazoDevolucaoDias());

        Emprestimo emprestimo = new Emprestimo(codigoLivro, codigoUsuario, hoje, dataPrevista);
        emprestimos.add(emprestimo);
        livro.setDisponivel(false);

        return null; // sucesso
    }

    public String registrarDevolucao(String codigoLivro) {
        Emprestimo emprestimo = buscarEmprestimoAtivoPorLivro(codigoLivro);
        if (emprestimo == null) {
            return null;
        }

        LocalDate hoje = LocalDate.now();
        boolean atrasado = hoje.isAfter(emprestimo.getDataPrevistaDevolucao());
        emprestimo.finalizar(hoje);

        Livro livro = buscarLivro(codigoLivro);
        if (livro != null) {
            livro.setDisponivel(true);
        }

        return atrasado ? "Devolução registrada com ATRASO." : "Devolução registrada dentro do prazo.";
    }

    public Emprestimo buscarEmprestimoAtivoPorLivro(String codigoLivro) {
        for (Emprestimo e : emprestimos) {
            if (e.getCodigoLivro().equals(codigoLivro) && !e.isFinalizado()) {
                return e;
            }
        }
        return null;
    }

    public ArrayList<Emprestimo> listarEmprestimosAtivos() {
        ArrayList<Emprestimo> ativos = new ArrayList<>();
        for (Emprestimo e : emprestimos) {
            if (!e.isFinalizado()) {
                ativos.add(e);
            }
        }
        return ativos;
    }

    public ArrayList<Emprestimo> listarHistoricoPorUsuario(String codigoUsuario) {
        ArrayList<Emprestimo> historico = new ArrayList<>();
        for (Emprestimo e : emprestimos) {
            if (e.getCodigoUsuario().equals(codigoUsuario)) {
                historico.add(e);
            }
        }
        return historico;
    }

    private int contarEmprestimosAtivos(String codigoUsuario) {
        int total = 0;
        for (Emprestimo e : emprestimos) {
            if (e.getCodigoUsuario().equals(codigoUsuario) && !e.isFinalizado()) {
                total++;
            }
        }
        return total;
    }

    private boolean possuiEmprestimoAtrasado(String codigoUsuario) {
        LocalDate hoje = LocalDate.now();
        for (Emprestimo e : emprestimos) {
            if (e.getCodigoUsuario().equals(codigoUsuario) && !e.isFinalizado() && e.estaAtrasado(hoje)) {
                return true;
            }
        }
        return false;
    }
}
