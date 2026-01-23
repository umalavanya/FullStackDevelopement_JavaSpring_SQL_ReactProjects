package p58StreamsSumAndAverage;

import java.util.Arrays;
import java.util.List;
import java.util.OptionalDouble;

public class Main {

    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(10,20,30,40,50) ;
        int sum = numbers.stream()
                .mapToInt(Integer::intValue)
                .sum() ;
        OptionalDouble average = numbers.stream()
                .mapToInt(Integer::intValue)
                .average() ;
        System.out.println("Sum: " + sum);
        System.out.println("Average: " + (average.isPresent() ? average.getAsDouble() : "N/A"));
    }
}
