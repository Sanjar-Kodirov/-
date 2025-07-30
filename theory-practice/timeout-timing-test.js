console.log('=== Тест времени setTimeout ===');

// Пример 1: Разное время
console.log('\n--- Пример 1: Разное время ---');
console.log('start');
setTimeout(() => console.log('timeout 100ms'), 100);
setTimeout(() => console.log('timeout 50ms'), 50);
setTimeout(() => console.log('timeout 0ms'), 0);
Promise.resolve().then(() => console.log('promise'));
console.log('end');

// Пример 2: Обратный порядок времени
setTimeout(() => {
    console.log('\n--- Пример 2: Обратный порядок ---');
    console.log('start 2');
    setTimeout(() => console.log('timeout 300ms'), 300);
    setTimeout(() => console.log('timeout 200ms'), 200);
    setTimeout(() => console.log('timeout 100ms'), 100);
    Promise.resolve().then(() => console.log('promise 2'));
    console.log('end 2');
}, 1000);

// Пример 3: Одинаковое время
setTimeout(() => {
    console.log('\n--- Пример 3: Одинаковое время ---');
    setTimeout(() => console.log('first 50ms'), 50);
    setTimeout(() => console.log('second 50ms'), 50);
    setTimeout(() => console.log('third 50ms'), 50);
    console.log('Какой порядок будет у одинакового времени?');
}, 2000);
