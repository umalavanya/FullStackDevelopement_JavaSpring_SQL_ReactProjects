package p63CallableAndFuture;
import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newSingleThreadExecutor();

        Callable<Integer> task = () -> {
            int sum = 0;
            for (int i = 1; i <= 10; i++) {
                sum += i;
            }
            return sum;
        };
        Future<Integer> future = executor.submit(task);
        System.out.println("Sum from 1 to 10: " + future.get());
        executor.shutdown();
    }
}