public class InvalidUsernameException extends Exception {

    public InvalidUsernameException(String nome) {
        super("Nome de usuário inválido: \"" + nome + "\". "
                + "O nome deve ter pelo menos 5 caracteres (informados: " + nome.length() + ").");
    }
}
