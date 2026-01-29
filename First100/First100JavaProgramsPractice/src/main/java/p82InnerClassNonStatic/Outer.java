package p82InnerClassNonStatic;

public class Outer {
    private String outerField = "Outer field" ;
    class Inner{
        void show(){
            System.out.println("Accessing: "+outerField);
        }
    }
}
