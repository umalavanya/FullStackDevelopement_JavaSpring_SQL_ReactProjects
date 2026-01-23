package p64Serialization;

import java.io.*;

public class Main {
    public static void main(String[] args) {
        Employee emp = new Employee("John Doe", 101) ;
        //Serialie
        try(ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("employee.ser"))) {
            oos.writeObject(emp);
            System.out.println("Serialized: " + emp);
        } catch (IOException e){
            e.printStackTrace();
        }

        // Deserialize
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream("employee.ser"))) {
            Employee deserializedEmp = (Employee) ois.readObject();
            System.out.println("Deserialized: " + deserializedEmp);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
