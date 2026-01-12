package p21AbstractClass;

public class Main {
    public static void main(String[] args) {
        Vehicle car = new Car() ;
        Vehicle bike = new Motorcycle() ;

        car.start() ;
        bike.start() ;
    }
}
