import java.util.Scanner;

public class P11SwitchStatement {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in) ;

        int day ;
        do {
            System.out.println("Enter a number (1-7):");
            day = scanner.nextInt() ;
        } while(day < 1 || day > 7) ;

        String DayName ;
        switch (day){
            case 1 -> System.out.println("Monday");
            case 2 -> System.out.println("Tuesday");
            case 3 -> System.out.println("Wednesday");
            case 4 -> System.out.println("Thursday");
            case 5 -> System.out.println("Friday");
            case 6 -> System.out.println("Saturday");
            default -> System.out.println("Sunday");
        }
        scanner.close() ;
    }
}
