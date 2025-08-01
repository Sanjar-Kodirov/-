// Ваш тест на понимание Event Loop
// Создайте код, который выведет числа от 1 до 5 в правильном порядке
// используя setTimeout и Promise

console.log("Мой тест Event Loop:");

// TODO: Напишите код здесь
// Цель: вывести 1, 2, 3, 4, 5 в правильном порядке
// Используйте комбинацию:
// - console.log (синхронный код)
// - setTimeout (макрозадачи)
// - Promise.resolve().then() (микрозадачи)

console.log(1);
Promise.resolve().then(() => console.log(2));
Promise.resolve().then(() => console.log(3));
setTimeout(() => console.log(3), 0);
setTimeout(() => console.log(4), 0);

// Пример структуры:
// console.log(1);
// Promise.resolve().then(() => console.log(?));
// setTimeout(() => console.log(?), 0);
// и т.д.

// Ваш код:
