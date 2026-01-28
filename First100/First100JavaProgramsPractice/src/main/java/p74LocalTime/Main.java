package p74LocalTime;

import java.time.LocalTime;

public class Main {

    public static void main(String[] args) {
        LocalTime now = LocalTime.now();
        System.out.println("Current time: "+ now);

        LocalTime later = now.plusHours(2).plusMinutes(30) ;
        System.out.println("Time after 2h 30m: "+ later);
    }
}
