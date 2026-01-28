package p73OptionalOrElseThrow;

import java.util.Optional;

public class Main {
    public static Optional<String> findValue(boolean exists) {
        return exists ? Optional.of("Found!") : Optional.empty();
    }

    public static void main(String[] args) {
        Optional<String> opt = findValue(false);

        try {
            String value = opt.orElseThrow(() -> new ValueNotFoundException("Value not found"));
            System.out.println(value);
        } catch (ValueNotFoundException e) {
            System.out.println("Caught: " + e.getMessage());
        }
    }
}