public class TesteMatricula {

    public static void main(String[] args) {
        Estudante estudante = new Estudante("João");

        int[] creditosDasTurmas = {10, 15, 8, 5};

        for (int creditos : creditosDasTurmas) {
            try {
                estudante.matricular(creditos);
                System.out.println("Matrícula em turma de " + creditos + " créditos realizada com sucesso. "
                        + "Total atual: " + estudante.getCreditosMatriculados() + " créditos.");
            } catch (CreditLimitException e) {
                System.out.println("Não foi possível matricular em turma de " + creditos + " créditos. "
                        + "Motivo: " + e.getMessage());
            }
        }

        System.out.println("\nTotal final de créditos de " + estudante.getNome() + ": "
                + estudante.getCreditosMatriculados());
    }
}
