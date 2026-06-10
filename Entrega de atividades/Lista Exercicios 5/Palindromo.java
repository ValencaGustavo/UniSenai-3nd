public class Palindromo {

    public static boolean verificar(String s, int inicio, int fim) {
        if (inicio >= fim) return true;
        if (s.charAt(inicio) != s.charAt(fim)) return false;
        return verificar(s, inicio + 1, fim - 1);
    }
}
