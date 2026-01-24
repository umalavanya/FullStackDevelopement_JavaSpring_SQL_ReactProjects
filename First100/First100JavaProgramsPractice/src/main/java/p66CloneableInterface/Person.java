package p66CloneableInterface;

public class Person implements Cloneable{
    private String name ;
    private int age ;

    public Person(String name, int age){
        this.name = name ;
        this.age = age ;
    }

    @Override
    protected Object clone() throws CloneNotSupportedException{
        return super.clone() ;
    }
    @Override
    public String toString(){
        return "Person{name='" + name + "', age=" + age + "}";
    }
}
