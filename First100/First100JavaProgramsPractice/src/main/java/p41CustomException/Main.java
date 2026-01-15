package p41CustomException;

public class Main {
    public static void main(String[] args) {

        try{
            validateAge(16);
        } catch(InvalidAgeException e){
            System.out.println("Caught: "+ e.getMessage());
        }

        try{
            validateAge(25);
        } catch(InvalidAgeException e){
            System.out.println("Caught: "+ e.getMessage());
        }

    }

    public static void validateAge(int age) throws InvalidAgeException{
        if(age < 18){
            throw new InvalidAgeException("Age "+ age + " is invalid. Must be 18 or older.") ;
        } else {
            System.out.println("Age "+ age + " is valid.");
        }
    }
}
