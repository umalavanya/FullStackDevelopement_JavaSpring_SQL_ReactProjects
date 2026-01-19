package p49Reflection;

import java.lang.reflect.Method;

public class Main {

    public static void main(String[] args) {
        Class<?> stringClass = String.class ;

        System.out.println("Class Name: "+ stringClass.getName());
        System.out.println("superclass: "+ stringClass.getSuperclass().getName() );

        System.out.println("\nDeclared Methods: ");

        Method[] methods = stringClass.getDeclaredMethods() ;
        for(int i = 0 ; i< Math.min(5, methods.length) ; i++ ){
            System.out.println(methods[i].getName());
            System.out.println("... ( and " + (methods.length - 5) + " more");
        }

    }

    
}
