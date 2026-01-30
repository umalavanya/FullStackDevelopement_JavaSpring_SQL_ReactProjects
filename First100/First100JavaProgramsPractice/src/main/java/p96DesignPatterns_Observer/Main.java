package p96DesignPatterns_Observer;

public class Main {
    public static void main(String[] args) {
        Subject subject = new Subject();

        User user1 = new User("Alice");
        User user2 = new User("Bob");

        subject.attach(user1);
        subject.attach(user2);

        subject.setState("New data available!");
        subject.setState("System updated.");
    }
}
