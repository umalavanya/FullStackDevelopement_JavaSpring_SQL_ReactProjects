package p102Arraylist;

import java.util.ArrayList;

public class CapacityExample {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();

        // Before bulk add, ensure enough capacity
        System.out.println("Size before: " + list.size());

        // Ensure capacity for 1000 elements
        list.ensureCapacity(1000);

        // Now adding elements won't cause reallocation
        for (int i = 0; i < 1000; i++) {
            list.add("Item " + i);
        }

        System.out.println("Size after: " + list.size());

        // Trim to minimize memory usage
        list.trimToSize();  // Reduces capacity to match size

        System.out.println("Size after trim: " + list.size());
    }
}
