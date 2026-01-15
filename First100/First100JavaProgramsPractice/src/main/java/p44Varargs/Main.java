package p44Varargs;

public class Main {
    public static void main(String[] args) {

        System.out.println("Sum (no args): " + sumAll());
        System.out.println("Sum (3,5,7): " + sumAll(3,5,7));
        System.out.println("Sum (1,2,3,4,5): " + sumAll(1,2,3,4,5));

    }

    public static int sumAll(int... numbers){
        int sum = 0 ;
        for(int num: numbers){
            sum += num ;
        }
        return sum ;
    }
}
