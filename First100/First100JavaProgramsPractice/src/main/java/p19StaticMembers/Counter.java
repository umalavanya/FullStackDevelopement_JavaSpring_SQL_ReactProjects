package p19StaticMembers;

public class Counter {
    static int count = 0 ;

    public Counter(){
        count++ ;
    }

    public static int getCount(){
        return count ;
    }
}
