package p35Enums;

public class Main {
    public static void main(String[] args) {
        for(Day day: Day.values()){
            System.out.println(day+"is weekend? "+day.isWeekend());
        }
    }
}
