package p71StreamReducer;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<String> fruits = Arrays.asList("apple", "banana", "apricot", "blueberry", "cherry");

        Map<Character, List<String>> grouped = fruits.stream()
                .collect(Collectors.groupingBy(s -> s.charAt(0)));

        grouped.forEach((key, value) -> System.out.println(key + ": " + value));
    }
}