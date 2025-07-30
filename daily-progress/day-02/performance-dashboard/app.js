// Performance Dashboard - JavaScript Logic
class PerformanceDashboard {
  constructor() {
    this.isMonitoring = false;
    this.monitoringInterval = null;
    this.initializeElements();
    this.bindEvents();
    this.loadInitialMetrics();
    this.log("Dashboard initialized", "info");
  }

  initializeElements() {
    // Buttons
    this.startBtn = document.getElementById("startMonitoring");
    this.stopBtn = document.getElementById("stopMonitoring");
    this.clearBtn = document.getElementById("clearData");

    // Promise.all elements
    this.promiseAllStatus = document.getElementById("promiseAllStatus");
    this.promiseAllResults = document.getElementById("promiseAllResults");
    this.promiseAllTime = document.getElementById("promiseAllTime");

    // Promise.allSettled elements
    this.promiseAllSettledStatus = document.getElementById(
      "promiseAllSettledStatus"
    );
    this.promiseAllSettledResults = document.getElementById(
      "promiseAllSettledResults"
    );
    this.promiseAllSettledTime = document.getElementById(
      "promiseAllSettledTime"
    );

    // Promise.race elements
    this.promiseRaceStatus = document.getElementById("promiseRaceStatus");
    this.promiseRaceResults = document.getElementById("promiseRaceResults");
    this.promiseRaceTime = document.getElementById("promiseRaceTime");

    // Metrics
    this.pageLoadTime = document.getElementById("pageLoadTime");
    this.domContentLoaded = document.getElementById("domContentLoaded");
    this.memoryUsage = document.getElementById("memoryUsage");

    // Log
    this.liveLog = document.getElementById("liveLog");
  }

  bindEvents() {
    this.startBtn.addEventListener("click", () => this.startMonitoring());
    this.stopBtn.addEventListener("click", () => this.stopMonitoring());
    this.clearBtn.addEventListener("click", () => this.clearData());
  }

  // ============================================
  // PROMISE SIMULATION FUNCTIONS
  // ============================================

  createFastAPI() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ api: "FastAPI", data: "User data", time: 150 });
      }, 150);
    });
  }

  createSlowAPI() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ api: "SlowAPI", data: "Analytics data", time: 800 });
      }, 800);
    });
  }

  createUnreliableAPI() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.3) {
          resolve({ api: "UnreliableAPI", data: "Cache data", time: 400 });
        } else {
          reject(new Error("UnreliableAPI failed"));
        }
      }, 400);
    });
  }

  // ============================================
  // PROMISE METHODS TESTING
  // ============================================

  async testPromiseAll() {
    this.promiseAllStatus.textContent = "Running...";
    this.promiseAllStatus.className = "status running";

    const start = Date.now();

    try {
      const results = await Promise.all([
        this.createFastAPI(),
        this.createSlowAPI(),
      ]);

      const time = Date.now() - start;

      this.promiseAllStatus.textContent = "Success - All APIs responded";
      this.promiseAllStatus.className = "status success";
      this.promiseAllResults.textContent = JSON.stringify(results, null, 2);
      this.promiseAllTime.textContent = `Completed in ${time}ms`;

      this.log(`Promise.all() completed in ${time}ms`, "success");
    } catch (error) {
      const time = Date.now() - start;

      this.promiseAllStatus.textContent = "Failed - One API failed";
      this.promiseAllStatus.className = "status error";
      this.promiseAllResults.textContent = `Error: ${error.message}`;
      this.promiseAllTime.textContent = `Failed after ${time}ms`;

      this.log(
        `Promise.all() failed after ${time}ms: ${error.message}`,
        "error"
      );
    }
  }

  async testPromiseAllSettled() {
    this.promiseAllSettledStatus.textContent = "Running...";
    this.promiseAllSettledStatus.className = "status running";

    const start = Date.now();

    const results = await Promise.allSettled([
      this.createFastAPI(),
      this.createUnreliableAPI(),
      this.createSlowAPI(),
    ]);

    const time = Date.now() - start;

    const successful = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;

    this.promiseAllSettledStatus.textContent = `Completed - ${successful} success, ${failed} failed`;
    this.promiseAllSettledStatus.className = "status success";

    const formattedResults = results
      .map((result, index) => {
        const apis = ["FastAPI", "UnreliableAPI", "SlowAPI"];
        if (result.status === "fulfilled") {
          return `✅ ${apis[index]}: ${JSON.stringify(result.value)}`;
        } else {
          return `❌ ${apis[index]}: ${result.reason.message}`;
        }
      })
      .join("\n");

    this.promiseAllSettledResults.textContent = formattedResults;
    this.promiseAllSettledTime.textContent = `Completed in ${time}ms`;

    this.log(
      `Promise.allSettled() completed in ${time}ms (${successful}/${results.length} successful)`,
      "info"
    );
  }

  async testPromiseRace() {
    this.promiseRaceStatus.textContent = "Racing...";
    this.promiseRaceStatus.className = "status running";

    const start = Date.now();

    try {
      const result = await Promise.race([
        this.createFastAPI(),
        this.createSlowAPI(),
        this.createUnreliableAPI(),
      ]);

      const time = Date.now() - start;

      this.promiseRaceStatus.textContent = `Winner: ${result.api}`;
      this.promiseRaceStatus.className = "status success";
      this.promiseRaceResults.textContent = JSON.stringify(result, null, 2);
      this.promiseRaceTime.textContent = `Winner in ${time}ms`;

      this.log(`Promise.race() won by ${result.api} in ${time}ms`, "success");
    } catch (error) {
      const time = Date.now() - start;

      this.promiseRaceStatus.textContent = "First to finish was an error";
      this.promiseRaceStatus.className = "status error";
      this.promiseRaceResults.textContent = `Error: ${error.message}`;
      this.promiseRaceTime.textContent = `Error in ${time}ms`;

      this.log(`Promise.race() failed in ${time}ms: ${error.message}`, "error");
    }
  }

  // ============================================
  // MONITORING CONTROLS
  // ============================================

  startMonitoring() {
    if (this.isMonitoring) return;

    this.isMonitoring = true;
    this.startBtn.disabled = true;
    this.stopBtn.disabled = false;

    this.log("Monitoring started", "info");

    // Run tests immediately
    this.runAllTests();

    // Then run every 5 seconds
    this.monitoringInterval = setInterval(() => {
      this.runAllTests();
    }, 5000);
  }

  stopMonitoring() {
    if (!this.isMonitoring) return;

    this.isMonitoring = false;
    this.startBtn.disabled = false;
    this.stopBtn.disabled = true;

    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }

    this.log("Monitoring stopped", "info");
  }

  async runAllTests() {
    this.log("Running all Promise tests...", "info");

    // Run all tests in parallel
    await Promise.allSettled([
      this.testPromiseAll(),
      this.testPromiseAllSettled(),
      this.testPromiseRace(),
    ]);

    this.updatePerformanceMetrics();
  }

  clearData() {
    // Reset all displays
    const elements = [
      this.promiseAllStatus,
      this.promiseAllSettledStatus,
      this.promiseRaceStatus,
    ];

    elements.forEach((el) => {
      el.textContent = "Waiting...";
      el.className = "status pending";
    });

    [
      this.promiseAllResults,
      this.promiseAllSettledResults,
      this.promiseRaceResults,
    ].forEach((el) => {
      el.textContent = "";
    });

    [
      this.promiseAllTime,
      this.promiseAllSettledTime,
      this.promiseRaceTime,
    ].forEach((el) => {
      el.textContent = "";
    });

    this.liveLog.innerHTML = "";

    this.log("Data cleared", "info");
  }

  // ============================================
  // PERFORMANCE METRICS
  // ============================================

  loadInitialMetrics() {
    // Page load time
    if (performance.timing) {
      const loadTime =
        performance.timing.loadEventEnd - performance.timing.navigationStart;
      this.pageLoadTime.textContent = `${loadTime}ms`;

      const domTime =
        performance.timing.domContentLoadedEventEnd -
        performance.timing.navigationStart;
      this.domContentLoaded.textContent = `${domTime}ms`;
    }

    this.updateMemoryUsage();
  }

  updatePerformanceMetrics() {
    this.updateMemoryUsage();
  }

  updateMemoryUsage() {
    if (performance.memory) {
      const used = Math.round(performance.memory.usedJSHeapSize / 1024 / 1024);
      const total = Math.round(
        performance.memory.totalJSHeapSize / 1024 / 1024
      );
      this.memoryUsage.textContent = `${used}MB / ${total}MB`;
    } else {
      this.memoryUsage.textContent = "Not available";
    }
  }

  // ============================================
  // LOGGING
  // ============================================

  log(message, type = "info") {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement("div");
    logEntry.className = "log-entry";

    const typeColors = {
      info: "log-info",
      success: "log-success",
      error: "log-error",
    };

    logEntry.innerHTML = `
            <span class="log-timestamp">[${timestamp}]</span>
            <span class="${typeColors[type]}">${message}</span>
        `;

    this.liveLog.appendChild(logEntry);
    this.liveLog.scrollTop = this.liveLog.scrollHeight;
  }
}

// Initialize dashboard when page loads
document.addEventListener("DOMContentLoaded", () => {
  new PerformanceDashboard();
});
