package p102Arraylist;

import java.util.ArrayList;

public class TrackedArrayList<E> {
    private ArrayList<E> list;
    private int initialCapacity;

    public TrackedArrayList(int initialCapacity) {
        this.initialCapacity = initialCapacity;
        this.list = new ArrayList<>(initialCapacity);
    }

    public int getInitialCapacity() {
        return initialCapacity;
    }

    public int getCurrentCapacity() {
        // Note: This won't reflect actual capacity after resizes
        // unless you override all modifying methods
        return initialCapacity;
    }

    public ArrayList<E> getList() {
        return list;
    }
}
