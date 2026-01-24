package p67AnnotationsAndCustomAnnotation;

public class Main {
    public static void main(String[] args) throws Exception {
        MyClass obj = new MyClass();
        var method = obj.getClass().getMethod("myMethod");

        Author annotation = method.getAnnotation(Author.class);
        if (annotation != null) {
            System.out.println("Author: " + annotation.name());
            System.out.println("Date: " + annotation.date());
        }
    }
}
