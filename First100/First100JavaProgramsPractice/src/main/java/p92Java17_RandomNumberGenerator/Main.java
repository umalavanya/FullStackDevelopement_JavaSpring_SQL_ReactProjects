package p92Java17_RandomNumberGenerator;

import java.util.random.RandomGenerator;

public class Main {
    public static void main(String[] args) {
        RandomGenerator generator = RandomGenerator.getDefault() ;
        int randomNum = generator.nextInt(1,101) ;
        System.out.println("Random number between 1 and 100: " + randomNum);
    }
}
