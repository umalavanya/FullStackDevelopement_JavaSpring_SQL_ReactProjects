package p68Java8forEachOnMap;

import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<String, Integer> map = new HashMap<>() ;
        map.put("Alice",90) ;
        map.put("Bob", 85);
        map.put("Charlie", 95);

        map.forEach((key, value) -> System.out.println(key + ": " + value));

    }
    
}
