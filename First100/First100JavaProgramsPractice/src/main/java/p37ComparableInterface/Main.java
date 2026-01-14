package p37ComparableInterface;

import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Student> students = new ArrayList<>() ;
        students.add(new Student("Alice",85)) ;
        students.add(new Student("Bob",85)) ;
        students.add(new Student("Charlie",85)) ;

        for(Student s:students){
            System.out.println(s);
        }


    }
}
