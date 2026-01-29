package p91SealedClass;

final class Rectangle implements Shape{
    private double width, height ;
    public Rectangle(double w, double h){
        width = w;
        height = h ;
    }
    public double area(){return width*height ;}
}
