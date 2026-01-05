package p18Encapsulation;

public class Main {

    public static void main(String[] args) {
        BankAccount umaAc = new BankAccount("1234 5678 9876", -500.00) ;
        umaAc.deposit(-6700.00);
        System.out.println(umaAc.getBalance());
    }
}
