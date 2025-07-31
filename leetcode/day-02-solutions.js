// День 2: LeetCode решения (2/500)
// Дата: 30 июля 2025

console.log("=== День 2: LeetCode Solutions ===");

// ============================================
// ЗАДАЧА 1: Two Sum (Easy)
// ============================================
// Дан массив nums и target, найти индексы двух чисел которые дают target
// Input: nums = [2,7,11,15], target = 9
// Output: [0,1] (nums[0] + nums[1] = 2 + 7 = 9)

function twoSum(nums, target) {
  const map = new Map(); // число → индекс

  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    const complement = target - current;

    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(current, i);
  }
  return [];
}

// Тесты для Two Sum
console.log("\n--- Two Sum Tests ---");
console.log("Test 1:", twoSum([2, 7, 11, 15], 9)); // Ожидается: [0,1]
console.log("Test 2:", twoSum([3, 2, 4], 6)); // Ожидается: [1,2]
console.log("Test 3:", twoSum([3, 3], 6)); // Ожидается: [0,1]

// ============================================
// ЗАДАЧА 2: Valid Parentheses (Easy)
// ============================================
// Проверить корректность скобок: ()[]{}
// Input: s = "()[]{}"
// Output: true

function isValid(s) {
  const stack = []; // Стек для хранения открывающих скобок
  const pairs = { ")": "(", "]": "[", "}": "{" };

  for (let char of s) {
    if (char === "(" || char === "[" || char === "{") {
      stack.push(char);
    } else if (char === ")" || char === "]" || char === "}") {
      if (stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }
  return stack.length === 0;
}

// Тесты для Valid Parentheses
console.log("\n--- Valid Parentheses Tests ---");
console.log("Test 1:", isValid("()")); // Ожидается: true
console.log("Test 2:", isValid("()[]{}")); // Ожидается: true
console.log("Test 3:", isValid("(]")); // Ожидается: false
console.log("Test 4:", isValid("([)]")); // Ожидается: false
console.log("Test 5:", isValid("{[]}")); // Ожидается: true

// ============================================
// АНАЛИЗ РЕШЕНИЙ
// ============================================

console.log("\n--- Анализ сложности ---");
console.log("Two Sum:");
console.log("- Время: O(n) - один проход по массиву");
console.log("- Память: O(n) - HashMap для хранения элементов");

console.log("Valid Parentheses:");
console.log("- Время: O(n) - один проход по строке");
console.log("- Память: O(n) - Stack в худшем случае");

// ============================================
// ЗАМЕТКИ И ВЫВОДЫ
// ============================================

console.log("\n--- Мои заметки ---");
console.log("Что изучил:");
console.log("- Hash Map паттерн для O(n) поиска пар");
console.log("- Stack паттерн для проверки соответствий");

console.log("Сложности:");
console.log("- Понял логику complement = target - nums[i]");
console.log("- Важность проверки пустоты стека в конце");

console.log("Паттерны:");
console.log("- Hash Map для поиска пар");
console.log("- Stack для проверки соответствий");
