package p32ExtendingThread;

public class MyThread extends Thread {
    @Override
    public void run(){
        System.out.println("Thread is running: "+this.getName());
    }
}


