// TypeScript типы для Performance Dashboard

// API Response типы
export interface APIResponse {
  api: string;
  data: string;
  time: number;
}

// Performance Metrics типы
export interface PerformanceMetrics {
  pageLoadTime: number;
  domContentLoaded: number;
  memoryUsage: {
    used: number;
    total: number;
  };
}

// DOM Elements типы
export interface DashboardElements {
  // Buttons
  startBtn: HTMLButtonElement;
  stopBtn: HTMLButtonElement;
  clearBtn: HTMLButtonElement;

  // Promise.all elements
  promiseAllStatus: HTMLElement;
  promiseAllResults: HTMLElement;
  promiseAllTime: HTMLElement;

  // Promise.allSettled elements
  promiseAllSettledStatus: HTMLElement;
  promiseAllSettledResults: HTMLElement;
  promiseAllSettledTime: HTMLElement;

  // Promise.race elements
  promiseRaceStatus: HTMLElement;
  promiseRaceResults: HTMLElement;
  promiseRaceTime: HTMLElement;

  // Metrics
  pageLoadTime: HTMLElement;
  domContentLoaded: HTMLElement;
  memoryUsage: HTMLElement;

  // Log
  liveLog: HTMLElement;
}

// Log типы
export type LogType = "info" | "success" | "error";

// Promise результат типы
export type PromiseResult<T> =
  | {
      status: "fulfilled";
      value: T;
    }
  | {
      status: "rejected";
      reason: Error;
    };

// Status типы
export type StatusType = "pending" | "running" | "success" | "error";


function twoSum(nums, target) {
    const map = new Map(); // число → индекс

    for (let i = 0; i < nums.length; i++) {
      const current = nums[i];
      const complement = target - current;

      if (map.has(complement)) {
        return [map.get(complement), i];
      }
      map.set(current, i);
    }
    return [];
}