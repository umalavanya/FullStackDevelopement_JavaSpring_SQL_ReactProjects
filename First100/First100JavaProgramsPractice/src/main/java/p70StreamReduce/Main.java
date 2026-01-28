package p70StreamReduce;

import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(2,3,4) ;

        int product = numbers.stream().reduce(1, (a,b) -> a*b) ;

        System.out.println("Product: "+product);
    }
}
