package LC1;

public class Main {
    public static void main(String[] args) {

        System.out.println(totalMoney(10));

    }


    public static int totalMoney(int n) {
        int sum = 0 ;
        int day = 1 ;
        int week = 1 ;
        int rem ;
        while(day<=n){
            rem = (day%7) ;
            sum += (rem==0?7:rem) + (week-1) ;
            day++ ;
            if (rem == 0){
                week++ ;
            }
        }
        return sum ;
    }
}
