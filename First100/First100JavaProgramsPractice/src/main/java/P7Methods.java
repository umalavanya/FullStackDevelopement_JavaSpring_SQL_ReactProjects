import java.util.Scanner;

public class P7Methods {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in) ;
        System.out.println("Enter a first Integer: ");
        int a = scanner.nextInt() ;
        System.out.println("Enter the next integer: ");
        int b = scanner.nextInt() ;
        int result = max(a,b) ;
        System.out.println(result);

        scanner.close() ;

    }

    public static int max(int a,int b){
        return (a>b)?a:b ;
    }
}
