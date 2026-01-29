package p91SealedClass;

public class Main {

    public static void main(String[] args) {
        Shape circle = new Circle(5.0) ;
        Shape rect = new Rectangle(4.0, 6.0) ;

        System.out.println("Circle area: "+((Circle)circle).area());
        System.out.println("Rectangle area: "+((Rectangle)rect).area());
    }
}
