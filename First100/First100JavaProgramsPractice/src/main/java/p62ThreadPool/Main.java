package p62ThreadPool;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Main {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(2) ;

        for(int i = 1; i<=2 ; i++){
            int taskId = i ;
            executor.submit(() -> {
                System.out.println("Task "+taskId+" running on" + Thread.currentThread().getName());

            }) ;
        }
        executor.shutdown();
    }
}
