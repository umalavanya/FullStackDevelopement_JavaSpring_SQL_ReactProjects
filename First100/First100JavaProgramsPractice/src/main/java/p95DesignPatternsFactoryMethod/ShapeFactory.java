package p95DesignPatternsFactoryMethod;

class ShapeFactory {
    public static Shape getShape(String type) {
        if (type.equalsIgnoreCase("circle")) {
            return new Circle();
        } else if (type.equalsIgnoreCase("square")) {
            return new Square();
        }
        throw new IllegalArgumentException("Unknown shape type");
    }
}
