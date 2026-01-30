package p95DesignPatternsFactoryMethod;

public class Main {
    public static void main(String[] args) {
        Shape circle = ShapeFactory.getShape("circle");
        Shape square = ShapeFactory.getShape("square");

        circle.draw();
        square.draw();
    }
}
