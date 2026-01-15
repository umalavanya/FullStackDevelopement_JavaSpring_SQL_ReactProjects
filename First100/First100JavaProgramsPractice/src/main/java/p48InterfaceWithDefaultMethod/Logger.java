package p48InterfaceWithDefaultMethod;

interface Logger {
    default void log(String message){
        System.out.println("Log: "+message);
    }
    void save(String message);
}
