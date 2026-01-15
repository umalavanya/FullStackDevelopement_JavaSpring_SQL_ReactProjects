package p40TryWithResources;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try(BufferedReader br = new BufferedReader((new FileReader("D:\\FullStackDevelopement_JavaSpring_SQL_ReactProjects\\First100\\First100JavaProgramsPractice\\src\\main\\java\\p40TryWithResources\\input.txt")))){
            String line ;
            while((line = br.readLine()) != null ){
                System.out.println(line);
            }
        }catch(IOException e){
            System.out.println("Error reading file: "+e.getMessage());
        }
    }
}
