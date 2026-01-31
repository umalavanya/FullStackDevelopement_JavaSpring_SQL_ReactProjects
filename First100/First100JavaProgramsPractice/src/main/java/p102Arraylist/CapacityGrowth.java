package p102Arraylist;

import java.lang.reflect.Field;
import java.util.ArrayList;

public class CapacityGrowth {
    public static int getCapacity(ArrayList<?> list) throws Exception {
        Field dataField = ArrayList.class.getDeclaredField("elementData");
        dataField.setAccessible(true);
        return ((Object[]) dataField.get(list)).length;
    }

    public static void main(String[] args) throws Exception {
        ArrayList<String> list = new ArrayList<>();

        System.out.println("Initial - Size: " + list.size() +
                ", Capacity: " + getCapacity(list));

        for (int i = 1; i <= 16; i++) {
            list.add("Item " + i);
            System.out.println("Added item " + i +
                    " - Size: " + list.size() +
                    ", Capacity: " + getCapacity(list));
        }
    }
}
