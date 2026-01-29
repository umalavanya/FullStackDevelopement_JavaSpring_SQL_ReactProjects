package p85NestedClass_AnonymousClass;

public class Main {
    public static void main(String[] args) {
        Greeting greeting = new Greeting(){
            @Override
            public void sayHello(){
                System.out.println("Hello from anonymous class!");
            }
        } ;
        greeting.sayHello() ;
    }
}
