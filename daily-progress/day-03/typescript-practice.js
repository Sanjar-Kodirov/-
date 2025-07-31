// День 3: TypeScript Practice - 5 заданий от простого к сложному
console.log("=== ДЕНЬ 3: TYPESCRIPT PRACTICE ===");
// ============================================
// ЗАДАНИЕ 1: Базовая типизация функции (5 минут)
// ============================================
console.log("\n--- Задание 1: Базовая типизация ---");
// ЗАДАЧА: Типизируйте эту функцию
// function add(a, b) {
//     return a + b;
// }
// ВАШЕ РЕШЕНИЕ:
function add(a, b) {
  return a + b;
}
// Тестирование:
console.log("add(5, 3):", add(5, 3)); // 8
console.log("add(10, -2):", add(10, -2)); // 8
// Попробуйте раскомментировать - должна быть ошибка:
// console.log('add("5", "3"):', add("5", "3")); // TypeScript error!
// ============================================
// ЗАДАНИЕ 2: Interface для объекта (5 минут)
// ============================================
console.log("\n--- Задание 2: Interface ---");
// ЗАДАЧА: Создайте interface для этого объекта
var user = {
  id: 1,
  name: "John",
  email: "john@example.com",
  isActive: true,
};
// Используйте interface:
var newUser = {
  // TODO: Создайте объект пользователя
  id: 2,
  name: "Jane",
  email: "jane@example.com",
  isActive: false,
};
console.log("User:", newUser);
// ============================================
// ЗАДАНИЕ 3: Union Types (5 минут)
// ============================================
console.log("\n--- Задание 3: Union Types ---");
// ЗАДАЧА: Функция принимает строку или число и форматирует их
function formatValue(value) {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else {
    return value.toFixed(2);
  }
}
// ВАШЕ РЕШЕНИЕ - добавьте типы:
function formatValue(value) {
  // TODO: Реализуйте функцию с правильными типами
  if (typeof value === "string") {
    return value.toUpperCase();
  } else {
    return value.toFixed(2);
  }
}
// Тестирование:
// console.log('formatValue("hello"):', formatValue("hello")); // "HELLO"
// console.log('formatValue(3.14159):', formatValue(3.14159)); // "3.14"
// ============================================
// ЗАДАНИЕ 4: Generic функция (10 минут)
// ============================================
console.log("\n--- Задание 4: Generics ---");
// ЗАДАЧА: Создайте generic функцию для получения первого элемента массива
// function getFirstElement(arr) {
//     return arr[0];
// }
// ВАШЕ РЕШЕНИЕ - используйте Generic:
function getFirstElement(arr) {
  // TODO: Реализация
  return arr[0];
}
// Тестирование:
// const numbers = [1, 2, 3, 4, 5];
// const strings = ["hello", "world", "typescript"];
// const booleans = [true, false, true];
// console.log('First number:', getFirstElement(numbers)); // 1 (тип number)
// console.log('First string:', getFirstElement(strings)); // "hello" (тип string)
// console.log('First boolean:', getFirstElement(booleans)); // true (тип boolean)
// ============================================
// ЗАДАНИЕ 5: Сложный тип для API (5 минут)
// ============================================
console.log("\n--- Задание 5: Сложные типы ---");
// ЗАДАЧА: Типизируйте этот API response
var apiResponse = {
  data: [
    { id: 1, title: "Post 1", author: { name: "John", age: 25 } },
    { id: 2, title: "Post 2", author: { name: "Jane", age: 30 } },
  ],
  meta: {
    total: 2,
    page: 1,
    hasMore: false,
  },
  status: "success",
};
// Используйте типы:
var typedResponse = {
  // TODO: создайте типизированный объект
  data: [
    { id: 1, title: "Post 1", author: { name: "John", age: 25 } },
    { id: 2, title: "Post 2", author: { name: "Jane", age: 30 } },
  ],
  meta: {
    total: 2,
    page: 1,
    hasMore: false,
  },
  status: "success",
};
console.log("Typed API Response:", typedResponse);
// ============================================
// БОНУСНОЕ ЗАДАНИЕ: Типизация функций
// ============================================
console.log("\n--- Бонус: Типизация функций ---");
// ЗАДАЧА: Типизируйте функцию обработки пользователей
// function processUsers(users, callback) {
//     return users.map(callback);
// }
// ВАШЕ РЕШЕНИЕ:
function processUsers(users, callback) {
  return users.map(callback);
}
// Пример использования:
var users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
];
var userNames = processUsers(users, function (user) {
  return user.name;
});
var userAges = processUsers(users, function (user) {
  return user.age;
});
console.log("User names:", userNames); // ["Alice", "Bob"]
console.log("User ages:", userAges); // [25, 30]
// ============================================
// ПРОВЕРКА ПОНИМАНИЯ
// ============================================
console.log("\n🎯 ВОПРОСЫ ДЛЯ САМОПРОВЕРКИ:");
console.log("1. В чем разница между interface и type?");
console.log("2. Когда использовать Union types?");
console.log("3. Зачем нужны Generics?");
console.log("4. Как TypeScript помогает избежать ошибок?");
// ============================================
// ВЫВОДЫ
// ============================================
console.log("\n🚀 ВЫВОДЫ:");
console.log("✅ TypeScript добавляет статическую типизацию в JavaScript");
console.log("✅ Interface описывает структуру объектов");
console.log("✅ Union types позволяют несколько типов");
console.log("✅ Generics делают код переиспользуемым");
console.log("✅ Типы помогают находить ошибки на этапе разработки");
console.log("\n🎯 Готовы к Блоку 3: Миграция проекта на TypeScript!");
