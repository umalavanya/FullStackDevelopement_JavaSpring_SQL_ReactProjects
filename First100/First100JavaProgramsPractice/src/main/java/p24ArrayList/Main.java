package p24ArrayList;

import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> arrayList = new ArrayList<String>() ;
        arrayList.add("Uma") ;
        arrayList.add("Ravi") ;
        arrayList.add("Ishan") ;
        arrayList.add("Sameeksha") ;
        arrayList.add("Krithi") ;

        System.out.println("Original list:");

        for(String name: arrayList){
            System.out.println(name);
        }
        arrayList.remove(1) ;

        System.out.println("\nAfter removing second element:");

        for(String name: arrayList){
            System.out.println(name);
        }



    }
}
