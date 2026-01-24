package p65JSONProcessing;
import com.fasterxml.jackson.databind.ObjectMapper ;
import com.fasterxml.jackson.core.JsonProcessingException;

public class Main {
    public static void main(String[] args) {
        ObjectMapper mapper = new ObjectMapper();
        Book book = new Book("1984", "George Orwell");

        try {
            // Object to JSON
            String json = mapper.writeValueAsString(book);
            System.out.println("JSON: " + json);

            // JSON to Object
            Book parsedBook = mapper.readValue(json, Book.class);
            System.out.println("Parsed: " + parsedBook);

        } catch (JsonProcessingException e) {
            System.err.println("JSON processing error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}