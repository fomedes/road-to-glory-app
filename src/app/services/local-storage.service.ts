import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any | undefined {
    const itemJson = localStorage.getItem(key);
    const item = itemJson ? JSON.parse(itemJson) : undefined;
    return item;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
