package p45SingletonPattern;

public class DatabaseConnection {
    private static DatabaseConnection instance ;
    private DatabaseConnection(){
        //private constructor
    }

    public static DatabaseConnection getInstance(){
        if(instance == null){
            instance = new DatabaseConnection() ;
        }
        return instance ;
    }
    public void connect(){
        System.out.println("Connected to database");
    }
}
