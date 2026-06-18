public class WeakPasswordException extends Exception {

    public WeakPasswordException(String mensagem) {
        super(mensagem);
    }

    public static WeakPasswordException tamanhoInsuficiente(int tamanhoMinimo, int tamanhoInformado) {
        return new WeakPasswordException("Senha muito curta. Tamanho mínimo: " + tamanhoMinimo
                + " caracteres (informados: " + tamanhoInformado + ").");
    }

    public static WeakPasswordException semDigito() {
        return new WeakPasswordException("Senha fraca: é necessário incluir ao menos um dígito.");
    }
}
