// День 2: Promises Deep Dive - ИСПРАВЛЕННАЯ ВЕРСИЯ
console.log("=== PROMISES DEEP DIVE ===");

// ============================================
// ФУНКЦИИ ДЛЯ СОЗДАНИЯ ПРОМИСОВ
// ============================================

const createFastPromise = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve("⚡ Fast result (100ms)"), 100)
  );

const createSlowPromise = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve("🐌 Slow result (300ms)"), 300)
  );

const createFailingPromise = () =>
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("💥 Failed after 200ms!")), 200)
  );

// ============================================
// 1. Promise.all() - "ВСЕ ИЛИ НИЧЕГО"
// ============================================

console.log('\n🔥 1. Promise.all() - "Все или ничего"');

async function testPromiseAll() {
  console.log("\n--- Тест 1: Все промисы успешны ---");
  try {
    const start = Date.now();
    const results = await Promise.all([
      createFastPromise(),
      createSlowPromise(),
    ]);
    const time = Date.now() - start;
    console.log("✅ Результат:", results);
    console.log(`⏱️ Время: ${time}ms (ждали самый медленный)`);
  } catch (error) {
    console.log("❌ Ошибка:", error.message);
  }

  console.log("\n--- Тест 2: Один промис падает ---");
  const start2 = Date.now();
  try {
    const results = await Promise.all([
      createFastPromise(),
      createFailingPromise(),
      createSlowPromise(),
    ]);
    console.log("✅ Результат:", results);
  } catch (error) {
    const time = Date.now() - start2;
    console.log("❌ Ошибка:", error.message);
    console.log(`⏱️ Время до ошибки: ${time}ms`);
  }
}

// ============================================
// 2. Promise.allSettled() - "ЖДИ ВСЕХ"
// ============================================

console.log('\n🔥 2. Promise.allSettled() - "Жди всех"');

async function testPromiseAllSettled() {
  console.log("\n--- Тест: Все промисы (включая падающий) ---");
  const start = Date.now();
  const results = await Promise.allSettled([
    createFastPromise(),
    createFailingPromise(),
    createSlowPromise(),
  ]);
  const time = Date.now() - start;

  console.log(`⏱️ Время выполнения: ${time}ms`);

  const names = ["fastPromise", "failingPromise", "slowPromise"];
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`✅ ${names[index]}: ${result.value}`);
    } else {
      console.log(`❌ ${names[index]}: ${result.reason.message}`);
    }
  });
}

// ============================================
// 3. Promise.race() - "ПЕРВЫЙ ФИНИШИРУЕТ"
// ============================================

console.log('\n🔥 3. Promise.race() - "Первый финиширует"');

async function testPromiseRace() {
  console.log("\n--- Тест 1: Быстрый vs Медленный ---");
  try {
    const start = Date.now();
    const result = await Promise.race([
      createFastPromise(),
      createSlowPromise(),
    ]);
    const time = Date.now() - start;
    console.log("🏆 Победитель:", result);
    console.log(`⏱️ Время: ${time}ms`);
  } catch (error) {
    console.log("❌ Ошибка:", error.message);
  }

  console.log("\n--- Тест 2: Падающий vs Медленный ---");
  try {
    const start = Date.now();
    const result = await Promise.race([
      createFailingPromise(),
      createSlowPromise(),
    ]);
    console.log("🏆 Результат:", result);
  } catch (error) {
    const time = Date.now() - start;
    console.log("💥 Первой пришла ошибка:", error.message);
    console.log(`⏱️ Время: ${time}ms`);
  }
}

// ============================================
// ЗАПУСК ВСЕХ ТЕСТОВ
// ============================================

async function runAllTests() {
  await testPromiseAll();
  await new Promise((resolve) => setTimeout(resolve, 100));

  await testPromiseAllSettled();
  await new Promise((resolve) => setTimeout(resolve, 100));

  await testPromiseRace();

  console.log("\n🎯 ВЫВОДЫ:");
  console.log("Promise.all()      → Когда ВСЕ промисы должны быть успешными");
  console.log(
    "Promise.allSettled() → Когда нужны ВСЕ результаты (включая ошибки)"
  );
  console.log("Promise.race()     → Для timeout, fallback, первого ответа");
}

runAllTests().then(() => {
  console.log("\n✅ Promises Deep Dive завершен!");
  console.log("🚀 Переходим к Блоку 3: Performance Dashboard");
});
