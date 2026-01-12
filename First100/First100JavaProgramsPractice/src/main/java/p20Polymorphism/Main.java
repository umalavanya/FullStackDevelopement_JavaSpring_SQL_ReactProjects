package p20Polymorphism;

public class Main {
    public static void main(String[] args) {
        Shape[] shapes = new Shape[2] ;
        shapes[0] = new Circle(5.0) ;
        shapes[1] = new Square(4.0) ;

        for(Shape shape: shapes){
            System.out.printf("Area of %s: %.2f%n ",shape.getName(),shape.area());
        }

    }
}
