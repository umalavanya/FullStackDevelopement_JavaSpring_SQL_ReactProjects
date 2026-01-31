package intellipaat.module1.assignment1;

import java.util.Scanner;

public class P2FindSum {
    public static void main(String[] args) {

        Scanner scanner= new Scanner(System.in) ;

        System.out.println("Enter the first number: ");
        int num1 = scanner.nextInt() ;
        System.out.println("Enter the second number: ");
        int num2 = scanner.nextInt() ;

        int sumOfTwoNums = num1 + num2 ;

        System.out.printf("The sum of %d and %d is %d",num1,num2,sumOfTwoNums);
        scanner.close() ;
    }
}
