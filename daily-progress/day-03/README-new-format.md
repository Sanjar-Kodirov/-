# 📅 День 3: TypeScript + Stack Pattern (ПРАКТИКО-ОРИЕНТИРОВАННЫЙ)

**Дата:** 31 июля 2025  
**Тема:** TypeScript через практику + Valid Parentheses  
**Время:** 120 минут  
**Статус:** ⏳ Запланирован  
**Формат:** 80% практики, 20% теории

## 🎯 План дня (120 минут) - МАКСИМУМ ПРАКТИКИ

### 🕘 Блок 1: LeetCode Practice (30 мин)
**Valid Parentheses - Stack паттерн**

#### **Подход "Сначала попробуй сам":**
1. **Понимание (5 мин):**
   - Объясните задачу своими словами
   - Какие входные данные? Что должно вернуть?
   - Примеры: "()" → true, "([)]" → false

2. **Планирование (5 мин):**
   - Какую структуру данных использовать?
   - Напишите псевдокод алгоритма
   - Какая временная сложность?

3. **Реализация (15 мин):**
   - Напишите код самостоятельно
   - Протестируйте на примерах
   - Исправьте ошибки

4. **Оптимизация (5 мин):**
   - Можно ли улучшить решение?
   - Обработка edge cases

**Цель:** Написать рабочее решение БЕЗ подсказок!

### 🕘 Блок 2: TypeScript Mini-Practice (30 мин)
**5 практических заданий от простого к сложному**

#### **Задание 1: Базовая типизация (5 мин)**
```typescript
// Типизируйте эту функцию:
function add(a, b) {
    return a + b;
}
```

#### **Задание 2: Interface для объекта (5 мин)**
```typescript
// Создайте interface для пользователя:
const user = {
    id: 1,
    name: "John",
    email: "john@example.com",
    isActive: true
};
```

#### **Задание 3: Union Types (5 мин)**
```typescript
// Функция принимает строку или число:
function formatValue(value) {
    // Ваша реализация
}
```

#### **Задание 4: Generic функция (10 мин)**
```typescript
// Создайте generic функцию для массивов:
function getFirstElement(arr) {
    return arr[0];
}
```

#### **Задание 5: Сложный тип (5 мин)**
```typescript
// Типизируйте API response:
const apiResponse = {
    data: [
        { id: 1, title: "Post 1", author: { name: "John" } },
        { id: 2, title: "Post 2", author: { name: "Jane" } }
    ],
    meta: { total: 2, page: 1 }
};
```

**Цель:** Написать 5 TypeScript примеров с нуля!

### 🕘 Блок 3: Project Upgrade Practice (45 мин)
**Performance Dashboard → TypeScript**

#### **Пошаговая миграция:**

**Шаг 1: Настройка (10 мин)**
- Создайте tsconfig.json (напишите сами!)
- Переименуйте app.js → app.ts
- Настройте компиляцию

**Шаг 2: Типизация данных (10 мин)**
```typescript
// Создайте interfaces для:
interface APIResponse {
    // Ваш код
}

interface PerformanceMetrics {
    // Ваш код
}
```

**Шаг 3: Типизация класса (15 мин)**
```typescript
class PerformanceDashboard {
    // Типизируйте все свойства и методы
}
```

**Шаг 4: Исправление ошибок (5 мин)**
- Компилируйте TypeScript
- Исправьте все ошибки типов
- Протестируйте в браузере

**Шаг 5: Улучшения (5 мин)**
- Добавьте строгую типизацию
- Используйте readonly где нужно
- Добавьте JSDoc комментарии

**Цель:** Полностью рабочий TypeScript проект!

### 🕘 Блок 4: Review & Repetition (15 мин)
**Повторение предыдущих дней**

#### **Вопрос из Дня 1 (5 мин):**
```javascript
// Предскажите порядок выполнения:
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// Ваш ответ: ?
```

#### **Задача из Дня 2 (5 мин):**
```javascript
// Напишите Promise.race() для timeout:
async function fetchWithTimeout(url, timeout) {
    // Ваша реализация
}
```

#### **Быстрый тест (5 мин):**
```javascript
// Two Sum без подсказок:
function twoSum(nums, target) {
    // Напишите за 5 минут!
}
```

## 📊 Критерии успешного дня

### **Обязательно выполнить:**
- ✅ Valid Parentheses решен самостоятельно
- ✅ 5 TypeScript заданий написано
- ✅ Performance Dashboard мигрирован на TypeScript
- ✅ Все вопросы повторения отвечены
- ✅ Минимум 100 строк кода написано

### **Бонусные достижения:**
- 🏆 Решил Valid Parentheses с первой попытки
- 🏆 Все TypeScript задания без ошибок
- 🏆 Добавил дополнительные типы в проект
- 🏆 100% правильные ответы на повторение

## 🎯 Подготовка к дню

### **Что нужно установить:**
```bash
npm install -g typescript
npm install -g ts-node
```

### **Файлы для работы:**
- `day-03-leetcode.ts` - LeetCode решения
- `typescript-practice.ts` - 5 мини-заданий
- `performance-dashboard/app.ts` - миграция проекта

**Готовы к максимально практическому дню?** 💪🔥
