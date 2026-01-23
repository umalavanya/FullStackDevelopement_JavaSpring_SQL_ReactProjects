package p64Serialization;

import java.io.Serializable;

public class Employee implements Serializable {
    private static final long serialVersionUID = 1L ;
    private String name ;
    private int id ;

    public Employee(String name, int id){
        this.name  = name ;
        this.id = id ;

    }

    @Override
    public String toString(){
        return "Employee{name = '" + name + "', id = " + id + "}" ;
    }
}
