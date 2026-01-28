package p75LocalDate;

import java.time.LocalDate;
import java.time.Period;

public class Main {
    public static void main(String[] args) {
        LocalDate start = LocalDate.of(2020, 3, 15);
        LocalDate end = LocalDate.of(2024, 7, 22);

        Period period = Period.between(start, end);

        System.out.println("Period: " + period.getYears() + " years, "
                + period.getMonths() + " months, "
                + period.getDays() + " days");
    }
}
