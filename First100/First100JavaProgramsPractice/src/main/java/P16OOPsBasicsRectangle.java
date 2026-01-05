
public class P16OOPsBasicsRectangle {
    double width ;
    double height ;

    public P16OOPsBasicsRectangle(double width, double height){
        this.width = width ;
        this.height = height ;
    }
    public double area(){
        return width*height ;
    }
}

class Main{
    public static void main(String[] args) {
        P16OOPsBasicsRectangle rect = new P16OOPsBasicsRectangle(5.0, 3.0) ;
        System.out.println("Area: "+rect.area());
    }
}
