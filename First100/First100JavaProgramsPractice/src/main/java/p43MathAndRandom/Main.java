package p43MathAndRandom;

import java.util.Random;

public class Main {
    public static void main(String[] args) {
        Random random =  new Random() ;
        System.out.println("5 random numbers between 1 and 100:");
        for(int i = 0; i<5 ; i++){
            int num = random.nextInt(100) + 1 ;
            System.out.println(num);
        }
    }
}
