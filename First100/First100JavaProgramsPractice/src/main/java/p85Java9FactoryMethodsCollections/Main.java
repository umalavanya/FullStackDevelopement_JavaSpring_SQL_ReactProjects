package p85Java9FactoryMethodsCollections;

import java.util.List;
import java.util.Map;
import java.util.Set;

public class Main {

    public static void main(String[] args) {
        List<String> list = List.of("Apple","Banana","Cherry") ;
        Set<Integer> set = Set.of(1,2,3) ;
        Map<String, Integer> map = Map.of("Alice", 90,"Bob",85) ;

        System.out.println("List: "+list);
        System.out.println("Set: "+ set);
        System.out.println("Map: "+map);
    }
}
