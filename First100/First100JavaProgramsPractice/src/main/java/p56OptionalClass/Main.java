package p56OptionalClass;

import java.util.Optional;

public class Main {
    public static Optional<Integer> findFirstEven(int[] numbers){

        for(int num:numbers){
            if(num%2 == 0){
                return Optional.of(num) ;
            }
        }
        return Optional.empty() ;

    }

    public static void main(String[] args) {
        int[] withEven = {1,3,5,6,7} ;
        int[] noEven = {1,3,5,7} ;

        Optional<Integer> result1 = findFirstEven(withEven);
        System.out.println("First even (withEven): " + result1.orElse(-1));

        Optional<Integer> result2 = findFirstEven(noEven);
        System.out.println("First even (noEven): " + result2.orElse(-1));
    }
}
