package p55Queue;

import java.util.LinkedList;
import java.util.Queue;

public class Main {
    public static void main(String[] args) {
        Queue<String> queue = new LinkedList<>() ;
        queue.add("First") ;
        queue.add("Second") ;
        queue.add("Third") ;

        System.out.println("Queue: " + queue);
        System.out.println("Front element: " + queue.peek());

        String removed = queue.poll();
        System.out.println("Removed: " + removed);
        System.out.println("Queue after removal: " + queue);
    }
}
