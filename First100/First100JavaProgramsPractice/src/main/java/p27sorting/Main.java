package p27sorting;

import java.lang.reflect.Array;
import java.util.Arrays;

public class Main {

    public static void main(String[] args) {
        int[] numbers = {45,67,34,89,32} ;
        System.out.println("Original: "+ Arrays.toString(numbers));

        Arrays.sort(numbers) ;
        System.out.println("Sorted: "+Arrays.toString(numbers));


    }
}
