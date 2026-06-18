public class OutOfStockException extends RuntimeException {

    public OutOfStockException(String nomeProduto, int estoqueDisponivel, int quantidadeSolicitada) {
        super("Estoque insuficiente para o produto \"" + nomeProduto + "\". "
                + "Disponível: " + estoqueDisponivel + " unidade(s). "
                + "Solicitado: " + quantidadeSolicitada + " unidade(s).");
    }
}
