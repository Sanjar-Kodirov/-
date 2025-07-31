declare class PerformanceDashboard {
    constructor();
    initializeElements(): void;
    bindEvents(): void;
    createFastAPI(): Promise<unknown>;
    createSlowAPI(): Promise<unknown>;
    createUnreliableAPI(): Promise<unknown>;
    testPromiseAll(): Promise<void>;
    testPromiseAllSettled(): Promise<void>;
    testPromiseRace(): Promise<void>;
    startMonitoring(): void;
    stopMonitoring(): void;
    runAllTests(): Promise<void>;
    clearData(): void;
    loadInitialMetrics(): void;
    updatePerformanceMetrics(): void;
    updateMemoryUsage(): void;
    log(message: any, type?: string): void;
}
//# sourceMappingURL=app.d.ts.map