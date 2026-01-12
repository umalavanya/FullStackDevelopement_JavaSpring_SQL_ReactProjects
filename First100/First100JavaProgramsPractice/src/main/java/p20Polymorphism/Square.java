package p20Polymorphism;

public class Square implements Shape{

    private double side ;
    private String name = "square";

    Square(double side){
        this.side = side ;
    }

    @Override
    public String getName(){
        return name ;
    }

    @Override
    public double area(){
        return (this.side*this.side) ;
    }
}
