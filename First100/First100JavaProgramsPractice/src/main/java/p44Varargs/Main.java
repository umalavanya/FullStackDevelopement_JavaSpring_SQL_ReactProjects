package p44Varargs;

public class Main {
    public static void main(String[] args) {

    }

    public static int sumAll(int... numbers){
        int sum = 0 ;
        for(int num: numbers){
            sum += num ;
        }
        return sum ;
    }
}
