package p97DesignPatternBuilder;

public class Main {
    public static void main(String[] args) {
        Computer computer = new Computer.Builder("16GB", "1TB", "Intel i7")
                .setGraphicsCardEnabled(true)
                .setBluetoothEnabled(false)
                .build();

        System.out.println(computer);
    }
}
