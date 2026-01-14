package p31Threades;
public class Main {
    public static void main(String[] args) {
        Runnable task = () -> {
            for (int i = 1; i <= 5; i++) {
                System.out.println(Thread.currentThread().getName() + ": " + i);
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        };

        Thread thread = new Thread(task, "MyThread");
        thread.start();
    }
}