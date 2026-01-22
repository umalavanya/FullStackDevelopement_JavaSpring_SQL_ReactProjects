package p54StackDataStructure;

import java.util.Stack;

public class Main {
    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>() ;

        //Push 5 integers
        for(int i = 1; i<= 5 ; i++){
            stack.push(i * 10) ;
        }
        System.out.println("Stack: "+stack);
        System.out.println("Top element: "+stack.peek());

        //Pop two elements
        stack.pop() ;
        stack.pop() ;

        System.out.println("After popping twice: " + stack);
        System.out.println("Stack size: " + stack.size());

    }
}
