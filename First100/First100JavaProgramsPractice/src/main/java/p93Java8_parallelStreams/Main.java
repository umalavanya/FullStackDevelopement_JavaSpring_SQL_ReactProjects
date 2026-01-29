package p93Java8_parallelStreams;

import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>();
        for (int i = 1; i <= 1_000_000; i++) {
            numbers.add(i);
        }

        long startTime = System.currentTimeMillis();
        long sum = numbers.parallelStream().mapToLong(Integer::longValue).sum();
        long endTime = System.currentTimeMillis();

        System.out.println("Sum: " + sum);
        System.out.println("Time taken (parallel): " + (endTime - startTime) + " ms");
    }
}
