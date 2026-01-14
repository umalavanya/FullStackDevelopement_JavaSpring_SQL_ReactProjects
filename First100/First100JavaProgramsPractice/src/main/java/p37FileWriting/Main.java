package p37FileWriting;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in) ;
        System.out.println("Enter 3 lines of text:");
        try(BufferedWriter writer = new BufferedWriter(new FileWriter("output.txt"))){

            for(int i = 1; i<=3; i++){
                System.out.println("Line: "+i+":");
                String line = scanner.nextLine() ;
                writer.write(line );
                writer.newLine();
            }
            System.out.println("Text written to output.txt");
        }catch(IOException e){
            System.out.println("Error writing to file: "+ e.getMessage());
        }finally{
            scanner.close() ;
        }




    }
}
