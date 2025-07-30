// День 2: Promises Deep Dive
// Дата: 30 июля 2025

console.log('=== Promises Deep Dive ===');

// ============================================
// ТЕСТОВЫЕ ПРОМИСЫ
// ============================================

const fastPromise = new Promise(resolve => 
    setTimeout(() => resolve('Fast result'), 100)
);

const slowPromise = new Promise(resolve => 
    setTimeout(() => resolve('Slow result'), 300)
);

const failingPromise = new Promise((resolve, reject) => 
    setTimeout(() => reject(new Error('Failed!')), 200)
);

// ============================================
// 1. Promise.all() - "Все или ничего"
// ============================================

console.log('\n--- Promise.all() ---');

async function testPromiseAll() {
    try {
        console.log('Тест 1: Все промисы успешны');
        const results = await Promise.all([fastPromise, slowPromise]);
        console.log('Результат:', results);
    } catch (error) {
        console.log('Ошибка:', error.message);
    }

    try {
        console.log('\nТест 2: Один промис падает');
        const results = await Promise.all([fastPromise, failingPromise, slowPromise]);
        console.log('Результат:', results);
    } catch (error) {
        console.log('Ошибка:', error.message);
    }
}

// ============================================
// 2. Promise.allSettled() - "Жди всех"
// ============================================

console.log('\n--- Promise.allSettled() ---');

async function testPromiseAllSettled() {
    console.log('Тест: Все промисы (включая падающий)');
    const results = await Promise.allSettled([fastPromise, failingPromise, slowPromise]);
    
    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            console.log(`Промис ${index}: успех -`, result.value);
        } else {
            console.log(`Промис ${index}: ошибка -`, result.reason.message);
        }
    });
}

// ============================================
// 3. Promise.race() - "Первый финиширует"
// ============================================

console.log('\n--- Promise.race() ---');

async function testPromiseRace() {
    try {
        console.log('Тест 1: Гонка между быстрым и медленным');
        const result = await Promise.race([fastPromise, slowPromise]);
        console.log('Победитель:', result);
    } catch (error) {
        console.log('Ошибка:', error.message);
    }

    try {
        console.log('\nТест 2: Гонка с падающим промисом');
        const result = await Promise.race([failingPromise, slowPromise]);
        console.log('Результат:', result);
    } catch (error) {
        console.log('Первым пришла ошибка:', error.message);
    }
}

// ============================================
// ПРАКТИЧЕСКОЕ ПРИМЕНЕНИЕ
// ============================================

console.log('\n--- Практические примеры ---');

// Пример 1: Загрузка данных с fallback
async function loadDataWithFallback() {
    const primaryAPI = fetch('https://api.primary.com/data').catch(() => 'Primary failed');
    const backupAPI = fetch('https://api.backup.com/data').catch(() => 'Backup failed');
    
    try {
        // Используем первый успешный ответ
        const result = await Promise.race([primaryAPI, backupAPI]);
        console.log('Данные загружены:', result);
    } catch (error) {
        console.log('Все API недоступны');
    }
}

// Пример 2: Параллельная загрузка с обработкой ошибок
async function loadMultipleResources() {
    const userPromise = Promise.resolve({ id: 1, name: 'John' });
    const postsPromise = Promise.resolve([{ id: 1, title: 'Post 1' }]);
    const commentsPromise = Promise.reject(new Error('Comments service down'));
    
    const results = await Promise.allSettled([
        userPromise,
        postsPromise, 
        commentsPromise
    ]);
    
    const user = results[0].status === 'fulfilled' ? results[0].value : null;
    const posts = results[1].status === 'fulfilled' ? results[1].value : [];
    const comments = results[2].status === 'fulfilled' ? results[2].value : [];
    
    console.log('Загруженные данные:', { user, posts, comments });
}

// ============================================
// ЗАПУСК ТЕСТОВ
// ============================================

async function runAllTests() {
    await testPromiseAll();
    await testPromiseAllSettled();
    await testPromiseRace();
    await loadMultipleResources();
}

runAllTests().then(() => {
    console.log('\n=== Все тесты завершены ===');
});

// ============================================
// ВАШИ ЗАМЕТКИ
// ============================================

console.log('\n--- Выводы ---');
console.log('Promise.all(): Используйте когда ВСЕ промисы должны быть успешными');
console.log('Promise.allSettled(): Используйте когда нужны ВСЕ результаты (включая ошибки)');
console.log('Promise.race(): Используйте для timeout, fallback, первого ответа');
