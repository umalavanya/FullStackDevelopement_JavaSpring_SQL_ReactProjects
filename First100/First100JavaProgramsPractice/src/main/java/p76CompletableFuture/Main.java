package p76CompletableFuture;

import java.util.concurrent.CompletableFuture;

public class Main {
    public static void main(String[] args) {
        CompletableFuture.supplyAsync(() ->5*5)
                .thenAccept(result -> System.out.println("Square: "+result)) ;
        //wait for async to complete
        try{
            Thread.sleep(1000) ;
        }catch(InterruptedException e){
            e.printStackTrace() ;
        }
    }

}
