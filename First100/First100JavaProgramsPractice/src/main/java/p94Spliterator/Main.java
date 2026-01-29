package p94Spliterator;

import java.util.Arrays;
import java.util.List;
import java.util.Spliterator;

public class Main {
    public static void main(String[] args) {
        List<String> words = Arrays.asList("apple", "banana", "cherry", "date", "elderberry");

        Spliterator<String> spliterator = words.spliterator();
        Spliterator<String> half = spliterator.trySplit();

        System.out.println("First half:");
        spliterator.forEachRemaining(System.out::println);

        System.out.println("\nSecond half:");
        half.forEachRemaining(System.out::println);
    }
}
