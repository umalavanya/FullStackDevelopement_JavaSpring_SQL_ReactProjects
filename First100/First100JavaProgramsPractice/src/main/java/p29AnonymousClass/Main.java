package p29AnonymousClass;

public class Main {
    public static void main(String[] args) {
        Greeting greeting = new Greeting() {
            @Override
            public void sayHello() {
                System.out.println("Hello from an anonymous class!");
            }
        };

        greeting.sayHello() ;
    }



}
