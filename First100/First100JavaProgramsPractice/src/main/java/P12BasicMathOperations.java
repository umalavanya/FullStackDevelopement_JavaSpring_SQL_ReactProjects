import java.util.Scanner;

public class P12BasicMathOperations {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in) ;
        System.out.println("Enter the radius of the circle: ");
        double radius = scanner.nextDouble() ;

        double area = Math.PI * radius * radius ;
        System.out.printf("Area: %.2f%n", area);

        scanner.close() ;
    }
}
