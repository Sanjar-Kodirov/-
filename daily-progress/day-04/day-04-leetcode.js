// День 4: LeetCode Practice - Reverse Linked List
console.log('=== ДЕНЬ 4: REVERSE LINKED LIST ===');

// ============================================
// ЗАДАЧА: Reverse Linked List
// ============================================

/*
Дан head связанного списка, разверните список и верните новый head.

Пример 1:
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]

Пример 2:
Input: head = [1,2]
Output: [2,1]

Пример 3:
Input: head = []
Output: []

Ограничения:
- Количество узлов в списке от 0 до 5000
- -5000 <= Node.val <= 5000
*/

// ============================================
// ОПРЕДЕЛЕНИЕ LINKED LIST
// ============================================

class ListNode {
    constructor(val, next) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

// Вспомогательная функция для создания списка из массива
function createLinkedList(arr) {
    if (arr.length === 0) return null;
    
    const head = new ListNode(arr[0]);
    let current = head;
    
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    
    return head;
}

// Вспомогательная функция для преобразования списка в массив
function linkedListToArray(head) {
    const result = [];
    let current = head;
    
    while (current !== null) {
        result.push(current.val);
        current = current.next;
    }
    
    return result;
}

// ============================================
// ШАГ 1: ПОНИМАНИЕ ЗАДАЧИ (5 минут)
// ============================================

console.log('\n--- Шаг 1: Понимание задачи ---');

// Создаем тестовый список [1,2,3,4,5]
const testList = createLinkedList([1, 2, 3, 4, 5]);
console.log('Исходный список:', linkedListToArray(testList));
console.log('Нужно получить: [5,4,3,2,1]');

// ВОПРОСЫ ДЛЯ ПОНИМАНИЯ:
console.log('\nВопросы для понимания:');
console.log('1. Что такое Linked List?');
console.log('2. Как связаны узлы между собой?');
console.log('3. Что означает "развернуть" список?');
console.log('4. Какие указатели нужно изменить?');

// ============================================
// ШАГ 2: ПЛАНИРОВАНИЕ (5 минут)
// ============================================

console.log('\n--- Шаг 2: Планирование ---');

console.log('Подходы к решению:');
console.log('1. ИТЕРАТИВНЫЙ подход:');
console.log('   - Идем по списку');
console.log('   - Меняем направление стрелок');
console.log('   - Используем 3 указателя: prev, current, next');

console.log('2. РЕКУРСИВНЫЙ подход:');
console.log('   - Рекурсивно доходим до конца');
console.log('   - На обратном пути меняем стрелки');

console.log('\nВыберем ИТЕРАТИВНЫЙ - проще понять');

// Визуализация процесса:
console.log('\nВизуализация:');
console.log('Исходно: 1 -> 2 -> 3 -> 4 -> 5 -> null');
console.log('Шаг 1:   null <- 1    2 -> 3 -> 4 -> 5 -> null');
console.log('Шаг 2:   null <- 1 <- 2    3 -> 4 -> 5 -> null');
console.log('Шаг 3:   null <- 1 <- 2 <- 3    4 -> 5 -> null');
console.log('Шаг 4:   null <- 1 <- 2 <- 3 <- 4    5 -> null');
console.log('Шаг 5:   null <- 1 <- 2 <- 3 <- 4 <- 5');

// ============================================
// ШАГ 3: РЕАЛИЗАЦИЯ (15 минут)
// ============================================

console.log('\n--- Шаг 3: Ваша реализация ---');

// ЗАДАНИЕ: Напишите функцию reverseList самостоятельно!
function reverseList(head) {
    // TODO: Ваша реализация здесь
    // Подсказки:
    // 1. Используйте 3 указателя: prev, current, next
    // 2. prev начинается с null
    // 3. current начинается с head
    // 4. В цикле: сохраните next, измените стрелку, сдвиньте указатели
    
    // Ваш код:
    
}

// ============================================
// ШАГ 4: ТЕСТИРОВАНИЕ (5 минут)
// ============================================

console.log('\n--- Шаг 4: Тестирование ---');

function testReverseList() {
    const tests = [
        { input: [1, 2, 3, 4, 5], expected: [5, 4, 3, 2, 1] },
        { input: [1, 2], expected: [2, 1] },
        { input: [], expected: [] },
        { input: [1], expected: [1] },
        { input: [1, 2, 3], expected: [3, 2, 1] }
    ];
    
    console.log('Запуск тестов...');
    
    tests.forEach((test, index) => {
        const inputList = createLinkedList(test.input);
        const resultList = reverseList(inputList);
        const result = linkedListToArray(resultList);
        const passed = JSON.stringify(result) === JSON.stringify(test.expected);
        
        console.log(`\nТест ${index + 1}: [${test.input.join(',')}]`);
        console.log(`  Ожидается: [${test.expected.join(',')}]`);
        console.log(`  Получено: [${result.join(',')}]`);
        console.log(`  Результат: ${passed ? '✅ ПРОШЕЛ' : '❌ НЕ ПРОШЕЛ'}`);
    });
}

// Раскомментируйте когда напишете функцию:
// testReverseList();

// ============================================
// РЕШЕНИЕ (СМОТРИТЕ ТОЛЬКО ПОСЛЕ СВОЕЙ ПОПЫТКИ!)
// ============================================

console.log('\n--- Решение (смотрите только после попытки!) ---');

function reverseListSolution(head) {
    let prev = null;
    let current = head;
    
    while (current !== null) {
        // Сохраняем следующий узел
        const next = current.next;
        
        // Разворачиваем стрелку
        current.next = prev;
        
        // Сдвигаем указатели
        prev = current;
        current = next;
    }
    
    // prev теперь указывает на новый head
    return prev;
}

// ============================================
// ДОПОЛНИТЕЛЬНЫЕ ВЫЗОВЫ
// ============================================

console.log('\n--- Дополнительные вызовы ---');

// Рекурсивное решение
function reverseListRecursive(head) {
    // Базовый случай
    if (head === null || head.next === null) {
        return head;
    }
    
    // Рекурсивно разворачиваем остальную часть
    const newHead = reverseListRecursive(head.next);
    
    // Разворачиваем текущую связь
    head.next.next = head;
    head.next = null;
    
    return newHead;
}

console.log('Рекурсивное решение также возможно!');

// Проверка на циклы (дополнительно)
function hasCycle(head) {
    let slow = head;
    let fast = head;
    
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow === fast) {
            return true;
        }
    }
    
    return false;
}

console.log('Бонус: функция проверки циклов в списке');

// ============================================
// ВЫВОДЫ
// ============================================

console.log('\n🎯 ВЫВОДЫ:');
console.log('✅ Linked List - важная структура данных');
console.log('✅ Указатели позволяют эффективно изменять структуру');
console.log('✅ Итеративный подход часто проще рекурсивного');
console.log('✅ Временная сложность O(n), пространственная O(1)');
console.log('✅ Важно правильно управлять указателями');

console.log('\n🚀 Готовы к Блоку 2: React Foundations!');
