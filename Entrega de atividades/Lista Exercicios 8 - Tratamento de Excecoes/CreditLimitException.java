public class CreditLimitException extends Exception {

    public CreditLimitException(int limiteMaximo, int totalSolicitado) {
        super("Limite de créditos excedido! Máximo permitido: " + limiteMaximo
                + " créditos. Total solicitado (após a matrícula): " + totalSolicitado + " créditos.");
    }
}
