package p46MethodOverloading;

public class Main {
    public static void main(String[] args) {
        MathOps ops = new MathOps() ;
        System.out.println("Int add: "+ops.add(5,3));
        System.out.println("Double add: "+ops.add(5.8,3.5)) ;
        System.out.println("Strings concat: "+ops.add("Hello ","world!"));

    }
}
