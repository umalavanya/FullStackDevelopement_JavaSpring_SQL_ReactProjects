package p20Polymorphism;

public class Circle implements Shape{
    private double radius ;
    private String name = "circle";

    Circle(double radius){
        this.radius  = radius ;
    }

    @Override
    public double area(){
        return Math.PI * this.radius*this.radius ;
    }

    @Override
    public String getName(){
        return name ;
    }
}
