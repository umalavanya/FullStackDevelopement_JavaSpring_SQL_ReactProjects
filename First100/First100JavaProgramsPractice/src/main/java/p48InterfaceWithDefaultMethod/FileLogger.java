package p48InterfaceWithDefaultMethod;

public class FileLogger implements Logger{

    @Override
    public void save(String message){
        System.out.println("Saving to file: "+message);
    }
}
