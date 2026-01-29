package p80CollectorsJoining;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<String> languages = Arrays.asList("Java", "Python", "C++");

        String result = languages.stream()
                .collect(Collectors.joining(", ", "[", "]"));

        System.out.println("Joined: " + result);
    }
}
