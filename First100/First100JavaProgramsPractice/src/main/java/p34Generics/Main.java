package p34Generics;

public class Main {

    public static void main(String[] args) {
        Box<String> stringBox = new Box<>("Hello") ;
        Box<Integer> intBox = new Box<>(42) ;

        System.out.println("String Box: " + stringBox.getContent());
        System.out.println("Integer Box: " + intBox.getContent());

        stringBox.setContent("World");
        intBox.setContent(100);

        System.out.println("Updated String Box: " + stringBox.getContent());
        System.out.println("Updated Integer Box: " + intBox.getContent());



    }
}
