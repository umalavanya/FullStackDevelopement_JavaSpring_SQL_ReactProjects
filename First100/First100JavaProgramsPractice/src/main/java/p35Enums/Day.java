package p35Enums;

public enum Day {
    MONDAY, TUESDAY, WEDNESDAY,THURSDAY,FRIDAY,SATURDAY,SUNDAY ;
    public boolean isWeekend(){
        return this == SATURDAY || this == SUNDAY ;
    }
}
