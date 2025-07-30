// Promises с самого начала - простые примеры
console.log('=== PROMISES ОСНОВЫ ===');

// ============================================
// 1. ЧТО ТАКОЕ PROMISE?
// ============================================

console.log('\n1. Что такое Promise?');
console.log('Promise - это "обещание" получить результат в будущем');

// Простейший Promise
const simplePromise = new Promise((resolve, reject) => {
    console.log('Promise создан! Начинаем работу...');
    
    // Через 1 секунду "выполняем обещание"
    setTimeout(() => {
        resolve('Готово! Результат получен');
    }, 1000);
});

console.log('Promise создан, но результата еще нет');

// ============================================
// 2. КАК ПОЛУЧИТЬ РЕЗУЛЬТАТ?
// ============================================

console.log('\n2. Как получить результат?');

// Способ 1: .then()
simplePromise.then((result) => {
    console.log('Получили результат:', result);
});

// ============================================
// 3. СОСТОЯНИЯ PROMISE
// ============================================

console.log('\n3. Состояния Promise:');

// Pending (ожидание)
const pendingPromise = new Promise((resolve) => {
    setTimeout(() => resolve('Результат через 2 секунды'), 2000);
});
console.log('Создали Promise - сейчас он в состоянии PENDING');

// Fulfilled (выполнен успешно)
const fulfilledPromise = Promise.resolve('Сразу успешный результат');
fulfilledPromise.then(result => {
    console.log('FULFILLED:', result);
});

// Rejected (отклонен с ошибкой)
const rejectedPromise = Promise.reject(new Error('Что-то пошло не так'));
rejectedPromise.catch(error => {
    console.log('REJECTED:', error.message);
});

// ============================================
// 4. ПРАКТИЧЕСКИЙ ПРИМЕР - ЗАГРУЗКА ДАННЫХ
// ============================================

console.log('\n4. Практический пример:');

function loadUserData(userId) {
    return new Promise((resolve, reject) => {
        console.log(`Загружаем данные пользователя ${userId}...`);
        
        setTimeout(() => {
            if (userId > 0) {
                resolve({
                    id: userId,
                    name: 'John Doe',
                    email: 'john@example.com'
                });
            } else {
                reject(new Error('Неверный ID пользователя'));
            }
        }, 1500);
    });
}

// Успешная загрузка
loadUserData(123)
    .then(user => {
        console.log('Пользователь загружен:', user);
    })
    .catch(error => {
        console.log('Ошибка загрузки:', error.message);
    });

// Загрузка с ошибкой
loadUserData(-1)
    .then(user => {
        console.log('Пользователь загружен:', user);
    })
    .catch(error => {
        console.log('Ошибка загрузки:', error.message);
    });

// ============================================
// 5. ЦЕПОЧКИ PROMISES
// ============================================

console.log('\n5. Цепочки Promises:');

function step1() {
    return Promise.resolve('Шаг 1 выполнен');
}

function step2(previousResult) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(previousResult + ' → Шаг 2 выполнен');
        }, 500);
    });
}

function step3(previousResult) {
    return Promise.resolve(previousResult + ' → Шаг 3 выполнен');
}

// Цепочка
step1()
    .then(result1 => {
        console.log(result1);
        return step2(result1);
    })
    .then(result2 => {
        console.log(result2);
        return step3(result2);
    })
    .then(finalResult => {
        console.log('Финальный результат:', finalResult);
    });

// ============================================
// 6. ASYNC/AWAIT - СОВРЕМЕННЫЙ СПОСОБ
// ============================================

console.log('\n6. Async/Await - современный способ:');

async function modernExample() {
    try {
        console.log('Начинаем современный пример...');
        
        const user = await loadUserData(456);
        console.log('Async/await - пользователь:', user);
        
        const step1Result = await step1();
        const step2Result = await step2(step1Result);
        const step3Result = await step3(step2Result);
        
        console.log('Async/await - финал:', step3Result);
        
    } catch (error) {
        console.log('Async/await - ошибка:', error.message);
    }
}

// Запускаем через 3 секунды, чтобы не мешать другим примерам
setTimeout(() => {
    modernExample();
}, 3000);

// ============================================
// ВЫВОДЫ
// ============================================

setTimeout(() => {
    console.log('\n🎯 ВЫВОДЫ:');
    console.log('✅ Promise - это "обещание" получить результат');
    console.log('✅ Состояния: pending → fulfilled/rejected');
    console.log('✅ .then() для успеха, .catch() для ошибок');
    console.log('✅ async/await - современный и удобный способ');
    console.log('✅ Можно создавать цепочки операций');
}, 5000);
