package p38ComparatorInterface;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

public class Main {
    public static void main(String[] args) {
        ArrayList<Student> students = new ArrayList<>() ;
        students.add(new Student("Alice",85)) ;
        students.add(new Student("Bob",92)) ;
        students.add(new Student("Charlie",78)) ;

        //Comparator to sort by name alphanumerically
        Comparator<Student> nameComparator = Comparator.comparing(Student::getName) ;
        Collections.sort(students,nameComparator) ;
        for(Student s: students){
            System.out.println(s);
        }

    }
}
