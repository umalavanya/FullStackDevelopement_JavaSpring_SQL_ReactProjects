package p26LinkedList;

import java.util.LinkedList;

public class Main {

    public static void main(String[] args) {
        LinkedList<Integer> myLL = new LinkedList<>() ;
        for(int i=1; i<=5 ;i++){
            myLL.add(i) ;
        }

        System.out.println("Original list: " + myLL);

        myLL.addFirst(100); ;

        System.out.println("After adding 100 at start: " + myLL);

        myLL.removeLast() ;
        System.out.println("After removing last element: " + myLL);

    }
}
