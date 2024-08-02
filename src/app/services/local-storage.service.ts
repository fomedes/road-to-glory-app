import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getItem(key: string) {
    const itemJson = localStorage.getItem(key);
    const item = itemJson ? JSON.parse(itemJson) : null;
    return item;
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
