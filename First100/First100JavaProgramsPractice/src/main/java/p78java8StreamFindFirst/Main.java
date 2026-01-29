package p78java8StreamFindFirst;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(5, 12, 8, 15, 3);

        Optional<Integer> first = numbers.stream()
                .filter(n -> n > 10)
                .findFirst();

        if (first.isPresent()) {
            System.out.println("First number > 10: " + first.get());
        } else {
            System.out.println("No number > 10 found");
        }
    }
}