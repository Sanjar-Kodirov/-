// Performance Dashboard - TypeScript Version
import { APIResponse, DashboardElements, LogType, StatusType } from "./types";

class PerformanceDashboard {
  private isMonitoring: boolean = false;
  private monitoringInterval: number | null = null;
  private elements!: DashboardElements;

  constructor() {
    this.initializeElements();
    this.bindEvents();
    this.loadInitialMetrics();
    this.log("Dashboard initialized", "info");
  }

  private initializeElements(): void {
    this.elements = {
      // Buttons
      startBtn: document.getElementById("startMonitoring") as HTMLButtonElement,
      stopBtn: document.getElementById("stopMonitoring") as HTMLButtonElement,
      clearBtn: document.getElementById("clearData") as HTMLButtonElement,

      // Promise.all elements
      promiseAllStatus: document.getElementById(
        "promiseAllStatus"
      ) as HTMLElement,
      promiseAllResults: document.getElementById(
        "promiseAllResults"
      ) as HTMLElement,
      promiseAllTime: document.getElementById("promiseAllTime") as HTMLElement,

      // Promise.allSettled elements
      promiseAllSettledStatus: document.getElementById(
        "promiseAllSettledStatus"
      ) as HTMLElement,
      promiseAllSettledResults: document.getElementById(
        "promiseAllSettledResults"
      ) as HTMLElement,
      promiseAllSettledTime: document.getElementById(
        "promiseAllSettledTime"
      ) as HTMLElement,

      // Promise.race elements
      promiseRaceStatus: document.getElementById(
        "promiseRaceStatus"
      ) as HTMLElement,
      promiseRaceResults: document.getElementById(
        "promiseRaceResults"
      ) as HTMLElement,
      promiseRaceTime: document.getElementById(
        "promiseRaceTime"
      ) as HTMLElement,

      // Metrics
      pageLoadTime: document.getElementById("pageLoadTime") as HTMLElement,
      domContentLoaded: document.getElementById(
        "domContentLoaded"
      ) as HTMLElement,
      memoryUsage: document.getElementById("memoryUsage") as HTMLElement,

      // Log
      liveLog: document.getElementById("liveLog") as HTMLElement,
    };
  }

  private bindEvents(): void {
    this.elements.startBtn.addEventListener("click", () =>
      this.startMonitoring()
    );
    this.elements.stopBtn.addEventListener("click", () =>
      this.stopMonitoring()
    );
    this.elements.clearBtn.addEventListener("click", () => this.clearData());
  }

  // ============================================
  // PROMISE SIMULATION FUNCTIONS
  // ============================================

  private createFastAPI(): Promise<APIResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ api: "FastAPI", data: "User data", time: 150 });
      }, 150);
    });
  }

  private createSlowAPI(): Promise<APIResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ api: "SlowAPI", data: "Analytics data", time: 800 });
      }, 800);
    });
  }

  private createUnreliableAPI(): Promise<APIResponse> {
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

  private async testPromiseAll(): Promise<void> {
    this.updateStatus("promiseAllStatus", "Running...", "running");

    const start = Date.now();

    try {
      const results = await Promise.all([
        this.createFastAPI(),
        this.createSlowAPI(),
      ]);

      const time = Date.now() - start;

      this.updateStatus(
        "promiseAllStatus",
        "Success - All APIs responded",
        "success"
      );
      this.elements.promiseAllResults.textContent = JSON.stringify(
        results,
        null,
        2
      );
      this.elements.promiseAllTime.textContent = `Completed in ${time}ms`;

      this.log(`Promise.all() completed in ${time}ms`, "success");
    } catch (error) {
      const time = Date.now() - start;
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      this.updateStatus("promiseAllStatus", "Failed - One API failed", "error");
      this.elements.promiseAllResults.textContent = `Error: ${errorMessage}`;
      this.elements.promiseAllTime.textContent = `Failed after ${time}ms`;

      this.log(
        `Promise.all() failed after ${time}ms: ${errorMessage}`,
        "error"
      );
    }
  }

  private async testPromiseAllSettled(): Promise<void> {
    this.updateStatus("promiseAllSettledStatus", "Running...", "running");

    const start = Date.now();

    const results = await Promise.allSettled([
      this.createFastAPI(),
      this.createUnreliableAPI(),
      this.createSlowAPI(),
    ]);

    const time = Date.now() - start;

    const successful = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;

    this.updateStatus(
      "promiseAllSettledStatus",
      `Completed - ${successful} success, ${failed} failed`,
      "success"
    );

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

    this.elements.promiseAllSettledResults.textContent = formattedResults;
    this.elements.promiseAllSettledTime.textContent = `Completed in ${time}ms`;

    this.log(
      `Promise.allSettled() completed in ${time}ms (${successful}/${results.length} successful)`,
      "info"
    );
  }

  private async testPromiseRace(): Promise<void> {
    this.updateStatus("promiseRaceStatus", "Racing...", "running");

    const start = Date.now();

    try {
      const result = await Promise.race([
        this.createFastAPI(),
        this.createSlowAPI(),
        this.createUnreliableAPI(),
      ]);

      const time = Date.now() - start;

      this.updateStatus(
        "promiseRaceStatus",
        `Winner: ${result.api}`,
        "success"
      );
      this.elements.promiseRaceResults.textContent = JSON.stringify(
        result,
        null,
        2
      );
      this.elements.promiseRaceTime.textContent = `Winner in ${time}ms`;

      this.log(`Promise.race() won by ${result.api} in ${time}ms`, "success");
    } catch (error) {
      const time = Date.now() - start;
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      this.updateStatus(
        "promiseRaceStatus",
        "First to finish was an error",
        "error"
      );
      this.elements.promiseRaceResults.textContent = `Error: ${errorMessage}`;
      this.elements.promiseRaceTime.textContent = `Error in ${time}ms`;

      this.log(`Promise.race() failed in ${time}ms: ${errorMessage}`, "error");
    }
  }

  // ============================================
  // UTILITY METHODS
  // ============================================

  private updateStatus(
    elementKey: keyof Pick<
      DashboardElements,
      "promiseAllStatus" | "promiseAllSettledStatus" | "promiseRaceStatus"
    >,
    text: string,
    status: StatusType
  ): void {
    const element = this.elements[elementKey];
    element.textContent = text;
    element.className = `status ${status}`;
  }

  private startMonitoring(): void {
    if (this.isMonitoring) return;

    this.isMonitoring = true;
    this.elements.startBtn.disabled = true;
    this.elements.stopBtn.disabled = false;

    this.log("Monitoring started", "info");

    this.runAllTests();

    this.monitoringInterval = window.setInterval(() => {
      this.runAllTests();
    }, 5000);
  }

  private stopMonitoring(): void {
    if (!this.isMonitoring) return;

    this.isMonitoring = false;
    this.elements.startBtn.disabled = false;
    this.elements.stopBtn.disabled = true;

    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }

    this.log("Monitoring stopped", "info");
  }

  private async runAllTests(): Promise<void> {
    this.log("Running all Promise tests...", "info");

    await Promise.allSettled([
      this.testPromiseAll(),
      this.testPromiseAllSettled(),
      this.testPromiseRace(),
    ]);

    this.updatePerformanceMetrics();
  }

  private clearData(): void {
    const statusElements = [
      this.elements.promiseAllStatus,
      this.elements.promiseAllSettledStatus,
      this.elements.promiseRaceStatus,
    ];

    statusElements.forEach((el) => {
      el.textContent = "Waiting...";
      el.className = "status pending";
    });

    [
      this.elements.promiseAllResults,
      this.elements.promiseAllSettledResults,
      this.elements.promiseRaceResults,
    ].forEach((el) => {
      el.textContent = "";
    });

    [
      this.elements.promiseAllTime,
      this.elements.promiseAllSettledTime,
      this.elements.promiseRaceTime,
    ].forEach((el) => {
      el.textContent = "";
    });

    this.elements.liveLog.innerHTML = "";

    this.log("Data cleared", "info");
  }

  private loadInitialMetrics(): void {
    if (performance.timing) {
      const loadTime =
        performance.timing.loadEventEnd - performance.timing.navigationStart;
      this.elements.pageLoadTime.textContent = `${loadTime}ms`;

      const domTime =
        performance.timing.domContentLoadedEventEnd -
        performance.timing.navigationStart;
      this.elements.domContentLoaded.textContent = `${domTime}ms`;
    }

    this.updateMemoryUsage();
  }

  private updatePerformanceMetrics(): void {
    this.updateMemoryUsage();
  }

  private updateMemoryUsage(): void {
    if ("memory" in performance) {
      const memory = (performance as any).memory;
      const used = Math.round(memory.usedJSHeapSize / 1024 / 1024);
      const total = Math.round(memory.totalJSHeapSize / 1024 / 1024);
      this.elements.memoryUsage.textContent = `${used}MB / ${total}MB`;
    } else {
      this.elements.memoryUsage.textContent = "Not available";
    }
  }

  private log(message: string, type: LogType = "info"): void {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement("div");
    logEntry.className = "log-entry";

    const typeColors: Record<LogType, string> = {
      info: "log-info",
      success: "log-success",
      error: "log-error",
    };

    logEntry.innerHTML = `
            <span class="log-timestamp">[${timestamp}]</span>
            <span class="${typeColors[type]}">${message}</span>
        `;

    this.elements.liveLog.appendChild(logEntry);
    this.elements.liveLog.scrollTop = this.elements.liveLog.scrollHeight;
  }
}

// Initialize dashboard when page loads
document.addEventListener("DOMContentLoaded", () => {
  new PerformanceDashboard();
});
