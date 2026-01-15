package p48InterfaceWithDefaultMethod;

public class Main {
    public static void main(String[] args) {
        FileLogger logger = new FileLogger();
        logger.log("Hello") ;
        logger.save("Important data");
    }
}
