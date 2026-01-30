package p101CollectionsArrayList;

import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> numbers = new ArrayList<>() ;
        numbers.add(10) ;
        numbers.add(20) ;
        numbers.add(30) ;
        numbers.add(40) ;

        numbers.add(2,25) ;

        System.out.println(numbers);
    }
}
