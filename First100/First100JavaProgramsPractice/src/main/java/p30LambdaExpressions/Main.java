package p30LambdaExpressions;

public class Main {
    public static void main(String[] args) {

        Calculator add = (a,b) -> a+b ;
        Calculator multiply = (a,b) -> a*b ;

        System.out.println("Addition: "+add.operate(5,3));
        System.out.println("Multiplication: "+multiply.operate(5,3));

    }
}
