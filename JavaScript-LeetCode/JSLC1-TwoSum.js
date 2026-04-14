// Problem1: Two Sum : Find two numbers that add up to a target


// Solution 1: Hash Map (Optimal -  O(n))
function twoSum(nums, target){
    const map = new Map() ;
    for(let i = 0; i<=nums.length; i++){
        const complement = target-nums[i] ;
        if(map.has(complement)){
            return [map.get(complement), i] ;
        }
        map.set(nums[i], i) ;
    }
    return [] ;
}

// Solution 2: Brute Force (O(n^2))

function twoSumBrute(nums, target){
    for(let i = 0 ; i < nums.length; i++){
        for(let j = 0 ; j < nums.length ; j++){
            if(nums[i] + nums[j] === target){
                return [i,j] ;
            }
        }
    }
     return [] ;
}

// Test 
console.log(twoSum([2,7,11,15],9)) ; //[0,1] 