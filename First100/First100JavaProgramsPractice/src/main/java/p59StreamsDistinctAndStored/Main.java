package p59StreamsDistinctAndStored;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers  = Arrays.asList(5,3,7,3,8,5,1) ;
        List<Integer> result = numbers.stream()
                .distinct()
                .sorted()
                .collect(Collectors.toList()) ;
        System.out.println("Distinct and sorted: "+result);
    }
}
