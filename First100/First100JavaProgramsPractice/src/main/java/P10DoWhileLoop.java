import java.util.Scanner;

public class P10DoWhileLoop {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in) ;

        int num ;
        do{
           System.out.println("Enter a positive integer: ");

           num = scanner.nextInt();

        } while(num<=0) ;
        System.out.println("You have entered a positive Integer: "+num+" !!!!!!!!!!");
        scanner.close() ;

    }
}
