package p18Encapsulation;

public class BankAccount {
    private String accountNumber;
    private double balance ;

    public BankAccount(String accountNumber, double balance){
        if(accountNumber == null || accountNumber.trim().isEmpty()){
            throw new IllegalArgumentException("Account number cannot be null or empty") ;
        }

        if (balance < 500 ){
            throw new IllegalArgumentException("Initial balance must be at least 500") ;
        }

        this.accountNumber = accountNumber ;
        this.balance = balance ;
    }

    public double getBalance(){
        return balance ;
    }

    public String getAccountNumber(){
        return accountNumber ;
    }

    public void setAccountNumber(String accountNumber){
        this.accountNumber = accountNumber ;
    }
    public void setBalance(double balance){
        if (balance >= 0) {
            this.balance = balance ;
        } else {
            System.out.println("Balance cannot be negative.");
        }

    }
    public void deposit(double amount){
        if (amount> 0){
            this.balance += amount ;
            System.out.println(amount+" deposited into "+ accountNumber);
        }  else {
            System.out.println("Deposit amount must be positive.");
        }


    }
}
