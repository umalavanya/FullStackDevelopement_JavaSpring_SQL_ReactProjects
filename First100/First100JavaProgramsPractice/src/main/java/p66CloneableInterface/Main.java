package p66CloneableInterface;

public class Main {
    public static void main(String[] args) throws CloneNotSupportedException{
        Person original = new Person("Alice", 25) ;
        Person cloned = (Person) original.clone() ;

        System.out.println("Original: "+ original);
        System.out.println("Cloned: "+ cloned);
    }
}
