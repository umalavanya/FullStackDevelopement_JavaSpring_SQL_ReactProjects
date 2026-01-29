package p90PatternMatching;

public class Main {
    public static void printLength(Object obj){
        if(obj instanceof String s){
            System.out.println("String length: "+s.length());
        } else {
            System.out.println("Not a string");
        }
    }
    public static void main(String[] args) {

        printLength("Hello");
        printLength(123);

    }
}
