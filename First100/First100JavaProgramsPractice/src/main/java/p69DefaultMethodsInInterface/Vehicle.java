package p69DefaultMethodsInInterface;

interface Vehicle {
    default void start(){
        System.out.println("Vehicle Starting");
    }

    void stop() ;
}
