package p50RegEx;

import java.util.regex.Pattern;
import java.util.regex.Pattern;

public class Main {
    public static boolean isValidEmail(String email) {
        String regex = "^[A-Za-z0-9._]+@[A-Za-z0-9]+\\.[A-Za-z]{2,4}$";
        return Pattern.matches(regex, email);
    }

    public static void main(String[] args) {
        String[] emails = {
                "test@example.com",
                "user.name@domain.co",
                "invalid@.com",
                "@missinglocal.com",
                "correct@domain.org"
        };

        for (String email : emails) {
            System.out.println(email + " -> " + isValidEmail(email));
        }
    }
}