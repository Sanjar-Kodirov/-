// Основы для понимания Two Sum
console.log("=== Изучаем основы ===");

// ============================================
// 1. МАССИВЫ И ИНДЕКСЫ
// ============================================

const numbers = [2, 7, 11, 15];

console.log("\n--- Массив и индексы ---");
console.log("Массив:", numbers);
console.log("numbers[0] =", numbers[0]); // первый элемент
console.log("numbers[1] =", numbers[1]); // второй элемент
console.log("numbers[2] =", numbers[2]); // третий элемент
console.log("numbers[3] =", numbers[3]); // четвертый элемент

// ЗАДАНИЕ 1: Выведите сумму первого и второго элемента
console.log("\nЗадание 1:");
console.log(
  "numbers[0] + numbers[1] =",
  numbers[0] + numbers[1] /* ВАШЕ РЕШЕНИЕ */
);

// ============================================
// 2. ЦИКЛЫ ПО МАССИВУ
// ============================================

console.log("\n--- Цикл по массиву ---");
for (let i = 0; i < numbers.length; i++) {
  console.log(`Индекс ${i}: значение ${numbers[i]}`);
}

// ЗАДАНИЕ 2: Найдите и выведите все пары чисел
console.log("\nЗадание 2 - Все пары:");
for (let i = 0; i < numbers.length; i++) {
  for (let j = i + 1; j < numbers.length; j++) {
    console.log(
      `Пара: numbers[${i}] + numbers[${j}] = ${numbers[i]} + ${numbers[j]} = ${
        numbers[i] + numbers[j]
      }`
    );
  }
}

// ============================================
// 3. ПОИСК НУЖНОЙ СУММЫ
// ============================================

const target = 9;
console.log("\n--- Ищем сумму равную", target, "---");

// ЗАДАНИЕ 3: Найдите пару которая дает target = 9
for (let i = 0; i < numbers.length; i++) {
  for (let j = i + 1; j < numbers.length; j++) {
    if (numbers[i] + numbers[j] === target) {
      console.log(
        `НАЙДЕНО! numbers[${i}] + numbers[${j}] = ${numbers[i]} + ${numbers[j]} = ${target}`
      );
      console.log(`Ответ: [${i}, ${j}]`);
    }
  }
}

// ============================================
// 4. МАТЕМАТИКА: COMPLEMENT
// ============================================

console.log("\n--- Понимаем complement ---");
console.log("Если нам нужна сумма", target);
console.log(
  "И у нас есть число 2, то нам нужно найти:",
  target - 2,
  "=",
  target - 2
);
console.log(
  "И у нас есть число 7, то нам нужно найти:",
  target - 7,
  "=",
  target - 7
);

// ЗАДАНИЕ 4: Для каждого числа найдите complement
for (let i = 0; i < numbers.length; i++) {
  const current = numbers[i];
  const complement = target - current;
  console.log(`Число ${current} ищет complement ${complement}`);
}

// ============================================
// 5. MAP (СЛОВАРЬ) - ОСНОВЫ
// ============================================

console.log("\n--- Изучаем Map ---");
const map = new Map();

// Добавляем данные: значение → индекс
map.set(2, 0); // число 2 находится на индексе 0
map.set(7, 1); // число 7 находится на индексе 1
map.set(11, 2); // число 11 находится на индексе 2

console.log("Map содержит:");
console.log("map.get(2) =", map.get(2)); // получить индекс числа 2
console.log("map.get(7) =", map.get(7)); // получить индекс числа 7
console.log("map.has(7) =", map.has(7)); // есть ли число 7 в map?
console.log("map.has(99) =", map.has(99)); // есть ли число 99 в map?

// ============================================
// ВАШИ ЗАДАНИЯ
// ============================================

console.log("\n=== ВАШИ ЗАДАНИЯ ===");
console.log("1. Исправьте строку с суммой в Задании 1");
console.log("2. Запустите код: node basics-practice.js");
console.log("3. Изучите результат");
console.log("4. Скажите что поняли!");
