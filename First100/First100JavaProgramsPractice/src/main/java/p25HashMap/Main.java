package p25HashMap;

import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        HashMap<String, Integer> studentGrades = new HashMap<>() ;
        studentGrades.put("Uma",90) ;
        studentGrades.put("Ravi",85) ;
        studentGrades.put("Ishan",95) ;

        System.out.println("All students and grades: ");
        for(String name: studentGrades.keySet()){
            System.out.println(name + ": "+studentGrades.get(name));
        }

        String searchName = "Uma" ;
        if(studentGrades.containsKey(searchName)){
            System.out.println("\n" + searchName+" is in the map.");
        }

        studentGrades.remove("Alice") ;

        System.out.println("After remving Uma: ");
        for(String name: studentGrades.keySet()){
            System.out.println(name + ": "+studentGrades.get(name));
        }
    }
}
