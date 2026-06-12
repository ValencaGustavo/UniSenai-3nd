public abstract class Pessoa {

    private String nome;
    private String cpf;

    public Pessoa(String nome, String cpf) {
        this.nome = nome;
        this.cpf  = cpf;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public abstract double calcularSalario();

    public void exibirInfo() {
        System.out.printf("Nome: %-15s | CPF: %s | Salário: R$ %.2f%n", nome, cpf, calcularSalario());
    }
}
