package p22ExceptionHandling;

public class Main {
    public static void main(String[] args) {

        System.out.println(divide(10,0));
        System.out.println(divide(10,2));
    }

    public static int divide(int a, int b){
        try{
            return a/b ;
        } catch (ArithmeticException e){
            System.out.println("Division by zero error!");
        }
        return -1;
    }
}
