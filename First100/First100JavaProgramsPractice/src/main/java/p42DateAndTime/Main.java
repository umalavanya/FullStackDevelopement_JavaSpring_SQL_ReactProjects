package p42DateAndTime;

import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        LocalDate today = LocalDate.now() ;
        System.out.println("Today: "+ today);

        LocalDate futureDate = today.plusDays(10) ;
        System.out.println("10 days from now: "+ futureDate);
    }
}
