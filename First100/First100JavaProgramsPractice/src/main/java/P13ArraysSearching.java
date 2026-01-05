public class P13ArraysSearching {
    public static int findIndex(int[] nums, int target) {

        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == target) {
                return i;
            }
         }
        return -1;
    }

    public static void main(String[] args) {

        int[] numbers = {4, 7, 2, 9, 5};
        int target = 1;
        int index = findIndex(numbers, target);
        System.out.println("Index of " + target + ": " + index);
    }
}
