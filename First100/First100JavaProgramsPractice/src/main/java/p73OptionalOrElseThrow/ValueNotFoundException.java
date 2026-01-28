package p73OptionalOrElseThrow;

public class ValueNotFoundException extends RuntimeException{

    public ValueNotFoundException(String message){
        super(message) ;
    }
}
