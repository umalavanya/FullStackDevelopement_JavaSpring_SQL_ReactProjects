package p83NestedClassesLocalClass;

public class Outer {
    void someMethod(){
        class Local{
            void print(){
                System.out.println("Inside local class");

            }
        }

        Local local = new Local() ;
        local.print() ;
    }
}
