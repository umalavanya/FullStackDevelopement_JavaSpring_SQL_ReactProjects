package p102Arraylist;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class ArrayListDemo {
    public static void main(String[] args) {
        List<String> fruits =  new ArrayList<>() ;

        fruits.add("Apple") ;
        fruits.add("Banana") ;
        fruits.add("Mango") ;
        fruits.add(1, "Orange") ; //Add at specific index

        //Accessing elements
        System.out.println("First fruits: "+fruits.get(0));


        // Iterating
        System.out.println("\nIterating with for-each:");
        for(String fruit : fruits) {
            System.out.println(fruit);
        }

        // Using Iterator
        System.out.println("\nUsing Iterator: ");
        Iterator<String> it = fruits.iterator() ;
        while(it.hasNext()){
            System.out.println(it.next());
        }

        //List-specific operations
        fruits.set(2,"Grapes") ; //Update element
        System.out.println("\nAfter update: "+ fruits);

        fruits.remove("Banana") ; //Remove by object
        fruits.remove(0) ;// Remove by index

        //Sie and Contains check
        System.out.println("Size: "+ fruits.size());
        System.out.println("Contains Mango? "+ fruits.contains("Mango"));


    }
}
