package p36CollectionsIterator;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.stream.StreamSupport;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>() ;
        list.add("Apple") ;
        list.add("Banana") ;
        list.add("Apricot") ;
        list.add("Cherry") ;
        list.add("Avocodo") ;

        System.out.println("Original list");
        Iterator<String> iterator = list.iterator() ;
        while(iterator.hasNext()){
            System.out.println(iterator.next());
        }

        //Remove elements starting with A
        iterator = list.iterator() ;
        while(iterator.hasNext()){
            if(iterator.next().startsWith("A")){
                iterator.remove();
            }
        }
        System.out.println("\nAfter removing elements starting with 'A'");
        for(String item:list){
            System.out.println(item);
        }


    }
}
