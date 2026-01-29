package p77Java8MethodReference;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

        List<Person> people = names.stream()
                .map(Person::new)
                .collect(Collectors.toList());

        people.forEach(System.out::println);
    }

}
