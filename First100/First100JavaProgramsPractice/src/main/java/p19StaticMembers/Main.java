package p19StaticMembers;

public class Main {
    public static void main(String[] args) {
        System.out.println(Counter.getCount());
        new Counter() ;
        new Counter() ;
        System.out.println(Counter.getCount());

    }
}
