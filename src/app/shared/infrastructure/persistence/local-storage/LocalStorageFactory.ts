import type { Nullable } from 'src/app/shared/domain/Nullable';

export class LocalStorageFactory {
  public add(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public get(key: string): Nullable<string> {
    return localStorage.getItem(key);
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }

  public clear(): void {
    localStorage.clear();
  }
}
