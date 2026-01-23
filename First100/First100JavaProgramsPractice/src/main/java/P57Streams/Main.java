package P57Streams;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1,2,3,4,5,6);

        List<Integer> result = numbers.stream()
                .filter(n -> n%2 == 0)
                .map(n -> n*n)
                .collect(Collectors.toList()) ;

        System.out.println("Filtered and squared evens: "+result);
    }
}
