// Создаем Two Sum пошагово
console.log("=== Строим Two Sum шаг за шагом ===");

const nums = [2, 7, 11, 15];
const target = 9;

// ============================================
// ШАГ 1: МЕДЛЕННОЕ РЕШЕНИЕ (которое мы уже понимаем)
// ============================================

console.log("\n--- Шаг 1: Медленное решение O(n²) ---");

function twoSumSlow(nums, target) {
  // Проверяем все пары (как в basics-practice.js)
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        console.log(
          `Нашли: nums[${i}] + nums[${j}] = ${nums[i]} + ${nums[j]} = ${target}`
        );
        return [i, j];
      }
    }
  }
  return [];
}

const result1 = twoSumSlow(nums, target);
console.log("Результат медленного решения:", result1);

// ============================================
// ШАГ 2: БЫСТРОЕ РЕШЕНИЕ - ЗАГОТОВКА
// ============================================

console.log("\n--- Шаг 2: Быстрое решение O(n) ---");

function twoSumFast(nums, target) {
  const map = new Map(); // число → индекс

  console.log("Начинаем поиск...");

  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    const complement = target - current;

    console.log(`\nШаг ${i + 1}:`);
    console.log(`  Текущее число: ${current} (индекс ${i})`);
    console.log(`  Ищем complement: ${complement}`);
    console.log(`  Map содержит:`, Array.from(map.entries()));

    // ЗАДАНИЕ 1: Проверьте есть ли complement в map
    if (map.has(complement)) {
      console.log(
        `  ✅ НАЙДЕН! complement ${complement} на индексе ${map.get(
          complement
        )}`
      );
      return [map.get(complement), i];
    }

    console.log(`  ➕ Добавляем в map: ${current} → ${i}`);
    // ЗАДАНИЕ 2: Добавьте текущее число в map
    map.set(current, i);
    map.set(current, i);
  }

  return [];
}

// Теперь запускаем!
const result2 = twoSumFast(nums, target);
console.log("Результат быстрого решения:", result2);

// ============================================
// ПОДСКАЗКИ ДЛЯ ЗАДАНИЙ
// ============================================

console.log("\n=== ВАШИ ЗАДАНИЯ ===");
console.log("ЗАДАНИЕ 1: Замените /* ВАШЕ УСЛОВИЕ */ на проверку:");
console.log("  Подсказка: map.has(complement)");
console.log("");
console.log("ЗАДАНИЕ 2: Замените /* ВАШЕ РЕШЕНИЕ */ на добавление в map:");
console.log("  Подсказка: map.set(current, i)");
console.log("");
console.log("ЗАДАНИЕ 3: Замените комментарии в return:");
console.log("  /* ИНДЕКС COMPLEMENT */ → map.get(complement)");
console.log("  /* ТЕКУЩИЙ ИНДЕКС */ → i");
console.log("");
console.log("После заполнения раскомментируйте строки с result2!");

// ============================================
// ТЕСТЫ ДЛЯ ПРОВЕРКИ
// ============================================

console.log("\n--- Тесты для проверки ---");
console.log("Тест 1: [2,7,11,15], target=9 → ожидается [0,1]");
console.log("Тест 2: [3,2,4], target=6 → ожидается [1,2]");
console.log("Тест 3: [3,3], target=6 → ожидается [0,1]");
