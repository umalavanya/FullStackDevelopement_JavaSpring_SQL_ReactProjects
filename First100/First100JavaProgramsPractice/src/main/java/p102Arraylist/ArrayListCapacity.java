package p102Arraylist;

import java.lang.reflect.Field;
import java.util.ArrayList;

public class ArrayListCapacity {
    public static int getCapacity(ArrayList<?> list) {
        try {
            Field dataField = ArrayList.class.getDeclaredField("elementData");
            dataField.setAccessible(true);
            Object[] elementData = (Object[]) dataField.get(list);
            return elementData.length;
        } catch (Exception e) {
            return -1;
        }
    }

    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();

        System.out.println("Size: " + list.size());
        System.out.println("Capacity: " + getCapacity(list));  // Default: 10

        for (int i = 0; i < 15; i++) {
            list.add("Item " + i);
            System.out.println("Size: " + list.size() +
                    ", Capacity: " + getCapacity(list));
        }
    }
}
