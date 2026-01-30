package p97DesignPatternBuilder;

class Computer {
    private String ram;
    private String hdd;
    private String cpu;
    private boolean isGraphicsCardEnabled;
    private boolean isBluetoothEnabled;

    private Computer(Builder builder) {
        this.ram = builder.ram;
        this.hdd = builder.hdd;
        this.cpu = builder.cpu;
        this.isGraphicsCardEnabled = builder.isGraphicsCardEnabled;
        this.isBluetoothEnabled = builder.isBluetoothEnabled;
    }

    @Override
    public String toString() {
        return "Computer [RAM=" + ram + ", HDD=" + hdd + ", CPU=" + cpu
                + ", GraphicsCard=" + isGraphicsCardEnabled
                + ", Bluetooth=" + isBluetoothEnabled + "]";
    }

    public static class Builder {
        private String ram;
        private String hdd;
        private String cpu;
        private boolean isGraphicsCardEnabled;
        private boolean isBluetoothEnabled;

        public Builder(String ram, String hdd, String cpu) {
            this.ram = ram;
            this.hdd = hdd;
            this.cpu = cpu;
        }

        public Builder setGraphicsCardEnabled(boolean enabled) {
            this.isGraphicsCardEnabled = enabled;
            return this;
        }

        public Builder setBluetoothEnabled(boolean enabled) {
            this.isBluetoothEnabled = enabled;
            return this;
        }

        public Computer build() {
            return new Computer(this);
        }
    }
}
