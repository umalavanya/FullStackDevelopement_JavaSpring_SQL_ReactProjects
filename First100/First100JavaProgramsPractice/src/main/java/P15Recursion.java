import java.util.Scanner;

public class P15Recursion {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int num ;
        do{
            System.out.println("Enter a positive integer: ");
            num = scanner.nextInt() ;
        } while(num < 0) ;

        int factorial = facto(num);
        System.out.println("The factorial of the number"+num+" is: "+factorial);
        scanner.close() ;
    }

    public static int facto(int num){
        if (num == 0 || num == 1) return 1 ;

        int fact = num ;
        fact *= facto(num-1) ;
        return fact ;
    }
}
