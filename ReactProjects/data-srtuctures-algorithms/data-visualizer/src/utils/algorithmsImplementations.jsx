// src/utils/algorithmImplementations.js
export const algorithms = {
  // Bubble Sort
  bubbleSort: (arr) => {
    const steps = [];
    const n = arr.length;
    const array = [...arr];
    
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        steps.push({
          array: [...array],
          comparison: [j, j + 1],
          swapped: false
        });
        
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          steps[steps.length - 1].swapped = true;
        }
      }
    }
    
    return steps;
  },

  // Quick Sort
  quickSort: (arr) => {
    const steps = [];
    const array = [...arr];
    
    const partition = (low, high) => {
      const pivot = array[high];
      let i = low - 1;
      
      for (let j = low; j < high; j++) {
        steps.push({
          array: [...array],
          pivot: high,
          comparing: j,
          partition: [low, high]
        });
        
        if (array[j] < pivot) {
          i++;
          [array[i], array[j]] = [array[j], array[i]];
        }
      }
      
      [array[i + 1], array[high]] = [array[high], array[i + 1]];
      return i + 1;
    };
    
    const quickSortRecursive = (low, high) => {
      if (low < high) {
        const pi = partition(low, high);
        quickSortRecursive(low, pi - 1);
        quickSortRecursive(pi + 1, high);
      }
    };
    
    quickSortRecursive(0, array.length - 1);
    return steps;
  },

  // Binary Search
  binarySearch: (arr, target) => {
    const steps = [];
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      
      steps.push({
        left,
        right,
        mid,
        found: arr[mid] === target
      });
      
      if (arr[mid] === target) {
        return steps;
      } else if (arr[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    
    return steps;
  }
};