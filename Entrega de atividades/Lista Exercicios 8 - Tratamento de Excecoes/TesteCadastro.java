public class TesteCadastro {

    public static void main(String[] args) {
        ValidadorCadastro validador = new ValidadorCadastro();

        String[][] cadastros = {
                {"Ana", "senha1234"},    
                {"Marcos", "1234567"},   
                {"Roberta", "abcdefgh"},    
                {"Carlos", "abc12345"}       
        };

        for (String[] cadastro : cadastros) {
            String nome = cadastro[0];
            String senha = cadastro[1];

            try {
                validador.validar(nome, senha);
                System.out.println("Cadastro de \"" + nome + "\" realizado com sucesso!");
            } catch (InvalidUsernameException | WeakPasswordException e) {
                System.out.println("Falha no cadastro de \"" + nome + "\": " + e.getMessage());
            }
        }
    }
}
