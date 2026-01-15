package p45SingletonPattern;

public class Main {

    public static void main(String[] args) {
        DatabaseConnection db = DatabaseConnection.getInstance() ;
        db.connect() ;
        DatabaseConnection db2 = DatabaseConnection.getInstance() ;
        db2.connect() ;

    }
}
