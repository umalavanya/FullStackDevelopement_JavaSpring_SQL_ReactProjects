package p67AnnotationsAndCustomAnnotation;
import java.lang.annotation.* ;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@interface Author{
    String name() ;
    String date() ;
}
public class MyClass {
    @Author(name = "John", date = "2024-01-15")
    public void myMethod(){
        System.out.println("Method with custom annotation.");
    }
}
