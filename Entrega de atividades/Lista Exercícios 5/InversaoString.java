public class InversaoString {

    public static String inverter(String s) {
        if (s.length() <= 1) return s;
        return inverter(s.substring(1)) + s.charAt(0);
    }
}
