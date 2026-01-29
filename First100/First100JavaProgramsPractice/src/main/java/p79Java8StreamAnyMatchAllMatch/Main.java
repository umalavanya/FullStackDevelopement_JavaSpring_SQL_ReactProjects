package p79Java8StreamAnyMatchAllMatch;

import java.util.Arrays;
import java.util.List;

public class Main {

    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1,5,8,-2,10) ;

        boolean anyNegative = numbers.stream().anyMatch(n -> n < 0);
        boolean allPositive = numbers.stream().allMatch(n -> n > 0);

        System.out.println("Any negative? " + anyNegative);
        System.out.println("All positive? " + allPositive);
    }
}
