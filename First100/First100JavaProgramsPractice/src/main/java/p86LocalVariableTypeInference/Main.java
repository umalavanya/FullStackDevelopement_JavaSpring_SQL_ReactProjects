package p86LocalVariableTypeInference;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        var message = "Hello, Java 10!" ;
        var numbers = new ArrayList<>(List.of(1,2,3)) ;
        var map = new HashMap<String, Integer>() ;
        map.put("Key", 100) ;

        System.out.println(message + " -> " + message.getClass());
        System.out.println(numbers + " -> " + numbers.getClass());
        System.out.println(map + " -> " + map.getClass());

    }
}
