// День 2: Promises Deep Dive - Практическое изучение
console.log("=== PROMISES DEEP DIVE ===");

// ============================================
// ФУНКЦИИ ДЛЯ СОЗДАНИЯ ПРОМИСОВ (создаются по требованию)
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
console.log(
  "Ждет ВСЕ промисы. Если хотя бы один падает - весь Promise.all падает"
);

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
    console.log(`⏱️ Время выполнения: ${time}ms (ждали самый медленный)`);
  } catch (error) {
    console.log("❌ Ошибка:", error.message);
  }

  console.log("\n--- Тест 2: Один промис падает ---");
  try {
    const start = Date.now();
    const results = await Promise.all([
      fastPromise,
      failingPromise,
      slowPromise,
    ]);
    console.log("✅ Результат:", results);
  } catch (error) {
    const time = Date.now() - start;
    console.log("❌ Ошибка:", error.message);
    console.log(`⏱️ Время до ошибки: ${time}ms (упал на failingPromise)`);
  }
}

// ============================================
// 2. Promise.allSettled() - "ЖДИ ВСЕХ"
// ============================================

console.log('\n🔥 2. Promise.allSettled() - "Жди всех"');
console.log("Ждет ВСЕ промисы независимо от результата. Никогда не падает.");

async function testPromiseAllSettled() {
  console.log("\n--- Тест: Все промисы (включая падающий) ---");
  const start = Date.now();
  const results = await Promise.allSettled([
    fastPromise,
    failingPromise,
    slowPromise,
  ]);
  const time = Date.now() - start;

  console.log(`⏱️ Время выполнения: ${time}ms (дождались всех)`);

  results.forEach((result, index) => {
    const promiseNames = ["fastPromise", "failingPromise", "slowPromise"];
    if (result.status === "fulfilled") {
      console.log(`✅ ${promiseNames[index]}: ${result.value}`);
    } else {
      console.log(`❌ ${promiseNames[index]}: ${result.reason.message}`);
    }
  });
}

// ============================================
// 3. Promise.race() - "ПЕРВЫЙ ФИНИШИРУЕТ"
// ============================================

console.log('\n🔥 3. Promise.race() - "Первый финиширует"');
console.log(
  "Возвращает результат первого завершившегося промиса (успех или ошибка)"
);

async function testPromiseRace() {
  console.log("\n--- Тест 1: Гонка между быстрым и медленным ---");
  try {
    const start = Date.now();
    const result = await Promise.race([fastPromise, slowPromise]);
    const time = Date.now() - start;
    console.log("🏆 Победитель:", result);
    console.log(`⏱️ Время: ${time}ms (быстрый выиграл)`);
  } catch (error) {
    console.log("❌ Ошибка:", error.message);
  }

  console.log("\n--- Тест 2: Гонка с падающим промисом ---");
  try {
    const start = Date.now();
    const result = await Promise.race([failingPromise, slowPromise]);
    console.log("🏆 Результат:", result);
  } catch (error) {
    const time = Date.now() - start;
    console.log("💥 Первым пришла ошибка:", error.message);
    console.log(`⏱️ Время: ${time}ms (ошибка быстрее успеха)`);
  }
}

// ============================================
// 4. ПРАКТИЧЕСКИЕ ПРИМЕРЫ
// ============================================

console.log("\n🔥 4. Практические применения");

// Пример 1: Загрузка с timeout
async function fetchWithTimeout(url, timeoutMs) {
  const fetchPromise = fetch(url).then((r) => r.json());
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout!")), timeoutMs)
  );

  return Promise.race([fetchPromise, timeoutPromise]);
}

// Пример 2: Загрузка критических и некритических данных
async function loadPageData() {
  // Критические данные - должны загрузиться все
  const criticalData = Promise.all([
    Promise.resolve({ user: "John" }),
    Promise.resolve({ settings: "dark" }),
  ]);

  // Некритические данные - загружаем что получится
  const nonCriticalData = Promise.allSettled([
    Promise.resolve({ ads: "banner" }),
    Promise.reject(new Error("Analytics failed")),
    Promise.resolve({ recommendations: [] }),
  ]);

  try {
    const [critical, nonCritical] = await Promise.all([
      criticalData,
      nonCriticalData,
    ]);
    console.log("\n📊 Загрузка данных страницы:");
    console.log("✅ Критические данные:", critical);
    console.log("📈 Некритические данные:");
    nonCritical.forEach((result, i) => {
      const names = ["ads", "analytics", "recommendations"];
      if (result.status === "fulfilled") {
        console.log(`  ✅ ${names[i]}:`, result.value);
      } else {
        console.log(`  ❌ ${names[i]}: ${result.reason.message}`);
      }
    });
  } catch (error) {
    console.log("💥 Критическая ошибка:", error.message);
  }
}

// ============================================
// ЗАПУСК ВСЕХ ТЕСТОВ
// ============================================

async function runAllTests() {
  await testPromiseAll();
  await new Promise((resolve) => setTimeout(resolve, 100)); // пауза

  await testPromiseAllSettled();
  await new Promise((resolve) => setTimeout(resolve, 100)); // пауза

  await testPromiseRace();
  await new Promise((resolve) => setTimeout(resolve, 100)); // пауза

  await loadPageData();

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
