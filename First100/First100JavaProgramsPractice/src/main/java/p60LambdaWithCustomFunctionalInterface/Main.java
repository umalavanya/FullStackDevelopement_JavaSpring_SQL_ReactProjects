package p60LambdaWithCustomFunctionalInterface;

public class Main {
    public static void main(String[] args) {
        StringProcessor reverser = (str) -> new StringBuilder(str).reverse().toString();
        String original = "Intellipaat";
        System.out.println("Original: " + original);
        System.out.println("Reversed: " + reverser.process(original));
    }
}
