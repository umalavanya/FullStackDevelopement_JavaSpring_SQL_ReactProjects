public class P14CommandLineArguments {
    public static void main(String[] args) {
        if(args.length < 2){
            System.out.println("Please provide two numbers as arguments.");
            return ;
        }
        try{
            int num1 = Integer.parseInt(args[0]) ;
            int num2 = Integer.parseInt(args[1]) ;
            int product = num1*num2 ;
            System.out.println("Product: "+ product);
        } catch (NumberFormatException e){
            System.out.println("Invalid number format.");
        }
    }
}

