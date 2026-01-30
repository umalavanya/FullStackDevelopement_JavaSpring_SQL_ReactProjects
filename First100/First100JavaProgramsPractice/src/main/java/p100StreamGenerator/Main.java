package p100StreamGenerator;

import java.util.Random;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) {
        Random random = new Random();

        Stream.generate(() -> random.nextInt(50) + 1)
                .limit(5)
                .forEach(System.out::println);
    }
}
