import java.util.Scanner;

public class P8StringManipulation {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in) ;
        System.out.println("Enter a string: ");
        String str = scanner.nextLine() ;
        System.out.println("The length of the string is: "+str.length());
        System.out.println("The uppercase version: "+str.toUpperCase());

        scanner.close() ;
    }
}
