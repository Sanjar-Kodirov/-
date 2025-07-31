export interface APIResponse {
    api: string;
    data: string;
    time: number;
}
export interface PerformanceMetrics {
    pageLoadTime: number;
    domContentLoaded: number;
    memoryUsage: {
        used: number;
        total: number;
    };
}
export interface DashboardElements {
    startBtn: HTMLButtonElement;
    stopBtn: HTMLButtonElement;
    clearBtn: HTMLButtonElement;
    promiseAllStatus: HTMLElement;
    promiseAllResults: HTMLElement;
    promiseAllTime: HTMLElement;
    promiseAllSettledStatus: HTMLElement;
    promiseAllSettledResults: HTMLElement;
    promiseAllSettledTime: HTMLElement;
    promiseRaceStatus: HTMLElement;
    promiseRaceResults: HTMLElement;
    promiseRaceTime: HTMLElement;
    pageLoadTime: HTMLElement;
    domContentLoaded: HTMLElement;
    memoryUsage: HTMLElement;
    liveLog: HTMLElement;
}
export type LogType = 'info' | 'success' | 'error';
export type PromiseResult<T> = {
    status: 'fulfilled';
    value: T;
} | {
    status: 'rejected';
    reason: Error;
};
export type StatusType = 'pending' | 'running' | 'success' | 'error';
//# sourceMappingURL=types.d.ts.map