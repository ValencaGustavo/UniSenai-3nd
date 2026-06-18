public class ValidadorCadastro {

    private static final int TAMANHO_MINIMO_NOME = 5;
    private static final int TAMANHO_MINIMO_SENHA = 8;

    public void validar(String nome, String senha) throws InvalidUsernameException, WeakPasswordException {
        if (nome == null || nome.length() < TAMANHO_MINIMO_NOME) {
            throw new InvalidUsernameException(nome == null ? "" : nome);
        }

        if (senha == null || senha.length() < TAMANHO_MINIMO_SENHA) {
            throw WeakPasswordException.tamanhoInsuficiente(TAMANHO_MINIMO_SENHA,
                    senha == null ? 0 : senha.length());
        }

        if (!contemDigito(senha)) {
            throw WeakPasswordException.semDigito();
        }
    }

    private boolean contemDigito(String senha) {
        for (char c : senha.toCharArray()) {
            if (Character.isDigit(c)) {
                return true;
            }
        }
        return false;
    }
}
